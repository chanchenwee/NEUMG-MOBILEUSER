<template>
	<div>

		<van-nav-bar class="couponhead" title="优惠卷" left-arrow @click-left="onClickLeft" @click-right="showPopup">
			<template #right>
				<van-icon name="question-o" size="18" />
			</template>
		</van-nav-bar>
		<div class="coupon_nav_h5" style="top: 0px;">
			<div data-v-5e4f42cc="" class="coupon_navbar">
				<div data-v-5e4f42cc="" data-index="0" class="coupon_navbar_tab">
					<div data-v-5e4f42cc="" :class="styles[0]" @click=" onChangeTopBar(0,true,false,0,true)">
						<span data-v-5e4f42cc="">待使用</span>
						<span data-v-5e4f42cc="" class="num">({{Rcanusenum}}+{{Ccanusenum}})</span>
					</div>
				</div>
				<!---->
				<div data-v-5e4f42cc="" data-index="2" class="coupon_navbar_tab">
					<div data-v-5e4f42cc="" :class="styles[1]" @click="onChangeTopBar(1,false,false,1,false)">
						<span data-v-5e4f42cc="">已使用</span>
						<span data-v-5e4f42cc="" class="num">({{Rusednum}}+{{Cusednum}})</span>
						<!---->
					</div>
				</div>
				<div data-v-5e4f42cc="" data-index="3" class="coupon_navbar_tab">
					<div data-v-5e4f42cc="" :class="styles[2]" @click="onChangeTopBar(2,false,true,-1,false)">
						<span data-v-5e4f42cc="">已过期</span>
						<span data-v-5e4f42cc="" class="num">({{Routdatenum}}+{{Coutdatenum}})</span>
					</div>
				</div>
			</div>
		</div>

		<van-dropdown-menu active-color="#ee0a24">
			<van-dropdown-item v-model="value1" :options="option1" @click.native="onClickOrder(value1)" />
			<van-dropdown-item v-model="value2" :options="option2" @click.native="getMostFavor(value2)" />
		</van-dropdown-menu>

		<div class="redpackets">
			<template v-for="r in redPackets">
				<div data-v-3026bfe6="" data-tab-index="0" data-index="0" class="coupon_item">
					<div data-v-3026bfe6="" :class="redpacketclass ">
						<div data-v-3026bfe6="" data-tab-index="0" data-index="0" class="xcoupon_main">
							<!---->

							<div data-v-3026bfe6="" class="xcoupon_coner col_red">会员专享</div>
							<div data-v-3026bfe6="" v-if="showtag" class="xcoupon_right_tag expired"></div>
							<!---->
							<div data-v-3026bfe6="" class="xcoupon_price">
								<div data-v-3026bfe6="" class="single_range">
									<div data-v-3026bfe6=""><span data-v-3026bfe6="" class="symbol_unit">¥</span> <span data-v-3026bfe6="" class="price vat">{{r.rpmoney}}</span></div>
									<div data-v-3026bfe6="" class="p mt10">满任意金额可用</div>
								</div>
							</div>
							<div data-v-3026bfe6="" class="xcoupon_msg">
								<div data-v-3026bfe6="" class="xcoupon_condition line2 pr60"><span data-v-3026bfe6="" class="xcoupon_tag"><span
										 data-v-3026bfe6="" class="xcoupon_tag_text">五凤楼</span></span> <span data-v-3026bfe6="" class="vam">可用支付任何订单</span></div>
								<div data-v-3026bfe6="" class="xcoupon_instruction">
									<div data-v-3026bfe6="" class="xcoupon_info">
										<div data-v-3026bfe6="" class="xcoupon_info_platform"></div>
										<div data-v-3026bfe6="" class="xcoupon_info_date" style="font-size: 12px;">{{r.rpbegtime}}-{{r.rpendtime}}</div>
									</div>
									<div data-v-3026bfe6="" data-isusebtn="1" v-if="showbut" class="xcoupon_use_btn" style="margin-right: 1rem; line-height: 2.3em;	height: 2rem;max-width: 4.6rem;font-size: 13px;"
									 @click="useCoupon">使用</div>

								</div>
								<div data-v-3026bfe6="" data-tab-index="0" data-index="0" class="xcoupon_more_wrapper">
									<div data-v-3026bfe6="" class="xcoupon_more">
										<div data-v-3026bfe6="" class="xcoupon_label">
											<span data-v-3026bfe6="" class="xcoupon_label_more">会员每两周可兑换一次</span></div>

									</div>
								</div>
							</div>
						</div>
						<!---->
					</div>

				</div>

			</template>
		</div>




		<div class="coupons">
			<template v-for="coupon in myCoupons">
				<div :class="couponclass">
					<div class="van-coupon__content">
						<div class="van-coupon__head">
							<h2 class="van-coupon__amount">{{coupon.couponstatus}}<span>元</span></h2>
							<p class="van-coupon__condition">{{coupon.couponname}}
							</p>
						</div>
						<div class="van-coupon__body">
							<p class="van-coupon__name">五凤楼美食券</p>
							<p class="van-coupon__valid">{{coupon.couponbegtime}}-{{coupon.couponendtime}}</p>
							<div data-v-3026bfe6="" v-if="showtag" class="xcoupon_right_tag expired"></div>
							<div role="checkbox" tabindex="0" aria-checked="false" class="van-checkbox van-coupon__corner" size="18">
								<van-button v-if="showbut" type="danger" round class="but" @click="useCoupon">使用</van-button>

							</div>
						</div>
					</div>
					<van-collapse v-model="activeName[coupon.couponid]" accordion>
						<van-collapse-item title="描述信息">{{coupon.coupondesc}}</van-collapse-item>

					</van-collapse>
				</div>
			</template>
		</div>


		<van-empty v-if="Nocoupon" description="哦噢~小主一张券都没有，快去抢几张~">
			<van-button round type="danger" class="bottom-button" @click="toCouponCenter">
				去领卷中心
			</van-button>
		</van-empty>
		<van-popup v-model="show" position="top" :style="{ height: '45%' }">
			<van-nav-bar class="couponhead" title="优惠卷" left-arrow @click-left="onClickruleLeft">

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
	let server = "http://localhost:8082/";
	let getMycoupon = "couponreceive/getByClientIdAndStatus";
	let getMember = "member/getMember";
	let getCouponByid = "coupon/getCouponByid";
	let getRedPackets = "redpacketreceive/getByClientIdAndStatus";
	let getRedPByid = "redpacket/getRedPByid";
	let CgetMostFavor = "couponreceive/getMostFavor";
	let CgetLeastFavor = "couponreceive/getLeastFavor";
	let CgetAlmostOutdate = "couponreceive/getAlmostOutdate";
	let CgetNewHave = "couponreceive/getNewHave";
	let RgetMostFavor = "redpacketreceive/getMostFavor";
	let RgetLeastFavor = "redpacketreceive/getLeastFavor";
	let RgetAlmostOutdate = "redpacketreceive/getAlmostOutdate";
	let RgetNewHave = "redpacketreceive/getNewHave";

	import {
		Toast
	} from 'vant';
	export default {
		data() {
			return {
				styles: ["coupon_navbar_text", "coupon_navbar_text", "coupon_navbar_text"], //存放顶部栏点击时变亮与否状态			
				show: false,
				showbut: true, //按钮的显示与否
				showtag: false, //已过期的显示
				value1: 0,
				value2: 'a',
				activeName: [],
				option1: [{
						text: '状态',
						value: 0
					},
					{
						text: '新到账',
						value: 1
					},
					{
						text: '快过期',
						value: 2
					},
				],
				option2: [{
						text: '优惠力度',
						value: 'a'
					},
					{
						text: '从高到低',
						value: 'b'
					},
					{
						text: '从低到高',
						value: 'c'
					},
				],
				user: "",
				member: "",
				myCoupons: [], //普通优惠卷信息
				tempCoupons: [], //临时存放优惠卷信息
				redPackets: [], //会员红包信息
				couponclass: "van-coupon",
				redpacketclass: "coupon type_dong", //红包样式需要根据状态来改变，优惠卷也一样
				Ccanusenum: 0, //优惠卷数量
				Coutdatenum: 0,
				Cusednum: 0,
				Rcanusenum: 0, //红包数量
				Routdatenum: 0,
				Rusednum: 0,
				CRcanusenum: 0, //优惠卷红包总数量
				CRoutdatenum: 0,
				CRusednum: 0,
				Nocoupon: false,

			};
		},
		created() {
			this.init();
			this.getEverStatusNum();
			this.checkisZero(0);

		},
		methods: {

			init() {
				var userJsonStr = sessionStorage.getItem('user');
				this.user = JSON.parse(userJsonStr);
				this.getCoupons(`${getMycoupon}`, 0);
				if (this.checkMember()) {
					this.getRedPackets(`${getRedPackets}`, 0);
				}
				this.changeClass(true);
				this.styles[0] = "coupon_navbar_text cur";

			},
			//清空数组
			resetArray() {
				this.myCoupons = [];
				this.redPackets = [];
			},
			//点击待使用、已使用、已过期的方法封装
			onChangeTopBar(i, showbut, showtag, status, text) {
				this.resetcolor();
				this.styles[i] = "coupon_navbar_text cur";
				this.showbut = showbut;
				this.showtag = showtag;
				this.resetArray();
				this.getCoupons(`${getMycoupon}`, status);
				this.changeClass(text);
				if (this.checkMember()) {
					this.getRedPackets(`${getRedPackets}`, status);
				}
				this.Nocoupon = false;
				this.checkisZero(status);
			},

			//点击即将过期新到账		
			onClickOrder(num) {
				let couponurl = `${CgetAlmostOutdate}`;
				let redpurl = `${RgetAlmostOutdate}`;
				if (num == 1) { //新到账
					couponurl = `${CgetNewHave}`;
					redpurl = `${RgetNewHave}`;
				}
				this.handelOrder(couponurl, redpurl);
			},

			//点击最优惠排序
			getMostFavor(value) {
				let couponurl = `${CgetMostFavor}`;
				let redpurl = `${RgetMostFavor}`;
				if (value == "c") { //从低到高
					couponurl = `${CgetLeastFavor}`;
					redpurl = `${RgetLeastFavor}`;
				}
				this.handelOrder(couponurl, redpurl);
			},

			//点击所有排序功能的辅助方法
			handelOrder(couponurl, redpurl) {
				this.resetArray();
				this.changeClass(true);
				this.getCoupons(couponurl, 0);
				if (this.checkMember()) {
					this.getRedPackets(redpurl, 0);
				}
				this.Nocoupon = false;
				this.checkisZero(0);
				this.resetcolor();
				this.styles[0] = "coupon_navbar_text cur";
			},

			//修改优惠卷和红包样式
			changeClass(text) {
				if (text == true) {
					this.couponclass = "van-coupon"
					this.redpacketclass = "xcoupon type_dong"

				} else {
					this.couponclass = "thisvan-coupon van-coupon--disabled"
					this.redpacketclass = "xcoupon type_dong disabled"
				}
			},
			//点击顶部可使用已过期状态切换
			resetcolor() {
				for (let i = 0; i < 3; i++) {
					this.styles[i] = "coupon_navbar_text";

				}
			},
			//点击使用优惠卷
			useCoupon() {
				this.$router.push("/");
			},
			//初始化拿到各种状态的红包和优惠卷的数据
			getEverStatusNum() {
				for (let i = -1; i < 2; i++) {
					this.getCouponStatusNum(i);
					if (this.checkMember()) {
						this.getRedStatusNum(i);

					}
				}
			},

			//拿到各种状态优惠卷数量
			getCouponStatusNum(status) {
				this.axios.get(`${server}${getMycoupon}`, {
					params: {
						clientid: this.user.clientid,
						status: status,
					}
				}).then((res) => {
					if (res.data.getmsg) {
						if (status == 0) {
							this.Ccanusenum = res.data.couponReceives.length;
							console.log("this.Ccanusenum中Rcanuse")
							console.log(this.Rcanusenum);
						} else if (status == 1) {
							this.Cusednum = res.data.couponReceives.length;
						} else {
							this.Coutdatenum = res.data.couponReceives.length;
						}
					}

				})

			},
			//拿到各种状态红包数量
			getRedStatusNum(status) {
				this.axios.get(`${server}${getRedPackets}`, {
					params: {
						clientid: this.user.clientid,
						status: status,
					}
				}).then((res) => {
					if (res.data.getmsg) {
						if (status == 0) {
							this.Rcanusenum = res.data.redPacketReceives.length;
						} else if (status == 1) {
							this.Rusednum += res.data.redPacketReceives.length;
						} else {
							this.Routdatenum += res.data.redPacketReceives.length;
						}
					}

				})

			},
			//判断当前可用的红包和优惠卷数量是否全为0 ，为0则跳转
			checkisZero(status) {
				this.axios.get(`${server}${getMycoupon}`, {
					params: {
						clientid: this.user.clientid,
						status: status,
					}
				}).then((res) => {
					console.log("wobeo执行了")
					console.log(res.data);
					if (!res.data.getmsg) {
						console.log("优惠卷为空")
						if (this.checkMember()) { //是会员继续判断是否有红包
							this.axios.get(`${server}${getRedPackets}`, {
								params: {
									clientid: this.user.clientid,
									status: status,
								}
							}).then((res) => {
								if (!res.data.getmsg) {
									console.log("红包为空")
								
									this.Nocoupon = true;
								}

							})
						}
					}

				})

			},

			//拿到当前用户的所有优惠卷信息
			getCoupons: async function(geturl, status) {
				this.axios.get(`${server}${geturl}`, {
					params: {
						clientid: this.user.clientid,
						status: status,
					}
				}).then(async (res) => {
					if (res.data.getmsg) {
						this.tempCoupons = res.data.couponReceives;
						for (let i = 0; i < this.tempCoupons.length; i++) {
							let eachmsg = this.tempCoupons[i];
							await this.axios.get(`${server}${getCouponByid}`, {
								params: {
									couponid: eachmsg.couponid,
								}
							}).then((r) => {
								if (r.data.getmsg) {
									let coupon = r.data.coupon;
									coupon.couponbegtime = this.handleTime(coupon.couponbegtime);
									coupon.couponendtime = this.handleTime(coupon.couponendtime);
									coupon.couponstatus = this.handleMoney(coupon.couponname); //分隔出满减金额
									this.myCoupons.push(coupon);
								} else {
									this.$message.error("服务错误，获取优惠卷失败！");
								}
							})

						}

					}

				})

			},
			//获取当前用户所有红包信息
			getRedPackets: async function(geturl, status) {
				this.axios.get(`${server}${geturl}`, {
					params: {
						clientid: this.user.clientid,
						status: status,
					}
				}).then(async (res) => {
					console.log("red")
					console.log(res.data);
					if (res.data.getmsg) {
						for (let i = 0; i < res.data.redPacketReceives.length; i++) {
							let eachmsg = res.data.redPacketReceives[i];
							await this.axios.get(`${server}${getRedPByid}`, {
								params: {
									rpid: eachmsg.rpid,
								}
							}).then(r => {
								if (r.data.getmsg) {
									let redPacket = r.data.redPacket;
									redPacket.rpbegtime = this.handleTime(eachmsg.createtime);
									redPacket.rpendtime = this.AddDays(redPacket.rpbegtime, 7); //红包领取时间加7天为有效日期范围
									this.redPackets.push(redPacket);
								} else {
									this.$message.error("服务错误，获取红包失败！");
								}
							})
						}

					}

				})
			},

			//当前时间加days,用于显示红包的有效期
			AddDays(date, days) {
				var nd = new Date(date);
				nd = nd.valueOf();
				nd = nd + days * 24 * 60 * 60 * 1000;
				nd = new Date(nd);
				var y = nd.getFullYear();
				var m = nd.getMonth() + 1;
				var d = nd.getDate();
				if (m <= 9) m = "0" + m;
				if (d <= 9) d = "0" + d;
				var cdate = y + "." + m + "." + d;
				return cdate;
			},



			//截取时间保留到日显示
			handleTime(t) {
				var timeArr = t.replace(" ", ":").replace(/\:/g, "-").split("-");
				var time = timeArr[0] + '.' + timeArr[1] + '.' + timeArr[2];
				return time;
			},
			//截取满减金额
			handleMoney(str) {
				var numArr = str.match(/\d+/g); //分割出数字
				return numArr[1];
			},


			//验证身份
			checkMember() {
				return sessionStorage.getItem('isVip');
			},


			onClickLeft() {
				this.$router.go(-1);
			},

			//点击领取更多好卷
			toCouponCenter(index) {
				this.$router.push("/coupon/couponcenter");
			},

			onExchange(code) {
				this.coupons.push(coupon);

			},
			//点击右上角问号
			showPopup() {
				this.show = true;
			},

			onClickruleLeft() {
				this.show = false;
			},

		},
	};
</script>

<style scoped>
	@import url("../../common/style/mycoupon.css");
	@import "../../common/style/redpacket.css";

	.couponhead {
		font-family: "bodoni mt black";
		background: linear-gradient(90deg, #eb3c3c, #ff7459);
		box-shadow: 0 0.026667rem 0.066667rem rgba(255, 98, 98, 0.4)
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

	.but {


		max-height: 2rem;
		max-width: 4.6rem;
		font-size: 13px;
		font-family: "华文新宋";
		text-align: center;

	}
	.thisvan-coupon {
	    margin: 0 12px 12px;
	    overflow: hidden;
	  
	    border-radius: 8px;
	    box-shadow: 0 0 4px rgba(0,0,0,.1);
	}
	
</style>
