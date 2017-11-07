<template>
  <div class="topic-exh-contain">
    <div class="exh-top">
      <div class="img" :style="{backgroundImage: 'url(' + img + ')'}" @click="SHOW">
        <!-- <img v-bind:src="item.image" alt="投票图片"> -->
      </div>
      <div class="info">
        <div class="detail">
          <h2>{{this.item.title}}</h2>
          <span>发起人：{{this.item.initiator}}</span>
          <span>代币种类: {{this.item.currency}}</span>
          <span>保证金: {{this.item.margin / 10000000}}</span>
          <span>初始股份: {{this.item.share}}</span>
          <span>市场ID: {{this.item.id}}</span>
        </div>
        <div class="progress">
          <span>状态: {{this.item.status}}</span>
          <span class="_top">TIME(N/E):{{this.progressInfo > 100 ? 100 : this.progressInfo}}%</span>
          <progress max="100" :value="Number(this.progressInfo)"></progress>
          <span class="_bottom"><b>{{this.item.status}}</b><b>结束: {{this.item.timestamp}}</b></span>
        </div>
      </div>
    </div>
    <ul>
      <!-- <router-link to="/topicExh/{{project id}}/exhProgress">EXH_PROGRESS</router-link> -->
      <router-link :to="{ path: `/topicExh/${this.$route.params.id}`}">概览</router-link>
      <router-link :to="{ path: `/topicExh/${this.$route.params.id}/exhDetail`}">详情</router-link>
      <router-link :to="{ path: `/topicExh/${this.$route.params.id}/exhComment/1`}">评论</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
/* eslint-disable*/
  // we need props here {params(number) marketID / QUERY:userID}
  import realTime from '../../../static/js/getRealTime';

  export default {
    name: 'topic-exh',
    data() {
      return {
        item: '',
        currentHeight: 0,
        progressInfo: 0,
      };
    },
    created() {
      console.log(this.item);
      const that = this;
      this.$store.dispatch('getSepecificMarket', {
        id: this.$route.params.id,
        that,
      }).then((res) => {
        console.log(res);
        const a = res.data.market;
        const myUrl = a.image;
        if (a.state === 0) {
          a.status = '进行中';
        } else if (a.state === 1) {
          a.status = '等待揭晓';
        } else if (a.state === 2) {
          a.status = '正在公布';
        } else if (a.state === 3) {
          a.status = '等待仲裁';
        } else {
          a.status = '已结束';
        }
        that.item = a;
        that.item.imageUrl = myUrl;
        that.item.timestamp = realTime.formatDateTime(that.item.timestamp);
        that.$store.dispatch('getBlockHeight', {
          that,
        }).then((res2) => {
          that.currentHeight = res2.data.height;
          that.progressInfo = Number((((Number(that.currentHeight) - Number(that.item.t_height)) / (Number(that.item.endHeight) - Number(that.item.t_height))) * 100).toFixed(3));
        });
      });
      console.log(this);
    },
    computed: {
      status() {
      },
      img() {
        return this.item.image;
      },
      currentTime() {
        const now = new Date();
        return now.getTime();
      },
    },
    methods: {
      SHOW() {
        console.log(this);
      },
    },
  };
</script>

<style scoped>
  .topic-exh-contain {
    box-sizing: border-box;
    max-width: 1600px;
    min-width: 1024px;
    margin: 90px auto 0;
    width: 100%;
    padding: 0 1.5% 0;
  }

  .exh-top {
    width: 100%;
    height: 300px;
  }

  .exh-top .img {
    display: inline-block;
    width: 63%;
    height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .exh-top .img img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .topic-exh-contain ul {
    display: block;
    line-height: 40px;
    margin-top: 30px;
    height: 40px;
    width: 100%;
    background-color: rgb(37, 39, 40);
    border-bottom: 2px solid rgb(30, 33, 35);
  }

  .topic-exh-contain ul a {
    display: inline-block;
    box-sizing: border-box;
    width: 6%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 1.2em;
  }
  .topic-exh-contain ul a:nth-child(2), .topic-exh-contain ul a:nth-child(3){
    margin-left: 40px;
  }
  a.router-link-exact-active{
    color: #1EC2DB;
    border-bottom: 2px solid #1EC2DB;
  }
  .info {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    float: right;
    width: 35%;
    height: 300px;
    margin-left: 1.5%;
    background-color: rgb(37, 39, 40);
  }

  .info .detail {
    width: 90%;
    margin: auto;
    padding: 20PX 0;
  }

  .info .detail span {
    display: block;
    margin-top: 5px;
  }

  .info .detail span:nth-child(2) {
    margin-top: 15px;
  }

  ._top {
    float: right;
  }

  ._bottom {
    width: 100%;
    display: block;
    margin-top: 20px;
  }

  ._bottom b:nth-child(1) {
    font-size: 1.2em;
  }

  ._bottom b:nth-child(2) {
    float: right;
  }

  .progress {
    width: 90%;
    margin: auto;
  }

  /* 进度条颜色控制 */
  .progress progress {
    width: 100%;
    background-color: rgb(244, 165, 49);
    border: none;
    margin-top: 10px;
    margin-bottom: 10px;
    color: rgb(92, 96, 98); /*IE10*/
  }

  .progress progress::-moz-progress-bar {
    background: rgb(92, 96, 98);
  }

  .progress progress::-webkit-progress-bar {
    background: rgb(244, 165, 49);
  }

  .progress progress::-webkit-progress-value {
    background: rgb(92, 96, 98);
  }
</style>
