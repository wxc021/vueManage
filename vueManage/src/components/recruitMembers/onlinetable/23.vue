<template>
<div>
    <Modal v-model="modal1" title="接收预备党员公示情况表" width="800" @on-ok="ok" ok-text="保存" @on-cancel="cancel">
        <div class="onlinetable-wrap">
            <h1>接收预备党员公示情况表</h1>
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
                    <td class="table-col">民族</td>
                    <td>{{ table.F3 }}</td>
                </tr>
                <tr>
                    <td class="table-col">出生年月</td>
                    <td>{{ table.B4 }}</td>
                    <td class="table-col">文化程度</td>
                    <td><input v-model="table.D4" type="text"></td>
                    <td class="table-col">申请入党时间</td>
                    <td>{{ table.F4}}</td>

                </tr>
                <tr>
                    <td class="table-col">公示时间</td>
                    <td colspan="2"><input v-model="table.B5" type="text"></td>
                    <td class="table-col">所在单位<br>及 职 务</td>
                    <td colspan="2"><input v-model="table.D5" type="text"></td>
                </tr>
                <tr>
                    <td class="table-col">收到意见或<br>建议</td>
                    <td colspan="5">
                        <textarea v-model="table.B6" cols="30" rows="10"></textarea>
                    </td>
                </tr>
                <tr>
                    <td class="table-col">查核处理<br>情　　况</td>
                    <td colspan="5">
                        <textarea v-model="table.B7" cols="30" rows="10"></textarea>
                    </td>
                </tr>
                <tr>
                    <td class="table-col">党支部<br>意见</td>
                    <td colspan="5">
                        <textarea v-model="table.B8" cols="30" rows="10"></textarea>
                        <div class="text-right">支部书记签字（盖章）&nbsp;&nbsp;&nbsp;&nbsp;<br>年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    </td>
                </tr>
                <tr>
                    <td class="table-col">基层党委<br>意见</td>
                    <td colspan="5">
                        <textarea v-model="table.B9" cols="30" rows="10"></textarea>
                        <div class="text-right">（盖章）&nbsp;&nbsp;&nbsp;&nbsp;<br>年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;</div>
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
                "B3": "", //姓名
                "D3": "", //性别
                "F3": "", //民族
                "B4": "", //出生年月
                "D4": "", //文化程度
                "F4": "", //申请入党时间
                "B5": "", //公示时间
                "D5": "", //所在单位及职务
                "B6": "", //收到意见或建议
                "B7": "", //核查处理情况
                "B8": "", //党支部意见
                "B9": "", //基层党委意见
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
input {
    text-align: center;
    vertical-align: middle;
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