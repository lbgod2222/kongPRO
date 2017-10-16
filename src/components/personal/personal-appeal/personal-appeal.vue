<template>
  <div class="personal-right-contain">
    <div class="personal-appeal">
      <div class="personal-appeal-top">
        <span class="appeal-image">图片</span>
        <div class="appeal-top-right">
          <p>世界杯中国VS日本</p>
          <span>世界杯中国VS日本世界杯中国VS日本世界杯中国VS日本世界杯中国VS日本世界杯中国VS日本世界杯中国VS日本世界杯中国VS日本世界杯中国VS日本</span>
          <p>参与金额:9873760</p>
          <span>时间进度:60%</span>
          <span>进度条进度条进度条进度条进度条进度条进度条进度条进度条进度条进度条进度条</span>
        </div>
      </div>
      <div class="personal-appeal-center">
        <span class="appeal-center-left">您已经对该话题进行申诉，仲裁委员将于24小时将会随机发送7名委员进行裁判</span>
        <span class="appeal-center-right">等待裁决</span>
      </div>
      <div class="personal-appeal-bottom">
        <span>饼图</span>
      </div>
    </div>

  </div>
</template>

<script>
export default { name: 'personal-appeal' };
</script>

<style scoped>
  .personal-right-contain{
      background-color: rgb(37, 39, 40);
      float: left;
      margin-left: 1.5%;
      width: 79.5%;
      height: 600px;
      box-shadow: 0px 0px 10px rgb(26, 29, 29);
  }
  .personal-appeal .personal-appeal-top .appeal-image{
    display: inline-block;
    height: 200px;
    width: 30%;
    background: red;
    line-height: 200px;
    text-align: center;
  }
  .personal-appeal .personal-appeal-top .appeal-top-right{
    display: inline-block;
    width: 65%;
    height: 200px;
    vertical-align:bottom;
    font-size: 12px;
    margin-left: 20px;
  }
  .personal-appeal .personal-appeal-top .appeal-top-right span{
    display: block;
    margin-top: 10px;
  }
  .personal-appeal .personal-appeal-top .appeal-top-right p{
    font-size: 16px;
    margin-top: 40px;
  }
  .personal-appeal .personal-appeal-center{
    width: 100%;
    margin: 10px 0;
    background: #2a2c2d;
    height: 50px;
    line-height: 50px;
  }
  .personal-appeal .personal-appeal-center .appeal-center-left{
    display: inline-block;
    width: 80%;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
  }
  .personal-appeal .personal-appeal-center .appeal-center-right{
    display: inline-block;
    float: right;
    width: 18%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #22c9df;
  }
  .personal-appeal .personal-appeal-bottom{
    height: 500px;
    line-height: 500px;
    text-align: center;
    background: cadetblue;
  }

</style>
