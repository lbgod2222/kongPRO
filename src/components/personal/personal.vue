<template>
  <div class="personal-contain">
    <ul>
        <router-link to="/personal"><img src="/static/img/Personal.png">个人信息</router-link>
        <router-link to="/personal/assert"><img src="/static/img/property.png">资产中心</router-link>
        <router-link to="/personal/market"><img src="/static/img/marketplace.png">我的市场</router-link>
        <router-link to="/personal/share"><img src="/static/img/stock.png">我的股份</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default { name: 'personal' };
</script>

<style scoped>
  .personal-contain{
      margin: 90px auto 0;
      max-width: 1600px;
      min-width: 1024px;
      width: 100%;
      height: 600px;
      padding: 0 1.5% 0;
  }
  .personal-contain ul{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    box-shadow: 0px 0px 10px rgb(26, 29, 29);
    width: 16%;
    height: 460px;
    float: left;
    background-color: rgb(37, 39, 40);
  }
  .personal-contain ul a{
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 70px;
      line-height: 70px;
      font-size: 1.3em;
      padding-left: 20%;
  }
  .personal-contain ul a img{
    vertical-align: text-bottom;
    margin-right: 15px;
  }
  .personal-contain a.router-link-exact-active{
    color: rgb(33, 133, 150);
  }
</style>
