<template>
    <div class="box-flex start-box box-orient">
        <div class="info-detail box-flex">
            <Form ref="unitManageForm" :model="unitManageForm" :rules="ruleValidate" label-position="right"
                  :label-width="0">
                <Row :gutter="16">
                    <Col span="12">
                    <FormItem class="reset-style" label="类型:" prop="org_type">
                        <Select v-model="unitManageForm.org_type" :disabled="isDisable" placeholder="请选择"
                                :clearable="true">
                            <Option :disabled="item.choosed==0" v-for="item in org_module" :key="item.id"
                                    :value="item.id">{{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12"></Col>
                </Row>

                <Row :gutter="16">
                    <Col span="12">
                        <FormItem class="reset-style" label="单位(部门)名称:" prop="full_name">
                            <Input v-model="unitManageForm.full_name" :maxlength=50 :disabled="isDisable" placeholder="请输入单位名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="单位隶属关系:" prop="type_id">
                            <Cascader :render-format="renders" :disabled="isDisable" :data="type_module"
                                      v-model="unitManageForm.type_id"></Cascader>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="16">
                    <Col span="12">
                        <FormItem class="reset-style" label="单位性质类别:" prop="prop_id">
                            <Cascader :render-format="renders" :disabled="isDisable" :data="prop_module"
                                      v-model="unitManageForm.prop_id"></Cascader>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        
                        <FormItem v-if="unitManageForm.prop_id[unitManageForm.prop_id.length-1]=='1008' || unitManageForm.prop_id[unitManageForm.prop_id.length-1]=='1009'"
                                  class="reset-style" label="事业单位类型:" prop="ei_org_type">
                            <Cascader :render-format="renders" :data="ei_org_module"
                                      v-model="unitManageForm.ei_org_type"></Cascader>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem class="reset-style" label="所属行业:" prop="belong_type">
                            <Cascader :render-format="renders" :disabled="isDisable" :data="belong_module"
                                      v-model="unitManageForm.belong_type"></Cascader>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="经济类型:" prop="economic_type">
                            <Cascader :render-format="renders" :disabled="isDisable" :data="economic_moudle"
                                      v-model="unitManageForm.economic_type"></Cascader>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem class="reset-style" label="企业类型:" prop="prop_type">
                            <Cascader :render-format="renders" :disabled="isDisable" :data="prop_moudle"
                                      v-model="unitManageForm.prop_type"></Cascader>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="企业规模:" prop="scope">
                            <Cascader :render-format="renders" :disabled="isDisable" :data="scope_module"
                                      v-model="unitManageForm.scope"></Cascader>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem class="reset-style" label="在岗职工数:" prop="number">
                            <Input v-model="unitManageForm.number " :disabled="isDisable" placeholder="请输入在岗职工数"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="35岁以下在岗职工数:" prop="number_35">
                            <Input v-model="unitManageForm.number_35  " :disabled="isDisable"
                                   placeholder="请输入35岁以下在岗职工数"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem class="reset-style" label="在岗职工技术人员数:" prop="number_artisan">
                            <Input v-model="unitManageForm.number_artisan " :disabled="isDisable"
                                   placeholder="请输入在岗职工技术人员数"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="在岗职工工人数:" prop="number_workers">
                            <Input v-model="unitManageForm.number_workers " :disabled="isDisable"
                                   placeholder="请输入在岗职工工人数"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <!--<Row :gutter="16" class="unit-style">-->
                    <!--<Col span="12">-->
                    <!--</Col>-->
                    <!--<Col span="12">-->
                    <!--&lt;!&ndash;  <FormItem v-if="unitManageForm.prop_id[unitManageForm.prop_id.length-1]=='1008' || unitManageForm.prop_id[unitManageForm.prop_id.length-1]=='1009'"  class="reset-style" label="事业单位类型:" prop="ei_org_type ">-->
                         <!--<Cascader :render-format="renders" :data="ei_org_module" v-model="unitManageForm.ei_org_type"></Cascader>-->
                     <!--</FormItem> &ndash;&gt;-->
                    <!--</Col>-->
                <!--</Row>-->

                <div class="" v-if="unitManageForm.org_type==3765">
                    <Row :gutter="16" class="unit-style">
                        <Col span="12">
                        <p style="color: #f34747;font-weight: bold;;font-size: 14px">* 以下为法人单位填写</p>
                        <FormItem class="reset-style" label="单位统一社会信用代码:" prop="orgcode">
                            <Input v-model="unitManageForm.orgcode  " :disabled="isDisable"
                                   placeholder="请输入社会信用代码"></Input>
                        </FormItem>
                        <FormItem class="reset-style" label="政府部门建立党组织情况:" prop="org_depts">
                            <Select v-model="unitManageForm.org_depts" :disabled="isDisable" placeholder="请选择"
                                    :clearable="true">
                                <Option :disabled="item.choosed==0" v-for="item in org_depts_module" :key="item.id"
                                        :value="item.id">{{item.name}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem class="reset-style" label="建立党员服务机构标识:" prop="if_party_service">
                            <Select v-model="unitManageForm.if_party_service" :disabled="isDisable" placeholder="请选择"
                                    :clearable="true">
                                <Option value="1">是</Option>
                                <Option value="2">否</Option>
                            </Select>
                        </FormItem>
                        <FormItem class="reset-style" label="农村专业合作组织标识:" prop="if_teamwork">
                            <Select v-model="unitManageForm.if_teamwork" :disabled="isDisable" placeholder="请选择"
                                    :clearable="true">
                                <Option value="1">是</Option>
                                <Option value="2">否</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem style="margin-top: 21px;" class="reset-style" label="单位建立党的基层组织情况:" prop="">
                            <Select v-model="unitManageForm.base_depts" :disabled="isDisable" placeholder="请选择"
                                    :clearable="true">
                                <Option :disabled="item.choosed==0" v-for="item in base_depts_module" :key="item.id"
                                        :value="item.id">{{item.name}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem class="reset-style" label="街道、乡镇、社区、村标识:" prop="is_town">
                            <Select v-model="unitManageForm.is_town" :disabled="isDisable" placeholder="请选择"
                                    :clearable="true">
                                <Option :disabled="item.choosed==0" v-for="item in is_town_module" :key="item.id"
                                        :value="item.id">{{item.name}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem class="reset-style" label="建立党员志愿者队伍:" prop="if_party_volunteers">
                            <Select v-model="unitManageForm.if_party_volunteers" :disabled="isDisable"
                                    placeholder="请选择" :clearable="true">
                                <Option value="1">是</Option>
                                <Option value="2">否</Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                        <p style="font-weight: bold;">“两新”组织情况</p>
                        <FormItem class="reset-style" label="党建指导员姓名:" prop="">
                            <!--<Input v-model="unitManageForm.instructores " readonly :disabled="isDisable" placeholder=""></Input>-->
                            <Select v-model="model10"  multiple placeholder="请选择" :clearable="true">
                                <Option v-for="item in insList" :value="item.uid" :key="item.uid">{{item.real_name}}
                                </Option>
                            </Select>
                        </FormItem>
                        <div class="add-member" @click="addTeacher"
                             style="color: #d73826;float: right;;text-align: right;margin-right: 16px;;cursor: pointer;font-size: 14px">
                            <Icon type="android-add"></Icon>
                            <span style="margin-left: 6px;">添加</span>
                        </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                        <p style="font-weight: bold;">非公有制经济组织</p>
                        <FormItem class="reset-style" label="法人代表是否是党员:" prop="is_party_legal_person">
                            <Select v-model="unitManageForm.is_party_legal_person" :disabled="isDisable"
                                    placeholder="请选择" :clearable="true">
                                <Option value="1">是</Option>
                                <Option value="2">否</Option>
                            </Select>
                        </FormItem>

                        <p v-if="unitManageForm.prop_id[unitManageForm.prop_id.length-1]=='1019' || unitManageForm.prop_id[unitManageForm.prop_id.length-1] =='1021'" style="font-weight: bold;">社会组织</p>
                        <div class="">
                            <FormItem v-if="unitManageForm.prop_id[unitManageForm.prop_id.length-1]=='1019'" class="reset-style" label="民办非企业单位类型:" prop="private_org_type">
                                <Select placement="top" v-model="unitManageForm.private_org_type"
                                        placeholder="请选择" :clearable="true">
                                    <Option :disabled="item.choosed==0" v-for="item in private_org_module"
                                            :key="item.id" :value="item.id">{{item.name}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </div>
                        <!-- <p style="color: #ccc; margin-top: 10px;"
                           v-if="unitManageForm.prop_id[unitManageForm.prop_id.length-1]!='1019' && unitManageForm.prop_id[unitManageForm.prop_id.length-1]!='1021' ">
                            当【单位性质类别】为【社会组织】时才可填写</p> -->
                        </Col>
                        <Col span="12">
                        <FormItem style="margin-top: 21px;" class="reset-style" label="法人代表兼任企业党组织书记:"
                                  prop="is_dept_leader">
                            <Select v-model="unitManageForm.is_dept_leader" :disabled="isDisable" placeholder="请选择"
                                    :clearable="true">
                                <Option value="1">是</Option>
                                <Option value="2">否</Option>
                            </Select>
                        </FormItem>
                        <FormItem v-if="unitManageForm.prop_id[unitManageForm.prop_id.length-1]=='1021'"
                                  style="margin-top: 30px; margin-left: -376px; width:100%;" class="reset-style"
                                  label="中介组织类型:" prop="mediator_type">
                            <Select :transfer=true placement="top" v-model="unitManageForm.mediator_type"
                                    :disabled="isDisable" placeholder="请选择" :clearable="true">
                                <Option :disabled="item.choosed==0" v-for="item in mediator_module" :key="item.id"
                                        :value="item.id">{{item.name}}
                                </Option>
                            </Select>
                        </FormItem>
                        </Col>
                    </Row>
                </div>

            </Form>
        </div>
        <div class="info-footer start-box box-align">
            <div class="box-flex"></div>
            <Button type="ghost" style="margin-right: 15px;" @click="handleReset('formValidate')">取消</Button>
            <!--<Button v-show="isDisable" type="primary" @click="editBtn">编辑</Button>-->
            <Button v-show="!isDisable" type="error" @click="handleSubmit('unitManageForm')">保存</Button>
        </div>
        <UnitTeacher v-if="isShow" @setCancer="setCancer" @setOk="setOk"></UnitTeacher>
    </div>
</template>
<script>
    import UnitTeacher from '@/components/pop/unit/UnitTeacher.vue'
    export default {
        name: 'unitForm',
        data() {
            const validatePass = (rule, Code, callback) => {
                if (Code === '') {
                    callback();
                } else {
                    var patrn = /^[0-9A-Z]+$/;
                　　//18位校验及大写校验
                　　if ((Code.length != 18) || (patrn.test(Code) == false)) { 
                        callback(new Error("不是有效的统一社会信用编码！")); 
                　　} else { 
                　　　　var Ancode;//统一社会信用代码的每一个值
                　　　　var Ancodevalue;//统一社会信用代码每一个值的权重 
                　　　　var total = 0; 
                　　　　var weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];//加权因子 
                　　　　var str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
                　　　　//不用I、O、S、V、Z 
                　　　　for (var i = 0; i < Code.length - 1; i++)  {
                    　　　　Ancode = Code.substring(i, i + 1); 
                    　　　　Ancodevalue = str.indexOf(Ancode); 
                    　　　　total = total + Ancodevalue * weightedfactors[i];
                    　　　　//权重与加权因子相乘之和 
                　　　　}
                　　　　var logiccheckcode = 31 - total % 31;
                　　　　if (logiccheckcode == 31) {
                　　　　　　logiccheckcode = 0;
                　　　　}
                　　　　var Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
                　　　　var Array_Str = Str.split(',');
                　　　　logiccheckcode = Array_Str[logiccheckcode];
                　　　　var checkcode = Code.substring(17, 18);
                　　　　if (logiccheckcode != checkcode) { 
                            callback(new Error("不是有效的统一社会信用编码！")); 
                　　　　 }
                    }
                    callback();
                }
            };
            return {
                watcher: null,
                isShow:false,
                isDisable:false,
                model10: [],
                insList:[],
                cityList: [
                    {
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }
                ],
                //指导员数据源
                org_module:[],//单位类型数据源
                type_module:[],//单位隶属关系数据源
                prop_module:[],//性质类别数据源
                belong_module:[],//所属行业数据源
                scope_module:[],//企业规模数据源
                economic_moudle:[],//经济类型数据源
                prop_moudle:[],//企业类型数据源
                ei_org_module:[],//企事业单位数据源
                base_depts_module:[],//单位建立党的基层组织情况
                org_depts_module:[],//政府建立党的基层组织情况
                is_town_module:[],//乡镇建立党的基层组织情况
                private_org_module:[],//民办非企业单位类型数据源
                mediator_module:[],//中介类型
                unitManageForm: {
                  org_type:'',//类型
                  full_name:'',//单位名称
                  type_id: [],//隶属关系
                  economic_type: [],//经济类型
                  prop_id: [],//单位性质
                  belong_type: [],//所属行业
                  scope: [],//企业规模
                  prop_type: [],//企业类型
                  ei_org_type: [],//企事业单位类型
                  number:'',//在岗职工数
                  number_35:'',//35岁以下职工数
                  number_workers:'',//在岗职工工人数:
                  number_artisan:'',//在岗职工技术人员数:
                  orgcode:'',//单位统一代码
                  instructores_desc:[],//显示指导员姓名
                  instructor_uids:[],//指导员姓名
                  base_depts:'',//单位情况
                  org_depts:'',//政府情况
                  is_town:'',//乡镇情况
                  if_party_service:'',//是否建立党员服务机构标识
                  if_party_volunteers:'',//建立党员志愿者队伍
                  if_teamwork:'',//农村专业合作组织标识
                  is_dept_leader:'',//法人代表是否为党委书记
                  private_org_type:'',//民办非企业单位类型
                  is_party_legal_person:'',//法人代表是否为党员
                  mediator_type:''//中介
                },
                ruleValidate: {
                    orgcode: [
                        // {required: true, message: '信用代码不能为空', trigger: 'blur'},
                        { validator: validatePass, trigger: 'blur' }
                    ],
                  org_type:[{
                      required: true, message: '单位类型不能我空', trigger: 'change'
                  }],
                  full_name:[{
                      required: true, message: '单位名称不能我空', trigger: 'blur'
                  }],
//                  prop_type: [{
//                        required: true, type: 'array', min: 1, message: '企业类型不能为空', trigger: 'change'
//                    }],
                  belong_type:[{
                      required: true, type: 'array',trigger: 'change',message: '所属行业不能为空',
                  }],
                  prop_id:[{
                      required: true, type: 'array',trigger: 'change',message: '单位性质类别不能为空'
                  }],
//                  economic_type:[{
//                      required: true, type: 'array',trigger: 'change',message: '经济类型不能为空'
//                  }],
                  type_id:[{
                    required: true, type: 'array',trigger: 'change',message: '单位隶属关系不能为空'
                  }],
                  ei_org_type:[{
                      required: true, type: 'array',trigger: 'change',message: '事业单位类型不能为空'
                  }],
                },
                datas: this.infodata,
                dangType: [],
                realtive: [],
                voteStyle: []
            }
        },
        props: ['infodata', 'controlSave'],
        components: {
          UnitTeacher
        },
        watch: {
            '$route' (to, from) {
                this.getInfo(this.$route.params['id'],1);
                //this.getType();
                //this.getRealtive();
            },
            'controlSave' (newD, oldD) {
                this.handleSubmit('unitManageForm');
            }
        },
        methods: {
            //添加指导员
            addTeacher(){
              this.isShow=true;
            },
            setCancer(item) {
              this.isShow=false;
            },
            //数组去重工具类
            unique(arr){
                var allArr = [];//新数组
                for(var i=0;i<arr.length;i++){
                    var flag = true;
                    for(var j=0;j<allArr.length;j++){
                        if(arr[i].id == allArr[j].id){
                            flag = false;
                        };
                    };
                    if(flag){
                        allArr.push(arr[i]);
                    };
                };
                return allArr;
            },
            setOk(item) {
                this.isShow = false;
                let real_name = [];//存储指导员姓名
                //存储选择的指导员集合
                let teacher_map = [];
                teacher_map = item.selection
                teacher_map.forEach(item => {
                    item.uid = item.id;
                    this.insList.push(item);
                    //this.model10.push(item.uid)
                })


                this.insList = this.unique(this.insList);
                this.model10 = [];
                this.insList.forEach(item => {
                    this.model10.push(item.uid)
                })

            },
            //党组织类型
            getType(type,module) {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'get',
                    url: '/v1/dictionary/get-list-by-type',
                    params: {
                        type: type,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that[module] = [];
                        needData.data.forEach(item => that[module].push(item))
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            editBtn() {
            },
            handleSubmit (name) {
                let that = this;
                let qs = require("qs");
                this.$refs[name].validate((valid) => {
                  let newObj = Object.assign({}, that.unitManageForm)
                    if (valid) {
                      let url='';
                      //0:新增  1:编辑
                        let insArr= that.model10;
                        let normalArr =[];
                        that.insList.forEach(itemP => {
                            insArr.forEach(itemC =>{
                            if (itemP.uid==itemC) {
                            normalArr.push(itemP)
                            }
                            })
                        })
                            newObj.instructor_uids= [...normalArr];
                      if (that.$route.params.unitState=='1') {
                        
                        newObj.id = that.$route.params.id;

//                        let insArr= that.model10;
//                        let normalArr =[];
//                        that.insList.forEach(itemP => {
//                          insArr.forEach(itemC =>{
//                            if (itemP.uid==itemC) {
//                                normalArr.push(itemP)
//                            }
//                          })
//                        })
//                        newObj.instructor_uids=normalArr;
//                        console.log(normalArr);
//                        return;



                         url= '/v1/org/updateunit';//编辑接口
                      }else{
//                        newObj.instructor_uids=normalArr;
                        that.unitManageForm.org_id = that.$store.state.remberId;
                        newObj.org_id=that.$store.state.remberId;
                        url = '/v1/org/addunit';//新增接口

                      }
                        newObj.belong_type = newObj.belong_type[newObj.belong_type.length-1];
                        newObj.economic_type =  newObj.economic_type[newObj.economic_type.length-1];
                        newObj.prop_id = newObj.prop_id[newObj.prop_id.length-1];
                        newObj.prop_type = newObj.prop_type[newObj.prop_type.length-1];
                        newObj.scope = newObj.scope[newObj.scope.length-1];
                        newObj.type_id = newObj.type_id[newObj.type_id.length-1];
                        newObj.ei_org_type = newObj.ei_org_type[newObj.ei_org_type.length-1]
                      this.axios({
                        method: 'post',
                        url: url,
                        data: qs.stringify(
                          newObj
                        )
                      })
                      .then(res=>{
                        let needData = res.data;
                        if(needData.code=='200'){
                            if (that.$route.params.unitState=='0'){
                                console.log(that.$route.params.unitState);
                            }


                          this.$Message.success('保存成功');
                          this.$store.commit('setEdit', {isDisable: false});
                          // this.$router.push({name:'unitManage'})
                        } else {
                          this.$store.commit('setEdit', {isDisable: false});
                          this.$Message.error(needData.msg);
                        }
                      })
                      .catch(err => {
                        this.$Message.error('网络请求异常');
                      })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
              this.$router.push({name:'unitManage'})
            },
            getInfo(id, type) {
                let that = this;
                let qs = require('qs');
                if (this.$route.params.unitState!='1'){
                  return  ;
                }
                this.axios({
                    method: 'get',
                    url: '/v1/org/unitinfo',
                    params: {
                      id: id ? id : 0,
                      opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                      //赋值

                      let postData = Object.assign({}, needData.data)
                      this.insList = Object.assign([],needData.data.instructor_uids);
                      that.model10 = [];
                      this.insList.forEach(item => {
                        that.model10.push(item.uid);
                      })

                      that.unitManageForm = postData;

                      that.unitManageForm.prop_id = needData.data.prop_id_array.map((item) => {
                        return item.id;
                      })
                      that.unitManageForm.economic_type = needData.data.economic_type_array.map((item) => {
                        return item.id;
                      })
                      that.unitManageForm.scope = needData.data.scope_array.map((item) => {
                        return item.id;
                      })
                      that.unitManageForm.type_id = needData.data.type_id_array.map((item) => {
                        return item.id;
                      })
                      that.unitManageForm.belong_type = needData.data.belong_type_array.map((item) => {
                        return item.id;
                      })
                      that.unitManageForm.prop_type = needData.data.prop_type_array.map((item) => {
                        return item.id;
                      })
                      that.unitManageForm.ei_org_type = needData.data.ei_org_type_array.map((item) => {
                        return item.id;
                      })

                      if (this.watcher) {
                          this.watcher();
                          that.$store.commit('setEdit', {isDisable: false});
                      };
                      setTimeout(function(args) {
                        that.watcher = that.$watch('unitManageForm', function(newD) {
                            that.$store.commit('setEdit', {isDisable: true});
                        }, {deep: true})
                      },700)
                      

//                      that.unitManageForm.full_name=needData.data.full_name;//单位名称
//                      that.unitManageForm.belong_type=needData.data.belong_type;//单位所属行业
//                      that.unitManageForm.prop_id=needData.data.prop_id;//单位性质类别
//                      that.unitManageForm.type_id=needData.data.type_id;//单位隶属关系
//                      that.unitManageForm.economic_type=that.unitManageForm.economic_type//经济类型
//                      that.unitManageForm.is_town_module=that.unitManageForm.is_town_module//经济类型
//                      that.unitManageForm.if_party_service=that.unitManageForm.if_party_service//是否建立党员服务机构标识
//                      that.unitManageForm.number=needData.data.number;//在岗职工数
//                      that.unitManageForm.number_workers=needData.data.number_workers;//在岗职工数
//                      that.unitManageForm.number_artisan=needData.data.number_artisan;//在岗职工数
//                      that.unitManageForm.number_35=needData.data.number_35;//35岁以下岗职工数
//                      that.unitManageForm.scope=needData.data.scope;//企业规模
//                      that.unitManageForm.is_party_legal_person=needData.data.is_party_legal_person;//是否为党员
//                      that.unitManageForm.is_dept_leader=needData.data.is_dept_leader;//是否为党委书记
//                      that.unitManageForm.private_org_type=needData.data.private_org_type;//民办企业类型
//                      that.unitManageForm.mediator_type=needData.data.mediator_type;//中介企业类型


                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
        },
        created() {

        },
        mounted() {
            let that = this;
            this.getInfo(this.$route.params['id'], 1);
            this.getType("B01024","type_module");//获取隶属单位
            this.getType("B90006","prop_module");//获取隶属单位
            this.getType("GB4754","belong_module");//获取所属行业
            this.getType("B99004","scope_module");//企业规模
            this.getType("B01023","economic_moudle");//经济类型
            this.getType("DT05","org_module");//单位类型
            this.getType("B99001","prop_moudle");//单位类型
            this.getType("F01025","ei_org_module");//事业单位类型
            this.getType("B99011","base_depts_module");//单位建立党的基层组织情况
            this.getType("DT06","org_depts_module");//政府建立党的基层组织情况
            this.getType("KZ22","is_town_module");//乡镇建立党的基层组织情况
            this.getType("DT13","private_org_module");//民办企业类型
            this.getType("KZ18","mediator_module");//民办企业类型

        },
    }
</script>
<style scoped>
.info-detail {
    padding: 0 15px;
}
  .unit-style .ivu-form-item-label{
    line-height: 18px;
    position: relative;
    top: -5px;
    width: 100px;
  }
</style>
