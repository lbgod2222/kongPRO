import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 这里能定义方法

export default new Router({
  mode: 'history', // 试试非哈希
  base: __dirname,
  routes: [
      { path: '/', component: Home }, // 主页
      // 总话题域
      { path: '/topic', component: Topic, meta: { current: 'all' },
        // children: [
        //     { path: 'all', component: Topic, meta: { current: 'all' } },
        //     { path: 'progress', component: Topic, meta: { current: 'progress' } },
        //     { path: 'public', component: Topic, meta: { current: 'public' } },
        //     { path: 'done', component: Topic, meta: { current: 'done' } }
        // ]
      },
      // 话题详情域
      { path: '/topicExh', component: Topic_exh, 
        children: [
            { path: 'exhProgress', component: exhProgress },
            { path: 'exhDetail', component: exhDetail },
            { path: 'exhDone', component: exhDone }
        ]
      },
      // 个人中心域
      { path: '/personal', component: Personal,
        children: [
            { path: 'info', component: Personal_info },
            { path: 'appeal', component: Personal_appeal },
            { path: 'help', component: Personal_help },
            { path: 'vote', component: Personal_vote }
        ]
      }
  ]
});
