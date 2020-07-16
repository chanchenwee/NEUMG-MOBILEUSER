<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="this.fnum>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="this.fnum>0">{{fnum}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Toast} from 'vant';
  export default {
    props: ['food'],
	data(){
		return{
			fnum: 0,
		}
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
	created() {
		this.getNum();
	},
    methods: {
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
	  	}else{
			this.fnum = 0;
		}
	  },
      addCart(event) {
        if (!event._constructed) {
          return;
        }
		this.food.fnum = 1;
		this.addToCart(this.food);
        this.$emit('add', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
		this.food.fnum = -1;
	    this.addToCart(this.food);
      },
	  addToCart(food){
		  this.axios.post("http://localhost:8082/cart/insertCart",food).then(r=>{
			  
			  // alert("hello");
			  if(r.data===1){
				  Toast.success("操作成功");
				  if(food.fnum == 1){
						Toast.success('添加成功');
				  }else{
					  Toast.success("移除成功");
				  }
			  }
			  
		      
		      console.log(r)
		      this.axios.get("http://localhost:8082/cart/getCart").then(rs=>{
		        this.$store.state.cartList=rs.data;
		      })
		  })
	  },
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
