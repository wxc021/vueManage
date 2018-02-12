<template>
    <div>
    <Modal
        v-model="modal1"
        title="入党申请人登记表"
        width="800"
        :loading="loading"
        :mask-closable="false"
        :closable="false"
        class-name="max-height vertical-center-modal"
        @on-ok="ok"
        ok-text="保存"
        @on-cancel="cancel">
        <div class="onlinetable-wrap">
            <h1>入党申请人登记表</h1>
            <div class="page-header">单位：<input v-model="table.B2" type="text" :style="{width: '500px','text-align':'left'}"> <span class="fr"><input class="input-date" v-model="tableDate.yyyy" type="text">年<input class="input-date" v-model="tableDate.mm" type="text">月<input class="input-date" v-model="tableDate.dd" type="text">日</span></div>
            <table class="table1">
                <colgroup>
                    <col width="100">
                    <col width="150">
                    <col width="100">
                    <col width="150">
                    <col width="100">
                    <col width="150">
                </colgroup>
                <tr>
                    <td class="table-col">姓名</td>
                    <td>{{ table.B3 }}</td>
                    <td class="table-col">性别</td>
                    <td>{{ table.F3 }}</td>
                    <td class="table-col">籍贯</td>
                    <td>{{ table.H3 }}</td>
                </tr>
                <tr>
                    <td class="table-col">出生年月</td>
                    <td>{{ table.B4 }}</td>
                    <td class="table-col">民族</td>
                    <td>{{ table.F4 }}</td>
                    <td class="table-col">申请时间</td>
                    <td>{{table.H4}}</td>
                </tr>
                <tr>
                    <td class="table-col">毕业院校</td>
                    <td colspan="3"><input type="text" v-model="table.B5"></td>
                    <td class="table-col">学历学位</td>
                    <td><input type="text" v-model="table.H5"></td>
                </tr>
                <tr>
                    <td class="table-col">现任职务<br>及&nbsp;&nbsp;职&nbsp;&nbsp;称</td>
                    <td colspan="5"><input type="text" v-model="table.B6"></td>
                </tr>
            </table>
            <table class="table2">
                <tr>
                    <td class="table-row" colspan="4">本  人  经  历</td>
                </tr>
                <tr>
                    <td class="table-col">起始年月</td>
                    <td class="table-col">截止年月</td>
                    <td class="table-col">在何地、何部门、任何职</td>
                    <td class="table-col">证明人</td>
                </tr>
                <tr>
                    <td><input v-model="table.A9" type="text"></td>
                    <td><input v-model="table.C9" type="text"></td>
                    <td><input v-model="table.E9" type="text"></td>
                    <td><input v-model="table.I9" type="text"></td>
                </tr>
                <tr>
                    <td><input v-model="table.A10" type="text"></td>
                    <td><input v-model="table.C10" type="text"></td>
                    <td><input v-model="table.E10" type="text"></td>
                    <td><input v-model="table.I10" type="text"></td>
                </tr>
                <tr>
                    <td><input v-model="table.A11" type="text"></td>
                    <td><input v-model="table.C11" type="text"></td>
                    <td><input v-model="table.E11" type="text"></td>
                    <td><input v-model="table.I11" type="text"></td>
                </tr>
                <tr>
                    <td><input v-model="table.A12" type="text"></td>
                    <td><input v-model="table.C12" type="text"></td>
                    <td><input v-model="table.E12" type="text"></td>
                    <td><input v-model="table.I12" type="text"></td>
                </tr>
                <tr>
                    <td><input v-model="table.A13" type="text"></td>
                    <td><input v-model="table.C13" type="text"></td>
                    <td><input v-model="table.E13" type="text"></td>
                    <td><input v-model="table.I13" type="text"></td>
                </tr>
                <tr>
                    <td><input v-model="table.A14" type="text"></td>
                    <td><input v-model="table.C14" type="text"></td>
                    <td><input v-model="table.E14" type="text"></td>
                    <td><input v-model="table.I14" type="text"></td>
                </tr>
                <tr>
                    <td><input v-model="table.A15" type="text"></td>
                    <td><input v-model="table.C15" type="text"></td>
                    <td><input v-model="table.E15" type="text"></td>
                    <td><input v-model="table.I15" type="text"></td>
                </tr>
                <tr>
                    <td><input v-model="table.A16" type="text"></td>
                    <td><input v-model="table.C16" type="text"></td>
                    <td><input v-model="table.E16" type="text"></td>
                    <td><input v-model="table.I16" type="text"></td>
                </tr>
                <tr>
                    <td><input v-model="table.A17" type="text"></td>
                    <td><input v-model="table.C17" type="text"></td>
                    <td><input v-model="table.E17" type="text"></td>
                    <td><input v-model="table.I17" type="text"></td>
                </tr>
            </table>
            <table class="table3">
                <tr>
                    <td>何时何地因何原因<br>
受过何种奖励或处分</td>
                    <td><textarea v-model="table.D20" cols="30" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td>何时何地参加过何种民主<br>
党派或进步团体任何职</td>
                    <td><textarea v-model="table.D21" cols="30" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td>有何政治历史问题<br>
结论如何</td>
                    <td><textarea v-model="table.D22" cols="30" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td>家庭主要成员的姓名<br>
职业和政治情况</td>
                    <td><textarea v-model="table.D23" cols="30" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td>家庭社会关系的姓名<br>
职业和政治情况</td>
                    <td><textarea v-model="table.D24" cols="30" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</td>
                    <td><textarea v-model="table.D25" cols="30" rows="10"></textarea></td>
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
                loading:true,
                table:{
                    // table1
                    "B2" : "",//单位
                    "G2" : "",
                    "B3" : "",//姓名
                    "F3" : "",//性别
                    "H3" : "",//籍贯
                    "B4" : "",//出生年月
                    "F4" : "",//民族
                    "H4" : "",//申请时间
                    "B5" : "",//毕业院校
                    "H5" : "",//学历学位
                    "B6" : "",//现任职务及职称

                    // table2
                    "A9" : "",//起始年月
                    "C9" : "",//截止年月
                    "E9" : "",//在何地、何部门、任何职
                    "I9" : "",//证明人

                    "A10" : "",//起始年月
                    "C10" : "",//截止年月
                    "E10" : "",//在何地、何部门、任何职
                    "I10" : "",//证明人

                    "A11" : "",//起始年月
                    "C11" : "",//截止年月
                    "E11" : "",//在何地、何部门、任何职
                    "I11" : "",//证明人

                    "A12" : "",//起始年月
                    "C12" : "",//截止年月
                    "E12" : "",//在何地、何部门、任何职
                    "I12" : "",//证明人

                    "A13" : "",//起始年月
                    "C13" : "",//截止年月
                    "E13" : "",//在何地、何部门、任何职
                    "I13" : "",//证明人

                    "A14" : "",//起始年月
                    "C14" : "",//截止年月
                    "E14" : "",//在何地、何部门、任何职
                    "I14" : "",//证明人

                    "A15" : "",//起始年月
                    "C15" : "",//截止年月
                    "E15" : "",//在何地、何部门、任何职
                    "I15" : "",//证明人

                    "A16" : "",//起始年月
                    "C16" : "",//截止年月
                    "E16" : "",//在何地、何部门、任何职
                    "I16" : "",//证明人

                    "A17" : "",//起始年月
                    "C17" : "",//截止年月
                    "E17" : "",//在何地、何部门、任何职
                    "I17" : "",//证明人

                    // table3
                    "D20" : "",//何时何地因何原因受过何种奖励或处分
                    "D21" : "",//何时何地参加过何种民主党派或进步团体任何职
                    "D22" : "",//有何政治历史问题结 论 如 何
                    "D23" : "",//家庭主要成员的姓名职业和政治情况
                    "D24" : "",//家庭社会关系的姓名职业和政治情况
                    "D25" : "",//备注
                },
                tableDate:{
                    yyyy : "",
                    mm : "",
                    dd : ""
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
                    that.tableDate.yyyy=that.table.G2.substring(0,4);
                    that.tableDate.mm=that.table.G2.substring(5,7);
                    that.tableDate.dd=that.table.G2.substring(8,10);
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
            "tableDate.yyyy"(val){
                this.table.G2 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
            },
            "tableDate.mm"(val){
                this.table.G2 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
            },
            "tableDate.dd"(val){
                this.table.G2 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
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
    input{
        text-align: center;
        vertical-align: middle;
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
        margin-bottom: 20px;
    }
    .table2 input{
        text-align: center;
    }
    .page-header input{
        border: none;
    }
</style>
