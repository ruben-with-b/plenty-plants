<template id="main">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">{{ title }}</div>
      <!-- <div class="right">
        <v-ons-toolbar-button icon="ion-navicon, material: md-menu"></v-ons-toolbar-button>
      </div> -->
    </v-ons-toolbar>
    <div class="container">
      <h3 class="title-segment">Kalender</h3>
      <Chart class="flex center-content"></Chart>
      <div class="flex space-between">
        <div>
          <h3 class="title-segment">Nächste Schritte</h3>
          <p>
            Some content.
          </p>
        </div>
        <div>
          <h3 class="title-segment">Wetter</h3>
          <p>
            Some content.
          </p>
        </div>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import Chart from './Chart.vue'

export default {
  data() {
    return {
      title: "Dashboard"
    }
  },
  name: "Dashboard",
  components: {
    Chart
  },
  props: {
    msg: String
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
