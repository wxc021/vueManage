<template>
    <div class="layout" :style="{'width':'100%','height':'100%'}">
        <!-- 头部 -->
        <top></top>
        <Row type="flex" class="setHeight">
            <!-- 侧边栏树结构 -->
            <i-col span="5" class="layout-menu-left">
                <Slide ref="slide" url="/v1/trees/members-trees" :currentnode="nodeSelect" :openitem="openitem" :openlist="nodeOpen" @slideDown="slideDown" @reflashList="reflashList"></Slide>
            </i-col>
            <i-col span="19" class="layout-right-container">
                <!-- 工具栏 -->
                <div class="layout-breadcrumb">
                    <optNav :currentRow="currentRow"></optNav>
                </div>
                <!-- -->
                <!-- 表单主结构 -->
                <div class="layout-content" style="position:realtive;">
                    <div class="content-padding">
                        <!-- 搜索和过滤 -->
                        <div class="search-filter start-box box-align">
                            <div class="search-content start-box box-align box-flex">
                                <Input v-model="searchString" placeholder="姓名/身份证/手机" @on-keyup.enter="search" :style="{'display':'block', 'width':'35%','marginRight':'10px'}"></Input>
                                <Button type="primary" @click="search">查询</Button>
                            </div>
                            <div class="set-config">
                                <Dropdown trigger="custom" :visible="tableDropVisible" style="margin-left: 20px">
                                    <Button type="ghost" :style="{'background':'#fff'}" @click="toggleTableCfg">列表设置 <Icon type="arrow-down-b"></Icon></Button>
                                    <DropdownMenu slot="list">
                                        <CheckboxGroup @mouseleave.native="toggleTableCfg" v-model="tableFilter">
                                            <div v-for="item in tableModel" class="table-fliter-item"><Checkbox :label="item.title" :disabled="!item.allowHide"><span>{{item.title}}</span></Checkbox></div>
                                        </CheckboxGroup>
                                    </DropdownMenu>
                                </Dropdown>
                                <Button @click="refreshTable" type="ghost" :style="{'background':'#fff'}">刷新</Button>
                                <Button type="ghost" :style="{'background':'#fff'}">导出excel</Button>
                            </div>
                        </div>
                        <Table ref="membertable" :highlight-row="true" @on-row-click="onTableSelect" :no-data-text="tableTxt" :style="{'marginTop':'20px'}" border :columns="tableCol" :data="lists"></Table>
                    </div>
                </div>
            </i-col>
        </Row>
        <router-view name="modal"></router-view>
        <right-slide :title="asideTitle" :show="rightSlide" :viewname="asideViewName" :viewdata="asideViewData"></right-slide>
    </div>
</template>
<script>
    import top from '@/components/top.vue'
    import Slide from '@/components/slide.vue'
    import optNav from '@/pages/applicantManage/optnav.vue'
    import rightSlide from '@/pages/applicantManage/aside.vue'

    let isSearch = false;

    export default {
        name: 'dangyuan-view',
        data() {
            return {
                tableDropVisible: false,    // 控制"列表设置的显示隐藏"
                soltname: 'mainContent',
                openitem: [],
                searchString: '',
                //表单header
                tableModel: [
                    {
                        title: '姓名',
                        key: 'real_name',
                        isshow: true,
                        allowHide: false,
                        sortable: true,
                        fixed: 'left',
                        width: 100,
                        render: (h, params) => {
                            if (isSearch) {
                                params.column.width = 130
                                return h('div',
                                    {
                                        style:{
                                            width: '130px'
                                        }
                                    },
                                    [params.row.real_name,
                                    h('Button', {
                                        style: {
                                            color : '#2b92e9',
                                            padding: '4px 10px'
                                        },
                                        props : {
                                            type : 'text',
                                            icon : 'location'
                                        },
                                        on: {
                                            click: (event) => {
                                                this.locationTree(params.row);
                                                event.stopPropagation();
                                            }
                                        }
                                    },'定位')])
                            }
                            else {
                                return params.row.real_name
                            }
                        }
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
                        title: '年龄',
                        key: 'age',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        width:80
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        width:80
                    },
                    {
                        title: '民族',
                        key: 'nation',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        width:160
                    },
                    {
                        title: '人员状态',
                        key: 'member_status',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        width: 120
                    },
                    {
                        title: '手机号码',
                        key: 'mobile',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        width: 120
                    },
                    {
                        title: '支部职务',
                        key: 'duty_name',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        width: 150
                    },
                    {
                        title: '信息完整度',
                        key: 'intergrity',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        width: 120
                    }
                ],
                //表单数据
                lists: [],
                rightSlide : false,
                rightSlideTitle : '',
                currentNode : null,         // 选中的节点
                tempLists : null,           // 临时存储的数据
                nodeOpen : [],              // 打开树形的
                nodeSelect : '',            // 选中node的节点
                asideTitle : '',            // 侧栏标题
                asideViewName : null,       // 侧栏组件名称
                asideViewData: null,         // 向侧栏传递的数据
                currentRow : null           // 当前表格所选择的列
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
                let nodeType = this.currentNode ? parseInt(this.currentNode.data.type_icon) : -1
                if (nodeType > 6 || nodeType < 5) {
                    return '请选择一个党支部/党小组'
                }
                else {
                    if (this.lists.length == 0) {
                        return '暂无数据'
                    };
                }
            }
        },
        components: {
            top,
            Slide,
            optNav,
            rightSlide
        },
        methods: {
            toggleTableCfg(){
                this.tableDropVisible = !this.tableDropVisible;
            },
            toggleSlide(){
                this.rightSlide = !this.rightSlide;
                this.$router.push('/dangyuan');
            },
            toggleModal(){
                this.modal = !this.modal;
                this.$router.push('/dangyuan');
            },
            openAside(){
                this.rightSlide = false
            },
            fetchData(id, isfresh){
                isSearch = false;
                return this.axios({
                    method: 'get',
                    url: '/v1/member/list',
                    params: {
                        dept_id: id,
                        opt: isfresh ? 1 : 0,
                    }
                })
            },
            queryData(id, query, opt){
                let param = Object.assign({
                    dept_id : id,
                    query : query.trim()
                },{
                    page_number : 1,
                    page_size: 20,
                    opt: 0
                },opt);
                return this.axios({
                    method: 'get',
                    url: '/v1/member/filter',
                    params: param
                })
            },
            // 这个不是刷新，是点击左侧树的事件
            reflashList(item, isfresh){
                let _this = this;
                this.currentNode = item;
                this.searchString = '';
                this.lists = [];
                this.currentRow = null; // 清空当前所选的表格行
                // 不是党小组
                let nodeType = parseInt(item.data.type_icon);
                if (nodeType > 6 || nodeType < 5) {
                    return
                };
                this.fetchData(item.id, isfresh).then(res => {
                    if (res.data.code == 200) {
                        _this.lists = res.data.data
                    };
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                });
            },

            refreshTable(){
                this.lists = [];
                this.currentRow = null; // 清空当前所选的表格行
                if (this.currentNode) {
                    this.reflashList(this.currentNode, true);
                };
            },
            search(){
                var _this = this;
                if (this.searchString.trim() == '') {
                    return 
                };
                if(this.currentNode){
                    isSearch = true;
                    this.tempLists = [].concat(this.lists);
                    this.queryData(this.currentNode.id, this.searchString).then(res => {
                        if (res.data.code == 200) {
                            _this.lists = res.data.data
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
            onTableSelect(data){
                // this.$emit('onTableSelect', data)
                this.rightSlide = true;
                this.asideViewName = 'memberInfo';
                this.asideViewData = data;
                this.asideTitle = data.real_name;
                this.currentRow = data;
            }
        },
        mounted() {
            this.$on('toggleSlide', function(status){
                this.rightSlide = status
            });
            this.$on('refresh', this.refreshTable)
        },
        watch :{
            rightSlide(val){
                console.log(val)
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