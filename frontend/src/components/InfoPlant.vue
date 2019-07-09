<template>
    <div class="root">
        <v-ons-page class="">
            <v-ons-toolbar modifier="transparent">
                <div class="flex center-content center-ver left">
                    <icon-base @click.native="$router.go(-1)" class="back" width="15" height="15" viewBox="0 0 11 19" icon-name="back" >
                        <back/>
                    </icon-base>
                </div>
                <div class="center">{{ plant }}</div>
            </v-ons-toolbar>
            <div class="container flex center-content bottom-ver" :style="{'background-image': getBackground()}">
                <div class="flex content-down">
                    <div class="infolist list-topics">
                        <p>Zeitraum</p>
                        <p>Saat-Abstand</p>
                        <p>Saattiefe</p>
                        <p>Boden</p>
                        <p>Keimung</p>
                        <p>Ernte</p>
                        <p>Standort</p>
                    </div>
                    <div class="infolist list-content">
                        <p>{{ month[summary.sowPeriodBegin - 1] }} bis {{ month[summary.harvestPeriodEnd - 1] }} </p>
                        <p>{{ summary.sowingDistance }} cm</p>
                        <p>{{ summary.sowingDepth }} cm</p>
                        <p>{{ summary.soilCondition }}</p>
                        <p>{{ summary.germinationTime }}</p>
                        <p>{{ summary.numberOfHarvests }}</p>
                        <p>{{ summary.location }}</p>
                    </div>
                </div>
            </div>
            <div class="offset-navi"></div>
            <Navigationbar></Navigationbar>
        </v-ons-page>
    </div>
</template>


<script>
    import Navigationbar from './NavigationBar.vue'
    import IconBase from './IconBase.vue'
    import Back from './icons/Back.vue'

    import axios from "axios"
    import Console from "console"

    export default {
        name: "Info",
        components: {
            Navigationbar,
            IconBase,
            Back
        },
        props: {
            plant: String
    }   ,
        data() {
            return {
                summary: '',
                month: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
                mqS: window.matchMedia("(max-width:600px)")
            }
        },
        mounted () {
            const vm = this;
            axios.get("/api/v1/plant/" + vm.plant + "/summary", {})
            .then((response) => {
                vm.summary = response.data;
            })
            .catch((errors) => {
                Console.log("Cannot get Data. Error: " + errors.message);
            });

        },
        methods: {
            getBackground () {
                let img = this.loadImg();
                this.mqS.addListener(this.loadImg);
                return img
            },
            loadImg () {
                if (this.mqS.matches) {
                    return 'url(' + require('@/assets/info/' + this.plant.toLowerCase() + '/' + this.plant.toLowerCase() + '-portrait.png') + ')'    
                } else
                    document.querySelector('.container').style.backgroundPosition = '50% 15%'
                    return 'url(' + require('@/assets/info/' + this.plant.toLowerCase() + '/' + this.plant.toLowerCase() + '-landscape.png') + ')'
            }
        }
    }
</script>

<style lang="scss" scoped>

@import "../styles/main.scss";

.container{
  background-size: cover;
  background-position: 50% 0%;
  background-repeat: no-repeat;
  height: 89vh;
}

.back{
    transform: translateY(-2px);
}

.content-down{
    margin-bottom: 8em;
}
</style>
