import Vue from 'vue'
import Vuex from 'vuex'
import newsHome from './modules/newsHome'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters : {},
  mutations: {},
  actions:{},
  
  modules : {
    newsHome
  }
})
