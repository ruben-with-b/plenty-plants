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
                axios.get("/api/user")
                    .then((response) => {
                        Console.log(response);
                        self.$set(this, "user", response.data.user);
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
