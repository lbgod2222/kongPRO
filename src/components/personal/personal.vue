<template>
  <div class="personal-contain">
    <ul>
        <router-link to="/info">INFO</router-link>
        <router-link to="/appeal">APPEAL</router-link>
        <router-link to="/vote">VOTE</router-link>
        <router-link to="/help">HELP</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default { name: 'personal' };
</script>

<style scoped>
  .home-contain{
      margin-top: 250px;
      background-color: rgb(37, 39, 40);
      width: 100%;
      height: 600px;
      padding: 0 40px 0;
  }
  .home-contain ul{
      display: inline-block;
      width: 250px;
      height: 500px;
  }
  .home-contain ul li{
      display: block;
      width: 100%;
      height: 120px;
      line-height: 120px;
      font-size: 1.4em;
  }
</style>
