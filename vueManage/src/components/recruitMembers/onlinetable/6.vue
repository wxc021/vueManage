<template>
<div>
    <Modal
        v-model="modal1"
        title="群团组织推优表"
        width="800"
        @on-ok="ok"
        ok-text="保存"
        @on-cancel="cancel">
        <div class="onlinetable-wrap">
            <h1>群团组织推优表</h1>
            <div class="page-header">群团组织名称：<input v-model="table.A2" type="text" :style="{width: '500px','text-align':'left'}"></div>
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
                    <td class="table-col">推荐对象</td>
                    <td>{{ table.B3 }}</td>
                    <td class="table-col">性别</td>
                    <td>{{ table.D3 }}</td>
                    <td class="table-col">籍贯</td>
                    <td>{{ table.F3 }}</td>
                </tr>
                <tr>
                    <td class="table-col">出生年月</td>
                    <td>{{ table.B4 }}</td>
                    <td class="table-col">民族</td>
                    <td>{{ table.D4}}</td>
                    <td class="table-col">文化程度</td>
                    <td><input v-model="table.F4" type="text"></td>
                </tr>
                <tr>
                    <td>加入群团<br>组织时间</td>
                    <td colspan="2"><input v-model="table.B5" type="text"></td>
                    <td>申请入党<br>时间</td>
                    <td colspan="2">{{ table.E5 }}</td>
                </tr>
                <tr>
                    <td>现任职务<br>及 职 称</td>
                    <td colspan="5"><input v-model="table.B6" type="text"></td>
                </tr>
                <tr>
                    <td>群团组织<br>推荐意见</td>
                    <td colspan="5">
                        <textarea v-model="table.B7" cols="30" rows="10"></textarea>
                        <div class="text-right">负责人签字（盖章）：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;日&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    </td>
                </tr>
                <tr>
                    <td>上级群团<br>组织意见</td>
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
        data () {
            return {
                modal1: true,
                table : {
                    "A2": "",
                    "B3": "",
                    "D3": "",
                    "F3": "",
                    "B4": "",
                    "D4": "",
                    "F4": "",//文化程度
                    "B5": "",//加入群团组织时间
                    "E5": "",//申请入党时间
                    "B6": "",//现任职务及职称
                    "B7": "",//群团组织推荐意见
                    "B9": ""//上级群团组织意见
                },
                name : "群团组织名称"
            }
        },
        computed:{
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
                postData.table_json =  Object.assign({},that.table);
                that.axios({
                    url:'/v1/recruit/save-table-data',
                    method:'post',
                    data:qs.stringify(postData)
                })
                .then(res=>{
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.$Message.success('保存成功');
                        setTimeout(() => { 
                            this.$router.push({
                                name: 'recruitMembers',
                            });
                        },500)
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err=>{
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
            name(val){
                this.table.A2 = "群团组织名称：" + val;
            }
        },
        mounted(){
            this.getDetail();
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
    input{
        text-align: center;
        vertical-align: middle;
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
    .table2 input{
        text-align: center;
    }
    .page-header input{
        border: none;
    }
</style>