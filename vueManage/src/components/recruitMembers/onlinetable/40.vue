<template>
    <div class="">
<Modal v-model="modal1" title="支部大会会议记录" width="800" @on-ok="ok" @on-cancel="cancel">
    <div class="onlinetable-wrap">
        <h1>支部大会会议记录</h1>
        <div class="page-header text-center">
            <input class="text-center" v-model="table.A3" type="text" :style="{width: '60px',height:'50px'}"/>年
            <input class="text-center" v-model="table.B3" type="text" :style="{width: '60px',height:'50px'}"/>党支部第
            <input class="text-center" v-model="table.C3" type="text" :style="{width: '60px',height:'50px'}"/>次会议
        </div>
        <table class="table1">
            <tr>
                <td width='100'>会议议题</td>
                <td colspan="3"><input v-model="table.B4" type="text"></td>
            </tr>
            <tr>
                <td width='100'>时间</td>
                <td><input v-model="table.B5" type="text"></td>
                <td width='100'>地点</td>
                <td><input v-model="table.D5" type="text"></td>
            </tr>
             <tr>
                <td width='100'>主持人</td>
                <td><input v-model="table.B6" type="text"></td>
                <td width='100'>记录人</td>
                <td><input v-model="table.D6" type="text"></td>
            </tr>
            <tr>
                <td width='100'>入党介绍人</td>
                <td><input v-model="table.B7" type="text"></td>
                <td width='100'>列席人</td>
                <td><input v-model="table.D7" type="text"></td>
            </tr>
            <tr>
                <td width='100'>应到会有表决<br/>权的党员人数</td>
                <td><input v-model="table.B8" type="text"></td>
                <td width='100'>实到会有表决<br/>权的党员人数</td>
                <td><input v-model="table.D8" type="text"></td>
            </tr>
            <tr>
                <td>参会人员姓名：</td>
                <td colspan="3">
                    <textarea v-model="table.A9" cols="30" rows="10"></textarea>
                </td>
            </tr>
            <tr>
                <td>缺席人员姓名及缺席原因：</td>
                <td colspan="3">
                    <textarea v-model="table.A10" cols="30" rows="6"></textarea>
                </td>
            </tr>
            <tr>
                <td colspan="4" style="font-weight:bold;font-size:16px;">会  议  内  容</td>
            </tr>
            <tr>
                <td colspan="4">
                    <textarea v-model="table.A12" cols="30" rows="12"></textarea>
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
                // table1
                "A12": "",//会议内容
                'A3':'年',
                'B3':'党委第',
                'C3':'次会议年',
                "B5": "",//时间
                "B4": "",//会议议题
                "B5": "",//时间
                "B6": "",//主持人
                "B7": "",//入党介绍人
                "B8": "",//应到会有表决权的党员人数
                "A9": "",//参会人员姓名
                "A10": "",//缺席人员姓名及缺席原因
                "D5": "",//地点
                "D6": "",//记录人
                "D7": "",//列席人
                "D8": "",//实到会有表决权的党员人数
            },
            tableDate:{
                yyyy : "",
                mm : "",
                dd : ""
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

.input-date {
    width: 40px;
    text-align: right;
}

.table2 {
    margin-top: -1px;
    margin-bottom: 20px;
}

.table2 input {
    text-align: center;
}

.page-header input {
    border: none;
}
</style>