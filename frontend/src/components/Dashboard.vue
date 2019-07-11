<template id="main">
  <v-ons-page class="dashboard-bg">
    <v-ons-toolbar modifier="transparent">
      <div class="center">{{ title }}</div>
    </v-ons-toolbar>
    <div class="container">
       <!-- <button id="permission-btn" v-on:click="activateNotifications()">Ask Permission</button> -->
      <Chart class="chart flex center-content" :width="380" :height="380"></Chart>
      <div class="flex space-between">
        <div>
          <h3 class="title-segment">Nächste Schritte</h3>
          <v-ons-card class="flex space-around center-ver">
            <icon-base width="32" height="32" viewBox="0 0 50 50" icon-name="noun-gardening" >
              <Rucola />
            </icon-base>
            <div class="text-next-steps">Pflanzen gießen.</div>
          </v-ons-card>
          <v-ons-card class="flex space-around center-ver">
            <icon-base width="32" height="32" viewBox="0 0 50 50" icon-name="noun-gardening" >
              <Tomate />
            </icon-base>
            <div class="text-next-steps">Tomaten umtopfen.</div>
          </v-ons-card>
        </div>
        <div>
          <h3 class="title-segment">Wetter</h3>
          <div class="flex center-content flex-column weather-section">
            <template>
              <icon-base v-if="weather.condition === 'CLEAR'" width="50" height="50" viewBox="0 0 50 50" class="weather-icon" icon-name="sun">
                <Sun/>
              </icon-base>
              <icon-base v-if="weather.condition === 'CLOUDY'" width="50" height="50" viewBox="0 0 50 50" class="weather-icon" icon-name="cloud">
                <Cloud/>
              </icon-base>
              <icon-base v-if="weather.condition === 'RAINY'" width="50" height="50" viewBox="0 0 50 50" class="weather-icon" icon-name="rain">
                <Rain/>
              </icon-base>
            </template>
            <h1 class="temperature">{{ weather.temperature ? weather.temperature : '...' }} °C</h1>
            <p class="precipitation"><v-ons-icon icon="ion-umbrella"></v-ons-icon>&nbsp;{{ weather.precipitation ? weather.precipitation * 100 : '0'}} %</p>
          </div>
        </div>
      </div>
    </div>
    <div class="offset-navi"></div>
    <Navigationbar></Navigationbar>
    <router-link to="/catalogue" class="" exact>
      <v-ons-fab position="bottom right">
        <v-ons-icon icon="md-plus"></v-ons-icon>
      </v-ons-fab>
    </router-link>
  </v-ons-page>
</template>

<script>
  import Chart from './Chart.vue'
  import Navigationbar from './NavigationBar.vue'
  import IconBase from '@/components/icons/IconBase.vue'
  import Sun from '@/components/icons/Sun.vue'
  import Cloud from '@/components/icons/Cloud.vue'
  import Rain from '@/components/icons/Rain.vue'
  import Rucola from '@/components/icons/Rucola.vue'
  import Tomate from '@/components/icons/Tomate.vue'
  import * as WeatherService from '../services/WeatherService.js'
  import Console from 'console'

  export default {
    name: "Dashboard",
    components: {
      Chart,
      Navigationbar,
      IconBase,
      Rucola,
      Tomate,
      Sun,
      Cloud,
      Rain
    },
    props: {
      msg: String
    },
    data() {
      return {
        title: "Mein Kalender",
        weather: undefined
      }
    },
    mounted () {
      // Breakpoints
      
    },
    created() {
      WeatherService.getWeather().then((weather) => {
        this.weather = weather;
        Console.log(weather)
      }).catch(() => {
        this.weather = "Kein Zugriff auf Standort";
      });
    },
    methods: {
    }
  }

  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import "../styles/main.scss";

ons-toolbar, .container{
  background: $dashboard-bg !important;
}

 ons-fab{
  bottom: 35px !important;
  background: #9fd6b7 !important;
  position: fixed !important;
}


ons-fab ons-icon{
  color: #fff;
}

.container{
  height: 92vh;
}

ons-card{
  width: 50vw;
}
.text-next-steps{
  width: 60%;
}

.weather-section{
  color: $blue-grey;
}

.weather-icon{
  margin-top: 10px;
}

.temperature{
  margin-bottom: 0;
}

.precipitation{
  margin-top: 0;
  font-weight: 700
}

</style>
