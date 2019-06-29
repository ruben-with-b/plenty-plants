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
    import axios from "axios"
    import Console from "console"
    import {router} from "../main.js"
    export default {
        name: "Login",
        methods: {
            login: (e) => {
                e.preventDefault();
                let email = e.target.elements.email.value;
                let password = e.target.elements.password.value;
                let login = () => {
                    let authHeader = {
                        auth: {
                            username: email,
                            password: password
                        },
                    };
                    axios.post("/api/v1/auth/login", {}, authHeader)
                        .then(() => {
                            Console.log("Logged in");
                            router.push('/');
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