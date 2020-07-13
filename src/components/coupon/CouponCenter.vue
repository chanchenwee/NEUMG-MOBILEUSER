<template>
	<div style="background-color:#F7F7F7">
		<div class="thishead">
			<van-nav-bar class="centerhead" title="领券中心"  left-arrow   @click-left="onClickLeft"
				@click-right="showPopup">
			  <template #right>
			   <van-icon name="question-o" size="18"/>
			  </template>
			</van-nav-bar>
		
		</div>
		<div class="img">
			<img
			style="border-radius:7px;"
			  width="95%"
			  height="150px"
			  src="../../../public/imgs/couponcenter/coupon1.jpg"/>
		</div>
		
		<div class="coupons">
			<template v-for="i in coupons">
			<div class="van-coupon">
			<div class="van-coupon__content">
			<div class="van-coupon__head">
				<h2 class="van-coupon__amount">1.5<span>元</span></h2><p class="van-coupon__condition">无使用门槛
			</p></div>
			<div class="van-coupon__body"><p class="van-coupon__name">优惠券名称</p><p class="van-coupon__valid">2017.03.10-2017.12.30</p>
			<div role="checkbox" tabindex="0" aria-checked="false" class="van-checkbox van-coupon__corner" size="18">
			<van-button  type="danger" round class="but">领取</van-button>
			</div></div></div><p class="van-coupon__description">描述信息</p>
			</div>
			</template>	
			</div>

		
		
		<van-tabbar v-model="active">
		<van-tabbar-item icon="coupon-o">领券</van-tabbar-item>
		  <van-tabbar-item icon="balance-o"@click="toRedPacket">领红包</van-tabbar-item>
		  <van-tabbar-item icon="user-o" @click="toMycoupon">我的优惠卷</van-tabbar-item>
		</van-tabbar>
	</div>	
		

</template>

<script>

	export default {

		 data() {
		    return {		     
			   show: false,
				active: 0,
				coupons:[1,2,3,4],
			         icon: {
			           active: 'https://img.yzcdn.cn/vant/user-active.png',
			           inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
			         },
					 
		    };
			
		  },
		
	  methods: {
	    onClickLeft() {
	      this.$router.push("/mine");
	    },
		

		//点击右上角问号
		showPopup() {
		      this.show = true;
		    },
			//点击我的优惠卷
		toMycoupon(){
			this.$router.push("/myCoupon")
		},
		//点击领红包
		toRedPacket(){
			this.$router.push("/VIPCenter")
		},

		
	  },
	};
</script>

<style scoped>
	
	.centerhead{
		font-family: "bodoni mt black";
		background: linear-gradient(90deg, #eb3c3c, #ff7459);
		box-shadow: 0 0.026667rem 0.066667rem rgba(255,98,98,0.4)
		
	}
/deep/.van-nav-bar__title {
		    max-width: 60%;
		    margin: 0 auto;
		    color: #ffffff;
		    font-weight: bold;
			font-family: "YouYuan";
		    font-size: 17px;
		}
	/deep/.van-nav-bar .van-icon {	
		color: #F2F3F5;
		}
	.img{
		text-align: center;
		box-shadow: 0 0 10px rgba(0,0,0,0.5);
		
		
		background: linear-gradient(90deg, #eb3c3c, #ff7459);
	}
	.coupons{
		
		margin-top: 1rem;
	}
	.but{
		
		
		max-height:2rem ;
		max-width: 4.6rem;
		font-size: 13px;
		font-family: "华文新宋";
		text-align: center;

	}
</style>