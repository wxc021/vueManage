<!--党组织管理/批量修改弹窗-->
<template>
<div class="BatchUpdate">
	<Modal v-model="modal1" title="批量修改" width="950" :loading="loading" :mask-closable="false" class-name="max-height" @on-ok="handleSubmit('BatchUpdateForm')" @on-cancel="cancel">
		<Form ref="BatchUpdateForm" :model="BatchUpdateForm" :rules="ruleValidate" inline label-position="top">
			<Row>
				<Col span="8">
				<FormItem label="选择信息集 / 信息项：" prop="field" style="width: 95%;">
					<Cascader :render-format="renders" :data="range" v-model="BatchUpdateForm.field"></Cascader>
				</FormItem>
				</Col>
				<Col span="10">
				<FormItem label="修改值：" style="width: 95%;">
					<!-- 树 -->
					<Input v-if="type=='4'" v-model="org_name" @click.native="popTree" placeholder="请输入"></Input>
					<!-- 输入框 -->
					<Input v-if="type=='3'" v-model="BatchUpdateForm.value" placeholder="请输入"></Input>
					<!-- 下拉 -->
					<Select v-if="type=='1'" v-model="BatchUpdateForm.value" filterable placeholder="请选择" :transfer=true>
						<Option v-for='item in list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
					</Select>
					<!-- 日期 -->
					<DatePicker v-if="type=='2'" :transfer=true v-model="BatchUpdateForm.value" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
					<!--级联 -->
					<Cascader :render-format="renders" v-if="type=='5'" :data="CascaderData" v-model="BatchUpdateForm.value"></Cascader>
				</FormItem>
				</Col>
			</Row>
			<Row>
				<Table border @on-select-all='select' @on-select='select' :columns="columns1" :data="data1"></Table>
			</Row>
		</Form>
	</Modal>
	<infoTree v-if="treeShow" @setConfirm="setConfirm" @setCancer="setCancer" title="请选择单位" :params='params' :setid="setid"></infoTree>
</div>
</template>

<script>
import areaData from '@/lib/area.js'
import infoTree from '@/components/pop/baseInfoTypeTree.vue'
export default {
	name: 'CombinationQuery',
	data() {
		return {
			modal1: true, //是否显示弹窗
			loading: true,
			dept_id: this.$route.query.dept_id,
			type2: this.$route.query.type,
			list: [],
			areaData: areaData,
			CascaderData : [],
			type: '3',
			data1: [],
			treeShow: false,
			setid: '',
			org_name: '',
			params: {
				org_id: this.$route.params.dept ? this.$route.params.dept : ''
			},

			range2: { // 1下拉 2日期 3输入框 4树 5级联
				'nation': {
					'type': 1,
					'code': "A01017",
					'data': [],
				},
				'native': {
					'type': 5,
					'code': "A01011B",
					'data': areaData,
				},
				'hr_org': {
					'type': 4,
				},
				'profession_duty': {
					'type': 5,
					'code': "GB8561",
					'data': [],
				},
				'hardlife_type': {
					'type': 1,
					'code': "C11001",
					'data': [],
				},
				'health': {
					'type': 5,
					'code': "A01027",
					'data': [],
				},
				'min_guarantee': {
					'type': 1,
					'data': [{
						'id': 1,
						'name': '是'
					}, {
						'id': 2,
						'name': '否'
					}],
				},
				'is_saved': {
					'type': 1,
					'data': [{
						'id': 1,
						'name': '是'
					}, {
						'id': 2,
						'name': '否'
					}],
				},
				'before_country_without_job': {
					'type': 5,
					'code': "KZ66",
					'data': [],
				},
				'hardlife_ext': {
					'type': 3,
				},
				'apply_date': {
					'type': 2,
				},
				'active_date': {
					'type': 2,
				},
				'train_date': {
					'type': 2,
				},
				'develop_date': {
					'type': 2,
					'data': [],
				},
				'country': {
					'type': 5,
					'code': "A12001A",
					'data': [],
				},
				'abroad_time': {
					'type': 2,
				},
				'abroad_reason': {
					'type': 5,
					'code': "A12014",
					'data': [],
				},
				'concat': {
					'type': 1,
					'code': "C09003",
					'data': [],
				},
				'back': {
					'type': 5,
					'code': "C09006",
					'data': [],
				},
				'back_time': {
					'type': 2,
				},
				'recover': {
					'type': 1,
					'code': "C09007",
					'data': [],
				},

			},
			range: [{
				"value": "1",
				"label": "基本情况",
				"children": [{
					"value": "nation",
					"label": "民族",
					"code": "A01017",
				}, {
					"value": "native",
					"label": "籍贯",
				}, {
					"value": "hr_org",
					"label": "人事关系所在单位",
				}, {
					"value": "profession_duty",
					"label": "专业技术职务",
				}]
			}, {
				"value": "2",
				"label": "发展培养",
				"children": [{
					"value": "apply_date",
					"label": "申请入党日期",
				}, {
					"value": "active_date",
					"label": "列为积极分子日期",
				}, {
					"value": "train_date",
					"label": "参加培训日期",
				}, {
					"value": "develop_date",
					"label": "列为发展对象日期",
				}]
			}, {
				"value": "3",
				"label": "困难党员",
				"children": [{
					"value": "hardlife_type",
					"label": "困难党员类型",
				}, {
					"value": "health",
					"label": "健康状况",
				}, {
					"value": "min_guarantee",
					"label": "是否享受城镇最低生活保障费",
				}, {
					"value": "is_saved",
					"label": "是否享受优抚对象抚恤补助",
				}, {
					"value": "before_country_without_job",
					"label": "建国前入党没有工作老党员",
				}, {
					"value": "hardlife_ext",
					"label": "生活困难补充情况",
				}]
			}, {
				"value": "4",
				"label": "出国出境",
				"children": [{
					"value": "country",
					"label": "国家",
				}, {
					"value": "abroad_time",
					"label": "出国时间",
				}, {
					"value": "abroad_reason",
					"label": "出国原因",
				}, {
					"value": "concat",
					"label": "出国党员和党组织联系情况",
				}, {
					"value": "back",
					"label": "回国情况",
				}, {
					"value": "back_time",
					"label": "回国时间",
				}, {
					"value": "recover",
					"label": "恢复组织生活情况",
				}]
			}],
			BatchUpdateForm: {
				field: [],
				value: '',
				uids: [],
			},
			ruleValidate: {
				field: [{
					required: true,
					type: 'array',
					message: '请选择信息集/信息项',
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
			columns1: [{
					type: 'selection',
					width: 60,
					align: 'center'
				},
				{
					title: '姓名',
					key: 'real_name',
                    width:'100'
				},
				{
					title: '性别',
					key: 'sex',

				},
				{
					title: '身份证号',
					key: 'idcard',
					width: 200
				},
				{
					title: '民族',
					key: 'nation'
				},
				{
					title: '手机号码',
					key: 'mobile',
				},
			],

		}
	},
	components: {
		infoTree,
	},
	watch: {
		'BatchUpdateForm.field' (newval, oldval) {
			console.log(newval);
			
			let key = newval[1];
			let data = this.range2;
			this.type = data[key].type;
			this.BatchUpdateForm.value = "";
			this.org_name = "";
			if (data[key].type == '1') {
				let _data = data[key].data;
				if (_data.length <= 0) {
					this.getList(data[key].code, 'list');
				} else {
					this.list = _data;
				}
			} else if (data[key].type == '5') {
				let _data = data[key].data;
					if (_data.length <= 0) {
						this.getList(data[key].code, 'CascaderData');
					} else {
						this.CascaderData = _data;
					}
				this.BatchUpdateForm.value = [];
				
			}
		},
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
		getArray(obj) {
			return obj.map(function(item) {
				return item.id
			});
		},
		popTree() {
			this.treeShow = true;
		},
		setConfirm(item) {
			this.treeShow = false;
			this.BatchUpdateForm.value = item.data.nid;
			this.org_name = item.data.name;
		},
		setCancer() {
			this.treeShow = false;
		},
		select(selection) {
			let that = this;
			that.BatchUpdateForm.uids = [];
			selection.forEach(function(item) {
				that.BatchUpdateForm.uids.push(item.id);
			});
		},
		getList(type,arr) {
			let that = this;
			let qs = require('qs');
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
						}, 0)
					} else {
						that.$Message.error(needData.msg);
					}
				})
				.catch(err => {
					this.$Message.error('网络请求异常');
				});
		},
		handleSubmit(name) {
			let that = this;
			this.$refs[name].validate((valid) => {
				if (valid) {
					//this.$Message.success('提交成功!');
					//this.modal1=false;
					if (that.BatchUpdateForm.value == '' || that.BatchUpdateForm.value.length <= 0) {
						this.$Message.warning('请填写修改值');
						setTimeout(() => {
							that.loading = false;
							that.$nextTick(() => {
								that.loading = true;
							});
						}, 1000);
					} else if (that.BatchUpdateForm.uids.length == 0) {
						this.$Message.warning('请选择人员');
						setTimeout(() => {
							that.loading = false;
							that.$nextTick(() => {
								that.loading = true;
							});
						}, 1000);
					} else {
						let postData = Object.assign({},that.BatchUpdateForm);						
						if (postData.value instanceof Date) {
							postData.value = that.filters.dateFormat(postData.value)
						} else if (postData.value instanceof Array) {
							postData.value = that.getLastValue(postData.value);
						}
						postData.field = JSON.parse(JSON.stringify(that.BatchUpdateForm.field));
						postData.field =that.getLastValue(postData.field);
						let qs = require('qs');
						that.axios({
								url: '/v1/member/info-batch-edit',
								method: 'post',
								data: qs.stringify(postData)
							})
							.then(res => {
								let needData = res.data;
								if (needData.code == 200) {
									this.$Message.success('提交成功!');
									this.modal1 = false;
									this.$router.push({
										path: '/dangyuan/' + this.dept_id + '?type=' + this.type2
									});
								} else {
									that.$Message.error(needData.msg);
									setTimeout(() => {
										that.loading = false;
										that.$nextTick(() => {
											that.loading = true;
										});
									}, 1000);
								}
							})
							.catch(err => {
								this.Message.error('网络请求异常');
								setTimeout(() => {
									that.loading = false;
									that.$nextTick(() => {
										that.loading = true;
									});
								}, 1000);
							})

					}
				} else {
					this.loading = false;
					this.$Message.error('表单验证失败!');
					setTimeout(() => {
						this.loading = true;
					}, 20);
				}
			})
		},
		getPerson(id) {
			let that = this;
			if (!id) {
				return
			}
			that.axios({
					url: '/v1/member/list',
					method: 'get',
					params: {
						dept_id: id,
						opt: 1,
						group: that.$route.query.type == 6 ? 1 : "",
					},
				})
				.then(res => {
					let needData = res.data;
					if (needData.code == 200) {
						that.data1 = needData.data;
					} else {
						that.Message.error(needData.msg);
					}
				})
				.catch(err => {
					this.Message.error('网络请求异常');
				})
		},
		cancel() {
			this.$router.push({
				path: '/dangyuan/' + this.dept_id + '?type=' + this.type2
			});
		}
	},
	mounted() {
		this.getPerson(this.dept_id)
	},
}
</script>

<style>
.box-wrap {
	width: 100%;
	height: 180px;
	border: 1px solid #dddee1;
	-webkit-border-radius: 2px;
	-moz-border-radius: 2px;
	border-radius: 2px;
	;
	margin-top: 20px;
}

.bold {
	font-weight: bold;
	font-size: 14px;
}

.fr {
	float: right;
}

.mr-5 {
	margin-right: 10px;
	padding-left: 25px;
	padding-right: 25px;
}

.ml-10 {
	margin-left: 10px;
}

.mb10 {
	margin-bottom: 10px;
}

.w100 {
	width: 100px;
}

.BatchUpdate {
	min-height: 400px;
}

.BatchUpdate .ivu-modal-body {
	min-height: 400px;
}
</style>
