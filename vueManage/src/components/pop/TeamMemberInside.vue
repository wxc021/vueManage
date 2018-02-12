<!--党组织管理/班子成员/选择内部人员-->
<template>
  <div class="TeamMemberInside">
    <Modal
      v-model="modal1"
      title="选择内部人员"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name="vertical-center-modal"
      @on-ok="handleSubmit('insideMemberForm')"
      @on-cancel="cancel">
      <Row :gutter="16">
        <Col span="18">
          <p style="margin-bottom: 10px;">选择党组织</p>
          <Slide ref="slide"
           @reflashList="reflashList"
           @getnode="getnode"
           @slideDown="slideDown"
           :url="url"
           loadUrl="/v1/trees/get-dept-info"
           :params="params"
           :openitem="openitem"
           :currentnode="currentnode"
           :openlist="openlist"
           style="border: 1px solid #e2e2e2;border-radius: 2px;max-height:450px;min-height: 400px;overflow-y: auto;overflow-x: hidden;">
          </Slide>
        </Col>
        <Col span="6">
          <p style="margin-bottom: 10px;">选择党员</p>
          <div class="wrap" style="padding: 0 12px;border-radius: 2px;border: 1px solid #e2e2e2;;min-height: 400px;max-height: 450px;overflow-y: auto;overflow-x: hidden;">
            <Form ref="insideMemberForm" :model="insideMemberForm" :rules="ruleValidate">
              <FormItem label="" prop="name">
                <RadioGroup v-model="insideMemberForm.name" vertical>
                  <Radio :label='item.id' v-for="item in memberList" :key="item.id">{{item.name}}</Radio>
                </RadioGroup>
              </FormItem>
             </Form>
          </div>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import orgTree from '@/components/pop/orgTree.vue'
  import Slide from '@/components/slide.vue'
  export default {
    name:'TeamMemberInside',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        addclass:"border-class",
        openitem: [],
        remberData: {},
        openlist: [],
        memberList:'',//关联当前党支部下的党员list
        url:'/v1/trees/search-list',
        params:{},
        currentnode: '',
        insideMemberForm: {  //form的绑定
          name:'',//选择的党员
        },
        getI: {},
        ruleValidate: {
          name: [
            { required: true, message: '请选择党员', trigger: 'change' },
          ]
        }
      }
    },
    components:{
      Slide
    },
    methods: {
      //获取内部人员选中党员的id 和name
      getItem() {
      let that = this;
        if(this.memberList){
          this.memberList.forEach(item => {
            if(that.insideMemberForm.name == item.id){
              that.getI = item;
            }
          })
        }
      },
      //提交表单验证
      handleSubmit (name) {
        this.getItem()
        console.log(this.getI)
        this.$emit('autoGet', {item: this.getI})
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
            this.modal1=false;
            this.$emit('setInCancer');
            //this.$emit('setInConfirm', {data: this.insideMemberForm.name});
            this.getItem();//传递内部人员选中的党员的id 和name
          } else {
            this.loading=false;
            this.$Message.error('表单验证失败!');
            setTimeout(() => {
              this.loading=true;
            }, 20);
          }
        })
      },
      handleNodeClick(data) {
      },
      reflashList(item) {
        this.remberData = item.data;
        //console.log(item);
        let that=this;
        if(item.data.type_icon=='5'){
          this.axios({
            method:'get',
            url:'/v1/trees/users',
            params:{
              dept_id:item.id
            }
          })
          .then(res =>{
            let needData = res.data;
            if (needData.code='200'){
              that.memberList=needData.data;
            }else{
              that.$Message.error(needData.msg);
            }
        })




        }


      },
      slideDown() {
      },
      getnode() {
      },
      cancel() {
          this.$emit('setInCancer');
      }
    },
    mounted(){
        console.log(this.$route.params);
        this.params.dept_id=this.$route.params.id;
    }
  }
</script>
<style>
  .border-class{
    border: 1px solid #ccc !important;
  }

</style>
