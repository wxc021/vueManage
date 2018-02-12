<template>
    <div class="layout" :style="{'width':'100%','height':'100%'}">
        <!-- 头部 -->
        <top></top>
        <Row type="flex" class="setHeight">
            <!-- 侧边栏树结构 -->
            <i-col span="5" class="layout-menu-left"  @click="clickBlank">
                <Slide ref="slide" url="/v1/trees/apply-trees" :currentnode="nodeSelect" :openitem="openitem" :openlist="nodeOpen" @slideDown="slideDown" @reflashList="reflashList"></Slide>
            </i-col>
            <i-col span="19" class="layout-right-container">
                <!-- 工具栏 -->
                <div class="layout-breadcrumb"   @click="clickBlank">
                    <optNav ref="optnav" :currentRow="currentRow" :uid="uid" :remberRow='remberRow' @del='reloadData' @cacelDefault="cacelDefault"></optNav>
                </div>
                <!-- /end 工具栏 -->
                <!-- 表单主结构 -->
                <div class="layout-content" style="position:realtive;"   @click="clickBlank">
                    <div class="content-padding">
                        <!-- 搜索和过滤 -->
                        <div class="search-filter start-box box-align">
                            <div class="search-content start-box box-align box-flex">
                                <Input v-model="searchString" placeholder="姓名/身份证/手机" @on-keyup.enter="search" :style="{'display':'block', 'width':'35%','marginRight':'10px'}"></Input>
                                <Button type="primary" @click="search" style="height:32px;line-height:16px;">查询</Button>
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
                                <Button @click="reloadData" type="ghost" :style="{'background':'#fff'}">刷新</Button>
                                <Button type="ghost" @click="exportXLS" :style="{'background':'#fff'}">导出excel</Button>
                            </div>
                        </div>
                        <!-- /end 搜索和过滤 -->
                        <Table ref="membertable" :highlight-row="true" @on-row-click="onTableSelect" :no-data-text="tableTxt" :style="{'marginTop':'20px'}" border :columns="tableCol" :data="lists"></Table>
                    </div>
                </div>
                <!-- /end 表单主结构 -->
            </i-col>
        </Row>
        <router-view name="modal"></router-view>
        <ex ref="ex" :isShow="isShow" :postData="postData" :urls="urls"  :countnumber="number"></ex>
        <right-slide ref="rightslide" :title="asideTitle" :show="rightSlide" :viewname="asideViewName"></right-slide>
        <check-loading ref="checkloading" @on-cancel="cancelCheck"></check-loading>
    </div>
</template>
<script>
    import ex from '@/pages/orgManage/export.vue'
    import top from '@/components/top.vue'
    import Slide from '@/components/slide.vue'
    import optNav from '@/pages/applicantManage/optnav.vue'
    import rightSlide from '@/pages/applicantManage/aside.vue'
    import checkLoading from '@/components/checkLoading.vue'
    let isSearch = false;

    export default {
        name: 'applicant-view',
        data() {
            return {
                number: 6,
                urls: '/v1/member/apply-export',
                postData: {},
                isShow: false,
                tableDropVisible: false,    // 控制"列表设置的显示隐藏"
                soltname: 'mainContent',
                openitem: [],
                searchString: '',
                //表单header
                groupList: [],

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
                        allowHide: false,
                        sortable: true,
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
                        title: '性别',
                        key: 'sex',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                       // width:80
                    },
                    {
                        title: '身份证号',
                        key: 'idcard',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        width: 200
                    },
                    {
                        title: '手机号码',
                        key: 'mobile',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        //width: 120
                    },
                    {
                        title: '人员状态',
                        key: 'member_status',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        //width: 120
                    },
                    {
                        title: '支部职务',
                        key: 'duty_name',
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        //width: 150
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        isshow: false,
                        allowHide: true,
                        sortable: true,
                        //width:80
                    },
                    {
                        title: '民族',
                        key: 'nation',
                        isshow: false,
                        allowHide: true,
                        sortable: true,
                        //width:160
                    },
                    {
                        title: '信息完整度',
                        key: 'intergrity',
                        isshow: false,
                        allowHide: true,
                        sortable: true,
                        //width: 120
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
                asideTitle : '',            // 侧栏标题
                asideViewName : null,       // 侧栏组件名称
                asideViewData: null,         // 向侧栏传递的数据
                currentRow : null,           // 当前表格所选择的列
                uid:'',
                remberRow:'',
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
                let nodeType = this.currentNode ? parseInt(this.currentNode.data.type_icon) : -1;
                if (nodeType > 6 || nodeType < 5) {
                    return '请选择一个党支部'
                }
                else {
                    if (this.lists.length == 0) {
                        return '暂无数据'
                    };
                }
            }
        },
        components: {
            ex,
            top,
            Slide,
            optNav,
            rightSlide,
            checkLoading
        },
        methods: {
            vajax(url, data) {
                return this.axios({
                    method: 'get',
                    url: url,
                    params: data
                })
            },
            cacelDefault() {
                this.clickBlank();
            },
            clickBlank() {
                let _this = this;
                let param = this.$route.params;
                let query = this.$route.query;
                let isEditing = _this.$store.state.isEdit;
                if (isEditing) {
                    // statement
                    _this.$Modal.confirm({
                        title: '提示',
                        content: '是否保存修改？',
                        onOk:()=>{
                            let rightTab = _this.$refs.rightslide.$refs.asidebody.$refs.asidetab;                       
                            if (rightTab && rightTab.save) {
                                rightTab.save();
                                _this.$store.commit('setEdit',{isDisable: false});
                            }
                        },
                        onCancel:() =>{
                            _this.$store.commit('setEdit', {isDisable: false});
                            if (this.$route.name == 'applicantinfo') {
                                this.rightSlide = false;
                                this.$router.push({
                                    name : 'applicantlist',
                                    params : {
                                        dept : param.dept
                                    },
                                    query : {
                                        type : query.type
                                    }
                                });
                            }
                        }
                    })
                } else {
                    if (this.$route.name == 'applicantinfo') {
                        this.rightSlide = false;
                        this.$router.push({
                            name : 'applicantlist',
                            params : {
                                dept : param.dept
                            },
                            query : {
                                type : query.type
                            }
                        });
                    }
                } 
            },
            exportXLS(){
                let _this = this;
                let params = this.$route.params;
                if (!params.dept) {
                    this.$Message.error('请选择一个党支部/党小组');
                    return
                };
                // window.open('/v1/member/apply-export?dept_id=' + _this.$route.params.dept);
                this.vajax('/v1/member/apply-expchoose', {})
                .then((res) => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        this.postData = needData.data;
                    } else {
                        this.$Message.error(needData.msg);
                    }
                })
                .catch(error => {
                    this.$Message.error('网络请求异常');
                })
                if (this.isShow) {
                    this.isShow = false;
                    this.$nextTick(() => {
                        this.isShow = true;
                    })
                } else {
                    this.isShow = true;
                } 

            },            
            changeRadio(val, params) {
                let that = this;
                for(let i in that.radiosObj) {
                    that.$set(that.radiosObj, i, false);
                }
                that.$set(that.radiosObj, 'items'+params.row.id, true);
                this.remberRow = Object.assign({}, params);
                this.uid = params.row['id'];
                // console.log(this.remberRow);
                
            },
            toggleTableCfg(){
                this.tableDropVisible = !this.tableDropVisible;
            },
            toggleSlide(status){
                if (status) {
                    this.rightSlide = status;
                    return
                };
                this.rightSlide = !this.rightSlide;
                this.$router.push('/applicant');
            },
            toggleModal(){
                this.modal = !this.modal;
                this.$router.push('/applicant');
            },
            openAside(){
                this.rightSlide = false
            },
            fetchData(id, isfresh){
                isSearch = false;
                let that = this;
                return this.axios({
                    method: 'get',
                    url: '/v1/member/applylist',
                    params: {
                        dept_id: id,
                        opt: isfresh ? 1 : 0,
                        group:that.$route.query.type == 6? '1':"",
                    }
                })
            },
            queryData(id, query, opt){
                let qs = require('qs');
                let param = Object.assign({
                    dept_id : id,
                    query : query.trim()
                },{
                    page_number : 1,
                    page_size: 20,
                    opt: 1
                },opt);
                return this.axios({
                    method: 'POST',
                    url: '/v1/member/applyfilter',
                    data: qs.stringify(param)
                })
            },
            // 这个不是刷新，是点击左侧树的事件
            reflashList(item, isfresh){
                let _this = this;
                this.currentNode = item;
                this.searchString = '';
                this.currentRow = null; // 清空当前所选的表格行
                console.log(this.currentNode);
                this.$store.commit('setIsApplicationQuery',{isApplicationQuery:false});
                // 不是党小组
                let nodeType = parseInt(item.data.type_icon);
            
                // if (nodeType > 6 || nodeType < 5) {
                //     this.$router.push({
                //         name : 'applicant'
                //     });
                //     this.lists = [];
                //     return
                // };
                this.$router.push({
                    name : 'applicantlist',
                    params : {
                        dept : item.id
                    },
                    query:{
                        type:nodeType
                    },
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
                    this.$Message.warning('请输入需要查询的内容');
                    _this.lists = [];
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
                event.stopPropagation();
                this.asideViewName = 'memberInfo';
                this.asideTitle = data.real_name;
                this.$router.push({ 
                    name: 'applicantinfo', 
                    params: { 
                        uid: data.id,
                        dept: this.$route.params.dept
                    },
                    query:{
                        type:this.$route.query.type
                    }
                });
            },
            reloadData(){
                let _this = this;
                if (!this.$route.params.dept) {
                    return;
                };
                this.fetchData(this.$route.params.dept, true).then(res => {
                    if (res.data.code == 200) {
                _this.lists = res.data.data
            };
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                });
            },
            parseRouter(){
                let _this = this;
                let routerName = this.$route.name;
                let param = this.$route.params;
                switch (routerName) {
                    case 'applicant':
                        this.rightSlide = false;
                        break;
                    case 'applicantlist':
                        this.rightSlide = false;
                        this.fetchData(param.dept, true).then(res => {
                            if (res.data.code == 200) {
                                _this.lists = res.data.data
                            };
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        });
                        break;
                    case 'applicantinfo':
                        this.rightSlide = true;
                        this.asideViewName = 'memberInfo';
                        break;
                    default:
                        break;
                }
            },
            cancelCheck(){
                this.$refs['optnav'].cancelCheck();
            }
        },
        mounted() {
            this.$on('toggleSlide', function(status){
                this.rightSlide = status
            });
            this.$on('refresh', this.refreshTable);
            this.parseRouter();
            this.$store.commit('setEdit', {isDisable: false});
        },
        watch :{
            rightSlide(val){

            },
            '$route' (to, from) {
                // 对路由变化作出响应...
                let routerName = to.name;
                let param = to.params;
                let _this = this;
                console.log(1);
                switch (routerName) {
                    case 'applicant':
                        this.rightSlide = false;
                        break;
                    case 'applicantlist':
                        this.rightSlide = false;
                        this.fetchData(param.dept, true).then(res => {
                            if (res.data.code == 200) {
                                //this.$store.commit('setIsApplicationQuery',{isApplicationQuery:true});
                                if(_this.$store.state.isApplicationQuery==true){
                                    _this.lists=_this.$store.state.combApplicatData;
                                }else{
                                    _this.lists = res.data.data
                                }
                            };
                        })
                        .then(()=>{
                            if(/combos$/.test(from.path)){
                                if(this.$store.state.combApplicatData.length==0)return;
                                this.lists = this.$store.state.combApplicatData;
                            }
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        });
                        break;
                    case 'applicantinfo':
                        this.rightSlide = true;
                        this.asideViewName = 'memberInfo';
                        break;
                    default:
                      // statements_def
                        break;
                };
            },
        },
        beforeRouteUpdate (to, from, next) {
            console.group('beforeRouteUpdate');
            console.log('to', to);
            console.log('from', from);
            console.groupEnd();
            console.log(this.$store.state.isApplicationQuery);
            if(/combos$/.test(from.path)){
                if(this.$store.state.combApplicatData.length==0)return;
                this.lists = this.$store.state.combApplicatData;
            }
            let _this = this;
            let isEditing = _this.$store.state.isEdit;
            console.log(isEditing);
            if (isEditing) {
                // statement
                _this.$Modal.confirm({
                    title: '提示',
                    content: '是否保存修改？',
                    onOk:()=>{
                        let rightTab = _this.$refs.rightslide.$refs.asidebody.$refs.asidetab;                       
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
        },        
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
         overflow: hidden;
    }
    .layout-content{
        position: absolute;
        top: 42px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }
    .ivu-table-wrapper{
        height: calc(100% - 100px);
    }
    .content-padding .ivu-table-body{
        overflow-x: hidden;
    }
</style>