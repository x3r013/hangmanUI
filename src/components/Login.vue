<template>
<div class="login-form">
    <h1>Login</h1>
    <form id="login-form" @keyup="validateForm" @change="validateForm">
        <div><input v-model="formValues.userName" placeholder="username" type="text" /></div>
        <div><input v-model="formValues.password" placeholder="password" type="password" /></div>
        <p v-if="err.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in err" v-bind:key="error">{{ error }}</li>
            </ul>
        </p>
        <div><button @click.prevent="login()">Login</button></div>

        <section v-if="state === 1"><span class="wait-msg">Please wait...</span></section>
        <section v-if="state === 2"><span class="error-msg">There was an error trying to login.</span></section>
        <section v-if="state === 3"><span class="error-msg">login successful.</span></section>
    </form>
    <!--<a href="/register">Click here to register.</a>-->
</div>
</template>

<script>
import axios from "axios";
export default {
    name: 'Login',
    mounted() {
        axios.get(this.apiUrl + 'Test')
            .then((response) => {
                console.log(response);
            });
    },
    data() {
        return {
            formValues: {
                userName: '',
                password: ''                
            },
            apiUrl: 'https://localhost:9093/',
            state: 0,
            err: new Array()
        }
    },
    methods: {
        validateForm: function () {
            this.err = new Array();
            if (!this.formValues.userName) {
                this.err.push("Username required.");
            }
            if(!this.formValues.password){
                this.err.push("Password required.");
            }
        },
        login() {
            this.state = 1;
            axios.post(this.apiUrl + 'Login', this.createLoginFromForm())
                .then(response => {
                    localStorage.accessToken = response.data['accessToken'];
                    localStorage.username = response.data['username'];
                    this.state = 3;
                    this.clearForm();
                    //window.location.href = '/hangman';
                })
                .catch(error => {
                    console.log(error);
                    this.state = 2;
                })
                .finally(() => this.pleaseWait = false)
        },
        createLoginFromForm() {
            var newUser = {
                UserName: this.formValues.userName,
                Password: this.formValues.password
            }
            return newUser;
        },
        clearForm() {
            this.formValues.userName = '';
            this.formValues.password = '';
        }
    }
}
</script>

<style scoped>
.login-form {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
ul{
    list-style:none;    
}
div{
    margin:0.5vw;    
}
input{
    padding:0.5vw;
    border-radius:0.5vw;
}

button {
    background: #35495E;
    color: #FFFFFF;
    padding: 0.5vw;
    border-radius: 0.5vw;
    margin: 1vw;
    cursor: pointer;
}
</style>
