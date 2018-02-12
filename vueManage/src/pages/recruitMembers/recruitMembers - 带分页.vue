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
                <!-- 表单主结构 -->
                <div class="layout-content" style="position:realtive;">
                    <div class="content-padding">
                        <!-- 搜索和过滤 -->
                        <div class="set-config set-height-280">

                            <!--<div class="task-step" style="">-->
                                <!--<div v-for="(item, index) in navData" @click="active(index,item.id)" :style="{zIndex: item.zindex}" :class="{active:item.active == true}"><span>{{index+1}}、{{ item.name }}</span></div>-->
                            <!--</div>-->
                            <!--级联-->

                            <Cascader class="wxc-ivu" placeholder="请选择步骤"  @on-change="changeStep" :render-format="renders" style="width: 296px;float: left;" :clearable="false" :data="data" v-model="stepValue"></Cascader>
                            <Input v-model="searchString" placeholder="姓名/身份证/手机" @on-keyup.enter="search" :style="{'width':'17%','top':'0','marginLeft':'1%','float':'left'}">
                                <Button type="primary" style="height: 32px;background: #d73826;;line-height: 16px;color: #fff;" slot="append" @click="search">查询</Button>
                            </Input>
                        </div>
                        <!--<div class="search-filter start-box box-align">-->
                            <!--<div class="search-content start-box box-align box-flex">-->
                                <!--<Input v-model="searchString" placeholder="姓名/身份证/手机" @on-keyup.enter="search" :style="{'display':'block', 'width':'200px','marginRight':'10px'}"></Input>-->
                                <!--<Button type="primary" @click="search">查询</Button>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!-- /end 搜索和过滤 -->
                        <div class="start-box" style="border:0px solid #ddd;height: calc(100% - 100px);margin-top:20px;background:#fff;">
                            <div class="table-line" style="width:382px;height: 100%;overflow: auto;">
                                <Table ref="membertable" :highlight-row="true" @on-row-click="onTableSelect" style="height: calc(100% - 45px ) ;overflow: auto;" :no-data-text="tableTxt"  border :columns="tableModel" :data="lists"></Table>
                                <Page @on-change="pageGo" style="border-left: 1px solid #ddd;border-bottom:1px solid #ddd;border-right:1px solid #ddd;padding:10px 0;justify-content: center;display: flex;" size="small" :total="total"></Page>
                            </div>
                            <div class='box-flex' style="padding:10px;border:1px solid #ddd;border-left: none;">
                                <!--v-if="isTabShow" -->
                                <tab style="height: 100%;overflow: auto;" ref="ch" :isTabShow="isTabShow"  :users="user_step" :processTree="processTree" :getStepTree="getStepTree" v-on:search="search"></tab>
                            </div>
                        </div>

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
    import tab from '@/pages/recruitMembers/tab.vue'
    let isSearch = false;
    export default {
        name: 'applicant-view',
        data() {
            return {
                total:'100',
                watch_uid:'',
                data: [],//步骤树级联数据源
                stepValue:['1','1'],
                tableDropVisible: false,    // 控制"列表设置的显示隐藏"
                soltname: 'mainContent',
                openitem: [],
                userStep:{},//存储人员步骤信息的对象
                searchString: '',
                step_pid:'1',
                isTabShow:false,//是否显示右侧tab组件
                user_step:{},//存储当前用户审核到达的步骤及uid 的对象
                getStepTree:{},//步骤树数据
                //表单header
                tableModel: [
                    {
                        title: '姓名',
                        key: 'real_name',
                        isshow: true,
                        allowHide: false,
                        sortable: true,
                        width: 150
                    },
                    {
                        title:'当前步骤',
                        key: 'step_name',
                    },
//                    {
//                        title: '操作',
//                        key: 'action',
//                        width: 120,
//                        render: (h, params) => {
//                            return h('div', [
//                                h('Button', {
//                                    props: {
//                                        type: 'text',
//                                        size: 'small'
//                                    },
//                                    style:{'margin-left':'-8px','background-color':'transparent'},
//                                    on: {
//                                        click: (e) => {
//                                        e.stopPropagation();
//                                        console.log(params);
//                                        this.$router.push({name:'allFile',query:{id:params.row.id}});
//
//
//
//                                        }
//                                    }
//                                }, '查看全部附件')
//                            ]);
//                        }
//                    }
                ],
                //表单数据
                lists: [],
                processTree:[],//步骤树 数据源
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
                navData : [
                    {
                        name : '一、申请入党',
                        zindex : '5',
                        active : true,
                    },
                    {
                        name : '二、入党积极分子的确定和培养教育',
                        zindex : '4',
                        active : false,
                    },
                    {
                        name : '三、发展对象的确定和考察',
                        zindex : '3',
                        active : false,
                    },
                    {
                        name : '四、预备党员的接收',
                        zindex : '2',
                        active : false,
                    },
                    {
                        name : '五、预备党员的教育考察和转正',
                        zindex : '1',
                        active : false,
                    }
                ]
            }
        },
        computed: {
//            tableCol() {
//                return this.tableModel.filter((item) => {
//                    return item.isshow
//                })
//            },
//            tableFilter:{   //['姓名', '身份证号' ...]
//                get(){
//                    return this.tableCol.map((item) => {
//                        return item.title
//                    })
//                },
//                set(newValue){
//                    this.tableModel.forEach((item) => {
//                        if (newValue.indexOf( item.title ) != -1) {
//                            item.isshow = true
//                        }
//                        else {
//                            item.isshow = false
//                        }
//                    })
//                }
//            },
            tableTxt() {
                return '暂无数据'
                // let that = this
                // let nodeType = this.currentNode ? parseInt(this.currentNode.data.type_icon) : -1
                // if (nodeType > 6 || nodeType < 5) {
                //     return '请选择一个党支部'
                // }
                // else {
                //     if (this.lists.length == 0) {
                //         return '暂无数据'
                //     };
                // }
            }
        },
        components: {
            top,
            Slide,
            tab,
        },
        methods: {
            //分页
            pageGo(pageSize){
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/recruit/member-list',
                    params: {
                        dept_id:this.$store.state.remberId,
                        step_id:that.step_pid,
                        keyword:that.searchString,
                        page_number:pageSize,
                        page_size:'10',
                        opt:'1',
                    }
                })
                .then(res=>{
                    let needData = res.data;
                    if(needData.code==200){
                        that.lists= needData.data;
                        that.total =needData.code;
                    }
                })
            },
            //选择当前步骤 进行筛选人员
            changeStep(value){
                let _this = this;
                let qs = require('qs');
                this.step_pid=value[0];
                if (value.length==0) return
                value = value.pop();


                this.axios({
                            method:'post',
                            url:'/v1/recruit/member-list',
                            data:qs.stringify({
                                dept_id:this.$store.state.remberId,
                                step_id:value,
                                keyword:_this.searchString,
                                page_number:'1',
                                page_size:'100',
                                opt:'1'
                            })
                        })
                        .then(res=>{
                    let needData = res.data;
                if (needData.code=='200'){
                    _this.lists= needData.data;
                    if(_this.lists.length==0){
                        this.isTabShow=false;
                    }

                }else {
                    _this.$Message.error(needData.msg)
                }
            })
            .catch(err => {
                    _this.$Message.error('网络请求异常')
            })
            },
            active(index,id) {
                let _this = this;
                let qs = require('qs');
                this.navData.forEach(function(item){
                    item.active = false;
                });
                this.navData[index].active = true;
                this.step_pid=this.navData[index].id;
//                console.log(this.step_pid);
                this.axios({
                    method:'post',
                    url:'/v1/recruit/member-list',
                    data:qs.stringify({
                      dept_id:this.$store.state.remberId,
                      step_id:id,
                      keyword:_this.searchString,
                      page_number:'1',
                      page_size:'100',
                      opt:'1'
                    })
                  })
                  .then(res=>{
                  let needData = res.data;
                if (needData.code=='200'){
                  _this.lists= needData.data;
                }else {
                  _this.$Message.error(needData.msg)
                }
              })
              .catch(err => {
                  _this.$Message.error('网络请求异常')
              })
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
                this.$router.push({name : 'applicant'});
            },
            toggleModal(){
                this.modal = !this.modal;
                this.$router.push({name : 'applicant'});
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
            queryData(){
                let _this = this;
                return this.axios({
                    method: 'get',
                    url: '/v1/recruit/member-list',
                    params: {
                      dept_id:this.$store.state.remberId,
                      step_id:_this.step_pid,
                      keyword:_this.searchString,
                      page_number:'1',
                      page_size:'100',
                      opt:'1',
                    }
                })
            },
            // 这个不是刷新，是点击左侧树的事件
            reflashList(item, isfresh){
                let _this = this;
                this.currentNode = item;
                this.searchString = '';
                this.currentRow = null; // 清空当前所选的表格行
                let qs = require('qs');
                // 不是党小组
                // let nodeType = parseInt(item.data.type_icon);
                // if (nodeType > 6 || nodeType < 5) {
                //   this.$router.push({
                //         name : 'recruitMembers'
                //     });
                //     this.lists = [];
                //     return
                // };
                this.$router.push({
                    name : 'recruitMembers'
                });
                // this.lists = [];
                // return

              this.axios({
                  method:'post',
                  url:'/v1/recruit/member-list',
                  data:qs.stringify({
                    dept_id:this.$store.state.remberId,
                    step_id:_this.step_pid,
                    keyword:_this.searchString,
                    page_number:'1',
                    page_size:'100',
                    opt:'1'
                  })
                })
                .then(res=>{
                  let needData = res.data;
                  if (needData.code=='200'){
                    _this.lists= needData.data;
                      if(_this.lists.length==0){
//                          this.$refs.ch.$el.style.display='none';
                          this.isTabShow=false;
                      }
                  }else {
                    _this.$Message.error(needData.msg)
                  }
                })
                .catch(err => {
                  _this.$Message.error('网络请求异常')
                })

                this.$router.push({
                    name : 'recruitMembers',
                    params : {
                        dept : item.id
                    }
                });
            },
            //get头部导航
            getnavData(){
              let that = this;
              this.axios({
                  method: 'get',
                  url: '/v1/recruit/step-process'
                })
                .then(res => {
                // console.log(res);
                if (res.data.code == 200) {
                  let needData = res.data;
                  that.getStepTree = needData.data;
                    for (let key in needData.data ){
                    that.processTree.push(needData.data[key]);
                  }
                  that.processTree.forEach((item,index) =>{
                    that.navData[index].id=item.id;
                    that.navData[index].name=item.name;
                  })
                }else {
                  that.$Message.error(needData.msg)
                };
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
                let that = this;
                this.queryData().then(res => {
                    if (res.data.code == 200) {
                      that.lists = res.data.data
                      if (res.data.data.length==0){that.$Message.info('搜索无结果')}

                    };
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                });
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
//                console.log(this.user_step);
                // this.$emit('onTableSelect', data)
                // this.rightSlide = true;
                this.watch_uid=data.id;
                this.isTabShow=true;
                this.asideViewName = 'memberInfo';
                // this.asideViewData = data;
                this.asideTitle = data.real_name;
                this.currentRow = data;
//                console.log(data);
                let that =this;
                let qs = require('qs');
              //选择当前人员的获取审核到的步骤
              this.axios({
                  method:'post',
                  url:'/v1/recruit/member-step-status',
                  data:qs.stringify({
                    uid:data.id,
                    opt:'1'
                  })
                })
                .then(res=>{
                  let needData = res.data;
                  if (needData.code=='200'){
                    if(needData.data.length<=0)return
                    that.user_step.step = data.step_id;
                    that.user_step.step_pid=data.step_pid
                    that.user_step.uid = data.id;
                    that.user_step.step_info=needData.data;

                    let item = that.getStepTree[data.step_pid]
//                      new Promise(function (resolve,reject) {
//                          that.$refs.ch.getSteps();
//                          resolve();
//                      }).then(()=>{
//                          that.$refs.ch.active(data.step_pid,item)
//                      })


                     that.$refs.ch.getSteps();
                     that.$refs.ch.active(data.step_pid,item)//调用子组件的active 选中方法
//                    this.$refs.ch.getButton();//获取子组件中navList 的数据源
//                    this.$refs.ch.navClickItem(this.$refs.ch.navList[0],0)//调用nav切换方法让它初始化第一的选中
                  }else {
                    that.$Message.error(needData.msg)
                  }
              })
              .catch(err => {
                console.log(err);
                that.$Message.error('网络请求异常')
              })
            },
            //获取步骤级联数据
            getCascader(){
                this.axios({
                            method:'post',
                            url:'/v1/recruit/step-process-min'
                        })
                        .then(res=>{
                            let needData = res.data;
                            needData.data.forEach(item=>{
                                item.children = item.child
                            })

                            this.data = needData.data
                            //console.log(needData);

                        })
            },
            parseRouter(){
                let _this = this;
                let routerName = this.$route.name;
                let param = this.$route.params;
                switch (routerName) {
                    case 'applicant':
                        console.log('route match:', 'applicant')
                        this.rightSlide = false;
                        break;
                    case 'applicantlist':
                        console.log('route match:', 'applicantlist')
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
                        console.log('route match:', 'applicantinfo')
                        this.rightSlide = true;
                        this.asideViewName = 'memberInfo';
                        break;
                    default:
                      // statements_def
                        break;
                }
            },
            //初始化人员列表
            getMemberlist(){
                let _this = this;
                let qs = require('qs');
                this.axios({
                    method:'post',
                    url:'/v1/recruit/member-list',
                    data:qs.stringify({
                        dept_id:this.$store.state.remberId,
                        step_id:_this.step_pid,
                        keyword:_this.searchString,
                        page_number:'1',
                        page_size:'100',
                        opt:'1'
                    })
                })
                .then(res=>{
                    let needData = res.data;
                    if (needData.code=='200'){
                        _this.lists= needData.data;
                        if(_this.lists.length==0){
    //                          this.$refs.ch.$el.style.display='none';
                        }
                    }else {
                        _this.$Message.error(needData.msg)
                    }
                })
                .catch(err => {
                        _this.$Message.error('网络请求异常')
                })
            }
        },
        mounted() {
            this.$on('toggleSlide', function(status){
                this.rightSlide = status
            });
            this.$on('refresh', this.refreshTable);
            this.parseRouter();
            this.getnavData();
            this.getCascader();
        },
        watch :{
            lists(newVal,oldVal){
//              console.log(this.user_step.uid);
              let that = this;
              let _index =0;
              newVal.forEach((item,index) =>{
                if(that.user_step.uid==item.id){
                  that.onTableSelect(newVal[index]);
                  that.lists[index]._highlight= true;
                }
              })
            },
            watch_uid(val){
//                this.$refs.ch.active(data.step_pid,item)//调用子组件的active 选中方法
                if(this.$refs.ch){
                    this.$refs.ch.getButton();//获取子组件中navList 的数据源
                    if (this.user_step.uid){
                        this.$refs.ch.navClickItem(this.$refs.ch.navList[0],0)//调用nav切换方法让它初始化第一的选中
                    }
//                    this.$refs.ch.getSteps();//调用初始化步骤

                }
            },
            '$route' (to, from) {
                // 对路由变化作出响应...
                let routerName = to.name;
                let param = to.params;
                let _this = this;
                switch (routerName) {
                    case 'applicant':
                        console.log('route match:', 'applicant')
                        this.rightSlide = false;
                        break;
                    case 'applicantlist':
                        console.log('route match:', 'applicantlist')
                        this.rightSlide = false;
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
                    case 'applicantinfo':
                        console.log('route match:', 'applicantinfo')
                        this.rightSlide = true;
                        this.asideViewName = 'memberInfo';
                        break;
                    default:
                      // statements_def
                        break;
                }
            }
        },
    }
</script>
<style scoped>
    .ivu-cascader-menu{
        height: 280px;
    }
    .layout{
        position: relative;
    }
    .table-fliter-item{
        padding-left: 10px;
    }
    .setHeight{
        /*min-height: 800px;*/
        overflow: auto;
    }
    .layout-right-container{
        position: relative;
        height: 100%;
        overflow: auto;
    }
    .layout-content{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }
    .set-config{
        margin-bottom: 20px;
        overflow: hidden;
        min-width: 1190px;
    }
    .task-step{
        font-size: 0;
        display: inline-block;
        border: 1px solid #ddd;
    }
    .task-step>div{
        font-size: 14px;
        display: inline-block;
        position: relative;
        padding: 0 16px;
        height: 32px;
        line-height: 32px;
        color: #333;
        cursor: pointer;
        background:#fff;
        text-indent: 10px;

    }

    .task-step>div:not(:last-child)::after{
        display: block;
        position: absolute;
        right: -32px;
        top: 0;
        content: "";
        width:0;
        height: 0;
        border: 16px solid transparent;
        border-left-color: #fff;
    }
    .task-step>div:not(:last-child)::before{
        display: block;
        position: absolute;
        right: -33px;
        top: 0;
        content: "";
        width:0;
        height: 0;
        border: 16px solid transparent;
        border-left-color: #ddd;
    }
    .task-step>div.active{
        background: #d73826;
        color: #fff;
    }
    .task-step>div.active:not(:last-child)::after{
         border-left-color: #d73826;
    }
</style>
