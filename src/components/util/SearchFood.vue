<template>
	<div class="searchFoodPagae">
		<van-nav-bar
		  left-arrow
		  @click-left="onClickLeft">
		  <template #title>
		      <van-search
		        v-model="searchValue"
		        shape="round"
		        show-action
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
		   </template>
		</van-nav-bar>
		<div class="recomArea">
			<div class="recomTitie"><span >热门搜索</span></div>
			<van-divider  :style="{ color: '#1989fa', borderColor: '#1989fa'}" />
			<div class="recomContent">
				<template v-for="name of recomList">
					<van-button class="recom-but" type="primary" block>{{name}}</van-button>
				</template>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				searchValue:'',
				vis_search: false,
				recomList: [
					'好吃滴1',
					'好吃滴2',
					'好吃滴3',
					'好吃滴4'
				]
			}
		},
		methods:{
			onClickLeft(){
				this.$router.go(-1);
			},
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
		}
	}
</script>

<style scoped>
	::v-deep .van-search{
		min-width: 380px;
		padding: 5px 0px;
		padding-left: 30px;		
	}
	::v-deep .van-nav-bar__title{
		max-width: 100%;
		height: inherit;
	}
	.recom-but{
		background-color: #f5f5f5; 
		border: none; 
		width: 45%; 
		height: fit-content;
		padding: 10px 0px;
		border-radius: 6px;
		color: #393939;
		font-family: simsun;
		font-size: 12px;
		display: inline-block; 
		margin-right: 10px; 
		margin-top: 10px;
		letter-spacing:3px;
		font-weight: 900;
	}
	.recomArea{
		padding-left: 15px;
	}
	.recomContent{

	}
	.recomTitie{
		margin: 10px 0px;
		font-size: 13px; 
		letter-spacing: 2px; 
		font-family: simsun;
		font-weight: 900; 
		color: #b3b3b3;
	}
</style>
