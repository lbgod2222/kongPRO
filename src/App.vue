<template>
  <div id="app">
    <!-- 顶部栏 -->
    <nav-bar></nav-bar>
    <!-- 路由点 -->
    <router-view></router-view>
    <div class="blackSheepWall" v-show="this.blackSheepWall">
      <launch-topic v-show="this.ModalLaunchTopic"></launch-topic>
      <transfer v-show="this.ModalTransfer"></transfer>
      <login v-show="this.ModalLogin"></login>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import navBar from './components/navBar/navBar';
// 弹窗组
import launchTopic from './components/Modals/launchTopic/launchTopic';
import login from './components/Modals/login/login';
import popup from './components/Modals/popup/popup';
import transfer from './components/Modals/transfer/transfer';

export default {
  name: 'app',
  components: {
    navBar,
    launchTopic,
    login,
    popup,
    transfer,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['ModalLaunchTopic', 'blackSheepWall', 'ModalTransfer', 'ModalLogin']),
  },
};
</script>

<style>
#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: rgb(29, 32, 32);
  color: rgb(180, 180, 181);
  overflow-y: scroll;
}
.blackSheepWall{
  position: fixed;
  overflow-y: scroll;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
  z-index: 998;
}
</style>
