<!--班子成员form-->
<template>
    <div class="box-flex start-box box-orient">
        <div class="info-detail box-flex">
          <Row style="text-align: right;">
            <Button v-show="isSort" @click="reduction">取消排序</Button>
            <Button v-show="isSort" @click="save" type="primary">保存排序</Button>
            <Button v-show="!isSort" @click="sort">排序</Button>
            <Button v-show="!isSort" type="primary" @click="newadd">新增</Button>
          </Row>
          <Row>
            <div class="tabs">

              <table>
                <thead>
                  <th style="font-weight: bold;">姓名</th>
                  <th style="font-weight: bold;">职务名称</th>
                  <th style="font-weight: bold;">批准任职日期</th>
                  <th style="font-weight: bold;">操作</th>
                </thead>
                  <draggable :list="listData" :element="'tbody'">
                    <tr v-show="listData.length" :class="sortClassName" v-for="(item,index) in listData" :key="item.index" :ondragstart="isDragstart" >
                      <td>{{item.name}}</td>
                      <td>{{item.duty}}</td>
                      <td>{{item.duty_time}}</td>
                      <td><!-- <Button type="info" size="small" @click="check(item)">查看</Button> --> <Button class="resetbtn-hover" size="small" @click="edit(item)">编辑</Button> <Button @click="remove(item,index)" class="resetbtn-hover" size="small">删除</Button></td>
                    </tr>
                  </draggable>
              </table>
              <div class="ivu-table-tip" v-show="listData.length == 0"><table cellspacing="0" cellpadding="0" border="0" style="border-top:0px;"><tbody><tr><td><span>暂无数据</span></td></tr></tbody></table></div>
            </div>
          </Row>
        </div>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'
    export default {
        name: 'team',
        data() {
          return {
                listData:[],//提交数据
                isSort:false,//是否开始排序
                sortClassName:'',
                isDragstart:'return false',//
                formValidate: {

                },
                ruleValidate: {

                },
                datas: this.infodata,
            }
        },
        filters:{
          dateFormat(value){
            var date = new Date(+value*1000),
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
            var t = Y + '-' + m + '-' + d;
            return t;
          }
        },
        props: ['infodata', 'controlSave'],
        components: {
          draggable
        },
        watch: {
            '$route' (to, from) {
                if (/copy/.test(to.path)) {
                  this.getListDetails()
                } else if(/info/.test(to.path)) {
                  this.getListDetails()
                }
            },
        },
        methods: {
            //新增
            newadd() {
              //党支部dept_id
              var dept_id = this.$route.params.id;
              //this.$router.push({name: 'TeamMember', params: {dept_id:dept_id,state:'2'}});
              if (this.$route.name == 'checkinfo') {
                this.$router.push({name: 'checkTeamMember', params: {state:'2'}});
              } else {
                this.$router.push({name: 'TeamMember', params: {state:'2'}});
              }
            },
            //查看
            check(item){
              let id =item.id;
              if (this.$route.name == 'checkinfo') {
                this.$router.push({name: 'checkTeamMember', params: {userId:id,state:'0'}});
              } else {
                this.$router.push({name: 'TeamMember', params: {userId:id,state:'0'}});
              }
            },
            //编辑
            edit(item){
              let id =item.id;
              this.$router.push({name: 'TeamMember', params: {userId:id,state:'1'}});
            },
            //删除
            remove(item,index){
              let id =item.id;
              var that= this;
              this.$Modal.confirm({
                title:'温馨提示:',
                content:'是否删除该成员',
                onOk() {
                  that.axios({
                    url:'/v1/leader/del-leader',
                    method:'get',
                    params:{
                      id:id
                    }
                  })
                  .then((res)=>{
                    let needData = res.data;
                    if(needData.code='200'){
                      this.$Message.success('删除成功!');
                      that.listData.splice(index, 1);
                    }
                  })
                }
              })
            },
            //排序
            sort(){
              this.sortClassName='drag';
              this.isDragstart=''
              this.isSort=!this.isSort;
            },
            //还原数据
            reduction(){
              this.getListDetails();
              this.isSort = !this.isSort;
            },
            save(){
              this.isDragstart='return false';
              this.isSort=!this.isSort;
              this.sortClassName='';
              let qs = require('qs');
              let that = this;
              //var newList =JSON.parse(that.listData)
              //console.log(newList);
//              return
              this.axios({
                method:'post',
                url:'/v1/leader/order-leaders',
                data:qs.stringify({
                  dept_id:that.$route.params.id,
                  data:that.listData
                })
              })
              .then(res=>{
                let needData=res.data;
                if(needData.code='200'){
                  this.$Message.success('提交成功!');
                }
              })





            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            getListDetails() {
              let that = this;
              let qs = require('qs');
              let id = that.$route.params.id;
              this.axios({
                  method: 'get',
                  url: '/v1/leader/dept-leaders',
//              data: qs.stringify({
//                dept_id: that.$route.query.id,
//              })
                  params: {
                    dept_id: id,
                  }
                })
                .then(res => {
                let needData = res.data;
              if (needData.code == 200) {
                that.listData=needData.data
              } else {
                that.$Message.error(needData.msg);
              }
            })
            .catch(err => {
                this.$Message.error('网络请求异常');
            })
          }
        },
        created() {

        },
        mounted() {
          this.$store.commit('setEdit', {isDisable: false});
          this.getListDetails()
        },
    }
</script>
<style scope>
  td{padding: 0;margin: 0;}
  .tabs{margin-top: 10px;margin-left: 10px;user-select: none}
  .tabs table{border-collapse: collapse;text-align: center;width: 100%;color: #333;font-family: "微软雅黑"; border: 1px solid #e2e2e2;}
  .tabs table thead{line-height: 40px;background: #F8F8F9;font-weight: normal;}
  .tabs table thead {border-bottom: 1px solid #e9eaec;border-top: 1px solid #e9eaec;}
  .tabs table thead th{font-weight: normal;}
  .tabs table tbody tr{line-height: 48px;height: 48px;border-bottom: 1px solid #e9eaec;;color: #333;box-sizing: border-box}
  .tabs table tbody tr:hover{background-color: #EBF7FF}
  .tabs table tbody tr.drag:hover{background-color: #eee;cursor: move}
  .tabs table .checkbox{width: 20px;height: 20px;box-sizing:border-box;border:1px solid #ccc;;margin: 3px auto 0}
  .tabs table .checkbox.on{background: #d73826;border-color: #d73826}
  .tabs table .checkbox.on:after{content: "√";width: 0;height: 0;color: #fff;position: relative;top: -11px;}
  .tabs table tbody td,.tabs table thead th{ border-right:1px solid #e9eaec;}
  .tabs table tbody td.ready{color: #d73826}
  .tabs table tbody td.out{color: #f07100}
  .tabs table tbody td.in{color: #008df0}
</style>
