<template>
  <div class="q-pa-md">
    <q-table
      table-class="location-data-sticky-header-table"
      :rows="rows"
      :columns="columns"
      row-key="locationCode"
      selection="single"
      v-model:selected="selected"
      :pagination="pagination"
      hide-pagination
      flat
      bordered
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th />
        </q-tr>
        <q-tr v-if="loading" class="q-table__progress">
          <q-th class="relative-position" colspan="4">
            <q-linear-progress indeterminate />
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>
            <q-checkbox v-model="props.selected" />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn
              class="q-ml-xs"
              size="12px"
              color="theme-color"
              label="Edit"
              v-on:click="goToEdit(props.row)"
            />
            <q-btn
              class="q-ml-xs"
              size="12px"
              color="red"
              label="Delete"
              v-on:click="confirmDel(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="row justify-end q-mt-md">
      <span class="summary-page">
        {{ itemFirstPage }}-{{ itemFinalPage }} of {{ itemCount }}
      </span>
      <q-space />
      <q-pagination
        v-model="pagination.page"
        color="theme-color"
        :max="pagesNumber"
        :max-pages="6"
        direction-links
        boundary-links
        size="12px"
        @update:model-value="searchData"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch, computed } from "vue";
import useGetData from "../../../hooks/useGetData";

export default defineComponent({
  name: "location",
  emits: ["onRedirect", "alert", "showLoading", "hideLoading"],
  setup(props, ctx) {
    const useGetDataHooks = useGetData.useGetDateLocation();
    const { locationList, locationTotal, searchLocation } = useGetDataHooks;
    const itemCount = ref(locationTotal);
    const itemFirstPage = ref(0);
    const itemFinalPage = ref(0);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
    });

    const createColumns = [
      {
        name: "locationCode",
        label: "รหัส",
        align: "left",
        field: "locationCode",
      },
      {
        name: "locationName",
        label: "สถานที่",
        align: "left",
        field: "locationName",
      },
    ];

    const searchData = () => {
      let locationCodeParam = "";
      let locationNameParam = "";
      let page = pagination.value.page;
      let pageSize = pagination.value.rowsPerPage;
      loading.value = true;
      searchLocation(locationCodeParam, locationNameParam, page, pageSize);
    };

    const goToEdit = (data) => {
      let params = {
        locationId: data.locationId,
        locationCode: data.locationCode,
        locationName: data.locationName,
      };
      ctx.emit("onRedirect", "locationEdit", params);
    };

    const confirmDel = (data) => {
      let Msg = "Delete : " + data.locationCode + "/" + data.locationName;
      ctx.emit("alert", "Delete Message", Msg, "bg-deep-orange text-white");
    };

    watch(locationList, () => {
      let page = pagination.value.page;
      let pageSize = pagination.value.rowsPerPage;
      let finalPage = page * pageSize;
      let firstPage = finalPage - (pageSize - 1);
      finalPage = finalPage > itemCount.value ? itemCount.value : finalPage;
      itemFinalPage.value = finalPage;
      itemFirstPage.value = firstPage;
      loading.value = false;
    });

    onMounted(() => {
      searchData();
    });

    const computPagesNumber = computed(() =>
      Math.ceil(itemCount.value / pagination.value.rowsPerPage)
    );

    const loading = ref(false);
    return {
      columns: createColumns,
      rows: locationList,
      selected: ref([]),
      pagination,
      itemFirstPage,
      itemFinalPage,
      itemCount,
      pagesNumber: computPagesNumber,
      searchData,
      goToEdit,
      confirmDel,
      loading,
    };
  },
});
</script>

<style lang="scss">
.location-data-sticky-header-table {
  /* height or max-height is important */
  height: calc(100vh - 180px);
  .q-linear-progress {
    color: lightgreen !important;
  }
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: $themeColor;
    font-weight: bold;
    font-size: 15px;
    color: white;
  }
  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    top: 0;
  }
  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
  }
}
.summary-page {
  font-weight: bold;
  font-size: 13px;
  padding-left: 5px;
}
</style>
