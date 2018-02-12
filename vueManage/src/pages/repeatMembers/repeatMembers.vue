<template>
    <div class="repeat-view" :style="{'width':'100%','height':'100%'}">
        <!-- 头部 -->
        <top></top>
        <Row type="flex" class="setHeight">
            <!-- 侧边栏树结构 -->
            <i-col span="5" class="repeat-aside layout-menu-left">
                <Slide ref="slide" url="/v1/trees/history-members-trees" :currentnode="nodeSelect" :openitem="openitem" :openlist="nodeOpen" @slideDown="slideDown" @reflashList="reflashList"></Slide>
            </i-col>
            <i-col span="19" class="layout-right-container">
                <!-- 搜索和过滤 -->
                <div class="search-filter start-box box-align">
                    <div class="search-content start-box box-align box-flex">
                        <Input v-model="searchString" placeholder="姓名/身份证/手机" @on-keyup.enter="search" :style="{'display':'block', 'width':'35%','marginRight':'10px'}"></Input>
                        <Button style="margin-right: 6px;" type="primary" @click="search">查询</Button>
                        <Button type="ghost" @click="delMember" :style="{'background':'#fff'}">彻底删除</Button>
                    </div>
                    <div class="set-config">
                        <Button @click="parseRouter" type="ghost" :style="{'background':'#fff'}">刷新</Button>
                        <!-- <Button type="ghost" :style="{'background':'#fff'}">导出excel</Button> -->
                    </div>
                </div>
                <!-- /end 搜索和过滤 -->
                <!-- 表单主结构 -->
                <div class="layout-content" style="position:realtive;background: #f5f7f9;">
                    <div class="content-padding">
                        <Table ref="membertable" @on-row-click="onTableRowClick" :no-data-text="tableTxt" border :columns="tableCol" :data="lists"></Table>
                    </div>
                </div>
                <!-- /end 表单主结构 -->
            </i-col>
        </Row>
        <router-view :viewdata="modalViewData" name="modal"></router-view>
    </div>
</template>
<script>
    import top from '@/components/top.vue'
    import Slide from '@/components/slide.vue'

    export default {
        name: 'dangyuan-view',
        data() {
            let _this = this;
            return {
                soltname: 'mainContent',
                openitem: [],
                searchString: '',
                radios : {},
                radioSelect : null,
                //表单header
                tableModel: [
                    {
                        title : '操作',
                        isshow: true,
                        width: 80,
                        // fixed : 'left',
                        render(h, params){
                            return h('Radio',{
                                props : {
                                    value : _this.radios['_' + params.row.id]
                                },
                                on: {
                                    'on-change'(bool){
                                        if (bool) {
                                            _this.$emit('radio-change', params);
                                        };
                                    }
                                },
                                nativeOn: {
                                    click(event){
                                        event.stopPropagation()
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '姓名',
                        key: 'real_name',
                        isshow: true,
                        sortable: true,
                        width: 100,
                        // fixed : 'left'
                    },
                    {
                        title: '身份证号',
                        key: 'idcard',
                        isshow: true,
                        sortable: true,
                        width: 200
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        isshow: true,
                        sortable: true,
//                        width:80
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        isshow: true,
                        sortable: true,
//                        width:80
                    },
                    {
                        title: '民族',
                        key: 'nation',
                        isshow: true,
                        sortable: true,
//                        width:160
                    },
                    {
                        title: '人员状态',
                        key: 'member_status',
                        isshow: true,
                        sortable: true,
//                        width: 120
                    },
                    {
                        title: '手机号码',
                        key: 'mobile',
                        isshow: true,
                        sortable: true,
//                        width: 120
                    },
                    {
                        title: '信息完整度',
                        key: 'intergrity',
                        isshow: true,
                        sortable: true,
//                        width: 120
                    },
                    {
                        title: '重复人员数',
                        key: 'repeat',
                        isshow: true,
                        sortable: true,
//                        width: 120
                    }
                ],
                tableTxt: '暂无数据',
                //表单数据
                lists: [],
                nodeOpen : [],              // 打开树形的
                nodeSelect : '',            // 选中node的节点
                modalViewData: null,         // 向router-view传递的数据
                currentRow : null,           // 当前表格所选择的列
                currentNode : null
            }
        },
        computed: {
            tableCol() {
                return this.tableModel.filter((item) => {
                    return item.isshow
                })
            }
        },
        components: {
            top,
            Slide,
        },
        methods: {
            fetchData(id, isfresh){
                return this.axios({
                    method: 'get',
                    url: '/v1/identity/list',
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
                    opt: 0
                },opt);
                return this.axios({
                    method: 'get',
                    url: '/v1/identity/search',
                    params: param
                })
            },
            // 这个不是刷新，是点击左侧树的事件
            reflashList(item, isfresh){
                let _this = this;
                this.currentNode = item;
                this.searchString = '';
                this.currentRow = null; // 清空当前所选的表格行
                console.log(item)
                this.$router.push({
                    name: 'repeatmemberlist',
                    params : {
                        dept : item.id
                    }
                })
            },
            search(){
                var _this = this;
                if (this.searchString.trim() == '') {
                    return 
                };
                // this.$router.push({
                //     path : this.$router.currentRoute.path,
                //     query : {
                //         q : _this.searchString
                //     }
                // })
                console.log(this.$route.params.dept);
                let dept = this.$route.params.dept ? this.$route.params.dept : this.$store.state.remberId
                this.queryData(dept, this.searchString)
                .then(res => {
                    if (res.data.code == 200) {
                        _this.lists = res.data.data
                    }
                    else {
                        this.$Message.error(res.data.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                });
            },
            slideDown(){
                let _this = this;
                this.nodeSelect = '';
                this.$nextTick(function() {
                    _this.nodeSelect = this.nodeOpen[this.nodeOpen.length-1];
                });
            },
            onTableRowClick(data){
                this.modalViewData = data;
                this.$router.push({
                    name : 'repeatmembersdetail',
                    params : {
                        dept : this.$route.params.dept,
                        idcard : data.idcard
                    }
                });
            },
            parseRouter(){
                let _this = this;
                let routerName = this.$route.name;
                let param = this.$route.params;

                switch (routerName) {
                    case 'repeatmemberlist':
                        console.log('route match:', 'repeatmemberlist');
                        this.fetchData(param.dept, true).then(res => {
                            console.log(res);
                            if (res.data.code == 200) {
                                _this.lists = res.data.data
                            }
                            else{
                                _this.tableTxt = res.data.msg;
                                // _this.$Message.error(res.data.msg);
                            }
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        });
                        break;
                    // case 'dangyuaninfo':
                    //     console.log('route match:', 'dangyuaninfo')
                    //     this.rightSlide = true;
                    //     this.asideViewName = 'memberInfo';
                    //     break;
                    // default:
                    //   // statements_def
                    //     break;
                }
            },
            radioChange(params){
                let _this = this;
                for(let i in _this.radios){
                    _this.$set(_this.radios, i, false);
                }
                _this.$set(_this.radios, '_' + params.row.id, true);
                _this.radioSelect = params.row;
            },
            delMember(){
                if (!this.radioSelect) {
                    this.$Message.info('请选择一个党员');
                    return;
                };
                let _this = this;
                this.$Modal.confirm({
                    title: '确认删除该条记录么?',
                    onOk: () => {
                        _this.axios({
                            method: 'get',
                            url: '/v1/member/remove-direct',
                            params: {
                                dept_id : _this.radioSelect.dept_id,
                                uid : _this.radioSelect.id
                            }
                        }).then(res => {
                            if(res.data.code == 200){
                                 _this.$Message.success('删除成功');
                                 _this.parseRouter();
                            }
                            else {
                                this.tableTxt = res.data.msg;
                                // this.$Message.error(res.data.msg);
                            }
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('操作取消');
                    }
                });
                
            }
        },
        mounted() {
            this.$on('refresh', this.parseRouter);
            this.$on('radio-change', this.radioChange);
            this.parseRouter();
        },
        watch :{
            '$route' (to, from) {
                // 对路由变化作出响应...
                let routerName = to.name;
                let param = to.params;
                let _this = this;
                switch (routerName) {
                    case 'repeatmemberlist':
                        console.log('route match:', 'repeatmemberlist')
                        this.radioSelect = null;
                        console.log(_this.$route);
                        this.fetchData(param.dept, true).then(res => {
                            if (res.data.code == 200) {
                                _this.lists = res.data.data;

                                // 更新 radios 对象
                                let tmpObj = {};
                                res.data.data.forEach((item, inedx) => {
                                    tmpObj['_' + item.id] = false;
                                });
                                _this.radios = Object.assign({}, tmpObj);
                            }
                            else{
                                _this.lists = [];
                                _this.tableTxt = res.data.msg;
                                // _this.$Message.error(res.data.msg);
                            }
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
<style>
    .repeat-view{
        position: relative;
    }
    .repeat-view .table-fliter-item{
        padding-left: 10px;
    }
    .repeat-view .setHeight{
        overflow: auto;
    }
    .repeat-view .layout-right-container{
        position: relative;
        height: 100%;
        overflow: auto;
        background: #f5f7f9;
    }
    .repeat-view .layout-content{
        position: absolute;
        top: 42px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }
    .repeat-view .search-filter{
        margin: 15px;
    }
    /* .history-model .el-tree-node{
        display: block !important;
    } */
    .repeat-view .repeat-aside  .el-tree-node.is-hidden{
        display: block !important;
    }
</style>