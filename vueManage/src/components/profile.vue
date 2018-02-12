<template>
    <div>
        <Modal
          v-model="modal1"
          title="修改密码"
          width="650"
          :loading="loading"
          :mask-closable="false"
          class-name="max-height vertical-center-modal"
          @on-ok="handleSubmit('OrganizationeForm')"
          @on-cancel="cancel">
          <Row>
            <Form ref="OrganizationeForm" :model="OrganizationeForm"  :label-width="150" :rules="ruleValidate">
              <Col span="16">
              <FormItem label="原密码：" prop="orignpwd">
                <Input v-model="OrganizationeForm.orignpwd" type="password" placeholder="请输入原密码"></Input>
              </FormItem>
              <FormItem label="新密码：" prop="pwd">
                <Input v-model="OrganizationeForm.pwd" type="password" placeholder="请输入新密码"></Input>
              </FormItem>
              <FormItem label="确定新密码：" prop="newpwd">
                <Input v-model="OrganizationeForm.newpwd" type="password" placeholder="请输入"></Input>
              </FormItem>
              </Col>
            </Form>
          </Row>
        </Modal>
        <Modal
          v-model="modal2"
          title="切换角色"
          width="650"
          :loading="loading"
          :mask-closable="false"
          class-name="max-height vertical-center-modal"
          @on-ok="handleSubmit2('OrganizationeForm2')"
          @on-cancel="cancel">
          <Row>
            <Form ref="OrganizationeForm2" :model="OrganizationeForm2"  :label-width="150" :rules="ruleValidate2">
                <RadioGroup v-model="OrganizationeForm2.radio">
                    <Radio :label="item.id" style="display:block; margin: 8px;" v-for="item in lists" :key="item.id">{{item.full_name}}</Radio>
                </RadioGroup>
            </Form>
          </Row>
        </Modal>
        <Dropdown class="info-tips" trigger="hover" style="margin:0 20px;" @on-click="setTo">
            <div class="start-box box-align" style="height:60px;">
                <img class="avatar" :src="userInfo.user_head" width="32" height="42" alt="" style="border: 1px solid #fff;vertical-align:bottom;">
                <div class="start-box box-orient">
                    <p style="font-size: 14px; color:#fff; line-height:20px;">{{userInfo.real_name}}</p>
                </div>
                <Icon type="arrow-down-b" style="margin-left:10px; color: #fff;"></Icon>
            </div>
            <Dropdown-menu slot="list"  class="nav-item text-center" style="padding: 0;" >
                <Dropdown-item name="1">
                    <p style="font-size: 14px; font-weight: bold; word-wrap: break-word;white-space: normal; word-break: break-all">{{userInfo.real_name}}</p>
                    <p style="word-wrap: break-word;white-space: normal; word-break: break-all;">{{current.full_name}}</p>
                </Dropdown-item>
                <Dropdown-item name="2">修改密码</Dropdown-item>
                <!-- <Dropdown-item name="3">切换管理角色</Dropdown-item> -->
                <Dropdown-item name="4">
                <p class="logout">退出登录</p></Dropdown-item>
            </Dropdown-menu>
        </Dropdown>  
    </div>
    
</template>
<script>
    export default {
        name: 'profile',
        data() {
            return {
                userInfo:{
                },
                current: {},
                modal1: false,
                modal2: false,
                loading: true,
                lists: [],
                OrganizationeForm: {
                  orignpwd: "",
                  pwd: "",
                  newpwd: "",
                },
                ruleValidate: {
                  orignpwd: [
                    {required: true, message: '原始密码不能为空', trigger: 'blur'}
                  ],
                  pwd: [
                    {required: true, message: '新密码不能为空', trigger: 'blur'}
                  ], 
                  newpwd: [
                    {required: true, message: '确定新密码不能为空', trigger: 'blur'}
                  ], 
                },
                OrganizationeForm2: {
                  radio: "",
                },
                ruleValidate2: {
                },

            }
        },
        computed: {
        },
        watch: {

        },
        components: {
           
        },
        methods: {
            getUserInfo(){
                var that = this;
                this.axios({
                    method: 'post',
                    url: '/v1/user/logininfo-base',
                })
                .then(res => {
                    let _data = res.data;
                    if(_data.code == 200) {
                        let data = _data.data;
                        that.userInfo = Object.assign(data);
                        that.lists = data.range_all;
                        that.current = data.range_current;
                        that.OrganizationeForm2['radio'] = that.current['id']
                    }
                })
                .catch(error => {
                    console.log('请求失败');
                })
            },
            getList() {
                var that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/auth-manage/list',
                })
                .then(res => {
                    let _data = res.data;
                    if(_data.code == 200){
                        let data = _data.data;
                        that.userInfo.real_name = data.real_name;
                    }
                })
                .catch(error => {
                    console.log('请求失败');
                })
            },
            handleSubmit(name) {
                let obj = this.OrganizationeForm
                let that = this;  
                if (that.OrganizationeForm['pwd'] !== that.OrganizationeForm['newpwd']) {
                    that.$Message.error('新密码和确认新密码不一致');
                    setTimeout(() => {
                        that.loading = false;
                        that.$nextTick(() => {
                            that.loading = true;
                        });
                    }, 1000);
                    return;
                };   
                this.$refs[name].validate((valid) => {
                  if (valid) {
                    let qs = require('qs');
                    this.axios({
                        method: 'post',
                        url: '/v1/user/modify-password',
                        data: qs.stringify({old: that.OrganizationeForm['orignpwd'], new: that.OrganizationeForm['pwd']})
                    })
                    .then(res => {
                        let needData = res.data;
                        if (needData.code == 200) {
                            that.$Message.success('密码修改成功，请重新登录');
                            that.$Modal.remove()
                            setTimeout(function(args) {
                              that.$router.push({name: 'login'});
                            }, 1000)
                        } else {
                            setTimeout(() => {
                                that.loading = false;
                                that.$nextTick(() => {
                                    that.loading = true;
                                });
                            }, 1000);
                            that.$Message.error(needData.msg);
                        }
                    })
                    .catch(err => {
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
            handleSubmit2(name) {
                let that = this;      
                let qs = require('qs');             
                this.axios({
                    method: 'get',
                    url: '/v1/user/switch-range',
                    params: {dept_id: that.OrganizationeForm2['radio']}
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.$Message.success('切换成功');
                        that.$Modal.remove()
                        setTimeout(function(args) { 
                            window.location.reload();
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            that.loading = false;
                            that.$nextTick(() => {
                                that.loading = true;
                            });
                        }, 1000);
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                    setTimeout(() => {
                        that.loading = false;
                        that.$nextTick(() => {
                            that.loading = true;
                        });
                    }, 1000);
                })    
            },
            cancel() {
                let that = this;
                this.$Modal.remove()
            },
            setTo(name) {
                switch(parseInt(name)) {
                    case 1: break;
                    case 2: 
                        this.modal1 = true;
                        break;
                    case 3: 
                        this.modal2 = true;
                        break;
                    case 4: this.logout();break;
                }
            },
            logout() {
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/user/logout',
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.$Message.success('退出成功');
                        that.$router.push('/login');
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
            this.getUserInfo();
        },
    }
</script>

<style scoped>
    .avatar{
        margin-right: 10px;
    }
</style>
