<!--党组织管理/班子成员/选择内部人员-->
<template>
  <div class="addManage">
    <Modal
      v-model="modal1"
      title="新增管理员"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name="max-height vertical-center-modal"
      @on-ok="handleSubmit('insideMemberForm')"
      @on-cancel="cancel">
      <Row>
        <Col span="18">
          <Form :label-width="40" label-position="left">
            <FormItem label="类型">
              <RadioGroup v-model="type">
                <Radio  label="0">选择内部人员</Radio>
                <Radio  label="1">选择外部人员</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
        </Col>
      </Row>
      <Row :gutter="16" v-if="type==0">
        <Col span="18">
          <p style="margin-bottom: 10px;">选择党组织</p>
          <Slide ref="slide"
           @reflashList="reflashList"
           @getnode="getnode"
           @slideDown="slideDown"
           :url="url"
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
      <div class="wrap-outside" v-if="type==1">
        <Row>
          <Col span="15">
            <Form label-position="right" :label-width="88" :model="outsideMemberForm">
              <FormItem label="居民身份证号:">
                <Input v-model="outsideMemberForm.name"></Input>
              </FormItem>
              </Form>
          </Col>
          <Col span="3">
            <Button style="margin-left: 14px;" type="error" @click="search">查询</Button>
          </Col>
        </Row>
        <Row>
          <Col span="20" v-if="isSearch">
          <p style="margin-bottom: 14px;">查询结果:</p>
          <Table border :columns="columns7" :data="data6"></Table>
          </Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import orgTree from '@/components/pop/orgTree.vue'
  import Slide from '@/components/slide.vue'
  export default {
    name:'addManage',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        type:'0',//选择类型(默认选择内部人员)
        addclass:"border-class",
        openitem: [],
        remberData: {},
        radiosObj: {},
        isSearch:false,//是否显示外部人员查询列表
        openlist: [],
        memberList:'',//关联当前党支部下的党员list
        url:'/v1/trees/search-list',
        currentnode: '',
        insideMemberForm: {  //form的绑定
          name:'',//选择的党员
        },
        outsideMemberForm: {  //form的绑定
          name:'',//选择的党员
        },

        getI: {},
        ruleValidate: {
          name: [
            { required: true, message: '请选择党员', trigger: 'change' },
          ]
        },
        columns7: [
          {
            title: '选取',
            key: 'selectParty',
            width: 100,
            align: 'center',
            render:(h, params) => {
              return h('div', {
                  class: {
                    'radio-outer': true
                  },
                  nativeOn: {
                    click() {
                      event.stopPropagation();
                    }
                  },
                },
                [
                  h('Radio', {
                    class: {
                      'radio-check': true
                    },
                    props: {
                      size: 'large',
                      value: this.radiosObj['items'+params.row._index]
                    },
                    on: {
                      'on-change': (val) => {
                        console.log(params);
                        event.stopPropagation()
                        this.changeRadio(val, params);
                      }
                    },
                    nativeOn: {
                      click() {
                        event.stopPropagation()
                      }
                    },
                  }),
                ]);
            }
          },
          {
            title:'姓名',
            key:'name',
          },
          {
            title: '所属党组织',
            key: 'party'
          },
          {
            title: '联系方式',
            key: 'tel'
          }
        ],
        data6: [
          {
            name:'王叙淳',
            party: '天房科技党支部',
            tel: '13202562563'
          },
          {
            name:'王叙淳',
            party: '天房科技党支部',
            tel: '13202562563'
          },
          {
            name:'王叙淳',
            party: '天房科技党支部',
            tel: '13202562563'
          },
          {
            name:'王叙淳',
            party: '天房科技党支部',
            tel: '13202562563'
          },
        ]
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
      search() {
        this.isSearch=true;
      },
      changeRadio(val, params) {
        let that = this;
        for(let i in that.radiosObj) {
          that.$set(that.radiosObj, i, false);
        }
        that.$set(that.radiosObj, 'items'+params.row._index, true);
        //this.remberRow = Object.assign({}, params);
      },
      cancel () {
        this.$Message.info('点击了取消');
        this.$emit('setInCancer');
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
        this.$emit('setCancer');
        this.$router.go(-1)
      },
      ok() {
        this.$emit('setConfirm', {data: this.remberData});
        this.$router.go(-1)
      }
    }
  }
</script>
<style>
  .border-class{
    border: 1px solid #ccc !important;
  }

</style>
