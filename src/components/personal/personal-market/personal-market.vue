<template>
  <div class="personal-right-contain">
    <transition name="curtain-fade">
      <div class="curtain" v-show="isCurtain">
        <iframe src="/static/img/loading-bars.svg" width="100" height="100"></iframe>
      </div>
    </transition>
    <div class="myMarket">
        <span class="label"><b>我的市场</b></span>
        <!-- <span class="label">
          <b :class="{ 'active': this.isDeal === true }" @click="toDeal">My Deal</b>
          <b :class="{ 'active': this.isDeal === false }" @click="toInit">My Initial</b>
        </span> -->
        <table>
          <thead>
            <th>标题</th>
            <th>保证金</th>
            <th>股份</th>
            <th>发起时间</th>
            <th>代币种类</th>
            <th>种类</th>
            <th colspan="2">操作</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in this.initMarket">
              <td>{{item.title}}</td>
              <td>{{item.margin}}</td>
              <td>{{item.share}}</td>
              <td>{{item.realTime}}</td>
              <td>{{item.currency}}</td>
              <td>{{item.realState}}</td>
              <td><span class="reveal" @click="callReveal(item.title, item.id)">揭示</span></td>
              <td><router-link class="_btn" :to="{ path: `/topicExh/${item.id}`, params:{ id: item.id }}">更多</router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import getRealTime from '../../../../static/js/getRealTime';

export default {
  name: 'personal-help',
  data() {
    return {
      isCurtain: false,
      isDeal: true,
      // 发起内容
      initMarket: {},
      // 发起内容页码设置
      initStatus: {
        totalNum: 0,
        currentPage: 0,
        limit: 10,
        offset: 0,
      },
    };
  },
  async created() {
    const that = this;
    this.isCurtain = true;
    const formState = function (state) {
      if (state === 0) {
        return '进行中';
      }
      if (state === 1) {
        return '等待揭示';
      }
      if (state === 2) {
        return '等待宣布';
      }
      if (state === 3) {
        return '仲裁中';
      }
      return '已完成';
    };
    const personalMarket = await this.$store.dispatch('getOwnMarket', {
      initiator: window.sessionStorage.address,
      limit: this.initStatus.limit,
      offset: this.initStatus.offset,
      that,
    });
    console.log(personalMarket);
    this.initMarket = personalMarket.data.markets;
    this.initStatus.totalNum = personalMarket.count;
    for (let i = 0; i < this.initMarket.length; i += 1) {
      this.initMarket[i].realTime = getRealTime.formatDateTime(this.initMarket[i].t_timestamp);
      this.initMarket[i].realState = formState(this.initMarket[i].state);
    }
    this.isCurtain = false;
    console.log(this.initMarket);
  },
  computed: {
  },
  methods: {
    async callReveal(title, id) {
      // envalue the pub state
      this.$store.commit('envalueAnnounceTitle', { title, id });
      // call up popup
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalAnnounce');
    },
  },
};
</script>

<style scoped>
  .personal-right-contain{
    position: relative;
    float: right;
    margin-left: 1.5%;
    width: 79.5%;
    height: 600px;
    box-shadow: 0px 0px 10px rgb(26, 29, 29);
    padding-bottom: 100px;
  }
  .myMarket table{
    width: 100%;
    text-align: center;
    background-color: rgb(37, 39, 40);
 }
 .myMarket table th{
    height: 40px;
    line-height: 40px;
    font-size: 1.2em;
 }
 .myMarket table tr{
    border-top: 1px solid rgb(66, 71, 73);
 }
 .myMarket table td{
    height: 30px;
    line-height: 30px;
 }
 .label{
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 1.3em;
    border-bottom: 4px solid rgb(30, 33, 35);
    padding-left: 20px;
    background-color: rgb(37, 39, 40);
 }
 .label b{
   border-left: 5px solid rgb(33, 133, 150);
   padding-left: 17px;
   display: inline-block;
   height: 1.1em;
   line-height: 1.1em;
 }
 .label:nth-child(2){
   font-size: 1.2em;
   font-weight: normal;
 }
 .label:nth-child(2) b{
   margin-right: 30px;
   cursor: pointer;
 }
 .reveal{
   cursor: pointer;
 }
 .active{
   color: rgb(33, 133, 150);
 }
 table tbody{
   position: relative;
 }
 /* 黑幕 */
.curtain{
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .8);
  z-index: 9;
}
.curtain iframe{
  display: block;
  margin: 100px auto 0 auto;
}
/* curtain动画 */
/* 过程显示 */
.curtain-fade-enter-active, .curtain-fade-leave-active{
  transition: all .2s ease;
}
.curtain-fade-enter, .curtain-fade-leave-active{
  opacity: 0;
}
</style>
