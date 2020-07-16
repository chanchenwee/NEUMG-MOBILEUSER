<template>
	<div>
		<mHeader :mTitle="'实名认证'"></mHeader>
		<div class="pagecontent">
			<div class="header cl pos-re">
				<p class="basicAttention ft-24px col-999999">
					请填写您的真实信息,通过后将不能修改
				</p>
			</div>
			<div class="nameAndId col-bgw">
				<div class="ui-form-item pos-re ui-textfield">

					<input  v-model="realname" class=" debit anim-input" type="text" data-reg="\S" data-info="请输入姓名" placeholder="请输入姓名">
				</div>
				<div class="border-1px border-top  ui-form-item   pos-re ui-textfield">
					<input v-model="identify" class=" debit anim-input" maxlength="18" data-reg="^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$"
					 data-info="身份证号格式不对" placeholder="请输入身份证号">

				</div>
			</div>


			<p class="bank-tips" style="width:90%;font-size:12px;color:#999999;margin: 0.96rem auto -0.9rem">根据人行及相关监管要求需要您填写以上信息，请您如实完善相关信息</p>
			<div class="makeSurebtn btn-can-press" @click="onclickConfirm">
				认证会员
			</div>
			<div class="bottomCustomerService">
				<div class="content">
					<div class="content-text" style="padding-bottom: 90%;">
						<img src="//storage.360buyimg.com/jddcard-pam/customer_service3x.png" width="22px" style="margin-right:8px">我的客服</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import mHeader from '../common/m-header.vue'
	import { Notify } from 'vant';
	import { Dialog } from 'vant';
	import { Toast } from 'vant';
	let server = "http://localhost:8082/";
	let memberRegis = "member/memberRegis"
	export default {

		data() {
			return {
				user: "",
				realname: "",
				identify: "",
				
			};

		},
		components: {
			mHeader,
			[Notify.Component.name]: Notify.Component,
			 [Dialog.Component.name]: Dialog.Component,
		},

		created() {
			var userJsonStr = sessionStorage.getItem('user');
			this.user = JSON.parse(userJsonStr);

		},
		methods: {
			//点击认证会员
			onclickConfirm() {
				if(this.checkForm()){
					Dialog.confirm({
					  title: '友情提示',
					  message: '信息确认后不可修改，是否继续！',
					})
					  .then(() => {
						  console.log("a")
			  let  member={
				  "clientid":this.user.clientid,
				  "identityid":this.identify,
				  "realname":this.realname,
				  "accumulatescores":this.user.scores,
			  };
              this.axios.post(`http://localhost:8082/member/memberRegis`,JSON.stringify(member),{
			                  headers: {
			                    'content-Type':'application/json',
			                  },
			                }).then(rs=>{
                if(rs.data.status){
                    Toast.success('认证成功');
                  this.axios.get(`http://localhost:8082/client/getClient`,{params:{
                    clientid: this.user.clientid,
                  }}).then(rs=>{
                    sessionStorage.setItem("user", JSON.stringify(rs.data));
                    location.reload();
                  })
                  this.$router.push('coupon/vipcenter')
                }else{
                  Toast.fail(rs.data.msg);
                }
              });
            })
					  .catch(() => {
						  
						  
					   
					  });
				}
		 },
			checkForm() {
				var realname = this.realname;
				var identify = this.identify;
				if (realname == "" && identify == "") {
	
					Notify({ type: 'warning', message: '请输入姓名和身份证号' });
					return false;
				} else if (realname == "") {			
					Notify({ type: 'warning', message: '请输入姓名' });
					return false;
				} else {
					
					if (identify == "") {
		
						Notify({ type: 'warning', message: '请输入身份证号' });
						return false;
					}
				}
				if (!(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(identify))) {
					Notify({ type: 'warning', message: '身份证号有误，请重新输入' });
					return false;
				}
				return true;
			}


		},
	};
</script>

<style scoped>
	@import url("../../common/style/vipcertify.css");

	.pagecontent {
		background: #efeff4;
		height: 100%;

	}
</style>
