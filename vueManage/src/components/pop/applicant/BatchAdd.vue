<!--党组织管理/批量修改弹窗-->
<template>
	<div class="BatchUpdate">
		<Modal
			v-model="modal1"
			title="批量增加"
			width="950"
			:loading="loading"
			:mask-closable=false
			class-name='max-height vertical-center-modal'
			@on-ok="handleSubmit('BatchUpdateForm')"
			@on-cancel="cancel">
			<Form ref="BatchUpdateForm" :model="BatchUpdateForm" :rules="ruleValidate"  inline label-position="top">
				<Row>
					<Col span="8">
						<FormItem label="选择信息集：" prop="type"  style="width: 95%;">
							<Select v-model="BatchUpdateForm.type" placeholder="请选择信息集">
								<Option value="education">学历学位</Option>
								<Option value="work">工作岗位</Option>
							</Select>
						</FormItem>
					</Col>
				</Row>
				<Row v-if="BatchUpdateForm.type=='education'">
					<Col span="6">
						<FormItem label="教育类别"   style="width: 95%;">
							<Select v-model="eduform.education_type" placeholder="请选择">
								<Option v-for='item in education_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
							</Select>
						</FormItem>
						<FormItem label="学位"   style="width: 95%;">
							<!-- <Select v-model="eduform.degree" placeholder="请选择">
								<Option v-for='item in degree_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
							</Select> -->
							<Cascader :render-format="renders" :transfer=true :data="degree_list" v-model="eduform.degree"></Cascader>
							
						</FormItem>
					</Col>
					<Col span="6">
						<FormItem label="学历"   style="width: 95%;">
							<!-- <Select v-model="eduform.education" placeholder="请选择">
								<Option v-for='item in education_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
							</Select> -->
							<Cascader :render-format="renders" :transfer=true :data="education_list" v-model="eduform.education"></Cascader>
							
						</FormItem>
						<FormItem label="学位授予日期"  style="width: 95%;">
							<DatePicker  :transfer=true v-model="eduform.degree_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:218px"></DatePicker>
						</FormItem>
					</Col>
					<Col span="6">
					 <FormItem label="毕业日期"   style="width: 95%;">
							<DatePicker  :transfer=true v-model="eduform.education_end_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:218px"></DatePicker>
						</FormItem>
					</Col>
				</Row>
				<Row v-if="BatchUpdateForm.type=='work'">
				 <Col span="6">
						<FormItem label="工作岗位开始日期"  style="width: 65%;">
							<DatePicker  :transfer=true v-model="workform.work_start_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:218px"></DatePicker>
						</FormItem>
						<FormItem label="新社会阶层类型"   style="width: 95%;">
							<!-- <Select v-model="workform.social_type" placeholder="请选择">
								<Option v-for='item in social_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
							</Select> -->
							<Cascader :render-format="renders" :transfer=true :data="social_type_list" v-model="workform.social_type"></Cascader>

						</FormItem>
					</Col>
					<Col span="6">
						<FormItem label="工作岗位"   style="width: 95%;">
							<!-- <Select v-model="workform.work_type" placeholder="请选择">
								<Option v-for='item in work_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
							</Select> -->
							<Cascader :render-format="renders" :transfer=true :data="work_type_list" v-model="workform.work_type"></Cascader>
							
						</FormItem>
						<FormItem label="一线情况"  style="width: 95%;">
							<Select v-model="workform.is_front" placeholder="请选择">
								<Option v-for='item in is_front_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
							</Select>
						</FormItem>
					</Col>
					<Col span="6">
						<FormItem label="是否农民工"   style="width: 95%;">
							<Select v-model="workform.is_migrant_worker" placeholder="请选择">
								<Option value="1">是</Option>
								<Option value="2">否</Option>
							</Select>
						</FormItem>
						<FormItem label="截止日期"  style="width: 95%;">
							<DatePicker  :transfer=true v-model="workform.work_end_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:218px"></DatePicker>
						</FormItem>
					</Col>
				</Row>
				<Row>
					<Table border @on-select-all='select' @on-select='select' :columns="columns1" :data="data1"></Table>
				</Row>
			</Form>
		</Modal>
	</div>
</template>
<script>
	export default {
		name:'CombinationQuery',
		data () {
			return {
				modal1: true,//是否显示弹窗
				loading: true,
				dept_id:this.$route.query.dept_id,
				type2:this.$route.query.type,
				data1:[],
				education_type_list:[],
				degree_list:[],
				education_list:[],
				work_type_list:[],
				social_type_list:[],
				is_front_list:[],
				eduform:{
					education:[],
					education_type:'',
					education_end_time:'',
					degree:[],
					degree_time:'',
				},
				workform:{
					work_type:[],
					social_type:[],
					is_front:'',
					work_start_time:'',
					work_end_time:'',
					is_migrant_worker:'',
				},
				BatchUpdateForm: {
					type:'',
					data:{},
					uids:[],
				},
				ruleValidate: {
					type: [
						{required: true,message: '请选择信息集', trigger: 'change'}
					],
				},
				filters:{
					dateFormat(value){
						if(value==''){return value}
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
							var t = Y+'-'+ m +'-'+ d;
							return t;
					}
				},
				columns1: [
					{
						type: 'selection',
						width: 40,
						align: 'center'
					},
					{
						title: '姓名',
						key: 'real_name'
					},
					{
						title: '性别',
						key: 'sex',
						
					},
					{
						title: '身份证号',
						key: 'idcard',
						width:200
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
		watch : {
			'BatchUpdateForm.type' (newval,oldval){
				this.resetForm();
				switch (newval) {
					case 'work':
						this.getList('A48007','work_type_list');
						this.getList('A39041','social_type_list');
						this.getList('A39044','is_front_list');
						this.BatchUpdateForm.data = this.workform;
						break;
					case 'education':
						this.getList('DT10','education_type_list');
						this.getList('GB6864','degree_list');
						this.getList('A08001A','education_list');
						this.BatchUpdateForm.data = this.eduform;
						break;
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
			resetForm(){
				for (let key in this.workform) {
					if(key=='work_type'||key=='social_type'){
						this.workform[key] = [];
					}else{
						this.workform[key] = "";
					}
				}
				for (let key in this.eduform) {
					if(key=='education'||key=='degree'){
						this.workform[key] = [];
					}else{
						this.workform[key] = "";
					}
				}
			},
			select(selection){
				let that = this;
				that.BatchUpdateForm.uids = [];
				selection.forEach(function(item) {
					that.BatchUpdateForm.uids.push(item.id);
				});
			},
			getList(type,arr){
				let that = this;
				let qs = require('qs');
				if(that[arr].length>0){
					return
				}
				that.axios({
					method : 'get',
					url : 'v1/dictionary/get-list-by-type',
					params:{
						type:type
					},
				})
				.then(res=>{
					let needData = res.data;
					if (needData.code == 200) {
						setTimeout(()=>{
							that[arr] = needData.data;
						},200)
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
							let postData  = Object.assign({},that.BatchUpdateForm);
							for (let key in postData.data) {
								if (key.indexOf('time')>=0) {
									postData.data[key] = that.filters.dateFormat(postData.data[key])
								}
							}
							postData  = JSON.parse(JSON.stringify(that.BatchUpdateForm));
							if(that.BatchUpdateForm.type=='work'){
								postData.data.work_type = that.getLastValue(postData.data.work_type);
								postData.data.social_type = that.getLastValue(postData.data.social_type); 
								if(postData.data.work_type==""||postData.data.work_start_time==""){
									that.$Message.error('工作岗位/开始时间为必填项')
									setTimeout(() => {
										that.loading = false;
										that.$nextTick(() => {
											that.loading = true;
										});
									}, 1000);
									return;
								}								 
							}else if(that.BatchUpdateForm.type=='education'){
								postData.data.education = that.getLastValue(postData.data.education);
								postData.data.degree = that.getLastValue(postData.data.degree);
								if(postData.data.education==""||postData.data.education_type==""||postData.data.education_end_time==""){
									that.$Message.error('教育类型/学历/毕业时间为必填项')
									setTimeout(() => {
										that.loading = false;
										that.$nextTick(() => {
											that.loading = true;
										});
									}, 1000);
									return;
								}								
							}
							let qs = require('qs')
							that.axios({
								url:'/v1/member/info-batch-add',
								method:'post',
								data:qs.stringify(postData)
							})
							.then(res=>{
								let needData = res.data;
								if (needData.code == 200) {
									this.$Message.success('提交成功!');
									this.modal1=false;
									this.$router.push({path:'/applicantManage/'+this.dept_id+'?type='+this.type2});
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
							.catch(err=>{
								this.$Message.error('网络请求异常');
								setTimeout(() => {
									that.loading = false;
									that.$nextTick(() => {
										that.loading = true;
									});
								}, 1000);
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
			getPerson(id){
				let that = this;
				if(!id){return}
				that.axios({
					url:'/v1/member/applylist',
					method:'get',
					params:{
						dept_id: id,
						opt: 1 ,
						group : that.$route.query.type == 6? 1 : "",
					},
				})
				.then(res=>{
					let needData = res.data;
					if (needData.code == 200) {
						that.data1 = needData.data;
					} else {
							that.Message.error(needData.msg);
					}
				})
				.catch(err=>{
					this.Message.error('网络请求异常');
				})
			},
			cancel () {
				this.$router.push({path:'/applicantManage/'+this.dept_id+'?type='+this.type2});
			}
		},
		mounted(){
			this.getPerson(this.dept_id);
		},
	}
</script>
<style>
	.box-wrap{
		width: 100%;
		height: 180px;
		border: 1px solid #dddee1;
		-webkit-border-radius: 2px;
		-moz-border-radius: 2px;
		border-radius: 2px;;
		margin-top: 20px;
	}
	.bold{
		font-weight: bold;
		font-size: 14px;
	}
	.fr{
		float: right;
	}
	.mr-5{
		margin-right: 10px;
		padding-left:25px ;
		padding-right:25px ;
	}
	.ml-10{
		margin-left: 10px;
	}
	.mb10{
		margin-bottom: 10px;
	}
 .w100{
	 width: 100px;
 }
</style>
