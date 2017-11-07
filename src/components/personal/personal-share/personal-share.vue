<template>
  <div class="personal-right-contain">
    <div class="myShare">
        <span class="label">
          <b>我的股份</b>
        </span>
        <table>
          <thead>
            <th>市场ID</th>
            <th>市场标题</th>
            <th>我的选项</th>
            <th>我的股份</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in this.allShares">
              <td>{{item.mid}}</td>
              <td>{{item.title}}</td>
              <td>{{item.choice}}</td>
              <td>{{item.share}}</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
export default {
  name: 'personal-share',
  data() {
    return {
      allShares: {},
    };
  },
  created() {
    const that = this;
    this.$store.dispatch('getAllSharesOfOne', {
      address: window.sessionStorage.address,
      that,
    }).then((res) => {
      console.log(res);
      // 未经测试
      that.allShares = res.data.shares;
    });
  },
};
</script>

<style scoped>
  .personal-right-contain{
      float: left;
      margin-left: 1.5%;
      width: 79.5%;
      height: 600px;
      box-shadow: 0px 0px 10px rgb(26, 29, 29);
      padding-bottom: 40px;
  }
  .myShare table{
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
</style>
