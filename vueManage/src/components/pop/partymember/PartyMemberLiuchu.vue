<!--党员流出弹窗-->
<template>
  <div class="PartyMemberLiuchu">
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
                <FormItem label="流出类型：">
                    <Select v-model="PartyMemberLiuchuForm.outer_type" placeholder="请选择">
                    <Option value="0">男</Option>
                    <Option value="1">女</Option>
                    </Select>
                </FormItem>
	              <FormItem label="流出党组织" prop="code">
	                <Input v-model="PartyMemberLiuchuForm.uname" placeholder=""></Input>
	              </FormItem>
                <FormItem label="流出日期：">
                    <DatePicker type="datetime"  v-model="PartyMemberOuter.outer_time" format="yyyy-MM-dd" placeholder="选择日期" style=""></DatePicker>
                </FormItem>
	              <FormItem label="流出原因" prop="code">
	                <Input v-model="PartyMemberLiuchuForm.uname" placeholder=""></Input>
	              </FormItem>
              	<FormItem label="流出办理人联系方式" prop="code">
	                <Input v-model="PartyMemberLiuchuForm.uname" placeholder=""></Input>
	              </FormItem>
              	<FormItem label="流入党组织" prop="code">
	                <Input v-model="PartyMemberLiuchuForm.uname" placeholder=""></Input>
	              </FormItem>
            </Col>
        </Row>
      </Form>

    </Modal>
  </div>
</template>
<script TYPE="text/ecmascript-6">
  export default {
    name:'PartyMemberLiuchu',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
       PartyMemberLiuchuForm:{
           outer_type:"",
           outer_reason :'',
           outer_time :'',
       },

      }
    },

    methods: {
      cancel () {
 				this.$router.push('/dangyuan');
      }
    }
  }
</script>
