import Datefield from "../components/utils/Datefield.vue";

export default ({ app }) => {
  // we globally register our component in the app
  app.component("Datefield", Datefield);
};
