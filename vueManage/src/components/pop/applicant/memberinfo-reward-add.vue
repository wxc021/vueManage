<!--奖惩情况新增的弹窗-->
<template>
<div class="RewardPunishment">
	<Modal v-model="modal1" title="奖惩情况" width="950" :loading="loading" :mask-closable=false @on-ok="handleSubmit('RewardFormItem')" @on-cancel="cancel">
		<Row>
			<Col span="15">
			<Form :model="RewardFormItem" ref="RewardFormItem" :label-width="120" :rules="ruleValidate">
				<FormItem label="奖惩情况：" prop="name">
					<!-- <Select v-model="RewardFormItem.name" style="width:300px" :disabled="disabled">
                  <Option v-for="item in punish" :value="item.id" :key="item.id" :disabled="item.choosed == 0 ? true : false">{{ item.name }}</Option>
              </Select> -->
					<Cascader :render-format="renders" :transfer=true :data="punish" v-model="RewardFormItem.name"></Cascader>
				</FormItem>
				<FormItem label="奖惩原因：" prop="reason">
					<!-- <Select v-model="RewardFormItem.reason" style="width:300px" :disabled="disabled">
                  <Option v-for="item in punish_reason" :value="item.id" :key="item.id" :disabled="item.choosed == 0 ? true : false">{{ item.name }}</Option>
              </Select> -->
					<Cascader :render-format="renders" :transfer=true :data="punish_reason" v-model="RewardFormItem.reason"></Cascader>

				</FormItem>
				<FormItem label="批准组织：" prop="approval_name">
					<Input v-model="RewardFormItem.approval_name" placeholder="请选择批准组织" :disabled="disabled"></Input>
				</FormItem>
				<FormItem label="批准组织级别：" :label-width="120" prop="check_level">
					<!-- <Select v-model="RewardFormItem.check_level" style="width:300px" placeholder="请选择批准组织级别" :disabled="disabled">
						<Option v-for="item in punish_check_level" :value="item.id" :key="item.id" :disabled="item.choosed == 0 ? true : false">{{ item.name }}</Option>
					</Select> -->
					<Cascader :render-format="renders" :transfer=true :data="punish_check_level" v-model="RewardFormItem.check_level"></Cascader>
					

				</FormItem>
				<FormItem label="批准日期：" prop="approval_time">
					<DatePicker type="date" placeholder="选择日期" v-model="RewardFormItem.approval_time" :disabled="disabled"></DatePicker>
				</FormItem>
			</Form>
			</Col>
		</Row>
	</Modal>
	<orgTree v-if="treeShow" @setConfirm="setConfirm" @setCancer="setCancer" :setid="setid"></orgTree>
</div>
</template>
<script>
// import orgTree from '@/components/pop/orgTree.vue'
export default {
	name: 'RewardPunishment',
	data() {
		return {
			modal1: true, //是否显示弹窗
			loading: true,
			treeShow: false,
			disabled: false,
			setid: '', //编辑的时候传入的id
			check_level_list: [],
			punish: [],
			punish_reason: [],
			punish_check_level: [],
			RewardFormItem: { //form的绑定
				name: [], //奖励名称
				approval_name: '', //批准组织
				check_level: [], //级别
				approval_time: '', //批准日期
				reason: [],
			},
			ruleValidate: {
				name: [{
					required: true,
					message: '奖惩情况：',
					trigger: 'blur',
					type:'array'
				}],
				reason: [{
					required: true,
					message: '奖惩原因：',
					trigger: 'blur',
					type:'array'
				}],
				check_level: [{
					required: true,
					message: '批准组织级别不能为空',
					trigger: 'change',
					type:'array',
				}],
				approval_name: [{
					required: true,
					message: '批准组织不能为空',
					trigger: 'change'
				}, ],
				approval_time: [{
					required: true,
					type: 'date',
					message: '批准日期不能为空',
					trigger: 'change'
				}],
			},
			filters: {
				dateFormat(value) {
					if (value == '') {
						return value
					}
					var date = new Date(+value),
						Y = date.getFullYear(),
						m = date.getMonth() + 1,
						d = date.getDate(),
						H = date.getHours(),
						i = date.getMinutes(),
						s = date.getSeconds();
					if (m < 10) {
						m = '0' + m;
					}
					if (d < 10) {
						d = '0' + d;
					}
					if (H < 10) {
						H = '0' + H;
					}
					if (i < 10) {
						i = '0' + i;
					}
					if (s < 10) {
						s = '0' + s;
					}
					var t = Y + '-' + m + '-' + d;
					return t;
				}
			},
			publish: [],
			leval: [],
		}
	},

	methods: {
		getLastValue(arr) {
			let _arr = '';
			let index = arr.length;
			if (index == 0) {
				return ""
			} else {
				_arr = arr[index-1];
				return _arr;
			}
		},
		getArray (obj){
			return obj.map(function(item){return item.id});
		},
		getList(type, arr) {
			let that = this;
			let qs = require('qs');
			if (that[arr].length > 1) {
				return
			}
			that.axios({
					method: 'get',
					url: 'v1/dictionary/get-list-by-type',
					params: {
						type: type
					},
				})
				.then(res => {
					let needData = res.data;
					if (needData.code == 200) {
						setTimeout(() => {
							that[arr] = needData.data;
						}, 200)
					} else {
						that.$Message.error(needData.msg);
					}
				})
				.catch(err => {
					this.$Message.error('网络请求异常');
				});
		},
		getDate(obj) {
			return obj.getFullYear() + '-' + (obj.getMonth() + 1) + '-' + obj.getDate();
		},
		handleSubmit(name) {
			let that = this;
			if (this.$route.params.type == 2) {
				this.$router.go(-1)
				return
			}
			this.$refs[name].validate((valid) => {
				if (valid) {
					let postData = {};
					let url = '';
					postData = Object.assign({}, this.RewardFormItem);
					postData.uid = this.$route.params.uid;
					postData.approval_time = this.filters.dateFormat(postData.approval_time);
					postData.name = this.getLastValue(postData.name);
					postData.reason = this.getLastValue(postData.reason);
					postData.check_level = this.getLastValue(postData.check_level);
					
					if (this.$route.params.item) { //编辑
						url = "/v1/punish/edit"
						postData.id = that.$route.params.item.id;
					} else { // 新增
						url = '/v1/punish/add'
					}
					let qs = require('qs');
					this.axios({
							method: 'post',
							url: url,
							data: qs.stringify(postData),
						})
						.then(res => {
							let needData = res.data;
							if (needData.code == 200) {
								that.$Message.success('成功提交');
								setTimeout(() => {
									that.$router.back();
									that.$emit('add');
								}, 200)

							} else {
								that.loading = true
								that.$Message.error(needData.msg);
							}
						})
						.catch(err => {
							this.$Message.error('网络请求异常');
						})
				} else {
					this.loading = false;
					this.$Message.error('表单验证失败!');
					setTimeout(() => {
						this.loading = true;
					}, 20);
				}
			})
		},
		cancel() {
			this.$Message.info('点击了取消');
			this.$router.back();
		},
		setConfirm(item) {
			this.treeShow = false;
			this.RewardFormItem.full_name = item.data['name'];
			this.RewardFormItem.dept_id = item.data['nid'];
		},
		setCancer() {
			this.treeShow = false;
		},
		getDetail(id) {
			let that = this;
			let qs = require('qs');
			this.axios({
					method: 'get',
					url: '/v1/punish/detail',
					params: {
						id: id,
						opt: 1,
						uid: that.$route.params.uid
					}
				})
				.then(res => {
					let needData = res.data;
					if (needData.code == 200) {
						needData.data.approval_time = new Date(needData.data.approval_time);
						needData.data.name = that.getArray(needData.data.name_array);
						needData.data.reason = that.getArray(needData.data.reason_array);
						needData.data.check_level = that.getArray(needData.data.check_level_array);
						that.RewardFormItem =Object.assign({},needData.data);
						// that.RewardFormItem.approval_time = new Date(that.RewardFormItem.approval_time);
					} else {
						that.$Message.error(needData.msg);
					}
				})
				.catch(err => {
					this.$Message.error('网络请求异常');
				})
		}
	},
	components: {
		// orgTree
	},
	mounted() {
		this.getList('C12002', 'punish');
		this.getList('C12004', 'punish_reason');
		this.getList('C12007', 'punish_check_level');
		if (this.$route.params.item) {
			this.getDetail(this.$route.params.item.id);
		}


	}
}
</script>
<style>
.TeamMember {
	width: 100%;
	height: 100%;
	position: absolute;
}
</style>
