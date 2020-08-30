import Vue from 'vue'
import Vuex from 'vuex'
import firebase, {firestore} from "firebase/app"
import db from "../../firestore";

Vue.use(Vuex)

const dbRef = db.collection('www.example.com')

const state = {
  pageVisits: [] as Array<object>
}
  
const mutations = {
  loadPageVisits(state: any, val: any) {
     state.pageVisits = val
  },
  addPageVisit(state: any, val: any) {
    state.pageVisits = [...state.pageVisits, val]
  },
  updatePageVisit(state: any, val: any) {
    state.pageVisits = [...state.pageVisits.map((visit: any) => visit.id === val.id ? val : visit)]
  },
  deletePageVisit(state: any, val: any) {
    state.pageVisits = [...state.pageVisits.filter((visit: any) => visit.id !== val.id)]
  }
}
  
const actions = {
  LOAD_PAGE_VISITS({ commit }: any) {
    try {
      dbRef.get().then(snapshot => {
        const pages: any = []
        snapshot.forEach((doc: any) => {
          const id = doc.id
          const data = doc.data()
          const payload = { id, ...data }
          pages.push(payload)
        })
        commit('loadPageVisits', pages)
      })
    } catch (error) {
      console.log(error)
    }
  },
  INIT_PAGE_VISITS({ commit, state }: any) {
    try {
      dbRef.onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          const id = change.doc.id
          const data = change.doc.data()
          const payload: any = { id, ...data }

          // check the doc is already in state
          const isExist = state.pageVisits.find((visit: any) => visit.id === id)

          if (change.type === 'added' && !isExist) {
            commit('addPageVisit', payload)
          }
          if (change.type === 'modified') {
            commit('updatePageVisit', payload)
          }
          if (change.type === 'removed') {
            commit('deletePageVisit', payload)
          }
        })
      });
    } catch (error) {
      console.log(error);
    }
  },
  async HIT_PAGE_VISIT({ commit }: any, route: string) {
    const payload = {
      page: route,
      count: firestore.FieldValue.increment(1),
      updated: firestore.FieldValue.serverTimestamp(),
    }

    // check doc already exists
    const isExist = await dbRef.where('page', '==', route).get()

    try {
      if (isExist.size) {
        await dbRef.doc(isExist.docs[0].id).update(payload)
      }
      else {
        await dbRef.add({ ...payload, created: firebase.firestore.FieldValue.serverTimestamp() })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const getters = {
  pageCount: (state: any) => (route: string) => state.pageVisits?.find((visit: any) => visit.page === route) || 0
}

const modules = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
