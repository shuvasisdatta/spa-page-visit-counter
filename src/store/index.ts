import Vue from 'vue'
import Vuex from 'vuex'
import {PageVisit} from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        visit: PageVisit
    }
}) 