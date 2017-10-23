<template>
  <div class="_overView-contain">
    <div class="_overView">
      <table>
          <thead>
            <th>OPT</th>
            <th>SHARES</th>
            <th>CHANCE</th>
            <th>My.SHARE</th>
            <th colspan="3">OPERATION</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>23301</td>
              <td>82%</td>
              <td>100</td>
              <td><span @click="callSell">SELL</span></td>
              <td><span>BUY</span></td>
              <td><span @click="callDeal">DEAL</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>3000</td>
              <td>18%</td>
              <td>120</td>
              <td><span>SELL</span></td>
              <td><span>BUY</span></td>
              <td><span @click="callDeal">DEAL</span></td>
            </tr>
          </tbody>
        </table>
    </div>
    <div class="transitionDetail">
      <table>
          <thead>
            <th></th>
            <th>DEAL TIME</th>
            <th>OPT</th>
            <th>DEAL TYPE</th>
            <th>SHARE</th>
            <th>AMOUNT</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2008/09/08</td>
              <td>SELL</td>
              <td>WIN</td>
              <td>100</td>
              <td>$1000</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2008/09/08</td>
              <td>LOSE</td>
              <td>BUY</td>
              <td>120</td>
              <td>$1000</td>
            </tr>
          </tbody>
        </table>
    </div>
    <div class="sellModal" v-show="this.sellModal">
      <span class="close" @click="close">X</span>
      <table>
        <tr>
          <td>BUY</td>
          <td class="buy"><input type="number"> SHARES</td>
        </tr>
        <tr>
          <td>TOTAL</td>
          <td class="total">1000 XAS</td>
        </tr>
        <tr>
          <td>FEE</td>
          <td class="fee">1 XAS</td>
        </tr>
      </table>
    </div>
    <div class="dealModal" v-show="this.dealModal">
      <span class="close" @click="close">X</span>
      <h3>Exchange?</h3>
      <table>
        <tr>
          <td>TOTAL</td>
          <td class="share">1000 SHARES</td>
        </tr>
        <tr>
          <td>FEE</td>
          <td class="total">100000 XAS</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topic-_overView',
  data() {
    return {
      sellModal: false,
      buyModal: false,
      dealModal: false,
    };
  },
  computed: {
  },
  methods: {
    callSell() {
      this.$store.commit('switchBlackSheepWall');
      this.sellModal = true;
    },
    callBuy() {

    },
    callDeal() {
      this.$store.commit('switchBlackSheepWall');
      this.dealModal = true;
    },
    close() {
      this.sellModal = false;
      this.buyModal = false;
      this.dealModal = false;
      this.$store.commit('switchBlackSheepWall');
    },
  },
};
</script>

<style scoped>
  ._overView-contain{
    position: relative;
    background-color: rgb(37, 39, 40);
    width: 100%;
    height: 300px;
  }
  ._overView{
    padding-top: 20px;
  }
  ._overView table{
    width: 80%;
    margin: auto;
    text-align: center;
    background-color: rgb(37, 39, 40);
    border: 1px solid rgb(66, 71, 73);
 }
 ._overView table th{
    height: 40px;
    line-height: 40px;
    font-size: 1.2em;
    border-left: 1px solid rgb(66, 71, 73);
    border-right: 1px solid rgb(66, 71, 73);
 }
 ._overView table tr{
   border-top: 1px solid rgb(66, 71, 73);
 }
 ._overView table td{
    height: 30px;
    line-height: 30px;
    border-left: 1px solid rgb(66, 71, 73);
    border-right: 1px solid rgb(66, 71, 73);
 }
 ._overView table span{
   cursor: pointer;
 }
 .transitionDetail{
   margin-top: 30px;
 }
  .transitionDetail table{
    width: 80%;
    margin: auto;
    text-align: center;
    background-color: rgb(37, 39, 40);
    border: 1px solid rgb(66, 71, 73);
 }
 .transitionDetail table th{
    height: 40px;
    line-height: 40px;
    font-size: 1.2em;
    border-left: 1px solid rgb(66, 71, 73);
    border-right: 1px solid rgb(66, 71, 73);
 }
 .transitionDetail table tr{
   border-top: 1px solid rgb(66, 71, 73);
 }
 .transitionDetail table td{
    height: 30px;
    line-height: 30px;
    border-left: 1px solid rgb(66, 71, 73);
    border-right: 1px solid rgb(66, 71, 73);
 }
 .sellModal{
    background-color: rgba(37, 39, 40, .9);
    width: 300px;
    height: 140px;
    position: absolute;
    left: 300px;
    top: 0px;
    z-index: 999;
    padding: 10px 20px;
 }
 .sellModal .close{
   float: right;
   cursor: pointer;
 }
 .sellModal table{
   border-collapse: separate;
   border-spacing: 13px;
 }
 .sellModal table input{
    border: 1px solid rgb(78, 78, 78);
    border-radius: 3px;
    color: rgb(180, 180, 181);
    font-size: .8em;
 }
 .dealModal{
    background-color: rgba(37, 39, 40, .9);
    width: 250px;
    height: 120px;
    position: absolute;
    left: 300px;
    top: 0px;
    z-index: 999;
    padding: 10px 20px;
 }
 .dealModal .close{
   float: right;
   cursor: pointer;
 }
 .dealModal h3{
   margin: auto;
   display: block;
   text-align: center;
   clear: both;
 }
 .dealModal table{
   border-collapse: separate;
   border-spacing: 13px;
   margin: auto;
 }
</style>