// Funcs to deal with public stores here
import aschJS from 'asch-js';

const mutations = {
  // user login
  login: (state, { resource }) => {
    state.user.resource = resource;
  },
  loginBase: (state, { secret }) => {
    const keypair = aschJS.crypto.getKeys(secret);
    const address = aschJS.crypto.getAddress(keypair.publicKey);
    window.sessionStorage.setItem('secret', secret);
    window.sessionStorage.setItem('address', address);
    window.sessionStorage.setItem('isLogin', true);
    state.user.address = address;
    state.user.secret = secret;
    state.isLogin = true;
  },
  loginStatue: (state) => {
    state.isLogin = !state.isLogin;
  },
  // switch blackSheepWall
  switchBlackSheepWall: (state) => {
    state.blackSheepWall = !state.blackSheepWall;
  },
  // switch launch topic modal
  switchModalLaunchTopic: (state) => {
    state.ModalLaunchTopic = !state.ModalLaunchTopic;
  },
  // switch transfer modal
  switchModalTransfer: (state) => {
    state.ModalTransfer = !state.ModalTransfer;
  },
  // switch login modal
  switchModalLogin: (state) => {
    state.ModalLogin = !state.ModalLogin;
  },
};

export default mutations;
