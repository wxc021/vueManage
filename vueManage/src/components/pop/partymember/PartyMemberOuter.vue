<!--党员流出弹窗-->
<template>
  <div class="PartyMemberOuter">
    <Modal
      v-model="modal1"
      title="党员出党"
      width="950"
      :loading="loading"
      :styles="{top: '20px'}"
      :mask-closable=false
      class-name="max-height vertical-center-modal"
      @on-ok="handleSubmit('PartyMemberOuterForm')"
      @on-cancel="cancel">
      <Form ref="PartyMemberOuterForm" :model="PartyMemberOuterForm"  :label-width="150" :rules="ruleValidate">
        <div class="party-member-inner">
          <Row>
            <Col span="12">
                <FormItem label="出党日期：" prop="date">
                    <DatePicker type="date" :options="options"  :transfer=true v-model="PartyMemberOuterForm.date"  placeholder="选择日期" style="width:100%"></DatePicker>
                </FormItem>
                <FormItem label="出党原因："  prop="left_reason">
                    <Select v-model="PartyMemberOuterForm.left_reason" :transfer=true filterable placeholder="请选择">
                      <Option v-for="(item,index) in left_reason_list" :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="出党类型："  prop="decrease_type">
                    <Select v-model="PartyMemberOuterForm.decrease_type" :transfer=true placement='bottom' placeholder="请选择">
                      <Option v-for="(item,index) in decrease_type_list" :key="item.id" :value="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  </div>
</template>
<script>
  export default {
    name:'PartyMemberOuter',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        options: {
          disabledDate(date) {
            return date && date.valueOf() >= Date.now();
            }
        },
        decrease_type_list:[],
        left_reason_list:[],
        uid:this.$route.query.uid,
        dept_id:this.$route.query.dept_id,
        type:this.$route.query.type,
        PartyMemberOuterForm:{
          decrease_type:"",
          left_reason :'',
          date :'',
       	},
    	ruleValidate:{
          date: [
            {required: true, message: '出党日期不能为空',trigger: 'change',type:'date'}
          ],
          decrease_type: [
            {required: true, message: '出党类型不能为空', trigger: 'change'}
          ],
          left_reason: [
            {required: true, message: '出党原因不能为空', trigger: 'change'}
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

    methods: {
      handleSubmit(name) {
      	var that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.modal1=false;
						let that = this;
				    let qs = require('qs');
				    let _data = that.PartyMemberOuterForm;
				    _data.dept_id =  that.dept_id;
            _data.uid = that.uid;
				    _data.type = 3;
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
                  this.$router.push({path:'/dangyuan/'+this.dept_id+'?type='+this.type});
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

      getList(type,arr){
  			let that = this;
            let qs = require('qs');
            if(that[arr].length>1){
                return
            }
            that.axios({
                method : 'get',
                url : 'v1/dictionary/get-list-by-type',
                params:{
                    type:type
                },
            })
            .then(res=>{
                let needData = res.data;
                if (needData.code == 200) {
                setTimeout(()=>{
                      that[arr] = needData.data;
                },200)
                } else {
                    that.$Message.error(needData.msg);
                }
            })
            .catch(err => {
                this.$Message.error('网络请求异常');
            });
        },
    },
    mounted (){
      this.getList('C02027','left_reason_list');
			this.getList('DT12','decrease_type_list');

		},
  }
</script>
<style scoped>
.ivu-modal-body{
	min-height: 600px!important;
}
.party-member-inner{
  height: 340px;
}
</style>
