<!--单位管理/整建制转移/内部转移弹窗-->
<template>
  <div class="UnitTransfer">
    <Modal
      v-model="modal1"
      title="内部整建制转移"
      width="950"
      :mask-closable=false
      :loading="loading"
      class-name="vertical-center-modal"
      @on-ok="ok"
      @on-cancel="cancel">
      <Row>
        <Col span="22">
          <Form ref="formInline" :model="formInline" :label-width="128" :rules="ruleValidate">
            <FormItem label="被转移单位:">
              <p style="font-size: 14px;">{{treeName}}</p>
            </FormItem>
            <FormItem label="目的单位:">
              <div class="" style="height: 300px;">
                <Slide ref="slide"
                 @reflashList="reflashList"
                 @getnode="getnode"
                 @slideDown="slideDown"
                 :url="url"
                 :params="params"
                 :openitem="openitem"
                 :currentnode="currentnode"
                 :openlist="openlist"
                 unitType="2"
                 style="border: 1px solid #e2e2e2;border-radius: 2px;max-height:330px;overflow-y: auto;overflow-x: hidden; font-size: 14px;">
                </Slide>
              </div>
              
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script>
  import Slide from '@/components/slide.vue'
  export default {
    name:'UnitTransfer',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        openitem: [],
        treeName: this.$route.params.name ? this.$route.params.name : this.$store.state.remberNode.name,
        remberData: {},
        openlist: [],
        memberList:'',//关联当前党支部下的党员list
        url: '/v1/trees/org-trees',
        params:{org_id:this.$route.params.dept ? this.$route.params.dept : ''},
        currentnode: '',
        formInline:{
          code:'',//新代码
        },
        ruleValidate:{
          code: [
            {required: true, message: '代码不能为空', trigger: 'blur'}
          ],
        },
        lists: []
      }
    },
    components:{
      Slide
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      cancel(){
        let that = this;
        this.$Modal.remove()
        setTimeout(function(args) {
          that.$router.push({name:'unitManage'})
        }, 500)
      },
      getnode() {

      },
      slideDown() {
      },
      getList() {
        let qs = require('qs');
        let that = this;
        this.axios({
            method: 'get',
            url: '/v1/org/unitlist',
            params: {org_id: this.$store.state['remberId'], opt: 1}
        })
        .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
               this.lists =  needData.data;
            } else {
                that.$Message.error(needData.msg);
            }
        })
        .catch(err => {
            this.$Message.error('网络请求异常');
        })
      },
      reflashList(item) {
        this.remberData = item.data;
        let that=this;
      },
      ok() {
        let qs = require('qs');
        let that = this;
        if(this.$route.params['id'] == this.$store.state.remberId) {
          this.$Message.error('被转移单位和目的单位不能一样');
          setTimeout(() => {
              that.loading = false;
              that.$nextTick(() => {
                  that.loading = true;
              });
          }, 1000);
          return;
        }
        this.axios({
            method: 'post',
            url: '/v1/org/unitchange',
            data: qs.stringify({
                old_org_id: this.$route.params['id'],
                new_org_id: this.$store.state.remberId,
            })
        })
        .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
                that.$Message.success('转移成功');
                that.$router.push({name:'unitManage'})
            } else {
                that.$Message.error(needData.msg);
                setTimeout(() => {
                    that.loading = false;
                    that.$nextTick(() => {
                        that.loading = true;
                    });
                }, 1000);
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

      }
    },
    mounted() {
//      this.getList();
    }
  }
</script>
<style>
  .TeamMember{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .icon-img{
    position: relative;
    top: 2px;
    margin-right: 5px;
  }
</style>
