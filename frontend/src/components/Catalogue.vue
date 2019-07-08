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
                                            <template v-if="k.difficulty === 'Simple'">
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <LeafOutline/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <LeafOutline/>
                                                </icon-base>
                                            </template>
                                            <template v-if="k.difficulty === 'Moderate'">
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <LeafOutline/>
                                                </icon-base>
                                            </template>
                                            <template v-if="k.difficulty === 'Serious'">
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <LeafOutline/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="flex center-content card-body">
                                        <img :src="require('@/assets/'+ k.name.toLowerCase() + '/' + k.name.toLowerCase() + '-1x.png')"
                                            :srcset="require('@/assets/'+ k.name.toLowerCase() + '/' + k.name.toLowerCase() + '-1x.png') + ' 1x, ' +
                                            require('@/assets/'+ k.name.toLowerCase() + '/' + k.name.toLowerCase() + '-2x.png') + ' 2x'"
                                            alt="rucola"
                                        >
                                    </div>
                                    <div class="flex space-between card-button-group">
                                        <router-link :to="{ name: 'Info', query: { plant: k.name }, params: { plant: k.name }}">
                                            <v-ons-button>Info
                                                <div class="border-button secondary-button"></div>
                                            </v-ons-button>
                                        </router-link>
                                        <v-ons-button @click="addPlantToDashboard(k.name)">Hinzufügen
                                            <div class="border-button"></div>
                                        </v-ons-button>
                                    </div>
                                </v-ons-card>
                            </template>
                        </template>
                    </div>
                    <div class="flex center-content" v-if="currentTab === 'tab2'">
                        <template v-for="k in summaryAllPlants">
                            <template  v-if="k.species === 'Vegetables'">
                                <v-ons-card :key="k.id" class="flex space-between align-content-space-betw wrap">
                                    <div class="flex space-between card-header">
                                        <h4 class="title-card">{{ k.name }}</h4>
                                        <div>
                                            <template v-if="k.difficulty === 'Simple'">
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <LeafOutline/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <LeafOutline/>
                                                </icon-base>
                                            </template>
                                            <template v-if="k.difficulty === 'Moderate'">
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <LeafOutline/>
                                                </icon-base>
                                            </template>
                                            <template v-if="k.difficulty === 'Serious'">
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <LeafOutline/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="flex center-content card-body">
                                        <img :src="require('@/assets/'+ k.name.toLowerCase() + '/' + k.name.toLowerCase() + '-1x.png')"
                                            :srcset="require('@/assets/'+ k.name.toLowerCase() + '/' + k.name.toLowerCase() + '-1x.png') + ' 1x, '
                                            + require('@/assets/'+ k.name.toLowerCase() + '/' + k.name.toLowerCase() + '-2x.png') + ' 2x'"
                                            alt="rucola"
                                        >
                                    </div>
                                    <div class="flex space-between card-button-group">
                                        <router-link :to="{ name: 'Info', query: { plant: k.name }, params: { plant: k.name }}">
                                            <v-ons-button>Info
                                                <div class="border-button secondary-button"></div>
                                            </v-ons-button>
                                        </router-link>
                                        <v-ons-button @click="addPlantToDashboard(k.name)">Hinzufügen
                                            <div class="border-button"></div>
                                        </v-ons-button>
                                    </div>
                                </v-ons-card>
                            </template>
                        </template>
                    </div>
                    <div class="flex center-content" v-if="currentTab === 'tab3'">
                        <template v-for="k in summaryAllPlants">
                            <template  v-if="k.species === 'Fruit'">
                                <v-ons-card :key="k.id" class="flex space-between align-content-space-betw wrap">
                                    <div class="flex space-between card-header">
                                        <h4 class="title-card">{{ k.name }}</h4>
                                        <div>
                                            <template v-if="k.difficulty === 'Simple'">
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <LeafOutline/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <LeafOutline/>
                                                </icon-base>
                                            </template>
                                            <template v-if="k.difficulty === 'Moderate'">
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <LeafOutline/>
                                                </icon-base>
                                            </template>
                                            <template v-if="k.difficulty === 'Serious'">
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                                <icon-base width="25" height="25" viewBox="0 0 42 56" icon-name="leaf" >
                                                    <Leaf/>
                                                </icon-base>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="flex center-content card-body">
                                        <img :src="require('@/assets/'+ k.name.toLowerCase() + '/' + k.name.toLowerCase() + '-1x.png')"
                                            :srcset="require('@/assets/'+ k.name.toLowerCase() + '/' + k.name.toLowerCase() + '-1x.png') + ' 1x, '
                                            + require('@/assets/'+ k.name.toLowerCase() + '/' + k.name.toLowerCase() + '-2x.png') + ' 2x'"
                                            alt="rucola"
                                        >
                                    </div>
                                    <div class="flex space-between card-button-group">
                                        <router-link :to="{ name: 'Info', query: { plant: k.name }, params: { plant: k.name }}">
                                            <v-ons-button>Info
                                                <div class="border-button secondary-button"></div>
                                            </v-ons-button>
                                        </router-link>
                                        <v-ons-button @click="addPlantToDashboard(k.name)">Hinzufügen
                                            <div class="border-button"></div>
                                        </v-ons-button>
                                    </div>
                                </v-ons-card>
                            </template>
                        </template>
                    </div>
                </div>                    
            </div>
            <div class="offset-navi"></div>
            <Navigationbar></Navigationbar>
            <v-ons-toast :visible.sync="toastVisible" animation="ascend">
                Du hast dies bereits hinzugefügt. 
                <button @click="toastVisible = false">Alles klar</button>
            </v-ons-toast>
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
                allPlants: '',
                summaryAllPlants: new Array(),
                toastVisible: false
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
            })
            .catch((errors) => {
                Console.log("Cannot get Data. Error: " + errors.message);
            });
        },
        methods: {
            handleClick(newTab) {
                this.currentTab = newTab;
            },
            addPlantToDashboard(plant) {
                let vm = this;
                axios.post('/api/v1/user/my-plants/' + plant)
                .then(function (response) {
                    vm.output = response.data;
                    Console.log(vm.output);
                })
                .catch(function (error) {
                    vm.output = error;
                    vm.toastVisible = true;
                });
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
</style>
