// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueI18n from 'vue-i18n';
import App from './App';
import router from './router';
import store from './vuex/store';
import getRealTime from '../static/js/getRealTime';

Vue.config.productionTip = false;

// 国际化
Vue.use(VueI18n);
// 注册axios为原型
Vue.prototype.$axios = axios;
Vue.prototype.$getRealTime = getRealTime;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: { App },
});
