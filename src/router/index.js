import Vue from 'vue';
import Router from 'vue-router';
// 组件引入
import home from '@/components/home/home';
// 登录
import login from '@/components/login/login';
// 个人域
import personal from '@/components/personal/personal';
import personalAssert from '@/components/personal/personal-assert/personal-assert';
import personalMarket from '@/components/personal/personal-market/personal-market';
import personalInfo from '@/components/personal/personal-info/personal-info';
import personalShare from '@/components/personal/personal-share/personal-share';
// 话题域
import topic from '@/components/topic/topic';
import topicGroup from '@/components/topic/topic-group/topic-group';
// 话题详情域
import topicExh from '@/components/topicExh/topicExh';
import exhComment from '@/components/topicExh/topicComment/topicComment';
import exhDetail from '@/components/topicExh/topicDetail/topicDetail';
import exhOverview from '@/components/topicExh/topicInOverview/topicInOverview';


Vue.use(Router);

// funcs also can be settled here

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
      { path: '/', component: home }, // 主页
      { path: '/login', component: login }, // 登录
      // 总话题域
    {
      path: '/topic',
      component: topic,
      meta: { current: 'all' },
      children: [
        { path: 'all', component: topicGroup, meta: { current: 'all' } },
        { path: 'ongoing', component: topicGroup, meta: { current: 'ongoing' } },
        { path: 'revealing', component: topicGroup, meta: { current: 'revealing' } },
        { path: 'announcing', component: topicGroup, meta: { current: 'announcing' } },
        { path: 'mediating', component: topicGroup, meta: { current: 'mediating' } },
        { path: 'done', component: topicGroup, meta: { current: 'done' } },
      ],
    },
    // 话题详情域
    { path: '/topicExh/:id',
      name: 'detailPage',
      component: topicExh,
      children: [
        { path: '/', component: exhOverview },
        { path: 'exhDetail', component: exhDetail },
        { path: 'exhComment/:page', component: exhComment },
      ],
    },
    // 个人中心域
    { path: '/personal',
      component: personal,
      children: [
          { path: '/', component: personalInfo },
          { path: 'assert', component: personalAssert },
          { path: 'market', component: personalMarket },
          { path: 'share', component: personalShare },
      ],
    },
  ],
});
