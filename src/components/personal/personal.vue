<template>
  <div class="personal-contain">
    <ul>
        <router-link to="/personal/info">INFO</router-link>
        <router-link to="/personal/appeal">APPEAL</router-link>
        <router-link to="/personal/vote">VOTE</router-link>
        <router-link to="/personal/help">HELP</router-link>
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
</style>
