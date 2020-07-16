<template>
  <transition name="van-fade">	  
    <div class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="`${imgPath}${food.fpic}`">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.fname}}</h1>
          <div class="detail">  
            <span class="sell-count" style="letter-spacing: 1px;">月售{{food.salesnum}}份</span>
            <!-- <span v-if="food.fstock<20" class="rating">还剩{{food.fstock}}例</span> -->
          </div>
          <div class="price">
            <span class="now">￥{{food.fprice*food.fdiscount}}</span><span class="old" v-show="food.fprice">￥{{food.fprice}}</span>
          </div>
         <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click="addFirst($event)" class="buy" v-show="fnum===0">
              加入购物车
            </div>
          </transition>
        </div>
        <split></split>
        <div class="rating">
		  <span>商品详情</span>
		  <div class="info" v-show="food.fdesc">
			<p class="text">{{food.fdesc}}</p>
		  </div>
		  <span>热销</span>
			<ul class="grid" style="box-sizing: border-box; padding: 0 7px">
				<li @click="route(food, $event)" style="display: inline-block; padding: 5px 5px;" v-for="food in goods">
				   <div style="height: 137px;width: 90px;">
					 <div style="height: 80px;width: inherit;">
						<img :src="`${imgPath}${food.fpic}`" style="width: inherit;height: 80px;"/>
					 </div>
					 <div style="background-color: #f3f3f3;width: inherit; height: 55px;">
					   <div style="height: 20px;">
						  <span style="font-size: 13px;">{{food.fname}}</span>
					   </div>
					   <div style="height: 20px;">
						   <span style="font-size: 13px;">已售 {{food.salesnum}}</span>
					   </div>
					   <div>
						 <span style="color: #ED4014; font-size: 15px;">￥{{food.fprice*food.fdiscount}}<del style="color: #808695; font-size: 13px;">￥{{food.fprice}}</del></span>
					   </div>
					 </div>
				   </div>
				</li>
			</ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import {formatDate} from '../../common/js/date.js';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import split from '../split/split.vue';
  import { Loading } from 'element-ui';
  import {Toast} from 'vant';
  const ALL = 2;

  export default {
    props: ['food'],
    data() {
      return {
        active: 1,
        imgPath:'http://localhost:8082/res/',
        showFlag: false,
        goods:[],
        selectType: ALL,
        onlyContent: true,
        foodData:[],
		fnum:0,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        },
      };
    },
    created() {
		this.getNum();
		this.show();
      this.axios.get('http://localhost:8082/food/getSaleFood').then(r=>{
        this.goods=r.data;
        // this.dataToTable(this.goods);
      });
	  
    },
	watch:{
		watchCartList(newVal, oldVal){
			this.getNum();			
		}
	},
	computed:{
		watchCartList(){
			return this.$store.state.cartList;  
		},
		
	},
    methods: {
      route(food, event){
        console.log(food);
        var useFood;
		/* 
		 此处使用引用传递，目的是传递goods中的food，保证全局数据统一*/
		
        for(let i = 2;i<this.$parent.goods.length;i++){
          for(let j = 0;j<this.$parent.goods[i].foods.length;j++){
            if(food.fid==this.$parent.goods[i].foods[j].fid){
              useFood = this.$parent.goods[i].foods[j];
            }
          }
        }
		this.$parent.showFlag = false;
		// this.showFlag = true;
		// this.$emit("selectFood", food, event);  错误是因为父组件调用方中中使用了引用传递，直接传递goods中的food
		setTimeout(()=>{
			this.$parent.selectFood(useFood, event); 
		},10);
		
      },
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        // this.showFlag = false;
		this.$parent.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
		this.food.fnum = 1;
		this.addToCart(this.food);
		
        

      },
	  getNum(){
	  	let cartList = JSON.parse(JSON.stringify(this.$store.state.cartList));
	  	if(cartList.length>0){
	  		cartList.forEach((cartItem)=>{
	  			if(cartItem.fid === this.food.fid){
	  					// console.log(cartItem.fnum);
	  				this.fnum = cartItem.fnum;
	  					return;
	  			}
	  		})
	  	}
	  },
	  addToCart(food){
		  this.axios.post("http://localhost:8082/cart/insertCart",food).then(r=>{
			  if(food.fnum === 1){
				  Toast.success('已添加至购物车');
			  }else{
				  Toast.success("已从购物车移除");
			  }			  
			  console.log(r)
			  this.axios.get("http://localhost:8082/cart/getCart").then(rs=>{
				this.$store.state.cartList=rs.data;
				this.getNum();
				console.log(this.fnum);
			  })
		  })
	  },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      addFood(target) {
        for(let i = 2;i<this.$parent.goods.length;i++){
          for(let j = 0;j<this.$parent.goods[i].foods.length;j++){
            if(this.food.id==this.$parent.goods[i].foods[j].fid){
              this.$parent.goods[i].foods[j].count++;
            }
          }
        }

        this.$emit('add', target);
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartcontrol,
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .grid {
      max-width: 69em;
      list-style: none;
      margin: 30px auto;
      padding: 0;
  }

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 100
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 60%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff

    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.2s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)

        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>
