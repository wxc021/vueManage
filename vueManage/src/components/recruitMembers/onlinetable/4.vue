<template>
    <div>
      <Modal
          v-model="modal1"
          title="党员推荐入党积极分子汇总表"
          width="800"
          @on-ok="ok"
          ok-text="保存"
          @on-cancel="cancel">
          <div class="onlinetable-wrap">
              <h1>党员推荐入党积极分子汇总表</h1>
              <table class="table1">
                  <tr>
                      <td class="table-col">推荐时间</td>
                      <td><input v-model="table.C2" type="text"></td>
                      <td class="table-col">推荐地点</td>
                      <td><input v-model="table.G2" type="text"></td>
                  </tr>
                  <tr>
                      <td class="table-col">党员总数</td>
                      <td><input v-model="table.C3" type="text"></td>
                      <td class="table-col">参加推荐<br>党员人数</td>
                      <td><input v-model="table.G3" type="text"></td>
                  </tr>
              </table>
              <table class="table2">
                  <tr>
                      <td class="table-row" rowspan="10" :style="{width : '80px'}">推<br>荐<br>结<br>果</td>
                      <td class="table-col">投票情况</td>
                      <td colspan="3">
                          <textarea v-model="table.D4" name="" id="" cols="20" rows="4"></textarea>
                      </td>
                  </tr>
                  <tr>
                      <td class="table-col" rowspan="2">被推荐人姓名</td>
                      <td class="table-col" colspan="3">得票情况</td>
                  </tr>
                  <tr>
                      <td class="table-col">赞成票</td>
                      <td class="table-col">反对票</td>
                      <td class="table-col">弃权票</td>
                  </tr>
                  <tr>
                      <td><input v-model="table.B7" type="text"></td>
                      <td><input v-model="table.D7" type="text"></td>
                      <td><input v-model="table.F7" type="text"></td>
                      <td><input v-model="table.H7" type="text"></td>
                  </tr>
                  <tr>
                      <td><input v-model="table.B8" type="text"></td>
                      <td><input v-model="table.D8" type="text"></td>
                      <td><input v-model="table.F8" type="text"></td>
                      <td><input v-model="table.H8" type="text"></td>
                  </tr>
                  <tr>
                      <td><input v-model="table.B9" type="text"></td>
                      <td><input v-model="table.D9" type="text"></td>
                      <td><input v-model="table.F9" type="text"></td>
                      <td><input v-model="table.H9" type="text"></td>
                  </tr>
                  <tr>
                      <td><input v-model="table.B10" type="text"></td>
                      <td><input v-model="table.D10" type="text"></td>
                      <td><input v-model="table.F10" type="text"></td>
                      <td><input v-model="table.H10" type="text"></td>
                  </tr>
                  <tr>
                      <td><input v-model="table.B11" type="text"></td>
                      <td><input v-model="table.D11" type="text"></td>
                      <td><input v-model="table.F11" type="text"></td>
                      <td><input v-model="table.H11" type="text"></td>
                  </tr>
                  <tr>
                      <td><input v-model="table.B12" type="text"></td>
                      <td><input v-model="table.D12" type="text"></td>
                      <td><input v-model="table.F12" type="text"></td>
                      <td><input v-model="table.H12" type="text"></td>
                  </tr>
                  <tr>
                      <td><input v-model="table.B13" type="text"></td>
                      <td><input v-model="table.D13" type="text"></td>
                      <td><input v-model="table.F13" type="text"></td>
                      <td><input v-model="table.H13" type="text"></td>
                  </tr>
              </table>
              <div class="signbox">
                  <p>计票人签字：</p>
                  <p>监票人签字：</p>
                  <p>支部书记签字：</p>
              </div>
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
                table:{
                    // table1
                    "C2" : "",//推荐时间
                    "G2" : "",//推荐地点
                    "C3" : "",//党员总数
                    "G3" : "",//参加推荐党员人数

                    // table2
                    "D4" : "发出推荐票_____张，收回____张，其中有效票____张，无效票____张。",//

                    "B7" : "",//被推荐人姓名
                    "D7" : "",//赞成票
                    "F7" : "",//反对票
                    "H7" : "",//弃权票

                    "B8" : "",//被推荐人姓名
                    "D8" : "",//赞成票
                    "F8" : "",//反对票
                    "H8" : "",//弃权票

                    "B9" : "",//被推荐人姓名
                    "D9" : "",//赞成票
                    "F9" : "",//反对票
                    "H9" : "",//弃权票

                    "B10" : "",//被推荐人姓名
                    "D10" : "",//赞成票
                    "F10" : "",//反对票
                    "H10" : "",//弃权票

                    "B11" : "",//被推荐人姓名
                    "D11" : "",//赞成票
                    "F11" : "",//反对票
                    "H11" : "",//弃权票

                    "B12" : "",//被推荐人姓名
                    "D12" : "",//赞成票
                    "F12" : "",//反对票
                    "H12" : "",//弃权票

                    "B13" : "",//被推荐人姓名
                    "D13" : "",//赞成票
                    "F13" : "",//反对票
                    "H13" : "",//弃权票
                }
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
    input{
        text-align: center;
        vertical-align: middle;
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
        height: 100%;
        resize: none;
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
    .table2 input{
        text-align: center;
    }
    .page-header input{
        border: none;
    }
    .signbox{
        margin-top: -1px;
        line-height: 45px;
        border: 1px solid #1c2438;
        text-indent: 2em;
    }
</style>
