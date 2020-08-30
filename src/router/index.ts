import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import { Home, About, Contact } from "../views";
import store from "../store";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router: VueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach(async (to: Route) => {
  const routesExpired: number = 8 * 60 * 60 * 1000  // 8 hours -> converted to miliseconds
  const routesSaved: number = JSON.parse(localStorage.getItem('ROUTES_SAVED') || '0')
  
  // clear localStorage if expired
  if ((new Date().getTime() - routesSaved) > routesExpired) {
    localStorage.removeItem('ROUTES')
    localStorage.removeItem('ROUTES_SAVED')
  }
  
  const routes: any = JSON.parse(localStorage.getItem('ROUTES') || JSON.stringify([]))

  if (!routes.includes(to.name)) {
    routes.push(to.name)
    localStorage.setItem('ROUTES', JSON.stringify(routes))
    localStorage.setItem('ROUTES_SAVED', new Date().getTime().toString())
    if (to.name) await store.dispatch('visit/HIT_PAGE_VISIT', to.name)
  }
})


export default router
