<template>
    <div class="">
<Modal v-model="modal1" title="预备党员转正谈话记实表" width="800" @on-ok="ok" @on-cancel="cancel">
    <div class="onlinetable-wrap">
        <h1>预备党员转正谈话记实表</h1>
        <table class="table1">
            <tr>
                <td width='100'>预备党员<br>姓    名</td>
                <td><input v-model="table.C3" readonly type="text"></td>
                <td width='100'>是    否<br>按期转正</td>
                <td><input v-model="table.E3" type="text"></td>
            </tr>
            <tr>
                <td width='100'>谈话人<br>姓    名</td>
                <td><input v-model="table.C4" type="text"></td>
                <td width='100'>谈话人<br>职    务</td>
                <td><input v-model="table.E4" type="text"></td>
            </tr>
            <tr>
                <td width='100'>谈话时间</td>
                <td><input v-model="table.C5" type="text"></td>
                <td width='100'>谈话地点</td>
                <td><input v-model="table.E5" type="text"></td>
            </tr>
           
            <tr>
                <td width='100'>谈<br><br>话<br><br>内<br><br>容</td>
                <td colspan="3">
                    <textarea v-model="table.B6" cols="30" rows="15"></textarea>
                </td>
            </tr>
            <tr>
                <td>备注</td>
                <td colspan="3">
                    <textarea v-model="table.B7" cols="30" rows="4"></textarea>
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
                // table
                "C3": "",//预备党员姓名
                "C4": "",//谈话人姓名
                "C5": "",//谈话时间
                "B6": "",//谈话内容
                "B7": "",//备注
                "E3": "",//是否按期转正
                "E4": "",//谈话人职务
                "E5": "",//谈话地点
            },
            tableDate:{
                yyyy : "",//1991
                mm : "",//02
                dd : ""//01
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