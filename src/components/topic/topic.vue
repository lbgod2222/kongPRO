<template>
  <div class="topic-contain">
      <ul>
          <router-link to="/all">ALL</router-link>
          <router-link to="/progress">PROGRESS</router-link>
          <router-link to="/public">PUBLIC</router-link>
          <router-link to="/done">DONE</router-link>
      </ul>
      <router-view></router-view>
    <h1>TOPIC GENERAL</h1>
  </div>
</template>

<script>
export default {
  name: 'topic'
}
</script>

<style scoped>
  .topic-contain{
      margin-top: 250px;
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
</style>
