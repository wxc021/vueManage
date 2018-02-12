<template>
    <div class="layout" :style="{'width':'100%','height':'100%'}">
        <!-- 头部 -->
        <top></top>
        <Row type="flex" class="setHeight">
            <!-- 侧边栏树结构 -->
            <i-col span="5" class="layout-menu-left">
                <Slide ref="slide" url="/v1/trees/search-list" :currentnode="nodeSelect" :openitem="openitem" :openlist="nodeOpen" @slideDown="slideDown" @reflashList="reflashList"></Slide>
            </i-col>
            <i-col span="19" class="layout-right-container">
                <!-- 工具栏 -->
                <div class="layout-breadcrumb">
                    <Button type="ghost" style="background: #fff" @click="addnew">新增</Button>
                    <Button type="ghost" style="background: #fff" @click="resetpwd">重置密码</Button>
                    <Button :disabled="ableBtn.disable" style="background: #fff" type="ghost" @click="ableadmin">{{ ableBtn.text }}</Button>
                    <Button type="ghost" style="background: #fff" @click="deladmin">删除</Button>
                </div>
                <!-- /end 工具栏 -->
                <!-- 表单主结构 -->
                <div class="layout-content" style="position:realtive;">
                    <div class="content-padding">
                        <Table ref="membertable" :highlight-row="true" @on-row-click="onTableSelect" border :columns="tableModel" :data="lists"></Table>
                    </div>
                </div>
                <!-- /end 表单主结构 -->
            </i-col>
        </Row>
        <router-view name="modal"></router-view>
    </div>
</template>
<script>
    import top from '@/components/top.vue'
    import Slide from '@/components/slide.vue'

    export default {
        name: 'applicant-view',
        data() {
            return {
                // tableDropVisible: false,    // 控制"列表设置的显示隐藏"
                // soltname: 'mainContent',
                openitem: [],
                // searchString: '',
                //表单header
                tableModel: [
                    {
                        title: '姓名',
                        key: 'real_name',
                        sortable: true
                    },
                    {
                        title: '身份证号',
                        key: 'idcard',
                        sortable: true,
                    },
                    {
                        title: '手机号码',
                        key: 'mobile',
                        sortable: true,
                    },
                    {
                        title: '账号状态',
                        key: 'status',
                        sortable: true,
                    },
                    {
                        title: '最后操作时间',
                        key: 'operate_time',
                        sortable: true,
                    }
                ],
                //表单数据
                lists: [],
                currentNode : null,         // 选中的节点
                nodeOpen : [],              // 打开树形的
                nodeSelect : '',            // 选中node的节点
                asideTitle : '',            // 侧栏标题
                asideViewName : null,       // 侧栏组件名称
                asideViewData: null,         // 向侧栏传递的数据
                currentRow : null,           // 当前表格所选择的列
                ableBtn : {
                    type : 0,    // 启用禁用按钮的状态： 1启用 0禁用
                    disable : true,
                    text : '禁用'
                }
            }
        },
        computed: {

        },
        components: {
            top,
            Slide,
        },
        methods: {
            // toggleTableCfg(){
            //     this.tableDropVisible = !this.tableDropVisible;
            // },
            toggleSlide(status){
                if (status) {
                    this.rightSlide = status;
                    return
                };
                this.rightSlide = !this.rightSlide;
                this.$router.push({name : 'applicant'});
            },
            toggleModal(){
                this.modal = !this.modal;
                this.$router.push({name : 'applicant'});
            },
            openAside(){
                this.rightSlide = false
            },
            fetchData(id){
                return this.axios({
                    method: 'get',
                    url: '/v1/auth-manage/list',
                    params: {
                        dept_id: id,
                    }
                })
            },
            // 这个不是刷新，是点击左侧树的事件
            reflashList(item, isfresh){
                let _this = this;
                this.currentNode = item;
                // this.searchString = '';
                this.currentRow = null; // 清空当前所选的表格行
                // 不是党小组
                // let nodeType = parseInt(item.data.type_icon);
                this.$router.push({
                    name : 'adminconfiglist',
                    params : {
                        dept : item.id
                    }
                });
            },
            slideDown(){
                let _this = this;
                this.nodeSelect = '';
                this.$nextTick(function() {
                    _this.nodeSelect = this.nodeOpen[this.nodeOpen.length-1];
                });
            },
            onTableSelect(data){
                this.currentRow = data;
                console.log('route:' ,this.$route, '\n' ,'tableselect', data);
            },
            reloadtable(){
                let _this = this;
                this.ableBtn.disable = true;
                this.fetchData(this.$route.params.dept)
                .then(res => {
                    if (res.data.code == 200) {
                        _this.lists = res.data.data
                    };
                })
                .catch(error => {
                    console.log(error)
                });
            },
            resetpwd(){
                let _this = this;
                if(this.currentRow){
                    this.$Modal.confirm({
                        title: '重置密码',
                        content : '确定要重置该管理员的密码？',
                        onOk: () => {
                            this.axios({
                                method: 'get',
                                url: '/v1/auth-manage/reset-passwd',
                                params: {
                                    id: this.currentRow.id,
                                }
                            })
                            .then(res => {
                                if (res.data.code == 200) {
                                     _this.$Message.success('操作成功, 重置后的密码为该用户身份证后6位');
                                }
                                else {
                                    _this.$Message.error(res.data.msg);
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            });
                        }
                    })
                }
                else {
                    this.$Message.info('请选择一个管理员');
                }
            },
            ableadmin(){
                let _this = this;
                if(this.currentRow){
                    this.$Modal.confirm({
                        title: _this.ableBtn.text +'管理员',
                        content : '确定要' +  _this.ableBtn.text + '该管理员吗？',
                        onOk : () => {
                            this.axios({
                                method: 'get',
                                url: '/v1/auth-manage/status',
                                params: {
                                    id: _this.currentRow.id,
                                    status: _this.ableBtn.type
                                }
                            })
                            .then(res => {
                                if (res.data.code == 200) {
                                     _this.$Message.success('操作成功');
                                     _this.reloadtable();
                                }
                                else {
                                    _this.$Message.error(res.data.msg);
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            });
                        }
                    })
                }
                else {
                    this.$Message.info('请选择一个管理员');
                }
            },
            deladmin(){
                let _this = this;
                if(this.currentRow){
                    this.$Modal.confirm({
                        title: '删除管理员',
                        content : '确定要删除该管理员吗？',
                        onOk : () => {
                            this.axios({
                                method: 'get',
                                url: '/v1/auth-manage/del',
                                params: {
                                    id: this.currentRow.id,
                                }
                            })
                            .then(res => {
                                if (res.data.code == 200) {
                                     _this.$Message.success('删除成功');
                                     _this.reloadtable();
                                }
                                else {
                                    _this.$Message.error(res.data.msg);
                                }
                            })
                            .catch(error => {
                                console.log(error)
                            });
                        }
                    })
                }
                else {
                    this.$Message.info('请选择一个管理员');
                }
            },
            parseRouter(){
                let _this = this;
                let routerName = this.$route.name;
                let param = this.$route.params;
                switch (routerName) {
                    case 'adminconfiglist':
                        console.log('route match:', 'adminconfiglist')
                        this.fetchData(param.dept, true).then(res => {
                            if (res.data.code == 200) {
                                _this.lists = res.data.data
                            };
                        })
                        .catch(err => {
                            console.log(err);
                            this.$Message.error('网络请求异常');
                        });
                        break;
                    default:

                        break;
                }
            },
            addnew(){
                if (this.currentNode) {
                    this.$router.push({
                        name : 'adminconfigadd',
                        params : {
                            dept : this.$route.params.dept
                        }
                    })
                }
                else {
                    this.$Message.info('请选择一个党组织');
                }
            }
        },
        mounted() {
            this.$on('toggleSlide', function(status){
                this.rightSlide = status
            });
            this.$on('refresh', function(){
                this.reloadtable();
            });
            this.parseRouter();
        },
        watch :{
            rightSlide(val){
                console.log(val)
            },
            currentRow(val){
                if (val == null) {
                    this.ableBtn.disable = true;
                }
                else {
                    this.ableBtn.disable = false;
                    if (val.status == "禁用") {
                        this.ableBtn.text = "启用";
                        this.ableBtn.type = 1;
                    }
                    else{
                        this.ableBtn.text = "禁用";
                        this.ableBtn.type = 0;
                    }
                }
            },
            '$route' (to, from) {
                // 对路由变化作出响应...
                let routerName = to.name;
                let param = to.params;
                let _this = this;
                switch (routerName) {
                    case 'adminconfiglist':
                        console.log('route match:', 'applicantlist')
                        this.fetchData(param.dept, true).then(res => {
                            if (res.data.code == 200) {
                                _this.lists = res.data.data
                            };
                        })
                        .catch(err => {
                            console.log(err);
                            this.$Message.error('网络请求异常');
                        });
                        break;
                    default:
                      // statements_def
                        break;
                }
            }
        }
    }
</script>
<style scoped>
    .layout{
        position: relative;
    }
    .table-fliter-item{
        padding-left: 10px;
    }
    .setHeight{
        overflow: auto;
    }
    .layout-right-container{
        position: relative;
        height: 100%;
        overflow: auto;
    }
    .layout-content{
        position: absolute;
        top: 42px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }
</style>