<template>
    <div>
        <Modal
            v-model="modal1"
            title="接收预备党员表决票汇总表"
            width="800"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="onlinetable-wrap">
                <h1>接收预备党员表决票汇总表</h1>
                <table class="table1" style="margin-top: 20px;">
                    <tr>
                        <td colspan="4">
                            <textarea v-model="table.A4"></textarea>
                        </td>
                    </tr>
                </table>
                <table class="table2">
                    <tr>
                        <td>姓  名</td>
                        <td>同　意</td>
                        <td>不同意</td>
                        <td>弃  权</td>
                    </tr>
                    <tr>
                        <td><input type="text" class="input-name" v-model="table.A7"></td>
                        <td><input type="text" v-model="table.B7"><span>票</span></td>
                        <td><input type="text" v-model="table.C7"><span>票</span></td>
                        <td><input type="text" v-model="table.D7"><span>票</span></td>
                    </tr>
                </table>
                <p class="text-center mt10">监  票  人（签名）</p>
                <p class="text-center mt10">计  票  人（签名）</p>
                <p class="text-center mt10">党支部书记（签名） </p>
                <p class="text-right mt10"> &emsp;&emsp;&emsp;&emsp;年&emsp;&emsp;月&emsp; &emsp;日</p>

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
                    "A4": "党支部于_____年____月____日召开支部大会， 以无记名投票方式对能否接收____同志为预备党员进行了表决。支部大会应到有表决权的党员_____人，实到有表决权的党员____人；发出表决票____张，收回____张。未到会有表决权的党员____（姓名）提出了书面意见，同意（不同意）接收____同志为预备党员，应视为有效票。经统计，支部大会共收到有效票____张，票决结果如下：",
                    "A7": "",//姓名
                    "B7": "",//同意票数
                    "C7": "",//不同意票数
                    "D7": "",//齐全票数
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
    .table2 td input.input-name{
        width:100%;
        text-align: center;
    }
    .mt10{
        margin-top: 20px;
        line-height: 24px;
    }
    .table2{
        border:1px solid #1c2438;
        margin-top: 10px !important;
    }
    .table2 td{
        border-right:1px solid #1c2438;
        border-bottom: 1px solid #1c2438;
    }
    .table2 td input{
        float: left;
        text-align: right;
        height: 32px;
        width: 55%;
    }
    .table2 td span{
        float: left;
        text-align: right;
        line-height: 32px;
        padding-left: 5px;
    }
    .table2 .no-border td{
        border: none !important;
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
        line-height: 24px;
        height: 100px;
        /* height: 100%; */
        resize: none;
    }
    td{
        height: 45px;
        /*border-bottom: 1px solid #1c2438;*/
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