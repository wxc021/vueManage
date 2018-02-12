<!--党员流出弹窗-->
<template>
  <div class="PartyMemberZhuanyi">
    <Modal
      v-model="modal1"
      title="党员流出"
      width="950"
      :loading="loading"
      :mask-closable=false

      @on-cancel="cancel">
      <Form>
        <Row>
            <Col span="8">
              	<FormItem label="转入党支部" prop="code">
	                <Input v-model="PartyMemberZhuanyiForm.uname" placeholder=""></Input>
	              </FormItem>
            </Col>
        </Row>
      </Form>

    </Modal>
  </div>
</template>
<script TYPE="text/ecmascript-6">
  export default {
    name:'PartyMemberZhuanyi',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
       PartyMemberZhuanyiForm:{
           outer_type:"",
           outer_reason :'',
           outer_time :'',
       },

      }
    },

    methods: {
      cancel () {
        this.$Message.info('点击了取消');
      }
    }
  }
</script>
