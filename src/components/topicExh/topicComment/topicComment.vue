<template>
  <div class="comment-contain">
    <transition name="curtain-fade">
      <div class="curtain" v-show="this.isCurtain">
        <iframe src="/static/img/loading-bars.svg" width="100" height="100"></iframe>
      </div>
    </transition>
    <div class="upper">
      <h1>{{ $t('topicExh_comment_title') }}</h1>
      <div class="input">
        <textarea name="" id="" cols="30" rows="10" placeholder="输入内容..." v-model="content"></textarea>
      </div>
      <div class="_btn" @click="comment">{{ $t('topicExh_comment_submit') }}</div>
    </div>
    <div class="bottom">
      <!-- LOOP UNIT -->
      <div class="commentContain" v-for="(item, index) in this.allComment">
        <canvas width="60" height="60" v-bind:data-jdenticon-value="item.authorId"></canvas>
        <span class="name">{{item.nickname}}</span>
        <span class="time">{{item.realTime}}</span>
        <span class="content">{{item.content}}</span>
      </div>
    </div>
    <!-- 分页组件 -->
    <div class="pageGroup">
      <span class="pre_btn" @click="minPage()"></span>
      <span class="num_btn" v-for="(value, index) in this.page" @click="goto(value)" :class="{'active_btn':currentPage == Number(value)}">{{Number(value)}}</span>
      <span class="next_btn" @click="addPage()"></span>
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
/* eslint-disable */
import getRealTime from '../../../../static/js/getRealTime';
import Jdenticon from '../../../../node_modules/jdenticon';

export default {
  name: 'topic-comment',
  data() {
    return {
      allComment: {},
      content: '',
      isCurtain: false,
      // 分页states
      pageSpots: 5,
      currentPage: 1,
      totalCount: 0,
      pageLimit: 10,
    };
  },
  async created() {
    const that = this;
    console.log(this);
    // get all comments
    this.isCurtain = true;
    const resData = await this.$store.dispatch('getAllcomment', {
      id: this.$route.params.id,
      limit: this.pageLimit,
      offset: this.offsetNum,
      that,
    });
    console.log(resData, 'hey there');
    that.allComment = resData.data.comments;
    that.totalCount = resData.data.count;
    for (let i = 0; i < that.allComment.length; i += 1) {
      that.allComment[i].realTime = getRealTime.formatDateTime(that.allComment[i].t_timestamp);
    }
    that.isCurtain = false;
    console.log('now should be false,');
  },
  computed: {
    allPage() {
      if (Math.ceil(this.totalCount / 10) === 0) {
        return 1;
      } else {
        return Math.ceil(this.totalCount / 10);
      }
    },
    offsetNum() {
      return (this.currentPage - 1) * 10;
    },
    // 构造页签数组
    page: function () {
      let pag = []
      if (this.currentPage < this.pageSpots) {
        let i = Math.min(this.pageSpots, this.allPage);
        while (i) {
          pag.unshift(i--);
        }
      } else if (this.currentPage >= this.pageSpots) {
        let middle = this.currentPage - Math.floor(this.pageSpots / 2);
        let i = this.pageSpots;
        if (middle > (this.allPage - this.pageSpots)) {
          middle = (this.allPage - this.pageSpots) + 1;
        }
        while (i--) {
          pag.push(middle++)
        }
      }
      return pag;
    },
  },
  methods: {
    // 获取数据
    getData() {
      this.isCurtain = true;
      const that = this;
      this.$store.dispatch('getAllcomment', {
        id: this.$route.params.id,
        limit: this.pageLimit,
        offset: this.offsetNum,
        that,
      }).then((res) => {
        if (res.data.success) {
          that.allComment = res.data.comments;
          for (let i = 0; i < that.allComment.length; i += 1) {
            that.allComment[i].realTime = getRealTime.formatDateTime(that.allComment[i].t_timestamp);
          }
          this.isCurtain = false;
        } else {
          this.$store.commit('envaluePopup', {
            status: 1,
            msg: '网络错误',
          });
          this.$store.commit('switchModalPopup');
          return;
        }
      })
    },
    // pagination methods
    addPage(){
      console.log('+', this.page, this.currentPage);
      let that = this;
      if (this.currentPage < this.allPage) {
        this.currentPage = this.currentPage + 1;
        // that.currentPage = that.currentPage + 1
        this.getData(this.contentStatus, 12, this.offsetNum);
      } else {
        return;
      }
    },
    minPage(){
      console.log('-', this.page, this.currentPage);
      let that = this;
      if (that.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.getData(this.contentStatus, 12, this.offsetNum);
      } else {
        return;
      }
    },
    // 页面跳转
    goto(value){
      console.log('goto', value, this.page, this.currentPage);
      let that = this;
      if (value === this.currentPage) return;
      // that.currentPage = index
      this.currentPage = value;
      this.getData(this.contentStatus, 12, this.offsetNum);
    },
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
  mounted() {
    // monitor the refresh command from the father component
    this.$on('refresh', () => {
      this.getData();
    });
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
  /* 分页 */
  .pageGroup{
    position: absolute;
    bottom: 0;
    right: 0;;
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
  .active_btn{
    background-color: #00B9D7 !important;
    color: #000 !important;
  }
  /* .pageGroup span img{
    height: 70%;
  } */
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
