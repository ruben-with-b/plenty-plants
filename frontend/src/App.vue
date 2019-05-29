<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- static content -->
    <div>
      <router-link :to="{ name: 'Dashboard'}">Dashboard</router-link>
      <router-link :to="{ name: 'Login'}">Login</router-link>
      <a href="#" v-on:click="logout">Logout</a>
    </div>

    <!-- dynamic content -->
    <router-view/>
  </div>
</template>

<script>
import router from "./main.js";
import axios from "axios"

export default {
  name: 'app',
  methods: {
    logout: function () {
      axios
              .get("/api/v1/logout")
              .then(
                      () => {
                        router.push("/")
                      }
              );
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
