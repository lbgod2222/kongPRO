<template>
  <div class="transfer-contain">
    <div class="upper">
      <span class="title">
        TRANSFER
      </span>
      <span class="close" @click="close">X</span>
    </div>
    <div class="bottom">
      <span class="inform">
        MAKE SURE THAT YOU HAVE PLACED RIGHT INFO IN BLANKS
      </span>
      <div class="form">
        <span class="receiveAddress">
          TRANSFER TO
          <input type="text">
        </span>
        <span class="amount">
          AMOUNT
          <input type="number">
        </span>
        <span class="fee">
          FEE
          <input type="number">
        </span>
        <span class="extra">
          EXTRA
          <input type="text">
        </span>
      </div>
      <div class="btn">SUBMIT</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transfer',
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
      this.$store.commit('switchModalTransfer');
    },
  },
};
</script>

<style scoped>
  .transfer-contain{
    margin: 40px auto 0;
    top: 20%;
    left: 25%;
    background-color: rgba(37, 39, 40, .9);
    width: 500px;
    height: auto;
    z-index: 999;
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
    padding-bottom: 20px;
    margin: auto;
  }
  .bottom .inform{
    font-size: 10px;
    margin: 20px auto;
    display: block;
    height: 40px;
    line-height: 40px;
    background-color: rgb(255, 124, 113);
    border-radius: 6px;
    color: #fff;
    text-align: center;
  }
  .form span{
    display: block;
    height: 40px;
    line-height: 40px;
    margin-top: 30px;
    border-bottom: 1px solid rgb(78, 78, 78);
  }
  .form input{
    width: 75%;
    height: 40px;
    line-height: 40px;
    float: right;
    color: rgb(180, 180, 181);
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
</style>
