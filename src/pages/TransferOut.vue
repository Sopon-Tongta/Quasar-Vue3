<template>
  <div class="transferOut-contant">
    <q-card class="card">
      <q-card-section>
        <div class="text-h6">Transfer Out Page</div>
        <div class="text-subtitle2">by Jak</div>
      </q-card-section>
      <q-card-section> For testing page on redirect!! </q-card-section>
      <q-separator dark />
      <q-card-actions>
        <q-btn flat @click="onShow">OK</q-btn>
        <q-btn flat>Close</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "transferOut",
  emits: ["onRedirect", "alert", "showLoading", "hideLoading"],
  setup(props, ctx) {
    const onShow = () => {
      ctx.emit("alert", "Test Message", "this is Transfer Out Page!!");
    };
    return {
      onShow,
    };
  },
});
</script>
<style lang="scss">
.transferOut-contant {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(218, 255, 218);
  height: calc(100vh - 94.53px);

  .card {
    width: 500px;
    background: #399595;
    color: white;
  }
}
</style>
