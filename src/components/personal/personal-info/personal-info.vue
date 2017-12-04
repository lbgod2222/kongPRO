<template>
  <div class="personal-right-contain">
    <div class="info-top">
      <div class="info-top-title">
        <h3>{{ $t('personal_info_detail') }}</h3>
      </div>
      <div class="info-top-content">
        <div class="right-content">
          <table>
            <tr>
              <td>{{ $t('personal_info_nickname') }}</td>
              <td v-if="!this.isSetNick"><input type="text" class="nickName" v-model="name" @click.once="showRulesForNick"><span class="nickTip">{{ $t('personal_info_tip') }}</span></td>
              <td v-if="this.isSetNick">{{this.storeName}}</td>
            </tr>
            <tr>
              <td>{{ $t('personal_info_address') }}</td>
              <td>{{this.address}}</td>
            </tr>
            <tr v-if="!this.isSetNick">
              <td></td>
              <td><div class="_btn" @click="toSetName">{{ $t('personal_info_save') }}</div></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'personal-info',
  data() {
    return {
      address: '',
      name: '',
      storeName: '',
      isSetNick: false,
    };
  },
  created() {
    console.log(this, 'created!!!!!!!');
    this.address = window.sessionStorage.address;
    this.storeName = window.sessionStorage.name;
    if (!window.sessionStorage.hasNick) {
      this.isSetNick = false;
    } else {
      this.storeName = window.sessionStorage.nickName;
      this.isSetNick = true;
    }
    this.updateInfo();
    console.log('"after inspect the is setNick"');
  },
  beforeMount() {
    this.updateInfo();
  },
  computed: {
    ...mapState(['user']),
    isSetSwitch() {
      if (this.$store.state.user.resource.extra === null) {
        return false;
      }
      return true;
    },
  },
  methods: {
    // update info
    updateInfo() {
      if (this.$store.state.user.resource.extra === null) {
        this.isSetNick = false;
      } else {
        this.isSetNick = true;
      }
    },
    toSetName() {
      console.log('Start to set name');
      const that = this;
      this.$store.dispatch('toSetNickName', {
        name: that.name,
        that,
      }).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.$store.commit('envaluePopup', {
            status: 0,
            msg: '修改成功,请等待同步!',
          });
          this.$store.commit('switchModalPopup');
          setTimeout(() => {
            console.log('更新！');
            that.$store.dispatch('loginAction', {
              address: that.$store.state.user.address,
              that,
            }).then((res2) => {
              if (res2.data.account.extra) {
                that.$store.commit('hasSetNick', { name: res2.data.account.extra.str1 });
              }
              that.$store.commit('login', {
                resource: res2.data.account,
              });
            });
          }, 10000);
        } else {
          this.$store.commit('envaluePopup', {
            status: 1,
            msg: res.data.error,
          });
          this.$store.commit('switchModalPopup');
        }
      });
    },
    showRulesForNick() {
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalRule');
    },
  },
};
</script>

<style scoped>
  .personal-right-contain {
    box-sizing: border-box;
    float: right;
    margin-left: 1.5%;
    padding-left: 20px;
    width: 79.5%;
    height: 600px;
    padding-bottom: 100px;
  }
  .info-top{
    width: 100%;
    padding: 20px 20px;
    background: #2a2c2d;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px rgb(26, 29, 29);
  }
  .info-top .info-top-title{
    border-left: 5px solid rgb(33, 133, 150);;
    padding-left: 10px;
    text-align: left;
    font-size: 15px;
  }
  .info-top .info-top-title h3{
    display: inline-block;
  }
  .info-top .info-top-content{
    padding-left: 20px;
    margin-top: 40px;
  }
  .info-top .info-top-content .right-content{
    display: inline-block;
    font-size: 12px;
    margin-left: 15%;
    vertical-align:bottom;
    color: #C9C9C9;
  }
  .right-content table{
    border-collapse: separate;
    border-spacing: 20px;
  }
  .right-content span{
    display: block;
    margin-top: 5px;
  }
  .info-top .info-top-content .right-content p{
    display: block;
    height: 25px;
    line-height: 25px;
  }
  input.nickName{
    display: block;
    outline: none;
    border: 1px solid #434749;
    background-color: #1D2020;
    color: #666666;
    height: 25px;
  }
  .nickTip{
    color: red;
  }
  .info-center{
    height: 50px;
    line-height: 50px;
    text-align: left;
    background: #2a2c2d;
    margin: 20px 0;
    box-shadow: 0px 0px 10px rgb(26, 29, 29);
  }
  .info-center span{
    margin-left: 10px;
  }
  .info-center .info-center-turn{
    color: rgb(33, 133, 150);
  }
  .info-bottom{
    background: #2a2c2d;
    box-shadow: 0px 0px 10px rgb(26, 29, 29);
  }
  .info-bottom .info-bottom-title{
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
  .info-bottom .info-bottom-title span{
    margin-left: 10px;
  }
  .info-bottom .info-bottom-topic{
    display: block;
    height: 30px;
    border-bottom: 5px solid #232525;
    border-top: 5px solid #232525;
  }
  .info-bottom .info-bottom-topic li{
    display: inline-block;
    margin-left: 6%;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }
  .info-bottom #table1,.info-bottom #table1 .info-table,.info-bottom #table1 .info-table .info-table-title{
    width: 100%;
  }
  .info-bottom #table1 .info-table .info-table-title th{
    width: 20%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #232525;
  }
  .info-bottom #table1 .info-table .info-table-content tr{
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .info-bottom #table1 .info-table .info-table-content td{
    width: 20%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #232525;
  }
  .active{
    color: rgb(33, 133, 150);
  }
  ._btn{
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    background-color: #404040;
  }
</style>
