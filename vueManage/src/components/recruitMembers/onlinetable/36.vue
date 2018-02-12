<template>
    <div>
        <Modal v-model="modal1" title="转为正式党员征求党员意见会议记录" width="800" @on-ok="ok" @on-cancel="cancel">
            <div class="onlinetable-wrap">
                <h1><span>{{table.A1}}</span>转为正式党员征求党员意见会议记录</h1>
                <div class="page-header">党组织名称：<input <input v-model="table.A3" type="text" :style="{width: '500px',height:'50px'}"/></div>
                <table class="table1">
                    <tr>
                        <td width='100'>时间</td>
                        <td><input v-model="table.B4" type="text"></td>
                        <td width='100'>地点</td>
                        <td><input v-model="table.D4" type="text"></td>
                    </tr>
                    <tr>
                        <td width='100'>主持人</td>
                        <td><input v-model="table.B5" type="text"></td>
                        <td width='100'>记录人</td>
                        <td><input v-model="table.D5" type="text"></td>
                    </tr>
                    <tr>
                        <td width='100'>应到人数</td>
                        <td><input v-model="table.B6" type="text"></td>
                        <td width='100'>实到人数</td>
                        <td><input v-model="table.D6" type="text"></td>
                    </tr>
                    <tr>
                        <td>参会人员姓名：</td>
                        <td colspan="5"> <textarea v-model="table.B7" cols="30" rows="10"></textarea></td>
                    </tr>
                     <tr>
                        <td>缺席人员姓名及缺席原因：</td>
                        <td colspan="5"> <textarea v-model="table.A8" cols="30" rows="10"></textarea></td>
                    </tr>
                    <tr>
                        <td colspan="6"  style="font-weight:bold;font-size:16px;">会议内容</td>
                    </tr>
                    <tr>
                        <td colspan="6">
                            <textarea v-model="table.A10" cols="30" rows="10"></textarea>
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
                "A1":"",
                "A3": "",//党组织名称
                "B4": "",//时间
                "B5": "",//主持人
                "B6": "",//应到人数
                "B7": "",//参会人员姓名
                "A8":"",//缺席人员姓名及缺席原因
                "A10": "",//会议内容
                "D4": "",//地点
                "D5": "",//记录人
                "D6": "",//实到人数
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
h1 span{
    font-size: 22px;
    text-align: center;
    display: inline-block;
    min-width: 50px;
    margin: 0 10px;
    height: 100%;
    line-height: inherit;
    border-bottom: 1px solid #000;
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