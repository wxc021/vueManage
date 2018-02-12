<template>
    <div class="layout" :style="{'width':'100%','height':'100%'}">
        <!-- 头部 -->
        <top></top>
        <Row type="flex" class="setHeight">
            <!-- 侧边栏树结构 -->
            <i-col span="5" class="layout-menu-left">
                <Slide ref="slide" url="/v1/trees/search-list" @reflashList="reflashList"></Slide>
            </i-col>
            <i-col span="19" class="layout-right-container">
                <!-- 表单主结构 -->
                <div class="layout-content" style="position:realtive;">
                    <div class="content-padding" style="background:#f5f7f9;">
                        <div class="search-filter start-box box-align" style="background: #f5f7f9;padding-bottom: 16px;">
                            <Select @on-change="selectChange" v-model="state" style="width:100px;margin-right: 10px;">
                                <Option v-for="item in stateModel" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <div class="search-content start-box box-align box-flex">
                                <Input v-model="searchString" placeholder="姓名/身份证/手机" @on-keyup.enter="search" :style="{'display':'block', 'width':'200px','marginRight':'10px'}"></Input>
                                <Button type="primary" @click="search">查询</Button>
                            </div>
                        </div>
                        <!-- /end 搜索和过滤 -->
                        <div class="start-box" style="height: calc(100% - 100px);">
                           <Row style="width: 100%;">
                               <Col span="24" style="border:1px solid #ddd;background: #fff;height: 100%;;overflow: auto;border-right: 0;">
                                                                                                                              <!--:data="memberList"-->
                                   <Table :highlight-row="true" @on-row-click="clickRow" style="overflow: auto;;border-top: none;border-left: none;border-right: none;" :columns="memberCol" :data="memberList"></Table>
                               </Col>
                               <!--<Col span="14" style="background: #ffffff;;padding: 18px 30px 0;border:1px solid #ddd;height:600px;overflow: auto;">-->
                               <!--<div style="margin-bottom: 10px;display: none;">-->
                                   <!--<span>{{key_field.name}}:</span>-->
                                   <!--<DatePicker readonly v-model="key_field.date"  type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:200px"></DatePicker>-->
                               <!--</div>-->
                               <!--<table>-->
                                   <!--<thead>-->
                                       <!--<th>表格</th>-->
                                       <!--<th>成果</th>-->
                                   <!--</thead>-->
                                   <!--<tbody>-->
                                       <!--<tr v-for="item in material">-->
                                           <!--<td>{{item.title}}</td>-->
                                           <!--<td><span @click="clickTable(item)">查看表格</span><span @click="clickFile(item)">查看附件</span></td>-->
                                       <!--</tr>-->
                                       <!--<tr v-if="material.length==0">-->
                                           <!--<td colspan="2">暂无数据</td>-->
                                       <!--</tr>-->
                                   <!--</tbody>-->
                               <!--</table>-->
                               <!--<div class="start-box box-pack" style="margin-top:20px;">-->
                               <!--<p class="box-flex" style="text-align:right;">-->
                               <!--<Button type="ghost" v-if="isShowBtn" @click="reason">退回</Button>-->
                               <!--<Button type="primary" v-if="isShowBtn" @click="adopt" style="margin-right: 10px;margin-left: 10px;">通过审核</Button>-->
                               <!--</p>-->
                               <!--</div>-->
                               <!--</Col>-->
                           </Row>
                        </div>

                    </div>
                </div>
                <!-- /end 表单主结构 -->
            </i-col>
        </Row>
        <router-view name="modal"></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '@/components/top.vue'
    import Slide from '@/components/slide.vue'
    let isSearch = false;
    export default {
        name: 'applicant-view',
        data() {
            return {
                stateModel: [
                    {
                        value: 'all',
                        label: '全部类型'
                    },
                    {
                        value: '0',
                        label: '待审核',
                    },
                    {
                        value: '1',
                        label: '已通过'
                    },
                    {
                        value: '-1',
                        label: '被驳回'
                    },
                ],
                dept_id:'',//党组织id
                uid:'',//存储用户id
                step_id:'',//步骤id
                isShowBtn:false,//是否显示
                key_field:{
                    name:"列为积极分子日期",//input标题
                    date:'',//时间
                },
                state: 'all',
                material:[],//审核列表数据源
                memberCol: [
                    {
                        title: '姓名',
                        key: 'real_name'
                    },
                    {
                        title:'身份证号',
                        key:'idcard',
                        width:'200'
                    },
                    {
                        title:'年龄',
                        key:'age',
                    },
                    {
                        title:'性别',
                        key:'sex_label',
                    },
                    {
                        title:'民族',
                        key:'nation_desc',
                    },
                    {
                        title: '发展流程',
                        key: 'step_name',
                        width:'150'
                    },
                    {
                        title: '审核状态',
                        key: 'check_status',
                        render: (h, params) => {
                            //判断是否为被驳回状态  不是进if  反之则进else
                            if(params.row.check_status != '-1'){
                                return h('div', [
                                    h('div', params.row.status_label)
                                ]);
                            }else{
                                return h('div', [
                                    h('span',{
                                                style:{marginRight:'3px'}
                                            },
                                            params.row.status_label
                                    ),
                                    h('Tooltip',
                                            {
                                                props:{
                                                    content:params.row.reason,
                                                    transfer:true
                                                }
                                            }
                                            ,[
                                        h('Icon', {
                                            props: {
                                                type: 'ios-information-outline',
                                                color:'#e1330e',
                                            }
                                        })
                                    ]),
                                    ,

                                ]);
                            }
                        }
                    },
                    {
                        title: '操作人',
                        key: 'operator'
                    },
                    {
                        title:'操作',
                        key:'action',
                        width:'250',
                        render: (h, params) => {
                            let backCol = params.row.check_status!='0' ? '#bbbbbb' : '#e1330e';
                            let passCol = params.row.check_status!='0' ? '#bbbbbb' : '#00a0e9';
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                    },
                                    style:{marginRight:'5px','background-color':'transparent','color':passCol},
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation();
                                            if(params.row.check_status=='0'){
                                                this.adopt(params.row);
                                            }

                                        }
                                    }
                                }, '通过'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                    },
                                    style:{marginRight:'5px','background-color':'transparent','color':backCol},
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation();
                                            if(params.row.check_status=='0'){
                                                this.reason(params.row);
                                            }

                                        }
                                    }
                                }, '退回'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    style:{'background-color':'transparent','color':'#454545'},
                                    on: {
                                        click: (e) => {
                                            e.stopPropagation();
                                            console.log(params);
                                            this.$router.push({name:'allFile',query:{id:params.row.id}});
                                        }
                                    }
                                }, '查看全部附件'),


                            ]);
                        }
                    }
                ],
                memberList: [],//待审核人员数据源
                memberListTest:[
                    {real_name:'嘻哈小C',idcard:'120102196203063204',age:'25',sex_label:'男',nation_desc:'汉族',step_name:'发展库存2121212',check_status:'-1',operator:'王叙淳',reason:'材料不全',status_label:'已驳回'},
                    {real_name:'嘻哈小C',idcard:'120102196203063204',age:'25',sex_label:'男',nation_desc:'汉族',step_name:'发展库存2121212',check_status:'1',operator:'王叙淳',status_label:'已通过'},
                    {real_name:'嘻哈小C',idcard:'120102196203063204',age:'25',sex_label:'男',nation_desc:'汉族',step_name:'发展库存2121212',check_status:'0',operator:'王叙淳',status_label:'待审核'}


                ],//测试table列表数据源
                searchString:"",//关键词
            }
        },
        components: {
            top,
            Slide,
        },
        methods: {
            //通过审核
            adopt(item){
                let that = this;
                let qs = require("qs");
                this.axios({
                        method:'post',
                        url:'/v1/recruit/check-material',
                        data:qs.stringify({
                            uid:item.id,
                            step_id:item.step_id,
                            check:'1',
                            reason:''
                        }),
                    })
                    .then( res=>{
                        let needData= res.data;
                        if(needData.code=='200'){
                            this.$Message.success('审核通过');
                            this.isShowBtn=false;
                            this.search()
                        }else{
                            this.$Message.error(needData.msg);
                        }
                    })
                    .catch (err=>{
                        this.$Message.error('网络请求失败');
                    })
            },
            //状态筛选
            selectChange(val){
                val = val=='all' ? '':val;
                this.getList(val);
            },
            //查看表格
            clickTable(item){
                if(item.table_data=='1'){
                    location.href="/v1/recruit/download-table-data?template_id="+item.template_id+"&uid="+this.uid;
                }else {
                    this.$Message.error(item.table_data_reason)

                }
            },
            //查看附件
            clickFile(item){
                console.log(item);
                if(item.download_file=='1'){
                    location.href="/v1/recruit/download-material?template_id="+item.template_id+"&uid="+this.uid
                }else {
                    this.$Message.error(item.download_file_reason)
                }
            },
            //点击列表的人员
            clickRow(item){
                let that = this;
                let qs = require("qs");
                return
                this.axios({
                        method:'post',
                        url:'/v1/recruit/member-check-material',
                        data:qs.stringify({
                            uid:item.id,
                            step_id:item.step_id
                        }),
                    })
                    .then( res=>{
                        let needData= res.data;
                        if(needData.code=='200'){
                            that.uid = item.id;
                            that.step_id=item.step_id;
                            that.key_field.name=needData.data.key_field.name;
                            that.key_field.date=new Date(needData.data.key_field.value);

                            if(item.check_status=='1'){
                                that.isShowBtn=false;
                            }else{
                                that.isShowBtn=true;
                            }



                            that.material=needData.data.material;

                        }else{
                            this.$Message.error(needData.msg);
                        }
                    })
                    .catch (err=>{
                        this.$Message.error('网络请求失败');
                    })
            },
            //退回理由
            reason(item){
                let that = this;
                console.log(item);
                this.$router.push({name:'returnReason',params:{uid:item.id,step_id:item.step_id,}});
            },
            //点击左侧树的事件
            reflashList(item){
                let that = this;
                let qs = require("qs");
                let  check_status = this.state=='all' ? '':this.state;
                that.dept_id=item.id;
                this.axios({
                        method:'post',
                        url:'/v1/recruit/member-check-list',
                        data:qs.stringify({
                            dept_id:that.dept_id,
                            check_status:check_status,
                            keyword:that.searchString,
                            page_number:'1',
                            page_size:'10',
                            opt:'1'
                        }),
                    })
                    .then( res=>{
                        let needData= res.data;
                        if(needData.code=='200'){
                            needData.data.forEach(item=>{
                                if (item.check_status=='0'){
                                    item.status_label='待审核';
                                }else if(item.check_status=='1'){
                                    item.status_label='已通过';
                                }else if(item.check_status=='-1'){
                                    item.status_label='已退回';
                                }

                                if (item.sex=='1'){
                                    item.sex_label='男';
                                }else if(item.sex=='2'){
                                    item.sex_label='女';
                                }
                            })
                            that.memberList = needData.data;
                        }else{
                            this.$Message.error(needData.msg);
                        }
                    })
                    .catch (err=>{
                        this.$Message.error('网络请求失败');
                    })
            },
            search(){
                console.log('init');
                //状态
                let  check_status = this.state=='all' ? '':this.state;
                let that = this;
                let qs = require("qs");
                this.axios({
                        method:'post',
                        url:'/v1/recruit/member-check-list',
                        data:qs.stringify({
                            dept_id:that.dept_id,
                            check_status:check_status,
                            keyword:that.searchString,
                            page_number:'1',
                            page_size:'10',
                            opt:'1'
                        }),
                    })
                    .then( res=>{
                        let needData= res.data;
                        if(needData.code=='200'){
                            needData.data.forEach(item=>{
                                if (item.check_status=='0'){
                                    item.status_label='待审核';
                                }else if(item.check_status=='1'){
                                    item.status_label='已通过';
                                }else if(item.check_status=='-1'){
                                    item.status_label='已退回';
                                }

                                if (item.sex=='1'){
                                    item.sex_label='男';
                                }else if(item.sex=='2'){
                                    item.sex_label='女';
                                }
                            })
                            that.memberList = needData.data;
                            that.lists = res.data.data
                            if (res.data.data.length==0){that.$Message.info('搜索无结果')}
                        }else{
                            this.$Message.error(needData.msg);
                        }
                    })
                    .catch (err=>{
                        this.$Message.error('网络请求失败');
                    })
            },
            getList(check_status){
                let status = check_status || '';

                let that = this;
                let qs = require("qs");
                this.axios({
                        method:'post',
                        url:'/v1/recruit/member-check-list',
                        data:qs.stringify({
                            dept_id:that.dept_id,
                            check_status:status,
                            keyword:that.searchString,
                            page_number:'1',
                            page_size:'10',
                            opt:'1'
                        }),
                    })
                    .then( res=>{
                        let needData= res.data;
                        if(needData.code=='200'){
                            needData.data.forEach(item=>{
                                if (item.check_status=='0'){
                                    item.status_label='待审核';
                                }else if(item.check_status=='1'){
                                    item.status_label='已通过';
                                }else if(item.check_status=='-1'){
                                    item.status_label='已退回';
                                }

                                if (item.sex=='1'){
                                    item.sex_label='男';
                                }else if(item.sex=='2'){
                                    item.sex_label='女';
                                }
                            })
                            that.memberList = needData.data;
                        }else{
                            this.$Message.error(needData.msg);
                        }
                    })
                    .catch (err=>{
                        this.$Message.error('网络请求失败');
                    })
            }
        },
        mounted() {
            this.getList('')
        },
        watch :{
            '$route' (to, from) {
              this.search();
            },
        }
    }
</script>
<style scoped>

    .default{
        background-color: transparent !important;
        color: #e1330e !important;
    }
    .ivu-table:after{
        width: 0 !important;
        background-color:transparent;
    }
    .layout-content{margin: 16px 30px 30px;}
    .content-padding{
        padding: 0;}
    .ivu-table:after{
        width: 0 !important;
    }
    table{ border-collapse: collapse;text-align: center;width: 100%;color: #333;font-family: "微软雅黑"; border: 1px solid #e2e2e2;}
    table thead{line-height: 40px;background: #F8F8F9;font-weight: normal;}
    table thead {border-bottom: 1px solid #e9eaec;border-top: 1px solid #e9eaec;}
    table thead th{font-weight: bold;background: #f2f2f2;}
    table tbody tr{line-height: 48px;height: 48px;border-bottom: 1px solid #e9eaec;;color: #333;box-sizing: border-box}
    table tbody tr:hover{background-color: #EBF7FF}
    table tbody tr.drag:hover{background-color: #eee;cursor: move}
    table tbody td,table thead th{ border-right:1px solid #e9eaec;}
    table tbody td span{display: inline-block;margin-right: 10px;cursor: pointer}
    table tbody td span:hover{color: #d73826}

    .ivu-btn.ivu-btn-text.ivu-btn-small.disable{
        color: #bbbbbb !important;
    }
</style>
