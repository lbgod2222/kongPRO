<template>
  <div class="announce-contain">
    <div class="upper">
      <span class="title">
        ANNOUNCE RESULT
      </span>
      <span class="close" @click="close">X</span>
    </div>
    <div class="bottom">
      <h1>{{this.$store.state.announceTitle}}</h1>
      <table>
        <tr v-for="(item, index) in this.results">
          <td @click="confirmResult(index)"><span>CONFIRM</span></td>
          <td>{{item.desc}}&nbsp;(&nbsp;{{item.share}}&nbsp;shares&nbsp;)</td>
        </tr>
      </table>
      <div class="showResult" v-if="this.showResult !== undefined">
        <h2>WETHER TO CONFIRM RESULT LIKE THIS?</h2>
        <span class="active">{{this.showResult.desc}}</span>
      </div>
      <div class="btn" @click="confirmAnnounce()">SUBMIT</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'announce',
  data() {
    return {
      activeIndex: 1,
      results: {},
      showResult: undefined,
    };
  },
  computed: {
  },
  async created() {
    const that = this;
    console.log(this, 'hahahahahaahahahahahahahaahahahahahahaha');
    let resultDetail = await this.$store.dispatch('getMarketResult', {
      id: this.$store.state.announceId,
      that,
    });
    console.log(this);
    this.results = resultDetail.data.results;
  },
  methods: {
    // modal close
    close() {
      this.init();
    },
    confirmResult(index) {
      this.activeIndex = index;
      this.showResult = this.results[index];
    },
    confirmAnnounce() {
      const that = this;
      this.$store.dispatch('toReveal', {
        id: this.$store.state.announceId,
        choice: this.showResult.choice,
        that,
      }).then((res) => {
        console.log(res);
        this.init();
      })
    },
    init() {
      this.$store.commit('announceInit');
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalAnnounce');
    }
  },
};
</script>

<style scoped>
  .announce-contain{
    margin: 40px auto 0;
    top: 20%;
    left: 25%;
    background-color: rgba(37, 39, 40, .9);
    width: 500px;
    height: auto;
    z-index: 999;
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
  table{
    width: 100%;
    border-collapse: separate;
    border-spacing: 13px;
    margin: 30px auto 0 auto;
    text-align: center;
  }
  table span{
    color: #fff;
    cursor: pointer;
    background-color: rgb(30, 194, 219);
  }
  table tr{
    height: 40px;
    line-height: 40px;
  }
  table td{
    line-height: 14px;
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
  .detailTitle{
    vertical-align: top;
  }
  /* active btn */
  .active{
    color: red;
  }
  .showResult{
    width: 100%;
    text-align: center;
  }
  .showResult span{
    display: block;
    margin-top: 10px;
  }
</style>
