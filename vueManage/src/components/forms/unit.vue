<!--单位信息form-->
<template>
    <div class="box-flex start-box box-orient">
        <div class="info-detail box-flex">
          <Row>
            <!-- <p style="float: left;margin-left: 10px;margin-top: 7px;">单位信息</p> -->
            <Row  style="text-align: right;">
              <Button v-show="isSort" @click="reduction">取消排序</Button>
              <Button v-show="isSort" @click="save" type="primary" style="margin-left: 5px;">保存排序</Button>
              <Button v-show="!isSort" @click="sort" style="margin-left: 5px;">排序</Button>
              <Button v-show="!isSort" style="margin-left: 5px;" type="error" @click="addUnit">新增</Button>
            </Row>
          </Row>
          <Row>
            <div class="tabs">
              <table>
                <thead>
                  <th style="font-weight: bold;" width="260">单位名称</th>
                  <th style="font-weight: bold;" width="120">单位性质类别</th>
                  <th style="font-weight: bold;" width="120">单位（机构）类型</th>
                  <th style="font-weight: bold;" width="185">法人单位建立基层组织情况</th>
                  <th style="font-weight: bold;">操作</th>
                </thead>
                <draggable :list="listData" :element="'tbody'">
                  <tr :class="sortClassName" v-for="(item,index) in listData" :key="item.index" :ondragstart="isDragstart" >
                    <td>{{item.full_name}}</td>
                    <td>{{item.prop_id_desc}}</td>
                    <td>{{item.org_type_desc}}</td>
                    <td>{{item.base_depts_desc}}</td>
                    <td width="120px"><Button class="resetbtn-hover" @click="remove(item,index)" size="small">删除</Button></td>
                  </tr>
                </draggable>
              </table>
            </div>
          </Row>
        </div>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'
    export default {
        name: 'unit',
        data() {
          return {
            isSort:false,//是否开始排序
            listData:[],
            sortClassName:'',
            isDragstart:'return false',//
            data6: [
              {
                unit_name: '天津和平信息管理单位',
                relationship: '直接关系',
                category: '类别A',
                id:'type01',
                row_id:'row01'
              },
              {
                unit_name: '天津和平信息管理单位',
                relationship: '直接关系',
                category: '类别B',
                id:'type02',
                row_id:'row02'
              }
            ],
            formValidate: {

            },
            ruleValidate: {

            },
          }
        },
        props: ['infodata', 'controlSave'],
        components: {
          draggable
        },
        watch: {
            '$route' (to, from) {
                if (/copy/.test(to.path)) {
                    this.getInfo()
                } else if(/info/.test(to.path)) {
                    this.getInfo();
                }
            },
        },
        methods: {
          reduction() {
            this.getInfo();
            this.isSort = !this.isSort;
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
            remove(item,index){

              let id =item.id;
              var that= this;
              let qs = require('qs');
              this.$Modal.confirm({
                title:'温馨提示:',
                content:'是否删除该单位',
                onOk() {
                  that.axios({
                      url:'/v1/dept/unbind-org',
                      method:'post',
                      data:qs.stringify({
                        id:id,
                        dept_id:that.$route.params.id
                      })
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
            getInfo() {
              let that = this;
              let qs = require('qs');
              this.axios({
                  method: 'post',
                  url: '/v1/dept/bind-org-list',
                  data: qs.stringify({
                    dept_id:that.$route.params.id
                  })
                })
                .then(res => {
                  let needData = res.data;
                  if (needData.code=='200'){
                    that.listData=needData.data
                  }
                })
                .catch(err => {
                  this.$Message.error('网络请求异常');
                })

                //取详情数据
//              this.axios({
//                  method: 'post',
//                  url: '/v1/org/unitinfo',
//                  data: qs.stringify({
//                    id:that.$store.state.unitId
//                  })
//                })
//                .then(res => {
//                  let needData = res.data;
//                  if (needData.code == 200) {
//                    console.log(needData);
//                    that.listData.push(needData.data)
//                  } else {
//                    that.$Message.error(needData.msg);
//                  }
//                })
//                .catch(err => {
//                  this.$Message.error('网络请求异常');
//                })

            },
            //排序
            sort(){
              this.sortClassName='drag';
              this.isDragstart=''
              this.isSort=!this.isSort;
            },
            save(){
              this.isDragstart='return false';
              this.isSort=!this.isSort;
              this.sortClassName='';
              let sortArr =[]
              this.listData.forEach(item => {
                sortArr.push(item.id);
              });
              //传递后台排序的id
              let sortId= sortArr.join();
              let that = this;
              let qs = require('qs');
              this.axios({
                  method: 'get',
                  url: 'v1/dept/org-sort-update',
                  params: {
                    ids:sortId
                  }
                })
                .then(res => {
                  let needData = res.data;
                  if (needData.code == 200) {


                  } else {
                    that.$Message.error(needData.msg);
                  }
                })
                .catch(err => {
                  this.$Message.error('网络请求异常');
                })



            },
            //新增功能
            addUnit(){
              if (this.$route.name == 'checkinfo') {
                this.$router.push({name: 'checkUnitAdd',params:{state:'1', id: this.$route.params.id}});
              } else {
                this.$router.push({name: 'UnitAdd',params:{state:'1', id: this.$route.params.id}});
              }
            },
            //查看功能
            checkUnit(item) {
              if (this.$route.name == 'checkinfo') {
                this.$router.push({name: 'checkUnitAdd',params:{state:'0'}});
              } else {
                this.$router.push({name: 'UnitAdd',params:{state:'0'}});
              }
            }
        },
        created() {

        },
        mounted() {
          this.$store.commit('setEdit', {isDisable: false});
          this.getInfo();
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
