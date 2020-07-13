<template>
	<div class="navBottom">
		<van-tabbar v-model="active" active-color="#ff0101">
		  <van-tabbar-item replace to="/home">			
			<template class="homeIconArea" #icon="props">
			  <van-icon v-if="!props.active" name="wap-home-o"/>
			  <span style="font-size: 12px;" v-if="!props.active">首页</span>
			  <img style="width: 45px; height: 45px; border-radius: 50%;" v-if="props.active" src="/imgs/icon/icon_bar_home_active.png" />
			</template>
		  </van-tabbar-item>
		  <van-tabbar-item replace to="/home" icon="balance-list-o">订单</van-tabbar-item>
		  <van-tabbar-item replace to="/mine" icon="contact">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	export default{
		data(){
			return{
			  active: 0,
			  icon: {
				active: '',
				inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
			  },
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	*{
		background-color: #F2F3F5;
	}
	.navBottom{
		width: inherit;
		height: 50px;
		box-sizing: border-box;	
		}
	.van-tabbar{
		border-top:1px gray solid ;
		background-color: #F2F3F5;
		box-sizing: border-box;
		z-index: 2;
	}
	.van-tabbar-item:active{
		
		transform: scale(0.9);
		
	}
	.van-tabbar-item{
		transition: all ease-in-out 0.01s;
	}
	::v-deep .van-tabbar-item__icon{
		margin: 0px;
	}
</style>
