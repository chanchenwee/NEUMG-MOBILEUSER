import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Tabbar, TabbarItem } from 'vant'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import Vant from 'vant'
import {Lazyload} from 'vant'
import 'vant/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Lazyload);
Vue.use(Vant);
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
