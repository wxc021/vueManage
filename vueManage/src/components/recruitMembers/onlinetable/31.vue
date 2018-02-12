<template>
    <div>
        <Modal
            v-model="modal1"
            title="预备党员备案表"
            width="800"
            @on-ok="ok"
            @on-cancel="cancel">
            <div class="onlinetable-wrap">
                <h1>预备党员备案表</h1>
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
                        <td>{{ table.B3 }}</td>
                        <td class="table-col">性别</td>
                        <td>{{ table.D3 }}</td>
                        <td class="table-col">籍贯</td>
                        <td>{{ table.F3 }}</td>
                    </tr>
                    <tr>
                        <td class="table-col">出生年月</td>
                        <td>{{ table.B4 }}</td>
                        <td class="table-col">民族</td>
                        <td>{{ table.D4}}</td>
                        <td class="table-col">文化程度</td>
                        <td><input v-model="table.F4" type="text"></td>
                    </tr>
                    <tr>
                        <td class="table-col">参加工作时间</td>
                        <td>{{ table.B5 }}</td>
                        <td class="table-col">申请入党时间</td>
                        <td>{{ table.D5}}</td>
                        <td class="table-col">确定积极分子时间</td>
                        <td>{{ table.F5 }}</td>
                    </tr>
                    <tr>
                        <td class="table-col">确定发展对象时间</td>
                        <td>{{ table.B6 }}</td>
                        <td class="table-col">支部大会讨论时间</td>
                        <td><input v-model="table.D6" type="text"></td>
                        <td class="table-col">党委审批时间</td>
                        <td><input v-model="table.F6" type="text"></td>
                    </tr>
                    <tr>
                        <td class="table-col">工作单位<br>及职务</td>
                        <td colspan="5"><input v-model="table.B7" type="text"></td>
                    </tr>
                    <tr>
                        <td class="table-col">党委<br>意见</td>
                        <td colspan="5">
                            <textarea v-model="table.B8" cols="30" rows="10"></textarea>
                            <div class="text-right">党委书记签字（盖章）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-col">上级党委<br>组织部门<br>意见</td>
                        <td colspan="5">
                            <textarea v-model="table.B10" cols="30" rows="10"></textarea>
                            <div class="text-right">（盖章）&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        </td>
                    </tr>
                </table>
                <div>注：此表一式两份，一份党委留存，一份存入党员档案。</div>
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
                    "F4": "",//文化程度
                    "B5": "",//加入群团组织时间
                    "D5": "",//申请入党时间
                    "F5": "",//确定积极分子时间
                    "B6": "",//确定发展对象时间
                    "D6": "",//支部大会讨论时间
                    "F6": "",//党委审批时间
                    "B7": "",//工作单位及职务
                    "B8": "",//党委意见
                    "B10": ""//上级党委组织部门备案
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
    input{
        text-align: center;
    }
    .table2 input{
        text-align: center;
    }
    .page-header input{
        border: none;
    }
</style>