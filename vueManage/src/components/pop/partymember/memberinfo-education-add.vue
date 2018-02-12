<!-- 学历学位新增弹窗 -->
<template>
<div class="Degree">
	<Modal v-model="modal1" title="学历学位" width="950" :mask-closable="false" class-name="max-height" :loading="loading" @on-ok="handleSubmit('degreeForm')" @on-cancel="cancel">
		<Form ref="degreeForm" :model="degreeForm" :label-width="110" :rules="ruleValidate">
			<Row>
				<Col span="11">
					<FormItem label="教育类型：" prop="education_type">
						<Select v-model="degreeForm.education_type" filterable placeholder="请选择" :transfer=true>
							<Option v-for='item in education_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="11" >
					<FormItem label="学历：" prop="education">
						<!-- <Select v-model="degreeForm.education" filterable placeholder="请选择" :transfer=true>
							<Option v-for='item in edu_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
						</Select> -->
						<Cascader  :render-format="renders" :transfer=true :data="edu_list" v-model="degreeForm.education"></Cascader>
					</FormItem>
				</Col>
				<Col span="11" offset='1'>
					<FormItem label="毕业日期：" prop="education_end_time">
						<DatePicker :transfer=true v-model="degreeForm.education_end_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="11">
					<FormItem label="学位：" prop="">
						<!-- <Select v-model="degreeForm.degree" filterable placeholder="请选择" :transfer=true>
							<Option v-for='item in degree_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
						</Select> -->
						<Cascader :render-format="renders" :transfer=true :data="degree_list" v-model="degreeForm.degree"></Cascader>
					</FormItem>
				</Col>
				<Col span="11" offset='1'>
					<FormItem label="学位授予日期：" prop="">
						<DatePicker :transfer=true v-model="degreeForm.degree_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
					</FormItem>
				</Col>
			</Row>
		</Form>
	</Modal>
</div>
</template>
<script>
export default {
	name: 'Degree',
	data() {
		return {
			modal1: true,
			loading: true,
			education_type_list: [],
			edu_list: [],
			degree_list: [],
			url: '/v1/degree/add',
			uid: this.$route.params.uid,
			degreeForm: {
				education_type: '', //教育类别
				education: [], //学历
				degree: [], //学位
				education_end_time: '', //毕业时间
				degree_time: '', //学位授予时间
			},
			ruleValidate: {
				education_type: [{
					required: true,
					message: '教育类型不能为空',
					trigger: 'change',
				}],
				education: [{
					required: true,
					message: '学历不能为空',
					trigger: 'change',
					type:'array',
				}],
				education_end_time: [{
					required: true,
					type: 'date',
					message: '毕业时间不能为空',
					trigger: 'change'
				}, ],
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
		getTime (str){
			return str==""? "" : new Date(str);
		},
		handleSubmit(name) {
			let that = this;
			this.$refs[name].validate((valid) => {
				if (valid) {
					let qs = require('qs');
					let _data = {};
					_data['uid'] = that.uid;
					for (let item in that.degreeForm) {
						if (item.indexOf('time') >= 0) {
							_data[item] = that.filters.dateFormat(that.degreeForm[item]);
						} else {
							_data[item] = that.degreeForm[item];
						}
					}
					_data.education = that.getLastValue(_data.education);
					_data.degree = that.getLastValue(_data.degree);
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
							this.$Message.error('网络请求异常');
						});

				} else {
					this.loading = false;
					this.$Message.error('表单验证失败!');
					setTimeout(() => {
						this.loading = true;
					}, 20);
				}
			})
		},
		delItem(rowData, index) {

			// TODO 删除请求
			let idx = index;
			let _this = this;
			let data = rowData;
			this.$Modal.confirm({
				title: '警告',
				content: '<p>确定要删除该记录吗？</p>',
				onOk: () => {
					var that = this;
					let qs = require('qs')
					that.axios({
							url: '/v1/represent/del',
							method: 'post',
							data: qs.stringify({
								uid: that.$route.params.uid,
								id: rowData.id
							})
						})
						.then(res => {
							let needData = res.data;
							if (needData.code == 200) {
								this.lists.splice(index, 1);
								this.$Message.success('操作成功');
							} else {
								that.Message.error(needData.msg);
							}
						})
						.catch(err => {
							this.Message.error('网络请求异常');
						})

				},
				onCancel: () => {
					// this.$Message.info('操作取消');
				}
			});
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
					url: '/v1/degree/detail',
					method: 'get',
					params: {
						uid: that.$route.params.uid,
						id: that.$route.params.item.id
					}
				})
				.then(res => {
					let needData = res.data;
					if (needData.code == 200) {
						needData.data.education_end_time = needData.data.education_end_time==""? "" : new Date(needData.data.education_end_time);
						needData.data.degree_time = needData.data.degree_time==""? "" : new Date(needData.data.degree_time);
						needData.data.education = that.getArray(needData.data.eduction_array);
						needData.data.degree = that.getArray(needData.data.degree_array);
						that.degreeForm = Object.assign({},needData.data);
						
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
		this.getList('DT10', 'education_type_list');
		this.getList('GB6864', 'degree_list');
		this.getList('A08001A', 'edu_list');
		if (this.$route.params.item) {
			this.url = '/v1/degree/edit';
			this.getDetail();
		}
	}
}
</script>
<style>
.ivu-select-dropdown {
	width: auto;
}
</style>
