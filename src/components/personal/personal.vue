<template>
  <div class="personal-contain">
    <ul>
        <router-link to="/personal/info">INFO</router-link>
        <router-link to="/personal/assert">ASSERT</router-link>
        <router-link to="/personal/market">MARKET</router-link>
        <router-link to="/personal/share">SHARE</router-link>
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
      box-shadow: 0px 0px 10px rgb(26, 29, 29);
      display: inline-block;
      width: 16%;
      height: 500px;
      float: left;
      background-color: rgb(37, 39, 40);
  }
  .personal-contain ul a{
      display: block;
      width: 100%;
      height: 120px;
      line-height: 120px;
      text-align: center;
      font-size: 1.4em;
  }
  .personal-contain a.router-link-exact-active{
    color: rgb(33, 133, 150);
  }
</style>
