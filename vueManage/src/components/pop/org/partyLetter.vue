<!--奖惩中的批准树-->
<template>
<div>
	<Modal class="partyLetter" v-model="modal1" title="介绍信编辑" width="950" :loading="loading" :mask-closable="false" class-name=".max-height-party vertical-center-modal">
		<!--<div class="letter-title">-->
		<!--<p>姓名:  <span>{{baseinfo.real_name}}</span></p>-->
		<!--<p>党组织:<span>中国共产党天津市宝坻区供销合作社联合社机关支部</span></p>-->
		<!--</div>-->
		<p slot="header" style="background: #F04134;">
            <Icon class="letter-bg"></Icon>
            <span style="color:#fff; margin-left: 5px;">介绍信编辑</span>
        </p>
		<div class="letter-top">
			<div class="letter-top-left">
				<span style="font-weight: bold;">党员证明信存根</span>
			</div>
			<div class="letter-top-right">
				<div class="row-1">
					<div class="formItem">
						<span>编号:</span>
						<input type="text" class="letter-number" readonly v-model="content.letter_no" :disabled="isDisable">
					</div>
				</div>
				<div class="row-1 mt10">
					<input type="text" class="input-long" readonly v-model="baseinfo.real_name" :disabled="isDisable">
					<span class="w104">同志系中共</span>
					<input type="text" class="input-sm" readonly v-model="baseinfo.type" :disabled="isDisable">
					<span class="w50">党员，</span>
				</div>
				<div class="row-1 mt10">
					<span class="begin">由</span>
					<input type="text" class="input-long w357" readonly value="中国共产党天津市宝坻区供销合作社联合社机关支部" v-model="content.dept_from" :disabled="isDisable">
					<span class="end">去</span>
					<input type="text" class="input-sm w353" readonly value="" v-model="content.dept_to" :disabled="isDisable">
				</div>
				<div class="row-1">
					<span class="validity-date">(有效期&emsp;<label>{{content.validity}}</label>&emsp;天)</span>
					<div class="formItem">
						<span class="fl">时间:</span>
						<div class="wrap-data" style="margin-left: 10px">
							<DatePicker type="date" :value="date" readonly :disabled="isDisable" placeholder="选择日期" style="width: 146px" v-model="content.timestamp"></DatePicker>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="letter-title">
			<p style="text-align: center; margin-top: 10px;">中国共产党党员组织关系介绍信</span>
			</p>
		</div>
		<div class="letter-body">
			<div class="row-1 mt14">
				<input class="w285" v-model="content.destination" :disabled="isDisable">
				<div class="formItem" style="margin-top: 0;margin-right: 0;">
					<span>编号:</span>
					<input type="text" class="letter-number" :disabled="isDisable" v-model="content.letter_no">
				</div>
			</div>
			<div class="row-1 mt10">
				<input type="text" class="" readonly style="color: #999;" v-model="baseinfo.real_name" :disabled="isDisable">
				<span class="fz16 ml32">同志(<label>{{baseinfo.sex}}</label>),<label>{{baseinfo.age}}</label>岁,<label>{{baseinfo.nation}}</label>,</span>
				<span class="ml32">系中共<label style="padding: 0 20px;color: #999;">{{baseinfo.type}}</label>党员</span>
			</div>
			<div class="row-1 mt10">
				<!--<span class="fl" style="line-height: 32px;margin-right: 12px;">系中共</span>-->
				<!--<div class="w100" style="text-align: center;color: #999;line-height: 32px;">-->
				<!--<span>正式</span>-->
				<!--</div>-->
				<span class="fl fz16" style="line-height: 32px;margin-left: 14px;">身份证号码<label style="padding-left: 29px;padding-right: 0px;">{{baseinfo.idcard}}</label></span>
			</div>
			<div class="row-1 mt10">
				<span>由</span>
				<input type="text" class="w390" v-model="content.dept_from" :disabled="isDisable">
				<span style="padding-left: 12px;padding-right: 12px;">到</span>
				<input type="text" class="w390" v-model="content.dept_to" :disabled="isDisable">
			</div>
			<div class="row-1 mt10">
				<span>请转接组织关系。该同志已交党费</span>
				<Select style="width:134px;margin-left: 12px;background: #ebebe4;" v-model="content.fee_year" :disabled="isDisable">
            <Option value="2017">2017年</Option>
            <Option value="2016">2016年</Option>
            <Option value="2015">2015年</Option>
          </Select>
				<span style="padding: 0 16px">年</span>
				<Select style="width:134px;background: #ebebe4;" v-model="content.fee_month" :disabled="isDisable">
                    <Option value="1">1月</Option>
                    <Option value="2">2月</Option>
                    <Option value="3">3月</Option>
                    <Option value="4">4月</Option>
                    <Option value="5">5月</Option>
                    <Option value="6">6月</Option>
                    <Option value="7">7月</Option>
                    <Option value="8">8月</Option>
                    <Option value="9">9月</Option>
                    <Option value="10">10月</Option>
                    <Option value="11">11月</Option>
                    <Option value="12">12月</Option>
                </Select>
				<span>月</span>
			</div>
			<div class="row-1 mt10">
				<span>有效期</span>
				<input type="text" class="w73" maxlength="3" v-model="content.validity" :disabled="isDisable">
				<span>天</span>
				<span style="margin-left: 490px;">时间</span>
				<DatePicker v-model="content.timestamp" type="date" placeholder="选择日期" style="width: 146px" :disabled="isDisable"></DatePicker>
			</div>
			<div class="row-1 mt10">
				<span>党员联系电话或其他联系方式:</span>
				<input type="tel" maxlength="11" class="w622" v-model="content.member_phone" :disabled="isDisable">
			</div>
			<div class="row-1 mt10">
				<span>党员原所在基层党委通讯地址:</span>
				<input type="text" class="w622" v-model="content.dept_from_addr" :disabled="isDisable">
			</div>
			<div class="row-1 mt10">
				<span>联系电话:</span>
				<input type="text" class="w186" maxlength="11" v-model="content.dept_from_phone" :disabled="isDisable">
				<span style="margin-left: 60px;">传真:</span>
				<input type="text" class="w186" maxlength="12" v-model="content.dept_from_fax" :disabled="isDisable">
				<span style="margin-left: 60px;">邮编:</span>
				<input type="text" class="w186" maxlength="6" v-model="content.dept_from_zipcode" :disabled="isDisable">
			</div>
		</div>
		<div class="letter-title">
			<p style="text-align: center; width: 100%;margin-top: 10px;">中国共产党党员组织关系介绍信回执联</span>
			</p>
		</div>
		<div class="letter-footer">
			<div class="row-1 mt14">
				<input type="text" class="w285" v-model="content.departure" :disabled="isDisable">
				<div class="formItem" style="margin-top: 0;margin-right: 0;">
					<span>编号:</span>
					<input type="text" class="letter-number" v-model="content.letter_no" :disabled="isDisable">
				</div>
			</div>
			<div class="row-1 mt10">
				<input type="text" class="w397" v-model="baseinfo.real_name" :disabled="isDisable">
				<span style="font-size: 16px; ">同志的党员组织关系已转达我处，特此回复。&emsp;&emsp;&emsp;（盖章）</span>
			</div>
			<div class="row-1 mt10">
				<span class="fz16">经办人：</span>
				<input type="text" class="w203" maxlength="5">
				<span class="fz16">联系电话：</span>
				<input type="text" class="w344" v-model="content.dept_from_phone" maxlength="11">
				<input type="text" class="w45">
				<span class="fz16">年</span>
				<input type="text" class="w45">
				<span class="fz16">月</span>
				<input type="text" class="w45">
				<span class="fz16">日</span>
			</div>
		</div>
		<div slot="footer">
			<Button type="primary" size="large" @click="save($event)" v-if="!isDisable">保存</Button>
			<Button size="large" @click="ok" v-if="isDisable">修改</Button>
			<Button type="error" size="large">打印</Button>
			<Button size="large" v-if="isShow" @click="exportOut">导出</Button>
			<Button size="large" @click="close">关闭</Button>
		</div>
	</Modal>
</div>
</template>

<script>
export default {
	name: 'partyLetter',
	data() {
		return {
			modal1: true, //是否显示弹窗
			loading: true,
			isDisable: true, //是否可编辑
			isShow: false,
			isSave: false, //是否已经保存
			date: '2017-04-05',
			formInline: {},
			baseinfo: {},
			content: {},
            introductionId:''//介绍信ID
		}
	},
	components: {},
	methods: {
		checkRoute() {
			let re = /organizationManage/;
			return re.test(this.$route.path);
		},
		close() {
			let re = /organizationManage/;
			let name = this.$route.query.dept? 'organizationManageList' : 'organizationManage';
			let _params = this.$route.query.dept? {dept: this.$route.query.dept} : "";
			if (re.test(this.$route.path)) {
				this.$router.push({
					name: name,
					params: _params,
				});
			} else {
				this.$router.push({
					name: 'interview'
				});
			}

		},
		ok() {
			this.isDisable = false;
		},
		getDetail() {
			let that = this;
			console.log(this.$route);
			//0:新增  1:编辑
			let params = {};
			if (this.$route.query.interState == '0') {
				params.uid = this.$route.query.id

				this.isDisable = false;
			} else if (this.$route.query.interState == '1') {
				params.id = this.$route.query.id
			}

			let qs = require('qs');
			this.axios({
					method: 'post',
					url: '/v1/introletter/detail',
					data: qs.stringify(params)
				})
				.then(res => {

					let needData = res.data;
					if (needData.code == 200) {
						this.baseinfo = Object.assign({}, needData.data.baseinfo);
						this.content = Object.assign({}, needData.data.content);

					} else {
						that.$Message.error(needData.msg);
					}
				})
				.catch(err => {
					this.$Message.error('网络请求异常');
				})
		},
		save(event) {
			let qs = require('qs');
			let that = this;
			if (that.isSave == true) {
				return;
			}
			let postData = Object.assign({}, this.content);
			if (typeof(this.content.timestamp) == "string") {} else {
				postData.timestamp = this.content.timestamp.format("yyyy-MM-dd");
			}
			//新增传递uid 编辑传递id
			let params = {};
			if (this.$route.query.interState == '0') {
				params.uid = this.$route.query.id
				params.content = postData
			} else if (this.$route.query.interState == '1') {
				params.id = this.$route.query.id
				params.content = postData
			}
            this.axios({
				method: 'post',
				url: '/v1/introletter/edit',
				data: qs.stringify(params)
			})
			.then(res => {
				let needData = res.data;
				if (needData.code == 200) {
                    that.introductionId = needData.data.id
					that.isSave = true;;
					that.isShow = true;
					that.$Message.success('提交成功');
				} else {
					that.$Message.error(needData.msg);
				}
			})
			.catch(err => {

			})
		},
		//导出
		exportOut() {
			let qs = require('qs');
			let that = this;
			let params = {};
			if (this.$route.params.interState == '0') {
				return;
			} else if (this.$route.params.interState == '1') {
				params.id = this.$route.query.id
			}
            window.open("/v1/introletter/drawletter?id=" + this.introductionId)


		}
	},
	mounted() {
		this.getDetail();
	}
}
</script>
<style>
	.partyLetter .ivu-modal-header {
	  background: #F04134;
	  border-radius: 6px 6px 0 0;
	}
	.partyLetter .ivu-modal-close .ivu-icon-ios-close-empty {
	  color: #fff;
	}
</style>
<style scoped>
input{
    height: 30px;
    line-height: 30px;
}
input[disabled] {
	background: #f3f3f3 !important;
	border-color: #dddee1 !important;
}

.letter-title {
	width: 100%;
	overflow: hidden;
}

.letter-title p {
	/* float: left; */
	margin-left: 40px;
	font-weight: bold;
	font-size: 18px;
	;
}

.letter-top {
	margin: 12px auto 0;
	width: 886px;
	height: 190px;
	border: 1px solid #666;
	overflow: hidden;
}

.letter-top input {
	color: #999;
}

.mt10 {
	margin-top: 10px;
}

.letter-top .letter-top-left {
	width: 60px;
	border-right: 1px solid #666;
	height: 190px;
	float: left;
	text-align: center;
}

.letter-top .letter-top-left span {
	width: 20px;
	padding-top: 20px;
	font-size: 16px;
	display: inline-block;
	line-height: 22px;
}

.letter-top-right {
	width: 823px;
	height: 100%;
	float: left;
}

.row-1 {
	width: 100%;
	overflow: hidden;
}

.row-1 .formItem {
	float: right;
	margin-top: 14px;
	margin-right: 13px;
	margin-left: 19px;
}

.letter-top-right .row-1 .formItem span {
	line-height: 20px;
	color: #333;
}

.letter-top-right .row-1 .formItem .letter-number {
	width: 177px;
	height: 30px;
	border: 1px solid #aaa;
	border-radius: 2px;
	outline: none;
	line-height: 30px;
	font-size: 12px;
	text-indent: 10px;
}

.begin,
.end {
	margin-left: 19px;
	display: inline-block;
}

.end {
	margin-right: 19px;
}

.letter-top-right .row-1 .input-long.w357 {
	width: 357px;
	margin-left: 10px;
}

.letter-top-right .row-1 .input-long,
.letter-top-right .row-1 .input-sm {
	width: 379px;
	height: 30px;
	line-height: 30px;
	text-indent: 10px;
	font-size: 12px;
	border: 1px solid #aaa;
	border-radius: 2px;
	outline: none;
	margin-left: 19px;
}

.row-1 span {
	font-size: 16px;
}

.w73 {
	width: 73px;
	text-align: center;
}

.w397 {
	width: 397px;
}

.w186 {
	width: 186px;
}

.w203 {
	border: none !important;
	width: 203px;
}

.w344 {
	width: 280px;
	border: none !important;
}

.w445 {
	width: 450px;
	display: inline-block;
	height: 32px;
	float: left;
}

.w100 {
	width: 100px;
	display: inline-block;
	height: 32px;
	float: left;
}

.w536 {
	width: 536px;
}

.w390 {
	width: 387px;
}

.w622 {
	width: 622px;
}

.w45 {
	width: 45px;
	border: none !important;
	text-align: center;
}

.fz16 {
	font-size: 16px;
}

.fz16 label {
	padding-left: 22px;
	padding-right: 22px;
	display: inline-block;
	color: #999;
}

.ml32 {
	margin-left: 32px;
}

.letter-top-right .row-1 .w104 {
	width: 104px;
	display: inline-block;
	font-size: 16px;
	text-align: center;
}

.letter-top-right .row-1 .w50 {
	width: 50px;
	display: inline-block;
	font-size: 16px;
	text-align: center;
}

.letter-top-right .row-1 .input-sm {
	width: 257px;
	margin-left: 0;
}

.letter-top-right .row-1 .input-sm.w353 {
	width: 353px;
}

.letter-body {
	width: 870px;
	padding-left: 14px;
	padding-right: 12px;
	margin: 12px auto 0;
	height: 390px;
	border: 1px solid #666;
}

.validity-date {
	font-size: 14px;
	margin-left: 40px;
	margin-top: 16px;
	display: inline-block;
}

input[disabled] {
	cursor: no-drop;
}

.wrap-data {
	width: 146px;
	height: 32px;
	float: left;
}

.letter-top-right .row-1 .formItem span.fl {
	float: left;
	line-height: 32px;
}


/*footer*/

.letter-footer {
	padding-left: 14px;
	padding-right: 12px;
	width: 870px;
	height: 128px;
	border: 1px solid #666;
	margin: 12px auto 0;
}

.letter-footer input,
.letter-body input {
	line-height: 30px;
	height: 30px;
	text-indent: 10px;
	font-size: 12px;
	border: 1px solid #aaa;
	border-radius: 2px;
	outline: none;
}

.w285 {
	width: 285px;
}

.mt14 {
	margin-top: 14px;
}



</style>
