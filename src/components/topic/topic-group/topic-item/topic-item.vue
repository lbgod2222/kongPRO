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
          <span class="_bottom"><b>{{this.topicStatus}}</b><b>{{ $t('topic_item_endTime') }}：{{this.endTime}}</b></span>
        </div>
        <router-link class="_btn" :to="{ path: `/topicExh/${this.item.id}`, params:{ id: this.item.id }}">{{ $t('topic_item_more') }}</router-link>
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
    console.log(this.item);
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
        return '正在公示';
      } else {
        return '已结束';
      }
    },
    endTime() {
      const eTime = ((this.item.endHeight - this.item.t_height) * 10) + this.item.t_timestamp;
      return getRealTime.formatDateTime(eTime);
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
  box-shadow: 0px 2px 4px rgba(0, 0, 0, .2);
}
.img{
  width: 100%;
  overflow: hidden;
  background-color: #f0f0f0;
  background-color: rgb(37, 39, 40);
}
.img img{
  width: 100%;
  height: auto;
}
.info{
  width: 90%;
  margin: 10px auto;
}
.info p{
    display: block;
    height: 5vw;
    overflow: auto;
    box-sizing: border-box;
    padding-top: 10px;
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
  /* 响应式 */
  @media screen and ( min-width : 1600px) {
    .extra-content .img{
      height: 191px;
    }
  }
  @media screen and ( min-width : 900px) and (max-width: 1600px) {
    .extra-content .img{
      height: 12vw;
    }
  }
</style>
