<template>
  <q-page class="flex flex-center column">
    <img
      alt="Quasar logo"
      src="~assets/inventory-icon.png"
      style="width: 200px; height: 200px"
    />
    <div class="logo-text">Inventory</div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "index",
  emits: ["onRedirect", "alert", "showLoading", "hideLoading"],
});
</script>
<style lang="scss">
.logo-text {
  font-family: cursive;
  font-size: 50px;
  color: $themeColor;
  font-weight: bold;
  text-shadow: 3px 4px #87a396;
}
</style>
