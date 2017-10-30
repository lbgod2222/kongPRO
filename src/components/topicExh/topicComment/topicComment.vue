<template>
  <div class="comment-contain">
    <div class="upper">
      <h1>SAY SOMETHING</h1>
      <div class="input">
        <textarea name="" id="" cols="30" rows="10" placeholder="TYPE YOUR MIND..." v-model="content"></textarea>
      </div>
      <div class="_btn" @click="comment">Subit</div>
    </div>
    <div class="bottom">
      <!-- LOOP UNIT -->
      <div class="commentContain" v-for="(item, index) in this.allComment">
        <span class="name">{{item.authorId}}</span>
        <span class="time">{{item.realTime}}</span>
        <span class="content">{{item.content}}</span>
      </div>
    </div>
    <!-- <h1>TOPIC COMMENT PAGE {{page}}</h1>
    <router-link to="/topicExh/123123/exhComment/5">TO PAGE 5</router-link>
    <router-link to="/topicExh/123123/exhComment/7">TO PAGE 7</router-link> -->
  </div>
</template>

<script>
import getRealTime from '../../../../static/js/getRealTime';

export default {
  name: 'topic-comment',
  data() {
    return {
      page: 1,
      allComment: {},
      content: '',
    };
  },
  created() {
    const that = this;
    console.log(this);
    console.log(this.$route.params.page);
    // get all comments
    this.$store.dispatch('getAllcomment', {
      id: this.$route.params.id,
      that,
    }).then((res) => {
      console.log(res);
      that.allComment = res.data.comments;
      for (let i = 0; i < that.allComment.length; i += 1) {
        that.allComment[i].realTime = getRealTime.formatDateTime(that.allComment[i].t_timestamp);
      }
    });
  },
  computed: {
  },
  methods: {
    // 发布评论
    comment() {
      const that = this;
      console.log(this.$route.params.id, this.content);
      this.$store.dispatch('toComment', {
        id: this.$route.params.id,
        content: this.content,
        that,
      }).then((res) => {
        console.log(res);
        alert('COMMENT SUCCESSFULLY!');
      });
    },
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
    padding-top: 30px;
      background-color: rgb(37, 39, 40);
      width: 100%;
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
  }
  .commentContain .name{
    font-size: 1.2em;
    font-weight: 600;
  }
  .commentContain .time{
    font-size: 1.1em;
    font-weight: 500;
    margin-left: 20px;
  }
  .commentContain .content{
    margin-top: 5px;
    display: block;
  }
</style>
