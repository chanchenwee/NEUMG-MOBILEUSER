<template>
    <div>
        <m-header :mTitle="'五凤楼点餐系统注册'"></m-header>
        <section class="registpage">
            <div class="register-page">
                <div class="register-wrap">
                    <div class="register-text">
                        <input @mouseenter="focusText"
                               @mouseleave="blurText" v-model="username" type="text" class="register-username" placeholder="请输入用户名" />
                        <i class="iconfont icon-close" data-close="username" v-show="!usernameClose" @click="clearText"></i>
                    </div>
                    <div class="register-text">
                        <input @mouseenter="focusText"
                               @mouseleave="blurText" v-model="password" type="password" class="register-password"  placeholder="请输入密码"  />
                        <i class="iconfont icon-close" data-close="password" v-show="!passwordClose" @click="clearText"></i>
                    </div>
                    <div class="register-text">
                        <input @mouseenter="focusText"
                               @mouseleave="blurText" v-model="confirmpassword" type="password" class="register-confirmpassword" placeholder="请确认密码"  />
                        <i class="iconfont icon-close" data-close="confirmpassword" v-show="!confirmpasswordClose" @click="clearText"></i>
                    </div>
                    <div class="register-text">
                        <input @mouseenter="focusText"
                               @mouseleave="blurText"  v-model="phone" type="text" class="register-phone" placeholder="请输入手机号"  />
                        <i class="iconfont icon-close" data-close="phone" v-show="!phoneClose" @click="clearText"></i>
                    </div>
                </div>
            </div>
            <div class="register-error"></div>
            <button class="register-button" @click="register"
                    :class="{'active' : removeSpace(username)&&removeSpace(password)&&removeSpace(confirmpassword)&&removeSpace(phone)}">注册</button>

        </section>
    </div>
</template>

<script>
	
	let server="http://localhost:8082/";
	let register="user/register";
    import mHeader from '../common/m-header.vue'
    import {removeSpace,formValidate} from "../../common/js/util";
    export default {
        data() {
            return {
                username: '',
                password: '',
                confirmpassword: '',
                phone: '',           
                usernameClose: true,
                passwordClose: true,
                confirmpasswordClose: true,
                phoneClose: true,
                questionClose: true,
                answerClose: true,
                securityShow: false
            }
        },
        methods: {
            focusText(e){
                this.judgeText(e,false)
            },
            blurText(e){
                this.judgeText(e,true)
            },
            judgeText(event,boolean){
                let $className = event.currentTarget.className
                switch($className){
                    case 'register-username':
                        this.usernameClose = boolean
                        break
                    case 'register-password':
                        this.passwordClose = boolean
                        break
                    case 'register-confirmpassword':
                        this.confirmpasswordClose = boolean
                        break
                    case 'register-phone':
                        this.phoneClose = boolean
                        break
                   
                }
            },
            clearText(e){
                let $close = e.currentTarget.getAttribute('data-close')
                console.log($close)
                this[$close] = ''
            },
            //注册
            register(){
                if(!formValidate(this.username,'require') || !formValidate(this.password,'require')
                    || !formValidate(this.phone,'require')){
                    this.$message.warning( '请将信息填写完整！') 
                    return
                }

                if(!formValidate(this.phone,'phone')){
                    this.$message.warning( '手机号格式不正确！')
                    return
                }
				
				if(this.password!=this.confirmpassword){
					this.$message.warning( '两次输入的密码不一致！')
					return
				}				
				  const userinfo = {
				    username: this.username,
				    password: this.password,			 
				    phone: this.phone
				  }
				  this.axios.post(`${server}${register}`,JSON.stringify(userinfo),{
                    headers: {
                      'content-Type':'application/json',
                    },
                  }).then((res) => {
				    console.log(res)
					if(res.data==1){
						   this.$message.success('注册成功');
						   this.$router.push('/login')
					}else if(res.data==-1){		
						  this.$message.error('对不起，该手机号已经被注册过了');
					} 

				  })
				
            
                this.securityShow = true
            },
            closeSecurity(){
                this.securityShow = false
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
    .register-page{
        margin-top: 2rem;
        .register-wrap{
            width: 100%;
            .register-text{
                @include fj;
                width: 100%;
                height: 30px;
                line-height: 30px;
                padding: 0.5rem 0;
                margin-top: 20px;
                border-bottom: 1px solid #dcdcdc;
                .iconfont{
                    font-size: 18px;
                    color: #CCCCCC;
                    &.eye{
                        padding: 0 30px;
                        font-size: 40px;
                        border-right: 1px solid #dcdcdc;
                    }
                }
                input{
                    width: 100%;
                    height: 100%;
                    margin-right: 20px;
                    line-height: 16px;
                    color: #222;
                    font-size: 16px;
                }
                span{
                    padding-left: 20px;
                    font-size: 30px;
                }
                div{
                    display: flex;
                }
            }
        }
    }
    .register-error{
        width: 100%;
        height: 2rem;
        line-height: 2rem;
        padding: 1rem 0;
        color: $red;
        font-size: 18px;
    }
    .register-button{
        width: 100%;
        height: 3rem;
        text-align: center;
        line-height: 2rem;
        color: #fff;
        font-size: 16px;
        background: rgba(246,53,21,.5);
        @include borderRadius(60px);
        &.active{
            background: rgb(246,53,21)
        }
    }
    .set-security{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 0 30px;
        z-index: 100;
        background: #fff;
        @include boxSizing;
        p{
            font-size: 16px;
            color: #999;
            padding-top: 1rem;
        }
        .set-security-head{
            position: relative;
            width: 100%;
            height: 3rem;
            text-align: center;
            line-height: 2.5rem;
            font-size: 18px;
            @include boxSizing;
            .iconfont {
                position: absolute;
                left: 0;
                top: 0;
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
    .slide-enter-active,.slide-leave-active{
        transition: all 0.5s;
    }
    .slide-enter,.slide-leave-to{
        transform: translate3d(100%,0,0);
    }
	.registpage{
		padding-left: 1rem;
		padding-right: 1rem;
	}
</style>
