<template>
  <div class="personal-right-contain">
    <div class="info-top">
      <div class="info-top-title">
        <span>图标</span>
        <h3>个人信息</h3>
      </div>
      <div class="info-top-content">
        <span>头像</span>
        <div class="right-content">
          <p>昵称账号: 柠檬先生(县尉) (您还未申请昵称？)</p>
          <p>账号ID: 863295696485698</p>
          <p>注册时间: 01-04-2017 09:57:00</p>
        </div>
      </div>
    </div>
    <!-- <div class="info-center">
      <span>图标</span>
      <span>资产预览</span>
      <span>孔明币余额:$ 0.00</span>
      <span class="info-center-turn">转</span>
    </div>
    <div class="info-bottom">
      <div class="info-bottom-title">
        <span>图标</span>
        <span>我的投票</span>
      </div>
      <ul class="info-bottom-topic">
        <li id="topic1" class="active">参与的话题</li>
        <li id="topic2">发起的话题</li>
      </ul>
      <div id="table1">
        <table class="info-table" border="0" cellpadding="0" cellspacing="0">
          <thead class="info-table-title">
          <th>序列号</th>
          <th>标题</th>
          <th>选择</th>
          <th>状态</th>
          <th>异常</th>
          </thead>
          <tbody class="info-table-content">
          <tr>
          <td>ax20170911</td>
          <td>世界杯中国VS日本</td>
          <td>中国男足</td>
          <td>进行中</td>
          <td>结果有异</td>
          </tr>
          <tr>
          <td>ax20170911</td>
          <td>世界杯中国VS日本</td>
          <td>中国男足</td>
          <td>进行中</td>
          <td>结果有异</td>
          </tr>
          <tr>
          <td>ax20170911</td>
          <td>世界杯中国VS日本</td>
          <td>中国男足</td>
          <td>进行中</td>
          <td>结果有异</td>
          </tr>
          <tr>
          <td>ax20170911</td>
          <td>世界杯中国VS日本</td>
          <td>中国男足</td>
          <td>进行中</td>
          <td>结果有异</td>
          </tr>
          <tr>
          <td>ax20170911</td>
          <td>世界杯中国VS日本</td>
          <td>中国男足</td>
          <td>进行中</td>
          <td>结果有异</td>
          </tr>
          <tr></tr>
          </tbody>
        </table>
      </div>
    </div> -->
  </div>
</template>

<script>
  export default { name: 'personal-info' };
</script>

<style scoped>
  .personal-right-contain {
    box-sizing: border-box;
    float: left;
    margin-left: 1.5%;
    padding-left: 20px;
    width: 79.5%;
    height: 600px;
  }
  .info-top{
    width: 100%;
    padding: 10px 10px;
    background: #2a2c2d;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px rgb(26, 29, 29);
  }
  .info-top .info-top-title{
    height: 30px;
    line-height: 30px;
    text-align: left;
    font-size: 15px;
  }
  .info-top .info-top-title h3{
    display: inline-block;
  }
  .info-top .info-top-content{
    padding-left: 20px;
    height: 120px;
    line-height: 120px;
  }
  .info-top .info-top-content span{
    display: inline-block;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border-radius: 50%;
    background: #99CCCC;
  }
  .info-top .info-top-content .right-content{
    display: inline-block;
    font-size: 12px;
    margin-left: 20px;
    height: 100px;
    vertical-align:bottom;
  }
  .info-top .info-top-content .right-content p{
    display: block;
    height: 25px;
    line-height: 25px;
  }
  .info-center{
    height: 50px;
    line-height: 50px;
    text-align: left;
    background: #2a2c2d;
    margin: 20px 0;
    box-shadow: 0px 0px 10px rgb(26, 29, 29);
  }
  .info-center span{
    margin-left: 10px;
  }
  .info-center .info-center-turn{
    color: rgb(33, 133, 150);
  }
  .info-bottom{
    background: #2a2c2d;
    box-shadow: 0px 0px 10px rgb(26, 29, 29);
  }
  .info-bottom .info-bottom-title{
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
  .info-bottom .info-bottom-title span{
    margin-left: 10px;
  }
  .info-bottom .info-bottom-topic{
    display: block;
    height: 30px;
    border-bottom: 5px solid #232525;
    border-top: 5px solid #232525;
  }
  .info-bottom .info-bottom-topic li{
    display: inline-block;
    margin-left: 6%;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }
  .info-bottom #table1,.info-bottom #table1 .info-table,.info-bottom #table1 .info-table .info-table-title{
    width: 100%;
  }
  .info-bottom #table1 .info-table .info-table-title th{
    width: 20%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #232525;
  }
  .info-bottom #table1 .info-table .info-table-content tr{
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .info-bottom #table1 .info-table .info-table-content td{
    width: 20%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #232525;
  }
  .active{
    color: rgb(33, 133, 150);
  }
</style>
