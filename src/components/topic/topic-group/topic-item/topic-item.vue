<template>
  <div>
    <div class="container">
      <div class="_upperContain">
        <div class="img" v-if="this.item.image !== ''"><img :src="this.item.image" height="100%" width="100%"></img></div>
        <div class="img" v-if="this.item.image === ''">没有图片</div>
        <div class="info">
          <h2>{{this.item.title}}</h2>
          <P>{{this.item.desc}}</P>
        </div>
      </div>
      <div class="_bottomContain">
        <div class="progress">
          <!-- <span class="_top">TIME(N/E):{{this.item.progressInfo}}%</span> -->
          <progress max="100" :value="this.item.progressInfo"></progress>
          <span class="_bottom"><b>{{this.topicStatus}}</b><b>{{this.endTime}}</b></span>
        </div>
        <router-link class="_btn" :to="{ path: `/topicExh/${this.item.id}`, params:{ id: this.item.id }}">TO KNOW MORE</router-link>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import getRealTime from '../../../../../static/js/getRealTime';

export default {
  name: 'topic-item',
  props: ['item'],
  data() {
    return {
      title: null,
    };
  },
  created() {
    console.log(this.item.progressInfo);
    // 此时关闭公共state curtain
    // 调用mutation 关闭 公共 state curtain
  },
  computed: {
    topicStatus() {
      if (this.item.state === 0) {
        return '进行中';
      } else if (this.item.state === 1) {
        return '等待揭晓';
      } else if (this.item.state === 2) {
        return '公示答案';
      } else if (this.item.state === 3) {
        return '等待仲裁';
      } else {
        return '已结束';
      }
    },
    endTime() {
      return getRealTime.formatDateTime(this.item.t_timestamp);
    },
  },
  methods: {
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
