<template>
  <div class="topic-contain">
    <ul>
        <router-link to="/topic/all" @click="show">ALL</router-link>
        <router-link to="/topic/progress" @click="show">PROGRESS</router-link>
        <router-link to="/topic/public" @click="show">PUBLIC</router-link>
        <router-link to="/topic/done" @click="show">DONE</router-link>
    </ul>
    <span @click="launchTopic"> + Issue A Topic</span>
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
      height: 40px;
      line-height: 40px;
      text-align: center;
      width: 15%;
  }
  .topic-contain a.router-link-active{
    color: rgb(33, 133, 150);
  }
  .clear{
    clear: both;
  }
</style>
