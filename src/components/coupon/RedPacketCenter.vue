<template>
<div style="background-color: #F7F7F7;">
	
	<div class="thishead">
		<van-nav-bar class="centerhead" title="红包中心"  left-arrow   @click-left="onClickLeft"
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
		        <span>黄金vip</span>
		    </div>
		    <div class="fork-items">
		        <i>累计积分</i>
		        <span>20</span>
		    </div>
		    <div class="fork-items">
		        <i>可用积分</i>
		        <span>20</span>
		    </div>
		</div>
</div>
<!-- 	<van-row type="flex">
	  <van-col span="6"><img src="../../assets/logo.png"  style="height: 2.5rem;" ></van-col>
	  <van-col span="6">用户名</van-col>
	  <van-col span="6">vip等级</van-col>
	</van-row>
	
	<van-cell 
	center  title="单元格" value="内容" label="描述信息" /> -->
	
	
	
	<div class="oneredpacket">
		<div class="red-packet">
			<header>
				<img src="../../../public/imgs/logo.jpg"/>
			</header>
			<main>
				<span>祝你新年快</span>
				<p class="author">奇趣保罗敬上</p>
				<button class="open">开</button>
			</main>
		</div>
</div>

</div>
</template>


<script>

	export default {

		 data() {
		    return {};
			
		  },
		
	  methods: {
	    onClickLeft() {
	      this.$router.push("/mine");
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
.red-packet{
    color: #fff;
    padding: 1em;
    height: 13rem;
    margin: auto;
    max-width: 10rem;
    overflow: hidden;
    position: relative;
    border-radius: 1em;
    background: #c40b00;
}
.red-packet header{
    top: -1.2rem;
    left: 0;
    right: 0;
    height: 5em;
    position: absolute;
    border-radius: 100%;
    background: #b00b00;
}
.red-packet img{
    left: 0;
    right: 0;
    bottom: -1rem;
    margin: auto;
    max-width: 3rem;
    position: absolute;
    border-radius: 100%;
    border: .25em solid #fff;
}
.red-packet main{
    //margin-top: 1em;
    text-align: center;
}
.red-packet .author{
    opacity: .8;
	margin-top: 4rem;
	
}
.red-packet .open{
    outline: 0;
    width: 3em;
    height: 3em;
    color: #fff;
    border: none;
    display: block;
    font-size: 1.2rem;
    cursor: pointer;
    margin: 1em auto;
    background: #ffb03a;
    border-radius: 100%;
    transition: background .3s, transform .3s;
}
.red-packet .open:hover{
    transform: scale(1.1);
}
.red-packet .open:active{
    background: #eba534;
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
    height: 165px;
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
</style>
