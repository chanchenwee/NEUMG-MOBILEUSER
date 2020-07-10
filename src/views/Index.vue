<template>
	<div class="index">
		<div class="routerArea">
			<router-view></router-view>
		</div>	
		<NavBottom></NavBottom>
	</div>
</template>

<script>
	import NavBottom from '../components/NavBottom.vue';
	export default{
		components:{
			NavBottom,
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style scoped>
	.index{
		height: inherit;
		width: 100%;
	}
	.routerArea{
		height: calc(100vh - 50px);
		width: 100%;
		overflow: hidden;
	}
</style>
