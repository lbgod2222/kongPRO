<template>
  <div class="topic-exh-contain">
    <div class="exh-top">
        <div class="img"></div>
        <div class="info">
            <div class="detail">
                <h2>PRO TITLE</h2>
                <span>Sponser: MrLemon</span>
                <span>Currency: XAS</span>
                <span>Guarantee: 10000</span>
                <span>InitShares: 100</span>
                <span>MarketID: 12310012</span>
            </div>
            <div class="progress">
                <span>Status: IN PROGRESS</span>
                <span class="_top">TIME(N/E):60%</span>
                <progress max="100" value="65"></progress>
                <span class="_bottom"><b>IN PROGRESS</b><b>END.2017/12/12</b></span>
            </div>
        </div>
    </div>
    <ul>
        <!-- <router-link to="/topicExh/{{project id}}/exhProgress">EXH_PROGRESS</router-link> -->
        <router-link to="/topicExh/123123/exhOverview">EXH_OVERVEW</router-link>
        <router-link to="/topicExh/123123/exhDetail">EXH_DETAIL</router-link>
        <router-link to="/topicExh/123123/exhComment/1">EXH_COMMENT</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
// we need props here {params(number) marketID / QUERY:userID}
export default { name: 'topic-exh' };
</script>

<style scoped>
  .topic-exh-contain{
      box-sizing: border-box;
      max-width: 1600px;
      min-width: 1024px;
      margin: 90px auto 0;
      width: 100%;
      padding: 0 1.5% 0;
  }
  .exh-top{
      width: 100%;
      height: 300px;
  }
  .exh-top .img{
      display: inline-block;
      width: 63%;
      height: 300px;
      background-color: #aaaaaa;
  }
  .topic-exh-contain ul{
      display: block;
      line-height: 40px;
      margin-top: 30px;
      height: 40px;
      width: 100%;
      background-color: rgb(37, 39, 40);
      border-bottom: 2px solid rgb(30, 33, 35);
  }
  .topic-exh-contain ul a{
      display: inline-block;
      width: 15%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      margin-left: 20px;
  }
  .info{
      display: inline-flex;
      flex-direction: column;
      justify-content:space-between;
      float: right;
      width: 35%;
      height: 300px;
      margin-left: 1.5%;
      background-color: rgb(37, 39, 40);
  }
  .info .detail{
      width: 90%;
      margin: auto;
      padding: 20PX 0;
  }
  .info .detail span{
      display: block;
      margin-top: 5px;
  }
  .info .detail span:nth-child(2){
      margin-top: 15px;
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
background-color:rgb(244, 165, 49);
border: none;
margin-top: 10px;
margin-bottom: 10px;
color: rgb(92, 96, 98); /*IE10*/
}

.progress progress::-moz-progress-bar { background: rgb(92, 96, 98); }
.progress progress::-webkit-progress-bar { background: rgb(244, 165, 49); }
.progress progress::-webkit-progress-value  { background: rgb(92, 96, 98); }
</style>
