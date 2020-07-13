<template>
	<div>
		
		<van-nav-bar class="couponhead" title="优惠卷"  left-arrow   @click-left="onClickLeft"
			@click-right="showPopup">
		  <template #right>
		   <van-icon name="question-o" size="18"/>
		  </template>
		</van-nav-bar>
	
		 <van-coupon-list
		   :disabled-title="outdate"
			:show-exchange-bar="flag"
			:close-button-text="buttext"
		    :coupons="coupons"
			 :disabled-coupons="disabledCoupons"
		    @change="toCouponCenter"
		    @exchange="toCouponCenter"
		  />
		
		
		

		
		
		
		
		
		
		
		
		
<van-popup v-model="show"position="top" :style="{ height: '45%' }">
	<van-nav-bar title="优惠卷" left-arrow  @click-left="onClickruleLeft" >
	 
	</van-nav-bar>
     <el-collapse style="margin-left: 15px;">
            <el-collapse-item title="1.什么是优惠卷" name="1">

              <div>优惠卷是系统发放给用户的，用于减免购买支付的惠民措施，每张优惠卷有不同的使用条件和减免金额；</div>
            </el-collapse-item>
            <el-collapse-item title="2.优惠卷的类型有哪些" name="2">
              <div>优惠卷按照面额大小分为三档，其中优惠金额低于10元的为黄卷；低于50元的为绿卷；高于50元的为蓝卷每张优惠卷的对应一个反馈积分，该积分由商家通过后台管理系统设计；</div>

            </el-collapse-item>
            <el-collapse-item title="3.谁可以领取优惠卷" name="3">
              <div>一般情况下所有注册过五凤楼订餐系统的用户均可以领取优惠卷，但后台有权限指定某类优惠卷只有vip可以领取；</div>

            </el-collapse-item>
            <el-collapse-item title="4.优惠卷与一般满减可以叠加么" name="4">
              <div>优惠卷的满减信息与一般满减是可以叠加的，两者并不冲突。</div>
            </el-collapse-item>
            <el-collapse-item title="4.使用优惠卷支付相关问题" name="4">
              <div>使用优惠卷券提交的订单，若订单取消后，系统自动返还相应的券；若订单提交且支付成功后申请售后处理，优惠卷不予返还。</div>
            </el-collapse-item>
          </el-collapse>
           <span slot="footer" class="dialog-footer">

             <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
           </span>
</van-popup>				
	</div>
	
</template>

<script>
	const coupon = {
	  available: 1,
	  condition: '无使用门槛\n最多优惠12元',
	  reason: '',
	  value: 150,
	  name: '优惠券名称',
	  startAt: 1489104000,
	  endAt: 1514592000,
	  valueDesc: '1.5',
	  unitDesc: '元',
	  description:"描述信息",
	};
	import { Toast } from 'vant';
	export default {
		 data() {
		    return {
		      chosenCoupon: -1,
		      coupons: [coupon,coupon,coupon,coupon],
		      disabledCoupons: [coupon],
			  flag:false,
			  outdate:"已过期",
			  buttext:"领更多好卷",
			   show: false,
		    };
		  },
		
	  methods: {
	    onClickLeft() {
	      this.$router.go(-1);
	    },
		
		//点击领取更多好卷
		toCouponCenter(index) {
			this.$router.push("/couponCenter");
		},
		
		onExchange(code) {
		  this.coupons.push(coupon);
		
		},
		//点击右上角问号
		showPopup() {
		      this.show = true;
		    },
			
		onClickruleLeft(){
			this.show = false;
		},
		
	  },
	};
</script>

<style scoped>

.couponhead{
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



</style>
