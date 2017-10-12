<template>
  <div class="navBar-contain">
    <h1>NAV BAR</h1>
    <router-link to="/">HOME</router-link>
    <router-link to="/topic/all">TOPIC</router-link>
    <router-link to="/personal/info">PERSONAL</router-link>
  </div>
</template>

<script>
export default { name: 'navBar' };
</script>

<style scoped>
  .navBar-contain{
      position: fixed;
      top: 0;
      background-color: rgb(37, 39, 40);
      width: 100%;
      line-height: 150px;
      height: 150px;
  }
  .navBar-contain h1{
    display: inline;
  }
</style>
