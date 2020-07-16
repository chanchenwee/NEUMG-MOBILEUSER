<template>
	<div>
		<van-cell style="margin-top: 0.5rem" @click="toMycoupon" title="我的优惠卷" is-link value="进入我的优惠卷" />
		<div class="user-forks">
		
		    <div  class="fork-items">
		        <i>{{CRcanusenum}}</i>
		        <span>可使用</span>
		    </div>
		    <div class="fork-items">
		        <i>{{CRusednum}}</i>
		        <span>已使用</span>
		    </div>
		    <div class="fork-items">
		        <i>{{CRoutdatenum}}</i>
		        <span>已过期</span>
		    </div>
		</div>
		
		
	</div>
</template>

<script>
	let server = "http://localhost:8082/";
	let getMycoupon = "couponreceive/getByClientIdAndStatus";
	let getRedPackets = "redpacketreceive/getByClientIdAndStatus";
export default {

  data() {
    return {
	  user:"",
	  Ccanusenum: 0, //优惠卷数量
	  Coutdatenum: 0,
	  Cusednum: 0,
	  Rcanusenum: 0, //红包数量
	  Routdatenum: 0,
	  Rusednum: 0,
	  CRcanusenum: 0, //优惠卷红包总数量
	  CRoutdatenum: 0,
	  CRusednum: 0,
    };
  },
	created(){
		this.init();
	},
  methods: {
	  //初始化
	  init(){
	  	var userJsonStr = sessionStorage.getItem('user');				
	  	if(userJsonStr!=null&&userJsonStr!=""){
	  		this.user = JSON.parse(userJsonStr);
	  		if(this.user!=""){		
	  			this.getEverStatusNum();		
	  		}
	  	}		
	  },
    //跳转到我的优惠卷
	toMycoupon(){
		this.$router.push("/coupon");
	},
	
	//初始化拿到各种状态的红包和优惠卷的数据
	getEverStatusNum() {
		for (let i = -1; i < 2; i++) {
			this.getCouponStatusNum(i);
		}
	},
	//拿到各种状态优惠卷数量
	async getCouponStatusNum(status) {
		this.axios.get(`${server}${getMycoupon}`, {
			params: {
				clientid: this.user.clientid,
				status: status,
			}
		}).then(async (res) => {
			if (res.data.getmsg) {
				if (status == 0) {
					this.Ccanusenum = res.data.couponReceives.length;
		
				} else if (status == 1) {
					this.Cusednum = res.data.couponReceives.length;
				} else {
					this.Coutdatenum = res.data.couponReceives.length;
				}
				await this.axios.get(`${server}${getRedPackets}`, {
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
				this.CRcanusenum=this.Ccanusenum+this.Rcanusenum;
				this.CRoutdatenum=this.Coutdatenum+this.Routdatenum;
				this.CRusednum=this.Cusednum+this.Rusednum;
			}
	
		})
	
	},
  },
};
	
	
	
</script>

<style  >
	
	
</style>
