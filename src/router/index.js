import Vue from 'vue';
import Router from 'vue-router';

// 组件引入
import home from '@/components/home/home'

// 个人域
import personal from '@/components/personal/personal'
import personal_appeal from '@/components/personal/personal-appeal/personal-appeal'
import personal_help from '@/components/personal/personal-help/personal-help'
import personal_info from '@/components/personal/personal-info/personal-info'
import personal_vote from '@/components/personal/personal-vote/personal-vote'

// 话题域
import topic from '@/components/topic/topic'
import topic_group from '@/components/topic/topic_group/topic_group'

// 话题详情域
import topic_exh from '@/components/topic_exh/topic_exh'
import exhComment from '@/components/topic_exh/topic_comment/topic_comment'
import exhDetail from '@/components/topic_exh/topic_detail/topic_detail'
import exhProgress from '@/components/topic_exh/topic_progress/topic_progress'


Vue.use(Router);

// funcs also can be settled here

export default new Router({
  mode: 'history', // 试试非哈希
  base: __dirname,
  routes: [
      { path: '/', component: Home }, // 主页
      // 总话题域
      { path: '/topic', component: topic, meta: { current: 'all' },
        children: [
            { path: 'all', component: topic_group, meta: { current: 'all' } },
            { path: 'progress', component: topic_group, meta: { current: 'progress' } },
            { path: 'public', component: topic_group, meta: { current: 'public' } },
            { path: 'done', component: topic_group, meta: { current: 'done' } }
        ]
      },
      // 话题详情域
      { path: '/topicExh', component: topic_exh, 
        children: [
            { path: 'exhProgress', component: exhProgress },
            { path: 'exhDetail', component: exhDetail },
            { path: 'exhComment', component: exhComment }
        ]
      },
      // 个人中心域
      { path: '/personal', component: personal,
        children: [
            { path: 'info', component: personal_info },
            { path: 'appeal', component: personal_appeal },
            { path: 'help', component: personal_help },
            { path: 'vote', component: personal_vote }
        ]
      }
  ]
});
