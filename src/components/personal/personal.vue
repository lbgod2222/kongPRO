<template>
  <div class="personal-contain">
    <ul>
      <!-- <img class="logo" :src="'data:image/png;base64,' + this.logo"></img> -->
      <canvas width="80" height="80" v-bind:data-jdenticon-value="address" ref="avatar"></canvas>
      <router-link to="/personal"><img src="/static/img/Personal.png">{{ $t('personal_detail') }}</router-link>
      <router-link to="/personal/assert"><img src="/static/img/property.png">{{ $t('personal_assert') }}</router-link>
      <router-link to="/personal/market"><img src="/static/img/marketplace.png">{{ $t('personal_myMarket') }}</router-link>
      <router-link to="/personal/share"><img src="/static/img/stock.png">{{ $t('personal_myShare') }}</router-link>
      <router-link to="/personal/history"><img src="/static/img/stock.png">{{ $t('personal_history') }}</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import Identicon from '../../../node_modules/identicon.js';
import Jdenticon from '../../../node_modules/jdenticon';

export default {
  name: 'personal',
  data() {
    return {
      logo: null,
    };
  },
  created() {
    console.log(this.$i18n, 'i18n!!!!');
    if (window.sessionStorage.isLogin === false) {
      console.log('未登录');
      this.$router.push('/');
    }
    this.logo = new Identicon(this.stringToHex(window.sessionStorage.address)).toString();
  },
  methods: {
    stringToHex(str) {
      let hex = '';
      for (let i = 0; i < str.length; i += 1) {
        hex += ` ${str.charCodeAt(i).toString(16)}`;
      }
      return hex;
    },
  },
  mounted() {
    // this.$refs.avatar.dataset.jdenticonValue = window.sessionStorage.address;
    Jdenticon();
    console.log(this.$refs);
    console.log(this.$refs.avatar.dataset.jdenticonValue);
  },
  computed: {
    address() {
      return window.sessionStorage.address;
    },
  },
};
</script>

<style scoped>
  .personal-contain{
      margin: 90px auto 0;
      max-width: 1600px;
      min-width: 1024px;
      width: 100%;
      height: 600px;
      padding: 0 1.5% 0;
      box-sizing: border-box;
  }
  .personal-contain ul{
    display: flex;
    position: fixed;
    flex-direction: column;
    justify-content: flex-end;
    box-shadow: 0px 0px 10px rgb(26, 29, 29);
    width: 16%;
    height: 460px;
    float: left;
    background-color: rgb(37, 39, 40);
  }
  .personal-contain ul > canvas{
    width: 45%;
    border-radius: 60px;
    margin: auto;
  }
  .personal-contain ul a{
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 65px;
      line-height: 65px;
      font-size: 1.3em;
      padding-left: 25%;
  }
  .personal-contain ul a img{
    vertical-align: text-bottom;
    margin-right: 15px;
  }
  .personal-contain a.router-link-exact-active{
    color: rgb(33, 133, 150);
  }
</style>
