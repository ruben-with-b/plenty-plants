<template id="main">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">{{ title }}</div>
      <div class="right">
        <v-ons-toolbar-button icon="ion-navicon, material: md-menu"></v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <p style="text-align: center">
      Some content.
    </p>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      title: "Dashboard"
    }
  },
  name: "Dashboard",
  props: {
    msg: String
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
