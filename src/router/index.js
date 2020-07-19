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
import ForgetPassword from '../components/forget-password/ForgetPassword.vue'
import MyCoupon from '../components/coupon/MyCoupon.vue'
import CouponCenter from '../components/coupon/CouponCenter.vue'
import VIPCenter from '../components/coupon/VIPCenter.vue'
import RedPacket from '../components/coupon/RedPacket.vue'
import BottomBar from '../components/coupon/BottomBar.vue'
import FoodHome from '../views/FoodHome.vue'
import SearchFood from '../components/util/SearchFood.vue'
import ResetPassword from '../components/forget-password/ResetPassword.vue'
import ScoresDetail from '../components/coupon/ScoresDetail.vue'
import VipCertify from '../components/vipCertify/VipCertify.vue'
import Chat from '../components/chat/Chat.vue'
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
  	  path: '/chat',
  	  name: 'Chat',
  	  component: Chat
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
  },
  {
  	  path: '/forgetpassword',
  	  name: 'ForgetPassword',
  	  component: ForgetPassword
  },
  {
  	  path: '/resetpassword',
  	  name: 'ResetPassword',
  	  component: ResetPassword
  },
	

  {
  	  path: '/coupon',
  	  name: 'BottomBar',
  	  component: BottomBar,
	  children:[
	    {path: '/coupon/mycoupon',
	    name: 'MyCoupon',
	    component: MyCoupon,
		},
	    {path: '/coupon/couponcenter',
	    name: 'CouponCenter',
	    component: CouponCenter,
		},
	    {path: '/coupon/vipcenter',
	    name: 'VIPCenter',
	    component: VIPCenter,
		},	  
	  
	  ],
	  redirect: '/coupon/mycoupon',
  },
  {
  	  path: '/redPacket',
  	  name: 'RedPacket',
  	  component: RedPacket
  },
  
  {

  	  path: '/scoresdetail',
  	  name: 'ScoresDetail',
  	  component: ScoresDetail
  },
  {
  	  path: '/vipCertify',
  	  name: 'VipCertify',
  	  component: VipCertify
  },
  {  path: '/food',
	  name: 'FoodHome',
	  component: FoodHome
  },
  {
	  path: '/search',
	  name: 'SearchFood',
	  component: SearchFood
  }]

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
