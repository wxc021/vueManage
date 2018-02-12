<!--党组织管理/党支部委会/党支部撤销弹窗-->
<template>
  <div class="PartyRevoke">
    <Modal
      v-model="modal1"
      title="党支部撤销"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name="vertical-center-modal"
      :closable=false
      @on-ok="handleSubmit('PartyRevokeFormItem')"
      @on-cancel="cancel">
      <Row>
        <Col span="12">
          <Form :model="PartyRevokeFormItem" ref="PartyRevokeFormItem" :label-width="120" :rules="ruleValidate">
            <FormItem label="撤销日期：" prop="revoketDate">
              <DatePicker style="width:100%" type="date" placeholder="选择撤销日期" v-model="PartyRevokeFormItem.revoketDate"></DatePicker>
            </FormItem>
          </Form>
        </Col>
        <Col span="24">
          <p style="color: #F14B3F; margin-left: 30px;"><span>注意：1.要撤销的党支部不能有现实党员和现实申请人</span>  <span style="margin-left: 5px;">2.党支部撤销后将成为历史党支部</span></p>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script>
  export default {
    name:'PartyRevoke',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        PartyRevokeFormItem: {  //form的绑定
          revoketDate:'',//撤销时间
        },
        ruleValidate: {
          revoketDate: [
            {required: true,type:'date', message: '撤销日期不能为空', trigger: 'change'}
          ],

        }
      }
    },

    methods: {
      setStr(val) {
          return val > 9 ? val : '0'+val;
      },
      getDate(obj) {
          if (obj == '') {
            return  '';
          } else {
            return obj.getFullYear()+'-'+( this.setStr( obj.getMonth()+1 ) )+'-'+this.setStr(obj.getDate());
          }
      },
      handleSubmit(name) {
        let that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            let qs = require('qs');
            this.axios({
                method: 'post',
                url: '/v1/dept/revoke',
                data: qs.stringify({
                    dept_id: this.$route.params['ids'],
                    date: this.getDate(this.PartyRevokeFormItem.revoketDate)
                })
            })
            .then(res => {
                let needData = res.data;
                if (needData.code == 200) {
                    that.$Message.success('撤销成功!');
                    that.$router.go(-1);
                } else {
                    that.$Message.error(needData.msg);
                    setTimeout(() => {
                        that.loading =! that.loading;
                        that.$router.go(-1);
                    }, 20);
                }
            })
            .catch(err => {
                this.$Message.error('网络请求异常');
                setTimeout(() => {
                  that.loading =! that.loading;
              }, 20);
            })
          } else {
            this.$Message.error('表单验证失败!');
            setTimeout(() => {
                that.loading =! that.loading;
            }, 20);
      }
      })
      },
      cancel () {
        this.$router.go(-1)
      }
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
