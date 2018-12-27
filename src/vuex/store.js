import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state={
	footstate:{
		display:""
	}
}

const mutations={
	changefoot(state,str){
		state.footstate.display=str
	}
}

export default new Vuex.Store({
	state,
	mutations
})