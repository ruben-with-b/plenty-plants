<template id="main">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">{{ title }}</div>
      <!-- <div class="right">
        <v-ons-toolbar-button icon="ion-navicon, material: md-menu"></v-ons-toolbar-button>
      </div> -->
    </v-ons-toolbar>
    <button id="permission-btn" v-on:click="activateNotifications()">Ask Permission</button>
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
    <Navigationbar></Navigationbar>
  </v-ons-page>
</template>

<script>

import Chart from './Chart.vue'
import Navigationbar from './NavigationBar.vue'

import axios from "axios"
import Console from "console"

axios.get("/api/v1/user/my-plants", {})
    .then((response) => {
        Console.log(response.data);

        axios.get("/api/v1/plant/tomato/sowPeriod", {})
            .then((response) => {
                Console.log(response.data);
            })
            .catch((errors) => {
                Console.log("Cannot log in. Error: " + errors.message);
            });
    })
    .catch((errors) => {
        Console.log("Cannot log in. Error: " + errors.message);
    });


  /**
   * Activate push-notifications.
   */
  const activateNotifications = async () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!');
    }

    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!');
    }

    const permission = await window.Notification.requestPermission();
    if(permission == 'granted'){
      await navigator.serviceWorker.register('sw_notification.js');
    } else {
      throw new Error('Warning: We are not allowed to use notifications');
    }
  };

  export default {
    name: "Dashboard",
    components: {
      Chart,
      Navigationbar
    },
    props: {
      msg: String
    },
    data() {
      return {
        title: "Dashboard"
      }
    },
    methods: {
      activateNotifications: activateNotifications
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
