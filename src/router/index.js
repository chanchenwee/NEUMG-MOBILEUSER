import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/index/Home.vue'
import Login from '../Login.vue'
import Index from '../views/Index.vue'
import Mine from '../components/mine/Mine.vue'
import Register from '../components/register/Register.vue'
import Setting from '../components/setting/Setting.vue'
import Updateinfo from '../components/update-info/Updateinfo.vue'
import Updatepassword from '../components/update-password/Updatepassword.vue'
import UpdateAddress from '../components/updateaddress/UpdateAddress.vue'
Vue.use(VueRouter)

  const routes = [
  {
	  path: '/',
	  name: 'index',
	  component: Index,
	  children:[
		  {
			  path: '/home',
			  name: 'Home',
			  component: Home
		  },
		  {
			  path: '/mine',
			  name: 'Mine',
			  component: Mine
		  }
	  ],
	  redirect: '/home',
  },
  {
	  path: '/login',
	  name: 'Login',
	  component: Login
  },
  {
  	  path: '/register',
  	  name: 'Register',
  	  component: Register
  },
  {
  	  path: '/setting',
  	  name: 'Setting',
  	  component: Setting
  },
  {
  	  path: '/updateinfo',
  	  name: 'Updateinfo',
  	  component: Updateinfo
  },
  {
  	  path: '/updatepassword',
  	  name: 'Updatepassword',
  	  component: Updatepassword
  },
  {
  	  path: '/updateaddress',
  	  name: 'UpdateAddress',
  	  component: UpdateAddress
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    document.title = "五凤楼点餐系统";
	next();
})


export default router
