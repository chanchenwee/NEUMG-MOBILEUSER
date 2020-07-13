<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
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
            <span class="sell-count">月售{{food.salesnum}}份</span>
            <span class="rating">好评率%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.fprice*food.fdiscount}}</span><span class="old" v-show="food.fprice">￥{{food.fprice}}</span>
          </div>
         <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count==0">
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
              <div v-for="item in foodData">
                <ul class="grid" style="position: relative; display: flex; perspective-origin: 50%;left: 12px;">
                    <li style="height: 130px; position: relative; width: 25%;" v-for="food in item">
                       <div style="height: 150px;width: 80px;">
                         <div style="height: 80px;width: 80px;">
                           <a @click="route(food)">
                             <img :src="`${imgPath}${food.fpic}`" style="width: 80px;height: 80px;"/>
                           </a>

                         </div>
                         <div style="background-color: #f3f3f3;width: 80px; height: 55px;">
                           <div style="height: 20px;">
                             <a @click="route(food)" style="color: #808695">
                              <span style="font-size: 13px;">{{food.fname}}</span>
                             </a>
                           </div>
                           <div style="height: 20px;">
                              <a @click="route(food)" style="color: #808695">
                               <span style="font-size: 13px;">评论 1000</span>
                              </a>
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
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import {formatDate} from 'common/js/date';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import ratingselect from 'components/ratingselect/ratingselect';
  import split from 'components/split/split';

  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        active: 1,
        imgPath:'http://localhost:8082/res/',
        showFlag: false,
        goods:[],
        selectType: ALL,
        onlyContent: true,
        foodData:[],
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    created() {
      this.axios.get('http://localhost:8082/food/getSaleFood').then(r=>{
        this.goods=r.data;
        this.dataToTable(this.goods);
      })
    },
    methods: {
      route(food){
        console.log(food);
        let useFood = {};
        for(let i = 2;i<this.$parent.goods.length;i++){
          for(let j = 0;j<this.$parent.goods[i].foods.length;j++){
            if(food.id==this.$parent.goods[i].foods[j].fid){
              useFood = this.$parent.goods[i].foods[j];
            }
          }
        }
        this.$parent.selectedFood=useFood;
      },
      dataToTable(foods){
        let length = foods.length;
        let food={
          id:'',
          fprice:0,
          fdiscount:0,
          fpic:'',
          fname:'',
          fdesc:'',
        };
        this.foodData=[];
        for(let i = 0;i<Math.ceil(length/4);i++){
          let temp=[];
          for(let j = i*4;j<i*4+4;j++){
            if(j>=length){
                break;
            }

            food.id=foods[j].fid;
            food.fpic=foods[j].fpic;
            food.fname=foods[j].fname;
            food.fdiscount=foods[j].fdiscount;
            food.fprice=foods[j].fprice;
            food.fdesc=foods[j].fdesc;
            temp.push(food);
            food={
              id:'',
              fprice:0,
              fdiscount:0,
              fpic:'',
              name:'',
              fdesc:'',
            };
          }
          this.foodData.push(temp);
          temp=[];
        }
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
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);

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
      ratingselect,
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
    z-index: 30
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
      padding-top: 100%
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
