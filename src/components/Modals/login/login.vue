<template>
  <div class="login-contain">
    <div class="upper">
      <span class="title">
        LOGIN
      </span>
      <span class="close" @click="close">X</span>
    </div>
    <div class="bottom">
      <input type="text" v-model.trim="secret" placeholder="请输入密钥">
      <div class="_btn">
        <a href="#" class="login" @click.prevent="toLogin">登录</a>
        <a href="http://asch.so/" target="_blank" class="official">新账号</a>
      </div>
    </div>
  </div>
</template>

<script>
import Mnemonic from 'bitcore-mnemonic';

export default {
  name: 'login',
  data() {
    return {
      secret: '',
    };
  },
  methods: {
    // modal close
    close() {
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalLogin');
    },
    // user login
    toLogin() {
      const that = this;
      if (!Mnemonic.isValid(this.secret)) {
        return alert('"未能通过"');
      }
      that.close();
      this.$store.commit('loginBase', { secret: this.secret });
      return this.$store.dispatch('loginAction', {
        address: this.$store.state.user.address,
        that,
      }).then((res) => {
        // if (res.status === 200 && res.data.success) {
          // }
        console.log(res);
        that.$store.commit('login', {
          resource: res.data.account,
        });
      });
    },
  },
};
</script>

<style scoped>
  .login-contain{
    margin: 160px auto 0;
    top: 20%;
    left: 25%;
    background-color: rgba(37, 39, 40, .9);
    width: 500px;
    height: auto;
    z-index: 999;
    border-radius: 10px;
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
    margin: 10px auto;
    padding-bottom: 10px;
  }
  .bottom input{
    margin: auto;
    width: 100%;
    height: 40px;
    margin-top: 30px;
    line-height: 40px;
    border: 1px solid rgb(78, 78, 78);
    color: #fff;
    border-radius: 6px;
  }
  ._btn{
    display: flex;
    justify-content: space-around;
    margin-top: 60px;
    margin-bottom: 40px;
  }
  ._btn a{
    display: inline-block;
    width: 35%;
    height: 35px;
    line-height: 35px;
    text-align: center;
  }
  ._btn .login{
    background-color: rgb(30, 194, 219);
  }
  ._btn .official{
    background-color: rgb(64, 64, 64);
  }
</style>
