<template>
  <div class="navBar-contain">
    <h2>LOGO</h2>
    <router-link to="/">HOME</router-link>
    <router-link to="/topic/all" exact>TOPIC</router-link>
    <router-link to="/login" exact>LOGIN</router-link>
    <router-link to="/personal/info" exact>PERSONAL</router-link>
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
      line-height: 60px;
      height: 60px;
      box-shadow: 0px 1px 10px rgb(26, 29, 29)
  }
  .navBar-contain h2{
    color: rgb(33, 133, 150);
    display: inline;
  }
  .navBar-contain a.router-link-exact-active{
    color: rgb(33, 133, 150);
  }
  .navBar-contain a:nth-child(4), .navBar-contain a:nth-child(5){
    padding: 1px;
    display: inline-block;
    line-height: 30px;
    margin-top: 10px;
    margin-right: 30px;
    float: right;
    height: 30px;
    border: 1px solid rgb(180, 180, 181);
    border-radius: 10px;
  }
</style>
