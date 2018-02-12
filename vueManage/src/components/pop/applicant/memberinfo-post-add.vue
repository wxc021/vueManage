<!--工作岗位新增的弹窗-->
<template>
<div class="WorkPost">
	<Modal v-model="modal1" title="工作岗位" width="950" :loading="loading" :mask-closable="false" @on-ok="handleSubmit('WorkerFormItem')" @on-cancel="cancel">
		<Row>
			<Col span="12">
				<Form :model="WorkerFormItem" ref="WorkerFormItem" :label-width="140" :rules="ruleValidate">
					<FormItem label="开始日期：" prop="work_start_time">
						<DatePicker style="width:100%" type="date" :options="options3" placeholder="选择开始日期" v-model="WorkerFormItem.work_start_time"></DatePicker>
					</FormItem>
					<FormItem label="工作岗位：" prop="work_type">
						<Cascader :render-format="renders"  :transfer=true :data="work_type_list" v-model="WorkerFormItem.work_type"></Cascader>
					</FormItem>
					<FormItem label="新社会阶层类型：" prop="social_type">
						<Cascader :render-format="renders" :transfer=true :data="social_type_list" v-model="WorkerFormItem.social_type"></Cascader>
					</FormItem>	
					<FormItem label="一线情况：" prop="is_front">
						<Select v-model="WorkerFormItem.is_front" placeholder="请选择">
							<Option v-for='item in is_front_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
						</Select>
					</FormItem>
					<FormItem label="是否为农民工" prop="newType">
						<Select v-model="WorkerFormItem.is_migrant_worker" placeholder="请选择">
							<Option value="1">是</Option>
							<Option value="0">否</Option>
						</Select>
					</FormItem>											
					<FormItem label="截止日期：" prop="work_end_time">
						<DatePicker style="width:100%" type="date" :options="options4" placeholder="选择截止日期" v-model="WorkerFormItem.work_end_time"></DatePicker>
					</FormItem>
				</Form>
			</Col>
		</Row>
	</Modal>
</div>
</template>
<script>
export default {
	name: 'WorkPost',
	data() {
		return {
			modal1: true, //是否显示弹窗
			loading: true,
			url: '/v1/work/add',
			uid: this.$route.params.uid,
			work_type_list: [],
			social_type_list: [],
			is_front_list: [],
			WorkerFormItem: { //form的绑定
				work_start_time: '', //开始时间
				work_end_time: '', //结束时间
				work_type: [], //工作岗位
				is_migrant_worker: '', //是否农民工
				social_type: [], //新社会阶层类型
				is_front: '', //一线情况
			},
			options3: {
				disabledDate(date) {
					// let work_end_time = WorkerFormItem.work_end_time;
					// if(work_end_time){
					//   return  date &&  date.valueOf() > work_end_time.valueOf();
					// }
				}
			},
			options4: {
				disabledDate(date) {
					// let work_start_time = this.WorkerFormItem.work_start_time;
					// if(work_start_time){
					//   return  date &&  date.valueOf() <= work_start_time.valueOf();
					// }
				}
			},
			ruleValidate: {
				work_start_time: [{
					required: true,
					type: 'date',
					message: '开始时间不能为空',
					trigger: 'change'
				}],
				// work_end_time: [{
				// 	required: true,
				// 	type: 'date',
				// 	message: '结束时间不能为空',
				// 	trigger: 'change'
				// }, ],
				work_type: [{
					required: true,
					message: '工作岗位不能为空',
					trigger: 'change',
					type:'array',
				}],
				is_migrant_worker: [{
					required: true,
					message: '是否农民工不能为空',
					trigger: 'change'
				}],
				// social_type: [{
				// 	required: true,
				// 	message: '新社会阶层类型不能为空',
				// 	trigger: 'change'
				// }, ],
				// is_front: [{
				// 	required: true,
				// 	message: '一线情况不能为空',
				// 	trigger: 'change'
				// }, ],
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
		handleSubmit(name) {
			let that = this;
			this.$refs[name].validate((valid) => {
				if (valid) {
					if(this.WorkerFormItem.work_start_time!==''&&this.WorkerFormItem.work_end_time!==""){
						if (this.WorkerFormItem.work_start_time.getTime() >= this.WorkerFormItem.work_end_time.getTime()) {
							that.$Message.error('开始时间应小于结束时间');
							setTimeout(() => {
								that.loading = false;
								that.$nextTick(() => {
									that.loading = true;
								});
							}, 1000);
							return;
						}
					}

					let qs = require('qs');
					let _data = {};
					_data['uid'] = that.uid;
					for (let item in that.WorkerFormItem) {
						if (item.indexOf('time') >= 0) {
							_data[item] = that.filters.dateFormat(that.WorkerFormItem[item]);
						} else {
							_data[item] = that.WorkerFormItem[item];
						}
					}
					_data.work_type = that.getLastValue(_data.work_type);
					_data.social_type = that.getLastValue(_data.social_type);
					that.axios({
							method: 'post',
							url: that.url,
							data: qs.stringify(_data)
						})
						.then(res => {
							let needData = res.data;
							if (needData.code == 200) {
								setTimeout(() => {
									that.$Message.success('提交成功!');
									that.modal1 = false;
									this.$router.back();
									that.$emit('add');
								}, 200)
							} else {
								that.$Message.error(needData.msg);
							}
						})
						.catch(err => {
							setTimeout(() => {
								that.loading = false;
								that.$nextTick(() => {
									that.loading = true;
								});
							}, 1000);
							this.$Message.error('网络请求异常');
						});

				} else {
					this.$Message.error('表单验证失败!');
					setTimeout(() => {
						that.loading = false;
						that.$nextTick(() => {
							that.loading = true;
						});
					}, 1000);
				}
			})
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
		getDetail() {
			let that = this;
			that.axios({
					url: '/v1/work/detail',
					method: 'get',
					params: {
						uid: that.$route.params.uid,
						id: that.$route.params.item.id
					}
				})
				.then(res => {
					let needData = res.data;
					if (needData.code == 200) {
						needData.data.work_start_time = needData.data.work_start_time==""? "" : new Date(needData.data.work_start_time);
						needData.data.work_end_time = needData.data.work_end_time==""? "" : new Date(needData.data.work_end_time);
						needData.data.work_type = that.getArray(needData.data.work_type_array);
						needData.data.social_type = that.getArray(needData.data.social_type_array);
						that.WorkerFormItem = Object.assign({},needData.data)
					} else {
						that.Message.error(needData.msg);
					}
				})
				.catch(err => {
					this.Message.error('网络请求异常');
				})




		},
		cancel() {
			this.$Message.info('点击了取消');
			this.$router.back();
		}
	},
	mounted() {
		this.getList('A48007', 'work_type_list');
		this.getList('A39041', 'social_type_list');
		this.getList('A39044', 'is_front_list');
		if (this.$route.params.item) {
			this.url = '/v1/work/edit';
			this.getDetail();
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


/*.TeamMember .ivu-modal{*/


/*width: 950px !important;*/


/*}*/
</style>
