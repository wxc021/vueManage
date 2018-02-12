<!--党员转出-->
<template>
  <div class="PartyMemberZhuanchu">
    <Modal
      v-model="modal1"
      title="党员转出"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name="fuck_xiaoC"
      @on-cancel="cancel">
      <Form>
        <Row>
            <Col span="12">
                <FormItem label="转出类型：">
                    <Select placeholder="请选择">
                    <Option value="0">男</Option>
                    <Option value="1">女</Option>
                    </Select>
                </FormItem>
              	<FormItem label="目标党组织">
	                <Input  placeholder=""></Input>
	              </FormItem>
                <FormItem label="转出组织关系日期：">
                    <DatePicker type="datetime"   format="yyyy-MM-dd" placeholder="选择日期" style=""></DatePicker>
                </FormItem>
                <FormItem label="党费缴纳截止日期：">
                    <DatePicker type="datetime"   format="yyyy-MM-dd" placeholder="选择日期" style=""></DatePicker>
                </FormItem>
                <FormItem label="转出原因：">
									 <Input  type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </FormItem>
              	<FormItem label="转出办理人联系方式">
	                <Input  placeholder=""></Input>
	              </FormItem>
            </Col>
            <Col span="12" push="1">
								<FormItem label="介绍信：">
	                 <Button type="primary"><Icon type="search" />&nbsp;&nbsp;查看</Button>
	                 <Button type="primary"><Icon type="ios-upload-outline" />&nbsp;&nbsp;重新上传</Button>
	              </FormItem>
	              <FormItem label="党费缴纳证明：">
	                 <Button type="primary"><Icon type="search" />&nbsp;&nbsp;查看</Button>
	                 <Button type="primary"><Icon type="ios-upload-outline" />&nbsp;&nbsp;重新上传</Button>
	              </FormItem>
            </Col>
        </Row>
      </Form>

    </Modal>
  </div>
</template>
<script TYPE="text/ecmascript-6">
  export default {
    name:'PartyMemberZhuanchu',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
      }
    },

    methods: {
      cancel () {
        this.$Message.info('点击了取消');
        this.$router.push('/dangyuan');
      }
    }
  }
</script>
<style>
	.fuck_xiaoC .ivu-modal .ivu-modal-body{
		max-height: 500px;
		overflow-x: hidden;
		overflow-y: auto;
	}

</style>