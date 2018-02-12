
<!-- 党员管理、新增党员弹窗 -->
<template>
  <div class="AddPartyMember">
    <Modal
      v-model="modal1"
      title="新增党员"
      width="950"
      :styles="{top: '20px'}"
      :mask-closable=false
      class-name="max-height"
      :loading="loading"
      :transfer=true
      @on-ok="handleSubmit('PartyMemberForm')"
      @on-cancel="cancel">
        <Form ref="PartyMemberForm" :model="PartyMemberForm"  :label-width="150" :rules="ruleValidate">
          <Row>
            <Col span="12">
              <FormItem label="姓名" prop="real_name">
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
                 <Cascader :data="areaData" v-model="PartyMemberForm.native"></Cascader>
              </FormItem>
              <FormItem label="出生日期：" prop="birthday">
                <DatePicker  :transfer=true v-model="PartyMemberForm.birthday" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
              </FormItem>
            	<FormItem label="居民身份证号" prop="idcard">
                <Input v-model="PartyMemberForm.idcard" placeholder="请输入"></Input>
              </FormItem>
            	<FormItem label="人事关系所在单位：" prop="hr_org">
                  <!-- <Select v-model="PartyMemberForm.hr_org" filterable placeholder="请选择"  :transfer=true>
                    <Option value="1">男</Option>
                    <Option value="4">女</Option>
                  </Select> -->
                  <Input v-model="PartyMemberForm.hr_org_name" placeholder="请选择人事关系所在单位" @click.native="popTree"></Input>

              </FormItem>
              <FormItem label="参加工作日期：" prop="">
                <DatePicker  :transfer=true v-model="PartyMemberForm.begin_work_date" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
              </FormItem>
              <FormItem label="专业技术资格：" prop="">
                  <Select v-model="PartyMemberForm.profession_qualification" filterable placeholder="请选择"  :transfer=true @mouseenter.native.self="getList('GB8561','profession_qualification_list')">
                    <Option v-for='item in profession_qualification_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                  </Select>
              </FormItem>
              <FormItem label="专业技术职务：" prop="">
                  <!--<Select v-model="PartyMemberForm.profession_duty" filterable placeholder="请选择"  :transfer=true  @mouseenter.native.self="getList('B8561','profession_duty_list')">-->
                    <!--<Option v-for='item in profession_duty_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>-->
                  <!--</Select>-->
                <select v-model="PartyMemberForm.profession_duty" style="width:100%;height: 32px;" @mouseenter.native.self="getList('B8561','profession_duty_list')">
                  <option v-for='item in profession_duty_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</option>
                </select>



              </FormItem>
              <FormItem label="其他党团：" prop="">
                  <Select v-model="PartyMemberForm.other_party" filterable placeholder="请选择"  :transfer=true  @mouseenter.native.self="getList('DT11','other_party_list')">
                    <Option v-for='item in other_party_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                  </Select>
              </FormItem>
              <FormItem label="其他党团开始日期：" prop="">
                <DatePicker  :transfer=true v-model="PartyMemberForm.other_party_time" type="date" format="yyyy-MM-dd" filterable placeholder="选择日期" style="width:309px"></DatePicker>
              </FormItem>
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
                  <Select v-model="PartyMemberForm.family_police_station" filterable remote :remote-method="getPaichusuo"  clearable  :loading="loading_p" placeholder="请选择"  :transfer=true >
                    <Option v-for='item in family_police_station_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                  </Select>
                   <!-- @mouseenter.native.self="getList('DT01','family_police_station_list')" -->
              </FormItem>
              <FormItem label="教育类型：" prop="education_type">
                  <Select v-model="PartyMemberForm.education_type" filterable placeholder="请选择"  :transfer=true @mouseenter.native.self="getList('DT10','education_type_list')">
                    <Option v-for='item in education_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                  </Select>
              </FormItem>
            </Col>

            <Col span="12">
              <FormItem label="头像：" prop="">
                <div class="start-box box-pack" style="height:100%;width:100%; position: realtive;">
                  <img class="box-flex" style="vertical-align: middle;margin-right:20px" width="45%" height="auto" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504504890477&di=81778cd891dbae7678c7c6195e405c10&imgtype=0&src=http%3A%2F%2Fimg0.ph.126.net%2FpSxeSbCemym5GdkP87hocA%3D%3D%2F2280791736303314424.jpg" alt="">
                  <Button class="box-flex" type="ghost">
                    <vue-core-image-upload
                    :class="['btn', 'btn-primary']"
                    :crop="true"
                    crop="local"
                    text="头像上传"
                    credentials="true"
                    @imageuploaded="imageuploaded"
                    @imagechanged="imagechanged"
                    :data="postData"
                    :max-file-size="5242880"
                    beforeurl="/v1/file/uptoken"
                    url="http://192.168.41.175/upload.php" >
                    </vue-core-image-upload>
                  </Button>
                  
                </div>
              </FormItem>
              <FormItem label="学历：" prop="education">
                  <Select v-model="PartyMemberForm.education" filterable placeholder="请选择"  :transfer=true @mouseenter.native.self="getList('A08001A','edu_list')">
                    <Option v-for='item in edu_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                  </Select>
              </FormItem>
              <FormItem label="毕业日期：" prop="education_end_time">
                <DatePicker  :transfer=true v-model="PartyMemberForm.education_end_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
              </FormItem>
              <FormItem label="学位：" prop="">
                  <Select v-model="PartyMemberForm.degree" filterable placeholder="请选择"  :transfer=true  @mouseenter.native.self="getList('GB6864','degree_list')" >
                    <Option v-for='item in degree_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                  </Select>
              </FormItem>
              <FormItem label="学位授予日期：" prop="">
                <DatePicker  :transfer=true v-model="PartyMemberForm.degree_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
              </FormItem>
              <FormItem label="工作岗位开始日期：" prop="work_start_time">
                <DatePicker  :transfer=true v-model="PartyMemberForm.work_start_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
              </FormItem>
              <FormItem label="工作岗位：" prop="work_type">
                  <Select v-model="PartyMemberForm.work_type" filterable placeholder="请选择"  :transfer=true @mouseenter.native.self="getList('A48007','work_type_list')">
                    <Option v-for='item in work_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>

                  </Select>
              </FormItem>
               <FormItem label="是否为农民工：">
                  <Select v-model="PartyMemberForm.is_migrant_worker" filterable placeholder="请选择"  :transfer=true>
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>
              </FormItem>
               <FormItem label="新社会阶层类型：">
                  <Select v-model="PartyMemberForm.social_type" filterable placeholder="请选择"  :transfer=true @mouseenter.native.self="getList('A39041','social_type_list')">
                    <Option v-for='item in social_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                  </Select>
              </FormItem>
              <FormItem label="一线情况：">
                  <Select v-model="PartyMemberForm.is_front" filterable placeholder="请选择"  :transfer=true @mouseenter.native.self="getList('A39044','is_front_list')">
                    <Option v-for='item in is_front_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                  </Select>
              </FormItem>
              <FormItem label="入党日期：" prop="party_date">
                <DatePicker  :transfer=true v-model="PartyMemberForm.party_date" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
              </FormItem>
              <!--这个还没有-->
              <FormItem label="入党类型：" prop="join_source">
                  <Select v-model="PartyMemberForm.join_source" placeholder="请选择"  :transfer=true @mouseenter.native.self="getList('C02011','join_source_list')">
                    <Option v-for='item in join_source_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                  </Select>
              </FormItem>
              <!--这个还没有 end-->

              <FormItem label="转正日期：" prop="">
                <DatePicker  :transfer=true v-model="PartyMemberForm.join_party_date" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
              </FormItem>
              <FormItem label="转正情况：" prop="">
                  <Select v-model="PartyMemberForm.to_normal_type" filterable placeholder="请选择"  :transfer=true  @mouseenter.native.self="getList('C02018','to_normal_type_list')">
                    <Option v-for='item in to_normal_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                  </Select>
              </FormItem>
              <FormItem label="进入当前党支部日期：" prop="join_dept_time">
                <DatePicker  :transfer=true v-model="PartyMemberForm.join_dept_time" type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>
              </FormItem>
              <FormItem label="进入当前党支部类型：" prop="join_dept_type">
                  <Select v-model="PartyMemberForm.join_dept_type" placeholder="请选择" :transfer=true placement='top'  @mouseenter.native.self="getList('C03043','join_dept_type_list')">
                    <Option v-for='item in join_dept_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                  </Select>
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
  // import VueCoreImageUpload  from 'vue-core-image-upload'
  import VueCoreImageUpload from '@/upload/index.js'


  export default {
    name:'AddPartyMember',
    data () {
      return {
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        postData: {},
        treeShow: false,
        setid: '',//编辑的时候传入的id
        params:{org_id:this.$route.params.dept ? "" : ''},
        modal1: true,
        loading: true,
        loading_p:false,
        nation_list:[],//民族列表
        edu_list:[],//学历列表
        degree_list:[],//学位列表
        education_type_list:[],//教育类别
        family_police_station_list:[],//派出所
        social_type_list:[],//社会阶层
        is_front_list:[],//一线情况
        profession_duty_list:[],//专业技术职务
        to_normal_type_list:[],//转正情况
        join_dept_type_list:[],//党支部类型
        work_type_list:[],//工作岗位
        join_source_list:[],//入党类型
        profession_qualification_list:[],//专业技术资格
        other_party_list:[],//其他党团
        areaData:areaData,
        dept_id:this.$route.query.dept_id,
        PartyMemberForm: {
          dept_id:"",//党组织id
          real_name:"",//真实姓名
          nation:"",//民族
          join_source:"",//加入中共组织的类型
          native:[],//籍贯
          join_dept_time:"",//进入党支部日期
          hr_org:"",//人事关系所在部门
          hr_org_name:'',
          birthday:"",//出生年月日
          party_date:"",//入党时间
          join_dept_type:"",//进入党支部类型
          education:"",//学历
          education_type:"",//教育类别
          education_end_time:"",//毕业日期
          sex:"",//性别
          spell_name:"",//姓名简拼
          work_type:"",//工作岗位
          idcard:"",//身份证号
          work_start_time:"",//工作岗位开始日期
          begin_work_date:"",//参加工作日期
          profession_qualification:"",//专业技术资格
          profession_duty:"",//专业技术职务
          other_party:"",//人当前参加的某一党派组织的代码
          other_party_time:"",//加入其他党团日期
          mobile:"",//手机号
          family_phone:"",//住宅电话
          family_address:"",//家庭住址
          family_police_station:"",//户口所在派出所
          degree:"",//学位
          degree_time:"",//学位授予日期
          is_migrant_worker:"",//是否是农民工
          is_front:"",//一线情况
          join_party_date:"",//党员正式转正时间
          to_normal_type:"",//转正情况
        },
        ruleValidate: {
          real_name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '性别不能为空', trigger: 'change'}
          ],
          nation: [
            {required: true, message: '民族不能为空', trigger: 'change'}
          ],
          native: [
            {required: true,type:'array', message: '籍贯不能为空', trigger: 'change'}
          ],
          birthday: [
            {required: true, message: '出生日期不能为空', trigger: 'change',type:'date'}
          ],
          idcard: [
            {required: true, message: '身份证号不能为空', trigger: 'blur'}
          ],
          join_source: [
            {required: true, message: '入党类型不能为空', trigger: 'change'}
          ],
           hr_org: [
            {required: true, message: '人事关系所在部门不能为空', trigger: 'change'}
          ],
           education_type: [
            {required: true, message: '教育类型不能为空', trigger: 'change'}
          ],
           education: [
            {required: true, message: '学历不能为空', trigger: 'change'}
          ],
           education_end_time: [
            {required: true, message: '毕业日期不能为空', trigger: 'change',type:'date'}
          ],
           work_start_time: [
            {required: true, message: '参加工作日期不能为空', trigger: 'change',type:'date'}
          ],
          work_start_time: [
            {required: true, message: '工作岗位开始日期不能为空', trigger: 'change',type:'date'}
          ],
          work_type:[
            {required: true, message: '工作岗位不能为空', trigger: 'change'}
          ],
          party_date: [
            {required: true, message: '入党日期不能为空', trigger: 'change',type:'date'}
          ],
          join_dept_time: [
            {required: true, message: '进入党支部日期不能为空', trigger: 'change',type:'date'}
          ],
          join_dept_type: [
            {required: true, message: '党进入党支部类型不能为空', trigger: 'change'}
          ],
          join_source: [
            {required: true, message: '入党类型不能为空', trigger: 'change'}
          ],
        },
        filters:{
          dateFormat(value){
            if(value==''){return}
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
      }
    },
		mounted(){

    },
    components: {
      infoTree,
      VueCoreImageUpload
    },
    methods: {
      imagechanged(res) {
        // console.log(res)
        this.postData.size = res.size;
        // console.log(this.postData)
      },
      imageuploaded(res) {
        if (res.errcode == 0) {
          this.src = 'http://img1.vued.vanthink.cn/vued751d13a9cb5376b89cb6719e86f591f3.png';
        }
      },
      handleSubmit(name) {
        let that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.modal1=false;
						let _data={};
            for (let item in that.PartyMemberForm) {
              _data[item] = that.PartyMemberForm[item]
            }
            _data['dept_id'] = that.dept_id;
            _data.native = _data.native[2];
            for (let key in _data) {
              if (key.indexOf('date')>=0||key.indexOf('time')>=0||key=="birthday") {
                _data[key] = that.filters.dateFormat(_data[key])
              }
            }
				    let qs = require('qs');
						this.axios({
					    method: 'POST',
							url: '/v1/member/add',
						  data: qs.stringify(_data),
						})
						.then(res => {
						    let needData = res.data;
						    if (needData.code == 200) {
                    this.$Message.success('提交成功!');
                    setTimeout(()=>{
 				              this.$router.push({path:'/dangyuan/'+this.dept_id});
                    },200);

						    } else {
                    that.$Message.error(needData.msg);
										setTimeout(()=>{
 				              this.$router.push({path:'/dangyuan/'+this.dept_id});
                    },200)
						    }
						})
						.catch(err => {
                this.$Message.error('网络请求异常');
                setTimeout(() => {
                  this.$router.push({path:'/dangyuan/'+this.dept_id});
		            }, 20);

						})
	          } else {
		            this.loading=false;
		            this.$Message.error('表单验证失败!');
		            setTimeout(() => {
		              this.loading=true;
		            }, 20);
	          }
        })
      },
      getList(type,arr){
  			let that = this;
      	let qs = require('qs');
      	if(that[arr].length>1){
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
      cancel () {
 				this.$router.push({path:'/dangyuan/'+this.dept_id});
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
      getPaichusuo(query){
          let that = this;
          if(query!==""){
            that.loading_p = true;
            setTimeout(()=>{
              let qs = require('qs');
              that.axios({
                method:'get',
                url:'v1/dictionary/police-station-list',
                params:{
                  keywords:query
                },
              })
              .then(res=>{
                that.loading_p = false;
                let needData = res.data;
                if (needData.code == 200) {
                  setTimeout(()=>{
                    that.family_police_station_list = needData.data;
                  },200)
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
 .ivu-select-dropdown.ivu-date-picker-transfer{
    width: auto!important;
  }
</style>
