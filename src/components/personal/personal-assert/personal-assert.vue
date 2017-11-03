<template>
  <div class="personal-right-contain">
    <div class="personal-assert">
      <!-- <div class="personal-assert-top">
        <span class="assert-image">图片</span>
        <div class="assert-top-right">
          <h2>世界杯中国VS日本</h2>
          <span>世界杯中国VS日本世界杯中国VS日本世界杯中国VS日本世界杯中国VS日本世界杯中国VS日本世界杯中国VS日本世界杯中国VS日本世界杯中国VS日本</span>
          
          <div class="participate"><b>参与金额:</b>&nbsp;&nbsp;<span>9873760</span></div>
          <div class="timeLeft">
            <span>时间进度:60%</span>
            <progress max="100" value="65"></progress>
          </div>
        </div>
      </div>
      <div class="personal-assert-center">
        <span class="assert-center-left">您已经对该话题进行申诉，仲裁委员将于24小时将会随机发送7名委员进行裁判</span>
        <span class="assert-center-right">等待裁决</span>
      </div>
      <div class="personal-assert-bottom">
        <span>饼图</span>
      </div> -->
      <div class="myAssert">
        <span class="label">My Assert</span>
        <table>
          <thead>
            <th>Currency</th>
            <th>Amount</th>
            <th>OPT</th>
          </thead>
          <tbody>
            <tr v-for="item in this.activeUser.resource.balances">
              <td>{{item.currency}}</td>
              <td>{{item.balance}}</td>
              <td class="opt" @click="callTransfer(item.currency)">Transition</td>
            </tr>
            <!-- <tr>
              <td>ETH</td>
              <td>Aod2AC0em123dfv</td>
              <td>12333</td>
              <td class="opt" @click="callTransfer">Transition</td>
            </tr> -->
          </tbody>
        </table>
      </div>
      <div class="myAssert">
        <span class="label">Transition Record</span>
        <table>
          <thead>
            <th>ID</th>
            <th>Type</th>
            <th>Vendor</th>
            <th>Purchaser</th>
            <th>Time</th>
            <th>Fee</th>
          </thead>
          <tbody>
            <transition name="curtain-fade">
              <div class="curtain" v-show="this.isCurtain">LOADING</div>
            </transition>
            <tr v-for="(item, index) in this.transactionRecord">
              <td>{{index}}</td>
              <td>{{item.currency}}</td>
              <td>{{item.senderId}}</td>
              <td>{{item.recipientId}}</td>
              <td>{{item.realTime}}</td>
              <td>{{item.amount}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import getRealTime from '../../../../static/js/getRealTime';

export default {
  name: 'personal-assert',
  data() {
    return {
      transactionRecord: null,
      isCurtain: false,
    };
  },
  async created() {
    console.log(this);
    const that = this;
    this.isCurtain = true;
    if (window.sessionStorage.isLogin) {
      this.$store.commit('loginStatue');
      this.$store.commit('loginBase', {
        secret: window.sessionStorage.secret,
      });
      const loginAct = await this.$store.dispatch('loginAction', {
        address: this.$store.state.user.address,
        that,
      });
      this.$store.commit('login', {
        resource: loginAct.data.account,
      });
      // 交易记录
      const recordAct = await that.$store.dispatch('getTransactionInfo', {
        limit: 10,
        offset: 0,
        currency: '',
        that,
      });
      this.transactionRecord = recordAct.data.transfers;
      const arr = this.transactionRecord;
      for (let i = 0; i < this.transactionRecord.length; i += 1) {
        arr[i].realTime = getRealTime.formatDateTime(arr[i].t_timestamp);
      }
      this.isCurtain = false;
    }
  },
  computed: {
    ...mapGetters(['activeUser']),
  },
  methods: {
    // call up transfer modal
    callTransfer(type) {
      console.log(type);
      this.$store.commit('envalueTransferType', { type });
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalTransfer');
    },
  },
};
</script>

<style scoped>
  .personal-right-contain{
    /* background-color: rgb(37, 39, 40); */
    float: left;
    margin-left: 1.5%;
    width: 79.5%;
    height: 600px;
    box-shadow: 0px 0px 10px rgb(26, 29, 29);
    padding-bottom: 40px;
  }
  .myAssert{
    position: relative;
  }
  .myAssert:nth-child(2){
    margin-top: 30px;
  }
 .myAssert table{
    position: relative;
    margin: 20px 0 0 0;
    width: 100%;
    text-align: center;
    background-color: rgb(37, 39, 40);
 }
 .myAssert table th{
    height: 40px;
    line-height: 40px;
    font-size: 1.2em;
 }
 .myAssert table tr{
   border-top: 1px solid rgb(66, 71, 73);
 }
 .myAssert table td{
    height: 30px;
    line-height: 30px;
 }
 .opt{
   cursor: pointer;
 }
 .label{
    display: inline-block;
    font-size: 1.3em;
    border-left: solid 5px rgb(33, 133, 150);
    padding-left: 20px;
 }
  .timeLeft span{
    float: right;
  }
  /* 动画 */
 /* 黑幕 */
  .curtain{
    position: absolute;
    top: 0;
    height: 600px;
    width: 100%;
    background-color: rgba(0, 0, 0, .8);
  }
  .curtain-fade-enter-active, .curtain-fade-leave-active{
    transition: all .2s ease;
  }
  .curtain-fade-enter, .curtain-fade-leave-active{
    opacity: 0;
  }
  /* 进度条颜色控制 */
  .timeLeft progress {
    width: 100%;
    background-color:#e6e6e6;
    margin-top: 10px;
    color: rgb(245, 175, 55); /*IE10*/
  }

  .timeLeft progress::-moz-progress-bar { background: rgb(245, 175, 55); }
  .timeLeft progress::-webkit-progress-bar { background: #e6e6e6; }
  .timeLeft progress::-webkit-progress-value  { background: rgb(245, 175, 55); }
</style>
