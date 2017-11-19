import Vue from 'vue';
import VueI18n from 'vue-i18n';

/* eslint-disable */

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'ch',
  messages: {
    'ch': require('./ch.json'),
    'en': require('./en.json'),
  },
});

if (module.hot) {
    module.hot.accept(['./ch.json', './en.json'], () => {
        i18n.setLocaleMessage('ch', require('./ch.json'))
        i18n.setLocaleMessage('en', require('./en.json'))
        console.log('hot reload', this, arguments)
    })
}

export default i18n