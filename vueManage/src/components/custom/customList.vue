<template>
    <div class="app-main-list start-box box-orient" :style="{'width':'100%','height':'100%'}">
        <div class="custom-top start-box box-align box-pack" style="border-bottom:1px solid #e9eaec;">
            <span>报表设计</span>
            <div>
                <Button style="margin-right:10px;" @click='openSort'>调整排序</Button>
                <Button @click="add" type="primary" class="mr10">新增</Button>  
            </div> 
        </div>
        <Row v-show="isEdit" class="custom-top-sort h40">
            <span>上下移动列调整位置</span>
            <Button @click="saveSort" class="trans" style="color: #f04134;" type="text" size="small">保存</Button>
            <Button @click="cancelSort" class="trans revoke" type="text" size="small">撤销</Button>
        </Row>
        <Row style="overflow: auto;" class="box-flex">
            <table>
                <thead>
                <tr>
                    <th>名称</th>
                    <th style="width: 190px;">操作</th>
                </tr>
                </thead>
                <draggable :list="listData" :move="getdata" :element="'tbody'">
                    <tr :class="{drag:item.isDrag}" @click.capture="clickItem(item,index)" v-for="(item,index) in listData" :key="item.id" :ondragstart="isDragstart">
                        <td>{{item.title}}</td>
                        <td >
                            <Button type="text" @click.native.stop="remove(item)" style="background:transparent;color: #666;">
                                <Icon style="font-size: 20px;" type="ios-trash-outline"></Icon>
                                删除
                            </Button>
                            <i-switch  v-model="item.switch1" size="small" @on-change="changeSwitch(item)"></i-switch>
                            <label v-show="item.switch1===true" style="color: #d73826">已启用</label>
                            <label v-show="item.switch1===false">未启用</label>
                        </td>
                    </tr>
                </draggable>
            </table>

        </Row>
    </div>
</template>
<script type="text/ecmascript-6">
    import draggable from 'vuedraggable'
    export default {
        name: 'custom',
        data() {
            return {
                isEdit: false,//是否显示保存排序按钮
                isDragstart:'return false',
                listData: [
                    {id: '1', title: '一表附表一：本年度恢复党籍单', switch1: true,isDrag:true},
                    {id: '2', title: '一表附表二：本年度停止党籍单...', switch1: true,isDrag:false},
                    {id: '3', title: '二表：党员基本情况', switch1: false,isDrag:false},
                    {id: '4', title: '三表：党员入党时间情况', switch1: false,isDrag:false},
                ]
            }
        },
        computed: {},
        watch: {
            '$route'(to,from) {
                from.name=='addCustom' && this.getList();
            }
        },
        components: {
            draggable
        },
        methods: {
            getdata(data){
               /* console.log(data.draggedContext.element.id);
                let moveId = data.draggedContext.element.id;
                this.listData.forEach((item,index)=>{
                    item.isDrag =false;
                    if(index==moveId){
                        item.isDrag =true;
                    }
                })*/

            },
            changeSwitch(item){
                if(item.switch1===true){
                    this.axios.get('v1/statement/enable',{params: {id: item.id}});
                }else if(item.switch1===false){
                    this.axios.get('v1/statement/disable',{params: {id: item.id}});
                }
            },
            //调整排序
            openSort(){
                this.isEdit=true;
                this.isDragstart='';
            },
            //保存
            saveSort(){
                this.isEdit = false;
                let ids = [];
                this.listData.forEach(item=> {
                    ids.push(item.id);
                });
                console.log(ids);
                let postIds = ids.join(',');
                var that = this;
                let qs = require('qs');
                that.axios({
                    url:'v1/statement/order',
                    method:'post',
                    data:qs.stringify({ids: postIds})
                })
                .then(res=> {
                    let needData = res.data;
                    if(needData.code=='200'){
                        this.$Message.success('保存成功')
                    }else {
                        this.$Message.info('保存失败')
                    }
                })
                .catch(err=> {
                    this.Message.error('网络请求异常');
                })

            },
            //撤销
            cancelSort(){
                this.isEdit=false;
                this.isDragstart='return false';
                this.isDragstart='return false';
            },
           //新增跳转路由
            add(){
                this.$router.push({name:'addCustom'})
            },
            remove(item){
                console.log(item);
                this.$Modal.confirm({
                    title: '警告',
                    content: '<p>确定要删除该报表吗？</p>',
                    onOk: () => {
                        var that = this;
                        let qs = require('qs');
                        let id = item.id;
                        that.axios({
                            url:'v1/statement/del',
                            method:'get',
                            params:{id:id}
                        })
                        .then(res=> {
                            let needData = res.data;
                            if (needData.code == 200) {
                                this.$Message.success('操作成功');
                                this.getList();
                            } else {
                                that.Message.error(needData.msg);
                            }
                        })
                        .catch(err=> {
                            this.Message.error('网络请求异常');
                        })
                    },
                    onCancel: () => {
                        // this.$Message.info('操作取消');
                    }
                });
            },
            clickItem(item,index){
                if (event.toElement.tagName!=='SPAN'){
                    this.listData.forEach((item,idx)=>{
                        item.isDrag =false;
                        if(idx==index){
                            item.isDrag =true;
                        }
                    })
                    this.$emit('getId', item.id);
                    this.$router.push({name:'custom',params:{id:item.id}})

                }

            },
            getList(){
                let that = this;
                this.axios({
                    method:'get',
                    url:'/v1/statement/list'
                })
                .then(res=>{
                    let needData = res.data;
                    if(needData.code=='200'){
                        needData.data.forEach(item=>{
                            item.isDrag=false;
                            if(item.enabled=='0'){
                                item.switch1=false;
                            }else{
                            item.switch1=true;
                            }
                        });
                        this.listData = needData.data;
                        this.listData.forEach(item => {
                                item.isDrag = false;
                            if (item.id == that.$route.params.id) {
                                item.isDrag = true;
                            }
                        })

                    }else{
                        this.$Message.error(needData.msg)
                    }
                })
                .catch(err=>{
                    this.$Message.error('网络异常');
                })
            }
        },
        created() {

        },
        mounted() {
            this.getList();
        }
    };


</script>
<style scoped lang='less' type="text/less">
    .custom-top{
        width: 100%;
        height:50px;
        overflow: hidden;
        background: #f9f9f9;
        display:flex;
        span{
            color: #5b5b5b;
            line-height: 50px;
            padding-left: 23px;
        }
        .ml267{
            margin-left: 230px;
        }
        .ml10{
            margin-left: 10px;
        }
        .mr10{
            margin-right: 10px;
        }
        .h30{
            height: 32px;
            margin-top: 8px;
        }
        .h40{
            height: 40px;
            background: #fff5f2;
        }
    }
    .custom-top-sort{
        width: 100%;
        height: 40px;
        line-height: 40px;  
        background: #fff5f2;
        display: flex;
        span{
            padding-left: 14px;
            line-height: 40px;
            margin-right: 225px;
        }
        .trans{
            background: transparent;
        }
        .revoke:hover{
            color: #495060;
        }

    }
    table {
        border-collapse: collapse;
        text-align: center;
        width: 100%;
        color: #333;
        font-family: "微软雅黑";
        border: 1px solid #e2e2e2;
        height:calc(100% - 100px);
        overflow-y: auto;
    }

    table thead {
        line-height: 40px;
        background: #F8F8F9;
        font-weight: normal;
    }

    table thead {
        border-bottom: 1px solid #e9eaec;
        border-top: 1px solid #e9eaec;
    }

    table thead th {
        font-weight: bold;
        background: #f2f2f2;
    }

    table tbody tr {
        line-height: 48px;
        height: 48px;
        border-bottom: 1px solid #e9eaec;;
        color: #333;
        box-sizing: border-box
    }

    table tbody tr:hover {
        cursor: pointer;
    }

    /*table tbody tr.drag:hover{background-color: #eee;cursor: move}*/
    table tbody tr.drag {
        background-color: #eee
    }

    table tbody td, table thead th {
        border-right: 1px solid #e9eaec;
    }

    table tbody td span {
        display: inline-block;
        margin-right: 10px;
        cursor: pointer
    }

    table tbody td span:hover {
        color: #d73826
    }
</style>