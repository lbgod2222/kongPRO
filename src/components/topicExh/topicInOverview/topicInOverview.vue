<template>
  <div class="_overView-contain">
    <!-- 黑幕 -->
    <transition name="curtain-fade">
      <div class="curtain" v-show="this.isCurtain">
        <iframe src="/static/img/loading-bars.svg" width="100" height="100"></iframe>
      </div>
    </transition>
    <div class="_overView">
      <table>
          <thead>
            <th>{{ $t('topicExh_InOverview_option') }}</th>
            <th>{{ $t('topicExh_InOverview_content') }}</th>
            <th>{{ $t('topicExh_InOverview_share') }}</th>
            <th>{{ $t('topicExh_InOverview_possibility') }}</th>
            <th>{{ $t('topicExh_InOverview_myShare') }}</th>
            <th colspan="3">{{ $t('topicExh_InOverview_opt') }}</th>
          </thead>
          <tbody ref="tablebody" class="tableBody">
            <tr class="hiddenTr" v-if="this.statue === 3">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowspan="64" @click="callDeal()">{{ $t('topicExh_InOverview_exchange') }}</td>
            </tr>
            <tr v-for="(item, index) in this.options" :class="{ '_answer': item.isAnswer }">
              <td v-if="!item.isAnswer">{{item.choice}}</td>
              <td v-if="item.isAnswer">{{$t('topicExh_InOverview_answer')}}</td>
              <td>{{item.desc}}</td>
              <td>{{item.share}}</td>
              <td>{{(item.probability*100).toFixed(2)}}%</td>
              <td>{{item.myShare ? item.myShare : 0}}</td>
              <td><span @click="callSell(item.choice)">{{ $t('topicExh_InOverview_sell') }}</span></td>
              <td><span @click="callBuy(item.choice)">{{ $t('topicExh_InOverview_buy') }}</span></td>
            </tr>
          </tbody>
        </table>
    </div>
    <div class="transitionDetail">
      <table>
          <thead>
            <!--<th></th>-->
            <th>{{ $t('topicExh_InOverview_dealTime') }}</th>
            <th>{{ $t('topicExh_InOverview_opt') }}</th>
            <th>{{ $t('topicExh_InOverview_option') }}</th>
            <th>{{ $t('topicExh_InOverview_share') }}</th>
            <th>{{ $t('topicExh_InOverview_total') }}</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in this.record">
              <!--<td>1</td>-->
              <td>{{item.realTime}}</td>
              <td>{{item.share > 0 ? '买' : '卖'}}</td>
              <td>{{item.choice}}</td>
              <td>{{Math.abs(item.share)}}</td>
              <td>{{Math.abs(item.amount / 1e8)}}</td>
            </tr>
          </tbody>
        </table>
    </div>
    <div class="sellModal" v-show="this.sellModal">
      <span class="close" @click="close">X</span>
      <table>
        <tr>
          <td>{{this.isBuy === true ? '买入' : '卖出'}}</td>
          <td class="buy"><input v-model="share" min="0" type="number" @change="getPrice" @keyup="getPrice">{{ $t('topicExh_InOverview_share') }}</td>
        </tr>
        <tr>
          <td>{{ $t('topicExh_InOverview_total') }}</td>
          <td class="total">{{this.calcInfo}}</td>
        </tr>
        <tr>
          <td>{{ $t('topicExh_InOverview_fee') }}</td>
          <td class="fee">1 XAS</td>
        </tr>
      </table>
      <div class="confirmBtn" @click="dealConfirm">{{ $t('topicExh_InOverview_confirm') }}</div>
    </div>
    <div class="dealModal" v-show="this.dealModal">
      <span class="close" @click="close">X</span>
      <h3>{{ $t('topicExh_InOverview_ratherToExchange') }}?</h3>
      <table>
        <tr>
          <td>{{ $t('topicExh_InOverview_total') }}</td>
          <td class="share">{{this.showDeal.share}}</td>
        </tr>
        <tr>
          <td>{{ $t('topicExh_InOverview_fee') }}</td>
          <td class="total">{{this.calcInfo}} XAS</td>
        </tr>
      </table>
      <div class="confirmBtn" @click="dealConfirm">{{ $t('topicExh_InOverview_confirm') }}</div>
    </div>
  </div>
</template>

<script>
import formatDateTime from '../../../../static/js/getRealTime';

export default {
  name: 'topic-_overView',
  props: ['answer', 'statue'],
  data() {
    return {
      sellModal: false,
      buyModal: false,
      dealModal: false,
      isBuy: undefined,
      choice: null,
      isCurtain: false,
      share: 0,
      calcInfo: '请输入',
      options: {},
      record: {},
      showDeal: {},
    };
  },
  async created() {
    console.log(this);
    this.isCurtain = true;
    this.isBuy = window.sessionStorage.isBuy;
    const that = this;
    // get market detail
    const a = await this.$store.dispatch('getMarketResult', {
      id: this.$route.params.id,
      that,
    });
    this.options = a.data.results;
    this.options.answer = this.answer;
    // my shares
    const b = await this.$store.dispatch('getShareInOneMarket', {
      id: this.$route.params.id,
      address: window.sessionStorage.address,
      that,
    });
    for (let i = 0; i < this.options.length; i += 1) {
      const item = this.options[i];
      if (this.answer === i) {
        item.isAnswer = true;
      }
      for (let j = 0; j < b.data.shares.length; j += 1) {
        const item2 = b.data.shares[j];
        if (item2.choice === item.choice) {
          item.myShare = item2.share;
        }
      }
    }
    // trade record in one market
    const c = await this.$store.dispatch('getAllTradeRecord', {
      id: this.$route.params.id,
      that,
    });
    this.record = c.data.trades;
    for (let i = 0; i < this.record.length; i += 1) {
      this.record[i].realTime = formatDateTime.formatDateTime(this.record[i].t_timestamp);
    }
    this.isCurtain = false;
  },
  mounted() {
    // minitor the the refresh comand from father componment
    this.$on('refresh', async () => {
      this.isCurtain = true;
      const that = this;
      // get market detail
      const a = await this.$store.dispatch('getMarketResult', {
        id: this.$route.params.id,
        that,
      });
      this.options = a.data.results;
      this.options.answer = this.answer;
      // my shares
      const b = await this.$store.dispatch('getShareInOneMarket', {
        id: this.$route.params.id,
        address: window.sessionStorage.address,
        that,
      });
      for (let i = 0; i < this.options.length; i += 1) {
        const item = this.options[i];
        if (this.answer === i) {
          item.isAnswer = true;
        }
        for (let j = 0; j < b.data.shares.length; j += 1) {
          const item2 = b.data.shares[j];
          if (item2.choice === item.choice) {
            item.myShare = item2.share;
          }
        }
      }
      // trade record in one market
      const c = await this.$store.dispatch('getAllTradeRecord', {
        id: this.$route.params.id,
        that,
      });
      this.record = c.data.trades;
      for (let i = 0; i < this.record.length; i += 1) {
        this.record[i].realTime = formatDateTime.formatDateTime(this.record[i].t_timestamp);
      }
      this.isCurtain = false;
    });
    // // my shares
    // const that = this;
    // this.$store.dispatch('getShareInOneMarket', {
    //   id: this.$route.params.id,
    //   address: window.sessionStorage.address,
    //   that,
    // }).then((res2) => {
    //   console.log(this.options);
    //   console.log('my share', res2);
    //   // that.$nextTick(that.renderTick(res2));
    //   that.renderTick(res2);
    //   console.log(this);
    // });
  },
  methods: {
    // tick render
    renderTick(res) {
      const that = this;
      this.$nextTick(function (res2, v) {
        console.log('now we begin to nextTick render our data');
        for (let i = 0; i < v.options.length; i += 1) {
          const item = v.options[i];
          for (let j = 0; j < res2.data.shares.length; j += 1) {
            const item2 = res2.data.shares[j];
            if (item2.choice === item.choice) {
              item.myShare = item2.share;
            }
          }
        }
      }(res, that));
    },
    callSell(c) {
      if (!window.sessionStorage.isLogin) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '请先登录',
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      if (!window.sessionStorage.hasNick) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '请先设置昵称',
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      if (window.sessionStorage.isLogin) {
        this.calcInfo = '请输入';
        this.isBuy = false;
        this.$store.commit('switchBlackSheepWall');
        this.sellModal = true;
        this.choice = c;
      }
    },
    callBuy(c) {
      if (!window.sessionStorage.isLogin) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '请先登录',
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      if (!window.sessionStorage.hasNick) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '请先设置昵称',
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      if (window.sessionStorage.isLogin) {
        this.calcInfo = '请输入';
        this.isBuy = true;
        this.$store.commit('switchBlackSheepWall');
        this.sellModal = true;
        this.choice = c;
      }
    },
    callDeal() {
      if (!window.sessionStorage.isLogin) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '请先登录',
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      if (!window.sessionStorage.hasNick) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '请先设置昵称',
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      if (window.sessionStorage.isLogin) {
        this.$store.commit('switchBlackSheepWall');
        this.dealModal = true;
      }
    },
    close() {
      this.sellModal = false;
      this.buyModal = false;
      this.dealModal = false;
      this.isBuy = null;
      this.showDeal = {};
      this.$store.commit('switchBlackSheepWall');
    },
    getPrice() {
      const that = this;
      if (that.share < 0) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '请输入大于零的数字!',
        });
        this.$store.commit('switchModalPopup');
      }
      this.calcInfo = '请稍后';
      this.$store.dispatch('getTotalPrice', {
        id: this.$route.params.id,
        choice: that.choice,
        share: Number(that.share),
        that,
      }).then((res) => {
        console.log(res.data);
        that.calcInfo = ((Number(res.data.amount)) / 1e8).toFixed(2);
      });
    },
    dealConfirm() {
      console.log('pressed that btn!', this.isBuy);
      const that = this;
      if (this.isBuy === true) {
        console.log('buy');
        this.$store.dispatch('tradeShare', {
          id: this.$route.params.id,
          share: this.share,
          choice: this.choice,
          that,
        }).then((res) => {
          console.log(res);
          if (res.data.success === true) {
            this.$store.commit('envaluePopup', {
              status: 0,
              msg: '购买成功!',
            });
            this.$store.commit('switchModalPopup');
          } else {
            this.$store.commit('envaluePopup', {
              status: 1,
              msg: res.data.error,
            });
            this.$store.commit('switchModalPopup');
          }
        });
      } else if (this.isBuy === false) {
        console.log('sell');
        this.$store.dispatch('tradeShare', {
          id: this.$route.params.id,
          share: this.share - (this.share * 2),
          choice: this.choice,
          that,
        }).then((res) => {
          if (res.data.success === true) {
            this.$store.commit('envaluePopup', {
              status: 0,
              msg: '售卖成功!',
            });
            this.$store.commit('switchModalPopup');
          } else {
            this.$store.commit('envaluePopup', {
              status: 1,
              msg: res.data.error,
            });
            this.$store.commit('switchModalPopup');
          }
        });
      } else {
        this.$store.dispatch('toDeal', {
          id: this.$route.params.id,
          that,
        }).then((res) => {
          if (res.data.success === true) {
            this.$store.commit('envaluePopup', {
              status: 0,
              msg: '兑换成功!',
            });
            this.$store.commit('switchModalPopup');
          } else {
            this.$store.commit('envaluePopup', {
              status: 1,
              msg: res.data.error,
            });
            this.$store.commit('switchModalPopup');
          }
        });
      }
    },
  },
};
</script>

<style scoped>
  ._overView-contain{
    /* position: relative; */
    background-color: rgb(37, 39, 40);
    width: 100%;
    padding-bottom: 40px;
  }
  ._overView{
    padding-top: 20px;
  }
  table thead th{
    background-color: #2E2F30;
  }
  ._overView table{
    width: 100%;
    margin: auto;
    text-align: center;
    background-color: rgb(37, 39, 40);
    border: 1px solid rgb(66, 71, 73);
 }
 ._overView table th{
    height: 40px;
    line-height: 40px;
    font-size: 1.2em;
    border-left: 1px solid rgb(66, 71, 73);
    border-right: 1px solid rgb(66, 71, 73);
 }
 ._overView table tr{
   border-top: 1px solid rgb(66, 71, 73);
 }
 ._overView table td{
    height: 30px;
    line-height: 30px;
    border-left: 1px solid rgb(66, 71, 73);
    border-right: 1px solid rgb(66, 71, 73);
    border-bottom: 1px solid rgb(66, 71, 73);
 }
 ._overView table span{
   cursor: pointer;
 }
 .transitionDetail{
   margin-top: 30px;
 }
  .transitionDetail table{
    width: 100%;
    margin: auto;
    text-align: center;
    background-color: rgb(37, 39, 40);
    border: 1px solid rgb(66, 71, 73);
 }
 .transitionDetail table th{
    height: 40px;
    line-height: 40px;
    font-size: 1.2em;
    border-left: 1px solid rgb(66, 71, 73);
    border-right: 1px solid rgb(66, 71, 73);
 }
 .transitionDetail table tr{
   border-top: 1px solid rgb(66, 71, 73);
 }
 .transitionDetail table td{
    height: 30px;
    line-height: 30px;
    border-left: 1px solid rgb(66, 71, 73);
    border-right: 1px solid rgb(66, 71, 73);
 }
 .hiddenTr > td{
   height: 0px !important;
   line-height: 0px !important;
 }
 .hiddenTr > td:nth-child(8){
   cursor: pointer;
   vertical-align: middle !important;
 }
 /* answer class */
 ._answer>td:nth-child(1), ._answer>td:nth-child(2), ._answer>td:nth-child(3), ._answer>td:nth-child(4), ._answer>td:nth-child(5){
   background-color: #474B4E;
 }
 .sellModal{
    background-color: rgba(37, 39, 40, .9);
    width: 340px;
    height: 190px;
    position: absolute;
    left: calc(50% - 150px);
    top: calc(50% - 50px);
    z-index: 999;
    padding: 10px 20px;
    border-radius: 8px;
 }
 .sellModal .close{
   float: right;
   cursor: pointer;
 }
 .sellModal table{
   margin: auto;
   border-collapse: separate;
   border-spacing: 13px;
   margin-top: 15px;
 }
 .sellModal table input{
    border: 1px solid rgb(78, 78, 78);
    border-radius: 3px;
    color: rgb(180, 180, 181);
    font-size: .8em;
 }
 .dealModal{
    background-color: rgba(37, 39, 40, .9);
    width: 340px;
    height: 190px;
    position: absolute;
    left: calc(50% - 150px);
    top: calc(50% - 50px);
    z-index: 999;
    padding: 10px 20px;
    border-radius: 8px;
 }
 .dealModal .close{
   float: right;
   cursor: pointer;
 }
 .dealModal h3{
   font-size: 1.3em;
   margin: auto;
   display: block;
   text-align: center;
   clear: both;
 }
 .dealModal table{
   border-collapse: separate;
   border-spacing: 13px;
   margin: auto;
   margin-top: 15px;
 }
 .confirmBtn{
   width: 100%;
   height: 16px;
   line-height: 16px;
   text-align: center;
   cursor: pointer;
   background-color: #22C9DF;
   color: #fff;
   width: 140px;
   height: 40px;
   line-height: 40px;
   margin: 20px auto;
 }
 /* 动画 */
 /* 黑幕 */
  .curtain{
    position: absolute;
    top: 0;
    height: 100%;
    min-height: 600px;
    width: 100%;
    background-color: rgba(0, 0, 0, .8);
  }
  .curtain iframe{
    display: block;
    margin: 100px auto 0 auto;
  }
  .curtain-fade-enter-active, .curtain-fade-leave-active{
    transition: all .2s ease;
  }
  .curtain-fade-enter, .curtain-fade-leave-active{
    opacity: 0;
  }
</style>
