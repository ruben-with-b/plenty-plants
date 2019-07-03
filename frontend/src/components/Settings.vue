<template>
    <div class="root">
        <v-ons-page class="">
            <div class="container flex center-ver center-content">
                <v-ons-toolbar modifier="transparent">
                    <div class="center">{{ title }}</div>
                </v-ons-toolbar>
                <div class="">
                    <ons-list>
                        <ons-list-item>
                            <label class="center" for="switch1">
                                Push-Nachrichten erlauben ({{ switchOn ? 'on' : 'off' }})
                            </label>
                            <div class="right">
                                <v-ons-switch input-id="switch1"
                                    v-model="switchOn"
                                >
                                </v-ons-switch>
                            </div>
                        </ons-list-item>
                        <ons-list-item>
                            <label class="center" for="switch1">
                                GPS freigeben (für Wetter)
                            </label>
                            <div class="right">
                                <v-ons-switch input-id="switch1"
                                    v-model="switchOn"
                                >
                                </v-ons-switch>
                            </div>
                        </ons-list-item>
                        <ons-list-item>
                            <label class="center" for="switch1">
                                Username ändern
                            </label>
                            <div class="right">
                                <v-ons-switch input-id="switch1"
                                    v-model="switchOn"
                                >
                                </v-ons-switch>
                            </div>
                        </ons-list-item>
                        <ons-list-item>
                            <label class="center" for="switch1">
                                E-Mailadresse ändern
                            </label>
                            <div class="right">
                                <v-ons-switch input-id="switch1"
                                    v-model="switchOn"
                                >
                                </v-ons-switch>
                            </div>
                        </ons-list-item>
                        <ons-list-item>
                            <label class="center" for="switch1">
                                Passwort ändern
                            </label>
                            <div class="right">
                                <v-ons-switch input-id="switch1"
                                    v-model="switchOn"
                                >
                                </v-ons-switch>
                            </div>
                        </ons-list-item>
                        <ons-list-item>
                            <label class="center" for="switch1">
                                Abmelden
                            </label>
                        </ons-list-item>

                        <!-- <ons-list-item>
                            <label class="center" for="switch2">
                            {{ switchOn ? 'Enabled switch' : 'Disabled switch' }}
                            </label>
                            <div class="right">
                            <v-ons-switch input-id="switch2"
                                :disabled="!switchOn"
                            >
                            </v-ons-switch>
                            </div>
                        </ons-list-item> -->
                        </ons-list>
                </div>
            </div>
            <div class="offset-navi"></div>
            <Navigationbar></Navigationbar>
        </v-ons-page>
    </div>
</template>

<script>
    import Navigationbar from './NavigationBar.vue'
    // import IconBase from '@/components/icons/IconBase.vue'

    export default {
        name: "Settings",
        components: {
            Navigationbar
        },
        data() {
            return {
                title: "Einstellungen",
                switchOn: true
            }
        },
        methods: {
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import "../styles/main.scss";

.container{
  background: url(../assets/bg2.svg) no-repeat center center;
  background-size: cover;
}

ons-input{
    width: 40vw !important;
}

.border-input::before {
    content: '';
    position: absolute;
    width: 40vw;
    height: 44px;
    transform: translate(-6px, -3px);
    background: #ffffff;
    border-radius: 8px;
}

.border-button::before {
    content: '';
    position: absolute;
    width: 6.2em;
    height: 2.6em;
    background: #28be98;
    -webkit-transform: translate(4px, 5px);
    transform: translate(-3px, -2px);
    border-radius: 8px;
}

.container{
    height: 89vh;
}
.logo{
    margin-bottom: 4em;
}

.offset-navi{
  height: 55px;
}
</style>
