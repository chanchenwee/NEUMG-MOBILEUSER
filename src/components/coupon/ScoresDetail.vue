<template>
	<div>
		<mHeader :mTitle="'积分明细'"></mHeader>
		<ScoresHeader :Scores="user.scores"></ScoresHeader>

		<div class="red_packet_list">
			<template v-for="score in scoresDetails">
				<li :class="Style(score.updateamount)">
					<div class="item_desc">
						<div class="item_title">
							<p class="item_title_text">{{score.description}}</p>
						</div>
						<!---->
						<div class="item_time">变动日期：{{score.updatetime}}</div>
					</div>
					<div class="item_num">{{score.updateamount}}</div>
				</li>
			</template>
		</div>
		<div class="all_loaded_tip">
			<div class="all-loaded-line"></div>
			<div class="all_loaded_tip_text">到底了</div>
			<div class="all-loaded-line"></div>
		</div>
		<img class="image" src="../../../public/imgs/logo.jpg" />
		<van-empty v-if="show" description="没有记录" />
	</div>
</template>

<script>
	import mHeader from '../common/m-header.vue'
	import ScoresHeader from './ScoresHeader.vue'
	let server = "http://localhost:8082/";
	let getHistory = "memberdetail/getByClientid"; //查看兑换记录
	export default {

		data() {
			return {
				user: "",
				scoresDetails: [],
				show: true,
			
			};

		},
		components: {
			mHeader,
			ScoresHeader,
		},

		created() {
			this.init();
		},
		methods: {
			init() {
				var userJsonStr = sessionStorage.getItem('user');
				if (userJsonStr != null && userJsonStr != "") {
					this.user = JSON.parse(userJsonStr);
				}
				if (this.user.type == 1) {
					this.axios.get(`${server}${getHistory}`, {
						params: {
							clientid: this.user.clientid,
						}
					}).then((res) => {
						if (res.data.getmsg) {
							this.show = false,
								this.scoresDetails = res.data.memberDetails;
							console.log(res.data);

						}

					})

				}

			},
			//根据积分正负改变样式
			Style(n){
				if(n>0){
					return"red_packet_item packet_receive"
				}else{
					return"red_packet_item packet_expire"
				}	
			},

		},
	};
</script>

<style scoped>
	@import url("../../common/style/ScoreDetai.css");
</style>
