<template>
<div class="memberinfo-base">
    <div class="memberinfo-form">
        <Form ref="infoform" :label-width="0" :model="formModel" :rules="formValidate">
            <Row>
                <Col span="6">
                    <div class="start-box box-orient box-align" style="margin-top:20px;">
                        <img :src="personImg" alt="" class="memberinfo-avatar">
                        <Button class="" type="ghost" size="small" :disabled="!editing" style="margin-top:5px;">
                            <vue-core-image-upload
                            :class="['btn', 'btn-primary']"
                            :crop="true"
                            cropRatio="5:7"
                            crop="local"
                            text="修改头像"
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
                    
                </Col>
                <Col span="18">
                    <Row>
                        <Col span="12">
                            <FormItem class="reset-style" label="姓名" :label-width="0" required prop="real_name">
                                <Input v-model="formModel.real_name" :disabled="!editing"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem class="reset-style" label="简拼" :label-width="0" required prop="spell_name">
                                <Input v-model="formModel.spell_name" :disabled="!editing"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col span="12">
                            <FormItem class="reset-style" label="性别" :label-width="0" required prop="sex">
                                <Select  v-model="formModel.sex" :disabled="!editing" clearable>
                                    <Option v-for="item in formFields.sex" :value="item.id" :key="item.id">{{item.name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem class="reset-style" label="民族" :label-width="0" required prop="nation">
                                <Select v-model="formModel.nation" :disabled="!editing" clearable>
                                    <Option v-for="item in formFields.nation" :value="item.id" :key="item.id">{{item.name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                     <Row>
                        <Col span="12">
                            <FormItem class="reset-style" label="籍贯" required prop="native">
                                <Cascader :render-format="renders" change-on-select v-model="formModel.native" :data="formFields.native" :disabled="!editing"></Cascader>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem class="reset-style" label="出生日期" required prop="birthday">
                                <DatePicker v-model="formModel.birthday" type="date" :disabled="!editing" placeholder="选择日期" style="width: 100%"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </Col>
            </Row>
           
            <Row>
               
                <Col span="12">
                    <FormItem class="reset-style" label="组织关系所在党支部" required prop="dept_id">
                        <Input v-model="formModel.dept_name" :disabled="!editing" placeholder="请选择" @click.native="popTree2"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem class="reset-style" label="人事关系所在单位(部门)" required prop="hr_org">
                        <Input v-model="formModel.hr_org_name" :disabled="!editing" placeholder="请选择" @click.native="popTree"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem class="reset-style" label="居民身份证号" required prop="idcard">
                        <Input v-model="formModel.idcard" :disabled="!editing" placeholder="请输入身份证号"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem class="reset-style" label="参加工作日期">
                        <DatePicker v-model="formModel.begin_work_date" :disabled="!editing" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem class="reset-style" label="手机号码">
                        <Input v-model="formModel.mobile" :disabled="!editing"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem class="reset-style" label="住宅电话">
                        <Input v-model="formModel.family_phone" :disabled="!editing"></Input>
                    </FormItem>
                </Col>
                
            </Row>
            
            <Row>
                <Col span="12">
                    <FormItem class="reset-style" label="家庭住址">
                        <Input v-model="formModel.family_address" :disabled="!editing"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem class="reset-style" label="户口所在派出所">
                        <Cascader :render-format="renders"  :data="family_police_station_list" v-model="formModel.family_police_station"></Cascader>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem class="reset-style" label="其他党团">
                        <Select v-model="formModel.other_party" :disabled="!editing" clearable>
                            <Option v-for="item in formFields.other_party" :value="item.id" :key="item.id">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem class="reset-style" label="加入其他党团日期">
                        <DatePicker v-model="formModel.other_party_time" :disabled="!editing" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem class="reset-style" label="专业技术职务">
                        <Cascader :render-format="renders" v-model="formModel.profession_duty" :data="formFields.profession_duty" :disabled="!editing"></Cascader>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
    <div v-show="editable" class="aside-bottom">
        <Button @click="save(null, $event)" type="primary">保存</Button>
    </div>
    <infoTree v-if="treeShow" @setConfirm="setConfirm" @setCancer="setCancer" :params='params' :setid="setid" :title="title"></infoTree>
    <partyTree v-if="treeShow2" @setConfirm="setConfirm2" @setCancer="setCancer2" :setid="setid2" :title="title2"></partyTree>
</div>
</template>
<script>

// TODO:
// 1.保存接口
// 2.组织关系所在党支部的选择
// 3.人事关系所在单位的选择

import areaData from '@/lib/area.js'
import infoTree from '@/components/pop/baseInfoTypeTree.vue'
import VueCoreImageUpload from '@/upload/index.js'
import partyTree from '@/components/pop/org/partyTree.vue'
const IDValidator = require('id-validator');
const GB2260 = require('id-validator/src/GB2260');

const Validator = new IDValidator( GB2260 );
let formDataWatcher = null;

export default {
    name : 'memberinfo-base',
    props: {
        viewdata : null,
        editable : {
            type : Boolean,
            default : true
        }
    },
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
            title:'人事关系所在单位',
            watch: null,
            title2 : '组织关系所在党支部',
            personImg: '',
            copyImg: '',
            personId: '',
            copyId: '',
            postData: {},
            family_police_station_list:[],
            formModel : {
                hr_org_name                 : '',      //人事单位名称
                real_name                 : '',     // 姓名
                sex                       : '',     // 性别
                spell_name                : '',     // 简拼
                idcard                    : '',     // 身份证号
                native                    : [],     // 籍贯
                nation                    : '',     // 民族
                birthday                  : '',     // 生日
                dept_id                 : '',     // 组织关系所在党支部
                dept_name                 : '',     // 组织关系所在党支部名称
                hr_org                    : '',     // 人事关系所在部门
                begin_work_date           : '',     // 参加工作日期
                profession_duty           : [],     // 专业技术职务
                other_party               : '',     // 该人当前参加的某一党派组织
                other_party_time          : '',     // 该人当前参加的某一党派组织时间
                mobile                    : '',     // 手机号
                family_phone              : '',     // 住宅电话
                family_address            : '',     // 家庭住址\现居住地
                family_police_station     : []     // 户口所在派出所
            },
            treeShow:false,
            treeShow2 : false,
            setid: '',//编辑的时候传入的id
            setid2 : '',
            params:{org_id:this.$route.params.dept ? "" : ''},
            currentData : this.viewdata,
            //editing : true, // 编辑状态
            editing : this.editable, // 编辑状态
            formFields :{
                sex : [{
                    id : '1',
                    name: '男'
                },{
                    id : '2',
                    name: '女'
                }],                       // 性别
                native : areaData,              // 籍贯
                nation : [],                    // 民族
                // profession_qualification : [],  // 专业技术资格
                profession_duty : [],           // 专业技术职务
                other_party : [],                // 其他党团
                family_police_station_loading : false,  // 户口所在派出所加载状态
                family_police_station : [],             // 户口所在派出所
                dept_list : [],//组织关系所在党支部列表
            },
            tempFormData: {},
            formValidate : {
                real_name : { required: true, message: '姓名不能为空', trigger: 'blur' },
                sex : { required: true, message: '请选择性别', trigger: 'blur' },
                spell_name : { required: true, message: '简拼不能为空', trigger: 'blur' },
                nation : { required: true, message: '请选择一个民族', trigger: 'blur' },
                birthday : { required: true, type: 'date', message: '出生日期不能为空', trigger: 'blur' },
                idcard : [
                    {required: true, message: '身份证号不能为空', trigger: 'blur'},
                    {min: 15, max: 18, message: '请输入15-18位身份证号', trigger: 'blur'},
                    {validator: validatePass, trigger: 'blur' }
                ],
                native : {required: true, type: 'array', min:1, message: '请选择一个籍贯', trigger: 'change'},
                dept_id : { required: true, message: '请设置组织关系所在的党支部', trigger: 'blur' },
                hr_org : { required: true, message: '请设置人事关系所在单位', trigger: 'blur' }
            },
            filters:{
                dateFormat(value){
                    if(value == ''){ return value}
                    var date = new Date(value),
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
            }
        }
    },
    components: {
      infoTree,
      VueCoreImageUpload,
      partyTree
    },
    computed : {
        editingData(){
            return Object.assign({}, this.formModel);
        }
    },
    methods:{
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
              this.personId = res.data.filesha1;
              this.personImg = res.data.fileurl;
            }
        },
        getdeptList(){
            let that = this;
            that.axios({
                url:'/v1/dept/get-brother-branch',
                method:'get',
                params:{
                    uid : that.$route.params.uid
                },
            })
            .then(res=>{
                let needData = res.data;
                if (needData.code == 200) {
                    that.formFields.dept_list = needData.data;
                } else {
                      that.$Message.error(needData.msg);
                }
            })
            .catch(err=>{
                that.$Message.error('网络请求异常');
            })
        },
        popTree() {
          if (this.editing) {
            this.treeShow = true;
          };
        },
        setConfirm(item) {
          this.treeShow = false;
          this.formModel.hr_org = item.data.nid;
          this.formModel.hr_org_name = item.data.name;
        },
        setCancer() {
          this.treeShow = false;
        },
        popTree2() {
            let that = this;
            that.axios({
                url:'/v1/relation/moving',
                method:'get',
                params:{
                    uid : that.$route.params.uid
                },
            })
            .then(res => {
                let needData = res.data;
                if (needData.code == 200) {
                    if (needData.data.is_moving) {
                        that.$Message.error('党员'+that.formModel.real_name+'正在组织关系转接流程中，需等待流程结束后或撤销流程才可进行此操作');
                    } else {
                        if (that.editing) {
                            that.treeShow2 = true;
                        }
                    }
                    
                } else {
                    if (that.editing) {
                        that.treeShow2 = true;
                    }
                }
            })
            .catch(err=>{
                that.$Message.error('网络请求异常');
            })    
          
        },
        setConfirm2(item) {
          this.treeShow2 = false;
          this.formModel.dept_id = item.data.nid;
          this.formModel.dept_name = item.data.name;
        },
        setCancer2() {
          this.treeShow2 = false;
        },
        fetchData(id){
            return this.axios({
                method: 'get',
                url: '/v1/member/detail',
                params: {
                    uid: id
                    // uid: 1
                }
            })
        },
        toggleEdit(){
            this.editing = !this.editing
        },
        fetchField(code = ''){
            return this.axios({
                method: 'get',
                url: '/v1/dictionary/get-list-by-type',
                params: {
                    // uid: id
                    type: code
                }
            })
        },
        fetchNationField(){ // 民族
            let _this = this;
            this.fetchField('A01017').then(res => {
                _this.formFields.nation = res.data.data
            });
        },
        fetchSexField(){   // 性别
            let _this = this;
            this.fetchField('A01004').then(res => {
                _this.formFields.sex = res.data.data
            });
        },
        // fetchProQualificationField(){  // 专业技术资格
        //     let _this = this;
        //     this.fetchField('A01004').then(res => {
        //         _this.formFields.profession_qualification = res.data.data
        //     });
        // },
        fetchProDutyField(){  // 专业技术职务
            let _this = this;
            this.fetchField('GB8561').then(res => {
                _this.formFields.profession_duty = res.data.data
            });
        },
        fetchOtherPartyField(){  // 其他党团
            let _this = this;
            this.fetchField('DT11').then(res => {
                _this.formFields.other_party = res.data.data
            });
        },
        editInfo(){
            this.tempFormData = Object.assign({}, this.formModel);
            this.formModel = Object.assign({}, this.tempFormData);
            this.toggleEdit();
        },
        // cancelEdit(){
        //     // 延迟改变默认值
        //     setTimeout(() => {
        //         this.formModel = Object.assign({}, this.tempFormData);
        //         this.personImg = this.copyImg;
        //         this.personId = this.copyId;
        //     }, 300)
        //     // this.toggleEdit();
        //     this.$refs['infoform'].resetFields();
        // },
        save(next){
            // TODO save request
            this.$refs['infoform'].validate((valid) => {
                if (valid) {
                    let that = this;
                    let _data = Object.assign({},that.formModel);
                    _data.uid = that.$route.params.uid;
                    _data.native = _data.native[_data.native.length-1];
                    _data.profession_duty = _data.profession_duty[_data.profession_duty.length-1];
                    _data.official_favicon = this.personId;
                    _data.official_favicon_url = this.personImg;
                    let qs = require('qs')
                    for (let item in _data) {
                        if(item.indexOf('time') >= 0 || item.indexOf('date') >= 0 || item.indexOf('birthday') >= 0){
                            _data[item] = that.filters.dateFormat(_data[item]);
                        }
                    }
                    _data.family_police_station = that.getLastValue(_data.family_police_station);
                    if(_data.mobile){
                        let reg = /^1\d{10}$/;
                        if(!reg.test(_data.mobile)){
                            that.$Message.error('请输入正确的手机号')
                            return
                        }
                    }
                    that.axios({
                        url:'/v1/member/edit',
                        method:'post',
                        data:qs.stringify(_data)
                    })
                    .then(res=>{
                        let needData = res.data;
                        if (needData.code == 200) {
                            // that.toggleEdit();
                            that.$Message.success('保存成功');
                            that.$store.commit('setEdit',{isDisable: false});
                            next && next();
                        } else {
                            next && next(false);
                            let temp = Object.values(needData.data);
                            if (temp.length) {
                                that.$Message.error(temp[0][0]);
                            } else {
                                that.$Message.error(needData.msg);
                            }
                        }
                        this.$store.commit('setEdit', {isDisable: false});
                    })
                    .catch(err=>{
                        next && next(false);
                        this.$Message.error('网络请求异常');
                    })
                }
                else {
                    this.$Message.error('表单验证失败!');
                    next && next(false);
                }  
            })
        },
		getList(type, arr) {
			let that = this;
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
        getDetail(uid){
            if (formDataWatcher) {
                // console.log(formDataWatcher);
                formDataWatcher();
                formDataWatcher = null;
            }
            this.fetchData(uid).then(res => {
                if (res.data.code == 200) {
                    res.data.data.native = res.data.data.native_array.map(function(a){
                        return a.id
                    });
                    res.data.data.profession_duty = res.data.data.profession_duty_array.map(function(a){
                        return a.id
                    });
                    res.data.data.birthday = new Date(res.data.data.birthday);
                    res.data.data.family_police_station = this.getArray(res.data.data.family_police_station_array);
                    this.$emit('event-bus', 'change-aside-title', [res.data.data.real_name, false]);
                    if(res.data.data.other_party_time=='0000-00-00'){
                        res.data.data.other_party_time = "";
                    }
                    setTimeout(() => {
                        this.formModel = Object.assign({}, res.data.data);
                        this.personImg = res.data.data['official_favicon_url'];
                        this.copyImg = res.data.data['official_favicon_url'];
                        this.personId = res.data.data['official_favicon'];
                        this.copyId = res.data.data['official_favicon'];
                        if (this.watch) {
                            this.watch();
                            this.watch = null;
                        };
                        this.watch = formDataWatcher = this.$watch('formModel',(newVal, oldVal) => {
                            this.$store.commit('setEdit', {isDisable: true});
                        }, {deep : true});
                    }, 0)
                }
                else {
                    //this.$Message.error(res.data.msg);
                }
            });
        },
        getFormSelectData(){
            // this.fetchNativeField()
            this.fetchNationField();
            // this.fetchSexField();
            // this.fetchProQualificationField();
            this.fetchProDutyField();
            this.fetchOtherPartyField();
            // this.getdeptList();
            this.getList('DT01', 'family_police_station_list');
        }
    },
    mounted(){
        let _this = this;
        this.getDetail(this.$route.params.uid);
        this.getFormSelectData();
        this.$store.commit('setEdit',{isDisable: false});
    },
    watch :{
        viewdata(newVal, oldVal) {
            this.currentData = newVal;
            this.getDetail(this.currentData.id);
        },
        '$route' (to, from) {
            if(to.name=="dangyuaninfo"||to.name=="membercheckinfo"){
               this.getDetail(to.params.uid);
            }
        }
    }
}
</script>
<style scoped>
select {
    margin-right: 0px !important;
    padding-right: 0px !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance:none;
    background:none;
    /*background:url("../images/select.jpg") right center no-repeat;*/
    /*width:490px;*/
    border:1px solid #d9d9d9;
    height:30px;
    cursor:pointer;
}
select::-ms-expand {
    color: #fff;
    font-size:20px;
    padding:5px 9px;
    background: #0054a7;
}
.info-detail {
    padding: 0 15px;
}
.memberinfo-base{
    height: 100%;
}
.memberinfo-form{
    padding: 10px 8px 50px 8px;
}
.memberinfo-avatar{
    display: block;
    margin: auto;
    /* width: 85px;
    height: 120px; */
    width:120px;
    height:172px;
    vertical-align: middle;
}
.aside-bottom{
    position: absolute!important;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ddd;
    padding: 8px;
    text-align: right;
    background-color: #f8f8f8;
}
#duty_id_1{
  width: 100%;
  border: 1px solid #dddee1;
  border-radius: 4px;
  display: block;
  height: 32px;
  line-height: 30px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 8px;
  padding-right: 59px;
  outline: #e96156;
}
</style>
