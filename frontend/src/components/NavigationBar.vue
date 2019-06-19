<template>
<div class="root">
  <v-ons-fab position="bottom center" :visible="fabVisible">
      <v-ons-icon icon="md-plus"></v-ons-icon>
  </v-ons-fab>
  <div class="bottom-navi flex center-ver space-around">
    <li class="flex">
      <ul>
        <v-ons-icon class="active" icon="md-calendar"></v-ons-icon>
        <div class="sub-icon-font active">Dashboard</div>
      </ul>
      <ul>
        <v-ons-icon icon="md-search"></v-ons-icon>
        <div class="sub-icon-font">Katalog</div>
      </ul>
      <ul>
        <v-ons-icon icon="md-alarm"></v-ons-icon>
        <div class="sub-icon-font">Aufgaben</div>
      </ul>
      <ul>
        <v-ons-icon icon="md-account"></v-ons-icon>
        <div class="sub-icon-font">Konto</div>
      </ul>
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
  height: 65px;
  background: #7C8F9C;
}

li{
  padding: 0.6em 0;
}

ul{
  text-align: center;
  width: calc(100vw/4);
}

ons-icon{
  color: #A4B1BA;
}

.sub-icon-font{
  color: #A4B1BA
}

.active{
  color: #fff;
}

ons-fab{
  bottom: 40px !important;
  background: #FBD876 !important;
  position: fixed !important;
}


ons-fab ons-icon{
  color: gray;
}

</style>
