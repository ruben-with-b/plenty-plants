import Vue from 'vue'
import App from './App.vue'
// import components
// import Login from './components/Login.vue'
// import Menu from './Menu.vue'
// import About from './About.vue'
import HelloWorld from "./components/HelloWorld";
import VueRouter from 'vue-router'

Vue.use(VueRouter);

Vue.config.productionTip = false;

require("./styles/main.scss");

const routes = [
  { path: '/',
    component: HelloWorld
  }/*,
  { path: '/login',
     component: Login
  },
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

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
