<!--党组织管理/班子成员/选择指导员-->
<template>
  <div class="UnitTeacher">
    <Modal
      v-model="modal1"
      title="选择外部人员"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name="vertical-center-modal"
      @on-ok="ok"
      @on-cancel="cancel">
      <Row :gutter="16">
        <Col span="14">
        <Form ref="UnitTeacherForm" label-position="left" :model="UnitTeacherForm" :label-width="110" :rules="ruleValidate">
          <FormItem label="居民身份证号:" prop="name">
            <Row>
              <Col span="18">
              <Input :maxlength="18" type="text" style="width: 100%;" v-model="UnitTeacherForm.name" placeholder="请输入..."></Input>
              </Col>
              <Col span="4">
              <Button type="error" @click="selectID('UnitTeacherForm')">查询</Button>
              </Col>
            </Row>
          </FormItem>
          <Row v-if="isModal">
            <p style="margin-bottom: 20px;">查询结果</p>
            <Table @on-selection-change="slectData" border :columns="columns4" :data="data1"></Table>
          </Row>
        </Form>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import orgTree from '@/components/pop/orgTree.vue'
  export default {
    name:'UnitTeacher',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        isModal:false,
        selection:[],//选择的指导员信息
        UnitTeacherForm: {  //form的绑定
          name:'',//选择的党员
        },
        selListData:'',
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
            title: '所属党组织',
            key: 'dept_name'
          },
          {
            title: '联系方式',
            key: 'mobile'
          }
        ],
        data1: [
          {
            id:'0',
            real_name: '张三',
            dept_name: '天房科技党支部',
            mobile: '13888888888',
          },
          {
            id:'1',
            real_name: '李四',
            dept_name: '天房科技党支部',
            mobile: '13888888888',
          },
          {
            id:'2',
            real_name: '王叙淳',
            dept_name: '天房科技党支部',
            mobile: '18630962742',
          }
        ],
        ruleValidate: {
          name: [
            { required: true,message: '请输入身份证号', trigger: 'change' },
            { type: 'string', min: 15, message: '身份证号格式不正确', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //提交表单验证
      handleSubmit (name) {

        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
            this.modal1=false;
            this.$emit('setOutCancer');

          } else {
            this.loading=false;
            this.$Message.error('表单验证失败!');
            setTimeout(() => {
              this.loading=true;
            }, 20);
          }
        })
      },
      selectID (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('查询成功!');
            let that = this;
            this.axios({
              method:'get',
              url:'/v1/org/idcard-detail',
              params:{
                id:that.UnitTeacherForm.name
              }
            })
            .then(res=>{
              let needData = res.data;
              if(needData.code='200'){
                that.isModal=true;
                that.data1=needData.data[0];
              }
            })
          } else {
            this.$Message.error('身份证号格式错误!');
          }
        })
      },
      cancel () {
        this.$Message.info('点击了取消');
        this.$emit('setCancer');
      },
      //点击选项数据的
     slectData(selection){
       this.selection=selection;
     },
      setCancer(item) {
        this.isInside = false;
      },
      cancel() {
        this.$emit('setCancer');
      },
      ok() {
        let selection = this.selection;

        this.$emit('setOk',{'selection':selection});

      }
    }
  }
</script>
<style>
  .border-class{
    border: 1px solid #ccc !important;
  }

</style>
