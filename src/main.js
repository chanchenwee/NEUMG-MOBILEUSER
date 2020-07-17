import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './common/stylus/index.styl'
import store from './store'
import { Tabbar, TabbarItem } from 'vant'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import Vant from 'vant'
import {Lazyload} from 'vant'
import 'vant/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import { AddressEdit } from 'vant';
import { Loading } from 'element-ui';
import { Toast } from 'vant';
axios.interceptors.request.use(function(request){
	console.log("我在main.js中loading......")
	 Toast.loading({
	   message: '加载中...',
	   forbidClick: true,
	   loadingType: 'spinner',
	 });
	 return request;
	});
	//错误收不到response
axios.interceptors.response.use(function (response) {
	// loadingInstance.close();
	Toast.clear();
	console.log("我是main.js中的前端过滤器，axios回来了，close loading......");
	// if(undefined == response.data.isLogin || response.data.isLogin){
	return response;
	// }else{
	// 	console.log()
	// 	if(undefined != response.data.msg){
	// 		Vue.prototype.$message.error(response.data.msg);
	// 	}else{
	// 		Vue.prototype.$message.error("会话超时，请重新登录...");

	// 	}

	// 	sessionStorage.clear();
	// 	router.push("/");
	// }


}, err => {
	console.log("我在main.js中发现错误，close loading......");
	Toast.clear();
	return Promise.reject(err);
});
Vue.use(AddressEdit);
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
