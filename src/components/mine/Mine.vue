<template>
	<div>
		<div class="user-box">
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<section class="user-page">
					<div class="user-info">
						<div class="info">
						<van-image round :src=userImg />
							
							<div style="margin-left: 0.8rem;">
								<p></p>
								<span v-if="isLogin" class="name">{{userInfo.username}}</span>
								<span  v-if="!isLogin" class="name" @click="tologin()">点击登录</span>
								<van-tag round type="danger">{{viplevel}}</van-tag>
								
							</div>
							<router-link to="./setting" class="account-management">
								<van-icon class="kefu" name="service" />
							</router-link>
							<router-link to="./setting" class="account-management1">
								<i class="iconfont icon-shezhi"></i>
							</router-link>

						</div>

					</div>
					<div class="user-menu">
						<router-link tag="div" to="./order-list?orderType=2" class="menu-item">
							<van-icon class="icons" name="star-o" />
							<span>收藏</span>
						</router-link>
						<router-link tag="div" to="./order-list?orderType=3" class="menu-item">
							<van-icon class="icons" name="comment-o" />
							<span>评价</span>
						</router-link>
						<router-link tag="div" to="./order-list?orderType=4" class="menu-item">
							<van-icon class="icons" name="clock-o" />
							<span>足迹</span>
						</router-link>
						<router-link tag="div" to="./coupon/vipcenter" class="menu-item">
							<van-icon class="icons" name="coupon-o" />
							<span>红包</span>
						</router-link>
					</div>

					<div class="user-menu1">
						<router-link tag="div" to="./order-list?orderType=1" class="menu-item">
							<i class="iconfont icon-icon1"></i>
							<span>我的订单</span>
						</router-link>
						<router-link tag="div" to="./order-list?orderType=2" class="menu-item">
							<i class="iconfont icon-daifukuan1"></i>
							<span>待付款</span>
						</router-link>
						<router-link tag="div" to="./order-list?orderType=3" class="menu-item">
							<i class="iconfont icon-daipingjia"></i>
							<span>待评价</span>
						</router-link>
						<router-link tag="div" to="./order-list?orderType=3" class="menu-item">
							<i class="iconfont icon-gouwuche"></i>
							<span>购物车</span>
						</router-link>
						<router-link tag="div" to="./order-list?orderType=4" class="menu-item">
							<i class="iconfont icon-money"></i>
							<span>退款/售后</span>
						</router-link>
					</div>
					<MineCoupon></MineCoupon>
					<van-notice-bar left-icon="volume-o" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
					<img class="eventimg" src="../../../public/imgs/swipe/slide-1.jpg" />

					<loading v-show="isLoading"></loading>
					<div v-show="!isLoading">
						<p class="recommend-title">为你推荐</p>
						<div class="recommend-list">
							<div class="recommend-item" v-for="(item,index) in recommendList" @click="productDetail(index)">
								<img :src="item.imageHost+item.mainImage" v-if="item.imageHost && item.mainImage" />
								<img src="../../../public/imgs/mine/product_default.jpg" v-else />
								<p>{{item.name}}</p>
								<i>￥ {{item.price}}</i>
							</div>
						</div>
					</div>
				</section>
			</van-pull-refresh>
		</div>

	</div>
</template>

<script>
	let imgserver = "http://localhost:8082/res/";
	let server="http://localhost:8082/";

	let getMember="member/getMember";
	import loading from '../../components/common/loading'
	import MineCoupon from './MineCoupon.vue'
    export default {
        data() {
            return {
                userInfo:"",
                recommendList: [1,2,3,4],
                followCount: 0,
                footCount: 0,
                isLoading: true,
				loading: false,
				finished: false,
				refreshing: false,
				isLogin:false,
				userImg:"//img11.360buyimg.com/jdphoto/s120x122_jfs/t5683/191/7076936752/5123/834e5571/596dd62bN7a8affc5.png",
				viplevel:"普通用户",
				member:"",
				
			}
        },
        computed: {
            // ...mapState({
            //     followList: state => state.followList
            // })
        },
        
        created() {
             this.init();
        },
        mounted() {
            // this.followCount = this.followList.length
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this.isLoading = false
                },500)
            })
        },
        methods: {
			//初始化
			init(){
				var userJsonStr = sessionStorage.getItem('user');				
				if(userJsonStr!=null&&userJsonStr!=""){
					this.userInfo = JSON.parse(userJsonStr);
					if(this.userInfo!=""){
						this.isLogin=true;
						this.userImg=`${imgserver}`+this.userInfo.icon;				
						this.getMember();
					
							
					}else{
						this.isLogin=false;
					}
				}		
			},
			
			//验证身份
			checkMember(){
			   return  sessionStorage.getItem('isVip');
			},
			
			//判断会员等级的方法
			checkviplevel(subscores){
			  if(subscores<=500){
			    return "黄金会员"
			  }
			  else if(500<subscores<1000){
			    return "白金会员";
			  }else {
			     return "钻石会员";
			  }
			
			},
			//拿到会员信息
			getMember(){
				if(this.userInfo.type==1){
				this.axios.get(`${server}${getMember}`,{params:{
							 clientid: this.userInfo.clientid,
				 		}}).then((res) => {
				  console.log(res.data);
				  if(res.data.getMember=="success"){
				     var timeArr = res.data.member.certificationdate.replace(" ", ":").replace(/\:/g, "-").split("-");
				     var time = timeArr[0]+'-'+timeArr[1]+'-'+timeArr[2];
				     this.member=res.data.member;
				     this.member.certificationdate=time;
				     this.viplevel=this.checkviplevel(this.member.accumulatescores);
				  }else{
					  this.$message.error("参数错误，会员信息获取失败")
				  }
				})	
			 }else{
				 
			 }	
			},		
			
            getRecommendList() {
                let params = {
                    keyword: '1',
                    pageNum: 1,
                    pageSize: 6,
                    orderBy: 'default'
                }
                productListKeyword(params).then((res) => {
                    this.recommendList = res.data.list
                })
            },
            productDetail(index) {
                let footprintList = getStore('footprintList')
                footprintList.unshift(this.recommendList[index])
                this.RECORE_FOOT(dedupeObject(footprintList))
                this.$router.push('./product/' + this.recommendList[index].id)
            },
            goBack() {
                this.$router.go(-1)
            },
			 onLoad() {
			      setTimeout(() => {
			        if (this.refreshing) {
			       
			          this.refreshing = false;
			        }
			        this.loading = false;		
			          this.finished = true;
			      }, 1000);
			    },
			onRefresh() {
			      // 清空列表数据
			      this.finished = false;
			
			      // 重新加载数据
			      // 将 loading 设置为 true，表示处于加载状态
			      this.loading = true;
			      this.onLoad();
			    },
				//跳转到登录页面
				tologin(){
					this.$router.push("/login");
				},
        },

		
        components: {
            // navBar,
            loading,
			MineCoupon
        }
    }
</script>

<style lang="scss" type="text/css">
	@import '../../common/style/mixin';


	.user-box {
		background: #F7F7F7;
		max-height: 50rem;
		overflow-y: scroll;

		.user-head {
			@include fj;
			width: 100%;
			height: 2.8rem;
			padding: 0 20px;
			line-height: 2.8rem;
			font-size: 16px;
			@include boxSizing;
			border-bottom: 1px solid #dcdcdc;

			.iconfont {
				font-size: 20px;
			}
		}

		.user-info {
			width: 100%;
			//margin: 0rem 3%;
			height: 5rem;
			// background: linear-gradient(90deg, #eb3c3c, #ff7459);
			background: rgb(231, 218, 25);
			box-shadow: 0 2px 5px rgba(255, 98, 98, .4);

			//@include borderRadius(7px);
			.info {
				position: relative;
				display: flex;
				width: 100%;
				height: 100%;
				padding: 0.5rem 0.6rem;
				@include boxSizing;

				img {
					width: 4rem;
					height: 4rem;
				}

				div {
					display: flex;
					flex-direction: column;
					margin-left: 5px;
					line-height: 40px;
					font-size: 28px;
					color: #fff;

					.name {
						color: black;
						font-size: 1.1rem;

						font-weight: 550;
					}

					span {
						&:nth-child(1) {
							color: #999;
							font-size: 26px;
						}
					}
				}

				.account-management {
					position: absolute;
					top: 0.8rem;
					right: 0.1rem;
					font-size: 16px;
					color: rgba(76, 0, 0, .7);

					.iconfont {
						padding-right: 10px;
						font-size: 18px;
						color: rgba(76, 0, 0, .7);
					}
				}

				.account-management1 {
					position: absolute;
					top: 0.8rem;
					right: 1.7rem;
					font-size: 16px;
					color: rgba(76, 0, 0, .7);

					.iconfont {
						padding-right: 10px;
						font-size: 18px;
						color: rgba(76, 0, 0, .7);
					}
				}

				.kefu {
					font-size: 19px;
					font-weight: bold;
				}

			}
		}

		.topmenu {
			min-width: 100%;
			font-size: 20px;
			background: linear-gradient(90deg, #eb3c3c, #ff7459);
			display: inline;
			line-height: 20px;

		}

		.topicon {
			padding-inline-start: 3.5rem;
		}

		.user-menu {

			display: flex;
			justify-content: space-around;
			width: 100%;
			height: 4.5rem;
			background: rgb(231, 218, 25);

			// background: linear-gradient(90deg, #eb3c3c, #ff7459);
			.menu-item {
				display: flex;
				flex-direction: column;
				flex: 1;
				height: 4rem;
				text-align: center;

				.iconfont {
					font-size: 1.8rem;
					color: #DD9E58;

					&.icon-money {
						font-size: 1.4rem;
						padding-top: 6px;
					}

					&.icon-icon1 {
						@extend .icon-money;
						color: $red;
					}
				}

				span {
					padding-top: 10px;
					font-size: 0.8rem;
					color: #000;
				}
			}

			.icons {
				font-size: 25px;
				font-weight: 800;
			}
		}

		.user-menu1 {

			display: flex;
			justify-content: space-around;
			width: 100%;
			height: 5rem;
			background: #fff;
			margin-top: 0.6rem;
			padding-top: 1rem;

			.menu-item {
				display: flex;
				flex-direction: column;
				flex: 1;
				height: 4rem;
				text-align: center;

				.iconfont {
					font-size: 1.8rem;
					color: #DD9E58;

					&.icon-money {
						font-size: 1.4rem;
						padding-top: 6px;
					}

					&.icon-icon1 {
						@extend .icon-money;
						color: $red;
					}
				}

				span {
					padding-top: 10px;
					font-size: 0.8rem;
					color: #000;
				}
			}

			.icons {
				font-size: 25px;
				font-weight: 800;
			}
		}


		.user-fork {
			margin: 15px 0;
			@extend .user-menu;

			.fork-item {
				display: flex;
				flex-direction: column;
				flex: 1;
				height: 100px;
				margin: 30px 0;
				text-align: center;

				i {
					font-style: normal;
					font-weight: bold;
					padding: 10px 0;
					font-size: 17px;
				}
			}
		}

		.user-forks {
			//margin: 0.5rem 0;
			margin-bottom: 0.5rem;
			background: #fff;
			@extend .user-menu;

			.fork-items {
				display: flex;
				flex-direction: column;
				flex: 1;
				height: 2rem;
				margin: 0.2rem 0;
				text-align: center;

				i {
					font-style: normal;
					font-weight: bold;
					padding: 2px 0;
					font-size: 28px;
				}
			}
		}

		.recommend-title {
			width: 100%;
			height: 2rem;
			padding-left: 20px;
			line-height: 2rem;
			background: #fff;
			@include boxSizing;
		}

		.recommend-list {
			display: flex;
			flex-shrink: 0;
			flex-wrap: wrap;
			width: 100%;
			margin-top: 0.5rem;
			padding-bottom: 150px;
			@include boxSizing;
			background: #fff;

			.recommend-item {
				display: flex;
				flex-direction: column;
				width: 50%;
				padding: 20px;
				@include boxSizing;
				border-bottom: 1px solid #dcdcdc;

				&:nth-child(2n-1) {
					border-right: 1px solid #dcdcdc;
				}

				img {
					width: 100%;
					height: 8rem;
					margin: 0 auto;
				}

				p {
					height: 1rem;
					// padding: 20px 0;
					font-size: 15px;
					line-height: 40px;
					color: #333;
					overflow: hidden;
				}

				i {
					font-style: normal;
					font-size: 20px;
					color: $red;
				}
			}
		}
	}

	.eventimg {
		margin-top: 0.5rem;
		width: 95%;
		height: 5rem;
		//padding: 1rem;
	}
</style>
