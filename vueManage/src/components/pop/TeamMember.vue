<!--班子成员新增的弹窗-->
<template>
  <div class="TeamMember">
    <Modal
      v-model="modal1"
      title="班子成员维护"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name="vertical-center-modal"
      @on-ok="handleSubmit('memberFormItem')"
      @on-cancel="cancel">
      <Row>
        <Col span="15">
          <Form :model="memberFormItem" ref="memberFormItem" :label-width="120" :rules="ruleValidate">
            <FormItem label="类型">
              <RadioGroup v-model="type" @on-change="changeType">
                <Radio :disabled="isEdit" label="1">选择内部人员</Radio>
                <Radio :disabled="isEdit" label="2">选择外部人员</Radio>
                <Radio :disabled="isEdit" label="3">手动填写</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem v-if="type=='1'" label="姓名：" prop="name">
              <Tag v-if="isTag">{{tagName}}</Tag>
              <Button :disabled="isEdit" @click.stop="isInside=true" type="dashed" style="width: 100%;">
                <Icon size="60px" type="plus" :style="{'marginRight':'5px'}"></Icon>
                <label>选择</label>
              </Button>
            </FormItem>
            <FormItem v-if="type=='2'" label="姓名：" prop="name">
              <Tag v-if="isOutTag">{{outTagName}}</Tag>
              <Button :disabled="isEdit" @click.stop="isOutside=true" type="dashed" style="width: 100%;">
                <Icon size="60px" type="plus" :style="{'marginRight':'5px'}"></Icon>
                <label>选择</label>
              </Button>
            </FormItem>
            <FormItem v-if="type=='3'" label="姓名：" prop="name">
              <Input v-model="memberFormItem.name"  :disabled="isEdit" placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="职务名称：" prop="dutys">
              <Select v-model="memberFormItem.dutys" multiple :filterable="false" :disabled="isDisable" placeholder="请选择" :transfer="true">
                <Option v-for="item in dutyList2" :value="item.id" :disabled="item.choosed==0 ? true : false" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="批准任职日期：" prop="duty_time">
              <Row>
                <Col span="24">
                  <DatePicker type="date" placeholder="选择日期" :disabled="isDisable" v-model="memberFormItem.duty_time"></DatePicker>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="职务级别：" prop="duty_level">
              <!--<Select v-model="memberFormItem.duty_level" :disabled="isDisable" placeholder="请选择" :transfer=true>-->
                <!--<Option v-for="item in duty_level_list" :disabled="item.choosed==0 ? true : false" :key="item.id" :value="item.id">{{item.name}}</Option>-->
              <!--</Select>-->

              <Cascader :render-format="renders" :data="duty_level_list" v-model="memberFormItem.duty_level"></Cascader>
            </FormItem>
           
            <FormItem label="职务说明：" prop="duty_remark">
              <Input v-model="memberFormItem.duty_remark" type="textarea" :disabled="isDisable" :autosize="{minRows: 4,maxRows: 10}" placeholder="请输入..."></Input>
            </FormItem>
          </Form>
        </Col>
      </Row>
    </Modal>
    <TeamMemberInside v-if="isInside" @setInCancer="setInCancer" @setInConfirm="setInConfirm" @autoGet="autoGet"></TeamMemberInside>
    <TeamMemberOutside v-if="isOutside" @setOutCancer="setOutCancer" @setConfirm="setConfirm"></TeamMemberOutside>
  </div>
</template>
<script>
  import TeamMemberInside from '@/components/pop/TeamMemberInside.vue'
  import TeamMemberOutside from '@/components/pop/TeamMemberOutside.vue'
  export default {
    data () {
      return {
        modal1: true,//是否显示弹窗
        isInside:false,//内部人员添加
        isOutside:false,//外部人员添加
        isOutTag:false,
        outTagName:'',
        loading:true,
        isDisable:false,//是否禁止表单输入
        type:'1',//选择的类型
        dutyList:[],//保存职务类型截取后的数据
        dutyList2:[],//职务类型的全部数据
        duty_level_list:[],//职务级别list数据
        isCheck:false,//是否为查看弹窗
        isEdit:false,//编辑状态的禁止姓名和类型的更改
        tagName:'',
        isTag:false,
        userId:'',//人员id判断是否为编辑有 此id为编辑 无此id为新增
        memberFormItem: {  //form的绑定
          name:'',//姓名
          dutys:[],//职务名称
          duty_level:[],//级别
          duty_time:'',//批准时间
          duty_remark:''//职务说明
        },
        getIds: {},
        ruleValidate: {
//          name: [
//            {required: true, message: '姓名不能为空', trigger: 'blur'}
//          ],
          dutys: [
            { required: true, type: 'array', min: 1, message: '至少选择一个职务名称', trigger: 'change' },
            { type: 'array', max: 3, message: '最多选择3个职务名称', trigger: 'change' }
          ],
          // duty_level: [
          //   {required: true,type: 'array', message: '职务级别不能为空', trigger: 'change'},
          // ],
          duty_time:[
            {required: true,type:'date', message: '任职日期不能为空', trigger: 'change'}
          ],
        }
      }
    },
    components:{
      TeamMemberInside,//内部人员组件
      TeamMemberOutside//外部人员组件
    },
    methods: {
      changeType(type){
        console.log(type);
        if(type==2){
          this.memberFormItem.name = '';
        }
      },
      autoGet(res) {
        this.getIds = res.item;
        this.tagName=res.item.name;
        if(this.tagName){
          this.isTag = true;
        }
        this.memberFormItem.name = res.item.id;

        this.tagName=res.item.name;
        console.log(this.getIds);
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            //判断是否为查看 不是查看模块进if
            if(!this.isCheck){
              let qs = require('qs');
              let dept_id = this.$route.params.id;//党组织id
              let id=this.$route.params.userId;//成员id
              var url =''
              //判断是否有
              if (id==undefined ||id=='undefined' || id==''){
                url='/v1/leader/add-leader';
              }else{
                url='/v1/leader/modify-leader';
              }
              console.log(dept_id,id,url);
              let that = this;
              //批准时间
              let duty_time=that.memberFormItem.duty_time;
              let year = duty_time.getFullYear();
              let month = (duty_time.getMonth()+1)<10 ?'0'+(duty_time.getMonth()+1) :(duty_time.getMonth()+1);
              let day = duty_time.getDate()<10 ?'0'+duty_time.getDate() :duty_time.getDate();
              //拼接成yyyy-mm-dd 形式
              let newDuty_time = year+'-'+month+'-'+day;
              this.axios({
                method: 'post',
                  url:url,
                  data: qs.stringify({
                  add_type:that.type,
                  user_id:that.memberFormItem.name,
                  dept_id: dept_id,
                  id:id,
                  name:that.memberFormItem.name,
                  dutys:that.memberFormItem.dutys,
                  duty_level:that.memberFormItem.duty_level.pop(),
                  duty_time:newDuty_time,
                  duty_remark:that.memberFormItem.duty_remark,
                })
              })
              .then((res)=>{
                let needData=res.data;
                if(needData.code == '200'){
                  this.$Message.success('提交成功!');
                  this.modal1=false;
                  this.$router.go(-1)
                }else {
                  this.loading=false;
                  this.$Message.error(needData.msg);
                  setTimeout(() => {
                    this.loading=true;
                    //this.$router.go(-1)
                  }, 20);
                }
              })
            }else {
              this.modal1=false;
              this.$router.go(-1)
            }

          } else {
            this.loading=false;
            this.$Message.error('表单验证失败!');
            setTimeout(() => {
              this.loading=true;
              //this.$router.go(-1)
          }, 20);
          }
        })
      },
      cancel () {
        let that = this;
        this.$Modal.remove()
        setTimeout(function(args) {
          that.$router.go(-1);
        }, 500)
      },
      setInCancer(item) {
        this.isInside = false;
      },
      setInConfirm(item) {
          alert("ok")
        this.isInside = false;
        console.log(item);

//        this.memberFormItem.name = item.data;
      },
      //外部人员弹窗控制
      setOutCancer() {
        this.isOutside = false;
      },
      setConfirm(item){
        this.isOutside = false;
        console.log(item.data.real_name,item.data.id);
        this.outTagName=item.data.real_name;
        this.isOutTag = true;
        this.memberFormItem.name= item.data.id;
      },
      //获取职务名称list
      getDuty(){
        let that=this;
        this.axios({
            method: 'get',
            url: '/v1/dictionary/get-list-by-type',
            params: {
              type: 'D03052',
            }
          })
          .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
              that.dutyList2=needData.data;
            } else {

            }
          })
        //获取党内职务级别
        this.axios({
            method: 'get',
            url: '/v1/dictionary/get-list-by-type',
            params: {
              type: 'A02021',
            }
          })
          .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
              that.duty_level_list=needData.data;

            } else {
              that.$Message.error(needData.msg);
            }
          })
      },
      getRender(){



        let id=this.$route.params.userId;//人员id
        this.userId=id;
        let state=this.$route.params.state;//0 查看  1编辑  2新增
        let that = this;
        let url=""
        if(state=='0'){
          that.isDisable=true;
          that.ruleValidate={};
          that.lodding=false;
          that.isCheck=true;
          that.isEdit=true;

        }else if(state=='1'){
          that.isDisable=false;
          that.isEdit=true;

        }else if(state=='2'){
          return;

        }
          this.axios({
              method: 'get',
              url: '/v1/leader/get-dept-leader',
//              url:'v1/leader/dept-leaders',
              params: {
                id: id,
                opt:1
              }
            })
            .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                    let duty_level=[];
                  needData.data.duty_level_array.forEach(item=>{
                      duty_level.push(item.id);
                  })

                let timeArr = needData.data.duty_time.split('-');
                //处理时间戳
                let duty_time = new Date(timeArr[0],timeArr[1]-1,timeArr[2]);
                that.type= needData.data.add_type ? needData.data.add_type :that.type;//赋值添加方式
                that.memberFormItem.name=needData.data.name;//赋值姓名
                that.memberFormItem.dutys=needData.data.dutys;//赋值职务
                that.memberFormItem.duty_level=duty_level//赋值职务级别
                that.memberFormItem.duty_time=duty_time;//赋值时间
                that.memberFormItem.duty_remark=needData.data.duty_remark//赋值描述
              } else {
                that.$Message.error(needData.msg);
              }
            })
            .catch(err => {
              this.$Message.error('网络请求异常');
            })
      },
      submit(){

      }
    },
    mounted(){
      this.getRender();
      this.getDuty();
      this.$on('autoGet', function(res) {
        console.log(res)
      })
    }
  }
</script>
<style scrop>
  .TeamMember{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .no-cursor{
    cursor: pointer !important;
  }
</style>
