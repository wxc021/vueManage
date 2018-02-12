<template>
<div class="memberinfo-democratic">
    <!-- <Table  class="drag-table" ref="memberinfodemocratictable" :highlight-row="true" :style="{'marginTop':'8px'}" border :columns="tableCol" :data="lists"></Table> -->

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
                <td>{{ item.start_time }}</td>
                <td>{{ item.end_time }}</td>
                <td>{{ item.result }}</td>
                <td>{{ item.desc }}</td>
                <td>{{ item.reason }}</td>   
            </tr>
        </draggable>
    </table>




</div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
    name : 'memberinfo-democratic',
    props: {
        viewdata : null
    },
    components:{
        draggable
    },
    data(){
        return {
            dragOption : {
                disabled : true
            },
            tableCol :[{
                title : '开始日期',
                key : 'start_time'      
            },{
                title : '结束日期',
                key : 'end_time'      
            },{
                title : '评议结果',
                key : 'result'      
            },{
                title : '评议奖惩情况',
                key : 'desc'
            },{
                title : '评议奖惩原因',
                key : 'reason'
            }],
            currentData: null,
            lists:[]
        }
    },
    methods: {
        fetchList(uid){
            return this.axios({
                method: 'get',
                url: '/v1/discuss/list',
                params: {
                    uid: uid
                }
            })
        }
    },
    watch:{
        viewdata(newVal, oldVal){
            this.currentData = newVal
        }
    },
    mounted(){
        let _this = this;
        this.currentData = this.viewdata;
        let uid = this.$route.params.uid
        this.fetchList(uid).then(res => {
            if (res.data.code == 200) {
                _this.lists = res.data.data
            };
        })
        .catch(err => {
            this.$Message.error('网络请求异常');
        });
    }
}
</script>
<style scoped>
.memberinfo-democratic{
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