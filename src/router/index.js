import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/index/Home.vue'
import Login from '../Login.vue'
import Index from '../views/Index.vue'
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
		  }
	  ],
	  redirect: '/home',
  },
  {
	  path: '/login',
	  name: 'Login',
	  component: Login
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
