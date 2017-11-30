<template>
  <div class="personal-right-contain">
    <div class="personal-assert">
      <div class="myAssert">
        <span class="label">
          <b>{{ $t('personal_assert_myAssert') }}</b>
        </span>
        <table>
          <thead>
            <th>{{ $t('personal_assert_name') }}</th>
            <th>{{ $t('personal_assert_amount') }}</th>
            <th>{{ $t('personal_assert_operation') }}</th>
          </thead>
          <tbody>
            <tr v-for="item in this.activeUser.resource.balances">
              <td>{{item.currency}}</td>
              <td>{{(item.balance / 1e8).toFixed(5)}}</td>
              <td class="opt" @click="callTransfer(item.currency)">{{ $t('personal_assert_transfer') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="myAssert"> -->
      <div class="transferRecord">
        <span class="label">
          <b>{{ $t('personal_assert_transferRec') }}</b>
        </span>
        <table>
          <thead>
            <th>ID</th>
            <th>{{ $t('personal_assert_currency') }}</th>
            <th>{{ $t('personal_assert_sender') }}</th>
            <th>{{ $t('personal_assert_receiver') }}</th>
            <th>{{ $t('personal_assert_transferTime') }}</th>
            <th>{{ $t('personal_assert_total') }}</th>
          </thead>
          <tbody>
            <transition name="curtain-fade">
              <div class="curtain" v-show="this.isCurtain">
                <iframe src="/static/img/loading-bars.svg" width="100" height="100"></iframe>
              </div>
            </transition>
            <tr v-for="(item, index) in this.transactionRecord">
              <td>{{index + 1}}</td>
              <td>{{item.currency}}</td>
              <td>{{item.senderId}}</td>
              <td>{{item.recipientId}}</td>
              <td>{{item.realTime}}</td>
              <td>{{(item.amount / 1e8).toFixed(2)}}</td>
            </tr>
          </tbody>
        </table>
        <div class="pageGroup">
          <span class="pre_btn" @click="minPage()"></span>
          <span class="num_btn" v-for="(value, index) in this.page" @click="goto(value)" :class="{'active_btn':currentPage == Number(value)}">{{Number(value)}}</span>
          <span class="next_btn" @click="addPage()"></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex';
import getRealTime from '../../../../static/js/getRealTime';

export default {
  name: 'personal-assert',
  data() {
    return {
      transactionRecord: null,
      isCurtain: false,
      // 分页states
      pageSpots: 5,
      currentPage: 1,
      totalCount: 0,
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
      if (loginAct.data.account.extra) {
        that.$store.commit('hasSetNick');
      }
      this.$store.commit('login', {
        resource: loginAct.data.account,
      });
      // 交易记录
      const recordAct = await that.$store.dispatch('getTransactionInfo', {
        limit: 10,
        offset: 0,
        currency: '',
        id: window.sessionStorage.address,
        that,
      });
      this.transactionRecord = recordAct.data.transfers;
      this.totalCount = recordAct.data.count;
      const arr = this.transactionRecord;
      for (let i = 0; i < this.transactionRecord.length; i += 1) {
        arr[i].realTime = getRealTime.formatDateTime(arr[i].t_timestamp);
      }
      this.isCurtain = false;
    }
  },
  computed: {
    ...mapGetters(['activeUser']),
    allPage() {
      if (Math.ceil(this.totalCount / 12) === 0) {
        return 1;
      }
      return Math.ceil(this.totalCount / 12);
    },
    offsetNum() {
      return (this.currentPage - 1) * 12;
    },
    // 构造页签数组
    page() {
      let pag = []
      if (this.currentPage < this.pageSpots) {
        let i = Math.min(this.pageSpots, this.allPage);
        while (i) {
          pag.unshift(i--);
        }
      } else if (this.currentPage >= this.pageSpots) {
        let middle = this.currentPage - Math.floor(this.pageSpots / 2);
        let i = this.pageSpots;
        if (middle > (this.allPage - this.pageSpots)) {
          middle = (this.allPage - this.pageSpots) + 1;
        }
        while (i--) {
          pag.push(middle++)
        }
      }
      return pag;
    },
  },
  methods: {
    // call up transfer modal
    callTransfer(type) {
      console.log(type);
      if (!window.sessionStorage.hasNick) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '请先设置昵称',
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      this.$store.commit('envalueTransferType', { type });
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalTransfer');
    },
    async getData(num, offset) {
      const that = this;
      this.isCurtain = true;
      // 交易记录
      const recordAct = await that.$store.dispatch('getTransactionInfo', {
        limit: 10,
        offset: that.offsetNum,
        currency: '',
        id: window.sessionStorage.address,
        that,
      });
      this.transactionRecord = recordAct.data.transfers;
      this.totalCount = recordAct.data.count;
      const arr = this.transactionRecord;
      for (let i = 0; i < this.transactionRecord.length; i += 1) {
        arr[i].realTime = getRealTime.formatDateTime(arr[i].t_timestamp);
      }
      this.isCurtain = false;
    },
    // pagination methods
    addPage() {
      if (this.currentPage < this.allPage) {
        this.currentPage = this.currentPage + 1;
        // that.currentPage = that.currentPage + 1
        this.getData(12, this.offsetNum);
      }
    },
    minPage() {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.getData(this.contentStatus, 12, this.offsetNum);
      }
    },
    // 页面跳转
    goto(value) {
      console.log('goto', value, this.page, this.currentPage);
      if (value === this.currentPage) return;
      // that.currentPage = index
      this.currentPage = value;
      this.getData(this.contentStatus, 12, this.offsetNum);
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
    padding-bottom: 40px;
    min-height: 500px;
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
  .pageGroup{
    position: absolute;
    bottom: 0;
    right: 0;;
  }
  .pageGroup span{
    display: inline-block;
    height: 24px;
    width: 24px;
    line-height: 24px;
    text-align: center;
    border: 1px solid #838383;
    color: #8E8E93;
    vertical-align: bottom;
    cursor: pointer;
  }
  .active_btn{
    background-color: #00B9D7 !important;
    color: #000 !important;
  }
  /* .pageGroup span img{
    height: 70%;
  } */
  .pageGroup span.pre_btn{
    background-image: url('/static/img/Previous page.png');
    background-size: 35% 55%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .pageGroup span.next_btn{
    background-image: url('/static/img/next page.png');
    background-size: 35% 55%;
    background-repeat: no-repeat;
    background-position: center;
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
