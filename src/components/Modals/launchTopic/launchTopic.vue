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
          <td class="rightSpan"><input type="text" class="title" v-model="topicTitle"></td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_initiator') }}</td>
          <td class="sponsor">{{this.$store.state.user.resource.extra.str1}}</td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_picture') }}</td>
          <td class="issueImage"><input v-bind:placeholder="$t('launchTopic_pictureTip')" type="url" v-model="topicUrl"></td>
        </tr>
        <tr>
          <td class="detailTitle">{{ $t('launchTopic_detail') }}</td>
          <td class="detail"><textarea name="" id="" cols="30" rows="10" v-bind:placeholder="$t('launchTopic_detailTip')" v-model="topicDesc"></textarea></td>
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
          <td class="endTime"><input type="number" class="year" v-model="endTime.year">{{ $t('launchTopic_endTime_YEAR') }}<input type="number" class="month" v-model="endTime.month">{{ $t('launchTopic_endTime_MONTH') }}<input type="number" class="day" v-model="endTime.day">{{ $t('launchTopic_endTime_DAY') }}<input type="number" class="hour" v-model="endTime.hour">时<input type="number" class="minute" v-model="endTime.minute">分<input type="number" class="second" v-model="endTime.second">{{ $t('launchTopic_endTime_SECOND') }}</td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_margin') }}</td>
          <td class="guarantee"><input type="number" min="0" v-model="topicGuarantee"></td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_shares') }}</td>
          <td class="iniShare"><input type="number" min="0" v-model="topicShare"></td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_currency') }}</td>
          <td class="currency">
            <!-- <input value="" v-model="topicCurrency"> -->
            <select v-model="topicCurrency">
              <option :value ="item.currency" v-for="item in this.activeUser.resource.balances">{{item.currency}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>{{ $t('launchTopic_fee') }}</td>
          <td>1 %</td>
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
      endTime: {
        year: null,
        month: null,
        day: null,
        hour: null,
        minute: null,
        second: null,
      },
    };
  },
  computed: {
    ...mapGetters(['activeUser']),
    optListString() {
      return this.optList.join();
    },
  },
  created() {
    console.log(this);
  },
  methods: {
    // timely count the block added number
    blockAdded() {
      const currentTime = new Date().getTime();
      const finalTime = new Date(this.endTime.year, Number(this.endTime.month) - 1, this.endTime.day, this.endTime.hour, this.endTime.minute, this.endTime.second).getTime();
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
      let that = this;
      if (this.optList.length < 2) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '选项数量不正确！',
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
                msg: '发布成功!',
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
