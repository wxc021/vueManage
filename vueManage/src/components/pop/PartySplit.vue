<!-- 党支部/党支部拆分新增弹窗-->
<template>
  <div class="PartySplit">
    <Modal
      v-model="modal1"
      title="党支部拆分"
      width="950"
      :mask-closable=false
      :loading="loading"
      class-name="max-height vertical-center-modal"
      :closable="true"
      @on-ok="handleSubmit('PartySplitForm')"
      @on-cancel="cancel">
      <Row>
        <Form ref="PartySplitForm" :model="PartySplitForm"  :label-width="170" :rules="ruleValidate">
          <Col span="12">
          <FormItem label="新拆分党支部编码：" prop="partycode">
            <Input v-model="PartySplitForm.partycode " @on-blur="formatCode" :maxlength="3">
              <span slot="prepend">{{nameS}}</span>
            </Input>
          </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="设置委员数：" prop="leadernum">
              <Input v-model="PartySplitForm.leadernum" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="新拆分党支部名称：" prop="full_name">
            <Input v-model="PartySplitForm.full_name" placeholder="请输入"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="实有委员数：" prop="CommitteeNum">
            <Input v-model="PartySplitForm.CommitteeNum"  placeholder="请输入"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="党组织类型：" prop="type_id">
            <Select :transfer="true" v-model="PartySplitForm.type_id" placeholder="请选择">
              <Option v-for="item in orgList" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="党组织办公电话：" prop="contact_phone">
            <Input v-model="PartySplitForm.contact_phone"  placeholder="请输入"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="党组织属地关系：" prop="affiliation_id">
            <!-- <Select v-model="PartySplitForm.affiliation_id" placeholder="请选择" :transfer="true">
              <Option v-for="item in realtive" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select> -->
            <Cascader :render-format="renders" :transfer="true" :data="realtive" v-model="PartySplitForm.affiliation_id"></Cascader>
          </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="传真号码：" prop="fax">
              <Input v-model="PartySplitForm.fax"  placeholder="请输入传真号码"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="批准建立党组织日期：" prop="found_time">
              <DatePicker :transfer="true" style="width: 100%;"  type="date" placeholder="选择日期" v-model="PartySplitForm.found_time"></DatePicker>
            </FormItem>
          </Col>
          <!-- <Col span="12">
          <FormItem label="流动党员党支部标识：" prop="Identification">
            <Input v-model="PartySplitForm.Identification"  placeholder="请输入"></Input>
          </FormItem>
          </Col> -->
          <Col span="12">
          <FormItem label="所在地区：" prop="area">
            <Cascader :render-format="renders" change-on-select :transfer="true" :data="areaData" v-model="PartySplitForm.area"></Cascader>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="详细地址：" prop="address">
            <Input v-model="PartySplitForm.address"  placeholder="请输入"></Input>
          </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="本届班子当选日期：" prop="start_time">
              <DatePicker :transfer="true" style="width: 100%;"  type="date" placeholder="选择日期" v-model="PartySplitForm.start_time"></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="邮政编码：" prop="postcode">
              <Input v-model="PartySplitForm.postcode"  placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="任期年限：" prop="gap">
            <Input v-model="PartySplitForm.gap"  placeholder="请输入"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="本届届满日期：" prop="end_time">
            <DatePicker :transfer="true" style="width: 100%;"  type="date" placeholder="选择日期" v-model="PartySplitForm.end_time"></DatePicker>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="选举方式：" prop="vote_way">
            <Select :transfer="true" v-model="PartySplitForm.vote_way" placeholder="请选择">
              <Option v-for="item in vote" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="选举应到会人数：" prop="vote_due">
              <Input v-model="PartySplitForm.vote_due"  placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="选举实到人数：" prop="vote_actual">
            <Input v-model="PartySplitForm.vote_actual"  placeholder="请输入"></Input>
          </FormItem>
          </Col>
        </Form>
      </Row>
      <Row>
        <p style="font-size: 14px; margin-bottom: 10px;">新拆分党支部的党员</p>
        <Table border :columns="columns4" :data="peopleList" @on-selection-change="selectF"></Table>
      </Row>
    </Modal>
  </div>
</template>
<script>
  import areaData from '@/lib/area.js'
  export default {
    name:'PartySplit',
    data () {
      return {
        modal1: true,
        loading: true,
        selectList: [],
        realtive: this.$store.state.realtive,
        vote: this.$store.state.voteStyle,
        areaData: areaData,
        PartySplitForm: {
          partycode:"",//党组织代码
          leadernum:"",//设置委员数
          full_name:"",//党组织全称
          CommitteeNum:"",//实际委员数
          type_id:"",//党组织类型
          contact_phone:"",//党组织办公室电话
          affiliation_id: [],//党组织属地关系
          fax:"",//传真
          found_time:'',//批准建立党组织日期
          // Identification:'',//流动党员党支部标识
          address:'',//详细地址
          start_time:'',//本届班子当选日期：
          postcode:'',//邮政编码
          gap:'',//任期年限
          end_time:'',//本届班子当选日期：
          vote_way:'',//选举方式
          vote_due:'',//应到人数
          vote_actual:'',//实到人数
          region: [],//所在地区
        },
        ruleValidate: {
          partycode: [
            {required: true, message: '党组织代码不能为空', trigger: 'blur'}
          ],
          full_name: [
            {required: true, message: '党组织全称不能为空', trigger: 'blur'}
          ],
          type_id: [
            {required: true, message: '党组织类型不能为空', trigger: 'change'}
          ],
          affiliation_id: [
            {required: true, type: 'array',min: 1, message: '党组织属地关系不能为空', trigger: 'change'}
          ],
          contact_phone: [
            {required: true, message: '党组办公电话不能为空', trigger: 'blur'}
          ],
          found_time: [
            {required: true,type:'date', message: '批准建立党组织日期', trigger: 'change'}
          ]
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
            title: '民族',
            key: 'nation'
          },
          {
            title: '出生日期',
            key: 'birthday'
          },
          {
            title: '籍贯',
            key: 'native_desc'
          },
          {
            title: '参加工作日期',
            key: 'work_date'
          },
        ],
        peopleList: [],
        orgList: []
      };
    },
    computed: {
      nameS() {
        let arr = [];
        if (this.$store.state.remberNode['partycode']) {
          arr = [];
          arr = this.$store.state.remberNode['partycode'].split('.')
        };
        let temp = arr.pop();
        return arr.join('.');
      }
    },
    filters:{
      formatCode(value){
        console.log(value);
        if(value.length==2){
          value='0'+value;
        } else if (value.length==1){
          value='00'+value;
        }
        return value;
      }
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
        console.log(this.selectList)
      },
      handleSubmit(name) {
        let that = this;
        let qs = require('qs');
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (!this.peopleList.length) {
              this.$Message.error('该支部没有成员，不能进行拆分');
              setTimeout(() => {
                  that.loading = false;
                  that.$nextTick(() => {
                      that.loading = true;
                  });
              }, 1000);
              return;
            } else {
              if (!this.selectList.length) {
                this.$Message.error('请选择拆分到新支部的成员（党员和申请人）');
                setTimeout(() => {
                    that.loading = false;
                    that.$nextTick(() => {
                        that.loading = true;
                    });
                }, 1000);
                return;
              };
            }
            let temp = [];
            this.selectList.forEach(item => {
              temp.push(item.id)
            })
            let postObj = Object.assign({}, this.PartySplitForm);
            
            postObj.dept_id = this.$route.params['id'];
            postObj.affiliation_id = this.PartySplitForm.affiliation_id[this.PartySplitForm.affiliation_id.length - 1];
            postObj.uids = temp.join();
            postObj.found_time = this.getDate(this.PartySplitForm.found_time)
            postObj.start_time = this.getDate(this.PartySplitForm.start_time)
            postObj.end_time = this.getDate(this.PartySplitForm.end_time)
            this.axios({
                method: 'post',
                url: '/v1/branch/split',
                data: qs.stringify(postObj)
            })
            .then(res => {
                let needData = res.data;
                if (needData.code == 200) {
                    that.$Message.success('拆分成功');
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
      formatCode(){
        let value = this.PartySplitForm.partycode
        if(value.length==2){
          value='0'+value;
        }else if (value.length==1){
          value='00'+value;
        }
        this.PartySplitForm.code = value;
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
            method: 'post',
            url: '/v1/branch/member-list',
            data: qs.stringify({dept_id: this.$route.params['ids'], opt: 1})
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
      //党组织类型列表
      getOrg() {
        let qs = require('qs');
        let that = this;
        this.axios({
            method: 'get',
            url: '/v1/branch/type-list',
            params: ''
        })
        .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
                needData.data.list.forEach(item => {
                  that.orgList.push(item);
                })
                that.orgList.forEach(item => {
                  item.id = item.id+'';
                })
            } else {
                that.$Message.error(needData.msg);
            }
        })
        .catch(err => {
            this.$Message.error('网络请求异常');
        })
      }
    },
    mounted() {
      this.getPeople();
      this.getOrg();
      //组织属地关系
      if (!this.$store.state.realtive.length) {
        this.$store.commit('getRealtive', {_: this});
      };
      if (!this.$store.state.voteStyle.length) {
        this.$store.commit('getVote', {_: this});
      };
    }
  }
</script>
<style>
  .max-height{
    /*max-height: 600px;*/
    /*overflow-y: auto;*/
  }
</style>
