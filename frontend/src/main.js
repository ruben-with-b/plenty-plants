import Vue from 'vue'
import VueOnsen from 'vue-onsenui';
import App from './App.vue'
// import components
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
// import Menu from './Menu.vue'
// import About from './About.vue'
<<<<<<< HEAD
=======
import Dashboard from "./components/Dashboard";
>>>>>>> Setup Onsen UI
import VueRouter from 'vue-router'
import HelloWorld from "./components/HelloWorld";

<<<<<<< HEAD
Vue.use(VueRouter)
=======
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

Vue.use(VueOnsen);
Vue.use(VueRouter);
>>>>>>> Setup Onsen UI

Vue.config.productionTip = false;

require("./styles/main.scss")

const routes = [
  { path: '/',
<<<<<<< HEAD
    name: 'Login',
    component: Login
  },
  { path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  { path: '/hello',
    component: HelloWorld
=======
    component: Dashboard
>>>>>>> Setup Onsen UI
  }/*,
  { path: '/menu',
    component: Menu
  },
  { path: '/about',
    component: About
  }*/
]; 

const router = new VueRouter({
  routes, // routes: routes
  mode: 'history'
});

export default router;

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
