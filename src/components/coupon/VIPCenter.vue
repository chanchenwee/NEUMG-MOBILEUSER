<template>
<div style="background-color: #F7F7F7;">
	
	<div class="thishead">
		<van-nav-bar class="centerhead" title="会员中心"  left-arrow   @click-left="onClickLeft"
			@click-right="showPopup">
		  <template #right>
		   <van-icon name="question-o" size="18"/>
		  </template>
		</van-nav-bar>
	
	</div>

<div class="vipcenter">
  <div class="vipheader">
  <a href="userinfo.html">
    <div class="touxiang"><img src="../../../public/imgs/couponcenter/tx.jpg" alt=""></div>
    <div class="name">熊猫天堂</div>
    <div class="gztt">认证会员，已关注</div>
  </a>
  </div>
<div class="user-forks">
		
		    <div  class="fork-items">
		        <i>等级</i>
		        <span class="textinfo">黄金vip</span>
		    </div>
		    <div class="fork-items">
		        <i>累计积分</i>
		        <span class="textinfo">20</span>
		    </div>
		    <div class="fork-items">
		        <i>可用积分</i>
		        <span class="textinfo">20</span>
		    </div>
		</div>
</div>
	<div  class="cell"   style="background-color: #fff" @click="toRedPacket">
		<div>
			
			
			<van-tag type="warning"style="font-weight: bold;">特权1</van-tag>
			<span class="thistext">积分兑换无门槛红包<van-icon style="margin-left: 8rem;" name="arrow" /></span>
		</div>
	<van-grid :border="false" :column-num="4">
	  <van-grid-item>
	    <img src="../../../public/imgs/vipcenter/redpacket.png" />
	  </van-grid-item>
	  <van-grid-item>
	    <img src="../../../public/imgs/vipcenter/redpacket.png" />
	  </van-grid-item>
	  <van-grid-item>
	     <img src="../../../public/imgs/vipcenter/redpacket.png" />
	  </van-grid-item>
	  <van-grid-item>
	     <img src="../../../public/imgs/vipcenter/redpacket.png" />
	  </van-grid-item>
	</van-grid>
	</div>
	
	
	<div class="cell" style="background-color: #fff">
		<div>
			<van-tag type="warning" style="font-weight: bold;">特权2</van-tag>
			<span class="thistext">会员升级下单积分加倍</span>
		</div>
	<div class="recommend-list">
	    <div class="recommend-item" v-for="(item,index) in recommendList" @click="productDetail(index)">
	        <img :src="item.imageHost+item.mainImage" v-if="item.imageHost && item.mainImage"/>
	        <img src="../../../public/imgs/mine/product_default.jpg" v-else/>
	        <p>{{item.name}}</p>
	        <i>￥ {{item.price}}</i>
	    </div>
	</div>
	</div>
	
	
	
	<div  class="cell"   style="background-color: #fff">
		<div>
			<van-tag type="warning"style="font-weight: bold;">特权3</van-tag>
			<span class="thistext">会员专属客服</span>
		</div>
	<van-grid :border="false" :column-num="1">
	  <van-grid-item>
	    <img  style ="height: 5.5rem; width: 10rem;" src="../../../public/imgs/vipcenter/kefu.png" />
	  <span style="font-size: 12px; font-weight: 350;">超级会员享有24小时客服专线，配有专属客服，竭诚提供更专业，更优质的服务</span>
	  </van-grid-item>
	</van-grid>
	</div>
	<div  class="cell"   style="background-color: #fff">
			<van-button type="warning" style="width: 90%; margin-left: 1rem;" round size="large">点我认证会员</van-button>
	</div>

		
		<!-- <van-tabbar v-model="active">
		<van-tabbar-item icon="coupon-o"@click="toCouponCenter">领券</van-tabbar-item>
		  <van-tabbar-item icon="balance-o"@click="toVipCenter">领红包</van-tabbar-item>
		  <van-tabbar-item icon="user-o" @click="toMycoupon">我的优惠卷</van-tabbar-item>
		</van-tabbar> -->



</div>
</template>


<script>

	export default {

		 data() {
		    return {
			    active: 0,
				recommendList:[1,2,3,4],
				icon: {
				  active: 'https://img.yzcdn.cn/vant/user-active.png',
				  inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
				},
				
			};
			
		  },
		
	  methods: {
	    onClickLeft() {
	      this.$router.go("-1");
	    },
		toRedPacket(){
			this.$router.push("/redPacket");
		},
		showPopup(){
			
		},
		//点击我的优惠卷
		toMycoupon(){
			this.$router.push("/myCoupon")
		},
		//点击领红包
		toVipCenter(){
			this.$router.push("/VIPCenter")
		},
		toCouponCenter(){
			this.$router.push("/CouponCenter")
		},
	  },
	};

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">

	.centerhead{
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

/* 改变间距计算方式 */
*{
    box-sizing: border-box;
}

/* 设置间距和字体 */
body{
    margin: .5em;
    font: lighter 16px "微软雅黑";
}

/* 标题变细 */
h1, h2, h3{
    font-weight: lighter;
}

/* 图片响应式 */
img{
    height: auto;
    max-width: 100%;
}

@keyframes red-packet{
    from{
        opacity: 0;
        transform: scale(0);
    }
    to{
        opacity: 1;
        transform: scale(1);
    }
	animation: red-packet .75s both cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.vipheader {
    padding: 1em;
    height: 10rem;
    background: url(../../../public/imgs/couponcenter/hbg.png);
    background-size: cover;
}
.touxiang {
    width: 72px;
    height: 72px;
    margin: 0px auto;
    border-radius: 100%;
    border: 2px solid #fff;
}
.touxiang img {
    border-radius: 100%;
    width: 100%;
}
.name {
    font-size: 1.4em;
    text-align: center;
    color: #fff;
    line-height: 2em;
}
 .gztt {
    font-size: 1em;
    text-align: center;
    color: #fff;
}
      .user-menu {
		   
          display: flex;
          justify-content: space-around;
          width: 100%;
          height: 4.5rem;
          background: rgb(231, 218, 25);
		 // background: linear-gradient(90deg, #eb3c3c, #ff7459);
		 padding: 0.5rem;
		 
          .menu-item {}
		  .icons{
			  font-size: 25px;
			   font-weight: 800;
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
	              font-size: 16px;
	          }
	      }
	  }
	   .textinfo{
		   color: red;
		   //font-family: "comic sans ms";
		   font-weight: bold;
	   }
	   
	   .recommend-list {
	       display: flex;
	       flex-shrink: 0;
	       flex-wrap: wrap;
	       width: 100%;
	       margin-top: 0.5rem;
	      
	      
	       background: #fff;
	       .recommend-item {
	           display: flex;
	           flex-direction: column;
	           width: 50%;
	           padding: 20px;
	          
	           border-bottom: 1px solid #dcdcdc;
	           &:nth-child(2n-1) {
	               border-right: 1px solid #dcdcdc;
	           }
	           img {
	               width: 100%;
	               height: 6rem;
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
	             
	           }
	       }
	   }
	   
	  .cell{
		  margin: 0.8rem;
		  padding: 0.5rem;
	  } 

	   .thistext{
		   margin-left: 0.5rem;
		   font-size: 15px;
		   font-weight: bold;
	   }
</style>
