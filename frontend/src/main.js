import Vue from 'vue'
import VueOnsen from 'vue-onsenui';
import App from './App.vue'

import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Settings from './components/Settings.vue'
import Catalogue from './components/Catalogue.vue'
import InfoPlant from './components/InfoPlant.vue'
import Tutorial from './components/Tutorial.vue'

import VueRouter from 'vue-router'

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

Vue.use(VueOnsen);

Vue.use(VueRouter);

Vue.config.productionTip = false;

require("./styles/main.scss");

const routes = [
  { path: '/',
    component: Dashboard
  },
  { path: '/login',
    component: Login
  },
  { path: '/signin',
    component: Register
  },
  { path: '/settings',
    component: Settings
  },
  { path: '/catalogue',
    component: Catalogue
  },
  { path: '/info',
    name: 'Info',
    component: InfoPlant,
    props: true
  },
  { path: '/project',
    component: Tutorial
  }
];

export const router = new VueRouter({
  routes, // routes: routes
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router,
  created : function() {
    this.$ons.platform.select('android');
  },
}).$mount('#app');
