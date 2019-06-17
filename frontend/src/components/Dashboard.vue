<template id="main">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">{{ title }}</div>
      <!-- <div class="right">
        <v-ons-toolbar-button icon="ion-navicon, material: md-menu"></v-ons-toolbar-button>
      </div> -->
    </v-ons-toolbar>
    <button id="permission-btn" v-on:click="main()">Ask Permission</button>
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
  import Vue from 'vue';

  const check = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!')
    }

    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!')
    }
  };

  // I added a function that can be used to register a service worker.
  const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('sw_notification.js'); //notice the file name
    return swRegistration;
  };

  const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    if(permission !== 'granted'){
      throw new Error('Permission not granted for Notification');
    }
  };

  const showLocalNotification = (title, body, swRegistration) => {
    const options = {
      body,
      // here you can add more properties like icon, image, vibrate, etc.
    };
    swRegistration.showNotification(title, options);
  };

  const main = async () => {
    check();
    const swRegistration = await registerServiceWorker();
    const permission =  await requestNotificationPermission();
    showLocalNotification('This is title', 'this is the message', swRegistration);
  };

  export var sdf =  new Vue({

  });

  export default {
    name: "Dashboard",
    components: {
      Chart
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
      main: main
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
