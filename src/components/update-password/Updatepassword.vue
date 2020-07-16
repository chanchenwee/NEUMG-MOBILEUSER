<template>
    <div class="update-password">
        <header class="user-head">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>账号管理</span>
            <i class="iconfont icon-More"></i>
        </header>
        <section class="update-form">
            <div class="password-item">
                <span>输入旧密码</span>
                <div class="password-text">
                    <input @mouseenter="focusText"
                           @mouseleave="blurText" type="password" placeholder="请输入旧密码" class="old-password" v-model="oldPassword" />
                    <div>
                        <i class="iconfont icon-close" v-show="oldClose" data-close="oldPassword" @click="clearText"></i>
                    </div>
                </div>
            </div>
            <div class="password-item">
                <span>设置新的登录密码</span>
                <div class="password-text">
                    <input @mouseenter="focusText"
                           @mouseleave="blurText" type="password" ref="passwordText" placeholder="6-20位数字 / 字母 / 字符组合" class="new-password" v-model="newPassword" />
                    <div>
                        <i class="iconfont icon-close" v-show="newClose" data-close="newPassword" @click="clearText"></i>
                        <i class="iconfont icon-eye1 eye" @click="changeType" v-if="!passwordType"></i>
                        <i class="iconfont icon-eye eye" @click="changeType" v-else></i>
                    </div>
                </div>
            </div>
            <p class="err-msg">{{errMsg}}</p>
            <button class="password-submit" :class="{'active' : removeSpace(oldPassword)&&removeSpace(newPassword)}" @click="submitPassword">确认</button>
        </section>
      
    </div>
</template>

<script>
    import message from '../../components/common/message'
    import {removeSpace} from "../../common/js/util";
	import { Toast } from 'vant';
    // import {updatePassword,logout} from "../../service/getData";
	let server = "http://localhost:8082/";
	let updatepassword = "user/updatepassword";
	let getClient = "client/getClient";
    export default {
        data(){
            return {
				user:"",
                oldPassword: '',
                newPassword: '',
                oldClose: false,
                newClose: false,
                errMsg: '',
                passwordType: 0,

				
            }
        },
		
		created(){
			this.init();
		},
        methods: {
			init(){
			var userJsonStr = sessionStorage.getItem('user');
			if (userJsonStr != null && userJsonStr != "") {
			let user = JSON.parse(userJsonStr);
			this.axios.get(`${server}${getClient}`, {
				params: {
					clientid: user.clientid,
				}
			}).then((res) => {
				this.user=res.data;
			})			
				
			 }
			},
			
            focusText(e){
                let $className = e.currentTarget.className
                console.log($className)
                $className === 'old-password' ? this.oldClose = true : this.newClose = true
            },
            blurText(e){
                let $className = e.currentTarget.className
                $className === 'old-password' ? this.oldClose = false : this.newClose = false
            },
            clearText(e){
				console.log("a");
                let $close = e.currentTarget.getAttribute('data-close')
				console.log($close);
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
            submitPassword(){
                let params = {
                    username: '',

                }
                if(!removeSpace(this.oldPassword) || !removeSpace(this.newPassword)){
                    return
                }
                if(!/^[a-zA-Z0-9\x21-\x7e]{6,20}$/.test(this.newPassword)){
                   Toast.fail('密码格式不对') 
                    return
                }
				if(this.oldPassword==this.user.password){
					this.axios.get(`${server}${updatepassword}`, {
						params: {
							phone: this.user.phone,
							password: this.newPassword,
							
						}
					}).then((res) => {
						if(res.data){
							this.showMessage();
						}else{
							Toast.fail("内部错误，修改密码失败")
						}
					})	
				}else{
					Toast.fail("旧密码输入错误！")
				}
            },
            showMessage() {	
                Toast.success( '修改密码成功,请重新登录！')
                setTimeout(() => {
                    this.$router.push('./login')
                }, 1200)
            },
            goBack(){
                this.$router.go(-1)
            }
        },
        components: {
            message
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
    .update-password{
        background: #F5F5F5;
        .user-head{
            @include fj;
            width: 100%;
            height: 2.5rem;
            padding: 0 20px;
            line-height: 2.5rem;
            font-size: 17px;
            @include boxSizing;
            background: #fff;
            .iconfont{
                font-size: 22px;
            }
        }
        .update-form{
            width: 100%;
            padding: 0 1rem;
            margin-top: 2rem;
            @include boxSizing;
            .password-item{
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-top: 1rem;
                font-size: 15px;
                span{
                    padding-bottom: 0.5rem;
                }
                .password-text{
                    @include fj;
                    width: 96%;
                    padding: 0.5rem 2%;
                    background: #fff;
                    input{
                        width: 60%;
                        height: 2rem;
                        line-height: 2rem;
                        font-size: 15px;
                    }
                    div{
                        line-height: 1.8rem;
                        .iconfont{
                            font-size: 18px;
                            color: #CCCCCC;
                            &.icon-close{
                                padding-top: 6px;
                            }
                            &.eye{
                                padding: 0 30px;
                                font-size: 22px;
                            }
                        }
                    }
                }
            }
            .err-msg{
                height: 2rem;
                line-height:  2rem;
                padding-top: 20px;
                color: $red;
                font-size: 17px;
            }
            .password-submit{
                width: 100%;
                height:2.8rem;
                margin-top: 2.3rem;
                text-align: center;
                line-height: 2.8rem;
                color: #fff;
                font-size: 17px;
                background: $red;
                background: rgba(246,53,21,.5);
                @include borderRadius(10px);
                &.active{
                    background: rgb(246,53,21)
                }
            }
        }
    }
</style>
