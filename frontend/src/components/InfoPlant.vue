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
            <div class="container flex center-content bottom-ver" :style="{'background-image': 'url(' + require('@/assets/info/rucola/rucola-bg.png') + ')'}">
                <div class="flex content-down">
                    <ul class="infolist list-topics">
                        <li>Zeitraum</li>
                        <li>Saat-Abstand</li>
                        <li>Saattiefe</li>
                        <li>Boden</li>
                        <li>Keimung</li>
                        <li>Ernte</li>
                        <li>Standort</li>
                    </ul>
                    <ul class="infolist list-content">
                        <li>–</li>
                        <li>{{ summary.sowingDistance }} cm</li>
                        <li>{{ summary.sowingDepth }} cm</li>
                        <li>{{ summary.soilCondition }}</li>
                        <li>–</li>
                        <li>{{ summary.numberOfHarvests }}</li>
                        <li>–</li>
                    </ul>
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
                summary: ''
            }
        },
        mounted () {
            const vm = this;
            axios.get("/api/v1/plant/" + vm.plant + "/summary", {})
            .then((response) => {
                vm.summary = response.data;
                Console.log(vm.summary);
            })
            .catch((errors) => {
                Console.log("Cannot get Data. Error: " + errors.message);
            });
            
        },
        methods: {
            
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
