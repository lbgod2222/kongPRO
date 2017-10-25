<template>
  <div class="_overView-contain">
    <div class="_overView">
      <table>
          <thead>
            <th>选项</th>
            <th>股份</th>
            <th>几率</th>
            <th>我持有的股份</th>
            <th colspan="3">操作</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in this.options">
              <td>{{item.choice}}</td>
              <td>{{item.share}}</td>
              <td>{{item.probability}}</td>
              <td>{{(item.myShare ? item.myShare : 0)}}</td>
              <td><span @click="callSell(item.choice)">卖</span></td>
              <td><span @click="callBuy(item.choice)">买</span></td>
              <td><span @click="callDeal(item.choice)">兑换</span></td>
            </tr>
          </tbody>
        </table>
    </div>
    <div class="transitionDetail">
      <table>
          <thead>
            <th></th>
            <th>交易时间</th>
            <th>买卖</th>
            <th>选项</th>
            <th>份额</th>
            <th>数量</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in this.record">
              <td>1</td>
              <td>2008/09/08</td>
              <td>{{item.share > 0 ? 'BUY' : 'SELL'}}</td>
              <td>{{item.choice}}</td>
              <td>{{item.share}}</td>
              <td>{{item.amount}}</td>
            </tr>
          </tbody>
        </table>
    </div>
    <div class="sellModal" v-show="this.sellModal">
      <span class="close" @click="close">X</span>
      <table>
        <tr>
          <td>{{this.isBuy === true ? '买' : '卖'}}</td>
          <td class="buy"><input v-model="share" type="number" @change="getPrice" @keyup="getPrice"> SHARES</td>
        </tr>
        <tr>
          <td>TOTAL</td>
          <td class="total">{{this.calcInfo}}</td>
        </tr>
        <tr>
          <td>FEE</td>
          <td class="fee">1 XAS</td>
        </tr>
      </table>
      <div class="confirmBtn" @click="dealConfirm">确认</div>
    </div>
    <div class="dealModal" v-show="this.dealModal">
      <span class="close" @click="close">X</span>
      <h3>Exchange?</h3>
      <table>
        <tr>
          <td>TOTAL</td>
          <td class="share">1000 SHARES</td>
        </tr>
        <tr>
          <td>FEE</td>
          <td class="total">100000 XAS</td>
        </tr>
      </table>
      <div class="confirmBtn" @click="dealConfirm">确认</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topic-_overView',
  data() {
    return {
      sellModal: false,
      buyModal: false,
      dealModal: false,
      isBuy: undefined,
      choice: null,
      share: 0,
      calcInfo: '请输入',
      options: {},
      record: {},
    };
  },
  created() {
    const that = this;
    // get market detail
    this.$store.dispatch('getMarketResult', {
      id: this.$route.params.id,
      that,
    }).then((res) => {
      this.options = res.data.results;
    });
    // my shares
    this.$store.dispatch('getShareInOneMarket', {
      id: this.$route.params.id,
      address: this.$store.state.user.address,
      that,
    }).then((res) => {
      console.log(this.options);
      console.log('my share', res);
      for (let i = 0; i < this.options.length; i += 1) {
        const item = this.options[i];
        for (let j = 0; j < res.data.shares.length; j += 1) {
          const item2 = res.data.shares[j];
          if (item2.choice === item.choice) {
            item.myShare = item2.share;
          }
        }
      }
    });
    // trade record in one market
    this.$store.dispatch('getAllTradeRecord', {
      id: this.$route.params.id,
      that,
    }).then((res) => {
      console.log('record', res);
      that.record = res.data.trades;
    });
  },
  computed: {
  },
  methods: {
    callSell(c) {
      this.isBuy = false;
      this.$store.commit('switchBlackSheepWall');
      this.sellModal = true;
      this.choice = c;
    },
    callBuy(c) {
      this.isBuy = true;
      this.$store.commit('switchBlackSheepWall');
      this.sellModal = true;
      this.choice = c;
    },
    callDeal() {
      this.$store.commit('switchBlackSheepWall');
      this.dealModal = true;
    },
    close() {
      this.sellModal = false;
      this.buyModal = false;
      this.dealModal = false;
      this.isBuy = null;
      this.$store.commit('switchBlackSheepWall');
    },
    getPrice() {
      const that = this;
      this.calcInfo = '请稍后';
      this.$store.dispatch('getTotalPrice', {
        id: this.$route.params.id,
        choice: that.choice,
        share: that.share,
        that,
      }).then((res) => {
        that.calcInfo = res.data.amount;
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
          alert('BROUGHT SUCCESSFULLY');
        });
      } else if (this.isBuy === false) {
        console.log('sell');
        this.$store.dispatch('tradeShare', {
          id: this.$route.params.id,
          share: this.share - (this.share * 2),
          choice: this.choice,
          that,
        }).then((res) => {
          console.log(res);
          alert('SELLED SUCCESSFULLY!');
        });
      } else {
        this.$store.dispatch('toDeal', {
          id: this.$route.params.id,
          that,
        }).then((res) => {
          console.log(res);
          alert('DEAL SUCCESSFULLY!');
        });
      }
    },
  },
};
</script>

<style scoped>
  ._overView-contain{
    position: relative;
    background-color: rgb(37, 39, 40);
    width: 100%;
    height: 300px;
  }
  ._overView{
    padding-top: 20px;
  }
  ._overView table{
    width: 80%;
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
 }
 ._overView table span{
   cursor: pointer;
 }
 .transitionDetail{
   margin-top: 30px;
 }
  .transitionDetail table{
    width: 80%;
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
 .sellModal{
    background-color: rgba(37, 39, 40, .9);
    width: 300px;
    height: 140px;
    position: absolute;
    left: 300px;
    top: 0px;
    z-index: 999;
    padding: 10px 20px;
 }
 .sellModal .close{
   float: right;
   cursor: pointer;
 }
 .sellModal table{
   border-collapse: separate;
   border-spacing: 13px;
 }
 .sellModal table input{
    border: 1px solid rgb(78, 78, 78);
    border-radius: 3px;
    color: rgb(180, 180, 181);
    font-size: .8em;
 }
 .dealModal{
    background-color: rgba(37, 39, 40, .9);
    width: 250px;
    height: 120px;
    position: absolute;
    left: 300px;
    top: 0px;
    z-index: 999;
    padding: 10px 20px;
 }
 .dealModal .close{
   float: right;
   cursor: pointer;
 }
 .dealModal h3{
   margin: auto;
   display: block;
   text-align: center;
   clear: both;
 }
 .dealModal table{
   border-collapse: separate;
   border-spacing: 13px;
   margin: auto;
 }
 .confirmBtn{
   width: 100%;
   height: 16px;
   line-height: 16px;
   text-align: center;
   cursor: pointer;
 }
</style>