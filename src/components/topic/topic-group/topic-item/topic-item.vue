<template>
  <div>
    <div class="container">
      <div class="_upperContain">
        <div class="img"></div>
        <div class="info">
          <h2>PRO TITLE</h2>
          <P>HERE LIES THE DETAILS OF THE PROJECT</P>
        </div>
      </div>
      <div class="_bottomContain">
        <div class="progress">
          <span class="_top">TIME(N/E):60%</span>
          <progress max="100" value="65"></progress>
          <span class="_bottom"><b>IN PROGRESS</b><b>END.2017/12/12</b></span>
        </div>
        <router-link class="_btn" to="/topicExh/123123/exhOverview">TO KNOW MORE</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topic-item',
  data() {
    return {
      title: null,
    };
  },
  created() {
    // console.log(this);
    // 此时关闭公共state curtain
    // 调用mutation 关闭 公共 state curtain
  },
};
</script>

<style scoped>
.container{
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
}
.img{
  height: 171px;
  width: 100%;
  background-color: #f0f0f0;
}
.info{
  width: 90%;
  margin: 10px auto;
}
._top{
  float: right;
}
._bottom{
  width: 100%;
  display: block;
}
._bottom b:nth-child(1){
  font-size: 1.2em;
}
._bottom b:nth-child(2){
  float: right;
}
.progress{
  width: 90%;
  margin: auto;
}
/* 进度条颜色控制 */
.progress progress {
  width: 100%;
  height: 10px;
  background-color:rgb(244, 165, 49);
  border: none;
  margin-top: 10px;
  margin-bottom: 10px;
  color: rgb(92, 96, 98); /*IE10*/
}

.progress progress::-moz-progress-bar { background: rgb(92, 96, 98); }
.progress progress::-webkit-progress-bar { background: rgb(244, 165, 49); }
.progress progress::-webkit-progress-value  { background: rgb(92, 96, 98); }
._btn{
  display: block;
  margin-top: 10px;
  width: 100%;
  height: 57px;
  line-height: 57px;
  text-align: center;
  background-color: rgb(30, 194, 219);
  color: #ffffff;
  cursor: pointer;
}
  /* .topic-item-contain{
      margin-top: 30px;
      background-color: rgb(37, 39, 40);
      width: 100%;
      height: 600px;
  } */
</style>
