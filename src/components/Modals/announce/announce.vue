<template>
  <div class="announce-contain">
    <div class="upper">
      <span class="title">
        {{ $t('announce_title') }}
      </span>
      <span class="close" @click="close">X</span>
    </div>
    <div class="bottom">
      <h1>{{this.$store.state.announceTitle}}</h1>
      <table>
        <tr v-for="(item, index) in this.results">
          <td @click="confirmResult(index)"><span>{{ $t('announce_confirm') }}</span></td>
          <td>{{item.desc}}&nbsp;(&nbsp;{{item.share}}&nbsp;shares&nbsp;)</td>
          <td width="56%"><progress v-bind:max="totalNumber" :value="Number(item.share)"></progress></td>
        </tr>
      </table>
      <div class="showResult" v-if="this.showResult !== undefined">
        <h2>{{ $t('announce_tip') }}</h2>
        <span class="active">{{this.showResult.desc}}</span>
      </div>
      <div class="btn" @click="confirmAnnounce()">{{ $t('announce_submit') }}</div>
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
    totalNumber() {
      let totalValut = 0;
      for (let i = 0; i < this.results.length; i += 1) {
        totalValut += this.results[i].share;
      }
      return totalValut;
    },
  },
  async created() {
    const that = this;
    console.log(this, 'hahahahahaahahahahahahahaahahahahahahaha');
    let resultDetail = await this.$store.dispatch('getMarketResult', {
      id: this.$store.state.announceId,
      that,
    });
    this.results = resultDetail.data.results;
    for (let i = 0; i < this.results.length; i += 1) {
      this.results[i].share;
    }
    console.log(this);
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
        if (res.data.success === true) {
            this.$store.commit('envaluePopup', {
              status: 0,
              msg: this.$t('announce_tip_success'),
            });
            this.$store.commit('switchModalPopup');
          } else {
            this.$store.commit('envaluePopup', {
              status: 1,
              msg: res.data.error,
            });
            this.$store.commit('switchModalPopup');
          }
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
  .bottom h1{
    font-size: 18px;
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
    display: inline-block;
    width: 30px;
    height: 15px;
  }
  table tr{
    height: 40px;
    line-height: 40px;
  }
  table td{
    line-height: 14px;
  }
  table progress{
    width: 100%;
    border: none;
    background-color: #c5c5c5;
  }
  table progress::-webkit-progress-bar {
    background: rgb(37, 39, 40);
  }
  table progress::-webkit-progress-value {
    background: #c5c5c5;
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
