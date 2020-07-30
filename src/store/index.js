import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
					centerLetter: '',
					letters: [],
					answers: [],
					found: [],
					count: 0
  },
  mutations: {
					increment (state) {
								state.count++;
					}
  },
  actions: {
  },
  modules: {
  }
})
