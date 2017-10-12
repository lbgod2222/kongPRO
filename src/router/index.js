import Vue from 'vue';
import Router from 'vue-router';
// 组件引入
import home from '@/components/home/home';
// 个人域
import personal from '@/components/personal/personal';
import personalAppeal from '@/components/personal/personal-appeal/personal-appeal';
import personalHelp from '@/components/personal/personal-help/personal-help';
import personalInfo from '@/components/personal/personal-info/personal-info';
import personalVote from '@/components/personal/personal-vote/personal-vote';
// 话题域
import topic from '@/components/topic/topic';
import topicGroup from '@/components/topic/topic-group/topic-group';
// 话题详情域
import topicExh from '@/components/topic_exh/topic_exh';
import exhComment from '@/components/topic_exh/topic_comment/topic_comment';
import exhDetail from '@/components/topic_exh/topic_detail/topic_detail';
import exhProgress from '@/components/topic_exh/topic_in_progress/topic_in_progress';


Vue.use(Router);

// funcs also can be settled here

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
      { path: '/', component: home }, // 主页
      // 总话题域
    {
      path: '/topic',
      component: topic,
      meta: { current: 'all' },
      children: [
        { path: 'all', component: topicGroup, meta: { current: 'all' } },
        { path: 'progress', component: topicGroup, meta: { current: 'progress' } },
        { path: 'public', component: topicGroup, meta: { current: 'public' } },
        { path: 'done', component: topicGroup, meta: { current: 'done' } },
      ],
    },
    // 话题详情域
    { path: '/topicExh',
      component: topicExh,
      children: [
          { path: 'exhProgress', component: exhProgress },
          { path: 'exhDetail', component: exhDetail },
          { path: 'exhComment', component: exhComment },
      ],
    },
    // 个人中心域
    { path: '/personal',
      component: personal,
      children: [
          { path: 'info', component: personalInfo },
          { path: 'appeal', component: personalAppeal },
          { path: 'help', component: personalHelp },
          { path: 'vote', component: personalVote },
      ],
    },
  ],
});
