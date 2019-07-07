<template>
    <div class="root">
        <v-ons-page class="">
            <v-ons-toolbar modifier="transparent">
                <div class="center">{{ plant }}</div>
            </v-ons-toolbar>
            <div class="container flex center-content">
                                        
            </div>
            <div class="offset-navi"></div>
            <Navigationbar></Navigationbar>
        </v-ons-page>
    </div>
</template>


<script>
    import Navigationbar from './NavigationBar.vue'

    // import axios from "axios"
    // import Console from "console"

    export default {
        name: "Info",
        components: {
            Navigationbar
        },
        props: {
            plant: String
    }   ,
        data() {
            return {
                title: ''
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
}
</style>
