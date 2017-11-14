<template>
  <div id="app">
    <!-- 顶部栏 -->
    <nav-bar></nav-bar>
    <!-- 路由点 -->
    <router-view></router-view>
    <transition name="curtain-fade">
      <div class="blackSheepWall" v-show="this.blackSheepWall">
        <transition name="lanch-topic-ani">
          <launch-topic v-if="this.ModalLaunchTopic"></launch-topic>
        </transition>
        <transition name="login-ani">
          <login v-show="this.ModalLogin"></login>
        </transition>
        <transition name="transfer-ani">
          <transfer v-if="this.ModalTransfer"></transfer>
        </transition>
        <transition name="announce-ani">
          <announce v-if="this.ModalAnnounce"></announce>
        </transition>
        <transition name="rule-ani">
          <rule v-if="this.ModalRule"></rule>
        </transition>
      </div>
    </transition>
    <transition name="popup">
      <popup v-show="this.ModalPopup"></popup>
    </transition>
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
import announce from './components/Modals/announce/announce';
import rule from './components/Modals/rule/rule';

export default {
  name: 'app',
  components: {
    navBar,
    launchTopic,
    login,
    popup,
    transfer,
    announce,
    rule,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['ModalLaunchTopic', 'blackSheepWall', 'ModalTransfer', 'ModalLogin', 'ModalAnnounce', 'ModalPopup', 'ModalRule']),
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
  height: 4000px;
  background-color: rgba(0, 0, 0, .8);
  z-index: 998;
}
/* 动画 */
.lanch-topic-ani-enter-active, .lanch-topic-ani-leave-active{
  transition: all, .6s ease-in;
}
.lanch-topic-ani-enter{
  top: -2000px;
}
/* 动画 */
.login-ani-enter-active, .login-ani-leave-active{
  transition: all, .6s ease-in;
}
.login-ani-enter{
  top: -2000px;
}
/* 动画 */
.transfer-ani-enter-active, .transfer-ani-leave-active{
  transition: all, .6s ease-in;
}
.transfer-ani-enter{
  top: -2000px;
}
/* 动画 */
.announce-ani-enter-active, .announce-ani-leave-active{
  transition: all, .6s ease-in;
}
.announce-ani-enter{
  top: -2000px;
}
/* 动画 */
.rule-ani-enter-active, .rule-ani-leave-active{
  transition: all, .6s ease-in;
}
.rule-ani-enter{
  top: -2000px;
}
/* popup 弹窗 */
.popup-enter-active{
  animation: popup .8s ease-in-out 1 both;
}
.popup-leave-active{
  animation: popup-fade .8s ease-in-out 1 both;
}
.popup-leave{
  transform: scale(0);
}
/* curtain动画 */
/* 过程显示 */
.curtain-fade-enter-active, .curtain-fade-leave-active{
  transition: all .4s ease-in-out;
}
.curtain-fade-enter, .curtain-fade-leave-active{
  top: -1000px;
}
/* key-frame popup */
@keyframes popup {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(1.35);
  }
  45% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes popup-fade {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.35);
  }
  45% {
    transform: scale(0);
  }
  100% {
    transform: scale(0);
  }
}

</style>
