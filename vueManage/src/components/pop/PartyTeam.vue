<!-- 党支部/设置党小组弹窗-->
<template>
  <div class="PartyTeam">
    <Modal
      v-model="modal1"
      title="设立党小组"
      width="950"
      :mask-closable=false
      :closable=false
      :loading="loading"
      class-name="max-height vertical-center-modal"
      @on-ok="handleSubmit('PartyTeamForm')"
      @on-cancel="cancel">

        <Form ref="PartyTeamForm" :model="PartyTeamForm"  :label-width="150" :rules="ruleValidate">
          <Row>
            <Col span="12">
            <FormItem label="党小组名称：" prop="name">
              <Input v-model="PartyTeamForm.name" placeholder="请输入党小组名称"></Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <FormItem label="党小组编码：" prop="code">
              <Input v-model="PartyTeamForm.code" placeholder="请输入党小组编码" :maxlength="3">
                <span slot="prepend">{{ids}}</span>
              </Input>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="建立时间：" prop="createDate">
                <DatePicker style="width: 100%;"  type="date" placeholder="选择建立时间" v-model="PartyTeamForm.createDate"></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row>
          <p style="font-size: 14px; margin-bottom: 10px;">选择党小组所在党员名单：</p>
          <Table border :columns="columns4" :data="peopleList"  @on-selection-change="selectF"></Table>
        </Row>
    </Modal>
  </div>
</template>
<script>
  export default {
    name:'AddOrganization',
    data () {
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
        modal1: true,
        loading: true,
        peopleList: [],
        ids: this.$store.state.remberNode['partycode'],
        selectList: [],
        PartyTeamForm: {
          name:'',//党小组名称
          code: '',//党小组编码
          createDate:'',//建立时间
        },
        ruleValidate: {
          name: [
            {required: true, message: '党小组名称不能为空', trigger: 'change'}
          ],
          createDate: [
            {required: true, type:'date', message: '建立时间不能为空', trigger: 'change'}
          ],
          code: [
            {required: true, message: '党小组编码不能为空', trigger: 'change'},
            { validator: validatePass, trigger: 'blur' }
          ],
        },
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'real_name'
          },
          {
            title: '身份证号',
            key: 'idcard',
            width:200
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '人员状态',
            key: 'type_id_desc'
          },
          {
            title: '出生日期',
            key: 'birthday'
          },
          {
            title: '所属党小组',
            key: 'group_name'
          },
        ],
      };
    },

    methods: {
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
      selectF(selection) {
        this.selectList = selection;
      },
      handleSubmit(name) {
        let qs = require('qs');
        let that = this;

        this.$refs[name].validate((valid) => {
          if (valid) {
            let temp = [];
            this.selectList.forEach(item => {
              temp.push(item.uid)
            })

            let postData = {
              'dept_id': this.$route.params['id'],
              name: this.PartyTeamForm.name,
              code: this.PartyTeamForm.code,
              adddate: this.getDate(this.PartyTeamForm.createDate),
              uids: temp.join()
            }
            this.axios({
                method: 'post',
                url: '/v1/deptgroup/add',
                data: qs.stringify(postData)
            })
            .then(res => {
                let needData = res.data;
                if (needData.code == 200) {
                   that.$Message.success('设立党小组成功');
                    setTimeout(() => {
                      that.goback();
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
      cancel () {
        let that = this;
        this.$Modal.remove()
        setTimeout(function(args) {
          that.$router.go(-1);
        }, 500)
      },
      //党员列表
      getPeople() {
        let qs = require('qs');
        let that = this;
        this.axios({
            method: 'get',
            url: '/v1/deptgroup/user-list',
            params: {
              'dept_id': this.$route.params['id'],
              'zsfz':'1'
            }
        })
        .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
                needData.data.forEach(item => {
                  that.peopleList.push(item);
                })
            } else {
                that.$Message.error(needData.msg);
            }
        })
        .catch(err => {
            this.$Message.error('网络请求异常');
        })
      },
    },
    mounted() {
      this.getPeople();
    }
  }
</script>
<style>
  .max-height{
    /*max-height: 600px;*/
    /*overflow-y: auto;*/
  }
</style>
