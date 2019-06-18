<template>
<div class="root">
  <v-ons-fab position="bottom center" :visible="fabVisible">
      <v-ons-icon icon="md-plus"></v-ons-icon>
  </v-ons-fab>
  <div class="bottom-navi">
    <li class="flex space-around center-ver">
      <ul>
        <div>Icon</div>
        <div>Dashboard</div>
      </ul>
      <ul>
        <div>Icon</div>
        <div>Katalog</div>
      </ul>
      <ul>
        <div>Icon</div>
        <div>Aufgaben</div>
      </ul>
      <ul>
        <div>Icon</div>
        <div>Konto</div>
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
}

ons-fab{
  bottom: 40px !important;
  background: #FBD876 !important;
}

</style>
