<template>
	<transition name="van-fade">
		<div v-show="flash" class="foodHome">
			<van-nav-bar
			  left-arrow
			  :border="false"
			  z-index="2"
			  @click-left="onClickLeft">
			  <template #title>
				  <van-search
					shape="round"
					@focus="showBlurSearch"
					placeholder="请输入搜索关键词">						  
					</van-search>
			   </template>
			</van-nav-bar>
			<div class="topArea">
				<div class="box_info_show">
					<div class="showDetailArea">
						<div class="shopDetailContent">
							<div style="font-size: 18px; font-weight: 900; font-family: simsun;"><span>淡淡功名五凤楼</span></div>
							<div class="detail" style="padding-top: 10px;letter-spacing: 1px; color: #ff712f;"><span>原料上乘 尊贵服务</span></div>
							<div class="detail"><span v-for="item of nums" style="border-radius: 2px; border: solid 1px red; color: red;letter-spacing: 1px; margin-right: 5px;">满{{FullMoney[item-1]}}减{{ReductMoney[item-1]}}</span></div>
							<div class="detail"><span style="color: #666666; letter-spacing: 1px;">公告：高考考生持准考证满1000减500</span></div>
						</div>
					</div>
					<div class="logo"><img style="background-color: #eaeaea; width: 75px; height: 50px; border-radius: 5px;" src="/imgs/logo-transparent.png"/></div>
				</div>
				
			</div>
			<div style="padding:15% 2.5% 3%;"><img style="border-radius: 10px;width: 100%; height: 120px;" src="/imgs/swipe/slide-1.jpg" /></div>
			<!-- <div style="padding:15% 2.5% 3%;"><img style="border-radius: 10px;width: 100%; height: 120px;" src="/imgs/ads/exam-ads.jpg" /></div> -->
			<div class="contentArea">
				<div class="foodArea">
					<van-tabs v-model="active" sticky>
					  <van-tab v-for="tab of tabsList" :title="tab.name" :name="tab.active">
						<Goods v-if="active==='goods'"></Goods>
					  </van-tab>
					</van-tabs>
				</div>
			</div>
			
		</div>
	</transition>
</template>

<script>
	import Goods from '../components/goods/goods.vue';
	let server="http://localhost:8082/";
	 let getfullreductInfo="fullreduct/getAll";
	 import {Toast} from 'vant';
	export default{
		components:{
			Goods,
		},
		data(){
			return{
				tabsList:[{name:'点菜',active: 'goods'},{name:'评价', active:'remark'},{name:'商家', active:''}],
				active: 'goods',
				FullMoney:[],
				ReductMoney:[],
				nums:"",
				flash: false,
			}
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1);
			},
			showBlurSearch(){
				this.$router.push("/search");
				this.vis_search = true;
			},
			getEvent(){
				this.axios.get(`${server}${getfullreductInfo}`).then((res) => {
					console.log(res.data);
					var str = res.data.frname;
					var numArr = str.match(/\d+/g);
					console.log(numArr);
					for(let i=0;i<numArr.length;i=i+2){
					 this.FullMoney.push(numArr[i]);
					}
					for(let i=1;i<numArr.length;i=i+2){
					 this.ReductMoney.push(numArr[i]);
					}
					this.nums=numArr.length/2;
	
			 })
			}
		},
		created() {
			Toast.clear();
			this.getEvent();
			setTimeout(()=>{
				this.flash = true;
			},5);
			
		}
	}
</script>

<style scoped>
	
	.contentArea{
		position: relative;
	}
	.foodHome{
		height: calc(100vh);
		width: 100%;
		background-color: #fafafa;
	}
	::v-deep .van-nav-bar{
		background-color: transparent;
		position: absolute;
		top: 0px;
	}
	::v-deep .van-nav-bar__title{
		max-width: 100%;
		height: inherit;
	}
	::v-deep .van-search{
		min-width: 80%;
		margin-left: 60px;
		background-color: transparent;
		padding: 0px;
	}
	::v-deep .van-nav-bar .van-icon {
		color: #FFFFFF;
	}
	::v-deep .van-search__content--round {
		box-sizing: border-box;
		min-width: 300px;
		margin: 5px 0px;
		maigin-left: 30px;
		
		border-radius: 8px;
	}
	.topArea{
		width: 100%;
		height: 16%;
		background-image: url(/imgs/topArea.png);
	}
	.box_info_show{
		position: relative;
		width: 100%;
		height: 180px;
		z-index: 1;
	}
	.showDetailArea{
		position: absolute;
		bottom: 0px;
		top: 65px;
		width: 100%;
		box-sizing: border-box;
		height: 120px;
		padding: 0 3%;
		/* opacity: 0.6; */
		
	}
	.shopDetailContent{
		width: inherit;	
		height: 100px;	
		background-color: #FFFFFF;	
		box-sizing: border-box;
		padding-left: 20px;
		border-radius: 10px;
		box-shadow:0 0 2px 2px #f0f0f0;
		
	}
	.foodArea{
		background-color: #f9f9f9;
	}
	.detail{
		padding:5px 0px;
		font-size: 12px;
		font-weight: 500;
	}
	.logo{
		position: absolute;
		right: 10%;
		bottom: 45%;
	}
</style>
