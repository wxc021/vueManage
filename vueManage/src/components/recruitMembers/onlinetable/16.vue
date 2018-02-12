<template>
<div>
    <Modal v-model="modal1" title="发展对象政审表" width="800" ok-text="保存" @on-ok="ok" @on-cancel="cancel">
        <div class="onlinetable-wrap">
            <h1>发展对象政审表</h1>
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
                    <td class="table-col">姓 名</td>
                    <td>{{ table.B3 }}</td>
                    <td class="table-col">性 别</td>
                    <td>{{ table.D3 }}</td>
                    <td class="table-col">出生年月</td>
                    <td>{{ table.G3 }}</td>
                </tr>
                <tr>
                    <td class="table-col">文化程度</td>
                    <td><input v-model="table.B4" type="text"></td>
                    <td class="table-col">申请入党时间</td>
                    <td> {{ table.D4 }}</td>
                    <td class="table-col">现任职务</td>
                    <td><input v-model="table.G4" type="text"></td>
                </tr>
                <tr>
                    <td class="table-col">本人简历</td>
                    <td colspan="5"><textarea v-model="table.B5" cols="30" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td class="table-col">在重大政治斗争中的现实表现（“文革”、八九政治风波及“法轮功”等）</td>
                    <td colspan="5"><textarea v-model="table.B6" cols="30" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td class="table-col">遵纪守法<br>和遵守社会<br>公德情况</td>
                    <td colspan="5"><textarea v-model="table.B7" cols="30" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td class="table-col">其他需要<br>说明的问题</td>
                    <td colspan="5"><textarea v-model="table.B8" cols="30" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td colspan="3">
                        <div class="text-left">党支部意见：</div>
                        <textarea v-model="table.A9" name="" id="" cols="30" rows="10"></textarea>
                        <div class="text-right"><input v-model="branchDate.yyyy" type="text" :style="{width : '40px', display : 'inline-block'}">年<input v-model="branchDate.mm" type="text" :style="{width : '40px', display : 'inline-block'}">月<input v-model="branchDate.dd" type="text"
                                :style="{width : '40px', display : 'inline-block'}">日</div>
                    </td>
                    <td colspan="3">
                        <div class="text-left">基层党委意见：</div>
                        <textarea v-model="table.E9" name="" id="" cols="30" rows="10"></textarea>
                        <div class="text-right"><input v-model="committeeDate.yyyy" type="text" :style="{width : '40px', display : 'inline-block'}">年<input v-model="committeeDate.mm" type="text" :style="{width : '40px', display : 'inline-block'}">月<input v-model="committeeDate.dd"
                                type="text" :style="{width : '40px', display : 'inline-block'}">日</div>
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
                "B3": "",//姓名
                "D3": "",//性别
                "G3": "",//出生年月
                "B4": "",//文化程度
                "D4": "",//申请入党时间
                "G4": "",//现任职务
                "B5": "",//本人简历
                "B6": "",//在重大政治斗争中的现实表现（“文革”、八九政治风波及“法轮功”等）
                "B7": "",//遵纪守法和遵守社会公德情况
                "B8": "",//其他需要说明的问题
                "A9": "",//党支部意见
                "E9": "",//党委意见
                "A10": "",
                "E10": ""
            },
            branch: "",
            committee: "",
            branchDate: {
                yyyy: "",
                mm: "",
                dd: ""
            },
            committeeDate: {
                yyyy: "",
                mm: "",
                dd: ""
            }

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
        branch(val) {
            this.table.A9 = '党支部意见：' + val;
        },
        committee(val) {
            this.table.E9 = '基层党委意见：' + val;
        },
        "branchDate.yyyy" (val) {
            this.table.A10 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
        },
        "branchDate.mm" (val) {
            this.table.A10 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
        },
        "branchDate.dd" (val) {
            this.table.A10 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
        },
        "committeeDate.yyyy" (val) {
            this.table.E10 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
        },
        "committeeDate.mm" (val) {
            this.table.E10 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
        },
        "committeeDate.dd" (val) {
            this.table.E10 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
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
input{
    text-align: center;
    vertical-align: middle;
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
</style>