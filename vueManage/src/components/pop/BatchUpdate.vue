<!--党组织管理/批量修改弹窗-->
<template>
  <div class="BatchUpdate">
    <Modal
      v-model="modal1"
      title="批量修改"
      width="950"
      :loading="loading"
      :mask-closable=false
      @on-ok="handleSubmit('BatchUpdateForm')"
      class-name="vertical-center-modal"
      @on-cancel="cancel">
      <Form ref="BatchUpdateForm" :model="BatchUpdateForm" :rules="ruleValidate"  inline label-position="top">
        <Row>
          <Col span="8">
            <FormItem label="选择信息集：" prop="infoSet"  style="width: 95%;">
              <Select v-model="BatchUpdateForm.infoSet" placeholder="请选择信息集">
                <Option value="0">基本信息</Option>
                <Option value="1">联系方式</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="选择信息项：" prop="infoOption"  style="width: 95%;">
            <Select v-model="BatchUpdateForm.infoOption" placeholder="请选择信息集">
              <Option value="0">党组织代码</Option>
              <Option value="1">党组织类型</Option>
            </Select>
          </FormItem>
          </Col> <Col span="6">
          <FormItem label="修改值：" prop="updateValue" style="width: 95%;">
            <Input v-model="BatchUpdateForm.updateValue" placeholder="请输入"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Table border :columns="columns1" :data="data1"></Table>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
  export default {
    name:'CombinationQuery',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        BatchUpdateForm: {  //form的绑定
          revoketDate:'',//撤销时间
        },
        ruleValidate: {
          infoSet: [
            {required: true, message: '请选择基本信息集', trigger: 'change'}
          ],
          infoOption: [
            {required: true, message: '请选择基本信息项', trigger: 'change'}
          ],
          updateValue: [
            {required: true, message: '修改值不能为空', trigger: 'blur'}
          ]
        },
        columns1: [
          {
            type: 'selection',
            width: 40,
            align: 'center'
          },
          {
            title: '党组织名称',
            key: 'full_name'
          },
          {
            title: '党组织编号',
            key: 'partycode',
            width:200
          },
          {
            title: '党组织属地关系',
            key: 'affiliation_id'
          },
          {
            title: '本届班子当选日期',
            key: 'start_time'
          },
        ],
        data1: [
          {
            full_name: '天房科技党总支',
            partycode: '2568',
            affiliation_id: '直属关系',
            start_time:'2012-05-11',
          },
          {
            full_name: '天房科技党总支',
            partycode: '1314',
            affiliation_id: '直属关系',
            start_time:'2013-12-11',
          },
          {
            full_name: '天房科技党总支',
            partycode: '0945',
            affiliation_id: '外派关系',
            start_time:'2017-05-11',
          },

        ]
      }
    },

    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
            this.modal1=false;
            this.$router.go(-1);
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
        this.$router.go(-1);
      }
    }
  }
</script>
<style>
  .box-wrap{
    width: 100%;
    height: 180px;
    border: 1px solid #dddee1;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;;
    margin-top: 20px;
  }
  .bold{
    font-weight: bold;
    font-size: 14px;
  }
  .fr{
    float: right;
  }
  .mr-5{
    margin-right: 10px;
    padding-left:25px ;
    padding-right:25px ;
  }
  .ml-10{
    margin-left: 10px;
  }
  .mb10{
    margin-bottom: 10px;
  }
 .w100{
   width: 100px;
 }
</style>
