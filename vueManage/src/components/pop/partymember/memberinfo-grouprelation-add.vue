<!-- 学历学位新增弹窗 -->
<template>
  <div class="Degree">
    <Modal
      v-model="modal1"
      title="组织关系"
      width="950"
      :mask-closable = "false"
      class-name="max-height"
      :loading="loading"
      @on-ok="handleSubmit('degreeForm')"
      @on-cancel="cancel">
      <Row>
        <Form ref="degreeForm" :model="degreeForm"  :label-width="110" :rules="ruleValidate">
         <Col span="12">
          <FormItem label="所在党支部">
              <Input readonly v-model="degreeForm.name"></Input>
          </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="进入党支部日期" prop="in_date">
              <DatePicker  :transfer=true v-model="degreeForm.in_date" type="date" placeholder="选择日期" style="width:309px"></DatePicker>
            </FormItem>
          </Col>
           <Col span="12">
            <FormItem label="进入党支部类型" prop="in_type">
                  <Select v-model="degreeForm.in_type" filterable placeholder="请选择"  :transfer=true >
                    <Option v-for='item in in_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                  </Select>
              </FormItem>
          </Col>
        </Form>
      </Row>
    </Modal>
  </div>
</template>
<script>
  export default {
    name:'Degree',
    data () {
      return {
        modal1:true,
        loading:true,
        in_type_list:[],
        url : '/v1/member/org-relation-edit',
        uid : this.$route.params.uid,
        degreeForm:{
          name:'',
          in_date:'',
          in_type_list:'',
        },
        ruleValidate: {
          in_date: [
            {required: true,type:'date', message: '进入党支部日期不能为空', trigger: 'change'}
          ],
          in_type_list:[
            {required: true, message: '进入党支部类型不能为空', trigger: 'change'}
          ],
        },
        filters:{
          dateFormat(value){
            if(value==''){return value}
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
        let that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            let qs = require('qs');
            let _data = {};
            _data['uid'] = that.uid;
            for (let item in that.degreeForm) {
              if(item.indexOf('time')>=0||item.indexOf('date')>=0){
                 _data[item] = that.filters.dateFormat(that.degreeForm[item]);
              }else{
                _data[item] = that.degreeForm[item];
              }
            }
            that.axios({
              method : 'post',
              url : that.url,
              data:qs.stringify(_data)
            })
            .then(res=>{
                let needData = res.data;
                if (needData.code == 200) {
                setTimeout(()=>{
                    that.$Message.success('提交成功!');
                    that.modal1=false;
                    this.$router.back();
                    that.$emit('add');
                },200)
                } else {
                    that.$Message.error(needData.msg);
                }
            })
            .catch(err => {
                this.$Message.error('网络请求异常');
            });
           
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
      getDetail(){
        let that = this;
        that.axios({
          url:'/v1/member/org-relation-detail',
          method:'get',
          params:{
            uid:that.$route.params.uid,
            id:that.$route.params.item.id
          }
        })
        .then(res=>{
          let needData = res.data;
          if (needData.code == 200) {
              that.degreeForm = needData.data;
              that.degreeForm.in_date = new Date(that.degreeForm.in_date);
          } else {
              that.Message.error(needData.msg);
          }
        })
        .catch(err=>{
          this.Message.error('网络请求异常');
        })




      },
      cancel () {
        this.$router.back();
      }
    },
    mounted() {
      this.getList('C03043','in_type_list');
      this.getDetail();
    }
  }
</script>
<style>
.ivu-select-dropdown{
  width: auto;
}
</style>
