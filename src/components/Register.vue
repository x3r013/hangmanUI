<template>
<div class="register-form">
    <h1>Register</h1>
    <form id="registration-form" @keyup="validateForm" @change="validateForm">
        <div><input v-model="formValues.firstName" placeholder="first name" type="text" /></div>
        <div><input v-model="formValues.userName" placeholder="username" type="text" /></div>
        <div><input v-model="formValues.lastName" placeholder="last name" type="text" /></div>
        <div><input v-model="formValues.email" placeholder="email" type="email" /></div>
        <div><input v-model="formValues.password" placeholder="password" type="password" /></div>
        <div><input v-model="formValues.confirmPassword" placeholder="confirm password" type="password" /></div>
        <p v-if="err.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in err" v-bind:key="error">{{ error }}</li>
            </ul>
        </p>
        <div><button @click.prevent="register()">Register</button></div>

        <section v-if="state === 1"><span class="wait-msg">Please wait...</span></section>
        <section v-if="state === 2"><span class="error-msg">There was an error trying to process your registration.</span></section>
        <section v-if="state === 3"><span class="success-msg">Registration successful.</span></section>

        <!--<a href="/">back to login</a>-->
    </form>
</div>
</template>

<script>
import axios from "axios";

export default {
    name: 'Register',
    mounted() {
        axios.get(this.apiUrl + 'Test')
            .then((response) => {
                console.log(response);
            });
    },
    data() {
        return {
            formValues: {
                firstName: '',
                userName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            apiUrl: 'https://localhost:9093/',
            state: 0,
            err:new Array()
        }
    },
    methods: {
        validateForm: function () {
            this.err = new Array();
            if (!this.formValues.firstName) {
                this.err.push("First name required.");
            }
            if(!this.formValues.userName){
                this.err.push("Username required.");
            }
            if(!this.formValues.lastName){
                this.err.push("Last name required.");
            }
            if(!this.formValues.email){
                this.err.push("Email required.");
            }
            if(!this.formValues.password){
                this.err.push("Password required.");
            }
            if(!this.formValues.confirmPassword){
                this.err.push("Password confirmation required.");
            }
            if(this.formValues.confirmPassword !== this.formValues.password){
                this.err.push("Passwords do not match.");
            }
        },
        register() {
            this.state = 1;
            axios.post(this.apiUrl + 'UserAccount', this.createUserFromForm())
                .then(response => {
                    console.log(response);
                    this.state = 3;
                    this.clearForm();
                })
                .catch(error => {
                    console.log(error);
                    this.state = 2;
                })
                .finally(() => this.pleaseWait = false)
        },
        createUserFromForm() {
            var newUser = {
                FirstName: this.formValues.firstName,
                UserName: this.formValues.userName,
                LastName: this.formValues.lastName,
                Email: this.formValues.email,
                Password: this.formValues.password
            }
            return newUser;
        },
        clearForm() {
            this.formValues.firstName = '';
            this.formValues.userName = '';
            this.formValues.lastName = '';
            this.formValues.email = '';
            this.formValues.password = '';
            this.formValues.confirmPassword = '';
        }
    }
}
</script>

<style scoped>
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
