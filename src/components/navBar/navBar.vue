<template>
  <div class="navBar-contain">
    <h2>Koumei</h2>
    <router-link to="/" :class="{'active_normal': this.active === 'home'}" @click.native="changeA(1)">{{ $t('navBar_home') }}</router-link>
    <router-link to="/topic/all" :class="{'active_normal': this.active === 'market'}" @click.native="changeA(2)">{{ $t('navBar_market') }}</router-link>
    <!-- <router-link to="/login" exact>LOGIN</router-link> -->
    <a class="login" @click="popLogin" v-show="!this.$store.state.isLogin">{{ $t('navBar_login') }}</a>
    <a class="logOut" @click="logOut" v-show="this.$store.state.isLogin">{{ $t('navBar_logout') }}</a>
    <router-link class="personalClass" to="/personal" v-show="this.$store.state.isLogin" :class="{'active_p': this.active === 'personal'}" @click.native="changeA(3)">{{ $t('navBar_personal') }}</router-link>
    <select v-model="locale">
      <option value="ch">中文</option>
      <option value="en">English</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      secret: '',
      active: 'home',
      locale: 'ch',
    };
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    },
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
        if (res.data.account.extra) {
          that.$store.commit('hasSetNick', { name: null });
        }
        that.$store.commit('login', {
          resource: res.data.account,
        });
      });
    }
  },
  methods: {
    // tempo func
    // showPOP() {
    //   console.log('hahahaahahahahah click');
    //   this.$store.commit('envaluePopup', {
    //     status: 0,
    //     msg: 'HEY TEHRE!',
    //   });
    //   this.$store.commit('switchModalPopup');
    // },
    popLogin() {
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalLogin');
    },
    logOut() {
      window.sessionStorage.clear();
      this.$store.commit('loginStatue');
      if (this.$route.path.indexOf('personal') > -1) {
        this.$router.replace('/topic/all');
      }
    },
    changeA(num) {
      if (num === 1) {
        this.active = 'home';
      } else if (num === 2) {
        this.active = 'market';
      } else {
        this.active = 'personal';
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
  .active_normal{
    color: rgb(33, 133, 150);
  }
  .active_p{
    color: rgb(33, 133, 150);
    border: 1px solid rgb(33, 133, 150) !important;
  }
  .login{
    border: 1px solid rgb(33, 133, 150) !important;
    color: rgb(33, 133, 150);
  }
  /* .navBar-contain a.router-link-active{
    color: rgb(33, 133, 150);
  }
  .navBar-contain a:nth-child(6).router-link-exact-active{
  } */
  .navBar-contain a:nth-child(4), .navBar-contain a:nth-child(5), .navBar-contain a:nth-child(6), .navBar-contain select{
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
  .navBar-contain select{
    background-color: transparent;
    outline: none;
    color: rgb(180, 180, 181);
  }
  .navBar-contain a:nth-child(2), .navBar-contain a:nth-child(3){
    margin-left: 30px;
  }
</style>
