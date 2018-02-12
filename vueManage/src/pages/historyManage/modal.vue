<template>
    <div class="history-modal">
        <Modal
            v-model="modal1"
            :title=title
            @on-ok="ok"
            @on-cancel="cancel">
            <p>{{content}}</p>
        </Modal>
    </div>
</template>
<script>
    export default {
        name:'history-modal',
        data () {
            return {
                modal1 : true,
                title : this.$route.query.type == 1 ? '还原':'彻底删除',
                content : this.$route.query.type == 1 ? '是否要还原' + this.$route.query.currentRow.real_name + '至原组织？' : '是否要彻底删除党员' + this.$route.query.currentRow.real_name + '？',
                uid : this.$route.query.currentRow.id,
                name : this.$route.query.currentRow.real_name,
            }
        },
        watch:{
            $route(to,form){

            }
        },
        mounted(){
            
        },
        methods: {
            ok () {
                this.$Message.success('操作成功');
                this.$router.push('/historyManage');
            },
            cancel () {
                this.$router.push('/historyManage');
            }
        }
    }
</script>
