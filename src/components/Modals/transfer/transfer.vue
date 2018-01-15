<template>
  <div class="transfer-contain">
    <div class="upper">
      <span class="title">
        {{ $t('transfer_title') }}
      </span>
      <span class="close" @click="close">X</span>
    </div>
    <div class="bottom">
      <span class="inform">
        {{ $t('transfer_tip') }}
      </span>
      <div class="form">
        <span class="currency">{{ $t('transfer_currency') }} <input type="text" :placeholder="this.$store.state.transferType" disabled></span>
        <span class="receiveAddress">
          {{ $t('transfer_transferTo') }}
          <input type="text" v-model="receiveAddress">
        </span>
        <span class="amount">
          {{ $t('transfer_amount') }}
          <input type="number" min="0" v-model="amount">
        </span>
        <span class="fee">
          {{ $t('transfer_fee') }}
          <input type="number" placeholder="0.1XAS" v-model="fee" disabled>
        </span>
        <span class="extra">
          {{ $t('transfer_msg') }}
          <input type="text" v-model="extra">
        </span>
      </div>
      <div class="btn" @click="toTransfer">{{ $t('transfer_submit') }}</div>
    </div>
  </div>
</template>

<script>
import aschJS from '../../../../node_modules/asch-js';

export default {
  name: 'transfer',
  data() {
    return {
      receiveAddress: null,
      amount: 0,
      fee: null,
      extra: null,
    };
  },
  created() {
    console.log(aschJS);
  },
  computed: {
    // 计算费用传入单位
    trans_unit() {
      return String(this.amount * 1e8);
    },
  },
  methods: {
    // modal close
    close() {
      this.$store.commit('transferInit');
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalTransfer');
    },
    toTransfer() {
      // 地址合理性检查
      if (!aschJS.crypto.isAddress(this.receiveAddress)) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: this.$t('transfer_tip_address'),
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      // 整数检查
      if (this.amount < 0) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: this.$t('transfer_tip_amount'),
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      const that = this;
      this.$store.dispatch('toTransfer', {
        type: this.$store.state.transferType,
        amount: this.trans_unit,
        address: this.receiveAddress,
        that,
      }).then((res) => {
        console.log(res);
        if (res.data.success === true) {
          this.$store.commit('envaluePopup', {
            status: 0,
            msg: this.$t('transfer_tip_success'),
          });
          this.$store.commit('switchModalPopup');
          this.close();
        } else {
          this.$store.commit('envaluePopup', {
            status: 1,
            msg: res.data.error,
          });
          this.$store.commit('switchModalPopup');
        }
      });
    },
  },
};
</script>

<style scoped>
  .transfer-contain{
    margin: 40px auto 0;
    top: 20%;
    left: 25%;
    background-color: rgba(37, 39, 40, .9);
    width: 500px;
    height: auto;
    z-index: 999;
  }
  .upper{
    padding: 0 10px;
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
    color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: rgb(30, 194, 219);
  }
  .upper .close{
    cursor: pointer;
  }
  .bottom{
    width: 80%;
    padding-bottom: 20px;
    margin: auto;
  }
  .bottom .inform{
    font-size: 14px;
    margin: 20px auto;
    display: block;
    height: 40px;
    line-height: 40px;
    /* background-color: rgb(255, 124, 113); */
    border-radius: 6px;
    color: #E93F2E;
    text-align: center;
  }
  .form span{
    display: block;
    height: 40px;
    line-height: 40px;
    margin-top: 30px;
    border-bottom: 1px solid rgb(78, 78, 78);
  }
  .form input{
    width: 75%;
    height: 40px;
    line-height: 40px;
    float: right;
    color: rgb(180, 180, 181);
  }
  .btn{
    background-color: rgb(30, 194, 219);
    margin: 20px auto;
    height: 50px;
    width: 220px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }
</style>
