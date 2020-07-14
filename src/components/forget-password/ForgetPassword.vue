<template>
    <div>
        <m-header :mTitle="'忘记密码'"></m-header>
        <section class="thispage">
			
            <div class="forget-content slide-username" v-show="usernameShow">
			 <van-field 
			 class="input"
			    v-model="phone"
			    required
			    label="手机号"
			    placeholder="请输入手机号"
			    error-message="手机号格式错误"
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
			    <van-button size="small" type="danger">发送验证码</van-button>
			  </template>
			</van-field>
                <button class="next" @click="phoneNext" :class="{'active' : removeSpace(phone)}">下 一 步</button>
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
                username: '',
                answer: '',
                password: '',
                questionText: '',
                forgetToken: '',
                usernameShow: true,
                answerShow: false,
                passwordShow: false,
				phone:"",
				sms:"",
            }
        },
        methods: {
            phoneNext(){
				this.$router.push('./resetpassword');
                if(!formValidate(this.username,'require')){
                    return
                }
                getQuestion(this.username).then((res)=>{
                    this.usernameShow = false
                    this.answerShow = true
                    this.questionText = res.data
                })
            },
            answerNext(){
                if(!formValidate(this.answer,'require')){
                    return
                }
                let params = {
                    username: this.username,
                    question: this.questionText,
                    answer: this.answer
                }
                submitAnswer(params).then((res)=>{
                    this.forgetToken = res.data
                    this.usernameShow = false
                    this.answerShow = false
                    this.passwordShow = true
                })
            },
            passwordSubmit(){
                if(!formValidate(this.password,'require')){
                    return
                }
                let params = {
                    username: this.username,
                    passwordNew: this.password,
                    forgetToken: this.forgetToken
                }
                forgetResetPassword(params).then(()=>{
                    alert('重置密码成功')
                    this.$router.push('./login')
                })
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
