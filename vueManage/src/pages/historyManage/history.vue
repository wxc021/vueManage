<template>
    <div class="history-view" :style="{'width':'100%','height':'100%'}">
        <!-- 头部 -->
        <top @click="closeDefault"></top>
        <Row type="flex" class="setHeight" @click="closeDefault">
            <!-- 侧边栏树结构 -->
            <i-col span="5" class="history-aside layout-menu-left">
                <Slide ref="slide" url="/v1/trees/history-members-trees" :currentnode="nodeSelect" :openitem="openitem" :openlist="nodeOpen" @slideDown="slideDown" @reflashList="reflashList"></Slide>
            </i-col>
            <i-col span="19">
                <!-- 工具栏 -->
                <!-- <div class="layout-breadcrumb">
                    <optNav :currentRow="currentRow"></optNav>
                </div> -->
                <!-- -->
                <!-- 表单主结构 -->
                <div class="layout-content history-manage" style="position:realtive;">
                    <div class="content-padding"  @click="closeDefault">
                        <!-- 搜索和过滤 -->
                        <div class="search-filter start-box box-align">
                            <Button name="reset" type="ghost" :style="{'background':'#fff', 'marginRight':'4px'}" @click="restoreMember">还原</Button> 
                            <Button name="remove" type="ghost" :style="{'background':'#fff','marginRight':'4px'}" @click="deleteTrueMember">彻底删除</Button>
                            <div class="search-content start-box box-align box-flex">
                                <Input v-model="searchString" placeholder="姓名/身份证/手机" @on-keyup.enter="search" :style="{'display':'block', 'width':'35%','marginRight':'10px'}"></Input>
                                <Button type="primary" @click="search">查询</Button>
                            </div>
                            <div class="set-config">
                                <!-- <Button type="ghost" :style="{'background':'#fff'}">打印</Button> -->
                                <Button @click="refreshTable" type="ghost" :style="{'background':'#fff'}">刷新</Button>
                                <!-- <Button type="ghost" :style="{'background':'#fff'}">导出excel</Button> -->
                            </div>
                        </div>
                        <Table ref="membertable" :highlight-row="true" @on-row-click="onTableSelect" :no-data-text="tableTxt" :style="{'marginTop':'20px'}" border :columns="tableCol" :data="lists"></Table>
                    </div>
                </div>
            </i-col>
        </Row>
        <right-slide ref="rightslide" :editable="editable" :title="asideTitle" :show="rightSlide" :viewname="asideViewName"></right-slide>
    </div>
</template>
<script>
    import top from '@/components/top.vue'
    import Slide from '@/components/slide.vue'
    import rightSlide from '@/pages/historyManage/aside.vue'
    export default {
        name: 'history-view',
        data() {
            return {
                tableDropVisible: false,    // 控制"列表设置的显示隐藏"
                soltname: 'mainContent',
                openitem: [],
                searchString: '',
                //表单header
                tableModel: [
                    {
                        title: '选择',
                        align: 'center',
                        width: 65,
                        isshow: true,
                        key: 'select',
                        render: (h, params) => {
                            return h('div', {
                                class: {
                                    'radio-outer': true
                                },
                                nativeOn: {
                                    click() {
                                        event.stopPropagation();
                                    }
                                },
                            },
                            [
                                h('Radio', {
                                    class: {
                                        'radio-check': true
                                    },
                                    props: {
                                        size: 'large',
                                        value: this.radiosObj['items'+params.row.id]
                                    },
                                    on: {
                                        'on-change': (val) => {
                                            event.stopPropagation()
                                            this.changeRadio(val, params);
                                        }
                                    },
                                    nativeOn: {
                                        click() {
                                            event.stopPropagation()
                                        }
                                    },
                                }),
                            ]);
                        }
                    },
                    {
                        title: '姓名',
                        key: 'spell_name',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        width: 100,
                        render: (h, params) => {
                            return h('div', params.row.real_name)
                        }
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        //width:80
                    },
                    {
                        title: '身份证号',
                        key: 'idcard',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        width: 180
                    },
                    {
                        title: '手机号码',
                        key: 'mobile',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        width: 140
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        //width:80
                    },
                    {
                        title: '民族',
                        key: 'nation',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        //width:150
                    },
                    {
                        title: '减少方式',
                        key: 'decrease_opt',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        //width: 150
                    },
                    {
                        title: '操作人',
                        key: 'create_name',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        //width: 120
                    },
                    {
                        title: '减少时间',
                        key: 'createdt',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        width: 200
                    }
                ],
                //表单数据
                lists: [],
                radiosObj: {},
                rightSlide : false,
                rightSlideTitle : '',
                currentNode : null,         // 选中的节点
                tempLists : null,           // 临时存储的数据
                nodeOpen : [],              // 打开树形的
                nodeSelect : '',            // 选中node的节点
                currentRow : null,           // 当前表格所选择的列
                radioSelect: null,
                rightSlide : false,
                asideTitle : undefined,            // 侧栏标题
                asideViewName : null,
                editable : true             // 侧栏是否可编辑
            }
        },
        computed: {
            tableCol() {
                return this.tableModel.filter((item) => {
                    return item.isshow
                })
            },
            tableFilter:{   //['姓名', '身份证号' ...] 
                get(){
                    return this.tableCol.map((item) => {
                        return item.title
                    })
                },
                set(newValue){
                    this.tableModel.forEach((item) => {
                        if (newValue.indexOf( item.title ) != -1) {
                            item.isshow = true
                        }
                        else {
                            item.isshow = false
                        }
                    })
                }
            },
            tableTxt() {
                // let nodeType = this.currentNode ? parseInt(this.currentNode.data.type_icon) : -1
                // if (nodeType > 6 || nodeType < 5) {
                //     return '请选择一个党支部'
                // }
                // else {
                //     if (this.lists.length == 0) {
                //         return '暂无数据'
                //     };
                // }
                return '暂无数据'
            }
        },
        components: {
            top,
            Slide,
            rightSlide
        },
        methods: {
            closeDefault() {
                // if (this.$route.name == 'historyinfo') {
                //     this.$router.go(-1);
                // };
                let param = this.$route.params;
                let query = this.$route.query;
                if (this.$route.name == 'historyManage') {
                    return;
                }
                this.$router.push({
                    name : 'historylist',
                    params : {
                        dept : param.dept
                    },
                    query : {
                        type : query.type
                    }
                });
            },
            changeRadio(val, params) {
                let that = this;
                for(let i in that.radiosObj) {
                    that.$set(that.radiosObj, i, false);
                }
                that.$set(that.radiosObj, 'items'+params.row.id, true);
                this.remberRow = Object.assign({}, params);
                this.uid = params.row['id'];
                this.radioSelect = params.row;
            },
            toggleTableCfg(){
                this.tableDropVisible = !this.tableDropVisible;
            },
            fetchData(id, isfresh){
                return this.axios({
                    method: 'get',
                    url: '/v1/member/historylist',
                    params: {
                        dept_id: id,
                        opt: isfresh ? 1 : 0,
                    }
                })
            },
            queryData(id, query, opt){
                let param = Object.assign({
                    dept_id : id,
                    keyword : query.trim()
                },{
                    page_number : 1,
                    page_size: 20,
                    opt: 1
                },opt);
                return this.axios({
                    method: 'get',
                    url: '/v1/member/historylist',
                    params: param
                })
            },
            // 这个不是刷新，是点击左侧树的事件
            reflashList(item, isfresh){
                let _this = this;
                this.currentNode = item;
                this.searchString = '';
                this.currentRow = null; // 清空当前所选的表格行
                // 不是党小组
                let nodeType = parseInt(item.data.type_icon);
                // if (nodeType > 6 || nodeType < 5) {
                //     this.$router.push({
                //         name : 'historyManage'
                //     });
                //     this.lists = [];
                //     return
                // };
                this.$router.push({
                    name : 'historylist',
                    params : {
                        dept : item.id
                    },
                    query : {
                        type : nodeType
                    }
                });
                return;
            },
            onTableSelect(data){
                event.stopPropagation();
                // console.log('route:' ,this.$route, '\n' ,'tableselect', data);
                // 停止党籍、出党、死亡、历史申请人 可编辑
                let decrease_opt = data.decrease_opt;
                // let allowEditType = ['停止党籍', '出党', '死亡', '历史申请人', '转出系统'];
                if(data.can_edit == 1){
                    this.editable = true;
                } 
                else {
                    this.editable = false;
                }
                if(!this.editable){
                    this.$Message.error('转出人员不可编辑');
                    return
                }
                // 侧栏组件： 0党员 1申请人 
                let asideViews = ['memberInfo','applicantInfo'];
                this.asideViewName = asideViews[data.is_apply];
                this.asideTitle = data.real_name;

                this.$router.push({
                    name: 'historyinfo',
                    params: {
                        uid: data.uid,
                        dept: this.$route.params.dept ? this.$route.params.dept : data.dept_id
                    },
                    query : {
                        tab: "baseinfo"
                    }
                });
            },
            refreshTable(){
                let _this = this;
                this.lists = [];
                this.currentRow = null; // 清空当前所选的表格行
                if (this.currentNode) {
                    this.fetchData(this.currentNode.id, true).then(res => {
                        _this.radiosObj = {};
                        _this.radioSelect = null;
                        if (res.data.code == 200) {
                            _this.lists = res.data.data.list
                        };
                    })
                    .catch(err => {
                        this.$Message.error('网络请求异常');
                    });
                };
            },
            search(){
                var _this = this;
                // if (this.searchString.trim() == '') {
                //     return 
                // };
                if(this.currentNode){
                    this.tempLists = [].concat(this.lists);
                    this.queryData(this.$route.params.dept, this.searchString).then(res => {
                        if (res.data.code == 200) {
                            _this.lists = res.data.data.list
                        };
                    })
                    .catch(err => {
                        this.$Message.error('网络请求异常');
                    });
                }
            },
            locationTree(rowData) {
                this.nodeOpen = [];
                rowData.location.forEach( function(item, index) {
                    this.nodeOpen.push(item)
                }, this);
            },
            slideDown(){
                let _this = this;
                this.nodeSelect = '';
                this.$nextTick(function() {
                    _this.nodeSelect = this.nodeOpen[this.nodeOpen.length-1];
                });
            },
            deleteTrueMember(){
                let _this = this;
                if(!this.radioSelect){
                    this.$Message.error('请先选择党员')
                    return;
                }
                this.$Modal.confirm({
                    title: '确认删除该党员吗?',
                    onOk: () => {
                        _this.axios({
                            method: 'get',
                            url: '/v1/member/remove',
                            params: {
                                id: _this.radioSelect.id
                            }
                        })
                        .then(res => {
                            if (res.data.code == 200) {
                                _this.fetchData(_this.$route.params.dept, true).then(res => {
                                    _this.radiosObj = {};
                                    _this.radioSelect = null;
                                    if (res.data.code == 200) {
                                        _this.$Message.success('删除成功');
                                        _this.lists = res.data.data.list
                                    };
                                })
                                .catch(err => {
                                    _this.$Message.error('网络请求异常');
                                });
                            }
                            else {
                                _this.$Message.info(res.data.msg);
                            }
                        });
                    },
                    onCancel: () => {
                        _this.$Message.info('操作取消');
                    }
                });
            },
            restoreMember(){
                let _this = this;
                if(!this.radioSelect){
                    this.$Message.error('请先选择党员')
                    return;
                }
                this.$Modal.confirm({
                    title: '确认还原该党员吗?',
                    onOk: () => {
                        _this.axios({
                            method: 'get',
                            url: '/v1/member/historyrestore',
                            params: {
                                id: _this.radioSelect.id
                            }
                        })
                        .then(res => {
                            if (res.data.code == 200) {
                                _this.fetchData(_this.$route.params.dept, true).then(res => {
                                    _this.radiosObj = {};
                                    _this.radioSelect = null;
                                    if (res.data.code == 200) {
                                        _this.$Message.success('还原成功');
                                        _this.lists = res.data.data.list
                                    };
                                })
                                .catch(err => {
                                    _this.$Message.error('网络请求异常');
                                });
                            }else if(res.data.code == 409){
                                setTimeout(()=>{
                                    _this.$Modal.confirm({
                                        title: res.data.msg,
                                        content: "",
                                        onOk: () => {
                                            _this.resetM()
                                        },
                                        onCancel: () => {
                                            
                                        }
                                    });
                                },500)

                            }else {
                                _this.$Message.info(res.data.msg);
                            }
                        })
                        .catch(err => {
                            _this.$Message.error('网络请求异常');
                        });
                    },
                    onCancel: () => {
                        this.$Message.info('操作取消');
                    }
                });
            },
            parseRouter(){
                let _this = this;
                let routerName = this.$route.name;
                let param = this.$route.params;
                switch (routerName) {
                    case 'historylist':
                        console.log('route match:', 'historylist')
                        this.rightSlide = false;
                        // if (query.type > 6 || query.type < 5) {
                        //     this.lists = [];
                        //     return
                        // };
                        this.fetchData(param.dept, true).then(res => {
                            if (res.data.code == 200) {
                                _this.lists = res.data.data.list
                            };
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        });
                        break;
                    default:
                      // statements_def
                        break;
                }
            },
            resetM(){
                let _this = this;
                _this.axios({
                    method: 'get',
                    url: '/v1/member/historyrestore',
                    params: {
                        id: _this.radioSelect.id,
                        force : true,
                    }
                })
                .then(res => {
                    if (res.data.code == 200) {
                        _this.fetchData(_this.$route.params.dept, true).then(res => {
                            _this.radiosObj = {};
                            _this.radioSelect = null;
                            if (res.data.code == 200) {
                                _this.lists = res.data.data.list
                            };
                        })
                        .catch(err => {
                            _this.$Message.error('网络请求异常');
                        });
                    }else {
                        _this.$Message.info(res.data.msg);
                    }
                })
                .catch(err => {
                    _this.$Message.error('网络请求异常');
                });
            },
        },
        mounted() {
            this.$on('refresh', this.refreshTable);
            this.parseRouter();
            this.$nextTick(() => {
                this.$store.commit('setEdit', {isDisable: false});
           })
        },
        watch :{
            rightSlide(val){
                // console.log(val)
            },
            '$route' (to, from){
                let routerName = to.name;
                let param = to.params;
                let _this = this;
                switch (routerName) {
                    case 'historylist':
                        console.log('route match:', 'historylist');
                        this.rightSlide = false;
                        this.fetchData(param.dept, true).then(res => {
                            _this.radiosObj = {};
                            _this.radioSelect = null;
                            if (res.data.code == 200) {
                                _this.lists = res.data.data.list
                            };
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        });
                        break;
                    case 'historyinfo':
                        console.log('route match:', 'historyinfo')
                        this.rightSlide = true;
                        // this.asideViewName = 'memberInfo';
                        break;
                    default:
                      // statements_def
                        break;
                }
            },
            
        },
        beforeRouteUpdate (to, from, next) {
            let _this = this;
            let isEditing = _this.$store.state.isEdit;
            console.log(this.$refs.rightslide.$refs)
            if (isEditing) {
                // statement
                _this.$Modal.confirm({
                    title: '提示',
                    content: '是否保存修改？',
                    onOk:()=>{
                        let rightTab = _this.$refs.rightslide.$refs.asidebody.$refs.asidetab
                        if (rightTab && rightTab.save) {
                            rightTab.save(next);
                        }
                    },
                    onCancel:() =>{
                        _this.$store.commit('setEdit', {isDisable: false});
                        next();
                    }
                })
            }
            else{
                next();
            }


            // next();
        },
    }
</script>
<style>
    .history-view{
        position: relative;
        background-color: #f5f7f9;
    }
    .history-view .table-fliter-item{
        padding-left: 10px;
    }
    .history-view .setHeight{
        overflow: auto;
    }
    .history-view .history-manage .ivu-table th,
    .history-view .history-manage .ivu-table td{
        text-align: center;
    }
    /* .history-model .el-tree-node{
        display: block !important;
    } */
    .history-view .history-aside .is-hidden{
        display: block !important;
    }
</style>
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
        overflow: hidden;
    }
    .layout-content{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }
    .ivu-table-wrapper{
        height: calc(100% - 58px);
    }
    .content-padding{
        box-sizing: border-box;
    }
    .content-padding .ivu-table-body{
        overflow-x: hidden;
    }

</style>