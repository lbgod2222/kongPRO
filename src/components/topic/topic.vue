<template>
  <div class="topic-contain">
    <ul>
      <router-link to="/topic/all" @click="show">全部</router-link>
      <router-link to="/topic/ongoing" @click="show">进行中</router-link>
      <router-link to="/topic/revealing" @click="show">等待揭示</router-link>
      <router-link to="/topic/announcing" @click="show">宣布</router-link>
      <router-link to="/topic/mediating" @click="show">审核中</router-link>
      <router-link to="/topic/done" @click="show">已完成</router-link>
    </ul>
    <span @click="launchTopic"> + 发布一个市场</span>
    <div class="clear"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'topic',
  data() {
    return {
      // 弃用 选用公共state curtain
      isCurtainShow: false,
    };
  },
  methods: {
    // shorthand of method
    show() {
      // 调用mutation 控制公共state curtain
      this.isCurtainShow = true;
    },
    launchTopic() {
      if (!this.$store.state.isLogin) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '请先登录',
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalLaunchTopic');
    },
  },
};
</script>

<style scoped>
  .topic-contain{
      box-sizing: border-box;
      margin: 90px auto 0;
      max-width: 1600px;
      min-width: 1024px;
      width: 100%;
      height: 600px;
      padding: 0 1.5% 0;
  }
  .topic-contain ul{
      box-sizing: border-box;
      box-shadow: 0px 0px 10px rgb(26, 29, 29);
      display: inline-flex;
      justify-content:space-between;
      float: left;
      background-color: rgb(37, 39, 40);
      width: 82%;
      height: 40px;
      line-height: 40px;
      padding: 0 3% 0;
  }
  .topic-contain span{
    cursor: pointer;
    box-shadow: 0px 0px 10px rgb(26, 29, 29);
    display: inline-block;
    height: 40px;
    width: 16%;
    margin-left: 2%;
    background-color: rgb(37, 39, 40);
    line-height: 40px;
    text-align: center;
  }
  .topic-contain ul a{
      display: inline-block;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      text-align: center;
      width: 7%;
  }
  .topic-contain a.router-link-active{
    color: rgb(33, 133, 150);
    border-bottom: 2px solid rgb(33, 133, 150);
  }
  .clear{
    clear: both;
  }
</style>
