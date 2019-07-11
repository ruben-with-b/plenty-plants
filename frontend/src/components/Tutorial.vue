<template>
    <div class="root">
        <v-ons-page class="">
            <v-ons-toolbar modifier="transparent">
                <div class="flex center-content center-ver left">
                    <icon-base @click.native="$router.go(-1)" class="back" width="15" height="15" viewBox="0 0 11 19" icon-name="back" >
                        <back/>
                    </icon-base>
                </div>
                <div class="center">{{ title + ' für ' + plant }}</div>
            </v-ons-toolbar>
            <div class="container flex center-content">
                <v-ons-carousel fullscreen swipeable auto-scroll auto-scroll-ratio="0.2" :index.sync="carouselIndex">
                    <v-ons-carousel-item class="flex center-content" v-for="(value, index) in tutSteps" :key="value.id" :style="{backgroundColor: value}">
                        <v-ons-card class="flex space-between align-content-space-betw wrap">
                            <div class="flex space-between card-header">
                                <h4 class="title-card">{{index + 1}}.</h4>
                                <h4 class="title-card">{{value.heading}}</h4>
                                <i></i>
                            </div>
                            <div class="flex center-content card-body">
                                <lottie v-if="index === 0" :options="defaultOptions" :height="300" :width="300" v-on:animCreated="loadAnimation"/>
                            </div>
                            <div class="flex center-content tut-description card-body">
                                {{ value.body }}
                            </div>
                            <div class="flex center-content card-button-group">
                                <v-ons-checkbox
                                    :input-id="check"
                                    v-model="progress[index].done"
                                    >
                                </v-ons-checkbox>
                                <label class="state-label" for="check">
                                    {{ progress[index].done ? 'Erledigt' : 'offen' }}
                                </label>
                            </div>
                        </v-ons-card>
                    </v-ons-carousel-item>
                </v-ons-carousel>

                <div :style="dots">
                    <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(tutSteps).length" :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
                        {{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}
                    </span>
                </div>
            </div>
            <div class="offset-navi"></div>
            <Navigationbar></Navigationbar>
        </v-ons-page>
    </div>
</template>


<script>
    import Navigationbar from './NavigationBar.vue'
    import IconBase from '@/components/icons/IconBase.vue'
    import Back from '@/components/icons/Back.vue'
    import Lottie from './LottieBase.vue';
    import * as animationData1 from '@/assets/lottie-tomate/1/lottie-tomate-1.json';

    import axios from "axios"
    import Console from "console"

    export default {
        name: "Tutorial",
        components: {
            Navigationbar,
            IconBase,
            Back,
            Lottie,
            'lottie': Lottie
        },
        data() {
            return {
                title: 'Tutorial',
                plant: '',
                carouselIndex: 0,
                state: true,
                progress: [
                    { done: true },
                    { done: false },
                    { done: false },
                    { done: true },
                    { done: true },
                    { done: true }
                ],
                steps: undefined,
                tutSteps: undefined,
                dots: {
                    textAlign: 'center',
                    fontSize: '20px',
                    color: '#7c8f9c',
                    position: 'absolute',
                    bottom: '40px',
                    left: 0,
                    right: 0
                },
                defaultOptions: {animationData: animationData1.default},
                animationSpeed: 1
            }
        },
        mounted () {
            const vm = this;

            axios.get("/api/v1/plant/Tomate/tutorial-steps", {}) // modify!
            .then((response) => {
                vm.tutSteps = response.data;

            })
            .catch((errors) => {
                Console.log("Cannot get Data. Error: " + errors.message);
            });

            let urlQuery = location.search;

            if (urlQuery === '?plant=Tomate') {
                vm.plant = 'Tomate'
            } else if (urlQuery === '?plant=Rucola') {
                vm.plant = 'Rucola'
            } else if (urlQuery === '?plant=Erdbeere') {
                vm.plant = 'Erdbeere'
            }
        },
        methods: {
            loadAnimation: function (anim) {
                this.anim = anim;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import "../styles/main.scss";

.container{
  background: url(../assets/bg1.svg) no-repeat center center;
  background-size: cover;
  height: calc(100% - 55px);
  padding: 1em 0;
}

ons-carousel[fullscreen] {
    width: 100%;
}

ons-card{
    padding: 25px 40px;
    width: 85vw;
    height: 70vh;
}

.tut-description{
    text-align: center;
}

.state-label{
    color: $cornflower-blue;
    margin-left: 10px;
}
</style>
