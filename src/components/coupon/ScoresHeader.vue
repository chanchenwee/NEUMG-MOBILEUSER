<template>
	<div>
		<div class="red_packet_head">
			<div class="rules" @click="OnclickRule">使用规则</div>
			<p class="balance_text">小厨点余额</p>
			<p class="balance_num">
				<span class="cash_symbol">¥ </span>{{Scores}}</p>
			<!---->
		</div>
	<van-popup v-model="show"position="top" :style="{ height: '45%' }">
			<van-nav-bar  class="couponhead"title="小厨点使用说明" left-arrow  @click-left="onClickruleLeft" >
			 
			</van-nav-bar>
		     <el-collapse style="margin-left: 15px;">
		            <el-collapse-item title="1.积分和红包的有效期" name="1">
		
		              <div>积分的有效期最长2年，最短1年，即从获得积分开始至次年年底，逾期自动作废（如若交易在使用积分有效期之外发生退款，该部分积分不予退还；本页面红包自领取之日起一周内有效。</div>
		            </el-collapse-item>
		            <el-collapse-item title="2. 积分的兑换比例" name="2">
		              <div>积分和人民币兑换比例是1:1，即1个积分相当于人民币1元。</div>
		
		            </el-collapse-item>
		            <el-collapse-item title="3. 积分如何获取" name="3">
		              <div>用户在五凤楼进行点餐、点餐后评价、晒单、交易满意度、移动端下单、指定区域在线支付等活动都可以获得积分</div>
		
		            </el-collapse-item>
		            <el-collapse-item title="4. 兑换的红包怎么使用" name="4">
		              <div>本页面兑换的全为无门槛红包,将会以优惠卷的形式发放到您的账户中,你可以到优惠卷中心查看，并在付款时可以抵扣相应金额。</div>
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
	export default {

		data() {
			return {
				user:"",
				member:"",	
				show: false,

			};

		},
			props: {
				Scores: {
					
					default: ''
				}
			},
		created(){
			 this.init();
		},
		methods: {
			//初始化
			init () {
			 var userJsonStr = sessionStorage.getItem('user');
			 if(userJsonStr!=null&&userJsonStr!=""){
			 	this.user = JSON.parse(userJsonStr); 
				
			 }
			  

			  
			},
			//验证身份
			checkMember(){
			   return  sessionStorage.getItem('isVip');
			},
			//点击使用规则
			OnclickRule(){
				this.show=true;
				
			},
			onClickruleLeft(){
				this.show = false;
			},
			
		},
	};
</script>


<style scoped lang="scss">
	@import "../../common/style/redpacket.css";
	.red_packet_head {
		height: 29.33333vw;
		margin: 10px;
		margin-bottom: 1rem;
		background: #eb3c3c;
		background-image: -webkit-gradient(linear, right top, left top, from(#ff4142), to(#ff4b2b));
		background-image: -webkit-linear-gradient(right, #ff4142, #ff4b2b);
		background-image: linear-gradient(270deg, #ff4142, #ff4b2b);
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
	
	a,
	div,
	header,
	span {
		-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
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
</style>
