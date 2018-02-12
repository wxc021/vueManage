<template>
<div>
<Modal v-model="modal1" title="入党介绍人登记表" width="800" ok-text="保存" @on-ok="ok" @on-cancel="cancel">
    <div class="onlinetable-wrap">
        <h1>入党介绍人登记表</h1>
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
                <td><input type="text" v-model="table.B2"></td>
                <td class="table-col">性别</td>
                <td><input type="text" v-model="table.E2"></td>
                <td class="table-col">籍贯</td>
                <td><input type="text" v-model="table.G2"></td>
            </tr>
            <tr>
                <td class="table-col">出生年月</td>
                <td><input type="text" v-model="table.B3"></td>
                <td class="table-col">民族</td>
                <td><input type="text" v-model="table.E3"></td>
                <td class="table-col">入党时间</td>
                <td><input v-model="table.G3" type="text"></td>
            </tr>
        </table>
        <table class="table2">
            <tr>
                <td width="127" class="table-col">学历学位</td>
                <td><input v-model="table.B4" type="text"></td>
                <td class="table-col" width="150">所在党支部名称</td>
                <td :style="{width: '300px'}"><input type="text" v-model="table.F4"></td>
            </tr>
            <tr>
                <td class="table-col">工作单位<br>及职务</td>
                <td colspan="3"><input v-model="table.B6" type="text"></td>
            </tr>
            <tr>
                <td class="table-col">个<br>人<br>简<br>历</td>
                <td colspan="3"><textarea v-model="table.B7" cols="30" rows="10"></textarea></td>
            </tr>
            <tr>
                <td>主要任务</td>
                <td colspan="3">
                    <p class="text-left">1．向发展对象解释党的纲领、章程，说明党员的条件、义务和权利；</p>
                    <p class="text-left">2．认真了解发展对象的入党动机、政治觉悟、道德品质、工作经历、<br>现实表现等情况，如实向党组织汇报；</p>
                    <p class="text-left">3．指导发展对象填写《中国共产党入党志愿书》，并认真填写自己<br>的意见；</p>
                    <p class="text-left">4．向支部大会负责地介绍发展对象的情况；</p>
                    <p class="text-left">5．发展对象批准为预备党员后，继续对其进行教育帮助。</p>
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
                "B2": "",//姓名
                "E2": "",//性别
                "G2": "",//籍贯
                "B3": "",//出生年月
                "E3": "",//民族
                "G3": "",//入党时间
                "B4": "",//学历学位
                "F4": "",//所在支部名称
                "B5": "",//工作单位及职务
                "B6": ""//个人简介
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
input{
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
</style>