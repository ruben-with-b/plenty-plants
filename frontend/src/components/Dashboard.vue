<<<<<<< HEAD
<template>
    <div>
        <h2>Dashboard</h2>
        <p>eMail: {{ user.email }}</p>
    </div>
</template>
<script>
    import router from "../main.js";
    import axios from "axios"
    import Console from "console"
    export default {
        name: "Login",
        data() {
            return {
                user: {
                    email: ""
                }
            }
        },
        methods: {
            getUserData: function() {
                let self = this;
                axios.get("/api/v1/user")
                    .then((response) => {
                        Console.log(response);
                        self.$set(this, "user", response.data);
                    })
                    .catch((errors) => {
                        Console.log(errors);
                        router.push("/");
                    })
            }
        },
        mounted() {
            this.getUserData()
        }
    }
</script>
=======
<template id="main">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">{{ title }}</div>
      <div class="right">
        <v-ons-toolbar-button icon="ion-navicon, material: md-menu"></v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <p style="text-align: center">
      Some content.
    </p>
  </v-ons-page>
</template>

<script>
export default {
  name: 'Dashboard',
  props: {
    msg: String
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
>>>>>>> Setup Onsen UI
