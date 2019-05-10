import Vue from 'vue'
import App from './App.vue'
// import components
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
// import Menu from './Menu.vue'
// import About from './About.vue'
import VueRouter from 'vue-router'
import HelloWorld from "./components/HelloWorld";

Vue.use(VueRouter);

Vue.config.productionTip = false;

require("./styles/main.scss");

const routes = [
  { path: '/',
    name: 'Login',
    component: Login
  },
  { path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  { path: '/hello',
    component: HelloWorld
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
