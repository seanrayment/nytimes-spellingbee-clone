import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	centerLetter: '',
	letters: [],
	answers: [],
	found: [],
	count: 0,
	animations: [],
  },
  mutations: {
	increment (state) {
				state.count++;
	},
	pushAnimation (state, points) {
		const newArr = state.animations;
		newArr.push(points);
		state.animations = newArr;
	},
	popAnimation (state) {
		const newArr = state.animations;
		newArr.pop();
		state.animations = newArr;
	}
  },
  actions: {
  },
  modules: {
  }
})
