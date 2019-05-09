import Vue from 'vue'
import App from './App.vue'
/*
import Menu from './Menu.vue'
import About from './About.vue'*/
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false;

require("./styles/main.scss")

const routes = [
  { path: '/',
    component: App
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
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
