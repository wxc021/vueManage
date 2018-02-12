<template>
    <div class="app-main" :style="{'width':'100%','height':'100%'}">
        <div class="layout start-box box-orient" :style="{'width':'100%','height':'100%'}">
            <!-- 头部 -->
            <top></top>
            <Row type="flex" class="box-flex">
                <!-- 侧边栏树结构 -->
                <i-col span="4" class="layout-menu-left">
                    <Slide ref="slide" 
                        @reflashList="reflashList" 
                        @getnode="getnode"
                        @slideDown="slideDown"
                        :url="url"
                        :loadUrl="url"
                        :openitem="openitem"
                        :currentnode="currentnode"
                        :openlist="openlist"
                        :params="ps"
                        :params2="ps2"
                        :change="change"
                        :doing="isDo"
                        :verify="classify"
                        >
                    </Slide>
                </i-col>
                <i-col span="20" class="start-box box-orient">
                    <!-- 筛选结构 -->
                    <subNav @allControl="fromControl"  :lockstatus="isTrue" :verify="classify"></subNav>
                    <!-- 表单主结构 -->
                    <div class="content-padding start-box box-flex">
                        <div class="form-slides start-box box-orient">
                            <div class="slides-top start-box box-pack">
                                <Select style="width:125px;margin-right:10px;" :placeholder="default1" v-model="classify" @on-change="typeF">
                                    <Option v-for="item in classifyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                                <Select v-model="cityModel" style="width:125px" :placeholder="default2" @on-change="collectionF">
                                     <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </div>
                            <div class="slides-content box-flex">
                                <ul class="slide-list">
                                    <li class="item" v-for="(item, index) in paperList" :key="item.id" :class="{'item-active': item.active}" @click="goDetail(item, index)">{{item.label}}</li>
                                </ul>
                                <p style="text-align:center; margin-top:30px;" v-show="!paperList.length">暂无数据</p>
                            </div>
                        </div>
                        <div class="form-table box-flex" style="position:realtive;overflow:auto;">
                            <router-view :orders="orders" :remberData="remberData" :setNull="setNull" :verify="classify" @doSome="doSome" @setDoing = 'setDoing'></router-view>
                        </div>
                    </div>
                </i-col>
            </Row>
        </div>
        <pop :controls="controls" :datas="paperList" :titles="titles" :tips="tips" :froms="froms" :typevalue="typevalue" @cancel="cancel"></pop>

    </div>
</template>
<script>
    import top from '@/components/top.vue'
    import Slide from '@/components/slide.vue'
    import subNav from './nav.vue'
    // import tbs from '@/components/tables/tables2.vue'
    import pop from '@/components/pop/countMore.vue'
    export default {
        name: 'countForm',
        data() {
            return {
                ps: {
                    dept_id: '',
                    type_id: 1,
                    year: '2017'
                },
                isDo: true,
                ps2:{dept_id:'68',statement_id:'27'},
                change: '0',
                isTrue: false,
                froms: 0,
                setNull: false,
                titles: '直统多表',
                tips: '',
                controls: false,
                orders: {},
                typevalue: '',
                classify: 1,
                classifyList: [],
                default1:'',
                default1Id: '',
                default2: '',
                default2Id: '',
                url: '/v1/trees/report',
                openitem: [],
                openlist: [],
                currentnode: '',
                searchString: '',
                cityList: [],
                cityModel:'',
                model1: '',
                paperList: [
                        // {label: '封面', active: true, id: 1, path: 'form1'}, 
                        // {label: '2表：党员基本情况', active: false, id: 2,path: 'form2'},
                        // {label: '3表：党员入党时间', active: false, id: 3,path: 'form3'},
                        // {label: '4表：党员学历情况', active: false, id: 4,path: 'form4'},
                        // {label: '23表：城市街道、社区（居委会）、社会组织发展党员工作情况', active: false, id: 23,path: 'form23'},
                        // {label: '24表：党的基层组织数量情况和换届情况', active: false, id: 24,path: 'form24'},
                        // {label: '25表：街道、社区（居委会）、乡镇、建制村法人单位建立党的基层组织情况', active: false, id: 25,path: 'form25'},
                        // {label: '26表：公有经济控制的企业法人单位建立党的基层组织情况', active: false, id: 26,path: 'form26'},

                    ]
            }
        },
        computed: {
            remberData() {
                return {
                    remberType: this.default1Id,
                    remberYear: this.default2Id
                }
            }
        },
        watch: {
            '$route' (to, from) {
                // this.$store.commit('setStatus', {stat: false}) 
                
            },
            'classify'(a, b) {
                if(a != b) {
                    this.changeurl(a);
                }
            }
        },
        components: {
            top,
            Slide,
            subNav,
            // tbs,
            pop
        },
        methods: {
            ajax(method, url, data) {
                let qs = require('qs');
                return method.toLowerCase() == 'post'  ? this.axios({
                    method: method,
                    url: url,
                    data: qs.stringify(data)
                }) : this.axios({
                    method: method,
                    url: url,
                    params: data,
                })
            },
            fromControl(item) {
                let that = this;
                this.orders = Object.assign({}, item);
                switch(parseInt(item.type)) {
                    //清空表
                    case 1: 
                        this.froms = 1;
                        if (item.value == 1) {
                            
                        } else if(item.value == 2) {
                            this.titles = '清空多表'
                            this.tips = '请选择你需要清空的报表'
                            this.controls = true;
                        }
                        break;
                    //报表直统
                    case 2:
                        this.froms = 2;
                        if (item.value == 1) {
                            
                        } else if(item.value == 2) {
                            this.titles = '直统多表'
                            this.tips = '请选择你需要直统的报表'
                            this.controls = true;
                        }
                        break;
                    //报表汇总
                    case 3: 
                        this.froms = 3;
                        if (item.value == 1) {

                        } else if(item.value == 2) {

                            this.titles = '汇总多表'
                            this.tips = '请选择你需要汇总的报表'
                            this.controls = true;
                            
                        } else if(item.value == 3) {

                        }
                        break;

                    //报表校核
                    case 4:
                        this.ajax('post', '/v1/report/check', {
                            dept_id: this.$route.query.id ? this.$route.query.id : this.$store.remberId,
                            type_id: this.default1Id,
                            year: '2017',
                            check: item.value,
                            form_id: this.classify === 4 ? this.$route.query.fid : this.$route.name.split('-')[1]
                        })
                        .then(res => {
                            let needData = res.data;
                            if (needData.code == 200) {
                               that.$Message.success('校核完成，未发现错误信息项');
                            } else {
                                let url = window.location.port ? window.location.hostname+':'+window.location.port : window.location.hostname;
                                let id = this.$route.query.id ? this.$route.query.id : this.$store.remberId;
                                window.open('http://'+url+'/#/checkForm/'+id+'/'+this.default1Id);
                            }
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        })
                        

                    break;
                    case 5: /*console.log('打印');*/ break;
                    case 6: /*console.log('导出');*/ break;
                    //上所解锁
                    case 7:              
                        let urls = item.value == 2 ? '/v1/report/lock' : '/v1/report/unlock';
                        let postData = {
                            dept_id: this.$store.state.remberId,
                            year: '2017',
                            type_id: this.default1Id,
                            form_id: this.classify === 4 ? this.$route.query.fid : this.$route.name.split('-')[1]
                        }
                        // this.isTrue = item.value == 1 ? false : true;
                        this.ajax('post', urls, postData)
                        .then(res => {
                            let needData = res.data;
                            if (needData.code == 200) {
                                that.$Message.success('操作成功');
                                this.change = this.$route.query.id ? this.$route.query.id : this.$store.remberId;
                                this.isTrue = !this.isTrue;
                            } else {
                                that.$Message.error(needData.msg);
                                this.change = this.$route.query.id ? this.$route.query.id : this.$store.remberId;
                            }
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        })
                        break;
                    //开始录改
                    case 8:
                        this.isTrue = !item.status;
                    break;
                    case 9:
                    break;
                    default: return;
                }
            },
            cancel() {
                this.controls = false;
            },
            doSome() {
                this.isTrue = !this.isTrue;
            },
            slideDown() {
            },
            setDoing(){
                this.isDo = !this.isDo;
            },
            //查看报表的详情
            goDetail(row, index) {
                if(this.isTrue) {
                    this.$Message.error('请先对正在操作的报表进行保存或取消录改操作');
                    return;
                }
                let that = this;
                event.stopPropagation();
                this.paperList.forEach(item => item.active = false)
                row.active = true;
                let qs = require('qs');
                this.axios({
                    method: 'post',
                    url: '/v1/report/detail',
                    data: qs.stringify({
                        year: '2017',
                        type_id: this.classify,
                        dept_id: this.$store.state.remberId,
                        form_id: row.id
                    })
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        localStorage.setItem('formData', JSON.stringify(needData.data));
                        if (this.classify === 4) {
                            this.$router.push({'name':'form-custom', params: {}, query:{id: that.$store.state.remberId, fid: row.id}});
                            //console.log(this.cityModel,row.id);
                            this.ps = {dept_id: '', statement_id:row.id}
                            this.isDo = !this.isDo;

                            this.axios.get('v1/statement/detail',{params: {id: row.id}})
                            .then((res)=>{
                                if(res.data.code ==200){
                                    if(res.data.data.lock==''){
                                        that.isTrue = false;
                                    }else{
                                        that.isTrue = true;
                                    }
                                }
                             });
                            console.log(that.isTrue);

                        } else  {
                            this.$router.push({'name':'form-'+(row.id), params: needData.data, query:{id: this.$store.state.remberId}}); 
                        }
                        
                    } else {
                        this.setNull = !this.setNull;
                        if (this.classify === 4) {
                            this.$router.push({'name':'form-custom', params: {}, query:{id: that.$store.state.remberId, fid: row.id}});
                            this.ps = {dept_id: this.cityModel, statement_id:row.id};
                            this.isDo = !this.isDo;
                        } else  {
                            this.$router.push({'name':'form-'+(row.id), params: needData.data, query:{id: this.$store.state.remberId}}); 
                        } 
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.$Message.error('网络请求异常');
                })
            },
            reflashList(item) {
                if(item.data.lock) {
                    this.isTrue = true;
                } else {
                    this.isTrue = false;
                }
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'post',
                    url: '/v1/report/detail',
                    data: qs.stringify({
                        year: '2017',
                        type_id: this.classify,
                        dept_id: this.$store.state.remberId,
                        form_id: this.classify === 4 ? this.$route.query.fid : this.$route.name.split('-')[1]
                    })
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        localStorage.setItem('formData', JSON.stringify(needData.data));
                        if (this.classify === 4) {
                            this.$router.push({'name':this.$route.name, params: needData.data, query:{id: that.$store.state.remberId, fid: this.$route.query.fid}});
                        } else  {
                            this.$router.push({'name':this.$route.name, params: needData.data, query:{id: this.$store.state.remberId}}); 
                        } 
                        
                    } else {
                        this.setNull = !this.setNull;
                        if (this.classify === 4) {
                            this.$router.push({'name':this.$route.name, params: needData.data, query:{id: that.$store.state.remberId, fid: this.$route.query.fid}});
                        } else  {
                            this.$router.push({'name':this.$route.name, params: needData.data, query:{id: this.$store.state.remberId}}); 
                        } 
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.$Message.error('网络请求异常');
                })
            },

            getnode(node) {
                // console.log(node)
            },
            reflash() {

            },
            getTypeList() {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'get',
                    url: '/v1/report/get-type-list',
                    params: {
                        opt: 0
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.classifyList = [];
                        needData.data.forEach(item => {
                            that.classifyList.push(item);
                        })
                        that.collectionList(that.classifyList[0].id);
                        that.default1 = that.classifyList[0].name;
                        that.default1Id = that.classifyList[0].id;
                        that.typevalue = that.classifyList[0].id;
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            collectionList(id) {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'get',
                    url: '/v1/report/get-sets-list',
                    params: {
                        type_id: id,
                        opt: 0
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        this.cityList = [];
                        needData.data.forEach(item => {
                            this.cityList.push(item) 
                        })
                        that.default2 = that.cityList[0].name;
                        that.default2Id = that.cityList[0].id;
                        that.getList(id, that.cityList[0].id);
                        // this.cityList = Object.assign([], needData.data)
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            //报表列表
            getList(id, ids) {
                if (!ids) {
                    return;
                };
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/report/get-form-list',
                    params: {
                        type_id: id,
                        set_id: ids,
                        //type_id:4,
                        opt: 1
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.paperList = [];
                        needData.data.forEach((item, index) => {
                            let temp = {};
                            temp.id = item.id;
                            if(that.classify == '4'){
                                temp.label = item.name;
                                temp.lock = item.lock;
                            }else {
                                temp.label = item.remark+"："+item.name;
                            }
                            temp.active = false;
                            temp.path = 'form'+(index+1);
                            that.paperList.push(temp)
                        })
                        this.$nextTick(() => {
                            let params = this.$route.name.split('-')[1];
                            if (params) {
                                this.paperList.forEach((item, index) => {
                                    item.active = false
                                    if(item.id == params) {
                                        that.paperList[index].active = true;
                                    }
                                })
                            };
                        })
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            typeF(val) {
                this.collectionList(val);
            },
            collectionF(val) {
                this.getList(this.classify, val)
            },
            //报表详情
            formDetail() {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'get',
                    url: '/v1/report/detail',
                    data: qs.stringity({
                        year: '2016',
                        type_id: this.classify,
                        dept_id: this.$store.state.remberId,
                        form_id: this.default2Id
                    })
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            changeurl(id) {
                if(id == 1) {
                    this.url = '/v1/trees/report';
                    this.ps = {
                        dept_id: '',
                        type_id: 1,
                        year: '2017'
                    }
                } else if(id == 4) {
                    this.url = '/v1/trees/report-design';
                    this.ps =  Object.assign({},{dept_id:'',statement_id:''});
                    this.ps =  {dept_id:'',statement_id:''};









                }
                
            }

        },
        created() {
                
        },
        mounted() {
            
            let that = this;
            this.getTypeList();

        },
    }
</script>
<style scope>
    .ivu-select-placeholder {
        color: #495060 !important;
    }
    .form-slides {
        width: 280px;
        border: 1px solid #dddee1;
    }
    .form-slides .slides-top {
        padding: 5px 10px;
        border-bottom: 1px solid #dddee1;
    }
    .slide-list .item {
        /*width: 200px;*/
        height: 40px;
        line-height: 40px;
        padding-left: 8px;
        background-color: #fff;
        border-bottom: 1px solid #dddee1;
        width: 100%;
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        cursor: pointer;
    }
    .slide-list .item.item-active {
        background: #edf7ff;
    }
    .slide-list .item:hover {
        background: #edf7ff;
    }
    .form-slides .slides-content {
        padding-bottom: 20px;
        background: #fff;
        overflow: auto;
    }
    .form-table {
        border: 1px solid #dddee1;
        margin-left: 6px;
        background: #fff;
    }
    .togoole-enter-active {
        transition: all 0.3s;
    }
    .togoole-leave-active {
        transition: all 0.3s;
    }
    .slides-enter-active {
      transition: all .3s ease;
    }
    .slides-leave-active {
      transition: all .8s ease;
    }
    .slides-enter, .slides-leave-to
    {
      transform: translateX(800px);
      opacity: 0;
    }
</style>