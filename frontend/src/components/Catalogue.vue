<template>
    <div class="root">
        <v-ons-page class="">
            <div class="container flex center-content">
                <div class="block">     
                    <tabs
                        :tabs="tabs"
                        :currentTab="currentTab"
                        :wrapper-class="'default-tabs'"
                        :tab-class="'default-tabs__item'"
                        :tab-active-class="'default-tabs__item_active'"
                        :line-class="'default-tabs__active-line'"
                        @onClick="handleClick"
                    />
                    <div class="flex center-content" v-if="currentTab === 'tab1'">
                        <template v-for="k in summaryAllPlants">
                            <template  v-if="k.species === 'Herbs'">
                                <v-ons-card :key="k.id" class="flex space-between align-content-space-betw wrap">
                                    <div class="flex space-between card-header">
                                        <h4 class="title-card">{{ k.name }}</h4>
                                        <div>
                                            <template v-for="l in levelRucola">
                                                <template v-if="l === 'full'">      <!-- Simple, Moderate, Serious -->
                                                    <icon-base :key="l.id" class="severity" width="30" height="30" viewBox="0 0 1 30" icon-name="leaf" >
                                                        <Leaf/>
                                                    </icon-base>
                                                </template>
                                                <template v-if="l === 'empty'">
                                                    <icon-base :key="l.id" class="severity" width="30" height="30" viewBox="0 0 1 30" icon-name="leaf" >
                                                        <LeafOutline/>
                                                    </icon-base>
                                                </template>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="flex center-content card-body">
                                        <img src="@/assets/rucola/rucola-1x.png"
                                                srcset="@/assets/rucola/rucola-1x.png 1x,
                                                        @/assets/rucola/rucola-2x.png 2x"
                                                alt="rucola"
                                        >
                                    </div>
                                    <div class="flex space-between card-button-group">
                                        <v-ons-button>Info
                                            <div class="border-button secondary-button"></div>
                                        </v-ons-button>
                                        <v-ons-button>Hinzufügen
                                            <div class="border-button"></div>
                                        </v-ons-button>
                                    </div>
                                </v-ons-card>
                            </template>
                        </template>
                    </div>
                    <div class="flex center-content" v-if="currentTab === 'tab2'">
                        <v-ons-card class="">
                            <div class="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, laboriosam minus ratione alias qui neque, soluta dolores ipsa reprehenderit facere animi aperiam ullam voluptatem! Consequatur labore reiciendis repellat optio quis.</div>
                        </v-ons-card>
                    </div>
                    <div class="flex center-content" v-if="currentTab === 'tab3'">
                        <v-ons-card class="">
                            <div class="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur eum, vel voluptate autem explicabo itaque at rerum labore magni corporis. Reiciendis consequuntur quibusdam, deleniti error eaque praesentium modi corporis veniam.</div>
                        </v-ons-card>
                    </div>
                </div>                    
            </div>
            <div class="offset-navi"></div>
            <Navigationbar></Navigationbar>
        </v-ons-page>
    </div>
</template>


<script>
    import Tabs from 'vue-tabs-with-active-line'
    import Navigationbar from './NavigationBar.vue'
    import IconBase from '@/components/icons/IconBase.vue'
    import LeafOutline from '@/components/icons/LeafOutline.vue'
    import Leaf from '@/components/icons/Leaf.vue'

    import axios from "axios"
    import Console from "console"

    export default {
        name: "Catalogue",
        components: {
            Navigationbar,
            Tabs,
            IconBase,
            LeafOutline,
            Leaf
        },
        data() {
            return {
                title: 'Katalog',
                tabs: [
                    { title: 'Kräuter', value: 'tab1' },
                    { title: 'Gemüse', value: 'tab2' },
                    { title: 'Obst', value: 'tab3', }
                ],
                currentTab: 'tab1',
                titleCard: 'Rucola',
                levelRucola: ['full','full','full'],
                allPlants: '',
                summaryAllPlants: new Array()
            }
        },
        mounted () {
            const vm = this;
            axios.get("/api/v1/plant/all", {})
            .then((response) => {
                vm.allPlants = response.data;

                for (let index = 0; index < vm.allPlants.length; index++) {

                    let summary = new Promise((resolve) => {
                        axios.get("/api/v1/plant/" + vm.allPlants[index] + "/summary", {})
                        .then((response) => {
                            resolve(response.data);
                            summary = response.data;
                            vm.summaryAllPlants.push(summary);
                        })
                        .catch((errors) => {
                            Console.log("Cannot get Data. Error: " + errors.message);
                        });
                    });
                    
                    
                }

                for (let index = 0; index < vm.summaryAllPlants.length; index++) {
                    vm.summaryAllPlants[index].then((summary) => {
                        if (summary.difficulty === 'Moderate') {
                            vm.levelRucola = ['full','full','empty'];
                        }
                    });

                }
            })
            .catch((errors) => {
                Console.log("Cannot get Data. Error: " + errors.message);
            });

        },
        methods: {
            handleClick(newTab) {
                this.currentTab = newTab;
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
  height: 89vh;
}

ons-card{
    padding: 25px 30px 25px 30px;
    width: 70vw;
    height: 60vh;
}

.severity{
    margin-left: -10px; 
}
</style>
