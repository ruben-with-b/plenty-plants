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
                            <label class="center">
                                Frostwarnung
                            </label>
                            <div class="right">
                                <v-ons-switch
                                        v-model="pushNotificationsEnabled"
                                        v-on:change="togglePushNotifications">
                                </v-ons-switch>
                            </div>
                        </ons-list-item>
                        <ons-list-item>
                            <label class="center" for="switch1">
                                GPS freigeben (für Wetter)
                            </label>
                            <div class="right">
                                <v-ons-switch input-id="switch1"
                                    v-model="switchOn">
                                </v-ons-switch>
                            </div>
                        </ons-list-item>
                        <ons-list-item>
                            <button class="center">
                                Username ändern
                            </button>
                        </ons-list-item>
                        <ons-list-item>
                            <button class="center">
                                Passwort ändern
                            </button>
                        </ons-list-item>
                        <ons-list-item>
                            <button class="center"
                                    @click="logout()">
                                Abmelden
                            </button>
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
    import axios from "axios"
    import {router} from "../main.js"
    // import IconBase from '@/components/icons/IconBase.vue'

    export default {
        name: "Settings",
        components: {
            Navigationbar
        },
        created() {
            // Set status of push notifications
            navigator.serviceWorker.getRegistration('sw_notification.js').then((registration) => {
                this.pushNotificationsEnabled = !!registration;
            });
        },
        data() {
            return {
                title: "Einstellungen",
                pushNotificationsEnabled: false,
                switchOn: true
            }
        },
        methods: {
            togglePushNotifications(e) {
                axios.get("/api/v1/auth/is-authenticated")
                    .then(() => {
                        // Only authenticated users can change the notification settings.
                        if(e.detail.value) {
                            // Enable notifications
                            if (!('serviceWorker' in navigator)) {
                                throw new Error('No Service Worker support!');
                            }

                            if (!('PushManager' in window)) {
                                throw new Error('No Push API Support!');
                            }

                            window.Notification.requestPermission().then((permission) => {
                                if(permission === 'granted'){
                                    navigator.serviceWorker.register('sw_notification.js');
                                    this.pushNotificationsEnabled = true;
                                } else {
                                    // do not toggle the switch
                                    this.pushNotificationsEnabled = false;
                                    throw new Error('Warning: We are not allowed to use notifications');
                                }
                            });
                        } else {
                            // Disable notifications
                            navigator.serviceWorker.getRegistration('sw_notification.js').then((registration) => {
                                if(registration) {
                                    registration.unregister();
                                }
                                this.pushNotificationsEnabled = false;
                            });
                        }
                    })
                    .catch((error) => {
                        if(error && error.response && error.response.status && error.response.status === 401){
                            router.push({ path: '/login', query: { redirect: '/settings' } });
                        }
                    });
           },
            logout() {
                axios.get("/api/v1/auth/logout");
            }
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

</style>
