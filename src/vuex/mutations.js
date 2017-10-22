// Funcs to deal with public stores here

const mutations = {
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
};

export default mutations;
