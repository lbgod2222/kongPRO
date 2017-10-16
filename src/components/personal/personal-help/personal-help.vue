<template>
  <div class="personal-right-contain">
    <div class="personal-help">
      <h4>帮组中心</h4>
      <div class="personal-help-content">
        <p>1.什么是声望，声望权限都有什么？</p>
        <p>2.对于公布期答案，需要怎么样的仲裁？</p>
        <p>3.关于转账手续费问题？</p>
      </div>
    </div>

  </div>
</template>

<script>
export default { name: 'personal-help' };
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
  .personal-help{
    width: 100%;
  }
  .personal-help h4{
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
  }
  .personal-help .personal-help-content p{
    height: 40px;
    line-height: 40px;
    margin-left: 50px;
    color: #ccc;
    font-size: 12px;
  }
</style>
