<template>
  <q-card class="card-panel">
    <q-card-section>
      <div class="form-title">ข้อมูล Receive Item</div>
      <div class="form-contant">
        <div class="form-row">
          <div class="col-1">
            <div class="form-component">
              <div class="form-label">Item Code<span class="req">*</span></div>
              <q-input
                outlined
                dense
                clearable
                class="form-ui"
                v-model="itemCode"
              />
            </div>
          </div>
          <div class="col-1">
            <div class="form-component">
              <div class="form-label">Item<span class="req">*</span></div>
              <q-input
                outlined
                dense
                clearable
                class="form-ui input-item"
                v-model="item"
              />
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-1">
            <div class="form-component">
              <div class="form-label">MFG</div>
              <Datefield class="form-ui" :value="mfg" @onUpdate="mfgOnUpdate" />
            </div>
          </div>
          <div class="col-1">
            <div class="form-component">
              <div class="form-label">Exp</div>
              <Datefield class="form-ui" :value="exp" @onUpdate="expOnUpdate" />
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-1">
            <div class="form-component">
              <div class="form-label">Pallet No</div>
              <q-input
                outlined
                dense
                clearable
                class="form-ui"
                v-model="palletNo"
              />
            </div>
          </div>
          <div class="col-1">
            <div class="form-component-twin">
              <div class="form-label">Qty<span class="req">*</span></div>
              <q-input
                outlined
                dense
                class="form-ui1"
                v-model="qty1"
                mask="######"
              />
              <q-select
                outlined
                dense
                options-dense
                clearable
                class="form-ui2"
                v-model="uom1"
                :options="uomList"
              />
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-1">
            <div class="form-component">
              <div class="form-label">Lot</div>
              <q-input outlined dense clearable class="form-ui" v-model="lot" />
            </div>
          </div>
          <div class="col-1">
            <div class="form-component-twin">
              <div class="form-label"></div>
              <div class="text-add-unit" v-if="!isShowQty2" @click="onShowQty2">
                เพิ่ม Qty (หน่วย)
              </div>
              <q-input
                outlined
                dense
                class="form-ui1"
                v-model="qty2"
                mask="######"
                v-if="isShowQty2"
              />
              <q-select
                outlined
                dense
                options-dense
                clearable
                class="form-ui2"
                v-model="uom2"
                :options="uomList"
                v-if="isShowQty2"
              />
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="col-1">
            <div class="form-component">
              <div class="form-label">Batch</div>
              <q-input
                outlined
                dense
                clearable
                class="form-ui"
                v-model="batch"
              />
            </div>
          </div>
          <div class="col-1">
            <div class="form-component-twin" v-if="isShowQty2">
              <div class="form-label"></div>
              <div class="text-add-unit" v-if="!isShowQty3" @click="onShowQty3">
                เพิ่ม Qty (หน่วย)
              </div>
              <q-input
                outlined
                dense
                class="form-ui1"
                v-model="qty3"
                mask="######"
                v-if="isShowQty3"
              />
              <q-select
                outlined
                dense
                options-dense
                clearable
                class="form-ui2"
                v-model="uom3"
                :options="uomList"
                v-if="isShowQty3"
              />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn outline color="red" label="ยกเลิก" @click="onCancelItemClick" />
      <q-btn unelevated color="theme-color" label="ยืนยัน" @click="onSave" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  emits: ["onClose", "onSave"],
  setup(props, { emit }) {
    const itemCode = ref("");
    const item = ref("");
    const mfg = ref("");
    const exp = ref("");
    const palletNo = ref("");
    const lot = ref("");
    const batch = ref("");
    const qty1 = ref("");
    const uom1 = ref("");
    const qty2 = ref("");
    const uom2 = ref("");
    const qty3 = ref("");
    const uom3 = ref("");
    const isShowQty2 = ref(false);
    const isShowQty3 = ref(false);

    const onShowQty2 = () => {
      isShowQty2.value = true;
    };

    const onShowQty3 = () => {
      isShowQty3.value = true;
    };

    const mfgOnUpdate = (value) => {
      mfg.value = value;
    };

    const expOnUpdate = (value) => {
      exp.value = value;
    };

    const onCancelItemClick = () => {
      emit("onClose");
    };

    const onSave = () => {
      const params = {
        itemCode: itemCode.value,
        item: item.value,
        mfg: mfg.value,
        exp: exp.value,
        palletNo: palletNo.value,
        lot: lot.value,
        batch: batch.value,
        qty1: qty1.value,
        uom1: uom1.value,
        qty2: qty2.value,
        uom2: uom2.value,
        qty3: qty3.value,
        uom3: uom3.value,
      };
      emit("onSave", params);
    };

    return {
      itemCode,
      item,
      mfg,
      exp,
      palletNo,
      lot,
      batch,
      qty1,
      uom1,
      qty2,
      uom2,
      qty3,
      uom3,
      isShowQty2,
      isShowQty3,
      uomList: ["", "ลัง", "ขวด"],
      onShowQty2,
      onShowQty3,
      mfgOnUpdate,
      expOnUpdate,
      onCancelItemClick,
      onSave,
    };
  },
});
</script>

<style lang="scss">
.card-panel {
  max-width: 800px !important;
  width: 782px !important;
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
          width: 80px;
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
        .input-item {
          width: 350px;
        }
      }
      .form-component-twin {
        display: flex;
        margin: 0px 10px 10px 0px;
        .form-label {
          display: flex;
          align-items: center;
          width: 80px;
          margin-right: 10px;
          .req {
            color: red;
          }
        }
        .text-add-unit {
          font-family: "ThaiBevSansNew-SemiBold";
          text-decoration: underline;
          cursor: pointer;
          color: $themeColor;
        }
        .form-ui1 {
          width: 100px;
          .q-field__control,
          .q-field__append,
          .q-field__native {
            border-radius: 4px 0px 0px 4px;
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
        .form-ui2 {
          width: 100px;
          .q-field__control,
          .q-field__append,
          .q-field__native {
            border-radius: 0px 4px 4px 0px;
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
    }
  }
}
</style>
