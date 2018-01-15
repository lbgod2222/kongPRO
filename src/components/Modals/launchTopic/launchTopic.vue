<template>
  <div class="launchTopic-contain">
    <div class="upper">
      <span class="title">
        {{ $t('launchTopic_title') }}
      </span>
      <span class="close" @click="close">X</span>
    </div>
    <div class="bottom">
      <table>
        <tr>
          <td class="leftSpan">{{ $t('launchTopic_topic') }}</td>
          <td class="rightSpan"><input type="text" class="title" v-model.trim="topicTitle"></td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_initiator') }}</td>
          <td class="sponsor">{{this.$store.state.user.resource.extra.str1}}</td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_picture') }}</td>
          <td class="issueImage"><input v-bind:placeholder="$t('launchTopic_pictureTip')" type="url" v-model.trim="topicUrl"></td>
        </tr>
        <tr>
          <td class="detailTitle">{{ $t('launchTopic_detail') }}</td>
          <td class="detail"><textarea name="" id="" cols="30" rows="10" v-bind:placeholder="$t('launchTopic_detailTip')" v-model.trim="topicDesc"></textarea></td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_options') }}</td>
          <td class="opt">
            <ul>
              <li class="setted" v-for="(item, index) in this.optList">
                {{item}} <span class="set_delete" @click="deleteOpt(index)">{{ $t('launchTopic_delete') }}</span>
              </li>
              <li class="optInput">
                <input type="text" v-bind:placeholder="$t('launchTopic_optionTip')" v-model.trim="editOpt" @keyup.enter="confirmOpt">
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_endTime') }}</td>
          <td class="endTime" @click="envalueDead">
            <!-- <input type="number" class="year" v-model="endTime.year">{{ $t('launchTopic_endTime_YEAR') }}<input type="number" class="month" v-model="endTime.month">{{ $t('launchTopic_endTime_MONTH') }}<input type="number" class="day" v-model="endTime.day">{{ $t('launchTopic_endTime_DAY') }}<input type="number" class="hour" v-model="endTime.hour">时<input type="number" class="minute" v-model="endTime.minute">分<input type="number" class="second" v-model="endTime.second">{{ $t('launchTopic_endTime_SECOND') }} -->
            <date-picker :date="date" :option="option" :limit="limit"></date-picker>
          </td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_margin') }}</td>
          <td class="guarantee"><input type="number" min="0" v-model.trim="topicGuarantee"></td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_shares') }}</td>
          <td class="iniShare"><input type="number" min="0" v-model.trim="topicShare" v-bind:placeholder="$t('launchTopic_shareTip')"></td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_currency') }}</td>
          <td class="currency">
            <!-- <input value="" v-model="topicCurrency"> -->
            <select v-model.trim="topicCurrency">
              <option :value ="item.currency" v-for="item in this.activeUser.resource.balances">{{item.currency}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_fee') }}</td>
          <td>0.1 XAS</td>
        </tr>
        <!-- <tr>
          <td>TOPIC TYPE</td>
          <td class="topicType"><option value=""></option></td>
        </tr> -->
      </table>
      <div class="btn" @click="issueTopic">{{ $t('launchTopic_submit') }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import myDatepicker from 'vue-datepicker/vue-datepicker-es6';

/* eslint-disable */
export default {
  name: 'launchTopic',
  data() {
    return {
      optList: [],
      editOpt: '',
      // content of topic to be issued
      topicTitle: '',
      topicUrl: '',
      topicDesc: '',
      topicCurrency: '',
      topicGuarantee: null,
      topicShare: null,
      // endTime: {
      //   year: null,
      //   month: null,
      //   day: null,
      //   hour: null,
      //   minute: null,
      //   second: null,
      // },
      // for Vue 2.0
      date: {
        time: '',
      },
      startTime: {
        time: '2017-11-11',
      },
      endtime: {
        time: '',
      },
      option: {
        type: 'min',
        week: ['一|Mo', '二|Tu', '三|We', '四|Th', '五|Fr', '六|Sa', '日|Su'],
        month: ['一月|January', '二月|February', '三月|March', '四月|April', '五月|May', '六月|June', '七月|July', '八月|August', '九月|September', '十月|October', '十一月|November', '十二月|December'],
        format: 'YYYY-MM-DD HH:mm:ss',
        placeholder: 'End Time',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '1.4em',
          'font-size': '1em',
          'border': '1px solid rgb(78, 78, 78)',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '3px',
          'color': 'rgb(180, 180, 181)'
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },
      timeoption: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm:ss'
      },
      multiOption: {
        type: 'multi-day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format:"YYYY-MM-DD HH:mm:ss"
      },
      limit: [{
        type: 'fromto',
        from: window.sessionStorage.today,
        to: '2038-12-5'
      }]
    };
  },
  computed: {
    ...mapGetters(['activeUser']),
    optListString() {
      return this.optList.join();
    },
  },
  created() {
    
  },
  methods: {
    // envalue the deadline of datepicker
    envalueDead() {
      const rightnow = new Date();
      const rightnow_year = rightnow.getFullYear();
      const rightnow_day = rightnow.getDate();
      const rightnow_month = rightnow.getMonth() + 1;
      const str_dead = `${rightnow_year}-${rightnow_month}-${rightnow_day}`
      console.log(str_dead);
      this.limit.from = str_dead;
    },
    // timely count the block added number
    blockAdded() {
      const currentTime = new Date().getTime();
      const finalTime = new Date(this.date.time).getTime();
      return ((finalTime - currentTime) / 10000).toFixed();
    },
    // modal close
    close() {
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalLaunchTopic');
    },
    confirmOpt() {
      const presetOpt = this.editOpt.trim();
      if (presetOpt !== '') {
        this.optList.push(presetOpt);
        this.editOpt = '';
      } else {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '选项不能为空！',
        });
        this.$store.commit('switchModalPopup');
      }
    },
    deleteOpt(index) {
      this.optList.splice(index, 1);
    },
    issueTopic() {
      console.log(this);
      let that = this;
      if (this.topicTitle.length < 5 || this.topicTitle.length > 256) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: this.$t('launchTopic_tip_title'),
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      if (this.topicTitle === '' || this.topicUrl === '' || this.topicDesc === '' || this.topicCurrency === '' || this.topicGuarantee === '' || this.topicShare === '') {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: this.$t('launchTopic_tip_needwhole'),
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      if (this.topicGuarantee <= 0) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: this.$t('launchTopic_tip_guarantee'),
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      if (this.topicShare <= 0) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: this.$t('launchTopic_tip_initshares'),
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      if (this.optList.length < 2) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: this.$t('launchTopic_tip_options'),
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      this.$store.dispatch('getBlockHeight', { that }).then((res) => {
        console.log('afer get blockheight', res);
        if (res.data.success === true) {
          let blockHeight = Number(res.data.height) + Number(that.blockAdded());
          console.log('already get in', blockHeight);
          that.$store.dispatch('toIssueTopic', {
            title: that.topicTitle,
            image: that.topicUrl,
            desc: that.topicDesc,
            results: that.optListString,
            currency: that.topicCurrency,
            gurantee: String((that.topicGuarantee * 1e8).toFixed()),
            share: Number(that.topicShare),
            endHeight: Number(blockHeight),
            that
          }).then((res) => {
            console.log(res);
            if (res.data.success === true) {
              this.$store.commit('envaluePopup', {
                status: 0,
                msg: this.$t('launchTopic_tip_success'),
              });
              this.$store.commit('switchModalPopup');
            } else {
              this.$store.commit('envaluePopup', {
                status: 1,
                msg: res.data.error,
              });
              this.$store.commit('switchModalPopup');
              return;
            }
            that.close();
          });
        }
      });
    },
  },
  components: {
    'date-picker': myDatepicker
  }
};
</script>

<style scoped>
  .launchTopic-contain{
    margin: 40px auto 0;
    top: 20%;
    left: 25%;
    background-color: rgba(37, 39, 40, .9);
    width: 500px;
    height: auto;
    z-index: 999;
    max-height: 600px;
    overflow-y: scroll;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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
  .leftSpan{
    width: 100px;
    text-align: left;
  }
  input, textarea, select{
    border: 1px solid rgb(78, 78, 78);
    border-radius: 3px;
    color: rgb(180, 180, 181);
    font-size: .8em;
    background-color: transparent;
    outline: none;
  }
  select option{
    color: rgb(180, 180, 181);
    font-size: .8em;
    background-color: rgb(78, 78, 78);
    outline: none;
    border: none;
  }
  input, select{
    height: 1.4em;
    line-height: 1.4em;
  }
  table{
    border-collapse: separate;
    border-spacing: 13px;
  }
  table tr{
    margin-top: 10px;
  }
  .endTime input{
    width: 55px;
  }
  .opt li{
    margin-top: 10px;
  }
  .opt .add{
    cursor: pointer;
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
  .guarante input, .iniShare input{
    width: 75px;
  }
  .set_delete{
    cursor: pointer;
    color: red;
  }
  .detailTitle{
    vertical-align: top;
  }
</style>
