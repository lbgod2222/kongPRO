<template>
  <div class="personal-right-contain">
    <div class="myShare">
        <span class="label">My Share</span>
        <table>
          <thead>
            <th>M.ID</th>
            <th>M.TITLE</th>
            <th>My.OPT</th>
            <th>SHARES</th>
          </thead>
          <tbody>
            <tr>
              <td>10291</td>
              <td>BRACIAS</td>
              <td>WIN</td>
              <td>9770</td>
            </tr>
            <tr>
              <td>10221</td>
              <td>MIGO</td>
              <td>LOSE</td>
              <td>1920</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
export default { name: 'personal-share' };
</script>

<style scoped>
  .personal-right-contain{
      float: left;
      margin-left: 1.5%;
      width: 79.5%;
      height: 600px;
      box-shadow: 0px 0px 10px rgb(26, 29, 29);
  }
  .myShare table{
    margin: 20px 0 0 0;
    width: 100%;
    text-align: center;
    background-color: rgb(37, 39, 40);
 }
 .myShare table th{
    height: 40px;
    line-height: 40px;
    font-size: 1.2em;
 }
 .myShare table tr{
   border-top: 1px solid rgb(66, 71, 73);
 }
 .myShare table td{
    height: 30px;
    line-height: 30px;
 }
 .label{
    display: inline-block;
    font-size: 1.3em;
    border-left: solid 5px rgb(33, 133, 150);
    padding-left: 20px;
 }
</style>
