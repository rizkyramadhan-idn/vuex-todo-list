import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";

import store from "./store/index";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
