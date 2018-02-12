<!--党支部维护/党支部合并弹窗-->
<template>
  <div class="PartyMerge">
    <Modal
      v-model="modal1"
      title="党支部合并"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name="vertical-center-modal max-height"
      :closable=false
      @on-ok="handleSubmit('MergeFormItem')"
      @on-cancel="cancel">
      <Row>
        <Col span="15">
          <Form :model="MergeFormItem" label-position="top" ref="MergeFormItem"  :rules="ruleValidate">
            <FormItem label="选择需要合并的党支部或联合党支部:" prop="checkbox">
                <CheckboxGroup v-model="MergeFormItem.checkbox">
                  <Row style="border: 1px solid #ccc;padding: 20px 15px">
                    <Row v-for="item in lists" :key="item.id"><Checkbox :label="item.id">{{item.name}}</Checkbox></Row>
                  </Row>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="保留党支部" prop="RetainParty">
              <Select v-model="MergeFormItem.RetainParty" placeholder="请选择保留党支部">
                <Option :value="item.id" v-for="item in newList" key="item">{{item.name}}</Option>
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
    name:'PartyMerge',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading:true,
        lists: [],
        MergeFormItem: {  //form的绑定
          checkbox:[],//选择合并的党支部
          RetainParty:'',//保留党支部
        },
        ruleValidate: {
          checkbox: [
            { required: true, type: 'array', min: 2, message: '至少选择两个党支部', trigger: 'change' },
          ],
          RetainParty: [
            {required: true, message: '请选择保留党支部', trigger: 'change'}
          ],

        }
      }
    },
    computed: {
      newList() {
        let arr = [];
        this.MergeFormItem.checkbox.forEach(item => {
          for (let i = 0; i < this.lists.length; i++) {
            if (item == this.lists[i].id) {
                arr.push(this.lists[i])
            };
          };
        })
        return arr;
      }
    },
    methods: {
      handleSubmit(name) {
        let that = this;
        this.$refs[name].validate((valid) => {
            if (valid) {
                let inx = this.MergeFormItem.checkbox.indexOf(this.MergeFormItem.RetainParty);
                let newcheck = Object.assign([], this.MergeFormItem.checkbox);
                if(inx != -1) {
                  newcheck.splice(inx,1);
                }
                this.axios({
                    method: 'get',
                    url: '/v1/branch/merge',
                    params: {target_id: this.MergeFormItem.RetainParty, merge_ids: newcheck.join()} 
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.$Message.success('合并成功');
                        setTimeout(() => {
                          that.goback();
                        }, 1000);
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
                    this.$Message.error('网络请求异常');
                    this.$router.go(-1);
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
      cancel () {
        this.$router.go(-1)
      },
      getList() {
        let that = this;
        this.axios({
            method: 'get',
            url: '/v1/dept/list',
            params: {'dept_id': this.$route.params['ids'], opt: 1}
        })
        .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
                needData.data.forEach(item => {
                  if (item.deleteflag == 0) {
                    if (item.type_icon == 5) {
                      that.lists.push(item)
                    };
                  };
                })
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
            this.$Message.error('网络请求异常');
            this.$router.go(-1);
        })
      }
    },
    mounted() {
      this.getList();
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
