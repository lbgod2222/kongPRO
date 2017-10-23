<template>
  <div class="launchTopic-contain">
    <div class="upper">
      <span class="title">
        ISSUE A TOPIC
      </span>
      <span class="close" @click="close">X</span>
    </div>
    <div class="bottom">
      <table>
        <tr>
          <td class="leftSpan">TITLE</td>
          <td class="rightSpan"><input type="text" class="title"></td>
        </tr>
        <tr>
          <td>SPONSOR</td>
          <td class="sponsor">MR.LEMON</td>
        </tr>
        <tr>
          <td>TIME</td>
          <td class="issueTime">2009/08/05</td>
        </tr>
        <tr>
          <td>DETAIL</td>
          <td class="detail"><textarea name="" id="" cols="30" rows="10" placeholder="TYPE WHATEVER"></textarea></td>
        </tr>
        <tr>
          <td>OPT SEETING</td>
          <td class="opt">
            <ul>
              <li class="optInput">
                <input type="text" placeholder="TYPE OPTIONS HERE">
              </li>
              <li class="add">+ ADD NEW OPTION</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>END TIME</td>
          <td class="endTime"><input type="number" class="year">Y <input type="number" class="month">M <input type="number" class="day">D</td>
        </tr>
        <tr>
          <td>GUARANTEE</td>
          <td class="guarante"><input type="number" min="0"></td>
        </tr>
        <tr>
          <td>INITIAL SHARES</td>
          <td class="iniShare"><input type="number" min="0"></td>
        </tr>
        <tr>
          <td>CURRENCY TYPE</td>
          <td class="currency"><option value=""></option></td>
        </tr>
        <tr>
          <td>FEE</td>
          <td>1 %</td>
        </tr>
        <tr>
          <td>TOPIC TYPE</td>
          <td class="topicType"><option value=""></option></td>
        </tr>
      </table>
      <div class="btn">SUBMIT</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'launchTopic',
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    // modal close
    close() {
      this.$store.commit('switchBlackSheepWall');
      this.$store.commit('switchModalLaunchTopic');
    },
  },
};
</script>

<style scoped>
  .launchTopic-contain{
    margin: 40px auto 0;
    top: 20%;
    left: 25%;
    background-color: rgba(37, 39, 40, .9);
    width: 500px;
    height: auto;
    z-index: 999;
  }
  .upper{
    padding: 0 10px;
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
    color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: rgb(30, 194, 219);
  }
  .upper .close{
    cursor: pointer;
  }
  .bottom{
    width: 80%;
    margin: 10px auto;
    padding-bottom: 10px;
  }
  .leftSpan{
    width: 100px;
    text-align: left;
  }
  input, textarea{
    border: 1px solid rgb(78, 78, 78);
    border-radius: 3px;
    color: rgb(180, 180, 181);
    font-size: .8em;
  }
  input{
    height: 1.2em;
    line-height: 1.2em;
  }
  table{
    border-collapse: separate;
    border-spacing: 13px;
  }
  table tr{
    margin-top: 10px;
  }
  .endTime input{
    width: 45px;
  }
  .opt li{
    margin-top: 10px;
  }
  .opt .add{
    cursor: pointer;
  }
  .btn{
    background-color: rgb(30, 194, 219);
    margin: 20px auto;
    height: 50px;
    width: 220px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }
  .guarante input, .iniShare input{
    width: 35px;
  }
</style>
