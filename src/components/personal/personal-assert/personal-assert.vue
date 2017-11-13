<template>
  <div class="personal-right-contain">
    <div class="personal-assert">
      <div class="myAssert">
        <span class="label">
          <b>资产预览</b>
        </span>
        <table>
          <thead>
            <th>资产名称</th>
            <th>数量</th>
            <th>操作</th>
          </thead>
          <tbody>
            <tr v-for="item in this.activeUser.resource.balances">
              <td>{{item.currency}}</td>
              <td>{{(item.balance / 1e8).toFixed(5)}}</td>
              <td class="opt" @click="callTransfer(item.currency)">转账</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="myAssert"> -->
      <div class="transferRecord">
        <span class="label">
          <b>转账记录</b>
        </span>
        <table>
          <thead>
            <th>ID</th>
            <th>种类</th>
            <th>转出方</th>
            <th>转入方</th>
            <th>转账时间</th>
            <th>总额</th>
          </thead>
          <tbody>
            <transition name="curtain-fade">
              <div class="curtain" v-show="this.isCurtain">
                <iframe src="/static/img/loading-bars.svg" width="100" height="100"></iframe>
              </div>
            </transition>
            <tr v-for="(item, index) in this.transactionRecord">
              <td>{{index}}</td>
              <td>{{item.currency}}</td>
              <td>{{item.senderId}}</td>
              <td>{{item.recipientId}}</td>
              <td>{{item.realTime}}</td>
              <td>{{(item.amount / 1e8).toFixed(2)}}</td>
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
    float: right;
    margin-left: 1.5%;
    width: 79.5%;
    height: 600px;
    padding-bottom: 100px;
  }
  .myAssert{
    position: relative;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, .2);
  }
  .myAssert:nth-child(2){
    margin-top: 30px;
  }
 .myAssert table{
    position: relative;
    width: 100%;
    text-align: center;
    background-color: rgb(37, 39, 40);
    border: 1px solid #3A3A3A;
 }
 .myAssert table th{
    height: 40px;
    line-height: 40px;
    font-size: 1.2em;
    background-color: #2E2F30;
 }
 .myAssert table tr{
   border-top: 1px solid rgb(66, 71, 73);
 }
 .myAssert table td{
    height: 30px;
    line-height: 30px;
    border-right: 1px solid #3A3A3A;
    background-color: #2A2C2D;
 }
 .transferRecord{
    position: relative;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, .2);
  }
  .transferRecord:nth-child(2){
    margin-top: 30px;
  }
 .transferRecord table{
    position: relative;
    width: 100%;
    text-align: center;
    background-color: rgb(37, 39, 40);
 }
 .transferRecord table th{
    height: 40px;
    line-height: 40px;
    font-size: 1.2em;
    background-color: #363636;
 }
 .transferRecord tbody tr:nth-child(odd){
    background-color: #363636;
 }
 .transferRecord table td{
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    padding: 10px;
 }
 .opt{
   cursor: pointer;
   color: #1EC2DD;
 }
 .label{
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 1.3em;
    padding-left: 20px;
    background-color: rgb(37, 39, 40);
 }
 .label b{
   border-left: 5px solid rgb(33, 133, 150);
   padding-left: 17px;
   display: inline-block;
   height: 1.1em;
   line-height: 1.1em;
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
