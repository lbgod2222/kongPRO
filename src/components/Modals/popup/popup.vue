<template>
  <div class="popup-contain">
    <b @click="close()" v-show="this.PopupStatus.status === 1">X</b>
    <div class="content">
      <b>{{PopupStatus.msg}}</b>
      <span class="success" v-show="this.PopupStatus.status === 0">
        <img src="/static/img/right.png" alt="">
      </span>
      <span class="error" v-show="this.PopupStatus.status === 1">
        <img src="/static/img/warning.png" alt="">
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'popup',
  data() {
    return {
    };
  },
  created() {
    console.log(this, 'this!!!!!!!!!!!!!!!');
    if (this.PopupStatus.status === 0) {
      setTimeout(() => {
        this.close();
      }, 2000);
    }
  },
  computed: {
    ...mapState(['PopupStatus']),
  },
  methods: {
    // modal close
    close() {
      console.log('close clicked');
      this.$store.commit('switchModalPopup');
    },
  },
};
</script>

<style scoped>
  .popup-contain{
      position: fixed;
      box-sizing: border-box;
      top: calc(50% - 125px);
      left: calc(50% - 125px);
      background-color: #2A2C2D;
      width: 250px;
      height: 250px;
      z-index: 999;
      padding: 10px;
      border-radius: 8px;
  }
  .popup-contain>b{
    display: block;
    float: right;
    width: 10px;
    text-align: right;
    color: #666666;
    cursor: pointer;
  }
  .content{
    position: relative;
    color: #C9C9C9;
    font-size: 14px;
    margin: auto;
    width: 100%;
    height: 33%;
    clear: both;
    /* background-color: #22C9DF; */
  }
  .content > b{
    display: block;
    margin-top: 40px;
    font-size: 14px;
    text-align: center;
  }
  .content > span.success{
    position: relative;
    background-color: #22C9DF;
    border-radius: 100px;
    margin: 30px auto 0 auto;
    width: 100px;
    height: 100px;
    display: block;
  }
  .success img{
    position: absolute;
    top: 37px;
    left: 31px;
  }
  .content > span.error{
    position: relative;
    background-color: #E93F2E;
    border-radius: 100px;
    margin: 30px auto 0 auto;
    width: 100px;
    height: 100px;
    display: block;
  }
  .error img{
    position: absolute;
    top: 28px;
    left: 46px;
  }
</style>
