<template>
  <div id="app">
<<<<<<< HEAD
    <img src="./assets/logo.png">
    <!-- static content -->
    <div>
      <router-link :to="{ name: 'Dashboard'}">Dashboard</router-link>
      <router-link :to="{ name: 'Login'}">Login</router-link>
      <a href="#" v-on:click="logout">Logout</a>
    </div>

    <!-- dynamic content -->
    <router-view/>
=======
    <Dashboard/>
>>>>>>> Setup Onsen UI
  </div>
</template>

<script>
<<<<<<< HEAD
import router from "./main.js";
import axios from "axios"

export default {
  name: 'app',
  methods: {
    logout: function () {
      axios
              .get("/api/v1/auth/logout")
              .then(
                      () => {
                        router.push("/")
                      }
              );
    }
  }
};
=======
import Dashboard from "./components/Dashboard.vue";

export default {
  name: 'app',
  components: Dashboard
}
>>>>>>> Setup Onsen UI
</script>

<style>
</style>
