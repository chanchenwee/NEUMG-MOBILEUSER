<template>
	<div  class="hongbaopage">
	 <div class="content">
		<div class="thishead">
			<van-nav-bar class="centerhead" title="积分兑换红包" left-arrow @click-left="onClickLeft">
				<template #right>
					<van-icon name="question-o" size="18" />
				</template>
			</van-nav-bar>

		</div>
		<ScoresHeader :Scores="user.scores"></ScoresHeader>
		
<div class="redpackets">
<template v-for="r in redPackets">
<div data-v-3026bfe6="" data-tab-index="0" data-index="0" class="coupon_item">
	<div data-v-3026bfe6="" :class="Style(r.rpid) ">
		<div data-v-3026bfe6="" data-tab-index="0" data-index="0" class="xcoupon_main">
			<!---->
			<div data-v-3026bfe6="" class="xcoupon_coner col_red">会员专享</div>
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
						<div data-v-3026bfe6="" class="xcoupon_info_date">所需小厨点：{{r.needscore}}点</div>
					</div>
					<div v-if="buttext[r.rpid]" data-v-3026bfe6="" data-isusebtn="1" class="xcoupon_use_btn" @click="exchange($event,r)">兑换</div>
					<p  v-if="!buttext[r.rpid]" class="alreadyhave"></p>
				</div>
				<div data-v-3026bfe6="" data-tab-index="0" data-index="0" class="xcoupon_more_wrapper">
					<div data-v-3026bfe6="" class="xcoupon_more">
						<div data-v-3026bfe6="" class="xcoupon_label">
							<span data-v-3026bfe6="" class="xcoupon_label_more">会员每两周可兑换一次</span></div>
						<div data-v-3026bfe6="" class="icon_arrow small bottom">

						</div>
					</div>
				</div>
			</div>
		</div>
		<!---->
	</div>

			</div>

		</template>
		</div>
	</div>	
		<div class="fixed_btm" style="margin-top: 2rem;">
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
	import { Dialog } from 'vant';
	import { Toast } from 'vant';
	import ScoresHeader from './ScoresHeader.vue';
	let server="http://localhost:8082/";
	let getAll="redpacket/getAll";
	let getMember="member/getMember";
	let insert ="redpacketreceive/insert";
	let updateScores="member/updateScores";
	let getByClientId="redpacketreceive/getByClientId";
	let uodateMemberDetail="memberdetail/insert";
	let getClient="client/getClient";
	let getHistory="memberdetail/getByClientid";//查看兑换记录
	export default {

		data() {
			return {

				recommendList: [1, 2, 3],
				redPackets:[],
				user:"",
				member:"",
				alreadyRedPid:[],//存放已经领取的红包id
				show: false,
				buttext:[],
			};

		},
		components: {
		    [Dialog.Component.name]: Dialog.Component,
			ScoresHeader	
		  },
		created(){
			 this.init();
		},
		methods: {
			//初始化
			init () {
	
			  var userJsonStr = sessionStorage.getItem('user');
			  if (userJsonStr != null && userJsonStr != "") {
			  let user = JSON.parse(userJsonStr);
			  this.axios.get(`${server}${getClient}`, {
			  	params: {
			  		clientid: user.clientid,
			  	}
			  }).then((res) => {
			  	this.user=res.data;
				this.getRPByTime();
			  })			
			  	
			  }
			  this.axios.get(`${server}${getAll}`).then((res) => {
			  
			      this.redPackets = res.data;
			    })
			  
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
			//根据用户是否领取过红包设定红包样式
			 Style(rpid){			 
			   for(let i=0;i<this.alreadyRedPid.length;i++){
			     if(rpid==this.alreadyRedPid[i]){
			       this.buttext[rpid]=false;
			       return "xcoupon type_dong disabled";
			     }
			     
			    
			    }
				this.buttext[rpid]=true;
				return "xcoupon type_dong";
			 },		
			//点击兑换
			exchange(event,item){
			   console.log();
			  if(this.user.type==0){
			    Toast.fail("对不起，您不可兑换，请先开通会员！")
			  }else{
			
			    if(event.target.innerText=="已兑换"){
					return;
			    }else{
			     let needscore=item.needscore;
			     let nowscore=this.user.scores;
			     if(needscore>nowscore){
			      Toast.fail("对不起，您的积分不足，无法兑换");
			     }else{
					 Dialog.confirm({
					   title: '兑换红包',
					   message: "您确定要消耗"+needscore+"积分兑换该红包么?",
					 })
					   .then(() => {
                       let insertmsg={//新增红包兑换记录
                          "clientid":this.user.clientid,
                          "rpid":item.rpid,
                          "createtime":this.getNowFormatDate(),
                       };
                      this.axios.post(`${server}${insert}`,JSON.stringify(insertmsg),{
                                  headers: {
                                    'content-Type':'application/json',
                                  },
                                }).then((res) => {
                        console.log(res.data);
                        if(res.data.insertmsg){
                            this.updateScores(needscore);
                            this.uodateMemberDetail(needscore,item);
                            Toast.success("兑换成功，请到我的优惠卷中查看！");
                            this.init();
                        }else{ 
							Toast.fail("内部错误，兑换失败");}
                      })

                     })
					   .catch(() => {
                        
                     });  
					 
				 }
			     }
			  }
			},
			//兑换结束之后修改会员当前可用积分
			updateScores(costScores){
			  let finalscores=this.user.scores-costScores;
			  console.log("finalscore"+this.user.clientid);
			      this.axios.get(`${server}${updateScores}`,{params:{
			    				 clientid: this.user.clientid,
			             scores:finalscores,
			    	 		}}).then((res) => {
			        this.user.scores=finalscores;
			        console.log(res.data);
			        if(!res.data.updateScores){
						this.$message.error("内部错误，修改会员当前可用积分失败");
						}
			      })
			},
			//兑换成功后生成一条积分变动信息
			uodateMemberDetail(costScores,redpacket){
			  let memberdetail={//新增积分更新记录
			     "clientid":this.user.clientid,
			     "updateamount":costScores*-1,
			     "description":"兑换"+redpacket.rpmoney+"元无门槛红包，消耗"+costScores+"积分",
			     "updatetime":this.getNowFormatDate(),
			  };
			  this.axios.post(`${server}${uodateMemberDetail}`,JSON.stringify(memberdetail),{
			                headers: {
			                  'content-Type':'application/json',
			                },
			              }).then((res) => {
			    if(!res.data.insertmsg){this.$message.error("内部错误，新增积分消费记录失败");
				}
			  })
			
			
			},
			//拿到当前用户两周之内的红包领取信息(id)。用于判断是否更新红包
			getRPByTime(){
			  if(this.user.type==0){//首先判断是否是会员
			    return;
			  }else{//是会员
			    this.axios.get(`${server}${getByClientId}`,{params:{
			    			 clientid: this.user.clientid,
			     		}}).then((res) => {
			      if(res.data.getmsg){
			        this.alreadyRedPid=res.data.rpids;
			        console.log(res.data.rpids);
			
			      }
			
			    })
			  }
			
			
			},
			
			  //  获取当前时间
			    getNowFormatDate: function () {
			        var date = new Date();
			        var seperator1 = "-";
			        var seperator2 = ":";
			        //外国的月份都是从0开始的，所以+1
			        var month = date.getMonth() + 1;
			        var strDate = date.getDate();
			        //1-9月用0补位
			        if(month >=1 && month <=9){
			            month = "0" + month;
			        }
			        //1-9日用0补位
			        if(strDate >=0 && strDate <= 9){
			            strDate = "0" + strDate;
			        }
			        //获取当前时间 yyyy-MM-dd HH:mm:ss
			        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " +date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
			        return currentdate;
			    },
			
			
			
			onClickLeft() {
				this.$router.go("-1");
			},
			toCouponCenter() {
				this.$router.push("coupon/couponcenter");
			},

			toMycoupon() {
				this.$router.push("coupon/mycoupon")
			}
		},
	};
</script>

<style scoped lang="scss">
	@import "../../common/style/redpacket.css";
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
	.hongbaopage{
		background-color: #F7F7F7;

		
	}
	.content{
		padding-bottom: 2rem;
	}
	.redPackets{
		overflow: scroll;
		
	}

	.centerhead {
		font-family: "bodoni mt black";
		//background: linear-gradient(90deg, #eb3c3c, #ff7459);
		box-shadow: 0 0.026667rem 0.066667rem rgba(255, 98, 98, 0.4)
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
	.alreadyhave {
		content: '';
		width: 3rem;
		height: 3rem;
		background-size: 3rem 3rem;
		background-image: url('data:image/png;base64,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') ;
		background-repeat: no-repeat;
		
	
	  }
</style>
