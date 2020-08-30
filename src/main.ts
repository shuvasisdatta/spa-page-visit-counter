import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('visit/LOAD_PAGE_VISITS')
    this.$store.dispatch('visit/INIT_PAGE_VISITS')
  }
}).$mount('#app')
