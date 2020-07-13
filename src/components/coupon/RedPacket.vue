<template>
	<div style="background-color: #F7F7F7;">

<div class="thishead">
		<van-nav-bar class="centerhead" title="积分兑换红包"  left-arrow   @click-left="onClickLeft"
			>
		  <template #right>
		   <van-icon name="question-o" size="18"/>
		  </template>
		</van-nav-bar>
	
	</div>
	
	<div class="red_packet_head"><div class="rules">使用规则</div>
	 <p class="balance_text">小厨点余额</p> <p class="balance_num">
	 <span class="cash_symbol">¥ </span>50</p> <!----></div>
	
	


	<template v-for="r in redpackets">
		<div data-v-3026bfe6="" data-tab-index="0" data-index="0" class="coupon_item">
			<div data-v-3026bfe6="" class="xcoupon type_dong">
				<div data-v-3026bfe6="" data-tab-index="0" data-index="0" class="xcoupon_main"><!----> 
				<div data-v-3026bfe6="" class="xcoupon_coner col_red">无门槛</div> <!---->
				 <div data-v-3026bfe6="" class="xcoupon_price"><div data-v-3026bfe6="" class="single_range">
				 <div data-v-3026bfe6=""><span data-v-3026bfe6="" class="symbol_unit">¥</span> <span data-v-3026bfe6="" class="price vat">20</span></div> 
				 <div data-v-3026bfe6="" class="p mt10">满任意金额可用</div></div></div> 
				 <div data-v-3026bfe6="" class="xcoupon_msg">
					 <div data-v-3026bfe6="" class="xcoupon_condition line2 pr60"><span data-v-3026bfe6="" class="xcoupon_tag"><span data-v-3026bfe6="" class="xcoupon_tag_text">五凤楼</span></span> <span data-v-3026bfe6="" class="vam">可用支付任何订单</span></div>
					  <div data-v-3026bfe6="" class="xcoupon_instruction"><div data-v-3026bfe6="" class="xcoupon_info">
					  <div data-v-3026bfe6="" class="xcoupon_info_platform"></div> 
					  <div data-v-3026bfe6="" class="xcoupon_info_date">2020.07.01-2020.07.15</div></div> 
					  <div data-v-3026bfe6="" data-isusebtn="1" class="xcoupon_use_btn">兑换</div></div> 
					  <div data-v-3026bfe6="" data-tab-index="0" data-index="0" class="xcoupon_more_wrapper">
						  <div data-v-3026bfe6="" class="xcoupon_more"><div data-v-3026bfe6="" class="xcoupon_label">
						  <span data-v-3026bfe6="" class="xcoupon_label_more">详细信息</span></div>
						   <div data-v-3026bfe6="" class="icon_arrow small bottom">
							   
						   </div></div></div></div></div> <!----></div> 
						  
						   </div>
		
	</template>
	<div class="fixed_btm">
	<div class="fixed_btm_item">
	<div class="fixed_btm_item_icon icon_get"></div>
	 <div class="fixed_btm_item_text" @click="toCouponCenter">领优惠券</div>
	 </div> 
	 <div class="fixed_btm_item">
		 <div class="fixed_btm_item_icon icon_my">		 
		 </div> 
		 <div class="fixed_btm_item_text cur" @click="toMycoupon">我的优惠券</div>
		 </div>
		 
		 </div>
	</div>
</template>

<script>
	export default {
	
		 data() {
		    return {
				redpackets:[1,2,3],
				recommendList:[1,2,3]
				
			};
			
		  },
		
	  methods: {
	    onClickLeft() {
	      this.$router.go("-1");
	    },
		toCouponCenter(){
			this.$router.push("coupon/couponcenter");
		},
		
		toMycoupon(){
			this.$router.push("coupon/mycoupon")
		}
	  },
	};
</script>

<style  scoped lang="scss">
	@import "../../common/style/redpacket.css";

.centerhead{
		font-family: "bodoni mt black";
		//background: linear-gradient(90deg, #eb3c3c, #ff7459);
		box-shadow: 0 0.026667rem 0.066667rem rgba(255,98,98,0.4)
		
	}
/deep/.van-nav-bar__title {
		    max-width: 60%;
		    margin: 0 auto;
		    color: #000000;
		    font-weight: bold;
			font-family: "YouYuan";
		    font-size: 17px;
		}
	/deep/.van-nav-bar .van-icon {	
		color: #000000;
		}



.red_packet_head {
    height: 29.33333vw;
    margin: 10px;
	margin-bottom: 2rem;
    background: #eb3c3c;
    background-image: -webkit-gradient(linear,right top,left top,from(#ff4142),to(#ff4b2b));
    background-image: -webkit-linear-gradient(right,#ff4142,#ff4b2b);
    background-image: linear-gradient(270deg,#ff4142,#ff4b2b);
    position: relative;
    border-radius: 5px;
    box-shadow: 1px 1px 5px #ff7459;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
}
.red_packet_head .rules {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    font-size: 12px;
}
a, div, header, span {
    -webkit-tap-highlight-color: rgba(255,255,255,0);
}
.red_packet_head .balance_text {
    color: #fff;
    font-size: 14px;
}
.red_packet_head .balance_num {
    color: #fff;
    font-size: 45px;
    line-height: 1;
    vertical-align: bottom;
    font-family: JDZhengHT-Regular;
}


.fixed_btm {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 101;
    height: 2.1rem;
    display: flex;
    text-align: center;
    padding: 0.15rem 0;
    background-color: #ffffff;
    box-shadow: 0 0 0.5rem #e4e4e4;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}

.fixed_btm_item {
    flex: 1;
    background-color: #fff;
}
.fixed_btm_item .icon_get {
    background-image: url(https://img14.360buyimg.com/jdphoto/s40x40_jfs/t1/18563/1/5606/817/5c4033e6Ef62bd359/c363d0481070544f.png);
    background-size: 100%;
    background-repeat: no-repeat;
}
.fixed_btm_item_icon {
    display: block;
    margin: auto;
    width: 1rem;
    height: 1rem;
}
.fixed_btm_item_text {
    margin-top: 0.25rem;
    width: 100%;
    color: #666666;
    line-height: 1;
    font-size: 12px;
}
.fixed_btm_item {
    flex: 1;
    background-color: #fff;
}
.fixed_btm_item .icon_my {
    background-image: url(https://img13.360buyimg.com/jdphoto/s37x36_jfs/t1/22441/38/5646/893/5c4033d7Ea10bed69/773cd74492c23513.png);
    background-size: 100%;
    background-repeat: no-repeat;
}
.fixed_btm_item_icon {
    display: block;
    margin: auto;
    width: 1rem;
    height: 1rem;
}
.fixed_btm_item_text.cur {
    color: #e93b3d;
}
.fixed_btm_item_text {
    margin-top: 0.25rem;
    width: 100%;
    color: #666666;
    line-height: 1;
    font-size: 12px;
}
</style>
