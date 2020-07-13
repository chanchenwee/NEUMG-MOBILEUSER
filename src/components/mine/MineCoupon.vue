<template>
	<div>
		<van-cell style="margin-top: 0.5rem" @click="toMycoupon" title="我的优惠卷" is-link value="进入我的优惠卷" />
		<div class="user-forks">
		
		    <div  class="fork-items">
		        <i>0</i>
		        <span>可使用</span>
		    </div>
		    <div class="fork-items">
		        <i>0</i>
		        <span>已使用</span>
		    </div>
		    <div class="fork-items">
		        <i>0</i>
		        <span>已过期</span>
		    </div>
		</div>
		
		
	</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },

  methods: {
    //跳转到我的优惠卷
	toMycoupon(){
		this.$router.push("/coupon");
	},
  },
};
	
	
	
</script>

<style  >
	
	
</style>
