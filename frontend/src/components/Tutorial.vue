<template>
    <div class="root">
        <v-ons-page class="">
            <v-ons-toolbar modifier="transparent">
                <div class="flex center-content center-ver left">
                    <icon-base @click.native="$router.go(-1)" class="back" width="15" height="15" viewBox="0 0 11 19" icon-name="back" >
                        <back/>
                    </icon-base>
                </div>
                <div class="center">{{ title }}</div>
            </v-ons-toolbar>
            <div class="container flex center-content">
                <v-ons-carousel fullscreen swipeable auto-scroll auto-scroll-ratio="0.2" :index.sync="carouselIndex">
                    <v-ons-carousel-item v-for="value in items" :key="value.id" :style="{backgroundColor: value}">
                        <div style="text-align: center; font-size: 30px; margin-top: 20px;">{{value.heading}}</div>
                        <div>{{ value.body }}</div>
                    </v-ons-carousel-item>
                </v-ons-carousel>

                <div :style="dots">
                    <span :index="dotIndex - 1" v-for="dotIndex in Object.keys(items).length" :key="dotIndex" style="cursor: pointer" @click="carouselIndex = dotIndex - 1">
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

    // import axios from "axios"
    // import Console from "console"

    export default {
        name: "Tutorial",
        components: {
            Navigationbar,
            IconBase,
            Back
        },
        data() {
            return {
                title: 'Tutorial',
                carouselIndex: 0,
                items: [
                    {
                        "heading": "Aussaat",
                        "body": "Pflanze die Tomatensamen zwischen Februar und April 1cm tief in kleine Töpfe und ziehe sie an einem sonnigen Fensterplatz groß."
                    },
                    {
                        "heading": "Keimung",
                        "body": "Die Tomaten mögen es warm (20-30°). Nach etwa 10 Tagen siehst du die Pflänzchen."
                    },
                    {
                        "heading": "Pflanzen",
                        "body": "Nach 8-12 Wochen kannst du die Tomaten um-pflanzen. Tomaten sind sehr frostempfindlich und dürfen deshalb erst ab Juni nach draußen."
                    },
                    {
                        "heading": "Pflanzen",
                        "body": "Die Tomaten sind jetzt 20-30 cm hoch und haben erste Blütenknospen. Die Pflanzen mit einem Abstand von 45-60 cm in komposthaltige Erde einpflanzen."
                    },
                    {
                        "heading": "Gießen",
                        "body": "Zwei mal die Woche, bei Sonnenschein täglich die Wurzeln/Erde gießen. Wasser auf Blättern vermeiden, sonst gibt es Braunfäule."
                    },
                    {
                        "heading": "Ernte",
                        "body": "Tomatenfrüchte gibt es bis Oktober. Die Tomaten ernten, wenn sie zu drei vierteln rot verfärbt sind."
                    }
                ],
                dots: {
                    textAlign: 'center',
                    fontSize: '30px',
                    color: '#000',
                    position: 'absolute',
                    bottom: '40px',
                    left: 0,
                    right: 0
                }
            }
        },
        mounted () {
            // const vm = this;
            
        },
        methods: {
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import "../styles/main.scss";

.container{
  background: url(../assets/bg1.svg) no-repeat center center;
  background-size: cover;
  height: 89vh;
  padding: 1em 0;
}

ons-carousel[fullscreen] {
    width: 100%;
}
</style>
