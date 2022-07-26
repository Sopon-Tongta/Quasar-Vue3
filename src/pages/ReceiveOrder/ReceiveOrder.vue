<template>
  <q-dialog v-model="criteriaSearchShow" persistent>
    <q-card class="criteria-search">
      <q-card-section>
        <div class="row" style="margin-bottom: 10px">
          <div class="criteria-search-title">ค้นหา</div>
          <q-space />
          <q-btn dense flat size="sm" icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </div>
        <div class="criteria-search-label">Owner</div>
        <q-select
          outlined
          dense
          options-dense
          clearable
          class="q-mb-md form-ui"
          v-model="searchOwner"
          :options="ownerList"
          @clear="searchData"
        />
        <div class="criteria-search-label">Order Type</div>
        <q-select
          outlined
          dense
          options-dense
          clearable
          class="q-mb-md form-ui"
          v-model="searchOrderType"
          :options="orderTypeList"
          @clear="searchData"
        />
        <div class="criteria-search-label">Receipt No</div>
        <q-input
          outlined
          dense
          clearable
          class="q-mb-md form-ui"
          v-model="searchReceiptNo"
          @clear="searchData"
        />
        <div class="criteria-search-label">Ref No</div>
        <q-input
          outlined
          dense
          clearable
          class="q-mb-md form-ui"
          v-model="searchRefNo"
          @clear="searchData"
        />
        <div class="criteria-search-label">Supplier Name</div>
        <q-input
          outlined
          dense
          clearable
          class="form-ui"
          v-model="searchSupplier"
          @clear="searchData"
        />
        <q-card-actions align="center">
          <q-btn
            outline
            color="red"
            label="ล้าง"
            size="12px"
            @click="onClearCriteriaSearch"
          />
          <q-btn
            unelevated
            color="theme-color"
            label="ค้นหา"
            size="12px"
            @click="searchData"
          />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
  <div class="q-pa-md">
    <div class="row">
      <div class="title">Good Receive</div>
      <q-btn
        padding="4px 6px"
        size="md"
        color="theme-color"
        icon="search"
        @click="showCriteriaSearch"
      />
    </div>
    <div class="q-my-md">
      <div class="row">
        <q-btn-toggle
          v-model="searchStatus"
          toggle-color="theme-color"
          @update:model-value="searchData"
          :options="[
            { label: 'NEW', value: 'new', slot: 'new' },
            { label: 'CHECKIN', value: 'checkin', slot: 'checkin' },
            { label: 'PUTAWAY', value: 'putaway', slot: 'putaway' },
            { label: 'CLOSED', value: 'closed', slot: 'closed' },
            { label: 'ALL', value: 'all', slot: 'all' },
          ]"
        >
          <template v-slot:new>
            <q-tooltip>New</q-tooltip>
          </template>
          <template v-slot:checkin>
            <q-tooltip>CheckIn</q-tooltip>
          </template>
          <template v-slot:putaway>
            <q-tooltip>Putaway</q-tooltip>
          </template>
          <template v-slot:closed>
            <q-tooltip>Closed</q-tooltip>
          </template>
          <template v-slot:all>
            <q-tooltip>All</q-tooltip>
          </template>
        </q-btn-toggle>
        <q-space />
        <q-btn
          color="theme-color"
          label="สร้าง"
          @click="onCreateReceiveOrder"
        />
      </div>
    </div>
    <q-table
      table-class="receiveOrder-sticky-header-table"
      :rows="rows"
      :columns="columns"
      row-key="receiptNo"
      :pagination="pagination"
      hide-pagination
      flat
      bordered
      :loading="loading"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="theme-color" />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <div
              v-if="col.name == 'receiptNo'"
              @click="onEditReceiveOrder(props.row)"
              class="link-goto"
            >
              {{ col.value }}
            </div>
            <div v-else>{{ col.value }}</div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div v-if="rows.length > 0" class="row justify-end q-mt-md">
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
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import useUtilHook from "../../hooks/useUtil";
import useReceiveOrderHook from "../../hooks/useReceiveOrder";

export default defineComponent({
  name: "receiveOrder",
  emits: ["onRedirect", "alert", "showLoading", "hideLoading"],
  setup(props, ctx) {
    const { ownerList, getOwnerList } = useUtilHook.useOwner();
    const { orderTypeList, getOrderTypeList } = useUtilHook.useOrderType();
    const { receiveOrderList, receiveOrderTotal, searchReceiveOrder } =
      useReceiveOrderHook.useReceiveOrder();
    const itemCount = ref(receiveOrderTotal);
    const itemFirstPage = ref(0);
    const itemFinalPage = ref(0);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      // rowsNumber: xx if getting data from a server
    });

    const createColumns = [
      {
        name: "receiptNo",
        label: "Receipt No",
        align: "left",
        field: "receiptNo",
      },
      {
        name: "owner",
        label: "Owner",
        align: "left",
        field: "owner",
      },
      {
        name: "refNo",
        label: "Ref No.",
        align: "left",
        field: "refNo",
      },
      {
        name: "orderType",
        label: "Order Type",
        align: "left",
        field: "orderType",
      },
      {
        name: "wareHouse",
        label: "W/H",
        align: "left",
        field: "wareHouse",
      },
      {
        name: "supplierId",
        label: "Supplier ID",
        align: "left",
        field: "supplierId",
      },
      {
        name: "supplierName",
        label: "Supplier Name",
        align: "left",
        field: "supplierName",
      },
      {
        name: "docDate",
        label: "Doc Date",
        align: "left",
        field: "docDate",
      },
      {
        name: "receiptDate",
        label: "Receipt Date",
        align: "left",
        field: "receiptDate",
      },
      {
        name: "status",
        label: "Status",
        align: "left",
        field: "status",
        style: (row) => {
          let css = "";
          switch (row.status.toLowerCase()) {
            case "new":
              css = "color: #027740;";
              break;
            case "putaway":
              css = "color: #6e07d4;";
              break;
            case "checkin":
              css = "color: #ecaf02;";
              break;
            case "closed":
              css = "color: #707070;";
              break;
          }
          return css;
        },
      },
    ];

    const loading = ref(false);
    const searchStatus = ref("new");
    const searchOwner = ref("");
    const searchOrderType = ref("");
    const searchReceiptNo = ref("");
    const searchRefNo = ref("");
    const searchSupplier = ref("");
    const searchData = () => {
      loading.value = true;
      searchReceiveOrder(
        searchStatus.value,
        searchOwner.value,
        searchOrderType.value,
        searchReceiptNo.value,
        searchRefNo.value,
        searchSupplier.value,
        pagination.value.page,
        pagination.value.rowsPerPage
      );
    };

    watch(receiveOrderList, () => {
      let page = pagination.value.page;
      let pageSize = pagination.value.rowsPerPage;
      let finalPage = page * pageSize;
      let firstPage = finalPage - (pageSize - 1);
      finalPage = finalPage > itemCount.value ? itemCount.value : finalPage;
      itemFinalPage.value = finalPage;
      itemFirstPage.value = firstPage;
      loading.value = false;
    });

    const computPagesNumber = computed(() =>
      Math.ceil(itemCount.value / pagination.value.rowsPerPage)
    );

    onMounted(() => {
      getOwnerList();
      getOrderTypeList();
      searchData();
    });

    const criteriaSearchShow = ref(false);

    const showCriteriaSearch = () => {
      criteriaSearchShow.value = true;
    };

    const onClearCriteriaSearch = () => {
      searchOwner.value = "";
      searchOrderType.value = "";
      searchReceiptNo.value = "";
      searchRefNo.value = "";
      searchSupplier.value = "";
      searchData();
    };

    const onCreateReceiveOrder = () => {
      ctx.emit("onRedirect", "createReceiveOrder");
    };

    const onEditReceiveOrder = (row) => {
      ctx.emit("onRedirect", "editReceiveOrder", row);
    };

    return {
      searchStatus,
      searchOwner,
      searchOrderType,
      searchReceiptNo,
      searchRefNo,
      searchSupplier,
      columns: createColumns,
      rows: receiveOrderList,
      pagination,
      itemFirstPage,
      itemFinalPage,
      itemCount,
      pagesNumber: computPagesNumber,
      searchData,
      loading,
      showCriteriaSearch,
      onClearCriteriaSearch,
      onCreateReceiveOrder,
      criteriaSearchShow,
      ownerList,
      orderTypeList,
      onEditReceiveOrder,
    };
  },
});
</script>
<style lang="scss">
.title {
  font-family: "ThaiBevSansNew-ExtraBold";
  font-size: 24px;
  margin-right: 20px;
}
.criteria-search {
  .criteria-search-title {
    font-family: "ThaiBevSansNew-ExtraBold";
    font-size: 20px;
    color: $themeColor;
  }
  .criteria-search-label {
    font-family: "ThaiBevSansNew-Bold";
  }
  .q-card__actions {
    .q-btn {
      padding: 0px 30px;
    }
  }
  .form-ui {
    width: 250px;
    .q-field__control,
    .q-field__append,
    .q-field__native {
      min-height: 28px;
      height: 28px;
      .q-icon,
      .q-field__focusable-action {
        font-size: 14px;
      }
      .q-select__dropdown-icon {
        font-size: 20px;
      }
    }
  }
}
.receiveOrder-sticky-header-table {
  /* height or max-height is important */
  height: calc(100vh - 280px);

  .link-goto {
    color: $themeColor;
    cursor: pointer;
    text-decoration: underline;
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
