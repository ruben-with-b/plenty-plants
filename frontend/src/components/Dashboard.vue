<template id="main">
  <v-ons-page class="dashboard-bg">
    <v-ons-toolbar modifier="transparent">
      <div class="center">{{ title }}</div>
    </v-ons-toolbar>
    <div class="container">
       <!-- <button id="permission-btn" v-on:click="activateNotifications()">Ask Permission</button> -->
      <Chart class="flex center-content"></Chart>
      <div class="flex space-between">
        <div>
          <h3 class="title-segment">Nächste Schritte</h3>
          <v-ons-card class="flex space-around center-ver">
            <icon-base width="50" height="50" viewBox="0 0 50 50" icon-name="noun-gardening" >
              <WateringCan />
            </icon-base>
            <div class="text-next-steps">Pflanzen gießen.</div>
          </v-ons-card>
          <v-ons-card class="flex space-around center-ver">
            <icon-base width="50" height="50" viewBox="0 0 50 50" icon-name="noun-gardening" >
              <Plant />
            </icon-base>
            <div class="text-next-steps">Tomaten umtopfen.</div>
          </v-ons-card>
        </div>
        <div>
          <h3 class="title-segment">Wetter</h3>
          <p>
            Some content.
          </p>
        </div>
      </div>
    </div>
    <div class="offset-navi"></div>
    <Navigationbar></Navigationbar>
  </v-ons-page>
</template>

<script>

import Chart from './Chart.vue'
import Navigationbar from './NavigationBar.vue'
import IconBase from '@/components/icons/IconBase.vue'
import WateringCan from '@/components/icons/WateringCan.vue'
import Plant from '@/components/icons/Plant.vue'


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
      Navigationbar,
      IconBase,
      WateringCan,
      Plant
    },
    props: {
      msg: String
    },
    data() {
      return {
        title: "Mein Kalender"
      }
    },
    methods: {
      activateNotifications: activateNotifications
    }
  }

  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import "../styles/main.scss";

ons-toolbar, .container{
  background: $dashboard-bg !important;
}

ons-card{
  width: 50vw;
}
.text-next-steps{
  width: 60%;
}

</style>
