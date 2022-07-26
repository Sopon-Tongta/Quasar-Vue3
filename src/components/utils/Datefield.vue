<template>
  <q-input
    outlined
    dense
    clearable
    :class="dateClass"
    :mask="dateMaskInput"
    v-model="dateValue"
    @clear="onChange"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="dateValue"
            :mask="dateFormat"
            @update:model-value="
              () => {
                $refs.qDateProxy.hide();
                onUpdate();
              }
            "
          ></q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: ["label", "value", "format", "mask", "class"],
  emits: ["onUpdate"],
  setup(props, { emit }) {
    const dateValue = ref(props.value); //DD/MM/YYYY
    const dateFormat = ref("");
    const dateMaskInput = ref("");
    const dateClass = ref(props.class);
    const onUpdate = () => {
      emit("onUpdate", dateValue.value == null ? "" : dateValue.value);
    };

    dateFormat.value =
      props.format !== undefined && props.format !== null
        ? props.format
        : "DD/MM/YYYY";
    dateMaskInput.value =
      props.mask !== undefined && props.mask !== null
        ? props.format
        : "##/##/####";

    return {
      dateValue,
      dateFormat,
      dateMaskInput,
      onUpdate,
      dateClass,
    };
  },
});
</script>
