<template>
  <div class="topic-contain">
    <ul>
        <router-link to="/topic/all">ALL</router-link>
        <router-link to="/topic/progress">PROGRESS</router-link>
        <router-link to="/topic/public">PUBLIC</router-link>
        <router-link to="/topic/done">DONE</router-link>
    </ul>
    <h1>TOPIC GENERAL</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default { name: 'topic' };
</script>

<style scoped>
  .topic-contain{
      margin-top: 70px;
      background-color: rgb(37, 39, 40);
      width: 100%;
      height: 600px;
  }
  .topic-contain ul{
      display: block;
      width: 75%;
      height: 40px;
  }
  .topic-contain ul li{
      display: inline-block;
      height: 40px;
      line-height: 40px;
      width: 20%;
  }
  .topic-contain a.router-link-active{
    color: rgb(33, 133, 150);
  }
</style>
