<template>
  <div class="navBar-contain">
    <h2>LOGO</h2>
    <router-link to="/">首页</router-link>
    <router-link to="/topic/all">市场</router-link>
    <!-- <router-link to="/login" exact>LOGIN</router-link> -->
    <a class="login" @click="popLogin" v-show="!this.$store.state.isLogin">登录</a>
    <a class="logOut" @click="logOut" v-show="this.$store.state.isLogin">登出</a>
    <router-link class="personalClass" to="/personal" v-show="this.$store.state.isLogin" exact>个人中心</router-link>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      secret: '',
    };
  },
  created() {
    const that = this;
    if (window.sessionStorage.isLogin) {
      this.$store.commit('loginStatue');
      this.$store.commit('loginBase', {
        secret: window.sessionStorage.secret,
      });
      this.$store.dispatch('loginAction', {
        address: this.$store.state.user.address,
        that,
      }).then((res) => {
        console.log(res.data);
        that.$store.commit('login', {
          resource: res.data.account,
        });
      });
    }
  },
  methods: {
    popLogin() {
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalLogin');
    },
    logOut() {
      console.log(this);
      window.sessionStorage.clear();
      this.$store.commit('loginStatue');
      if (this.$route.path.indexOf('personal') > -1) {
        this.$router.replace('/topic/all');
      }
    },
  },
};
</script>

<style scoped>
  .navBar-contain{
      position: fixed;
      box-sizing: border-box;
      top: 0;
      background-color: rgb(37, 39, 40);
      width: 100%;
      line-height: 60px;
      height: 60px;
      box-shadow: 0px 1px 10px rgb(26, 29, 29);
      z-index: 998;
      /* max-width: 1600px; */
      min-width: 1024px;
      padding: 0 0 0 30px;
  }
  .navBar-contain h2{
    color: rgb(33, 133, 150);
    display: inline;
  }
  .navBar-contain a.router-link-active{
    color: rgb(33, 133, 150);
  }
  .navBar-contain a:nth-child(6).router-link-exact-active{
    border: 1px solid rgb(33, 133, 150);
  }
  .navBar-contain a:nth-child(4), .navBar-contain a:nth-child(5), .navBar-contain a:nth-child(6){
    padding: 0 10px;
    display: inline-block;
    line-height: 25px;
    margin-top: 15px;
    margin-right: 30px;
    float: right;
    height: 25px;
    border: 1px solid rgb(180, 180, 181);
    border-radius: 30px;
    cursor: pointer;
  }
  .navBar-contain a:nth-child(2), .navBar-contain a:nth-child(3){
    margin-left: 30px;
  }
</style>
