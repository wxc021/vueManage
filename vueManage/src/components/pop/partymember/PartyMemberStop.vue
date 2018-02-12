<!--党员停止党籍弹窗-->
<template>
  <div class="PartyMemberStop">
    <Modal
      v-model="modal1"
      title="党员停止党籍"
      width="950"
      :loading="loading"
      :styles="{top: '20px'}"
      :mask-closable=false
      class-name="max-height vertical-center-modal"
      @on-ok="handleSubmit('PartyMemberStopForm')"
      @on-cancel="cancel">
      <Form ref="PartyMemberStopForm" :model="PartyMemberStopForm"  :label-width="150" :rules="ruleValidate">
        <Row>
            <Col span="12">
                <FormItem label="停止党籍日期：" prop="date" style="margin-bottom: 245px;">
                    <DatePicker type="date"  v-model="PartyMemberStopForm.date"  placeholder="选择日期" style=""></DatePicker>
                </FormItem>
            </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script TYPE="text/ecmascript-6">
  export default {
    name:'PartyMemberStop',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        dept_id:this.$route.query.dept_id,
        type:this.$route.query.type,
        PartyMemberStopForm : {
    			decrease_type:"",
       		date :'',
        },
        ruleValidate:{
        	date: [
            {required: true, message: '日期不能为空',trigger: 'change',type:'date'}
          ],
        },
        filters:{
          dateFormat(value){
            var date = new Date(+value),
                Y = date.getFullYear(),
                m = date.getMonth() + 1,
                d = date.getDate(),
                H = date.getHours(),
                i = date.getMinutes(),
                s = date.getSeconds();
              if (m < 10) {
                m = '0' + m;
              }
              if (d < 10) {
                d = '0' + d;
              }
              if (H < 10) {
                H = '0' + H;
              }
              if (i < 10) {
                i = '0' + i;
              }
              if (s < 10) {
                s = '0' + s;
              }
              var t = Y+'-'+ m +'-'+ d;
              return t;
          }
        },
      }
    },
		mounted (){

		},
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.modal1=false;
						let that = this;
				    let qs = require('qs');
				    let _data = that.PartyMemberStopForm;
				    _data.dept_id =  that.dept_id;
            _data.uid = that.$route.query.uid;
            _data.type = 2;
            _data.date = that.filters.dateFormat(_data.date);
            if(that.type=='6'){
              _data['group'] = '1';
            }
						this.axios({
						    method: 'POST',
								url: '/v1/member/decrease?uid='+_data.uid,
						    data: qs.stringify(_data),
						})
						.then(res => {
						    let needData = res.data;
						    if (needData.code == 200) {
    						this.$Message.success('提交成功!');
                  this.$router.push({path:'/dangyuan/'+this.dept_id+'?type='+this.type});
						    } else {
						        that.$Message.error(needData.msg);
						    }
						})
						.catch(err => {
						    this.$Message.error('网络请求异常');
						})
          } else {
	            this.loading=false;
	            this.$Message.error('表单验证失败!');
	            setTimeout(() => {
	              this.loading=true;
	            }, 20);
          }
        })
      },
      cancel () {
        this.$router.push({path:'/dangyuan/'+this.dept_id+'?type='+this.type});
      },
    }
  }
</script>
<style scoped>
/*.ivu-modal-body{*/
	/*min-height: 330px;*/
/*}*/
</style>

