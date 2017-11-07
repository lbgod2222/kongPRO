<template>
  <div class="launchTopic-contain">
    <div class="upper">
      <span class="title">
        发布一个市场
      </span>
      <span class="close" @click="close">X</span>
    </div>
    <div class="bottom">
      <table>
        <tr>
          <td class="leftSpan">标题</td>
          <td class="rightSpan"><input type="text" class="title" v-model="topicTitle"></td>
        </tr>
        <tr>
          <td>发起人</td>
          <td class="sponsor">{{this.$store.state.user.address}}</td>
        </tr>
        <tr>
          <td>图片</td>
          <td class="issueImage"><input type="url" v-model="topicUrl"></td>
        </tr>
        <tr>
          <td class="detailTitle">详情</td>
          <td class="detail"><textarea name="" id="" cols="30" rows="10" placeholder="TYPE WHATEVER" v-model="topicDesc"></textarea></td>
        </tr>
        <tr>
          <td>市场选项</td>
          <td class="opt">
            <ul>
              <li class="setted" v-for="(item, index) in this.optList">
                {{item}} <span class="set_delete" @click="deleteOpt(index)">删除</span>
              </li>
              <li class="optInput">
                <input type="text" placeholder="TYPE OPTIONS HERE" v-model="editOpt" @keyup.enter="confirmOpt">
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>结束时间</td>
          <td class="endTime"><input type="number" class="year" v-model="endTime.year">年<input type="number" class="month" v-model="endTime.month">月<input type="number" class="day" v-model="endTime.day">日<input type="number" class="hour" v-model="endTime.hour">时<input type="number" class="minute" v-model="endTime.minute">分<input type="number" class="second" v-model="endTime.second">秒</td>
        </tr>
        <tr>
          <td>保证金</td>
          <td class="guarantee"><input type="number" min="0" v-model="topicGuarantee"></td>
        </tr>
        <tr>
          <td>初始股份</td>
          <td class="iniShare"><input type="number" min="0" v-model="topicShare"></td>
        </tr>
        <tr>
          <td>资金种类</td>
          <td class="currency"><input value="" v-model="topicCurrency"></td>
        </tr>
        <tr>
          <td>小费</td>
          <td>1 %</td>
        </tr>
        <!-- <tr>
          <td>TOPIC TYPE</td>
          <td class="topicType"><option value=""></option></td>
        </tr> -->
      </table>
      <div class="btn" @click="issueTopic">发布</div>
    </div>
  </div>
</template>

<script>
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
    optListString() {
      return this.optList.join();
    },
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
      }
    },
    deleteOpt(index) {
      this.optList.splice(index, 1);
    },
    issueTopic() {
      let that = this;
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
            gurantee: String(that.topicGuarantee),
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
  input, textarea{
    border: 1px solid rgb(78, 78, 78);
    border-radius: 3px;
    color: rgb(180, 180, 181);
    font-size: .8em;
  }
  input{
    height: 1.2em;
    line-height: 1.2em;
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
    width: 35px;
  }
  .set_delete{
    cursor: pointer;
    color: red;
  }
  .detailTitle{
    vertical-align: top;
  }
</style>
