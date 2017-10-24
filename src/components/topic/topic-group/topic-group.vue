 /* eslint-disable */
<template>
  <div class="topic-group-contain">
    <!-- <h1> {{title}} PAGE</h1> -->
    <!-- 子组件占位<topic-item class="extra-content"></topic-item> -->
    <topic-item class="extra-content" v-for="(item, index) in this.topicAll" :item="item"></topic-item>
    <!-- <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div>
    <div class="extra-content"></div> -->
  </div>
</template>
sadasd
<script>
 /* eslint-disable */
import topicItem from './topic-item/topic-item';

export default {
  name: 'topic-group',
  components: {
    topicItem,
  },
  data() {
    return {
      topicAll: {},
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   // this.data.title = to.meta.current;
  //   setTimeout(() => {
  //     next((vm) => {
  //       // 获取数据
  //       vm.title = to.meta.current;
  //       if (to.meta.current === 'all') {
  //         this.$store.dispatch('getMarketOverview', {
  //           state: null,
  //           limit: 12,
  //           offset: 0,
  //           that: this,
  //           cb(err, res) {
  //             if (err) {
  //               return;
  //             }
  //             vm.topicAll = res.markets;
  //           },
  //         });
  //       }
  //     });
  //   }, 0);
  // },
  created() {
    console.log(this);
    if (this.$route.meta.current === 'all') {
      this.getData(null, 12, 0);
    } else if (this.$route.meta.current === 'progress') {

    }
    console.log(this);
    // 此时关闭公共state curtain
    // 调用mutation 关闭 公共 state curtain
  },
  methods: {
    getData(state, limit, offset) {
      let that = this;
      this.$store.dispatch('getMarketOverview', {
        state: state,
        limit: limit,
        offset: offset,
        that: that,
      }).then((res) => {
        console.log(res.data)
        this.topicAll = res.data.markets;
      })
    },
  }
};
</script>

<style scoped>
  .topic-group-contain{
      display: flex;
      flex-flow:row wrap;
      /* justify-content:space-between; */
      margin-top: 30px;
      /* background-color: rgb(37, 39, 40); */
      width: 100%;
      height: 600px;
  }
  .extra-content{
    margin-bottom: 40px;
    margin-right: 1.5%;
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
