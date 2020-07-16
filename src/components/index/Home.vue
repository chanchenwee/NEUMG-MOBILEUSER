<template>
	<div class="home">
		<div class="NavSearch">
			<van-search
			  v-model="searchValue"
			  shape="round"
			  show-action
			  height="inherent"
			  background="#e7da19"
			  @search="onSearch"
			  @focus="showBlurSearch"
			  @blur="hiddenBlurSearch"
			  placeholder="请输入搜索关键词">				
				  <template #action>
					<transition name="van-fade">
					  <div class="searchButton" v-if="vis_search"  @click="onSearch">搜索</div>
					</transition>			
				  </template>			  
			  </van-search>
		</div>
		<div class="homeArea">
			<div class="background-transition"></div>
			<div class="entryArea">
				<ul style="display: flex;">
					<li @click="foodEntry">
					  <a>
					    <div class="round">
						  <img class="entryIcon" src="../../../public/imgs/icon/icon_entry_food.png" />
					    </div>
					    <span>美食</span>
					  </a>
					</li>
					<li @click="discountEntry">
					  <a>
					    <div class="round">
						  <img class="entryIcon" src="../../../public/imgs/icon/icon_entry_discount.png" />
					    </div>
					    <span>红包</span>
					  </a>
					</li>
					<li @click="memberEntry">
					  <a>
					    <div class="round">
						  <img class="entryIcon" src="../../../public/imgs/icon/icon_entry_member.png" />
					    </div>
					    <span>会员</span>
					  </a>
					</li>
					<li @click="recomEntry">
					  <a>
					    <div class="round">
						  <img class="entryIcon" src="../../../public/imgs/icon/icon_entry_recom.png" />
					    </div>
					    <span>推荐</span>
					  </a>
					</li>
				</ul>
			</div>
			<div class="activities">
				<van-swipe :autoplay="3000">
				  <van-swipe-item v-for="(image, index) in images" :key="index">
				    <img v-lazy="image" />
				  </van-swipe-item>
				</van-swipe>
			</div>
			<div class="recomFoodArea">
				<div style="text-align: left; font-weight: 700; padding: 10px 0px;"><span>美食推荐</span></div>
				<div class="foodContent">
					<template v-for="foodItem of foodsRecom">
						<div @click="toFoodPage(foodItem)" class="foodRecomItem">
							<div class="foodRecomItemImg">
								<img :src='imgServer+foodItem.fpic' />
							</div>
							<div class="foodRecomItemInfo">
								<div><span style="font-weight: 900;">{{foodItem.fname}}</span></div>
								<div style="color: red;"><span style="font-size: 6px;">￥</span><span style="font-size: 16px; font-weight: 900;">{{foodItem.fprice}}</span></div>							
							</div>
						</div>
					</template>
					<div style="width: 100%; font-weight: 900; font-size: 12px; padding: 10px 0px 0px;"><span>没有更多了</span></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default{
		data(){
			return{
				searchValue:'',
				vis_search: false,
				images:[
					'/imgs/swipe/slide-1.jpg',
					'/imgs/swipe/slide-2.jpg',
				],
				foodsRecom:[],
				imgServer: 'http://localhost:8082/res/',
			}
		},
		created() {
			this.getRecomFoods();
		},
		methods:{
			onSearch(){
				console.log("hello");
				
				this.searchValue = '';
				this.hiddenBlurSearch();
			},
			showBlurSearch(){
				this.vis_search = true;
			},
			hiddenBlurSearch(){
				if(this.searchValue===""){
					setTimeout(rs=>{
						this.vis_search = false;
					}, 100);
				}			
			},
			getRecomFoods(){
				Vue.axios.get('http://localhost:8082/food/getRecommendFood').then(r=>{
				console.log(r.data);
				this.foodsRecom = r.data;
				});
			},
			toFoodPage(foodItem){
				console.log(foodItem.fname);
				console.log("gogogo");
			},
			//entry function
			foodEntry(){
				console.log("food entry");
				this.$router.push("/goods");
			},
			discountEntry(){
				console.log("discount entry");
			},
			memberEntry(){
				console.log("member entry");
			},
			recomEntry(){
				console.log("recommendation entry");
			},
		}
	}
</script>
<style scoped>
	*{
		font-family: simsun;
	}
	.home{
		height: 100%;
		width: 100%;
		background-color: #F2F3F5;
		text-align: center;
	}
	.NavSearch{
		height: fit-content;
	}	
	::v-deep .van-search__action:active {
		background-color: #d4c816;
	}
	.van-search__action{
		border-radius: 20%;
		margin: 0px 5px ;
	}
	.homeArea{
		/* background-color: #e7da19; */
		height: 92%;
		width: 100%;
		z-index: 2;
		overflow: auto;
		position: relative;
	}	
	.homeArea::-webkit-scrollbar{
		display: none;
	}
	
	.background-transition{
		background-image: linear-gradient(#e7da19, #F2F3F5);
		height: 18%;
		width: inherit;
		float: right;
		position: absolute;
		z-index: 0;
	}
	.activities{
		height: fit-content;
		width: inherit;
		box-sizing: border-box;
		padding: 0px 10px;
		overflow: hidden;
		
	}
	.activities img{
		height: 120px;
		width: inherit;
		border-radius: 8px;
	}
	.entryArea{
		position: relative;
		height: fit-content;
		padding: 25px 20px 0px;
		font-size: 12px;
		box-sizing: border-box;
		color: #636363;
	}
	.entryArea >ul li{
		padding: 0px auto;
		flex: 1;
		transition: all ease-in-out 0.1s;
	}
	.entryArea >ul li:active{
		transform: scale(0.9);
	}
	.entryArea >ul{
		padding: 10px 18px;
		padding-bottom: 20px;
		display: flex;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background-image: linear-gradient(#FFFFFF, #F2F3F5);
		box-sizing: border-box;
	}
	.round{
		width: 50px;
		height: 50px;
		/* background: #ff5c7c; */
/* 		border-radius: 10px; */
		line-height: 50px;
		text-align: center;
		margin: 0 auto 5px;
		
		
	}
	.entryIcon{
		width: 50px;
		height: 50px;
		border-radius: 10px;
	}
	
	/* foodRecommendationArea */
	.recomFoodArea{
		box-sizing: border-box;
		padding: 15px 10px;
	}
/* 	.foodContent{
		height: 300px;
		overflow: auto;
	}
	.foodContent::-webkit-scrollbar{
		display: none;
	} */
	.foodRecomItem{
		box-sizing: border-box;
		display: inline-block;
		width: 45%;
		height: 200px;
		background-color: #FFFFFF;
		border-radius: 10px;
		overflow: hidden;
		margin: 0px 6px;
		margin-top: 10px;
		transition: all ease-in-out 0.1s;  
	}
	.foodRecomItem:active{
		transform: scale(1.05);
	}
	.foodRecomItem .foodRecomItemImg{
		width: 100%;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		height: 150px;
		background-color: #1989FA;
		overflow: hidden;
	}
	.foodRecomItem .foodRecomItemImg >img{
		width: inherit;
		height: inherit;
	}
	.foodRecomItem .foodRecomItemInfo >div{
		font-size: 12px;
		text-align: left;
		padding: 3px 10px;
	}
</style>
