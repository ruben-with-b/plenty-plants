<template>
    <div class="root">
        <v-ons-page class="">
            <div class="container flex center-content">
            </div>
            <div class="offset-navi"></div>
            <Navigationbar></Navigationbar>
        </v-ons-page>
    </div>
</template>


<script>
    import Navigationbar from './NavigationBar.vue'
    //import IconBase from '@/components/icons/IconBase.vue'

    // import axios from "axios"
    // import Console from "console"

    export default {
        name: "Tutorial",
        components: {
            Navigationbar
            // IconBase
        },
        data() {
            return {
                title: 'Tutorial'
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
