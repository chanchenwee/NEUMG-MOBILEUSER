<template>
	<div class="loginPage">
 <div>
       <m-header  style="margin-top: 10px" :mTitle="'欢迎登录'"></m-header>
<div style="margin-top: 1rem; text-align: center;">
	<img
	  round
	  style="width:10rem;
	  height:9.5rem"
	  src="../public/imgs/logo.jpg"
	/> 
	</div>
        <section class="page1">
            <div class="login-page">
                <div class="login-wrap">
                    <div class="login-text">
                        <input @mouseenter="focusText"
                               @mouseleave="blurText" v-model="username" type="text" class="login-username" placeholder="请输入用户名" />
                        <i class="iconfont icon-close" data-close="username" v-show="!usernameClose" @click="clearText()"></i>
                    </div>
                    <div class="login-text">
                        <input @mouseenter="focusText"
                               @mouseleave="blurText" ref="passwordText" v-model="password" type="password" class="login-password" placeholder="请输入密码"  />
                        <div>
                            <i class="iconfont icon-close" data-close="password" v-show="!passwordClose" @click="clearText"></i>
                            <i class="iconfont icon-eye1 eye" @click="changeType" v-if="!passwordType"></i>
                            <i class="iconfont icon-eye eye" @click="changeType" v-else></i>
                            <router-link tag="span" to="./forgetpassword">忘记密码</router-link>
                        </div>
                    </div>
                </div>
                <div class="login-error">{{errMsg}}</div>
                <button class="login-button" :class="{'active' : removeSpace(username)&&removeSpace(password)}" @click="loginSubmit">登  录</button>
                <div class="quick-nav">
                    <router-link tag="span" class="register-button" to="./register">快速注册</router-link>
                </div>
                <div class="other-login">
                    <div class="other-head">
                        <i></i>
                        <span>其它登录方式</span>
                        <i></i>
                    </div>
                    <div class="other-con">
                        <div class="login-icon">
                            <i class="iconfont icon-tubiao215"></i>
                            <span>qq</span>
                        </div>
                        <div class="login-icon">
                            <i class="iconfont icon-weixin1"></i>
                            <span>微信</span>
                        </div>
                    </div>
                    <p>登录即代表您已同意<a>五凤楼隐私政策</a></p>
                </div>
            </div>
        </section>
    </div>
	</div>
</template>

<script>
	import { Toast } from 'vant';
	let server="http://localhost:8082/";
	let login="user/login";
    import mHeader from './components/common/m-header.vue'
    import {removeSpace} from "./common/js/util";
    export default {
        data() {
            return {
                username: '随遇而安',
                password: '123456',
                errMsg: '',
                usernameClose: true,
                passwordClose: true,
                passwordType: 0,
				imgurl:"../public/imgs/logo.jpg"
            }
        },
        methods: {
            focusText(e){
                let $className = e.currentTarget.className
                $className === 'login-username' ? this.usernameClose = false : this.passwordClose = false
            },
            blurText(e){
                let $className = e.currentTarget.className
                $className === 'login-username' ? this.usernameClose = true : this.passwordClose = true
            },
            clearText(e){
				alert("a")
                let $close = e.currentTarget.getAttribute('data-close')
                console.log($close)
                this[$close] = ''
            },
            changeType(){
                let $type = this.$refs.passwordText.getAttribute('type'),
                    value = ''
                console.log($type)
                $type === 'password' ? value = 'text' : value = 'password'
                this.$refs.passwordText.setAttribute('type',value)
                this.passwordType = !this.passwordType
            },
            removeSpace(value){
                return removeSpace(value)
            },
			//登录验证
            loginSubmit(){
                if(!this.username || !this.password){
                    return;
                }else{
					
					  this.axios.get(`${server}${login}`, {params:{
					  	'username':this.username,
					  	'password':this.password,
					  }}).then(rs=>{
					  	console.log(rs.data)
					  	if(rs.data!=""){
					      sessionStorage.setItem("user",JSON.stringify(rs.data));
					      if(rs.data.type==1){
					           sessionStorage.setItem("isVip",true);
					      }else{
					        sessionStorage.setItem("isVip",false);
					      }
					
					      Toast.success("登录成功！")  ;
						  this.$router.push('/home')
					      console.log(rs.data);
					  	}else{
					  		 Toast.fail("用户名或密码错误！")  ;
					  	}
					  });    
					
					
				}
   
            }
        },
        components: {
            mHeader,
    
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import './common/style/mixin';
    .login-page{
       margin-top: 0.5rem;
		overflow-y: scroll;
        .login-wrap{
            width: 100%;
            .login-text{
                @include fj;
                width: 100%;
                height: 2rem;
                line-height: 2rem;
                padding: 0.5rem 0;
                margin-top: 20px;
                border-bottom: 1px solid #dcdcdc;
                .iconfont{
                    font-size: 15px;
                    color: #CCCCCC;
                    &.eye{
						padding-right: 1rem;
                        font-size: 15px;
                        border-right: 1px solid #dcdcdc;
                    }
                }
                input{
                    width: 100%;
                    height: 100%;
                    // margin-right: 20px;
                    line-height: 2rem;
                    color: #222;
                    font-size: 18px;
                    &.login-password{
                        width: 65%;
                    }
                }
                span{
                    padding-left: 0.3rem;
                    font-size: 15 px;
                }
                div{
                    display: flex;
                }
            }
        }
        .login-error{
            width: 100%;
            height: 1rem;
            line-height: 1rem;
            padding: 0.5rem 0;
            color: $red;
            font-size: 26px;
        }
        .login-button{
            width: 100%;
            height: 3rem;
            text-align: center;
            line-height: 3rem;
            color: #fff;
            font-size: 18px;
            background: rgba(246,53,21,.5);
            @include borderRadius(60px);
            &.active{
                background: rgb(246,53,21)
            }
        }
        .quick-nav{
            padding: 1rem 0;
            width: 100%;
            text-align: right;
            .register-button{
                color: #999;
                font-size: 16px;
            }
        }
        .other-login{
            width: 100%;
            margin-top: 0.5rem;
            .other-head{
                @include fj;
                i{
                    flex: 1;
                    height: 1px;
                    margin-top: 1rem;
                    background: #dcdcdc;
                }
                span{
                    flex: 1;
                    text-align: center;
                    font-size: 18x;
                    color: #dcdcdc;
                }
            }
            .other-con{
                display: flex;
                width: 80%;
                padding: 1rem 0;
                margin-left: 32%;
                .login-icon{
                    display: flex;
                    flex-direction: column;
                    width: 4rem;
                   // margin: 0 3rem;
                    text-align: center;
                    .iconfont{
                        width: 100%;
                        height: 1rem;
                        line-height: 1rem;
                        font-size: 40px;
                        color: #15B8F5;
                       // background: #E7F7FE;
                        @include borderRadius(50%);
                        &.icon-weixin1{
							// height: 32px;
							// width: 32px;
                            font-size: 32px;
                            color: #09BB07;
                           // background: #E6F8E6;
                        }
                    }
                    span{
						font-size: 0.8rem;
                        padding-top: 1rem;
                        color: #999;
                    }
                }
            }
            p{
                // margin-top: 1rem;
                width: 100%;
                text-align: center;
                color: #999;
                a{
                    color: #409eff;
                }
            }
        }
    }
	.page1{
		padding: 1rem;

	}
</style>
