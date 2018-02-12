<template>
    <div>
        <Modal
            v-model="modal1"
            title="支部大会会议记录"
            width="800"
            @on-ok="ok"
            ok-text="保存"
            @on-cancel="cancel">
            <div class="onlinetable-wrap">
                <h1>支部大会会议记录</h1>
                <table class="table1">
                    <tr>
                        <td><input v-model="table.A3" type="text" :style="{width: '80px', display : 'inline-block'}">年</td>
                        <td colspan="3":style="{ 'text-align':'right' }">
                            <input v-model="table.B3" type="text" :style="{width: '80px', display : 'inline-block', 'text-align':'right'}">党支部第
                            <input v-model="table.C3" type="text" :style="{width: '80px', display : 'inline-block', 'text-align':'center'}">次会议</td>
                    </tr>
                    <tr>
                        <td>会议议题：</td>
                        <td colspan="3"><input v-model="table.B4" type="text"></td>
                    </tr>
                    <tr>
                        <td>时  间：</td>
                        <td><input v-model="table.B5" type="text"></td>
                        <td>地    点：</td>
                        <td><input v-model="table.D5" type="text"></td>
                    </tr>
                    <tr>
                        <td>主持人：</td>
                        <td><input v-model="table.B6" type="text"></td>
                        <td>记录人：</td>
                        <td><input v-model="table.D6" type="text"></td>
                    </tr>
                    <tr>
                        <td>入党介绍人：</td>
                        <td><input v-model="table.B7" type="text"></td>
                        <td>列席人：</td>
                        <td><input v-model="table.D7" type="text"></td>
                    </tr>
                    <tr>
                        <td>应到会有表决权的党员人数</td>
                        <td><input v-model="table.B8" type="text"></td>
                        <td>实到会有表决权的党员人数</td>
                        <td><input v-model="table.D8" type="text"></td>
                    </tr>
                    <tr>
                        <td colspan="4" :style="{'text-align' : 'left'}">
                            <div>参与人员姓名：</div>
                            <textarea v-model="table.A9" cols="30" rows="10"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            缺席人员姓名及缺席原因：
                            <input v-model="table.A10" :style="{ width: '590px', display : 'inline-block' }" type="text">
                        </td>
                    </tr>
                    <tr>
                        <td class="table-row" colspan="4" :style="{'font-size':'22px'}">会议内容</td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <textarea v-model="table.A12" rows="10" :style="{'width': '100%'}"></textarea>
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
                    "A3": "",
                    "B3": "",
                    "C3":"",
                    "B4": "",//会议议题
                    "B5": "",//时间
                    "D5": "",//地点
                    "B6": "",//主持人
                    "D6": "",//记录人
                    "B7": "",//入党介绍人
                    "D7": "",//列席人
                    "B8": "",//应到会有表决权的党员人数
                    "D8": "",//实到会有表决权的党员人数
                    "A8": "",//
                    "A9": "",///
                    "A10":"",
                    "A12": ""//会议内容
                },
                year :'' ,//1990
                branchname : "",//xx党支部
                times: '',//
                names : '',//xx和xx和xx和xx
                results: '',//肚子疼
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
                            method: 'post',
                            url: '/v1/recruit/save-table-data',
                            data: qs.stringify({
                                uid: that.$route.query.uid,
                                template_id: that.$route.params.id,
                                table_json: that.table,
                            }),
                        })
                        .then(res => {
                    let needData = res.data;
                if (needData.code == '200') {
                    this.$Modal.remove()
                    setTimeout(function (args) {
                        console.log(that);
                        that.$router.push({name: 'recruitMembers'});
                    }, 30)
                    this.$Message.success('提交成功');
                } else {
                    setTimeout(() => {
                        that.loading = false;
                    that.$nextTick(() => {
                        that.loading = true;
                })
                    ;
                },
                    1000
                )
                    ;
                    this.$Message.error(needData.msg);
                }
            })
            .
                catch(err => {
                    this.$Message.error('网络请求失败');
            })

            },
            cancel () {
                let that = this;
                this.$Modal.remove()
                setTimeout(function (args) {
                    that.$router.push({name: 'recruitMembers'});
                }, 30)
            },
            //获取详情数据
            getDetail(){
                let that = this;
                let qs = require("qs");
                this.axios({
                            method: 'post',
                            url: '/v1/recruit/get-table-data',
                            data: qs.stringify({
                                uid: that.$route.query.uid,
                                template_id: that.$route.params.id,
                                opt: '1'
                            }),
                        })
                        .then(res => {
                    let needData = res.data;
                if (needData.code == '200') {
                    let baseInfotData = needData.data.baseinfo;
                    let contentData = needData.data.content;
                    for (let key in baseInfotData) {
                        that.table[key] = baseInfotData[key];
                    }
                    for (let key in contentData) {
                        that.table[key] = contentData[key];
                    }
                } else {
                    this.$Message.error(needData.msg);
                }
            })
            .
                catch(err => {
                    this.$Message.error('网络请求失败');
            })
            }

        },
        watch: {
            year(val){
                this.table.A3 = val + '年';
            },
            branchname(val){
                this.table.B3 = val + '党支部第' + this.times + '次会议';
            },
            times(val){
                this.table.B3 = this.branchname + '党支部第' + val  + '次会议';
            },
            names(val){
                this.table.A9 = '参会人员姓名：' + val;
            },
            results(val){
                this.table.A10 = '缺席人员姓名及缺席原因：' + val;
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