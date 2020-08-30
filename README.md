# SPA Page Visit Counter

Real time Page visit counter for Single Page Application (Vue.js, React.js etc.) using Firebase. This is a starter example project using Vue-cli (Typescript), Vuex, Vue-router and Firebase. 

## Project setup
```
yarn install
```
Replace .env.example with .env and add your firebase credintials there
In src/store/modules/PageVisit.ts  replace the 'www.example.com' with your desired firebase collection name (better to use your domain name).
```
const dbRef = db.collection('www.example.com') 
```
You can access the Vuex state variable for this page visit counter state like below code in your component
```
this.$store.state.visit.pageVisits
```

You can use any of the below written property of a page visit information in your vuejs component that stored in an document of firebase
```
{ id, page, count, created, updated }
```

You can use a getters for getting specific page visit count information which can be used as a computed property in your main component to get all page info via one single method call. This getters method requires a parameter to be passed that is the route or page name. See the example below.
```
computed: {
    pageVisit() {
        return this.$store.getters['visit/pageCount'](this.$route.name)
    }
}
```

By default it doesn't increament the page count that you visited already within 8 hours. After 8 hours it will increment the page count you visits. You can modify the timing '8 * 60 * 60 * 1000' in src/routes/index.ts file where 8 is the hour and the time is in miliseconds 

```
const routesExpired: number = 8 * 60 * 60 * 1000  // 8 hours -> converted to miliseconds
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
