<template>
  <q-dialog v-model="createItemPopup" persistent>
    <CreateItem @onClose="onCancelItemClick" @onSave="onSaveItemClick" />
  </q-dialog>
  <div class="q-pa-md form">
    <div class="form-title">ข้อมูล Receive Order</div>
    <div class="form-contant">
      <div class="form-row">
        <div class="col-1">
          <div class="form-component">
            <div class="form-label">Receive No.<span class="req">*</span></div>
            <q-input
              outlined
              dense
              clearable
              class="form-ui"
              v-model="receiptNo"
            />
          </div>
        </div>
        <div class="col-1">
          <div class="form-component">
            <div class="form-label">Ref No.<span class="req">*</span></div>
            <q-input outlined dense clearable class="form-ui" v-model="refNo" />
          </div>
        </div>
        <div class="col-1">
          <div class="form-component">
            <div class="form-label">Doc Date.<span class="req">*</span></div>
            <Datefield
              class="form-ui"
              :value="docDate"
              @onUpdate="docDateOnUpdate"
            />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col-1">
          <div class="form-component">
            <div class="form-label">Owner. <span class="req">*</span></div>
            <q-select
              outlined
              dense
              options-dense
              clearable
              class="form-ui"
              v-model="owner"
              :options="ownerList"
            />
          </div>
        </div>
        <div class="col-1">
          <div class="form-component">
            <div class="form-label">Order Type. <span class="req">*</span></div>
            <q-select
              outlined
              dense
              options-dense
              clearable
              class="form-ui"
              v-model="orderType"
              :options="orderTypeList"
            />
          </div>
        </div>
        <div class="col-1">
          <div class="form-component">
            <div class="form-label">
              Receipt Date.<span class="req">*</span>
            </div>
            <Datefield
              class="form-ui"
              :value="receiptDate"
              @onUpdate="receiptDateOnUpdate"
            />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col-1">
          <div class="form-component">
            <div class="form-label">Supplier ID.<span class="req">*</span></div>
            <q-input
              outlined
              dense
              clearable
              class="form-ui"
              v-model="supplierId"
            />
          </div>
        </div>
        <div class="col">
          <div class="form-component">
            <div class="form-label">
              Supplier Name.<span class="req">*</span>
            </div>
            <q-input
              outlined
              dense
              clearable
              class="form-ui supplier-ui"
              v-model="supplierName"
            />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col-1">
          <div class="form-component">
            <div class="form-label">W/H<span class="req">*</span></div>
            <q-input
              outlined
              dense
              clearable
              class="form-ui"
              v-model="wareHouse"
            />
          </div>
        </div>
        <div class="col-1">
          <div class="form-component">
            <div class="form-label">Status<span class="req">*</span></div>
            <q-input
              outlined
              dense
              clearable
              readonly
              class="form-ui"
              v-model="status"
            />
          </div>
        </div>
        <div class="col-1"></div>
      </div>
    </div>
    <div class="row top-table">
      <div class="title">Receive Item</div>
      <q-space />
      <q-btn
        size="12px"
        color="theme-color"
        label="Add Item"
        @click="onCreateItemClick"
      />
    </div>
    <q-table
      class="receiveItem"
      table-class="receiveItem-sticky-header-table"
      :rows="rows"
      :columns="columns"
      row-key="itemCode"
      selection="multiple"
      v-model:selected="orderItemSelected"
      hide-pagination
      hide-bottom
      flat
      bordered
      :loading="loading"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="theme-color" />
      </template>
      <template v-slot:top v-if="orderItemSelected.length > 0">
        <div class="q-mx-sm">{{ orderItemSelected.length }} item selected</div>
        <q-btn
          color="red"
          size="sm"
          label="Delete"
          @click="onDeleteItemClick"
        />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th>
            <q-checkbox v-model="props.selected" size="xs" color="green-5" />
          </q-th>
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td style="width: 30px">
            <q-checkbox
              v-model="props.selected"
              size="xs"
              color="theme-color"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="row bottom-table">
      <q-btn
        size="12px"
        outline
        color="theme-color"
        label="Back"
        @click="onBackClick"
      />
      <q-space />
      <q-btn
        size="12px"
        color="red"
        label="Delete"
        @click="onDeleteOrderClick"
      />
      <q-btn
        size="12px"
        class="q-ml-xs"
        color="theme-color"
        label="Save"
        @click="onSaveOrderClick"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import useUtilHook from "../../hooks/useUtil";
import useReceiveOrderHook from "../../hooks/useReceiveOrder";
import CreateItem from "../../components/createReceiveOrder/createItem.vue";

export default defineComponent({
  name: "editReceiveOrder",
  emits: ["onRedirect", "alert", "confirm", "confirmInput"],
  components: {
    CreateItem,
  },
  setup(props, ctx) {
    const route = useRoute();

    const { ownerList, getOwnerList } = useUtilHook.useOwner();
    const { orderTypeList, getOrderTypeList } = useUtilHook.useOrderType();
    const { saveReceiveOrder, deleteReceiveOrder } =
      useReceiveOrderHook.useReceiveOrder();
    const {
      receiveItemList,
      saveReceiveItem,
      deleteReceiveItem,
      searchReceiveItem,
    } = useReceiveOrderHook.useReceiveItem();

    const orderId = ref(route.params.orderId);
    const receiptNo = ref(route.params.receiptNo);
    const refNo = ref(route.params.refNo);
    const docDate = ref(route.params.docDate);
    const owner = ref(route.params.owner);
    const orderType = ref(route.params.orderType);
    const receiptDate = ref(route.params.receiptDate);
    const supplierId = ref(route.params.supplierId);
    const supplierName = ref(route.params.supplierName);
    const wareHouse = ref(route.params.wareHouse);
    const status = ref(route.params.status);
    const createItemPopup = ref(false);
    const createColumns = [
      {
        name: "itemCode",
        label: "Item Code",
        align: "left",
        field: "itemCode",
        style: "width: 50px",
      },
      {
        name: "itemName",
        label: "Item",
        align: "left",
        field: "itemName",
      },
      {
        name: "zone",
        label: "Zone",
        align: "left",
        field: "zone",
        style: "width: 50px",
      },
      {
        name: "qty",
        label: "Qty",
        align: "left",
        field: "qty",
        style: "width: 50px",
      },
      {
        name: "uom",
        label: "UoM",
        align: "left",
        field: "uom",
      },
      {
        name: "loc",
        label: "Loc",
        align: "left",
        field: "loc",
        style: "width: 50px",
      },
      {
        name: "palletNo",
        label: "Pallet No",
        align: "left",
        field: "palletNo",
        style: "width: 50px",
      },
      {
        name: "status",
        label: "Status",
        align: "left",
        field: "status",
        style: "width: 50px",
      },
    ];

    const searchData = () => {
      loading.value = true;
      searchReceiveOrder();
    };

    watch(receiveItemList, () => {
      loading.value = false;
    });

    onMounted(() => {
      getOwnerList();
      getOrderTypeList();
      searchReceiveItem(orderId.value);
    });

    const loading = ref(false);

    const docDateOnUpdate = (value) => {
      docDate.value = value;
    };

    const receiptDateOnUpdate = (value) => {
      receiptDate.value = value;
    };

    const onBackClick = () => {
      ctx.emit("onRedirect", "receiveOrder");
    };

    const onCreateItemClick = () => {
      createItemPopup.value = true;
    };

    const onCancelItemClick = () => {
      createItemPopup.value = false;
    };

    const onSaveItemClick = (result) => {
      ctx.emit(
        "confirm",
        "ยืนยันการบันทึก",
        "คุณต้องการบันทึกรายการนี้ใช่หรือไม่",
        () => {
          let newItem = {
            orderId: orderId.value,
            itemCode: result.itemCode,
            itemName: result.item,
            zone: "xxxx",
            qty: result.qty1,
            uom: result.uom1,
            loc: result.loc,
            palletNo: result.palletNo,
            status: "NEW",
          };
          saveReceiveItem(newItem);
          createItemPopup.value = false;
        }
      );
    };

    const orderItemSelected = ref([]);

    const onDeleteItemClick = () => {
      ctx.emit(
        "confirm",
        "ยืนยันการลบ",
        "คุณต้องการลบ item นี้ใช่หรือไม่",
        () => {
          deleteReceiveItem(orderItemSelected.value);
          orderItemSelected.value = [];
        }
      );
    };

    const onDeleteOrderClick = () => {
      ctx.emit("confirmInput", "สาเหตุที่ลบ", "ระบุเหตุผล", (reason) => {
        ctx.emit("alert", "ทดสอบข้อความ", reason);
      });
    };

    const onSaveOrderClick = () => {
      ctx.emit(
        "confirm",
        "ยืนยันการบันทึก",
        "คุณต้องการบันทึกเอกสารนี้ใช่หรือไม่",
        () => {
          let newOrder = {
            orderId: orderId.value,
            receiptNo: receiptNo.value,
            owner: owner.value,
            refNo: refNo.value,
            orderType: orderType.value,
            wareHouse: wareHouse.value,
            supplierId: supplierId.value,
            supplierName: supplierName.value,
            docDate: docDate.value,
            receiptDate: receiptDate.value,
            status: status.value,
          };
          saveReceiveOrder(newOrder);
          onBackClick();
        }
      );
    };

    return {
      receiptNo,
      refNo,
      docDate,
      owner,
      orderType,
      receiptDate,
      supplierId,
      supplierName,
      wareHouse,
      status,
      ownerList,
      orderTypeList,
      columns: createColumns,
      rows: receiveItemList,
      loading,
      createItemPopup,
      orderItemSelected,
      searchData,
      docDateOnUpdate,
      receiptDateOnUpdate,
      onBackClick,
      onCreateItemClick,
      onCancelItemClick,
      onSaveItemClick,
      onDeleteItemClick,
      onDeleteOrderClick,
      onSaveOrderClick,
    };
  },
});
</script>
<style lang="scss">
.form {
  .form-title {
    color: $themeColor;
    font-family: "ThaiBevSansNew-Bold";
    font-size: 18px;
    margin-bottom: 8px;
  }
  .form-contant {
    .form-row {
      display: flex;
      flex-wrap: wrap;
      .form-component {
        display: flex;
        margin: 0px 10px 10px 0px;
        .form-label {
          display: flex;
          align-items: center;
          width: 100px;
          margin-right: 10px;
          .req {
            color: red;
          }
        }
        .form-ui {
          width: 200px;
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
        .supplier-ui {
          width: 520px;
        }
      }
    }
  }
}
.top-table,
.bottom-table {
  display: flex;
  align-items: center;
  .title {
    font-family: "ThaiBevSansNew-Bold";
    font-size: 16px;
    color: $themeColor;
  }
}

.receiveItem {
  margin-top: 2px;
  .q-table__top {
    padding: 8px;
  }
  margin-bottom: 10px;
  .receiveItem-sticky-header-table {
    /* height or max-height is important */
    min-height: 200px;
    height: calc(100vh - 390px);
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
}
</style>
