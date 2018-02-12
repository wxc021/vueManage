<!--奖惩情况新增的弹窗-->
<template>
  <div class="RewardPunishment">
    <Modal
      v-model="modal1"
      title="奖惩情况"
      width="950"
      :loading="loading"
      :mask-closable="false"
      class-name="vertical-center-modal"
      @on-ok="handleSubmit('RewardFormItem')"
      @on-cancel="cancel">
      <Row>
        <Col span="15">
          <Form :disabled="disabled" :model="RewardFormItem" ref="RewardFormItem" :label-width="120" :rules="ruleValidate">
            <FormItem label="奖惩名称：" prop="rewardName">
              <!--<Select v-model="RewardFormItem.rewardName" style="width:300px" :disabled="disabled">-->
                  <!--<OptionGroup v-for="item in publish" :label="item.name" :key="item.name">-->
                      <!--<Option v-for="it in item.list" :value="it.id" :key="it.id" :disabled="item.choosed == 1 ? true : false">{{ it.name }}</Option>-->
                  <!--</OptionGroup>-->
              <!--</Select>-->
              <Cascader :render-format="renders" :disabled="disabled" :data="publish" v-model="RewardFormItem.rewardName"></Cascader>
            </FormItem>
            <FormItem label="批准组织：" prop="organization">
              <Input v-model="RewardFormItem.organization" placeholder="请选择批准组织" :disabled="disabled"></Input>
            </FormItem>
            <FormItem label="批准组织级别：" prop="leval">
              <Cascader :render-format="renders" :disabled="disabled" :data="leval" v-model="RewardFormItem.leval"></Cascader>
              <!-- <Select v-model="RewardFormItem.leval" style="width:300px"  placeholder="请选择批准组织级别"  :disabled="disabled">
                <Option v-for="item in leval" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select> -->
            </FormItem>
            <FormItem label="批准日期：" prop="ratifyDate">
              <DatePicker type="date" placeholder="选择日期" :value="RewardFormItem.ratifyDate" v-model="RewardFormItem.ratifyDate"  :disabled="disabled"></DatePicker>
            </FormItem>
            <FormItem label="奖惩说明" prop="rewardDesc">
              <Input v-model="RewardFormItem.rewardDesc" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="请输入奖惩说明"  :disabled="disabled"></Input>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Modal>
    <orgTree v-if="treeShow" @setConfirm="setConfirm" @setCancer="setCancer" :setid="setid"></orgTree>
  </div>
</template>
<script>
  import orgTree from '@/components/pop/orgTree.vue'
  export default {
    name:'RewardPunishment',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        treeShow: false,
        disabled: false,
        setid: '',//编辑的时候传入的id
        RewardFormItem: {  //form的绑定
          rewardName:[],//奖励名称
          organization:'',//批准组织
          leval: [],//级别
          ratifyDate:'',//批准日期
          rewardDesc:''//奖惩说明
        },
        ruleValidate: {
          rewardName: [
            {required: true,type:'array', min: 1, message: '奖惩名称不能为空', trigger: 'blur'}
          ],
          leval: [
            {required: true, type: 'array',min: 1, message: '批准组织级别不能为空', trigger: 'change'}
          ],
          organization: [
            {required: true, message: '批准组织不能为空', trigger: 'change'},
          ],
          ratifyDate:[
            {required: true,type:'date', message: '批准日期不能为空', trigger: 'change'}
          ],
          // rewardDesc:[
          //   {required: true, message: '职务说明不能为空', trigger: 'blur'},
          // ]
        },
        publish: [],
        leval: [],
      }
    },

    methods: {
      popTree() {
        // this.modal1 = false;
        this.treeShow = true;
      },
      //奖惩名称
      getPublish() {
          let that = this;
          let qs = require('qs');
          let searchList = function(id,data) {
            let temp = [];
            data.forEach(item => {
              if (item.pid == id) {
                temp.push(item);
              };
            });
            return temp;
          }
          this.axios({
              method: 'get',
              url: '/v1/dictionary/get-list-by-type',
              params: {
                  type: 'D05001',
              }
          })
          .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  that.publish=needData.data;
              } else {
                  that.$Message.error(needData.msg);
              }
          })
          .catch(err => {
              this.$Message.error('网络请求异常');
          })
      },
      //批准组织级别
      getLeval() {
          let that = this;
          let qs = require('qs');
          this.axios({
              method: 'get',
              url: '/v1/dictionary/get-list-by-type',
              params: {
                  type: 'C12007',
              }
          })
          .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => that.leval.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
          })
          .catch(err => {
              this.$Message.error('网络请求异常');
          })
      },
      getDate(obj) {
        return obj.getFullYear()+'-'+(obj.getMonth()+1)+'-'+obj.getDate();
      },
      handleSubmit(name) {
        let that = this;
        if(this.$route.params.type == 2) {
          this.$router.go(-1)
          return
        }
        this.RewardFormItem.ratifyDate = new Date(this.RewardFormItem.ratifyDate)
        this.$refs[name].validate((valid) => {
            if (valid) {
              let postData = {};
              let url = '';
              postData.dept_id = this.$route.params['id'];

              postData.type_id = this.RewardFormItem.rewardName.pop();
              //postData.approval_dept_id = this.$store.state.remberId;
              postData.approval_dept_level = this.RewardFormItem.leval.pop();

              postData.time = this.getDate(this.RewardFormItem.ratifyDate);
              postData.remark = this.RewardFormItem.rewardDesc;
              postData.approval_dept_name=this.RewardFormItem.organization;
              if (this.$route.params.type == 1) { //编辑
                url = "/v1/deptrule/modify-record"
                postData.id = this.$route.params.recodeId
              } else if(this.$route.params.type == 2) { //查看

              } else { // 新增
                url = '/v1/deptrule/add-record'
              }
              let qs = require('qs');
              this.axios({
                  method: 'post',
                  url: url,
                  data: qs.stringify(postData),
              })
              .then(res => {
                  let needData = res.data;
                  if (needData.code == 200) {
                    that.$Message.success('成功提交');

                    that.$router.go(-1);
                  } else {
                    setTimeout(() => {
                      that.loading = !that.loading;
                    }, 1000);
                    that.$Message.error(needData.msg);
                  }
              })
              .catch(err => {
                  this.$Message.error('网络请求异常');
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
      cancel () {
        this.$router.go(-1);
      },
      setConfirm(item) {
        this.treeShow = false;
        this.RewardFormItem.organization = item.data['name'];
      },
      setCancer() {
        this.treeShow = false;
      },
      getDetail(id) {
        let that = this;
        let qs = require('qs');
        this.axios({
            method: 'get',
            url: '/v1/deptrule/detail',
            params: {id: id, opt: 1}
        })
        .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
                let type_name_array=[];
                needData.data.type_name_array.forEach(item=>{
                    type_name_array.push(item.id);
                })

                that.RewardFormItem.rewardName = type_name_array;
                that.RewardFormItem.organization = needData.data.approval_dept_name;

                that.RewardFormItem.leval = needData.data.approval_dept_level_array.map(item => {return item.id;});

                that.RewardFormItem.ratifyDate = new Date(needData.data.time);
                that.RewardFormItem.rewardDesc = needData.data.remark;
            } else {
                that.$Message.error(needData.msg);
            }
        })
        .catch(err => {
            this.$Message.error('网络请求异常');
        })
      }
    },
    components: {
      orgTree
    },
    mounted() {
      this.getPublish();
      this.getLeval();
      switch(parseInt(this.$route.params.type)) {
        case 1:
          // 编辑
          this.disabled = false
          this.getDetail(this.$route.params.recodeId);
        break;
        case 2:
          // 查看
          this.disabled = true
          this.getDetail(this.$route.params.recodeId);
        break;
        default: this.disabled = false
      }
    }
  }
</script>
<style>
  .TeamMember{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  /*.TeamMember .ivu-modal{*/
    /*width: 950px !important;*/
  /*}*/
</style>
