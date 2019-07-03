<template>
    <div class="root">
        <v-ons-page class="">
            <div class="container flex center-content center-ver">
                <v-ons-toolbar modifier="transparent">
                    <div class="center">{{ title }}</div>
                </v-ons-toolbar>
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
                        <v-ons-card class="">
                            <div class="flex space-between">
                                <h4 class="title-card">{{ titleCard }}</h4>
                                <div>
                                    <template v-for="i in index">
                                        <template v-if="level === 'full'">
                                            <icon-base :key="i.id" class="severity" width="30" height="30" viewBox="0 0 1 30" icon-name="leaf" >
                                                <Leaf/>
                                            </icon-base>
                                        </template>
                                        <template v-if="level === 'empty'">
                                            <icon-base :key="i.id" class="severity" width="30" height="30" viewBox="0 0 1 30" icon-name="leaf" >
                                                <LeafOutline/>
                                            </icon-base>
                                        </template>
                                    </template>
                                </div>
                            </div>
                            
                        </v-ons-card>
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
    import Tabs from 'vue-tabs-with-active-line';
    import Navigationbar from './NavigationBar.vue'
    import IconBase from '@/components/icons/IconBase.vue'
    import LeafOutline from '@/components/icons/LeafOutline.vue'
    import Leaf from '@/components/icons/Leaf.vue'

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
                index: [1,2,3],
                level: 'empty'
            }
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
    padding: 25px 30px 16px 30px;
    width: 70vw;
    height: 60vh;
}

.severity{
    margin-left: -10px; 
}
</style>
