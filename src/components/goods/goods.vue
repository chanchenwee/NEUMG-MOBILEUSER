<template>
  <div class="goodsPage">
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)">
          <span class="text border-1px">
           <span v-if="item.firstType.ftid<5" class="icon" :class="classMap[item.firstType.ftid]"></span>
            {{item.firstType.ftname}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list" ref="foodList">
            <h1 class="title">{{item.firstType.ftname}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="`${imgPath}${food.fpic}`">
                </div>
                <div class="content">
                  <h2 class="name">{{food.fname}}</h2>
                  <!-- <p class="desc">{{food.fdesc}}</p> -->
                  <div class="extra">
                    <span class="count">月售{{food.salesnum}}份</span><span>库存 {{food.fstock}}</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.fprice*food.fdiscount}}</span><span class="old" v-show="food.fprice">￥{{food.fprice}}</span>
                  </div>
                 <div class="cartcontrol-wrapper">
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :deliveryPrice="seller.deliveryPrice"
                :minPrice="seller.minPrice"></shopcart>
    </div>
    <food v-if="showFlag" @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import food from '../food/food.vue';
  import {Toast} from 'vant';

  const ERR_OK = 0;

  export default {
    data() {
      return {
		seller:{
			deliveryPrice: 0,
			minPrice: 0
		},
		showFlag: false,
        imgPath:'http://localhost:8082/res/',
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {},
		loadData: false,
		shopData:[],
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      
    },
    created() {
	  this.getCart();
	  let fid = this.$route.query.fid;  
	  if(fid!==undefined){console.log(fid);
		  this.axios.get('http://localhost:8082/food/getFoodByFid',{params:{
		    fid:fid,
		  }}).then(r=>{
				this.selectFood(r.data);
		  });
		  
	  }
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.axios.get('http://localhost:8082/food/getSaleFood').then(r=>{
        let firstType = {
          ftid:2,
          ftname:'热销'
        };
        let foods = r.data;
        let foodsitem = {
          firstType:firstType,
          foods:foods
        }
        this.goods.push(foodsitem);
        this.axios.get('http://localhost:8082/food/getdiscountFood').then(r=>{
          let firstType = {
            ftid:1,
            ftname:'折扣'
          };
          let foods = r.data;
          let foodsitem = {
            firstType:firstType,
            foods:foods
          }
          this.goods.push(foodsitem);
          this.axios.get('http://localhost:8082/foodtype/getSecondTypedFood').then(r=>{

            for(let i = 0;i<r.data.length;i++){
              this.goods.push(r.data[i]);
            }			
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
            });
          });
        })
      });

    },
    methods: {
		getCart(){
			this.axios.get('http://localhost:8082/cart/getCart').then(r=>{
			  if(r.data.msg === undefined){
				  console.log(r.data);
			    this.$store.state.cartList = r.data;
			  }else{
			   Toast.fail("请先登录");
			  }
			});
		},
		selectFoods() {
		  let foods = [];
				this.goods.forEach((typeItem)=>{
					if(typeItem.firstType.ftid!==1 && typeItem.firstType.ftid!==2){
						typeItem.foods.forEach((food)=>{			
							if (food.count&&food.count>0) {
							  foods.push(food);
							}
						})
					}
				})
		  console.log(foods);
		  return foods;
		},
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
	  updateGoodsByCart(cartlist, food){
	  		  for(let i=0;i<cartlist.length;i++){
	  			  if(food.fid===cartlist[i].fid){
	  				return {
	  					status: true,
	  					count: cartlist[i].fnum
	  				};
	  			}
	  		  }
	  		return {status: false};
	  },
      selectFood(food, event) {
        // if (!event._constructed) {
        //   return;
        // }
        this.selectedFood = food;
        this.showFlag = true;
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goodsPage{
	  height : calc(100vh)
  }

  .goods
    display: flex
    position: absolute
    top: 50px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
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
            right: 0
            bottom: 12px
</style>
