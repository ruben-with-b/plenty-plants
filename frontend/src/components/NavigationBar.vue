<template>
<div class="root">
  <v-ons-fab position="bottom right">
      <v-ons-icon icon="md-plus"></v-ons-icon>
  </v-ons-fab>
  <div class="bottom-navi flex center-ver space-around">
    <li class="flex">
      <router-link to="/" class="" exact>
        <ul>
          <v-ons-icon class="" icon="md-calendar"></v-ons-icon>
          <div class="sub-icon-font active">Dashboard</div>
        </ul>
      </router-link>
      <router-link to="/catalogue" class="" exact>
        <ul>
          <v-ons-icon icon="md-search"></v-ons-icon>
          <div class="sub-icon-font">Katalog</div>
        </ul>
      </router-link>
      <router-link to="/settings" class="" exact>
        <ul>
          <v-ons-icon icon="md-settings"></v-ons-icon>
          <div class="sub-icon-font">Einstellungen</div>
        </ul>
      </router-link> 
    </li>
  </div>
</div>
</template>

<script>
// import Chart from './Chart.vue'

export default {
  name: "navigationbar",
  components: {
    // Chart
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-navi{
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 55px;
  background: #7C8F9C;
}

li{
  padding: 0.6em 0;
}

ul{
  text-align: center;
  width: calc(100vw/4);
}

a{
  color: #A4B1BA;
}

.router-link-active{
  color: #ffffff;
}

ons-fab{
  bottom: 35px !important;
  background: #9fd6b7 !important;
  position: fixed !important;
}


ons-fab ons-icon{
  color: #fff;
}

</style>
