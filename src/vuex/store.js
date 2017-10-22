// Public store here
import Vue from 'vue';
import Vuex from 'vuex';
// import actions from './actions';
import mutations from './mutations';
// import getters from './getters';
Vue.use(Vuex);

const state = {
  blackSheepWall: false,
  ModalLaunchTopic: false,
  ModalTransfer: false,
};

export default new Vuex.Store({
  state,
  mutations,
});
