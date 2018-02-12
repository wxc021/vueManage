<template>
<div>
    <Modal v-model="modal1" title="发展对象短期集中培训考核鉴定表" width="800" @on-ok="ok" @on-cancel="cancel">
        <div class="onlinetable-wrap">
            <h1>发展对象短期集中培训考核鉴定表</h1>
            <div class="page-header">培训单位：<input v-model="name" type="text" :style="{width: '500px'}"></div>
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
                    <td  class="table-col">姓名</td>
                    <td>{{ table.B4 }}</td>
                    <td class="table-col">性别</td>
                    <td>{{ table.D4 }}</td>
                    <td class="table-col">民族</td>
                    <td>{{ table.F4 }}</td>
                </tr>
                <tr>
                    <td class="table-col">出生年月</td>
                    <td>{{ table.B5 }}</td>
                    <td class="table-col">文化程度</td>
                    <td><input v-model="table.D5" type="text"></td>
                    <td class="table-col">参加工作时间</td>
                    <td>{{ table.F5 }}</td>
                </tr>
                <tr>
                    <td class="table-col">申请入党<br>时 间</td>
                    <td>{{ table.B6 }}</td>
                    <td class="table-col">确定积极分子时间</td>
                    <td>{{ table.D6 }}</td>
                    <td class="table-col">确定发展对象时间</td>
                    <td>{{ table.F6 }}</td>
                </tr>
                <tr>
                    <td class="table-col">所在单位<br>及 职 务</td>
                    <td colspan="5"><input v-model="table.B7" type="text"></td>
                </tr>
                <tr>
                    <td class="table-col">学时</td>
                    <td colspan="2"><input v-model="table.B8" type="text"></td>
                    <td class="table-col">考试成绩</td>
                    <td colspan="2"><input v-model="table.E8" type="text"></td>
                </tr>
                <tr>
                    <td class="table-col">培<br>训<br>内<br>容</td>
                    <td colspan="5">
                        <textarea v-model="table.B9" cols="30" rows="10"></textarea>
                    </td>
                </tr>
                <tr>
                    <td class="table-col">个<br>人<br>总<br>结</td>
                    <td colspan="5">
                        <textarea v-model="table.B10" cols="30" rows="10"></textarea>
                    </td>
                </tr>
            </table>

            <table>
                <tr>
                    <td class="table-col">个<br>人<br>总<br>结</td>
                    <td>
                        <textarea v-model="table.B13" cols="30" rows="10"></textarea>
                        <div class="text-right"><span class="fl">本人签字：</span>&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    </td>
                </tr>
                <tr>
                    <td class="table-col">培<br>训<br>单<br>位<br>意<br>见</td>
                    <td>
                        <textarea v-model="table.B15" cols="30" rows="10"></textarea>
                        <div class="text-right"><span class="fl">负责人签字（盖章）：</span>&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;</div>
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
    data() {
        return {
            modal1: true,
            table: {
                "A3": "",
                "B4": "",//姓名
                "D4": "",//性别
                "F4": "",//民族
                "B5": "",//出生年月
                "D5": "",//文化程度
                "F5": "",//参加工作时间
                "B6": "",//申请入党时间
                "D6": "",//确定积极分子时间
                "F6": "",//确定发展对象时间
                "B7": "",//所在单位及职务
                "B8": "",//学时
                "E8": "",//考试成绩
                "B9": "",//培训内容
                "B10": "",//个人总结
                "B13": "",//个人总结
                "B15": "",//培训单位意见

            },
            name: "培训单位"
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
                        console.log(that.table);

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
            this.table.A3 = "培训单位：" + val;
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

.table1 {
    margin-bottom: 20px;
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