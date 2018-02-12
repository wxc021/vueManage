<!--工作岗位新增的弹窗-->
<template>
  <div class="WorkPost">
    <Modal
      v-model="modal1"
      title="工作岗位"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name="vertical-center-modal"
      @on-ok="handleSubmit('WorkerFormItem')"
      @on-cancel="cancel">
      <Row>
        <Col span="12">
          <Form :model="WorkerFormItem" ref="WorkerFormItem" :label-width="120" :rules="ruleValidate">
            <FormItem label="开始日期：" prop="startDate">
              <DatePicker style="width:100%" type="date" placeholder="选择开始日期" v-model="WorkerFormItem.startDate"></DatePicker>
            </FormItem>
            <FormItem label="截止日期：" prop="endDate">
              <DatePicker style="width:100%" type="date" placeholder="选择截止日期" v-model="WorkerFormItem.endDate"></DatePicker>
            </FormItem>
            <FormItem label="工作岗位：" prop="job">
              <Select v-model="WorkerFormItem.job" placeholder="请选择">
                <Option value="0">技术岗</Option>
                <Option value="1">非技术岗</Option>
              </Select>
            </FormItem>
            <FormItem label="新社会阶层类型：" prop="newType">
              <Select v-model="WorkerFormItem.newType" placeholder="请选择">
                <Option value="0">类型A</Option>
                <Option value="1">类型B</Option>
              </Select>
            </FormItem>
            <FormItem label="一线情况：" prop="frontlineSituation">
              <Select v-model="WorkerFormItem.frontlineSituation" placeholder="请选择">
                <Option value="0">情况A</Option>
                <Option value="1">情况B</Option>
              </Select>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script>
  export default {
    name:'WorkPost',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        WorkerFormItem: {  //form的绑定
          startDate:'',//开始时间
          endDate:'',//结束时间
          job:'',//工作岗位
          newType:'',//新社会阶层类型
          frontlineSituation:'',//一线情况
        },
        ruleValidate: {
          startDate: [
            {required: true,type:'date', message: '开始时间不能为空', trigger: 'change'}
          ],
          endDate: [
            {required: true,type:'date', message: '结束时间不能为空', trigger: 'change'},
          ],
          job:[
            {required: true, message: '工作岗位不能为空', trigger: 'change'}
          ],
          newType:[
            {required: true, message: '新社会阶层类型不能为空', trigger: 'change'},
          ],
          frontlineSituation:[
            {required: true, message: '一线情况不能为空', trigger: 'change'},
          ],
        }
      }
    },

    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            //console.log(Date.now(this.WorkerFormItem.startDate),Date.now(this.WorkerFormItem.endDate));
            var startTime= new Date(this.WorkerFormItem.startDate).getTime();//开始时间转化时间戳
            var endTime= new Date(this.WorkerFormItem.endDate).getTime();//结束时间转化时间戳
            if(endTime<startTime){
              this.loading=false;
              this.$Message.error('结束时间不能小于开始时间!');
              setTimeout(() => {
                this.loading=true;
              }, 20);
            }else if(startTime>endTime){
              this.loading=false;
              this.$Message.error('开始时间不能大于结束时间!');
              setTimeout(() => {
                this.loading=true;
              }, 20);
            }else{
              this.$Message.success('提交成功!');
              this.modal1=false;
            }



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
        this.$Message.info('点击了取消');
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
