<!--党员死亡弹窗-->
<template>
  <div class="PartyMemberDeath">
    <Modal
      v-model="modal1"
      title="党员死亡"
      width="950"
      :styles="{top: '20px'}"
      :mask-closable=false
      class-name="max-height vertical-center-modal"
      :loading="loading"
      @on-ok="handleSubmit('PartyMemberDeathForm')"
      @on-cancel="cancel">
    	<Form ref="PartyMemberDeathForm" :model="PartyMemberDeathForm"  :label-width="150" :rules="ruleValidate">
        <Row>
            <Col span="12">
                <FormItem label="死亡日期：" prop="date" style="margin-bottom: 245px;">
                    <DatePicker type="date"  v-model="PartyMemberDeathForm.date" placeholder="选择日期" style=""></DatePicker>
                </FormItem>
                <!-- <FormItem label="死亡类型：" style="width: 100%;" prop="decrease_type">
                    <Select v-model="PartyMemberDeathForm.decrease_type" placeholder="请选择" style="width: 61%;">
                    <Option v-for="(item,index) in decrease_type_list" :key="item.id" :value="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem> -->
            </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
  export default {
    name:'PartyMemberDeath',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        decrease_type_list:[],
        dept_id:this.$route.query.dept_id,
        type:this.$route.query.type,
        PartyMemberDeathForm : {
    			decrease_type:"",
       		date :'',
        },
        ruleValidate:{
        	date: [
            {required: true, message: '死亡日期不能为空',trigger: 'change',type:'date'}
          ],
          // decrease_type: [
          //   {required: true, message: '死亡类型不能为空', trigger: 'change'}
          // ],
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
			this.getTypeList()
		},
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.modal1=false;
						let that = this;
				    let qs = require('qs');
				    let _data = Object.assign({},that.PartyMemberDeathForm);
				    _data.dept_id =  that.dept_id;
            _data.uid = that.$route.query.uid;
            _data.type = 4;
            _data.date = that.filters.dateFormat( _data.date);
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
      cancel () {
          this.$router.push({path:'/dangyuan/'+this.dept_id+'?type='+this.type});
      },
    },
    mounted(){
      //  this.getList('DT12','decrease_type_list');
    },
  }
</script>
<style scoped>
/*.ivu-modald-body{*/
	/*min-height: 350px;*/
/*}*/
</style>
