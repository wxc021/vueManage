<template>
<div>
    <Modal v-model="modal1" title="发展党员工作预审表" width="800" @on-ok="ok" ok-text="保存" @on-cancel="cancel">
        <div class="onlinetable-wrap">
            <h1>发展党员工作预审表</h1>
            <div class="page-header">党（工）委名称：<input v-model="table.A3" type="text" :style="{width: '400px','text-align':'left'}"> <span class="fr"><input class="input-date" v-model="tableDate.yyyy" type="text">年<input class="input-date" v-model="tableDate.mm" type="text">月<input class="input-date" v-model="tableDate.dd" type="text">日</span></div>
            <table class="table1">
                <colgroup>
                    <col width="100">
                    <col width="120">
                    <col width="60">
                    <col width="40">
                    <col width="40">
                    <col width="40">
                    <col width="40">
                    <col width="100">
                    <col width="80">
                    <col width="100">
                    <col width="100">
                </colgroup>
                <tr>
                    <td class="table-col">姓名</td>
                    <td>{{ table.B4 }}</td>
                    <td class="table-col" colspan="2">性别</td>
                    <td>{{ table.D4 }}</td>
                    <td class="table-col" colspan="2">民族</td>
                    <td>{{ table.H4 }}</td>
                    <td class="table-col" colspan="2">出生年月</td>
                    <td>{{ table.K4 }}</td>
                </tr>
                <tr>
                    <td class="table-col">文化程度</td>
                    <td><input v-model="table.B5" type="text"></td>
                    <td class="table-col" colspan="2">参加工作时间</td>
                    <td colspan="4">{{ table.E5 }}</td>
                    <td class="table-col" colspan="2">申请入党时间</td>
                    <td>{{ table.K5 }}</td>
                </tr>
                <tr>
                    <td class="table-col">确定积极<br>分子时间</td>
                    <td>{{ table.B6 }}</td>
                    <td class="table-col" colspan="2">确定发展<br>对象时间</td>
                    <td colspan="4">{{ table.E6 }}</td>
                    <td class="table-col" colspan="2">短期集中<br>培训时间</td>
                    <td>{{ table.K6 }}</td>
                </tr>
                <tr>
                    <td class="table-col">所在支部名称</td>
                    <td colspan="2">{{table.B7}}</td>
                    <td class="table-col" colspan="4">现任职务</td>
                    <td colspan="4"><input v-model="table.H7" type="text"></td>
                </tr>
                <tr>
                    <td class="table-col">党支部预审<br>意见</td>
                    <td colspan="10">
                        <textarea v-model="table.B8" cols="30" rows="10"></textarea>
                        <div class="text-right">支部书记签字（盖章）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    </td>
                </tr>
                <tr>
                    <td class="table-col">上级党（工）<br>委预审意见</td>
                    <td colspan="10">
                        <textarea v-model="table.B10" cols="30" rows="10"></textarea>
                        <div class="text-right">（盖章）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    </td>
                </tr>
                <tr>
                    <td class="table-col" colspan="2">审卷人</td>
                    <td colspan="4"><input v-model="table.C12" type="text"></td>
                    <td class="table-col" colspan="3">领卷人</td>
                    <td colspan="2"><input v-model="table.J12" type="text"></td>
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
    data() {
        return {
            modal1: true,
            table: {
                "A3": "",
                "B4": "",//姓名
                "D4": "",//性别
                "H4": "",//民族
                "K4": "",//出生年月
                "B5": "",//文化程度
                "E5": "",//参加工作时间
                "K5": "",//申请入党时间
                "B6": "",//确定积极份子时间
                "E6": "",//确定发展对象时间
                "K6": "",//短期集中培训时间
                "B7": "",//所在支部名称
                "H7": "",//现任职务
                "B8": "",//党支部预审意见
                "B10": "",//上级党（工）委预审意见
                "C10": "",//审卷人
                "J10": "",//领卷人
                "I3": ""
            },
            tableDate: {
                yyyy: "",
                mm: "",
                dd: ""
            },
        }
    },
    computed: {
        // g2(){
        //     return this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
        // }
    },
    methods: {
        ok() {
            let that = this;
            let qs = require('qs');
            let postData = {};
            postData.uid = that.$route.query.uid;
            postData.template_id = that.$route.params.id;
            postData.table_json = Object.assign({}, that.table);
            that.axios({
                    url: '/v1/recruit/save-table-data',
                    method: 'post',
                    data: qs.stringify(postData)
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.$Message.success('保存成功');
                        setTimeout(() => {
                            this.$router.push({
                                name: 'recruitMembers',
                            });
                        }, 500)
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.Message.error('网络请求异常');
                })
        },
        cancel() {
            this.$router.push({
                name: 'recruitMembers',
            });
        },
        getDetail() {
            let that = this;
            let qs = require('qs')
            that.axios({
                    url: '/v1/recruit/get-table-data',
                    method: 'post',
                    data: qs.stringify({
                        uid: that.$route.query.uid,
                        template_id: that.$route.params.id,
                    })
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        let data = needData.data.baseinfo;
                        let data2 = needData.data.content;
                        for (let key in data) {
                            that.table[key] = data[key];
                        }
                        for (let key in data2) {
                            that.table[key] = data2[key];
                        }
//                        console.log(that.table.I3.substring(0,4),that.table.I3.substring(5,7),that.table.I3.substring(8,10));
                        that.tableDate.yyyy=that.table.I3.substring(0,4);
                        that.tableDate.mm=that.table.I3.substring(5,7);
                        that.tableDate.dd=that.table.I3.substring(8,10);
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
        },
    },
    watch: {
        name(val) {
            this.table.A3 =  val;
        },
        "tableDate.yyyy" (val) {
            this.table.I3 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
        },
        "tableDate.mm" (val) {
            this.table.I3 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
        },
        "tableDate.dd" (val) {
            this.table.I3 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
        }
    },
    mounted() {
        this.getDetail();
    }
}
</script>

<style scoped>
table {
    width: 100%;
    font-size: 14px;
    border: 1px solid #1c2438;
    border-collapse: collapse;
}

table input {
    display: block;
    border: none;
    height: 100%;
    width: 100%;
}

table textarea {
    display: block;
    border: none;
    width: 100%;
    /* height: 100%; */
    resize: none;
}
input {
    text-align: center;
    vertical-align: middle;
}
td {
    height: 45px;
    border: 1px solid #1c2438;
    text-align: center;
    vertical-align: middle;
}

h1 {
    font-size: 22px;
    text-align: center;
}

input,
textarea {
    outline: none;
}

div {
    font-size: 14px;
}

.input-date {
    width: 40px;
    text-align: right;
}

.table2 {
    margin-top: -1px;
}

.table2 input {
    text-align: center;
}

.page-header input {
    border: none;
}
</style>