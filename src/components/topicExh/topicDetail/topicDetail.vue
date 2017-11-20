<template>
  <div class="detail-contain">
    <!-- 黑幕 -->
    <transition name="curtain-fade">
      <div class="curtain" v-show="this.isCurtain">
        <iframe src="/static/img/loading-bars.svg" width="100" height="100"></iframe>
      </div>
    </transition>
    <div class="content">
      <h1>{{item.title}}</h1>
      <h2>ID：{{item.id}}</h2>
      <h2>{{ $t('topicExh_initiator') }}：{{item.initiator}}</h2>
      <h2>{{ $t('topicExh_currency') }}：{{item.currency}}</h2>
      <h2>{{ $t('personal_market_startTime') }}：{{item.timestamp}}</h2>
      <h2>{{ $t('topicExh_total') }}：{{item.total / 1e8}}</h2>
      <h2>{{ $t('topicExh_status') }}：<span>{{item.status}}</span></h2>
      <h2>{{ $t('topicExh_margin') }}：{{item.margin / 1e8}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topic-detail',
  props: ['item'],
  data() {
    return {
      isCurtain: false,
    };
  },
  created() {
    console.log(this.item);
  },
};
</script>

<style scoped>
  .detail-contain{
    background-color: rgb(37, 39, 40);
    width: 100%;
    padding-bottom: 40px;
  }
  .content{
    width: 90%;
    margin: auto;
    padding: 30px;
  }
  .content h1, h2{
    line-height: 1.2em;
  }
  .content span{
    display: inline-block;
    background-color: #006489;
    border-radius: 4px;
    width: 95px;
    text-align: center;
  }
  /* 动画 */
  /* 黑幕 */
  .curtain{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .8);
    min-height: 600px;
  }
  .curtain iframe{
    display: block;
    margin: 100px auto 0 auto;
  }
  .curtain-fade-enter-active, .curtain-fade-leave-active{
    transition: all .2s ease;
  }
  .curtain-fade-enter, .curtain-fade-leave-active{
    opacity: 0;
  }
</style>