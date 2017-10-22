<template>
  <div class="topic-group-contain">
    <!-- <h1> {{title}} PAGE</h1> -->
    <!-- 子组件占位<topic-item class="extra-content"></topic-item> -->
    <topic-item class="extra-content"></topic-item>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
  </div>
</template>

<script>
import topicItem from './topic-item/topic-item';

export default {
  name: 'topic-group',
  components: {
    topicItem,
  },
  data() {
    return {
      title: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    // this.data.title = to.meta.current;
    setTimeout(() => {
      next((vm) => {
        vm.title = to.meta.current;
      });
    }, 0);
  },
  created() {
    console.log(this);
    // 此时关闭公共state curtain
    // 调用mutation 关闭 公共 state curtain
  },
};
</script>

<style scoped>
  .topic-group-contain{
      display: flex;
      flex-flow:row wrap;
      justify-content:space-between;
      margin-top: 30px;
      /* background-color: rgb(37, 39, 40); */
      width: 100%;
      height: 600px;
  }
  .extra-content{
    margin-bottom: 40px;
    width: 23%;
    height: 314px;
    background-color: rgb(37, 39, 40);
  }
  @media screen and ( min-width : 1600px) {
    .extra-content{
      margin-bottom: 40px;
      width: 23%;
      height: 480px;
      background-color: rgb(37, 39, 40);
    }
  }
  @media screen and ( min-width : 1024px) and (max-width: 1600px) {
    .extra-content{
      height: 30vw;
      margin-bottom: 40px;
      width: 23%;
      background-color: rgb(37, 39, 40);
    }
  }
</style>
