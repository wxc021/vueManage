<!--党组织管理/单位信息添加弹窗-->
<template>
  <div class="UnitAdd">
    <Modal
      v-model="modal1"
      title="单位维护"
      width="950"
      :loading="loading"
      :mask-closable=false
      @on-ok="handleSubmit('UnitAddForm')"
      @on-cancel="cancel">
      <Form ref="UnitAddForm" :model="UnitAddForm" :rules="ruleValidate" :label-width="120" label-position="left">
        <Row>
          <Col span="16">
            <FormItem label="单位名称：" prop="unitName">
              <Input v-model="UnitAddForm.unitName" @click.native="popTree" :disabled="isDisable" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="单位性质类别：" prop="unitType">
              <Input v-model="UnitAddForm.unitType" disabled placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="法人单位标识：" prop="unitRelationship">
              <Input v-model="UnitAddForm.unitRelationship" disabled  placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="法人单位党的基层组织情况：" prop="unitCategory">
              <Input v-model="UnitAddForm.unitCategory" disabled  placeholder="请输入"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
    <orgTree v-if="treeShow" @setConfirm="setConfirm" @setCancer="setCancer" :setid="setid" :uri="uri"></orgTree>
  </div>
</template>
<script type="text/ecmascript-6">
  import orgTree from '@/components/pop/orgTree.vue'
  export default {
    name:'UnitAdd',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        treeShow:false,
        setid: '',//编辑的时候传入的id
        uri:'',//动态传递单位树的接口地址
        UnitAddForm: {  //form的绑定
          unitName:'',//单位名称
        },
        ruleValidate: {
          unitName: [
            {required: true, message: '请选择单位名称', trigger: 'change'}
          ],
        },
        isDisable:false,
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
    components:{
      orgTree
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
            this.modal1=false;
            this.$router.go(-1)
          } else {
            this.loading=false;
            this.$Message.error('表单验证失败!');
            setTimeout(() => {
              this.loading=true;
            }, 20);
          }
        })
      },
      popTree(){
        this.treeShow = true;
      },
      cancel () {
        this.$router.go(-1)
        this.$Message.info('点击了取消');
      },
      setConfirm(item) {
        this.treeShow = false;
        this.UnitAddForm.unitName = item.data['name'];
      },
      setCancer() {
        this.treeShow = false;
      }
    },
    mounted(){
      if(this.$route.params.state=='0'){
        this.isDisable=true;
        this.popTree = ''
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
