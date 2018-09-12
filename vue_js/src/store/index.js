import Vue from 'vue'
import Vuex from 'vuex'

import news from './modules/news'

Vue.use(Vuex)

const modules = {
  news
}

export default new Vuex.Store({
  modules,
  strict: true
})
