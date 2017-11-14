<template>
  <div class="announce-contain">
    <div class="upper">
      <span class="title">
        设置昵称须知
      </span>
      <span class="close" @click="close">X</span>
    </div>
    <div class="bottom">
      <h2>
        <ul>
          <li>1.纯单字母注册收取1000个xas；</li>
          <li>2.纯双字母注册收取500个xas;</li>
          <li>3.纯三字母注册收取200个xas；</li>
          <li>4.纯四字母含A、E、I、O、U的元音字母注册收取100xas；其他四字母收取2个xas;</li>
          <li>5.注册后不可更改，不可转让；</li>
          <li>6.四位数以上、字母+带数字及符号的均收取1xas；</li>
        </ul>
      </h2>
      <div class="btn" @click="confirmAnnounce()">了解</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'rule',
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    // modal close
    close() {
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalRule');
    },
    confirmAnnounce() {
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalRule');
    },
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
  .bottom li{
    margin-top: 20px;
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
