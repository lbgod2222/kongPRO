<template>
  <div class="topic-exh-contain">
    <div class="exh-top">
        <h1>EXH TOP</h1>
    </div>
    <ul>
        <router-link to="/exhProgress">EXH_PROGRESS</router-link>
        <router-link to="/exhDetail">EXH_DETAIL</router-link>
        <router-link to="/exhComment">EXH_COMMENT</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default { name: 'topic-exh' };
</script>

<style scoped>
  .topic-exh-contain{
      margin-top: 250px;
      background-color: rgb(37, 39, 40);
      width: 100%;
      height: 600px;
  }
  .exh-top{
      width: 100%;
      height: 300px;
      border: 1px solid red;
      margin-top: 30px;
  }
  .topic-exh-contain ul{
      display: block;
      height: 40px;
      width: 100%;
  }
  .topic-exh-contain ul li{
      display: inline-block;
      width: 20%;
      height: 40px;
      line-height: 40px;
  }
</style>
