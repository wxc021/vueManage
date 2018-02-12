<!-- 党组织新增弹窗-->
<template>
  <div class="AddOrganization">
    <Modal
      v-model="modal1"
      title="新增党组织"
      width="950"
      :loading="loading"
      :mask-closable="false"
      :closable="false"
      class-name="max-height vertical-center-modal"
      @on-ok="handleSubmit('OrganizationeForm')"
      @on-cancel="cancel">
      <Row>
        <Form ref="OrganizationeForm" :model="OrganizationeForm"  :label-width="180" :rules="ruleValidate">
          <Col span="12">
            <FormItem label="党组织代码：" prop="code">
              <Input v-model="OrganizationeForm.code" placeholder="请输入党组织代码" :maxlength="3">
              <span slot="prepend">{{this.$store.state.remberNode['partycode']}}</span>
              </Input>
            </FormItem>
            <FormItem label="党组织名称（全称）：" prop="OrganizationeName">
                <Input v-model="OrganizationeForm.OrganizationeName" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="党组织类型：" prop="type">
                <Cascader :render-format="renders" :data="dataType" v-model="OrganizationeForm.type" @click.native="getType" @on-change="changeParty"></Cascader>
            </FormItem>
            <FormItem label="党组织属地关系：" prop="relations">
              <Cascader :render-format="renders" :data="realtive" v-model="OrganizationeForm.relations"></Cascader>
              <!-- <Select v-model="OrganizationeForm.relations" :transfer="true" placeholder="请选择">
                <Option v-for="item in realtive" :value="item.id" :key="item.id" :disabled="item.choosed == 0 ? true : false">{{item.name}}</Option>
              </Select> -->
            </FormItem>
            <FormItem label="批准建立党组织日期：" prop="partyDate">
                <DatePicker :transfer="true" placement="top-start" style="width: 100%;"  type="date" placeholder="选择日期" v-model="OrganizationeForm.partyDate"></DatePicker>
            </FormItem>
            <FormItem label="本届班子当选日期：" prop="electionDate">
                <DatePicker :transfer="true" style="width: 100%;" @on-change="countEndDate" type="date" placeholder="选择日期" v-model="OrganizationeForm.electionDate" :disabled="nextDisable"></DatePicker>
            </FormItem>
            <FormItem label="任期年限：" prop="year">
                <!--<Input v-model="OrganizationeForm.year"  placeholder="请输入"></Input>-->
                <Select v-model="OrganizationeForm.year" @on-change="countEndDate" :transfer="true" placeholder="请选择" :disabled="nextDisable">
                    <Option :value="3" >3年</Option>
                    <Option :value="4" >4年</Option>
                    <Option :value="5" >5年</Option>
                </Select>
            </FormItem>
            <FormItem label="本届届满日期：" prop="endDate">
                <DatePicker readonly :transfer="true" style="width: 100%;"  type="date" placeholder="选择日期" v-model="OrganizationeForm.endDate" :disabled="nextDisable"></DatePicker>
            </FormItem>
            <FormItem label="设置委员数：" prop="setCommitteeNum">
                <Input v-model="OrganizationeForm.setCommitteeNum" placeholder="请输入" :disabled="nextDisable"></Input>
            </FormItem>
          <!-- <FormItem label="实有委员数：" prop="CommitteeNum">
            <Input v-model="OrganizationeForm.CommitteeNum"  placeholder="请输入"></Input>
          </FormItem> -->
          </Col>
          <Col span="12">
            <FormItem label="选举方式：" prop="mode">
              <Select v-model="OrganizationeForm.mode" :transfer="true" placeholder="请选择" :disabled="nextDisable">
                <Option v-for="item in voteStyle" :key="item.id" :value="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="选举应到会人数：" prop="tobeNum">
                <Input v-model="OrganizationeForm.tobeNum"  placeholder="请输入" :disabled="nextDisable"></Input>
            </FormItem>
            <FormItem label="选举实到人数：" prop="actualNum">
                <Input v-model="OrganizationeForm.actualNum"  placeholder="请输入" :disabled="nextDisable"></Input>
            </FormItem>
            <FormItem label="党组织办公电话：" prop="tel">
                <Input v-model="OrganizationeForm.tel"  placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="传真号码：" prop="faxnum">
                <Input v-model="OrganizationeForm.faxnum"  placeholder="请输入传真号码"></Input>
            </FormItem>
            <FormItem label="所在地区：" prop="region">
                <Cascader :render-format="renders" change-on-select :data="OrganizationeForm.areaData" :transfer="true" v-model="OrganizationeForm.region"></Cascader>
            </FormItem>
            <FormItem label="详细地址：" prop="address">
                <Input v-model="OrganizationeForm.address"  placeholder="请输入" ></Input>
            </FormItem>
            <FormItem label="邮政编码：" prop="postalCode">
                <Input v-model="OrganizationeForm.postalCode"  placeholder="请输入" ></Input>
            </FormItem>
          </Col>
        </Form>
      </Row>
    </Modal>
  </div>
</template>
<script>
  import areaData from '@/lib/area.js'
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
        dangType: this.$store.state.dangType,
        realtive: this.$store.state.realtive,
        voteStyle: this.$store.state.voteStyle,
        nextDisable: false,
        dataType: [],
        OrganizationeForm: {
          code:"",//党组织代码
          setCommitteeNum:"",//设置委员数
          OrganizationeName:"",//党组织全称
          CommitteeNum:"",//实际委员数
          type: [],//党组织类型
          tel:"",//党组织办公室电话
          relations: [],//党组织属地关系
          faxnum:"",//传真
          partyDate:'',//批准建立党组织日期
          // Identification:'',//流动党员党支部标识
          address:'',//详细地址
          electionDate:'',//本届班子当选日期：
          postalCode:'',//邮政编码
          year:'',//任期年限
          endDate:'',//本届班子当选日期：
          mode:'',//选举方式
          tobeNum:'',//应到人数
          actualNum:'',//实到人数
          region: [],//所在地区
          areaData: areaData,
        },
        ruleValidate: {
          code: [
              {required: true, message: '党组织代码不能为空', trigger: 'blur'},
              // {type: 'integer', message: '请输入三位纯数字', trigger: 'blur'} 
              { validator: validatePass, trigger: 'blur' }
          ],
          OrganizationeName: [
            {required: true, message: '党组织全称不能为空', trigger: 'blur'}
          ],
          type: [
            { required: true, type: 'array', min: 1, message: '党组织类型不能为空', trigger: 'change' },
          ],
          relations: [
            {required: true, type: 'array', min: 1, message: '党组织属地关系不能为空', trigger: 'change'}
          ],
          tel: [
            {required: true, message: '党组织办公电话不能为空', trigger: 'blur'}
          ],
          partyDate: [
            {required: true, type:'date', message: '批准建立党组织日期不能为空', trigger: 'change'}
          ]
        }
      };
    },
    methods: {
      //选择党组织类型
      changeParty(value, selectedData){
            if (value[0]=='1510'|| value[0]=='1504'){
                this.nextDisable = true;
                this.OrganizationeForm.mode = '';
                this.OrganizationeForm.tobeNum = '';
                this.OrganizationeForm.actualNum = '';
                this.OrganizationeForm.endDate = '';
                this.OrganizationeForm.year = '';
                this.OrganizationeForm.setCommitteeNum = '';
                this.OrganizationeForm.electionDate = '';
            } else {
                this.nextDisable = false;
            }
      },
        //自动计算届满日期
      countEndDate(val){
           if(this.OrganizationeForm.electionDate!='' && this.OrganizationeForm.year!=''){
               //计算几年后的时间
               let endDate = val*365*24*3600*1000+this.OrganizationeForm.electionDate.getTime();
               this.OrganizationeForm.endDate=new Date(endDate)
           }
      },
      //党组织类型
      getType() {
          let that = this;
          let qs = require('qs');
          this.axios({
              method: 'get',
              url: '/v1/dictionary/get-list-by-type',
              params: {
                  type: 'D01021',
              }
          })
          .then(res => {
              let needData = res.data;
              that.dataType = [];
              //重新组装data数据
              if (needData.code == 200) {
                needData.data.forEach(item => {
                  that.dataType.push(item)
                })
              }else{
                this.$Message.error(needData.msg);
              }
          })
          .catch(err => {
              this.$Message.error('网络请求异常');
          })
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
      handleSubmit(name) {
        let postData = {}
        let obj = this.OrganizationeForm
        let that = this;
        postData.dept_id = this.$store.state.remberId
        postData.partycode = obj.code
        postData.full_name = obj.OrganizationeName
        postData.type_id = obj.type.length > 0 ? obj.type[obj.type.length-1] : ''
        postData.affiliation_id = obj.relations.length > 0 ? obj.relations[obj.relations.length-1] : '';
        postData.found_time = this.getDate(obj.partyDate)
        postData.contact_phone = obj.tel
        // postData.is_flow = obj.Identification
        postData.start_time = this.getDate(obj.electionDate)
        postData.gap = obj.year;
        postData.end_time = this.getDate(obj.endDate)
        postData.vote_way = obj.mode
        postData.vote_due = obj.tobeNum
        postData.vote_actual = obj.actualNum
        postData.leadernum = obj.setCommitteeNum
        postData.fax = obj.faxnum
        postData.address = obj.address
        postData.area = JSON.stringify(obj.region)
        postData.postcode = obj.postalCode
        console.log(postData)
        this.$refs[name].validate((valid) => {
          if (valid) {
            let qs = require('qs');
            this.axios({
                method: 'post',
                url: '/v1/dept/add',
                data: qs.stringify(postData)
            })
            .then(res => {
                let needData = res.data;
                if (needData.code == 200) {
                    that.$Message.success('添加成功');
                    that.$Modal.remove()
                    setTimeout(function(args) {
                      that.$router.go(-1);
                    }, 500)
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
      cancel() {
        let that = this;
        this.$Modal.remove()
        setTimeout(function(args) {
          that.$router.go(-1);
        }, 500)
      }
    },
    mounted() {
      let that = this;
      //组织属地关系
      if (!this.$store.state.realtive.length) {
        that.$store.commit('getRealtive', {_: this});
      };
      //党组织类型
      if (!this.$store.state.dangType.length) {
        that.$store.commit('getType', {_: this});
      };
      //党组织领导班子选举方式
      if (!this.$store.state.voteStyle.length) {
        that.$store.commit('getVote', {_: this});
      };


    }
  }
</script>
<style>
  .ivu-date-picker-transfer {
    width: 216px;
  }
</style>
