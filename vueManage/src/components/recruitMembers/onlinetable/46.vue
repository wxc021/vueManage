<template>
<Modal v-model="modal1" title="发展党员工作信访情况记录" width="800" @on-ok="ok" @on-cancel="cancel">
    <div class="onlinetable-wrap">
        <h1>发展党员工作信访情况记录</h1>
        <table class="table1">
            <tr>
                <td width='100'>信访人姓名</td>
                <td><input v-model="table.C3" type="text"></td>
                <td width='100'>信访人时间</td>
                <td><input v-model="table.E3" type="text"></td>
            </tr>
            <tr>
                <td width='100'>信访人形式</td>
                <td>来访/来电/来信</td>
                <td width='100'>联系电话</td>
                <td><input v-model="table.E4" type="text"></td>
            </tr>
            <tr>
                <td width='100'>信<br><br>访<br><br>主<br><br>要<br><br>内<br><br>容</td>
                <td colspan="3">
                    <textarea v-model="table.B5" cols="30" rows="15"></textarea>
                </td>
            </tr>
            <tr>
                <td width='100'>查<br><br>核<br><br>处<br><br>理<br><br>情<br><br>况</td>
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
</template>

<script>
export default {
    data() {
        return {
            modal1: true,
            table: {
                // table
                "C3": "信访人姓名",
                "B5": "信访主要内容",
                "B6": "查核处理情况",
                "B7": "备注",
                "E3": "信访时间",
                "E4": "联系电话",
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
            console.log(this.table);
            this.$Message.info('点击了确定');
        },
        cancel() {
            this.$Message.info('点击了取消');
        }
    },
    watch: {

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