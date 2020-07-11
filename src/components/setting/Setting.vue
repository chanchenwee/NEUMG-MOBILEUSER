<template>
    <div class="profile">
        <header class="user-head">
            <i class="iconfont icon-left" @click="goBack"></i>
            <span>账号管理</span>
            <i class="iconfont icon-More"></i>
        </header>
        <section class="profile-content">
            <h3 class="profile-title">当前登录账号</h3>
            <div class="profile-item info">
                <img src="//img11.360buyimg.com/jdphoto/s50x50_jfs/t1291/121/695557320/451/826741e1/559cd82bN8edc6bc0.png">
                <div>
                    <span class="username">{{userInfo.username}}</span>
                    <span class="email">邮箱：{{userInfo.email}}</span>
                </div>
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
    </div>
</template>

<script>
    //import {getUserInfo,logout} from "../../service/getData";

    export default {
        data() {
            return {
                userInfo: {}
            }
        },
        created(){
            // getUserInfo().then((res)=>{
            //     this.userInfo = res.data
            // })
        },
        methods: {
            userLogout(){
                logout().then(()=>{
                    this.$router.push('./user')
                })
            },
            goBack(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    @import '../../common/style/mixin';
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
</style>
