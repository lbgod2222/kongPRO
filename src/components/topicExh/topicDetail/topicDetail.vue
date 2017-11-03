<template>
  <div class="detail-contain">
    <!-- 黑幕 -->
    <transition name="curtain-fade">
      <div class="curtain" v-show="this.isCurtain">Loading</div>
    </transition>
    <h1>TOPIC DETAIL PAGE</h1>
  </div>
</template>

<script>
export default { name: 'topic-detail' };
</script>

<style scoped>
  .detail-contain{
      background-color: rgb(37, 39, 40);
      width: 100%;
      padding-bottom: 40px;
  }
  /* 动画 */
  /* 黑幕 */
  .curtain{
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .8);
  }
  .curtain-fade-enter-active, .curtain-fade-leave-active{
    transition: all .2s ease;
  }
  .curtain-fade-enter, .curtain-fade-leave-active{
    opacity: 0;
  }
</style>