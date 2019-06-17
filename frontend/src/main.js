import Vue from 'vue'
import VueOnsen from 'vue-onsenui';
import App from './App.vue'

import Dashboard from './components/Dashboard.vue'
import VueRouter from 'vue-router'

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

Vue.use(VueOnsen);

new Vue({
  render: h => h(App),
  router,
  created : function() {
    this.$ons.platform.select('android');
  },
}).$mount('#app');

Vue.use(VueRouter);

Vue.config.productionTip = false;

require("./styles/main.scss");

const routes = [
  { path: '/',
    component: Dashboard
  }
];

const router = new VueRouter({
  routes, // routes: routes
  mode: 'history'
});

export default router;