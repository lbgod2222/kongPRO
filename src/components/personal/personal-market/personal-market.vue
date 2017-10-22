<template>
  <div class="personal-right-contain">
    <div class="myMarket">
        <span class="label">My Market</span>
        <span class="label">
          <b class="active">My Deal</b>
          <b>My Initial</b>
        </span>
        <table>
          <thead>
            <th>Currency</th>
            <th>Address</th>
            <th>Amount</th>
            <th>OPT</th>
          </thead>
          <tbody>
            <tr>
              <td>XAS</td>
              <td>Aod2AC0em123dfv</td>
              <td>12333</td>
              <td>Transition</td>
            </tr>
            <tr>
              <td>ETH</td>
              <td>Aod2AC0em123dfv</td>
              <td>12333</td>
              <td>Transition</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
export default { name: 'personal-help' };
</script>

<style scoped>
  .personal-right-contain{
      float: left;
      margin-left: 1.5%;
      width: 79.5%;
      height: 600px;
      box-shadow: 0px 0px 10px rgb(26, 29, 29);
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
 .label:nth-child(2){
   font-size: 1.2em;
   font-weight: normal;
 }
 .label:nth-child(2) b{
   margin-right: 30px;
   cursor: pointer;
 }
 .active{
   color: rgb(33, 133, 150);
 }
</style>
