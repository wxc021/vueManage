<template>
<div>
    <Modal v-model="modal1" title="支委会（支部大会）会议记录" width="800" @on-ok="ok" @on-cancel="cancel" ok-text="保存">
        <div class="onlinetable-wrap">
            <h1>支委会（支部大会）会议记录</h1>
            <table class="table1">
                <tr>
                    <td><input v-model="table.A3" type="text" :style="{width: '80px', display : 'inline-block'}">年</td>
                    <td colspan="3" :style="{ 'text-align':'right' }">
                        <input v-model="table.B3" type="text" :style="{width: '80px', display : 'inline-block', 'text-align':'right'}">党支部第
                        <input v-model="table.C3" type="text" :style="{width: '80px', display : 'inline-block', 'text-align':'center'}">次会议</td>
                </tr>
                <tr>
                    <td>会议议题：</td>
                    <td colspan="3"><input v-model="table.B4" type="text"></td>
                </tr>
                <tr>
                    <td>时 间：</td>
                    <td><input v-model="table.B5" type="text"></td>
                    <td>地 点：</td>
                    <td><input v-model="table.D5" type="text"></td>
                </tr>
                <tr>
                    <td>主持人：</td>
                    <td><input v-model="table.B6" type="text"></td>
                    <td>记录人：</td>
                    <td><input v-model="table.D6" type="text"></td>
                </tr>
                <tr>
                    <td>应到人数：</td>
                    <td><input v-model="table.B7" type="text"></td>
                    <td>实到人数：</td>
                    <td><input v-model="table.D7" type="text"></td>
                </tr>
                <tr>
                    <td colspan="4" :style="{'text-align' : 'left'}">
                        <div>参与人员姓名：</div>
                        <textarea v-model="table.A8" cols="30" rows="10"></textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        缺席人员姓名及缺席原因：
                        <input v-model="table.A9" :style="{ width: '590px', display : 'inline-block' }" type="text">
                    </td>
                </tr>
                <tr>
                    <td class="table-row" colspan="4" :style="{'font-size':'22px'}">会议内容</td>
                </tr>
                <tr>
                    <td colspan="4">
                        <textarea v-model="table.A11" rows="10" :style="{'width': '100%'}"></textarea>
                    </td>
                </tr>
            </table>
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
                "A3": "", //年份
                "B3": "", //XX党支部
                "C3":"",//第几次会议
                "B4": "", //会议议题
                "B5": "", //时间
                "D3": "", //次数
                "D5": "", //地点
                "B6": "", //主持人
                "D6": "", //记录人
                "B7": "", //应到人数
                "D7": "", //实到人数
                "A8": "", //参会人员姓名
                "A9": "", //缺席人员姓名及缺席原因
                "A11": "" //会议内容
            },
            year: 1990,
            branchname: "",
            times: '',
            names: '',
            results: '',
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
                        console.log(that.table.B3);

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
        year(val) {
            this.table.A3 = val + '年';
        },
        branchname(val) {
            this.table.B3 = val + '党支部第' + this.times + '次会议';
        },
        times(val) {
            this.table.B3 = this.branchname + '党支部第' + val + '次会议';
        },
        names(val) {
            this.table.A8 = '参会人员姓名：' + val;
        },
        results(val) {
            this.table.A9 = '缺席人员姓名及缺席原因：' + val;
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
    border-collapse: collapse;
}

table input {
    display: block;
    border: none;
    height: 100%;
    width: 100%;
}
/*input{*/
    /*text-align: center;*/
    /*vertical-align: middle;*/
/*}*/
table textarea {
    display: block;
    border: none;
    width: 100%;
    /* height: 100%; */
    resize: none;
}

td {
    height: 45px;
    border-bottom: 1px solid #1c2438;
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