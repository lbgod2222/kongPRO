 /* eslint-disable */
<template>
  <div class="topic-group-contain">
    <!-- 黑幕 -->
    <transition name="curtain-fade">
      <div class="curtain" v-show="isCurtain">
        <iframe src="/static/img/loading-bars.svg" width="100" height="100"></iframe>
      </div>
    </transition>
    <topic-item class="extra-content" v-for="(item, index) in this.topicAll" :item="item"></topic-item>
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
      isCurtain: false,
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
    } else if (this.$route.meta.current === 'ongoing') {
      this.getData(0, 12, 0);
    } else if (this.$route.meta.current === 'revealing') {
      this.getData(1, 12, 0);
    } else if (this.$route.meta.current === 'announcing') {
      this.getData(2, 12, 0);
    } else if (this.$route.meta.current === 'mediating') {
      this.getData(3, 12, 0);
    } else if (this.$route.meta.current === 'done') {
      this.getData(4, 12, 0);
    }
    console.log(this);
    // 此时关闭公共state curtain
    // 调用mutation 关闭 公共 state curtain
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.topicAll = {};
  //   if (from.$route.meta.current === 'all') {
  //     console.log('route changed! to all');
  //     this.getData(null, 12, 0);
  //   } else if (from.$route.meta.current === 'progress') {
  //     console.log('route changed! to pro');
  //     this.getData(0, 12, 0);
  //   } else if (from.$route.meta.current === 'public') {
  //     console.log('route changed! to pub');
  //     this.getData(2, 12, 0);
  //   } else if (from.$route.meta.current === 'done') {
  //     console.log('route changed! to done');
  //     this.getData(4, 12, 0);
  //   }
  //   this.page = to.params.page;
  //   next();
  // },
  watch: {
    '$route': 'getDataForUpdate',
  },
  methods: {
    getData(state, limit, offset) {
      this.isCurtain = true;
      let that = this;
      this.$store.dispatch('getMarketOverview', {
        state: state,
        limit: limit,
        offset: offset,
        that: that,
      }).then((res) => {
        console.log(res.data)
        this.topicAll = res.data.markets;
        this.$store.dispatch('getBlockHeight', {
          that,
        }).then((res2) => {
          that.currentHeight = res2.data.height;
          for (let i = 0; i < that.topicAll.length; i+=1) {
            that.topicAll[i].progressInfo = Number((((Number(that.currentHeight) - Number(that.topicAll[i].t_height)) / (Number(that.topicAll[i].endHeight) - Number(that.topicAll[i].t_height))) * 100).toFixed(3));
          }
          that.isCurtain = false;
        });
      })
    },
    getDataForUpdate(){
      if (this.$route.meta.current === 'all') {
        this.getData(null, 12, 0);
      } else if (this.$route.meta.current === 'ongoing') {
        this.getData(0, 12, 0);
      } else if (this.$route.meta.current === 'revealing') {
        this.getData(1, 12, 0);
      } else if (this.$route.meta.current === 'announcing') {
        this.getData(2, 12, 0);
      } else if (this.$route.meta.current === 'mediating') {
        this.getData(3, 12, 0);
      } else if (this.$route.meta.current === 'done') {
        this.getData(4, 12, 0);
      }
    }
  }
};
</script>

<style scoped>
  .topic-group-contain{
    position: relative;
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
  /* 黑幕 */
  .curtain{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .8);
  }
  .curtain iframe{
    display: block;
    margin: 100px auto 0 auto;
  }
  /* curtain动画 */
  /* 过程显示 */
  .curtain-fade-enter-active, .curtain-fade-leave-active{
    transition: all .2s ease;
  }
  .curtain-fade-enter, .curtain-fade-leave-active{
    opacity: 0;
  }
</style>
