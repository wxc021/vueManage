<!--学历新增弹窗-->
<template>
  <div class="memberinfo-education">
    <Modal
      v-model="modal1"
      title="党代表"
      width="950"
      :loading="loading"
      :mask-closable="false"
      @on-ok="handleSubmit('memberinfo')"
      @on-cancel="cancel">
     	<Form ref="memberinfo" :model="memberinfo"  :label-width="150" :rules="ruleValidate">
        <Row>
            <Col span="12">
                <FormItem label="开始日期：" prop="start_time">
                    <DatePicker type="date"  v-model="memberinfo.start_time" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </FormItem>
                <FormItem label="党代表级别" style="width: 100%;" prop="level">
                    <Select v-model="memberinfo.level" placeholder="请选择" style="width: 100%;">
                      <Option v-for="(item,index) in level_list" :key="item.id" :value="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="党代表类型" style="width: 100%;" prop="type">
                    <Select v-model="memberinfo.type" placeholder="请选择" style="width: 100%;">
                      <Option v-for="(item,index) in type_list" :key="item.id" :value="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                
                 <FormItem label="结束日期：" prop="end_time">
                    <DatePicker type="date"  v-model="memberinfo.end_time" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </FormItem>
            </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
  export default {
    name:'memberinfo_education',
    props:{
      itemData : {}
    },
    data () {

      const validateEndTime = (rule, value, callback) => {
          let end = value.getTime();
          let start = this.memberinfo.start_time.getTime();
          if (start > end) {
            callback(new Error('结束时间不能小于开始时间'));
          }
          else {
            callback()
          }
      };

      return {
        modal1: true,//是否显示弹窗
        loading: true,
        url : '/v1/represent/add',
        uid : this.$route.params.uid,
        memberinfo:{
            type:"",
            start_time :'',
            end_time :'',
            level:'',
        },
        type_list:[],
        level_list:[],
        ruleValidate:{
        	type: [
            {required: true, message: '党代表类型不能为空',trigger: 'change'}
          ],
          start_time: [
            {required: true,type:'date', message: '开始时间不能为空', trigger: 'change'}
          ],
          end_time: [
            {required: true, type:'date',message: '结束时间不能为空', trigger: 'change'},
            {validator: validateEndTime, trigger: 'change'}
          ],
          level: [
            {required: true, message: '党代表级别不能为空', trigger: 'change'}
          ],
        },
        filters:{
          dateFormat(value){
            if(value==''){return value}
            var date = new Date(value),
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
    watch:{
      'itemData' (oldv,newv){
        console.log(newv);
      },
    },
    methods: {
      handleSubmit(name) {
        let that = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            let qs = require('qs');
            let _data = {};
            _data = that.memberinfo;
            _data['uid'] = that.uid;
            for (let item in that.memberinfo) {
              if(item.indexOf('time')>=0){
                 _data[item] = that.filters.dateFormat(that.memberinfo[item]);
              }else{
                _data[item] = that.memberinfo[item];
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
                    setTimeout(() => {
                      this.loading = true;
                    }, 20);
                }
            })
            .catch(err => {
                this.$Message.error('网络请求异常');
                  setTimeout(() => {
                    this.loading = true;
                  }, 20);
            });
          } else {
            this.loading = false;
            this.$Message.error('表单验证失败!');
            setTimeout(() => {
              this.loading = true;
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
        this.$Message.info('点击了取消');
        this.$router.push({ 
            // name: 'dangyuaninfo', 
            params: { 
                uid: this.$route.params.uid
            },
            query: { 
                tab: this.$route.query.tab,
                model: ''
            }
        });
      }
    },
    mounted() {
      this.getList('DT03','level_list');
      this.getList('DT02','type_list');
      if(this.itemData){
        this.url = '/v1/represent/edit';
        this.memberinfo = Object.assign({},this.itemData);
        this.memberinfo.start_time = new Date(this.memberinfo.start_time);
        this.memberinfo.end_time = new Date(this.memberinfo.end_time);
      }
      
    }
  }
</script>
