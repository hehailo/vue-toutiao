import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入css
import './styles/index.less'

// 移动端适配
import 'amfe-flexible'

// 引入vant
import { Form } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';
import { NavBar } from 'vant';
import { Toast } from 'vant';
import { CountDown } from 'vant';

Vue.use(CountDown);
Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
