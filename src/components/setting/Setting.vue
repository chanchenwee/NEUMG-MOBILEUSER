<template>
	<div class="profile">
		<header class="user-head">
			<i class="iconfont icon-left" @click="goBack"></i>
			<span>账号管理</span>
			<i class="iconfont icon-More"></i>
		</header>
		<section class="profile-content">


	<div id="accountArea">
	<section class="account_section_v2">
		<div class="account_section_title"> <span class="account_section_title_left">管理我的账户</span> <a class="account_section_title_right red"
			 style="display:none;" id="accountDescribePtag" href="//wqs.jd.com/my/accountDescription/accountDescription.html"
			 ptag="7205.2.66" data-wxptag="7205.1.66" data-sqptag="7205.2.66"> <i class="icon_book"></i>账户小百科 </a> </div>
		<ul class="account_list">
			<li class="account_itemv2 current_account" id="gotoUserInfo">
				<!--当前登录的图标-->
				<div class="bottom_left_decoration_points"></div>
				<div class="top_right_decoration_points"></div>
				<div class="top_right_decoration_ring"></div>
				<div class="top_right_decoration_circle"></div>
				<div class="current_account_tip">当前登录</div>
				<!--END当前登录的图标-->
				<div class="user_info" id="gotoUserInfo">
					<div class="user_avator-wrapper">
						<div class="user_avator-box"> <img class="user_avator" :src="userImg">
						</div>
					</div>
					<div class="user_detail">
						<div class="main_detail"> <span class="user_name">{{userInfo.username}}</span> </div>
						<div class="append_detail"> <span class="user_pin">用户名: {{userInfo.username}}</span> </div>
					</div>
				</div>
			</li>
		</ul>
	</section>
	</div>

			<router-link tag="div" to="./updatepassword" class="profile-item">
				<span>修改登录密码</span>
				<i class="iconfont icon-right"></i>
			</router-link>
			<router-link tag="div" to="./updateinfo" class="profile-item">
				<span>修改个人信息</span>
				<i class="iconfont icon-right"></i>
			</router-link>
			<router-link tag="div" to="./updateaddress" class="profile-item">
				<span>收货地址管理</span>
				<i class="iconfont icon-right"></i>
			</router-link>
		</section>
		<section class="profile-footer">
			<div class="footer-con">
				<div>
					<i class="iconfont icon-yijian"></i>
					<span>意见反馈</span>
				</div>
				<div class="client">
					<i>五凤楼</i>
					<span>客户端</span>
				</div>
				<div class="logout" @click="userLogout">
					<i class="iconfont icon-40one"></i>
					<span>退出登录</span>
				</div>

			</div>

		</section>
		<div>
			<img class="image" src="../../../public/imgs/logo.jpg" />
		</div>
	</div>
</template>

<script>
	//import {getUserInfo,logout} from "../../service/getData";
	let imgserver = "http://localhost:8082/res/";
    export default {
        data() {
            return {
                userInfo:"",
				userImg:"//img11.360buyimg.com/jdphoto/s120x120_jfs/t21160/90/706848746/2813/d1060df5/5b163ef9N4a3d7aa6.png",
            }
        },
        created(){
				this.init();
        },
        methods: {
			//初始化
			init(){
				var userJsonStr = sessionStorage.getItem('user');
				this.userInfo = JSON.parse(userJsonStr);
				this.userImg=`${imgserver}`+this.userInfo.icon;
			},
			
			//验证身份
			checkMember(){
			   return  sessionStorage.getItem('isVip');
			},
			//退出登录
            userLogout(){
                
                    this.$router.push('./login')
					sessionStorage.setItem("user","");
            },
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
	@import '../../common/style/mixin';
	    @import '../../common/style/setting';
    .profile{
        .user-head{
            @include fj;
            width: 100%;
            height: 2rem;
            padding: 0 20px;
            line-height: 2rem;
            font-size: 17px;
            @include boxSizing;
            border-bottom: 1px solid #f7f7f7;
            .iconfont{
                font-size: 22px;
            }
        }
        .profile-content{
            width: 100%;
            .profile-title{
                width: 100%;
                padding: 13px;
				font-size: 17px;
                @include boxSizing;
                font-weight: normal;
                color: #999;
                border-bottom: 1px solid #f7f7f7;
            }
            .profile-item{
                @extend .profile-title;
                @include fj;
                color: #999;
                font-size: 15px;
                &.info{
                    justify-content: left;
                    img{
                        width: 3rem;
                        height: 3rem;
                        @include borderRadius(50%);
                    }
                    div{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding-left: 15px;
                        font-size: 17px;
                        color: #666;
                        span:last-child{
                            color: #999;
                        }
                    }
                }
                .iconfont{
                    font-size: 20px;
                }
            }
        }
        .profile-footer{
            width: 100%;
            margin-top: 4rem;
            .footer-con{
                display: flex;
                width: 100%;
                div{
                    flex: 1;
                    height: 2rem;
                    text-align: center;
                    line-height: 34px;
                    font-size: 15px;
                    color: #333;
                    &.client{
                        line-height: 45px;
                    }
                    &.logout{
                        line-height: 44px;
                    }
                    i{
                        font-style: normal;
                        font-size: 15px;
                        color: #999;
                        &.iconfont{
                            font-size: 1.5rem;
                        }
                    }
                }
            }

        }
    }
	.image{
		height: 5rem;
		width: 5rem;
		margin-left:40%;
		
	}
</style>
