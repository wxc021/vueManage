<!--党组织管理/单位信息添加弹窗-->
<template>
  <div class="UnitAdd">
    <!-- <Modal
      v-model="modal1"
      title="单位维护"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name="vertical-center-modal"
      @on-ok="handleSubmit('UnitAddForm')"
      @on-cancel="cancel">
      <Form ref="UnitAddForm" :model="UnitAddForm" :rules="ruleValidate" :label-width="120" label-position="left">
        <Row>
          <Col span="16">
            <FormItem label="单位名称：" prop="unitName">
              <Input v-model="UnitAddForm.unitName" @click.native="popTree" :disabled="isDisable" placeholder="请输入"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal> -->
    <unitTree v-if="treeShow" 
    @setConfirm="setConfirm" 
    @setCancer="setCancer" 
    
    :setid="setid"></unitTree>
  </div>
</template>
<script>
  import orgTree from '@/components/pop/orgTree.vue'
  import unitTree from '@/components/pop/baseInfoTypeTree.vue'
  export default {
    name:'UnitAdd',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        treeShow:true,
        setid: '',//编辑的时候传入的id,
        params:{org_id:this.$route.params.id ? this.$route.params.id : ''},
        uri:'/v1/trees/org-trees',//动态传递单位树的接口地址
        org_id:'',//选择的单位id
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
      orgTree,
      unitTree
    },
    methods: {
      handleSubmit(name) {
        // this.$refs[name].validate((valid) => {
        //   if (valid) {
        //     this.$Message.success('提交成功!');
        //     this.$router.go(-1)
        //   } else {
        //     this.loading=false;
        //     this.$Message.error('表单验证失败!');
        //     setTimeout(() => {
        //       this.loading=true;
        //     }, 20);
        //   }
        // })
        let qs= require("qs");
        let that = this;
        this.axios({
            method: 'post',
            url: '/v1/dept/bind-org-add',
            data:qs.stringify({
              dept_id: this.$route.params['id'],
              org_id:that.org_id
            })
          })
          .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
              this.$Message.success('新增成功');
              this.$router.go(-1)
            } else {
              this.$Message.error(needData.msg);
            }
          })
          .catch(err => {
            this.$Message.error('网络请求异常');
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
        //this.$store.state.unitId=item.data['nid'];
        this.org_id = item.data['nid'];
        this.UnitAddForm.unitName = item.data['name'];
        this.handleSubmit();
      },
      setCancer() {
        this.treeShow = false;
        this.$router.go(-1)
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
