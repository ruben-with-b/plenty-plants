<template>
    <div>
        <h2>Login</h2>
        <form v-on:submit="login">
            <input type="text" name="email"/><br>
            <input type="password" name="password"/><br>
            <input type="submit" value="Login"/>
        </form>
    </div>
</template>

<script>
    import router from "../main.js";
    import axios from "axios"
    import Console from "console"
    export default {
        name: "Login",
        methods: {
            login: (e) => {
                e.preventDefault();
                let email = e.target.elements.email.value;
                let password = e.target.elements.password.value;
                let login = () => {
                    let data = {
                        email: email,
                        password: password
                    };
                    axios.post("/api/login", data)
                        .then(() => {
                            Console.log("Logged in");
                            router.push("/dashboard")
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