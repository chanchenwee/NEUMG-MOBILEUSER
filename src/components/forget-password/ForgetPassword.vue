<template>
    <div>
        <m-header :mTitle="'忘记密码'"></m-header>
        <section class="thispage">
			
            <div class="forget-content slide-username" >
			 <van-field 
			 class="input"
			    v-model="phone"
			    required
			    label="手机号"
			    placeholder="请输入手机号"
			    :error-message="errormessage"
			  />
			<van-field
			 class="input"
			  v-model="sms"
			  center
			  clearable
			  label="短信验证码"
			  placeholder="请输入验证码"
			>
			  <template #button>
			    <van-button size="small" type="danger" @click="getSSM">发送验证码</van-button>
			  </template>
			</van-field>
                <button class="next" @click="phoneNext" :class="{'active' : removeSpace(phone)&&removeSpace(sms)}">下 一 步</button>
            </div>

          
        </section>
    </div>
</template>

<script>
    import mHeader from '../common/m-header.vue'
    import {removeSpace,formValidate} from "../../common/js/util";
    

    export default {
        data() {
            return {
              
				phone:"",
				sms:"",
				errormessage:"",
            }
        },
        methods: {
			//获取验证码
			getSSM(){
				if(this.phone==""){
					this.$message.error("请填写手机号")
					return;
				}else if(!formValidate(this.phone,'phone')){
					this.errormessage="请输入正确的手机号";
					 this.$message.warning( '手机号格式不正确')
				}else{
					this.errormessage="";
					this.$message.success("验证码为1234");
				}

			},
			
			
			
			//点击下一步
            phoneNext(){
				if(formValidate(this.phone,'phone')&&this.sms=="1234"){
				
					
					this.$router.push(	{ path: '/resetpassword', query: { phone: this.phone } });
				}else if(this.phone==""){
					this.$message.error("请输入手机号")
					return;
				}
				else if(this.sms==""){
					this.$message.error("请输入验证码")
					return;
				}else if(this.sms!="1234"){
					this.$message.error("验证码有误")
					return;
				}
				else {
					this.errormessage="请输入正确的手机号";
					 this.$message.warning( '手机号格式不正确')
				}
				
				
              
            },
           
      
            removeSpace(value){
                return removeSpace(value)
            }
        },
        components: {
            mHeader
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
	.thispage{
		padding: 0.5rem;
	}
    .forget-content{
        width: 100%;
        margin-top: 100px;
        &.slide-question{
            div {
                display: flex;
                flex-direction: column;
                span{
                    padding: 10px 0 20px 0;
                    font-size: 30px;
                }
            }
        }
        p{
            padding-bottom: 20px;
            color: #000;
            font-size: 34px;
        }
		/deep/.van-field__control {
			
		    display: block;
		    box-sizing: border-box;
		    width: 100%;
		    min-width: 0;
		    margin: 0;
		    padding: 0;
		    color: #323233;
		    line-height: inherit;
		    text-align: left;
		    background-color: transparent;
		    // border:  0.2px solid #b8b8b8;
		    resize: none;
		}

        .next{
			margin-left: 2rem;
            width: 80%;
            height: 2.5rem;
            margin-top: 80px;
            text-align: center;
            line-height: 2rem;
            color: #fff;
            font-size: 17px;
            background: rgba(246,53,21,.5);
            @include borderRadius(60px);
            &.active{
                background: rgb(246,53,21)
            }
        }
    }
</style>
