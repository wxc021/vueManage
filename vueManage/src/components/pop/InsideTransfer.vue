<!--党组织维护下/整建制转移/内部转移弹窗-->
<template>
  <div class="InsideTransfer">
    <Modal
      v-model="modal1"
      title="内部整建制转移"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name="vertical-center-modal max-height"
      @on-ok="handleSubmit('formInline')"
      @on-cancel="cancel">
      <Row>
        <Col span="22">
          <Form ref="formInline" :model="formInline" :label-width="150" :rules="ruleValidate">
            <FormItem label="被转移党组织:">
              <p style="font-size: 14px;">{{treeName}}</p>
            </FormItem>
            <FormItem label="目的党组织:">
              <div class="" style="height:300px;">
                <Slide ref="slide"
                 @reflashList="reflashList"
                 @getnode="getnode"
                 @slideDown="slideDown"
                 :url="url"
                 :openitem="openitem"
                 :currentnode="currentnode"
                 :openlist="openlist"
                 style="border: 1px solid #e2e2e2;border-radius: 2px;max-height:330px;overflow-y: auto;overflow-x: hidden;">
                </Slide>
              </div>
            </FormItem>
            <FormItem label="新代码（最后3位）:" prop="code">
              <Input v-model="formInline.code" placeholder="请输入" :maxlength="3"></Input>
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
    name:'InsideTransfer',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        openitem: [],
        treeName: '',
        remberData: {},
        openlist: [],
        memberList:'',//关联当前党支部下的党员list
        url:'/v1/trees/search-list',
        currentnode: '',
        formInline:{
          code:'',//新代码
        },
        ruleValidate:{
          code: [
            {required: true, message: '代码不能为空', trigger: 'blur'}
          ],
        },

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
          that.$router.go(-1);
        }, 500)
      },
      handleSubmit (name) {
        let that = this;
        if(this.$route.params['id'] == this.$store.state.remberId) {
          that.$Message.error('被转移党组织和目的党组织不能一样');
          setTimeout(() => {
              that.loading = false;
              that.$nextTick(() => {
                  that.loading = true;
              });
          }, 1000);
        } else 
        this.$refs[name].validate((valid) => {
          if (valid) {
            let postData = {
              move_id: this.$route.params['id'],
              target_id: this.$store.state.remberId,
              partycode: this.formInline.code
            };
            this.axios({
                method: 'get',
                url: '/v1/dept/move',
                params: postData
            })
            .then(res => {
                let needData = res.data;
                if (needData.code == 200) {
                    that.$Message.success('转移成功!');
                    that.$router.go(-1);
                } else {
                    setTimeout(() => {
                        that.loading = false;
                        that.$nextTick(() => {
                            that.loading = true;
                        });
                    }, 1000);
                    that.$Message.error(needData.msg);
                }
            })
            .catch(err => {
              setTimeout(() => {
                  that.loading = false;
                  that.$nextTick(() => {
                      that.loading = true;
                  });
              }, 1000);
                this.$Message.error('网络请求异常');
            })
          } else {
            this.$Message.error('表单验证失败!');
            setTimeout(() => {
                that.loading = false;
                that.$nextTick(() => {
                    that.loading = true;
                });
            }, 1000);
          }
        })
      },
      getnode() {

      },
      slideDown() {
      },
      reflashList(item) {
        this.remberData = item.data;
        let that=this;
      },
      ok(){
        this.$router.go(-1)
        this.$Message.success("提交成功")
      }
    },
    mounted() {
      this.treeName = this.$route.params.data['name'];
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

  /*.TeamMember .ivu-modal{*/
    /*width: 950px !important;*/
  /*}*/
</style>
