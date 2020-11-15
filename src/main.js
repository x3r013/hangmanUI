import Vue from 'vue'
import App from './App.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Hangman from './components/Hangman/Hangman.vue'

Vue.config.productionTip = false

const routes ={
  '/': App,
  '/login': Login,
  '/register': Register,
  '/hangman': Hangman
}

//new Vue({
//  render: h => h(App),
//}).$mount('#app')

new Vue({
  el: '#app',
  data:{
    currentRoute: window.location.pathname
  },
  computed:{
    ViewComponent(){
      return routes[this.currentRoute] || App
    }
  },
  render (h) {return h(this.ViewComponent)}
})
