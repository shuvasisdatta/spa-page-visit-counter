<template>
  <div id="app">
    <div id="nav">
      <router-link v-for="(route, index) in routes" :key="route.path" :to="route.path">
        {{index? ' | ': ''}}{{route.name}}
      </router-link>
    </div>
    <div>
      {{pageVisit.page}} has {{pageVisit.count }} visits
    </div>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  computed: {
    pageVisit() {
      return this.$store.getters['visit/pageCount'](this.$route.name)
    },
    routes() {
      return this.$router.options.routes
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
