<template>
<div class="memberinfo-rewardinfo">
    <div class="text-right" v-show="editable">
        <Button @click="toggleDrag" v-show="!dragOption.disabled" type="ghost">完成</Button>
        <Button v-show="dragOption.disabled" type="primary" @click="add">新增</Button>
    </div>
    <table class="drag-table">
        <colgroup>
            <col width="120"></col>
            <col width="120"></col>
            <col width="120"></col>
            <col></col>
        </colgroup>
        <thead>
            <tr>
                <th v-for="item in tableCol">{{ item.title }}</th>
            </tr>
        </thead>
        <draggable element="tbody" :options="dragOption" v-model="lists">
            <tr v-for="(item, index) in lists">
                <td>{{ item.name }}</td>
                <td>{{ item.reason }}</td>
                <td>{{ item.approval_name }}</td>
                <td>{{ item.check_level }}</td>
                <td>{{ item.approval_time }}</td>
                <td>
                    <Button :disabled="!dragOption.disabled" style="padding: 6px;" type="text" @click="edit(item)">编辑</Button>
                    <Button @click="delItem(item, index)" :disabled="!dragOption.disabled" style="padding: 6px;" type="text">删除</Button>
                </td>
            </tr>
        </draggable>
    </table>
    <component v-bind:is="modal"  @add='refurbish'></component>
</div>
</template>
<script>
import draggable from 'vuedraggable'
import add from '../pop/partymember/memberinfo-reward-add.vue';
export default {
    name : 'memberinfo-rewardinfo',
    props: {
        viewdata : null,
        editable : {
            type : Boolean,
            default : true
        }
    },
    components: {
        draggable,
        'memberinfo-reward-add': add
    },
    methods:{
        add () {
            this.$router.push({ 
                // name: 'applicantinfo', 
                params: { 
                    uid: this.$route.params.uid
                },
                query: { 
                    tab: this.$route.query.tab,
                    model: 'memberinfo-reward-add'
                }
            });
        },
    },
    data(){
        return {
            tableCol :[{
                title : '奖惩名称',
                key : 'type'      
            },{
                title : '奖惩原因',
                key : 'edu'      
            },{
                title : '批准组织',
                key : 'date'      
            },{
                title : '批准组织级别',
                key : 'date'      
            },{
                title : '批准日期',
                key : 'allow'      
            },{
                title : '操作'
            }],
            lists:[],
            modal : null,
            dragOption : {
                disabled : true
            },
        }
    },
    methods : {
        fetchList(){
            return this.axios({
                method: 'get',
                url: '/v1/punish/list',
                params: {
                    uid: this.$route.params.uid
                }
            })
        },
        refurbish(){
            this.fetchList().then(res => {
                if (res.data.code == 200) {
                    this.lists = res.data.data
                };
            });
            if (this.$route.query.model) {
                this.modal = this.$route.query.model
            };
        },
        toggleDrag() {
            this.dragOption.disabled = !this.dragOption.disabled
        },
        delItem(rowData, index){

            // TODO 删除请求
            let idx = index;
            let _this = this;
            let data = rowData;
            this.$Modal.confirm({
                title: '警告',
                content: '<p>确定要删除该记录吗？</p>',
                onOk: () => {
                    var that = this;
                    let qs = require('qs')
                    that.axios({
                        url:'/v1/punish/remove',
                        method:'post',
                        data:qs.stringify({
                            uid:that.$route.params.uid,
                            id:rowData.id
                        })
                    })
                    .then(res=>{
                        let needData = res.data;
                        if (needData.code == 200) {
                            this.lists.splice(index, 1);
                            this.$Message.success('操作成功');
                        } else {
                              that.Message.error(needData.msg);
                        }
                    })
                    .catch(err=>{
                        this.Message.error('网络请求异常');
                    })
                   
                },
                onCancel: () => {
                   // this.$Message.info('操作取消');
                }
            });
        },

        add (){
            this.$router.push({ 
                // name: 'applicantinfo', 
                params: { 
                    uid: this.$route.params.uid
                },
                query: { 
                    tab: this.$route.query.tab,
                    model: 'memberinfo-reward-add'
                }
            });
        },
        edit (item){
             this.$router.push({ 
                // name: 'applicantinfo', 
                params: { 
                    uid: this.$route.params.uid,
                    item:item,
                },
                query: { 
                    tab: this.$route.query.tab,
                    model: 'memberinfo-reward-add'
                }
            });
        },
    },
    mounted(){
        this.fetchList().then(res => {
            if (res.data.code == 200) {
                this.lists = res.data.data
            };
        });
        if (this.$route.query.model) {
            this.modal = this.$route.query.model
        };
    },
    watch: {
        '$route' (to, from) {
            if (to.query.model) {
                this.modal = to.query.model
            }
            else {
                this.modal = null;
            }
        }
    }
}
</script>
<style scoped>
.memberinfo-rewardinfo{
    height: 100%;
    padding: 8px;
}
.drag-table{margin-top: 8px; border-collapse: collapse;text-align: center;width: 100%;color: #333;font-family: "微软雅黑"; border: 1px solid #e2e2e2;}
.drag-table thead{line-height: 40px;background: #F8F8F9;font-weight: normal;}
.drag-table thead {border-bottom: 1px solid #e9eaec;border-top: 1px solid #e9eaec;}
.drag-table thead th{font-weight: bold;}
.drag-table tbody tr{line-height: 21px;height: 48px;border-bottom: 1px solid #e9eaec;;color: #333;box-sizing: border-box}
.drag-table tbody tr:hover{background-color: #EBF7FF}
.drag-table tbody tr.drag:hover{background-color: #eee;cursor: move}
.drag-table tbody td,.drag-table thead th{ border-right:1px solid #e9eaec;}
.drag-table tbody td.ready{color: #d73826}
.drag-table tbody td.out{color: #f07100}
.drag-table tbody td.in{color: #008df0}
</style>