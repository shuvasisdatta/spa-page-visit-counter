# SPA Page Visit Counter

Page visit counter for Single Page Application (Vue.js, React.js etc.) using Firebase. This is a starter example project using Vue-cli (Typescript), Vuex, Vue-router and Firebase. 



## Project setup
```
yarn install
```
Replace .env.example with .env and add your firebase credintials there
In src/store/modules/PageVisit.ts  replace the 'www.example.com' with your desired firebase collection name (better to use your domain name).
```
const dbRef = db.collection('www.example.com') 
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
