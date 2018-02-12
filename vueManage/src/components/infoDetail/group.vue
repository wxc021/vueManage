<template>
    <div class="info-content start-box box-orient" @click="stopP">
        <div class="aside-header">
            <span class="title">{{this.$store.state.slideData.name}}{{this.$route.params['title']}}</span>
            <Button  @click="closeInfo" :style="{'float': 'right', 'font-size' : '16px', 'height': '100%'}" type="text"><Icon type="close"></Icon></Button>
        </div>
        <div class="box-flex start-box box-orient">
            <div class="info-detail box-flex">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="0">
                    <Row>
                        <Col span="12">
                            <FormItem class="reset-style" label="党组织名称" prop="groupName">
                                <Input v-model="formValidate.groupName" :disabled="isDisable" placeholder="请输入党组织名称"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem class="reset-style" label="党组织代码" prop="groupCode">
                                <Input v-model="formValidate.groupCode" :disabled="isDisable" placeholder="请输入党组织代码">
                                    <span slot="prepend">{{formValidate.dept_partycode}}</span>
                                </Input>
                            </FormItem>    
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem class="reset-style" label="批准建立党组织日期" prop="groupTime">
                                <DatePicker type="date" placeholder="选择日期" :disabled="isDisable" v-model="formValidate.groupTime"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            
                        </Col>
                    </Row>
                </Form>
            </div>
            <div class="info-footer start-box box-align">
                <div class="box-flex"></div>
                <!-- <Button type="ghost" style="margin-right: 15px;"  @click="handleReset('formValidate')">取消</Button> -->
                <!-- <Button v-show="isDisable" type="primary" @click="editBtn">编辑</Button> -->
                <Button v-show="!isDisable" type="error"  @click="handleSubmit('formValidate')">保存</Button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'info',
        data() {
            const validatePass = (rule, value, callback) => {
                  if (value === '') {
                      callback(new Error('党组织代码不能为空'));
                  } else {
                      if (!/^\d+$/.test(value)) {
                        callback(new Error('请输入数字'));   
                      }
                      callback();
                  }
            };
            return {
                switchOpen: 0,
                buttonType: 'ghost',
                isDisable:false,
                formValidate: {
                    groupName: '',
                    groupCode: '',
                    groupTime: '',
                    dept_partycode: ''
                },
                ruleValidate: {
                    groupName:[
                      {required: true, message: '请输入党小组名称', trigger: 'blur'},
                    ],
                    groupCode:[
                      {required: true, message: '请输入党组织编码', trigger: 'blur'},
                      { validator: validatePass, trigger: 'blur' }
                    ],
                    groupTime:[
                      {required: true,type: 'date', message: '建立日期不能为空', trigger: 'change'},
                    ],
                },
            }
        },
        computed: {
        },
        watch: {
            '$route' (to, from) {
                this.getInfo(this.$route.params.id);
            }
        },
        components: {
           
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let that = this;
                        let qs = require('qs');
                        this.axios({
                            method: 'post',
                            url: '/v1/deptgroup/edit',
                            data: qs.stringify({
                                dept_id: this.$route.params['ids'],
                                id: this.$route.params['id'],
                                name: that.formValidate.groupName,
                                adddate: that.getDate(that.formValidate.groupTime),
                                code: that.formValidate.groupCode,
                            })
                        })
                        .then(res => {
                            let needData = res.data;
                            if (needData.code == 200) {
                                that.$Message.success('修改成功!');
                                this.$store.commit('setStrict')
                                this.$store.commit('setFlash2', {type: 2})
                                that.$router.go(-1);
                            } else {
                                that.$Message.error(needData.msg);
                            }
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        })
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                // this.$refs[name].resetFields();
                this.$router.go(-1);
            },
            editBtn() {
              this.isDisable=!this.isDisable;
              // this.$store.commit('setEdit', {isDisable: this.isDisable});
            },
            stopP() {
               // event.stopPropagation();
            },
            switchButton() {
                this.buttonType = 'error'
            },
            closeInfo() {
                this.$router.go(-1);
            },
            setStr(val) {
                return val > 9 ? val : '0'+val;
            },
            getDate(obj) {
                if (obj == '') {
                  return  '';
                } else {
                  return obj.getFullYear()+'-'+( this.setStr( obj.getMonth()+1 ) )+'-'+this.setStr(obj.getDate());
                }
            },
            // events up tableswitch change
            changSwitch(data) {
                if (!this.$store.state.isEdit) {
                    alert('编辑模式下请完成编辑');
                    return;
                };
                let that = this;
                if (!this.switchs[data.index].active) {
                    for (let i = 0; i < this.switchs.length; i++) {
                         this.switchs[i].active = false;
                    };
                    that.switchs[data.index].active = true;
                };
                that.switchOpen = data.index;
            },
            //回显
            getInfo(id, type) {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'get',
                    url: '/v1/deptgroup/get-dept-group-info',
                    params: {
                        group_id: id ? id : 0,
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        this.formValidate.groupName = needData.data.full_name;
                        this.formValidate.groupCode = needData.data.code;
                        this.formValidate.groupTime = new Date(needData.data.adddate);
                        this.formValidate.dept_partycode = needData.data.dept_partycode;
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
            this.getInfo(this.$route.params.id);
        },
    }
</script>
<style scoped>
    .info-detail {
        padding: 0 15px;
    }
    .aside-header{
        line-height: 49px;
        height: 49px;
        border-bottom: 1px solid #dddddd;
        background-color: #f8f8f8;
    }
    .aside-header .title{
        padding-left: 16px;
        font-size: 16px;
    }
</style>
