import Vue from "vue";
window.Vue = Vue;

import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import routerin from "./router/index.js";
import store from "./store";
Vue.router = routerin;
Vue.config.productionTip = false;
store.dispatch("getData");
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
