// Public store here
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const state = {
  blackSheepWall: false,
  ModalLaunchTopic: false,
  ModalTransfer: false,
  ModalLogin: false,
  ModalAnnounce: false,
  announceId: 0,
  isLogin: false,
  announceTitle: null,
  transferType: null,
  user: {
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
