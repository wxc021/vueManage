<template>
    <div>
      <Modal
          v-model="modal1"
          title="培养联系人登记表"
          width="800"
          @on-ok="ok"
          @on-cancel="cancel">
          <div class="onlinetable-wrap">
              <h1>培养联系人登记表</h1>
              <table class="table1">
                  <colgroup>
                      <col width="125">
                      <col width="125">
                      <col width="125">
                      <col width="125">
                      <col width="125">
                      <col width="125">
                  </colgroup>
                  <tr>
                      <td class="table-col">姓名</td>
                      <td><input v-model="table.B3" type="text"></td>
                      <td class="table-col">性别</td>
                      <td><input v-model="table.D3" type="text"></td>
                      <td class="table-col">籍贯</td>
                      <td><input v-model="table.F3" type="text"></td>
                  </tr>
                  <tr>
                      <td class="table-col">出生年月</td>
                      <td><input v-model="table.B4" type="text"></td>
                      <td class="table-col">民族</td>
                      <td><input v-model="table.D4" type="text"></td>
                      <td class="table-col">入党时间</td>
                      <td><input v-model="table.F4" type="text"></td>
                  </tr>
              </table>
              <table class="table2">
                  <tr>
                      <td class="table-col">学历学位</td>
                      <td><input v-model="table.B5" type="text" :style="{width: '150px'}"></td>
                      <td class="table-col">所在党支部名称</td>
                      <td :style="{width: '300px'}"><input v-model="table.F5" type="text"></td>
                  </tr>
                  <tr>
                      <td class="table-col">工作单位<br>及职务</td>
                      <td colspan="3"><input v-model="table.B6" type="text"></td>
                  </tr>
                  <tr>
                      <td class="table-col">个人简介</td>
                      <td colspan="3"><textarea v-model="table.B7" cols="30" rows="10"></textarea></td>
                  </tr>
                  <tr>
                      <td class="table-col">主要任务</td>
                      <td colspan="3">
                          <p class="text-left">1．向入党积极分子介绍党的基本知识；</p>
                          <p class="text-left">2．了解入党积极分子的政治觉悟、道德品质、现实表现和家庭情<br>   况等，做好培养教育工作，引导入党积极分子端正入党动机；</p>
                          <p class="text-left">3．及时向党支部汇报入党积极分子情况；</p>
                          <p class="text-left">4．向党支部提出能否将入党积极分子列为发展对象的意见。</p>
                      </td>
                  </tr>
              </table>
              <div class="text-right">中共天津市委组织部制</div>
          </div>
      </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                modal1: true,
                table : {
                    "B3": "",//姓名
                    "D3": "",//性别
                    "F3": "",//籍贯
                    "B4": "",//出生年月
                    "D4": "",//民族
                    "F4": "",//入党时间
                    "B5": "",//学历学位
                    "F5": "",//所在支部名称
                    "B6": "",//工作单位及职务
                    "B7": ""//个人简介
                },

            }
        },
        computed:{
            // g2(){
            //     return this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
            // }
        },
        methods: {
          ok () {
            let that = this;
            let qs = require("qs");
            this.axios({
                method:'post',
                url:'/v1/recruit/save-table-data',
                data:qs.stringify({
                  uid:that.$route.query.uid,
                  template_id:that.$route.params.id,
                  table_json:that.table,
                }),
              })
              .then( res=>{
              let needData= res.data;
            if(needData.code=='200'){
              this.$Modal.remove()
              setTimeout(function(args) {
                console.log(that);
                that.$router.push({name:'recruitMembers'});
              }, 30)
              this.$Message.success('提交成功');
            }else{
              setTimeout(() => {
                that.loading = false;
              that.$nextTick(() => {
                that.loading = true;
            });
            }, 1000);
              this.$Message.error(needData.msg);
            }
          })
          .catch (err=>{
              this.$Message.error('网络请求失败');
          })

          },
          cancel () {
            let that = this;
            this.$Modal.remove()
            setTimeout(function(args) {
              that.$router.push({name:'recruitMembers'});
            }, 30)
          },
          //获取详情数据
          getDetail(){
            let that = this;
            let qs = require("qs");
            this.axios({
                method:'post',
                url:'/v1/recruit/get-table-data',
                data:qs.stringify({
                  uid:that.$route.query.uid,
                  template_id:that.$route.params.id,
                  opt:'1'
                }),
              })
              .then( res=>{
              let needData= res.data;
            if(needData.code=='200'){
              let baseInfotData=needData.data.baseinfo;
              let contentData=needData.data.content;
              for(let key in baseInfotData){
                that.table[key]=baseInfotData[key];
              }
              for(let key in contentData){
                that.table[key]=contentData[key];
              }
            }else{
              this.$Message.error(needData.msg);
            }
          })
          .catch (err=>{
              this.$Message.error('网络请求失败');
          })
          }
        },
        watch: {

        },
        mounted(){
          this.getDetail()
        }
    }
</script>
<style scoped>
    table{
        width: 100%;
        font-size: 14px;
        border: 1px solid #1c2438;
        border-collapse: collapse;
    }
    table input{
        display: block;
        border: none;
        height: 100%;
        width: 100%;
    }
    table textarea{
        display: block;
        border: none;
        width: 100%;
        /* height: 100%; */
        resize: none;
    }
    input{
        text-align: center;
        vertical-align: middle;
    }
    td{
        height: 45px;
        border: 1px solid #1c2438;
        text-align: center;
        vertical-align: middle;
    }
    h1{
        font-size: 22px;
        text-align: center;
    }
    input, textarea{
        outline: none;
    }
    div{
        font-size: 14px;
    }
    .input-date{
        width: 40px;
        text-align: right;
    }
    .table2{
        margin-top: -1px;
    }
</style>
