<!--党组织管理/班子成员/选择外部人员-->
<template>
  <div class="TeamMemberOutside">
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
        <Form ref="outsideMemberForm" label-position="right" :model="outsideMemberForm" :label-width="110" :rules="ruleValidate">
          <FormItem label="居民身份证号" prop="name">
            <Row>
              <Col span="18">
              <Input :maxlength="18" type="text" style="width: 100%;" v-model="outsideMemberForm.name" placeholder="请输入..."></Input>
              </Col>
              <Col span="4">
              <Button type="error" @click="selectID('outsideMemberForm')">查询</Button>
              </Col>
            </Row>
          </FormItem>
          <p style="margin-bottom: 20px;">查询结果</p>
          <Table highlight-row @on-current-change="currentChange" border :columns="columns4" :data="data1"></Table>
        </Form>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script>
  import orgTree from '@/components/pop/orgTree.vue'
  export default {
    name:'TeamMemberOutside',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        outsideMemberForm: {  //form的绑定
          name:'',//选择的党员
        },
        selListData:'',
        columns4: [
          {
            title: '姓名',
            key: 'real_name'
          },
          {
            title: '所属党组织',
            key: 'branch_name'
          },
          {
            title: '联系方式',
            key: 'mobile'
          }
        ],
        data1: [],
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
              url:'/v1/member/idcard-detail',
              params:{
                id:that.outsideMemberForm.name
              }
            })
            .then(res=>{
              let needData = res.data;
              if(needData.code='200'){
                console.log(needData.data);

                that.data1=needData.data;
              }
            })
          } else {
            this.$Message.error('身份证号格式错误!');
          }
        })
      },
      cancel () {
        this.$Message.info('操作取消');
        this.$emit('setCancer');
      },
      //点击选项数据的
      currentChange(data){
        this.selListData=data;
      },
      cancel() {
        this.$emit('setOutCancer');
      },
      ok() {
        if (this.selListData) {
          this.modal1=false;
          this.$emit('setConfirm', {data: this.selListData}); 
        }
        else{
          this.$Message.info('请查询并选择');
        }
      }
    }
  }
</script>
<style>
  .border-class{
    border: 1px solid #ccc !important;
  }

</style>
