<template>
	<div class="index">
<div class="routerArea">
			<router-view></router-view>
		</div>	
	<van-tabbar v-model="active"active-color="#ff0101">
	<van-tabbar-item icon="coupon-o"@click="toCouponCenter">领券</van-tabbar-item>
	  <van-tabbar-item icon="balance-o"@click="toVipCenter">领红包</van-tabbar-item>
	  <van-tabbar-item icon="user-o" @click="toMycoupon">我的优惠卷</van-tabbar-item>
	</van-tabbar>
	</div>
</template>

<script>
	export default {
	
		 data() {
		    return {
			    active: 2,
				recommendList:[1,2,3,4],
				icon: {
				  active: '',
				  inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
				},
				
			};
			
		  },
		
	  methods: {
		//点击我的优惠卷
		toMycoupon(){
			this.$router.push("/coupon/mycoupon")
		},
		//点击领红包
		toVipCenter(){
			this.$router.push("/coupon/vipcenter")
		},
		toCouponCenter(){
			this.$router.push("/coupon/couponcenter")
		},
	  },
	};
</script>

<style>
	.index{
		height: inherit;
		width: 100%;
	}
	.routerArea{
		height: calc(100vh - 50px);
		width: 100%;
		overflow: scroll;
	}
</style>
