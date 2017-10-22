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
              <td><a href="">SELL</a></td>
              <td><a href="">BUY</a></td>
              <td><a href="">DEAL</a></td>
            </tr>
            <tr>
              <td>2</td>
              <td>3000</td>
              <td>18%</td>
              <td>120</td>
              <td><a href="">SELL</a></td>
              <td><a href="">BUY</a></td>
              <td><a href="">DEAL</a></td>
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
  </div>
</template>

<script>
export default { name: 'topic-_overView' };
</script>

<style scoped>
  ._overView-contain{
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
</style>