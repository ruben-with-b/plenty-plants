<template>
    <div class="root">
        <v-ons-page class="">
            <div class="container flex center-ver center-content">
                <v-ons-toolbar modifier="transparent">
                    <div class="center">{{ title }}</div>
                </v-ons-toolbar>
                <div class="">
                    <form @submit.prevent="login" class="flex wrap flex-column center-ver">
                        <icon-base class="logo" width="120" height="120" viewBox="0 0 50 50" icon-name="noun-gardening" >
                            <Plant />
                        </icon-base>
                        <div class="border-input">
                            <v-ons-input placeholder="Dein Username" float
                                v-model="name" name="username"
                            >
                            </v-ons-input>
                        </div>
                        <div class="border-input">
                            <v-ons-input placeholder="Dein Passwort" float
                                v-model="password" name="password"
                            >          
                            </v-ons-input>
                        </div>
                        <v-ons-button type="submit" @click="login()">Anmelden
                            <div class="border-button"></div>
                        </v-ons-button>
                    </form>
                </div>
            </div>
            <div class="offset-navi"></div>
            <Navigationbar></Navigationbar>
            <v-ons-toast :visible.sync="toastVisible" animation="ascend">
                Bitte melde dich an, um fortzufahren!
                <button @click="toastVisible = false">ok</button>
            </v-ons-toast>
        </v-ons-page>
    </div>
</template>

<script>
    import Navigationbar from './NavigationBar.vue'
    import IconBase from '@/components/icons/IconBase.vue'
    import Plant from '@/components/icons/Plant.vue'

    import axios from "axios"
    import Console from "console"
    import {router} from "../main.js"
    export default {
        name: "Login",
        components: {
            Navigationbar,
            Plant,
            IconBase
        },
        data() {
            return {
                title: 'Login',
                name: '',
                password: '',
                toastVisible: true // when user not logged in
            }
        },
        methods: {
            login() {
                let name = this.name;
                let password = this.password;
                let login = () => {
                    let authHeader = {
                        auth: {
                            username: name,
                            password: password
                        },
                    };
                    axios.post("/api/v1/auth/login", {}, authHeader)
                        .then(() => {
                            Console.log("Logged in");
                            router.push(this.$route.query.redirect || '/');
                        })
                        .catch((errors) => {
                            Console.log("Cannot log in. Error: " + errors.message);
                        })
                };
                login()
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
}

ons-input{
    width: 40vw !important;
}

.container{
    height: 89vh;
}
.logo{
    margin-bottom: 4em;
}

</style>
