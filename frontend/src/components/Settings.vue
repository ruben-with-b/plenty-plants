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
                        <!--<ons-list-item>
                            <label class="center">
                                Username ändern
                            </label>
                        </ons-list-item>
                        <ons-list-item>
                            <label class="center">
                                Passwort ändern
                            </label>
                        </ons-list-item>-->
                        <ons-list-item v-if="isUserAuthenticated">
                            <label class="center" @click="logout()">
                                Abmelden
                            </label>
                        </ons-list-item>
                        <ons-list-item v-if="!isUserAuthenticated">
                            <label class="center" @click="login()">
                                Anmelden
                            </label>
                        </ons-list-item>
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
    import * as AuthService from '../services/AuthService.js'
    import * as PushService from '../services/PushService.js'
    import {router} from "../main.js"
    // import IconBase from '@/components/icons/IconBase.vue'

    export default {
        name: "Settings",
        components: {
            Navigationbar
        },
        created() {
            // Set status of push notifications
            PushService.isEnabled().then((isRegistered) => {
                this.pushNotificationsEnabled = isRegistered
            });

            AuthService.isUserAuthenticated().then((isAuthenticated) => {
               this.isUserAuthenticated = isAuthenticated;
            });
        },
        data() {
            return {
                title: "Einstellungen",
                pushNotificationsEnabled: false,
                isUserAuthenticated: false
            }
        },
        methods: {
            togglePushNotifications(e) {
                AuthService.isUserAuthenticated()
                    .then((isAuthenticated) => {
                        if(!isAuthenticated) {
                            // Only authenticated users can change the notification settings.
                            router.push({ path: '/login', query: { redirect: '/settings' } });
                            return;
                        }

                        if(e.detail.value) {
                            PushService.enable().then((isEnabled) => {
                               this.pushNotificationsEnabled= isEnabled;
                            });
                        } else {
                            PushService.disable().then(() => {
                                this.pushNotificationsEnabled = false;
                            });
                        }
                    });
           },
            logout() {
                AuthService.logout().then(() => {
                   this.isUserAuthenticated = false;
                });
            },
            login() {
                router.push({ path: '/login', query: { redirect: '/settings' } });
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
