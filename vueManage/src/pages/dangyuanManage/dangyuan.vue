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
                <div class="layout-breadcrumb" @click.self="clickBlank">
                    <optNav ref="optnav" :currentRow="currentRow" :uid="uid" :remberRow='remberRow' @del='reloadData'></optNav>
                </div>
                <!-- /end 工具栏 -->
                <!-- 表单主结构 -->
                <div class="layout-content" style="position:realtive;">
                    <div class="content-padding" @click.self="clickBlank">
                        <!-- 搜索和过滤 -->
                        <div class="search-filter start-box box-align">
                            <div class="search-content start-box box-align box-flex" @click.self="clickBlank">
                                <Input v-model="searchString" placeholder="姓名/身份证/手机" @on-keyup.enter="search" :style="{'display':'block', 'width':'35%','marginRight':'10px'}"></Input>
                                <Button type="primary" @click="search" style="height:32px;line-height:16px;">查询</Button>
                            </div>
                            <div class="set-config">
                                <Dropdown trigger="custom" :visible="tableDropVisible" style="margin-left: 20px">
                                    <Button type="ghost" :style="{'background':'#fff'}" @click="toggleTableCfg">列表设置 <Icon type="arrow-down-b"></Icon></Button>
                                    <DropdownMenu slot="list">
                                        <CheckboxGroup @mouseleave.native="toggleTableCfg" v-model="tableFilter">
                                            <div v-for="item in tableModel" class="table-fliter-item" :key="item.key"><Checkbox :label="item.title" :disabled="!item.allowHide"><span>{{item.title}}</span></Checkbox></div>
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
        <ex ref="ex" :isShow="isShow" :postData="postData" :urls="urls"  :countnumber="number"></ex>
        <router-view name="modal"></router-view>
        <right-slide ref="rightslide" :title="asideTitle" :show="rightSlide" :viewname="asideViewName"></right-slide>
        <check-loading ref="checkloading" @on-cancel="cancelCheck"></check-loading>
    </div>
</template>
<script>
    import top from '@/components/top.vue'
    import Slide from '@/components/slide.vue'
    import ex from '@/pages/orgManage/export.vue'
    import optNav from '@/pages/dangyuanManage/optnav.vue'
    import rightSlide from '@/pages/dangyuanManage/aside.vue'
    import checkLoading from '@/components/checkLoading.vue'
    let isSearch = false;
    export default {
        name: 'dangyuan-view',
        data() {
            return {
                number: 12,
                urls: '/v1/member/export',
                postData: {},
                isShow: false,
                isChecking : true,
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
                        width: 80,
                        isshow: true,
                        allowHide: true,
                        sortable: true,
                        //width:100
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
                       // width: 120
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
                        //width:100
                    },
                    {
                        title: '学历',
                        key: 'educations_desc',
                        isshow: false,
                        allowHide: true,
                        sortable: true,
                       //width:120
                    },
                    {
                        title: '信息完整度',
                        key: 'intergrity',
                        isshow: false,
                        allowHide: true,
                        sortable: true,
                        // width: 150
                    }
                ],
                //表单数据
                lists: [],
                radiosObj: {},
                rightSlide : false,
                asideTitle : undefined,            // 侧栏标题
                currentNode : null,         // 选中的节点
                tempLists : null,           // 临时存储的数据
                nodeOpen : [],              // 打开树形的
                nodeSelect : '',            // 选中node的节点
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
            changeRadio(val, params) {
                let that = this;
                for(let i in that.radiosObj) {
                    that.$set(that.radiosObj, i, false);
                }
                that.$set(that.radiosObj, 'items'+params.row.id, true);
                this.remberRow = Object.assign({}, params);
                this.uid = params.row['id'];
                this.currentnode = params.row['id'];
                // this.$store.commit('setId',{id: params.row['id']})
                this.$store.commit('setNode',{data: params.row})
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
                this.$router.push('/dangyuan');
            },
            // toggleModal(){
            //     this.modal = !this.modal;
            //     this.$router.push('/dangyuan');
            // },
            openAside(){
                this.rightSlide = false
            },
            fetchData(id, isfresh){
                isSearch = false;
                let url = '/v1/member/list';

                // 如果是党小组 调用另外一个接口
                if (this.$route.query && this.$route.query.type == 6) {
                    url = '/v1/deptgroup/user-list'
                };
                return this.axios({
                    method: 'get',
                    url: url,
                    params: {
                        dept_id: id,
                        group: this.$route.query.type == 6? '1' : '',
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
                this.currentRow = null; // 清空当前所选的表格行
                this.$store.commit('setIsComQuery',{isComQuery:false});
                console.log('tree');
                // 不是党小组
                let nodeType = parseInt(item.data.type_icon);
                // if (nodeType > 6 || nodeType < 5) {
                //     this.$router.push({
                //         name : 'dangyuan'
                //     });
                //     this.lists = [];
                //     return
                // };
                this.$router.push({
                    name : 'dangyuanlist',
                    params : {
                        dept : item.id
                    },
                    query : {
                        type : nodeType
                    }
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
                //console.log('route:' ,this.$route, '\n' ,'tableselect', data);
                // this.$emit('onTableSelect', data)
                // this.rightSlide = true;
                this.asideViewName = 'memberInfo';
                // this.asideViewData = data;
                this.asideTitle = data.real_name;
                // this.currentRow = data;
                this.$router.push({
                    name: 'dangyuaninfo',
                    params: {
                        uid: data.id,
                        dept: this.$route.params.dept ? this.$route.params.dept : data.dept_id
                    },
                    query : {
                        tab: "baseinfo",
                        type: this.$route.query.type ? this.$route.query.type : ''
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
                let query = this.$route.query
                switch (routerName) {
                    case 'dangyuan':
                        console.log('route match:', 'dangyuan')
                        this.rightSlide = false;
                        break;
                    case 'dangyuanlist':
                        this.rightSlide = false;
                        if (query.type > 6 || query.type < 5) {
                            // this.$router.push({
                            //     name : 'dangyuan'
                            // });
                            this.lists = [];
                            return
                        };
                        this.fetchData(param.dept, true).then(res => {
                            if (res.data.code == 200) {
                                _this.lists = res.data.data
                            };
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        });
                        break;
                    case 'dangyuaninfo':
                        console.log('route match:', 'dangyuaninfo')
                        this.rightSlide = true;
                        this.asideViewName = 'memberInfo';
                        break;
                    default:
                      // statements_def
                        break;
                }
            },
            exportXLS(){
                let _this = this;
                let query = this.$route.query
                if (!query.type || query.type > 6 || query.type < 5) {
                    // this.$router.push({
                    //     name : 'dangyuan'
                    // });
                    this.$Message.error('请选择一个党支部/党小组');
                    return
                };
                // window.open('/v1/member/export?dept_id=' + _this.$route.params.dept);

                this.vajax('/v1/member/expchoose', {})
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
            clickBlank(event){

                console.log('initEvent');
                let param = this.$route.params;
                let query = this.$route.query;
                if (this.$route.name == 'dangyuan') {
                    return;
                }
                this.$router.push({
                    name : 'dangyuanlist',
                    params : {
                        dept : param.dept
                    },
                    query : {
                        type : query.type
                    }
                });
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
            this.$nextTick(() => {
                this.$store.commit('setEdit', {isDisable: false});
           })
        },
        watch :{
            '$route' (to, from) {

                // 对路由变化作出响应...
                let routerName = to.name;
                let param = to.params;
                let query = this.$route.query
                let _this = this;
                let from_name = from.name;
                console.log(routerName);
                switch (routerName) {
                    case 'dangyuan':
                        this.rightSlide = false;
                        console.log(routerName);
                        if(this.$store.state.isComQuery==true){
                            this.lists = this.$store.state.combMemberData;
                        }
                        break;
                    case 'dangyuanlist':
                        this.rightSlide = false;
                        if (query.type > 6 || query.type < 5) {
                            // this.$router.push({
                            //     name : 'dangyuan'
                            // });
                            this.lists = [];
                            //return
                        };
                        this.fetchData(param.dept, true).then(res => {
                            if (res.data.code == 200) {
                                if(this.$store.state.isComQuery==true){
                                    _this.lists = _this.$store.state.combMemberData;
                                }else{
                                    _this.lists = res.data.data
                                }


                            };
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        });
                        break;
                    case 'dangyuaninfo':
                        this.rightSlide = true;
                        this.asideViewName = 'memberInfo';
                        break;
                    default:
                      // statements_def
                        break;
                };
            }
        },

        // 人员切换／页签切换  
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        beforeRouteUpdate (to, from, next) {
            let _this = this;
            let isEditing = _this.$store.state.isEdit;

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
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        // 跳转到其他模块
        // beforeRouteLeave (to, from, next) {
        //     console.group('beforeRouteLeave');
        //     console.log('to', to);
        //     console.log('from', from);
        //     // console.log('next', next);
        //     console.groupEnd();
        //     let isEditing = this.$store.state.isEdit;
        //     console.log(isEditing);
        //     if (isEditing) {
        //         // statement
        //         next();
        //     }
        //     else {
        //         next();
        //     }
        // }
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
    .content-padding{
        box-sizing: border-box;
    }
    .content-padding .ivu-table-body{
        overflow-x: hidden;
    }

</style>
