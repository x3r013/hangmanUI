<template>
<div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Register />
    <Login />
    <Hangman />    
</div>
</template>

<script>
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Hangman from './components/Hangman/Hangman.vue'

export default {
    name: 'App',
    components: {
        Register,
        Login,
        Hangman
    },
    data() {
        return {
            currentRoute: window.location.pathname
        }
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
