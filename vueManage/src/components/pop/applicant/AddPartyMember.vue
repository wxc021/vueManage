
<!-- 党员管理、新增党员弹窗 -->
<template>
<div class="AddPartyMember">
	<Modal 
	    v-model="modal1"
        title="新增申请人"
        width="950"
        :loading="loading"
        :mask-closable="false"
        :closable="false"
        class-name="max-height vertical-center-modal"
        @on-ok="handleSubmit('PartyMemberForm')"
        @on-cancel="cancel">
		<Form ref="PartyMemberForm" :model="PartyMemberForm" :label-width="150" :rules="ruleValidate">
			<Row>
				<Col span="12">
				<FormItem label="头像：" prop="">
					<div class="" style="height:100%;width:100%;">
						<img class="" style="vertical-align: middle;margin-right:20px;width:45%;height:auto;" :src="src" alt="">
						<!-- <Button class="" type="ghost">更换头像</Button> -->
						<Button class="" type="ghost">
							<vue-core-image-upload
							:class="['btn', 'btn-primary']"
							:crop="true"
							cropRatio="5:7"
							crop="local"
							text="头像上传"
							credentials="true"
							@imageuploaded="imageuploaded"
							@imagechanged="imagechanged"
							:data="postData"
							:max-file-size="5242880"
							beforeurl="/v1/file/uptoken"
							:url="getUploadUrl" >
							</vue-core-image-upload>
						</Button>
					</div>
				</FormItem>
				<FormItem label="姓名：" prop="real_name">
					<Input v-model="PartyMemberForm.real_name" placeholder="请输入姓名"></Input>
				</FormItem>
				<FormItem label="性别：" prop="sex">
					<Select v-model="PartyMemberForm.sex" placeholder="请选择" :transfer=true>
						<Option value="1">男</Option>
						<Option value="2">女</Option>
					</Select>
				</FormItem>
				<FormItem label="民族：" prop="nation">
					<Select v-model="PartyMemberForm.nation" filterable placeholder="请选择" :transfer=true @mouseenter.native.self="getList('A01017','nation_list')">
						<Option v-for="item in nation_list"  :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem label="籍贯：" prop="native">
					<Cascader :render-format="renders" change-on-select :data="areaData" v-model="PartyMemberForm.native"></Cascader>
				</FormItem>
				<FormItem label="出生日期：" prop="birthday">
					<DatePicker :transfer=true v-model="PartyMemberForm.birthday" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
				</FormItem>
				<FormItem label="居民身份证号：" prop="idcard">
					<Input v-model="PartyMemberForm.idcard" placeholder="请输入"></Input>
				</FormItem>
				<FormItem label="人事关系所在单位：" prop="hr_org">
					<Input v-model="PartyMemberForm.hr_org_name" placeholder="请选择人事关系所在单位" @click.native="popTree"></Input>
				</FormItem>
				<FormItem label="参加工作日期：" prop="">
					<DatePicker :transfer=true v-model="PartyMemberForm.begin_work_date" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
				</FormItem>
				<FormItem label="专业技术职务：" prop="">
					<Cascader :render-format="renders" :transfer=true :data="profession_duty_list" v-model="PartyMemberForm.profession_duty"></Cascader>
				</FormItem>
				<FormItem label="其他党团：" prop="">
					<Select v-model="PartyMemberForm.other_party" filterable placeholder="请选择" :transfer=true @mouseenter.native.self="getList('DT11','other_party_list')">
						<Option v-for='item in other_party_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem label="其他党团开始日期：" prop="">
					<DatePicker :transfer=true v-model="PartyMemberForm.other_party_time" type="date" format="yyyy-MM-dd" filterable placeholder="选择日期" style="width:309px"></DatePicker>
				</FormItem>
				
				</Col>

				<Col span="12">
				<FormItem label="手机号码：" prop="">
					<Input v-model="PartyMemberForm.mobile" placeholder="请输入"></Input>
				</FormItem>
				<FormItem label="住宅电话：" prop="">
					<Input v-model="PartyMemberForm.family_phone" placeholder="请输入"></Input>
				</FormItem>
				<FormItem label="家庭住址：" prop="">
					<Input v-model="PartyMemberForm.family_address" placeholder="请输入"></Input>
				</FormItem>
				<FormItem label="户口所在派出所：" prop="">
					<!-- <Select v-model="PartyMemberForm.family_police_station" filterable remote :remote-method="getPaichusuo" clearable :loading="loading_p" placeholder="请选择" :transfer=true>
						<Option v-for='item in family_police_station_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
					</Select> -->
					<Cascader :render-format="renders"  :data="family_police_station_list" v-model="PartyMemberForm.family_police_station"></Cascader>

				</FormItem>
				<FormItem label="教育类型：" prop="education_type">
					<Select v-model="PartyMemberForm.education_type" filterable placeholder="请选择" :transfer=true @mouseenter.native.self="getList('DT10','education_type_list')">
						<Option v-for='item in education_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem label="学历：" prop="education">
					<Cascader :render-format="renders" :transfer=true :data="edu_list" v-model="PartyMemberForm.education"></Cascader>
				</FormItem>
				<FormItem label="毕业日期：" prop="education_end_time">
					<DatePicker :transfer=true v-model="PartyMemberForm.education_end_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
				</FormItem>
				<FormItem label="学位：" prop="">
					<Cascader :render-format="renders" :transfer=true :data="degree_list" v-model="PartyMemberForm.degree"></Cascader>
				</FormItem>
				<FormItem label="学位授予日期：" prop="">
					<DatePicker :transfer=true v-model="PartyMemberForm.degree_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
				</FormItem>
				<FormItem label="工作岗位开始日期：" prop="work_start_time">
					<DatePicker :transfer=true v-model="PartyMemberForm.work_start_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
				</FormItem>
				<FormItem label="工作岗位：" prop="work_type">
					<!-- <Select v-model="PartyMemberForm.work_type" filterable placeholder="请选择" :transfer=true @mouseenter.native.self="getList('A48007','work_type_list')">
						<Option v-for='item in work_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
					</Select> -->
					<Cascader :render-format="renders" :transfer=true :data="work_type_list" v-model="PartyMemberForm.work_type"></Cascader>

				</FormItem>
				<FormItem label="是否为农民工：">
					<Select v-model="PartyMemberForm.is_migrant_worker" filterable placeholder="请选择" :transfer=true>
						<Option value="1">是</Option>
						<Option value="0">否</Option>
					</Select>
				</FormItem>
				<FormItem label="新社会阶层类型：">
					<!-- <Select v-model="PartyMemberForm.social_type" filterable placeholder="请选择" :transfer=true @mouseenter.native.self="getList('A39041','social_type_list')">
						<Option v-for='item in social_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
					</Select> -->
					<Cascader :render-format="renders" :transfer=true :data="social_type_list" v-model="PartyMemberForm.social_type"></Cascader>

				</FormItem>
				<FormItem label="一线情况：">
					<Select v-model="PartyMemberForm.is_front" filterable placeholder="请选择" :transfer=true @mouseenter.native.self="getList('A39044','is_front_list')">
						<Option v-for='item in is_front_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
					</Select>
				</FormItem>
				<FormItem label="申请入党日期：" prop="apply_date">
					<DatePicker placement='top' :transfer=true v-model="PartyMemberForm.apply_date" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
				</FormItem>
				</Col>
			</Row>
		</Form>
	</Modal>
	<infoTree v-if="treeShow" @setConfirm="setConfirm" @setCancer="setCancer" :params='params' :setid="setid"></infoTree>
</div>
</template>

<script>
import areaData from '@/lib/area.js'
import infoTree from '@/components/pop/baseInfoTypeTree.vue'
import VueCoreImageUpload from '@/upload/index.js'
const IDValidator = require('id-validator');
const GB2260 = require('id-validator/src/GB2260');

const Validator = new IDValidator( GB2260 );
export default {
	name: 'AddPartyMember',
	data() {
		const validatePass = (rule, value, callback) => {
	          if (value === '') {
	              callback(new Error('身份证号不能为空'));
	          } else {
	          	let temp = Validator.isValid( value );

	            if (!temp) {
	                callback(new Error('身份证号不合法'));   
	            }
	            callback();
	          }
	    };
		return {
			getUploadUrl: globalUploadUrl,
			treeShow: false,
			setid: '', //编辑的时候传入的id
			params: {
				org_id: this.$route.params.dept ? "" : ''
			},
			modal1: true,
			loading: true,
			loading_p: false,
			type : this.$route.query.type,
			nation_list: [], //民族列表
			edu_list: [], //学历列表
			degree_list: [], //学位列表
			education_type_list: [], //教育类别
			family_police_station_list: [], //派出所
			social_type_list: [], //社会阶层
			is_front_list: [], //一线情况
			profession_duty_list: [], //专业技术职务
			work_type_list: [], //工作岗位
			profession_qualification_list: [], //专业技术资格
			other_party_list: [], //其他党团
			areaData: areaData,
			src: '/static/touxiang.png',
			postData: {},
			thatId: '',
			dept_id: this.$route.query.dept_id,
			PartyMemberForm: {
				dept_id: "", //党组织id
				real_name: "", //真实姓名
				nation: "", //民族
				join_source: [], //加入中共组织的类型
				native: [], //籍贯
				hr_org: "", //人事关系所在部门
				hr_org_name: '',
				birthday: "", //出生年月日
				apply_date: "", //申请入党时间
				education: [], //学历
				education_type: "", //教育类别
				education_end_time: "", //毕业日期
				sex: "", //性别
				spell_name: "", //姓名简拼
				social_type:[],//新社会阶层
				work_type: [], //工作岗位
				idcard: "", //身份证号
				work_start_time: "", //工作岗位开始日期
				begin_work_date: "", //参加工作日期
				profession_qualification: "", //专业技术资格
				profession_duty: [], //专业技术职务
				other_party: "", //人当前参加的某一党派组织的代码
				other_party_time: "", //加入其他党团日期
				mobile: "", //手机号
				family_phone: "", //住宅电话
				family_address: "", //家庭住址
				family_police_station: [], //户口所在派出所
				degree: [], //学位
				degree_time: "", //学位授予日期
				is_migrant_worker: "", //是否是农民工
				is_front: "", //一线情况
				join_party_date: "", //党员正式转正时间
			},
			ruleValidate: {
				real_name: [{
					required: true,
					message: '姓名不能为空',
					trigger: 'blur'
				}],
				sex: [{
					required: true,
					message: '性别不能为空',
					trigger: 'change'
				}],
				nation: [{
					required: true,
					message: '民族不能为空',
					trigger: 'change'
				}],
				native: [{
					required: true,
					type: 'array',
					message: '籍贯不能为空',
					trigger: 'change'
				}],
				birthday: [{
					required: true,
					message: '出生日期不能为空',
					trigger: 'change',
					type: 'date'
				}],
				idcard: [{
					required: true,
					message: '身份证号不能为空',
					trigger: 'blur'
				},{ validator: validatePass, trigger: 'blur' }],

				hr_org: [{
					required: true,
					message: '人事关系所在部门不能为空',
					trigger: 'change'
				}],
				education_type: [{
					required: true,
					message: '教育类型不能为空',
					trigger: 'change'
				}],
				education: [{
					required: true,
					message: '学历不能为空',
					trigger: 'change',
					type: 'array'
				}],
				education_end_time: [{
					required: true,
					message: '毕业日期不能为空',
					trigger: 'change',
					type: 'date'
				}],
				work_start_time: [{
					required: true,
					message: '参加工作日期不能为空',
					trigger: 'change',
					type: 'date'
				}],
				work_start_time: [{
					required: true,
					message: '工作岗位开始日期不能为空',
					trigger: 'change',
					type: 'date',
				}],
				work_type: [{
					required: true,
					message: '工作岗位不能为空',
					trigger: 'change',
					type:'array'
				}],
				apply_date: [{
					required: true,
					message: '申请入党日期不能为空',
					trigger: 'change',
					type: 'date'
				}],

			},
			filters: {
				dateFormat(value) {
					if (value == '') {
						return
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
	mounted() {
		this.getList('GB6864', 'degree_list');
		this.getList('A08001A', 'edu_list');
		this.getList('GB8561', 'profession_duty_list')
		this.getList('DT01', 'family_police_station_list');
		this.getList('A48007','work_type_list');
		this.getList('A39041','social_type_list');
	},
	components: {
		infoTree,
		VueCoreImageUpload
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
		imagechanged(res) {
			this.postData.size = res.size;
		},
		imageuploaded(res) {
			if (res.errno == 0) {
				this.$Message.success('上传成功!');
				this.thatId = res.data.filesha1;
				this.src = res.data.fileurl;
			}
		},



		handleSubmit(name) {
			let that = this;
			this.$refs[name].validate((valid) => {
				if (valid) {
					let _data = {};
					for (let item in that.PartyMemberForm) {
						_data[item] = that.PartyMemberForm[item]
					}
					_data['dept_id'] = that.dept_id;
					_data['official_favicon'] = this.thatId;
					_data.native = _data.native[2];
					_data.education = that.getLastValue(_data.education);
					_data.degree = that.getLastValue(_data.degree);
					_data.profession_duty = that.getLastValue(_data.profession_duty);
					_data.family_police_station = that.getLastValue(_data.family_police_station);
					_data.work_type = that.getLastValue(_data.work_type);
					_data.social_type = that.getLastValue(_data.social_type);
					_data.join_source = that.getLastValue(_data.join_source);

					for (let key in _data) {
						if (key.indexOf('date') >= 0 || key.indexOf('time') >= 0 || key == "birthday") {
							_data[key] = that.filters.dateFormat(_data[key])
						}
					}
					if(_data.mobile){
						let reg = /^1\d{10}$/;
						if(!reg.test(_data.mobile)){
							that.$Message.error('请输入正确的手机号')
							setTimeout(() => {
								that.loading = false;
								that.$nextTick(() => {
									that.loading = true;
								});
							}, 1000);
						}
					}
					let qs = require('qs');
					this.axios({
							method: 'POST',
							url: 'v1/member/apply-add',
							data: qs.stringify(_data),
						})
						.then(res => {
							let needData = res.data;
							if (needData.code == 200) {
								this.$Message.success('提交成功!');
								setTimeout(() => {
									this.$router.push({
										name : "applicantlist",
										params : {dept:that.dept_id},
										query : {type:that.type}
									});
								}, 200);
							} else {
								setTimeout(() => {
			                        that.loading = false;
			                        that.$nextTick(() => {
			                            that.loading = true;
			                        });
			                    }, 1000);
			                    let temp = Object.values(needData.data);
								if (temp.length) {
									that.$Message.error(temp[0][0]);
								} else {
									that.$Message.error(needData.msg);
								}
							}
						})
						.catch(err => {
							this.$Message.error('网络请求异常');
							setTimeout(() => {
								this.$router.push({
									name : "applicantlist",
									params : {dept:that.dept_id},
									query : {type:that.type}
								});
							}, 20);

						})
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
		cancel() {
			// this.$router.push({
			// 	path: '/applicantManage/' + this.dept_id + '?type=' + this.type
			// });
this.goback();
		},
		popTree() {
			this.treeShow = true;
		},
		setConfirm(item) {
			this.treeShow = false;
			this.PartyMemberForm.hr_org = item.data.nid;
			this.PartyMemberForm.hr_org_name = item.data.name;
		},
		setCancer() {
			this.treeShow = false;
		},
		getPaichusuo(query) {
			let that = this;
			if (query !== "") {
				that.loading_p = true;
				setTimeout(() => {
					let qs = require('qs');
					that.axios({
							method: 'get',
							url: 'v1/dictionary/police-station-list',
							params: {
								keywords: query
							},
						})
						.then(res => {
							that.loading_p = false;
							let needData = res.data;
							if (needData.code == 200) {
								setTimeout(() => {
									that.family_police_station_list = needData.data;
								}, 200)
							} else {
								that.$Message.error(needData.msg);
							}
						})
						.catch(err => {
							this.$Message.error('网络请求异常');
						});
				});
			}
		},
	}
}
</script>

<style>
.ivu-select-dropdown.ivu-date-picker-transfer {
	width: auto!important;
}
</style>
