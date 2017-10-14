<template>
  <div id="app">
    <!-- 顶部栏 -->
    <nav-bar></nav-bar>
    <!-- 路由点 -->
    <router-view></router-view>
  </div>
</template>

<script>
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
};
</script>

<style>
#app {
  overflow: hidden;
  width: 100%;
  background-color: rgb(29, 32, 32);
  color: #fff;
}
</style>
