<!--联系方式form-->
<template>
    <div class="box-flex start-box box-orient">
        <div class="info-detail box-flex">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="0">
                <Row>
                    <Col span="12">
                      <FormItem class="reset-style" label="党组织联系人" prop="person_name">
                          <Input v-model="formValidate.person_name"  placeholder="请选择党组织联系人" @on-focus="selectName"></Input>
                      </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="党组织联系人手机号" prop="person_tel">
                          <Input :maxlength='11' readonly v-model="formValidate.person_tel" readonly="readonly"  placeholder="请输入党组联系人手机号"></Input>
                      </FormItem>
                    </Col>
                </Row>
                <Row>
                  <Col span="12">
                      <FormItem class="reset-style" label="党组织办公电话" prop="contact_phone">
                        <Input :maxlength='20' v-model="formValidate.contact_phone"  placeholder="请输入党组织办公电话"></Input>
                      </FormItem>
                  </Col>
                  <Col span="12">
                      <FormItem class="reset-style" label="传真号码:" prop="fax">
                        <Input v-model="formValidate.fax"  placeholder="请输入传真号码"></Input>
                      </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12">
                      <FormItem class="reset-style" label="所在地区：" prop="region">
                        <Cascader :render-format="renders" change-on-select :data="formValidate.areaData"  v-model="formValidate.region"></Cascader>
                      </FormItem>
                  </Col>
                  <Col span="12">
                      <FormItem class="reset-style" label="邮政编码" prop="postcode">
                        <Input v-model="formValidate.postcode"  placeholder="请输入邮政编码"></Input>
                      </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                      <FormItem class="reset-style" label="详细地址" prop="address">
                        <Input v-model="formValidate.address"  placeholder="请输入详细地址"></Input>
                      </FormItem>
                  </Col>
                </Row>
            </Form>
        </div>
        <div class="info-footer start-box box-align">
            <div class="box-flex"></div>
            <!-- <Button type="ghost" style="margin-right: 15px;"  @click="handleReset('formValidate')">取消</Button> -->
            <!-- <Button v-show="isDisable" type="primary" @click="editBtn">编辑</Button> -->
            <Button  type="error"  @click="handleSubmit('formValidate')">保存</Button>
        </div>
    </div>
</template>
<script>
  import areaData from '@/lib/area.js'
    export default {
        name: 'contactInfo',
        data() {
          //自定义验证规则

          const validatePhone = (rule, value, callback) => {
            if (!/^[\d-]+$/.test(value)) {
              callback(new Error('办公电话格式不正确'));
            } else {
              callback();
            }
          }


          const validateFax = (rule, value, callback) => {
            if(value===''){
              callback();
            }else if(!/^(\d{3,4}-)?\d{7,8}$/.test(value)){
              callback(new Error('传真格式不正确'));
            }else{
              callback();
            }
          };
          const validateAddress = (rule, value, callback) => {
            if(value===''){
              callback();
            }else if(/^\d+$/.test(value)){
              callback(new Error('地址格式不正确'));
            }else{
              callback();
            }
          };
          const validatePostcode = (rule, value, callback) => {
            if(value===''){
              callback();
            }else if(!/^\d{6}$/.test(value)){
              callback(new Error('邮箱格式不正确'));
            }else{
              callback();
            }
          };



            return {
                watcher: null,
                isDisable:true,
                formValidate: {
                  contact_person:'',//uid
                  person_name: '',
                  contact_phone: '',
                  person_tel: '',
                  region: [],
                  fax:'',
                  address: '',
                  postcode: '',
                  areaData: areaData,
                },
                ruleValidate: {
                  contact_phone: [
                    {required: true, message: '党组办公电话不能为空', trigger: 'blur'},
                    { validator: validatePhone, trigger: 'blur' }
                  ],
                  fax:[
                    { required: false, trigger: 'blur'},
                    // { validator: validateFax, trigger: 'blur' }

                  ],
                  address: [
                    { required: false, trigger: 'blur' },
                    // {validator: validateAddress, trigger: 'blur' }
                  ],
                  postcode: [
                    { required: false, trigger: 'blur' },

                    // {validator: validatePostcode, trigger: 'blur' }
                  ]
                },
                datas: this.infodata,
            }
        },
        props: ['infodata', 'controlSave'],
        components: {

        },
        watch: {
            '$route' (to, from) {
                //
                if(to.name==from.name){
                    delete this.$store.state.checkPearson.real_name;
                    delete this.$store.state.checkPearson.mobile;
                    delete this.$store.state.checkPearson.uid;
                }
                this.getInfo(this.$route.params['id'], 1);
            },
            'controlSave' (newD, oldD) {
                this.handleSubmit('formValidate');
            }
        },
        methods: {
            selectName() {
              this.$router.push({name: 'Contacts', params: {dept: this.$route.params['id']}});
            },
            editBtn: function () {
              this.isDisable = !this.isDisable;
              this.$store.commit('setEdit', {isDisable: this.isDisable});
            },
            checkName(){
              this.formValidate.person_name=this.$store.state.checkPearson.real_name;
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let that = this;
                        let qs = require('qs');
                        this.axios({
                          method: 'post',
                          url: '/v1/dept/modify-dept-contact-info',
                          data: qs.stringify({
                            dept_id:that.$route.params.id,
                            contact_person:that.formValidate.contact_person,
                            contact_phone	:that.formValidate.contact_phone,
                            fax:that.formValidate.fax,
                            region_id	:that.formValidate. region[0],
                            city_id	:that.formValidate. region[1],
                            county_id	:that.formValidate. region[2],
                            address	:that.formValidate.address,
                            postcode:that.formValidate.postcode
                          })
                        })
                        .then(res=>{
                          let needData = res.data;
                          if (needData.code='200'){
                            this.$Message.success('提交成功!');
                            this.isDisable=!this.isDisable;
                            this.$store.commit('setEdit', {isDisable: false});
                          } else {
                            this.$Message.error(needData.msg);
                          }
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                // this.$refs[name].resetFields();
                // this.$router.go(-1)
                this.getInfo(this.$route.params['id'], 1);
                // this.isDisable = true;
                this.$store.commit('setEdit', {isDisable: false});
            },
            getInfo(id, type) {

                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'get',
                    url: '/v1/dept/contact-detail',
                    params: {
                        dept_id: id ? id : 0,
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.datas = needData.data;
                        if(this.$store.state.checkPearson.hasOwnProperty('real_name')){
                          this.formValidate.person_name=this.$store.state.checkPearson.real_name;//党组织联系人姓名
                          that.formValidate.contact_person=this.$store.state.checkPearson.uid//uid
                          that.formValidate.person_tel=this.$store.state.checkPearson.mobile//联系人手机号
                        }else{
                          that.formValidate.person_name = that.datas.person_name;
                          that.formValidate.contact_person=that.datas.person_uid//uid
                          that.formValidate.person_tel=that.datas.mobile;
                        }

                        that.formValidate.contact_phone = that.datas.contact_phone;

                        that.formValidate.fax=that.datas.fax//传真号码

                        var flag = false;  //遍历查找数据源是否存在该地区id
                        for(let key in that.formValidate.areaData){
                            if (that.formValidate.areaData[key]['value']==that.datas.region_id){
                                flag = true
                            }
                        }
                        that.formValidate.region = flag ? [that.datas.region_id,that.datas.city_id,that.datas.county_id] : []
                        that.formValidate.address = that.datas.address;
                        that.formValidate.postcode = that.datas.postcode;

                        if (this.watcher) {
                            this.watcher();
                        };

                        this.watcher = this.$watch('formValidate', function(newD) {
                            that.$store.commit('setEdit', {isDisable: true});
                        }, {deep: true})
                        this.$store.commit('setEdit', {isDisable: false});
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.$Message.error('网络请求异常');
                })
            },
        },
        created() {

        },
        mounted() {
          let that = this;
          this.getInfo(this.$route.params['id'], 1);
          this.$store.commit('setEdit', {isDisable: false});
          console.log(this.$store.state);
        },
    }
</script>
<style scoped>
  .info-detail {
      padding: 0 15px;
  }
</style>
