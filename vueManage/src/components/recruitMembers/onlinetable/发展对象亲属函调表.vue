<template>
    <Modal
        v-model="modal1"
        title="发展对象亲属函调表"
        width="800"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="onlinetable-wrap">
            <h1>关于     之（关系）　　 的证明材料</h1>
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
                    <td>姓    名</td>
                    <td>{{ table.B3 }}</td>
                    <td>性    别</td>
                    <td>{{ table.D3 }}</td>
                    <td>出生年月</td>
                    <td>{{ table.F3 }}</td>
                </tr>
                <tr>
                    <td>文化程度</td>
                    <td> {{ table.B4 }}</td>
                    <td>申请入党时间</td>
                    <td> {{ table.D4 }}</td>
                    <td>现任职务</td>
                    <td><input v-model="table.F4" type="text"></td>
                </tr>
                <tr>
                    <td>本人简历</td>
                    <td colspan="5"><textarea v-model="table.B5" cols="30" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td>在重大政治斗争中的现实表现（“文革”、八九政治风波及“法轮功”等）</td>
                    <td colspan="5"><textarea v-model="table.B6" cols="30" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td>其他需要<br>说明的问题</td>
                    <td colspan="5"><textarea v-model="table.B7" cols="30" rows="10"></textarea></td>
                </tr>
                <tr>
                    <td>
                        出证单位<br>意见
                    </td>
                    <td colspan="2">
                        <div class="text-left">党支部意见：</div>
                        <textarea v-model="branch" name="" id="" cols="30" rows="10"></textarea>
                        <div class="text-right"><input v-model="branchDate.yyyy" type="text" :style="{width : '40px', display : 'inline-block'}">年<input v-model="branchDate.mm" type="text" :style="{width : '40px', display : 'inline-block'}">月<input v-model="branchDate.dd" type="text" :style="{width : '40px', display : 'inline-block'}">日</div>
                    </td>
                    <td colspan="3">
                        <div class="text-left">基层党委意见：</div>
                        <textarea v-model="committee" name="" id="" cols="30" rows="10"></textarea>
                        <div class="text-right"><input v-model="committeeDate.yyyy" type="text" :style="{width : '40px', display : 'inline-block'}">年<input v-model="committeeDate.mm" type="text" :style="{width : '40px', display : 'inline-block'}">月<input v-model="committeeDate.dd" type="text" :style="{width : '40px', display : 'inline-block'}">日</div>
                    </td>
                </tr>
            </table>
            <div class="text-right">中共天津市委组织部制</div>
        </div>
    </Modal>
</template>
<script>
    export default {
        data () {
            return {
                modal1: true,
                table : {
                    "B3": "姓名",
                    "D3": "性别",
                    "F3": "出生年月",
                    "B4": "文化程度",
                    "D4": "申请入党时间",
                    "F4": "现任职务",
                    "B5": "本人简历",
                    "B6": "在重大政治斗争中的现实表现（“文革”、八九政治风波及“法轮功”等）",
                    "B7": "其他需要说明的问题",
                    "A9": "",
                    "E9": "",
                    "A10": "",
                    "E10": ""
                },
                branch : "",
                committee : "",
                branchDate : {
                    yyyy : "1991",
                    mm : "11",
                    dd : "11"
                },
                committeeDate : {
                    yyyy : "1991",
                    mm : "11",
                    dd : "11"
                }

            }
        },
        computed:{
            // g2(){
            //     return this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
            // }
        },
        methods: {
            ok () {
                console.log(this.table);
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            }
        },
        watch: {
            branch(val){
                this.table.A9 = '党支部意见：' + val;
            },
            committee(val){
                this.table.E9 = '基层党委意见：' + val;
            },
            "branchDate.yyyy"(val){
                this.table.A10 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
            },
            "branchDate.mm"(val){
                this.table.A10 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
            },
            "branchDate.dd"(val){
                this.table.A10 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
            },
            "committeeDate.yyyy"(val){
                this.table.E10 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
            },
            "committeeDate.mm"(val){
                this.table.E10 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
            },
            "committeeDate.dd"(val){
                this.table.E10 = this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
            }
        }
    }
</script>
<style scoped>
    table{
        width: 100%;
        font-size: 14px;
        border: 1px solid #1c2438;
        border-collapse: collapse;
    }
    table input{
        display: block;
        border: none;
        height: 100%;
        width: 100%;
    }
    table textarea{
        display: block;
        border: none;
        width: 100%;
        /* height: 100%; */
        resize: none;
    }
    td{
        height: 45px;
        border: 1px solid #1c2438;
        text-align: center;
        vertical-align: middle;
    }
    h1{
        font-size: 22px;
        text-align: center;
    }
    input, textarea{
        outline: none;
    }
    div{
        font-size: 14px;
    }
    .input-date{
        width: 40px;
        text-align: right;
    }
    .table2{
        margin-top: -1px;
    }
</style>