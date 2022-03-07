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
import { Tabbar, TabbarItem } from 'vant';
import { Image as VanImage } from 'vant';
import { Grid, GridItem } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Icon } from 'vant';
import { Dialog } from 'vant';
import { Tab, Tabs } from 'vant';
import { List } from 'vant';
import { PullRefresh } from 'vant';

Vue.use(PullRefresh);
Vue.use(List)
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Dialog);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(Tabbar);
Vue.use(TabbarItem);
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
