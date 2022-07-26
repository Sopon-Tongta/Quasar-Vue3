<template>
  <div class="location-edit-contant">
    <q-card class="card">
      <q-card-section>
        <div class="text-h6">Location Edit</div>
        <div class="text-subtitle2">by Jak</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{ titleName }}</div>
        <q-input outlined v-model="locationCode" class="textfield" />
        <q-input outlined v-model="locationName" class="textfield" />
      </q-card-section>
      <q-separator dark />
      <q-card-actions>
        <q-btn flat @click="onBack">Back</q-btn>
        <q-space />
        <q-btn flat @click="onShow">Edit</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "locationEdit",
  emits: ["onRedirect", "alert", "showLoading", "hideLoading"],
  setup(props, ctx) {
    const route = useRoute();
    const locationId = ref(route.params.locationId);
    const locationCode = ref(route.params.locationCode);
    const locationName = ref(route.params.locationName);
    const titleName = "รหัส: " + locationId.value;

    const onShow = () => {
      ctx.emit(
        "alert",
        "Notify Message",
        "Edit " + locationId.value + " Success!!"
      );
    };
    const onBack = () => {
      ctx.emit("onRedirect", "location");
    };

    return {
      titleName,
      locationId,
      locationCode,
      locationName,
      onShow,
      onBack,
    };
  },
});
</script>
<style lang="scss">
.location-edit-contant {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(218, 255, 218);
  height: calc(100vh - 94.53px);

  .card {
    width: 500px;
    color: #333;

    .textfield {
      width: 200px;
      margin: 5px 0px 5px 0px;

      input {
        line-height: inherit;
      }
      .q-field__control {
        height: auto;
      }
    }
  }
}
</style>
