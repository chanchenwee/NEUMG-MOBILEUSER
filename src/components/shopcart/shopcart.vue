<template>
  <div>
    <div class="shopcart" style="background-color: #FFFFFF;">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div v-show="totalDiscount>0" class="desc" style="color: red; text-align: center; height: 56px; letter-spacing: 1px;"><span style="color: #FFFFFF;">活动减免 </span> <del>￥{{totalDiscount}}</del>元</div>
		  <div v-show="totalDiscount===0" class="desc" style="text-align: center; height: 56px; letter-spacing: 1px;color: #ff5500;">快来点餐吧！</div>
        </div>
       <!-- <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            去结算
          </div>
        </div> -->
		<div class="content-right" @click="pay">
		  <div class="pay enough">
		    去结算
		  </div>
		</div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
				  <div v-if="food.fnum>0">
					  <span class="name">{{food.fname}}</span>
					<div class="price">
					  <span>￥{{(food.fprice*food.fdiscount*food.fnum).toFixed(2)}}</span>
					</div>
					<div class="cartcontrol-wrapper">
					  <cartcontrol @add="addFood" :food="food"></cartcontrol>
					</div>
				  </div>
                
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import {Toast} from 'vant';
  export default {
   props: {
     deliveryPrice: {
       type: Number,
       default: 0
     },
     minPrice: {
       type: Number,
       default: 0
     }
   },
    data() {
      return {
		  selectFoods:[],
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      };
    },
	created() {
		},
	watch:{
		watchCartList(newVal, oldVal){
			let result = [];
			if(newVal.length>0){
				newVal.forEach((cartItem)=>{
					if(cartItem.fnum>0){
						result.push(cartItem);
					}else{
						this.delProduct(cartItem);
					}
				});
			}
			this.selectFoods = result;
			console.log(result);
		}
	},
    computed: {
	  watchCartList(){
		return this.$store.state.cartList;  
	  },
      totalPrice() {
		if(this.selectFoods.length === 0){
		  return 0;
		}
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.fprice * food.fnum * food.fdiscount;
        });
        total=Math.floor(total * 100) / 100;
        return total;
      },
      totalCount() {
		if(this.selectFoods.length === 0){
		  return 0;
		}
        let count = 0;
		console.log(this.selectFoods);
        this.selectFoods.forEach((food) => {
          count += food.fnum;
        });
        return count;
      },
	  totalDiscount(){
		  if(this.selectFoods.length === 0){
		    return 0;
		  }
		  let total = 0;
		  this.selectFoods.forEach((food) => {
		    total += food.fprice * food.fnum * (1 - food.fdiscount);
		  });
		  total=Math.floor(total * 100) / 100;
		  return total;
	  },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
		delProduct(food){
			this.axios.post('http://localhost:8082/cart/deleteCartItem',food).then(r=>{
			  console.log(r.data);
			  Toast.success("删除成功");
			  this.$store.state.cartList.splice(this.$store.state.cartList.indexOf(food), 1);
			})
		},
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      empty() {
		if(this.selectFoods.length === 0){
		  return 0;
		}
        this.selectFoods.forEach((food) => {
          food.fnum = 0;
        });
		this.clearCart();
		
      },
	  //清空购物车
	  clearCart(){
		this.axios.post('http://localhost:8082/cart/clearCart').then(rs=>{
		  if(rs.data.status){
			Toast.success("已清空，请继续点餐");	
			this.$store.state.cartList=[];
		  }else{
			Toast.fail(rs.data.msg);
		  }
		});

	  },
      pay() {
        // if (this.totalPrice < this.minPrice) {
        //   return;
        // }
        // window.alert(`支付${this.totalPrice}元`);
		console.log(this.selectFoods);
      },
      addFood(target) {
        this.drop(target);
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 101
    width: 100%
    height: 48px
	
	
    .content
      display: flex
      background: #141d27
	  
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
		
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 12px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
