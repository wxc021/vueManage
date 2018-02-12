<template>
  <div>
    <Modal
        v-model="modal1"
        title="确定发展对象征求群众意见会议记录	"
        width="800"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="onlinetable-wrap">
            <h1>确定__{{table.A1}}____为发展对象征求党员意见会议记录</h1>

            <table class="table1">
                <tr>
                    <td>党组织名称:</td>
                    <td colspan="3" :style="{ 'text-align' : 'left' }"><input v-model="table.A3" type="text"></td>
                </tr>
                <tr>
                    <td>时  间：</td>
                    <td><input v-model="table.B4" type="text"></td>
                    <td>地    点：</td>
                    <td><input v-model="table.D4" type="text"></td>
                </tr>
                <tr>
                    <td>主 持 人：</td>
                    <td><input v-model="table.B5" type="text"></td>
                    <td>记 录 人：</td>
                    <td><input v-model="table.D5" type="text"></td>
                </tr>
                <tr>
                    <td>参加人数：</td>
                    <td><input v-model="table.B6" type="text"></td>
                    <!--<td>实到人数：</td>-->
                    <!--<td><input v-model="table.D6" type="text"></td>-->
                </tr>
                <tr>
                    <td :style="{'vertical-align': 'top'}">
                        参与人员姓名：
                    </td>
                    <td colspan="3" :style="{'text-align' : 'left'}">
                        <textarea v-model="table.A7" cols="30" rows="10"></textarea>
                    </td>
                </tr>
                <!--<tr>-->
                    <!--<td colspan="4">-->
                        <!--缺席人员姓名及缺席原因：-->
                        <!--<input v-model="table.A8" :style="{ width: '590px', display : 'inline-block' }" type="text">-->
                    <!--</td>-->
                <!--</tr>-->
                <tr>
                    <td class="table-row" colspan="4" :style="{'font-size':'22px'}">会议内容</td>
                </tr>
                <tr>
                    <td colspan="4">
                        <textarea v-model="table.A9" rows="10" :style="{'width': '100%'}"></textarea>
                    </td>
                </tr>
            </table>
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
                    "A1": "",//确定　　为发展对象征求群众意见会议记录
                    "A3": "",//党组织名称：
                    "B4": "",//会议议题
                    "B4": "",//时间
                    "D4": "",//地点
                    "B5": "",//主持人
                    "D5": "",//记录人
                    "B6": "",//参加人数
                    "A7": "",
                    "A9": ""//会议内容
                },
                results: '',//肚子疼
                names : ""//参会人员姓名
            }
        },
        computed:{

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
            names( val ){
                this.table.A7 = "参与人员姓名：" + val;
            }
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
    td{
        height: 45px;
        border-bottom: 1px solid #1c2438;
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
</style>
