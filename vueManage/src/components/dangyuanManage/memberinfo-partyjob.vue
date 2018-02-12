<template>
<div class="memberinfo-partyjob">
    <div class="text-right" v-show="editable">
        <Button v-show="!dragOption.disabled" @click="toggleDrag">取消排序</Button>
        <Button @click="sort" v-show="!dragOption.disabled" type="primary">保存排序</Button>
        <Button @click="toggleDrag" v-show="dragOption.disabled">排序</Button>
    </div>
    <table class="drag-table">
        <colgroup>
            <col width="344"></col>
            <col width="160"></col>
            <col width="160"></col>
            <col width="120"></col>
        </colgroup>
        <thead>
            <tr>
                <th v-for="item in tableCol">{{ item.title }}</th>
            </tr>
        </thead>
        <draggable element="tbody" :options="dragOption" v-model="lists">
            <tr v-for="(item, index) in lists">
                <td>{{ item.full_name }}</td>
                <td>{{ item.duty_id_desc }}</td>
                <td>{{ item.duty_level_desc }}</td>
                <td>{{ item.duty_time }}</td>
            </tr>
        </draggable>
    </table>
</div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
    name : 'memberinfo-partyjob',
    props: {
        viewdata : null,
        editable : {
            type : Boolean,
            default : true
        }
    },
    components: {
        draggable,
    },
    data(){
        return {
            tableCol :[{
                title : '任职党组织',
                key : 'type'      
            },{
                title : '职务名称',
                key : 'edu'      
            },{
                title : '职务级别',
                key : 'date'      
            },{
                title : '批准任职日期'
            }],
            lists:[],
            uid:this.$route.params.uid,
            dragOption : {
                disabled : true
            }
        }
    },
    methods : {
        toggleDrag() {
            this.getList();
            this.dragOption.disabled = !this.dragOption.disabled
        },
        fetchList(){
            let that = this;
            return that.axios({
                method: 'get',
                url: '/v1/duty/list',
                params: {
                    uid: that.uid
                }
            })
        },
        sort(){
            let ids ='';
            this.lists.forEach(function(item) {
                ids+=item.id+',';
            });
            if (ids.trim() == '') {
                return;
            };
            this.axios({
                url:'/v1/duty/sort',
                method:'get',
                params:{
                    ids:ids,
                },
            })
            .then(res=>{
                let needData = res.data;
                if (needData.code == 200) {
                    this.$Message.success('操作成功');
                    this.toggleDrag();
                } else {
                    that.$Message.error(needData.msg);
                }
            })
            .catch(err=>{
                this.$Message.error('网络请求异常');
            })
        },
        getList() {
            this.fetchList().then(res => {
                if (res.data.code == 200) {
                    this.lists = res.data.data
                };
            })
        }
    },
    mounted(){
        this.getList();
    }
}
</script>
<style scoped>
.memberinfo-partyjob{
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