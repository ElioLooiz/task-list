import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import dateFilter from "@/filters/date.filter";
import "@/style.sass";
import Preloader from "@/widgets/Preloader";

Vue.config.productionTip = false;

Vue.filter("date", dateFilter);
Vue.component("Preloader", Preloader);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
