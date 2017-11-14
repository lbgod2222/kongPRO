<template>
  <div class="comment-contain">
    <transition name="curtain-fade">
      <div class="curtain" v-show="this.isCurtain">
        <iframe src="/static/img/loading-bars.svg" width="100" height="100"></iframe>
      </div>
    </transition>
    <div class="upper">
      <h1>评论区</h1>
      <div class="input">
        <textarea name="" id="" cols="30" rows="10" placeholder="输入内容..." v-model="content"></textarea>
      </div>
      <div class="_btn" @click="comment">发布评论</div>
    </div>
    <div class="bottom">
      <!-- LOOP UNIT -->
      <div class="commentContain" v-for="(item, index) in this.allComment">
        <canvas width="60" height="60" v-bind:data-jdenticon-value="item.authorId"></canvas>
        <span class="name">{{item.authorId}}</span>
        <span class="time">{{item.realTime}}</span>
        <span class="content">{{item.content}}</span>
      </div>
    </div>
    <!-- <div class="pageGroup">
      <span class="pre_btn" @click="minPage()"></span>
      <span class="num_btn" v-for="(value, index) in this.page" @click="goto(index)">{{Number(value)}}</span>
      <span class="next_btn" @click="addPage()"></span>
    </div> -->
    <!-- <h1>TOPIC COMMENT PAGE {{page}}</h1>
    <router-link to="/topicExh/123123/exhComment/5">TO PAGE 5</router-link>
    <router-link to="/topicExh/123123/exhComment/7">TO PAGE 7</router-link> -->
  </div>
</template>

<script>
import getRealTime from '../../../../static/js/getRealTime';
import Jdenticon from '../../../../node_modules/jdenticon';

export default {
  name: 'topic-comment',
  data() {
    return {
      page: 1,
      allComment: {},
      content: '',
      isCurtain: false,
    };
  },
  async created() {
    const that = this;
    console.log(this);
    console.log(this.$route.params.page);
    // get all comments
    this.isCurtain = true;
    const resData = await this.$store.dispatch('getAllcomment', {
      id: this.$route.params.id,
      that,
    });
    console.log(resData, 'hey there');
    that.allComment = resData.data.comments;
    for (let i = 0; i < that.allComment.length; i += 1) {
      that.allComment[i].realTime = getRealTime.formatDateTime(that.allComment[i].t_timestamp);
    }
    that.isCurtain = false;
    console.log('now should be false,');
  },
  computed: {
  },
  methods: {
    // 发布评论
    comment() {
      const that = this;
      console.log(this);
      if (!window.sessionStorage.isLogin) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '请先登录',
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      if (!window.sessionStorage.hasNick) {
        this.$store.commit('envaluePopup', {
          status: 1,
          msg: '请先设置昵称',
        });
        this.$store.commit('switchModalPopup');
        return;
      }
      this.$store.dispatch('toComment', {
        id: this.$route.params.id,
        content: this.content,
        that,
      }).then((res) => {
        console.log(res, 'after comment');
        if (res.data.success === true) {
          console.log('judge to true');
          that.$store.commit('envaluePopup', {
            status: 0,
            msg: '评论成功!',
          });
          that.content = '';
          this.$store.commit('switchModalPopup');
        } else {
          that.$store.commit('envaluePopup', {
            status: 1,
            msg: res.data.error,
          });
          this.$store.commit('switchModalPopup');
        }
      });
    },
  },
  updated() {
    Jdenticon();
  },
  beforeRouteUpdate(to, from, next) {
    console.log('to:  ', to);
    console.log('from:  ', from);
    this.page = to.params.page;
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('Gonna leave anyway?');
    const r = confirm('"Press a button"');
    if (r) {
      next();
    }
    // next();
  },
};
</script>

<style scoped>
  .comment-contain{
    position: relative;
    padding-top: 30px;
    background-color: rgb(37, 39, 40);
    width: 100%;
    padding-bottom: 40px;
  }
  .upper{
    width: 42%;
    margin-left: 17.3%;
  }
  .upper .input{
    margin-top: 10px;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 200px;
    border: 1px solid rgb(80, 85, 87);
  }
  .input textarea{
    height: 100%;
    width: 100%;
    border: none;
    background-color: rgb(37, 39, 40);
    color: #fff;
    resize: none;
    outline: none; 
  }
  ._btn{
    display: inline-block;
    margin-top: 20px;
    width: 17%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    background-color: rgb(30, 194, 219);
  }
  ._btn_active{
    background-color: rgb(32, 147, 164);
  }
  .bottom{
    width: 42%;
    margin-left: 17.3%;
  }
  .commentContain{
    margin-top: 30px;
    min-height: 60px;
  }
  .commentContain canvas{
    float: left;
  }
  .commentContain .name{
    display: inline-block;
    padding-top: 10px;
    font-size: 1.2em;
    font-weight: 600;
  }
  .commentContain .time{
    font-size: 1.1em;
    font-weight: 500;
    margin-left: 20px;
  }
  .commentContain .content{
    display: flex;
    margin-top: 5px;
    display: block;
  }
  /* 动画 */
  /* 黑幕 */
  .curtain{
    position: absolute;
    top: 0;
    height: 100%;
    min-height: 600px;
    width: 100%;
    background-color: rgba(0, 0, 0, .8);
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
  /* 分页区域 */
  .pageGroup{
    position: absolute;
    bottom: 0;
    left: 17.3%;
  }
  .pageGroup span{
    display: inline-block;
    height: 24px;
    width: 24px;
    line-height: 24px;
    text-align: center;
    border: 1px solid #838383;
    color: #8E8E93;
    vertical-align: bottom;
    cursor: pointer;
  }
  .pageGroup span.pre_btn{
    background-image: url('/static/img/Previous page.png');
    background-size: 35% 55%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .pageGroup span.next_btn{
    background-image: url('/static/img/next page.png');
    background-size: 35% 55%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .active_btn{
    background-color: #00B9D7 !important;
    color: #000 !important;
  }
</style>
