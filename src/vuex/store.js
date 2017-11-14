// Public store here
import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const state = {
  // modal area
  blackSheepWall: false,
  ModalLaunchTopic: false,
  ModalTransfer: false,
  ModalLogin: false,
  ModalAnnounce: false,
  ModalPopup: false,
  ModalRule: false,
  // modal area end
  // modal popup status
  PopupStatus: {
    // 0 for success, 1 for error
    status: 1,
    msg: '成功！',
  },
  // modal popup status end
  // transfer status
  announceId: 0,
  announceTitle: null,
  transferType: null,
  // transfer status end
  // user status
  isLogin: false,
  hasNick: false,
  user: {
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
