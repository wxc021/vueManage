<template>
    <div>
        <Modal
            v-model="modal1"
            title="入党宣誓活动记实表"
            width="800"
            @on-ok="ok"
            ok-text="保存"
            @on-cancel="cancel">
            <div class="onlinetable-wrap">
                <h1>入党宣誓活动记实表</h1>
                <div class="page-header">党组织名称：<input <input v-model="table.A3" type="text" :style="{width: '500px',height:'50px'}"/></div>
                <table class="table1">
                    <tr>
                       <td class="table-col">活动时间</td>
                       <td><input v-model="table.B4" type="text"></td>
                    </tr>
                    <tr>
                       <td class="table-col">活动地点</td>
                       <td><input v-model="table.B5" type="text"></td>
                    </tr>
                    <tr>
                       <td class="table-col">领誓人姓名<br/>及党内职务</td>
                       <td><input v-model="table.B6" type="text"></td>
                    </tr>
                    <tr>
                       <td class="table-col">参加人员</td>
                       <td><textarea v-model="table.B7" cols="30" rows="10"></textarea></td>
                    </tr>
                    <tr>
                       <td class="table-col">活动情况</td>
                       <td><textarea  cols="30" rows="10" placeholder="（粘贴照片处，可打印）"></textarea></td>
                    </tr>
                    <tr>
                       <td class="table-col">备注</td>
                       <td><textarea v-model="table.B9" cols="30" rows="5" placeholder=""></textarea></td>
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
                table:{
                    // table1
                    "A3" : "",//党组织名称
                    "B4" : "",//活动时间
                    "B5" : "",//活动地点
                    "B6" : "",//领誓人姓名及党内职务
                    "B7" : "",//参加人员
                    // "B8" : "",//活动情况
                    "B9" : "",//备　注
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
                let that = this;
                let qs = require("qs");
                this.axios({
                            method: 'post',
                            url: '/v1/recruit/save-table-data',
                            data: qs.stringify({
                                uid: that.$route.query.uid,
                                template_id: that.$route.params.id,
                                table_json: that.table,
                            }),
                        })
                        .then(res => {
                    let needData = res.data;
                if (needData.code == '200') {
                    this.$Modal.remove()
                    setTimeout(function (args) {
                        console.log(that);
                        that.$router.push({name: 'recruitMembers'});
                    }, 30)
                    this.$Message.success('提交成功');
                } else {
                    setTimeout(() => {
                        that.loading = false;
                    that.$nextTick(() => {
                        that.loading = true;
                })
                    ;
                },
                    1000
                )
                    ;
                    this.$Message.error(needData.msg);
                }
            })
            .
                catch(err => {
                    this.$Message.error('网络请求失败');
            })

            },
            cancel () {
                let that = this;
                this.$Modal.remove()
                setTimeout(function (args) {
                    that.$router.push({name: 'recruitMembers'});
                }, 30)
            },
            //获取详情数据
            getDetail(){
                let that = this;
                let qs = require("qs");
                this.axios({
                            method: 'post',
                            url: '/v1/recruit/get-table-data',
                            data: qs.stringify({
                                uid: that.$route.query.uid,
                                template_id: that.$route.params.id,
                                opt: '1'
                            }),
                        })
                        .then(res => {
                    let needData = res.data;
                if (needData.code == '200') {
                    let baseInfotData = needData.data.baseinfo;
                    let contentData = needData.data.content;
                    for (let key in baseInfotData) {
                        that.table[key] = baseInfotData[key];
                    }
                    for (let key in contentData) {
                        that.table[key] = contentData[key];
                    }
                } else {
                    this.$Message.error(needData.msg);
                }
            })
            .
                catch(err => {
                    this.$Message.error('网络请求失败');
            })
            }

        },
        watch: {

        },
        mounted(){
            this.getDetail()
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
        height: 100%;
        resize: none;
    }
    td{
        height: 45px;
        border: 1px solid #1c2438;
        text-align: center;
        vertical-align: middle;
    }
    input{
        text-indent: 30px;
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
        margin-bottom: 20px;
    }
    .table2 input{
        text-align: center;
    }
    .page-header input{
        border: none;
    }
</style>