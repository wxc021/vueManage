<template>
    <div class="layout" :style="{'width':'100%','height':'100%'}">
        <div class="layout  start-box box-orient" :style="{'width':'100%','height':'100%'}">
            <!-- 头部 -->
            <top  @click="closeDefault"></top>
            <Row type="flex" class="setHeight">
                <!-- 侧边栏树结构 -->
                <i-col span="5" class="layout-menu-left">
                    <Slide ref="slide"
                        @reflashList="reflashList"
                        @getnode="getnode"
                        @slideDown="slideDown"
                        :url="url"
                        :openitem="openitem"
                        :currentnode="currentnode"
                        :openlist="openlist"
                        >
                    </Slide>
                </i-col>
                <i-col span="19" class="layout-right-container" style="overflow: hidden;">
                    <!-- 筛选结构 -->
                    <div class="layout-breadcrumb"  @click="closeDefault" style="height:45px;">
                        <subNav ref="subnav" :remberRow="remberRow"></subNav>
                    </div>
                    <!-- 表单主结构 -->
                    <div  class="layout-content" style="position:realtive;">
                        <div class="content-padding"  @click="closeDefault">
                            <!-- 搜索和过滤 -->
                            <div class="search-filter start-box box-align">
                                <div class="search-content start-box box-align box-flex">
                                    <Input v-model.trim="searchString"  @on-keyup.enter="searchbar" placeholder="请输入党组织名称" :style="{'display':'block', 'width':'35%','marginRight':'10px'}"></Input>
                                    <Button type="error" style="height: 32px;line-height: 16px;" @click="searchbar">查询</Button>
                                </div>
                                <div class="set-config">
                                    <Select v-show="!remberGroup" style="width:100px" placeholder="列表设置">
                                         <CheckboxGroup  v-model="social">
                                            <Checkbox v-for="item in cityList" :key="item.value" :label="item.key" :disabled="item.disabled" style="display:block;border-bottom: 1px solid #ddd; padding:3px 5px; margin-right:0px;"> {{item.title}} </Checkbox>
                                        </CheckboxGroup>
                                    </Select>
                                    <Button type="ghost" :style="{'background':'#fff'}" @click="reflash">刷新</Button>
                                    <Button type="ghost" :style="{'background':'#fff'}" @click="exportXLS">导出excel</Button>
                                </div>
                            </div>
                            <Table
                                :style="{'marginTop':'20px', 'height':'calc(100% - 100px)', 'height': '-webkit-calc(100% - 100px)'}"
                                border
                                :row-class-name="rowClassName"
                                :columns="headers"
                                :data="lists"
                                stripe
                                highlight-row
                                @on-row-click="goDetail"
                                v-if="!remberGroup"></Table>
                            <Table
                                :style="{'marginTop':'20px', 'height':'calc(100% - 100px)', 'height': '-webkit-calc(100% - 100px)'}"
                                border
                                :columns="groupHeader"
                                :data="groupList"
                                stripe
                                highlight-row
                                @on-row-click="groupDetail"
                                v-if="remberGroup"></Table>
                            <div :style='{"textAlign": "center", "marginTop": "20px"}'>
                               <Page v-show="total>6" size="small" :total="parseInt(total)" :page-size="parseInt(pags)" @on-change="goPage"></Page>
                            </div>
                        </div>
                    </div>
                    <transition name="slides">
                        <Info v-if="slideBar" :saveresult="controlSave"></Info>
                    </transition>

                    <transition name="slides">
                        <router-view :saveresult="controlSave"></router-view>
                    </transition>
                </i-col>
            </Row>
        </div>
        <check-loading ref="checkloading" @on-cancel="cancelCheck"></check-loading>
        <ex ref="ex" :isShow="isShow" @fromsub="commitF" :postData="postData" :urls="urls" :countnumber="number"></ex>
    </div>
</template>
<script>
    import top from '@/components/top.vue'
    import Slide from '@/components/slide.vue'
    import subNav from '@/components/subNav.vue'
    import Info from '@/components/infoDetail/info.vue'
    import checkLoading from '@/components/checkLoading.vue'
    import ex from './export.vue'
    export default {
        name: 'orgManage',
        data() {
            return {
                number: 5,
                url: '/v1/trees/list',
                urls: '/v1/dept/export',
                postData: {},
                isShow: false,
                controlSave: false,
                rnode: {},
                openitem: [],
                radiosObj: {},
                openlist: [],
                currentnode: '',
                searchString: '',
                slideBar: false,
                remberGroup: false,
                isSearch: false,
                cityList: [
                    {
                        title: '党组织名称',
                        key: 'pinyin_name',
                        disabled: true,
                        render: (h, params) => {
                            if (this.isSearch) {
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
                                                //this.locationTree(params.row);
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
                        title: '党组织代码',
                        key: 'partycode',
                        disabled: true,
                    },
                    {
                        title: '组织类别',
                        key: 'type',
                        disabled: false,
                    },
                    {
                        title: '班子成员',
                        key: 'team_name',
                        disabled: false,
                    },
                    // {
                    //    title: '党组织书记',
                    //    key: 'sec',
                    //    disabled: false,
                    // },
                    {
                       title: '本届届满日期',
                       key: 'end_time',
                       disabled: false,
                    },
                    // {
                    //    title: '信息完整度',
                    //    key: 'newInter',
                    //    disabled: false,
                    // },
                    {
                        title: '本届班子当选日期',
                        key: 'start_time',
                        disabled: false
                    },
                ],
                soltname: 'mainContent',
                page_index: 1,
                page_size: 6,
                total: 0,
                pags: 6,
                groupHeader: [
                    {
                        title: '选择',
                        align: 'center',
                        width: 65,
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
                        title: '党小组名称',
                        key: 'name',
                        sortable: true,
                        width:200,
                        render: (h, params) => {
                            if (this.isSearch) {
                                return h('div',
                                    [params.row.name,
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
                                                event.stopPropagation();
                                                this.locationTree(params.row);
                                            }
                                        }
                                    },'定位')])
                            }
                            else {
                                return params.row.name
                            }
                        }
                    },
                    {
                        title: '党组织代码',
                        key: 'code',
                        sortable: true,
                    },
                    {
                        title: '建立日期',
                        key: 'adddate',
                        sortable: true,
                    },
                ],
                groupList: [],
                //表单header
                copyHeader: [
                    {
                        title: '选择',
                        align: 'center',
                        width: 65,
                        isShow: true,
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
                        title: '党组织名称',
                        key: 'pinyin_name',
                        width:380,
                        isShow: true,
                        sortable: true,
                        sortMethod:function(a,b,type){
                            if(type=='asc'){
                                return a > b;
                            }else if(type=='desc'){
                                return b > a;
                            }
                        },
                        render: (h, params) => {
                            if (this.isSearch) {
                                return h('div',
                                    [params.row.name,
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
                                                event.stopPropagation();
                                                this.locationTree(params.row);
                                            }
                                        }
                                    },'定位')])
                            }
                            else {
                                return params.row.name
                            }
                        }
                    },
                    {
                        title: '党组织代码',
                        key: 'partycode',
                        sortable: true,
                        isShow: true,
                    },
                    {
                        title: '组织类别',
                        key: 'type',
                        sortable: true,
                        isShow: true,
                    },
                    {
                        title: '班子成员',
                        key: 'team_name',
                        sortable: true,
                        isShow: true,
                    },
                    // {
                    //    title: '党组织书记',
                    //    key: 'sec',
                    //    sortable: true,
                    //    isShow: true,
                    // },
                    {
                        title: '本届班子当选日期',
                        key:'start_time',
                        sortable: true,
                        disabled: true,
                        isShow:true
                    },
                    {
                       title: '本届届满日期',
                       key: 'end_time',
                       sortable: true,
                       isShow: true,
                       render: (h, params) => {
                            let [int, str] = [parseInt(params.row.expire_days), ''];
                            let color =  (int < 0 && int >= -90) ? '#f07100' : int < 0 ? '#e04129' : '';
                            str =  (int < 0 && int >= -90) ? '('+parseInt
                                (Math.abs(int))+'天后)' : int < 0 ? '(已超期)' : '';

                            return h('div',{
                                style: {
                                    color: color
                                }
                            },[
                                h('p', params.row.end_time+str)
                            ])
                       }
                    },
                    // {
                    //    title: '信息完整度',
                    //    key: 'newInter',
                    //    sortable: true,
                    //    isShow: true,
                    // },
                    

                ],
                //表单数据
                lists: [],
                remberId: '', //记住点击的列
                remberRow: {}
            }
        },
        computed: {
            getType() {
                return this.$store.state.flashType;
            },
            isRef() {
                return this.$store.state.strictRefalsh;
            },
            ishis() {
                return this.$store.state.isHistory;
            },
            headers() {
                return this.copyHeader.filter(item => {return item.isShow})
            },
            social: {
                get() {
                    return this.headers.map(item => {return item.key})
                },
                set(val) {
                    this.copyHeader.forEach(item => {
                        if (val.indexOf( item.key ) != -1) {
                            item.isShow = true
                        } else {
                            item.isShow = false
                        }
                    })
                }
            }
        },
        watch: {
            getType(newD, oldD) {
                if (newD == 1) {
                    this.getList(this.$store.state.remberId, 0);
                } else if (newD == 2) {
                    this.getGrouplist(this.$store.state.remberId, 0);
                }
            },
            '$route' (to, from) {
              //this.remberRow = {}; // 路由切换清除记录的信息,如果不清除在切换路由后仍会记录上一次选中(radio)的记录
                if(from.name=='CombinationQuery'){
                    if(this.$store.state.combinatorQueryData.length==0)return
                    let that = this;
                    let listData = this.$store.state.combinatorQueryData;
                    that.lists = [];
                    let tempObj = {};
                    listData.forEach(item => {
                        item.newInter = Math.round((parseInt(item.items) / parseInt(item.integrity)) * 100) + '%';
                        that.lists.push(item);
                        tempObj['items' + item.id] = false;
                    })
                    that.radiosObj = Object.assign({}, tempObj);
                }
            },
            isRef(newD, oldD) {
                if (newD != oldD) {
                    if (this.$store.state.flashType2 == 1) {
                        this.getList(this.$store.state.remberId, 0);
                    } else {
                        this.getGrouplist(this.$store.state.remberId, 0);
                    }
                };
            },
            ishis(v) {
                if (v) {
                    this.$nextTick(function() {
                       $('.gobalhidden').show();
                    })
                } else {
                    this.$nextTick(function() {
                       $('.gobalhidden').hide();
                    })
                }
            },
        },
        components: {
            // Frame,
            ex,
            top,
            Slide,
            subNav,
            Info,
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
            locationTree(rowData) {
                let that = this;
                event.stopPropagation();
                this.openlist = [];
                rowData.location.forEach( function(item, index) {
                    this.openlist.push(item)
                }, this);
            },
            changeRadio(val, params) {
                let that = this;
                for(let i in that.radiosObj) {
                    that.$set(that.radiosObj, i, false);
                }
                that.$set(that.radiosObj, 'items'+params.row.id, true);
                this.remberRow = Object.assign({}, params);
                this.currentnode = params.row['id'];
                this.$store.commit('setId',{id: params.row['id']})
                this.$store.commit('setNode',{data: params.row})
            },
            rowClassName (row, index) {
                return row.deleteflag != 0 ? (this.ishis ? 'gobalhidden gobalcomm' : 'gobalhidden') : '';
            },
            slideDown() {
                let that = this;
                this.currentnode = '';
                this.$nextTick(function() {
                    that.currentnode = that.openlist[that.openlist.length-1];
                });
            },
            searchStr(str, ser, returnType) {
                for (var i = 0; i < ser.length; i++) {
                    if (ser[i].key == str) {
                        return returnType == 'object' ? ser[i] : i;
                    } else if(ser[i].key != str && i == (ser.length -1) ) {
                        return null;
                    }
                };
            },
            closeDefault() {
                if (this.$route.name == 'info' || this.$route.name == 'group') {
                    this.$router.go(-1);
                };
            },
            //查看详情
            goDetail(row) {
                event.stopPropagation();
                if (this.$route.name !== 'orgManage') {
                    if (this.remberId == row.id) {
                        return;
                    };
                    this.$router.replace({
                        name:'info',
                        params:{
                            id: row.id,
                            switchs: 0
                        },
                        query : {
                            type : row.type_icon,
                            del: row.deleteflag > 0 ? 1 : 0
                        }
                    });
                   this.remberId = row.id;
                } else {
                    this.remberId = row.id;
                    this.$router.push({
                        name:'info',
                        params:{
                            id: row.id,
                            switchs: 0
                        },
                        query : {
                            type : row.type_icon,
                            del: row.deleteflag > 0 ? 1 : 0
                        }
                    });
                }
                this.$store.commit('setSlideBar', {'isShow': false, sliderow: row});
            },
            groupDetail(row) {
                event.stopPropagation();
                if (this.$route.name !== 'orgManage') {
                    if (this.remberId == row.id) {
                        return;
                    };
                   this.$router.replace({name:'group',params:{id: row.id}})
                } else {
                    this.$router.push({name:'group',params:{id: row.id}})
                }
                this.remberId = row.id;
                this.$store.commit('setSlideBar', {'isShow': false, sliderow: row});
            },
            //search
            searchbar() {
                let that = this;
                let qs = require('qs');
                let transliteration = require('transliterations');
                if (that.searchString == '') {
                    that.$Message.error('请输入搜索关键字');
                    return;
                    that.getList(that.$store.state.remberId, 1);
                };
                this.isSearch = true;
                this.axios({
                    method: 'get',
                    url: '/v1/dept/search-list',
                    params: {
                        dept_id: that.$store.state.remberId,
                        keyword: that.searchString,
                        opt: 1
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.lists = [];
                        that.radiosObj = {};
                        needData.data.forEach(item => {
                            item.newInter = Math.round( (parseInt(item.items) / parseInt(item.integrity))*100 )+'%';
                            that.lists.push(item);
                        that.lists.pinyin_name = transliteration.slugify(item.name).split('-').map(function(item) {return item[0]}).join('').toUpperCase();

                        that.radiosObj['items1'+item.id] = false;
                        });
                        that.remberRow = Object.assign({}, {});
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            eidt(item) {
                this.$router.push({path: '/cms/singleVideoAdd', query: {id: item.row.id}});
            },
            // tree emit events（events up）
            reflashList(item) {
                this.rnode = Object.assign({}, item.data);
                if (/group/.test(this.$route.name) || /info/.test(this.$route.name)) {
                    this.$router.go(-1);
                };
                if (this.ishis) {
                    this.$nextTick(function() {
                        $('.gobalhidden').show();
                    })
                } else {
                    this.$nextTick(function() {
                        $('.gobalhidden').hide();
                    })
                }
                //判断是否是党小组
                if (item.data.type_icon == 6) {
                    this.remberGroup = true
                    this.groupList = []
                    this.$router.replace({name: 'orgManage',params:{ids: item.id}});
                    this.getGrouplist(item.id, 0)
                } else {
                    this.$router.replace({name: 'orgManage',params:{ids: item.id}});
                    this.lists = [];
                    this.getList(item.id, 0)
                    this.remberGroup = false
                }

                // this.$store.commit('setHistory',{satate: false})
            },
            setSelect(who, id) {
                if (who) {
                    this.lists.forEach(item => {
                        if (item.id == id) {
                            item._highlight = true;
                        } else {
                            item._highlight = false;
                        }
                    })
                } else {
                    this.groupList.forEach(item => {
                        if (item.id == id) {
                            item._highlight = true;
                        } else {
                            item._highlight = false;
                        }
                    })
                }
            },
            // main list
            getList(id, type) {
                this.isSearch = false;
                let that = this;
                let qs = require('qs');
                let transliteration = require('transliterations');
                this.axios({
                    method: 'get',
                    url: '/v1/dept/list',
                    params: {
                        dept_id: id,
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    //拼音转化模块

                    if (needData.code == 200) {
                        that.lists = [];
                        let tempObj = {};
                        needData.data.forEach(item => {
                            item.newInter = Math.round( (parseInt(item.items) / parseInt(item.integrity))*100 )+'%';
                            item._highlight = false;
                            that.lists.push(item);
                            tempObj['items'+item.id] = false;
                            that.lists.pinyin_name = transliteration.slugify(item.name).split('-').map(function(item) {return item[0]}).join('').toUpperCase();
                        });
                        let ids = this.$route.params.ids;
                        if (ids == 0) {
                            ids = this.$store.state.remberId;
                        };
                        that.setSelect(true, ids)
                        that.radiosObj = Object.assign({}, tempObj);
                        that.remberRow = Object.assign({}, {});

                    } else {
                        // that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            // group list
            getGrouplist(id, type) {
                let that = this;
                let qs = require('qs');
                that.groupList = [];
                this.axios({
                    method: 'get',
                    url: '/v1/dept/dept-group-list',
                    params: {
                        dept_id: id,
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        let tempObj = {};
                        needData.data.forEach(item => {
                            item._highlight = false;
                            that.groupList.push(item);
                            tempObj['items'+item.id] = false;
                        });
                        that.radiosObj = Object.assign({}, tempObj);
                        let ids = this.$route.params.ids;
                        if (ids == 0) {
                            ids = this.$store.state.remberId;
                        };
                        that.setSelect(false, ids)
                        that.remberRow = Object.assign({}, {});

                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            goPage(p) {
                this.lists = [];
                this.page_index = p;
            },
            getnode(node) {
                // console.log(node)
            },
            reflash() {
                if (this.rnode.type_icon == 6) {
                    this.getGrouplist(this.$store.state.remberId, 1);
                } else {
                    this.getList(this.$route.params.ids, 1)
                }
            },
            exportXLS() {
                // let ids = this.$route.params.ids;
                // if (ids == 0) {
                //     ids = this.$store.state.remberId;
                // };
                // window.open('/v1/dept/export?dept_id=' + ids+'&opt=0');
                // this.isShow = true;
                this.vajax('/v1/dept/expchoose', {})
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
                // this.isShow = true;
                if (this.isShow) {
                    this.isShow = false;
                    this.$nextTick(() => {
                        this.isShow = true;
                    })
                } else {
                    this.isShow = true;
                } 
            },
            commitF() {
                this.isShow = false;
            },
            cancelCheck(){
                this.$refs['subnav'].cancelCheck();
            }
        },
        beforeRouteUpdate (to, from, next) {
            if (this.$store.state.isEdit) {
                this.$Modal.confirm({
                    title: '提示',
                    content: '<p>是否保存修改？</p>',
                    onOk: () => {
                        this.controlSave = !this.controlSave;
                        setTimeout(function() {
                            next();
                        }, 300)
                    },
                    onCancel: () => {
                        this.$store.commit('setEdit', {isDisable: false});
                        next();
                    }
                });
            } else {
                next();
            }
        },
        created() {

        },
        mounted() {
            let that = this;
            this.$on('just', function(res) {
                that.lists = [];
                let tempObj = {};
                res.data.forEach(item => {
                    item.newInter = Math.round( (parseInt(item.items) / parseInt(item.integrity))*100 )+'%';
                    that.lists.push(item);
                    tempObj['items'+item.id] = false;
                });
                that.radiosObj = Object.assign({}, tempObj);
            });
            if (this.$route.params.ids) {
               this.getList(this.$route.params.ids, 0);
            } else {
               this.getList(this.$store.state.remberId, 0);
            }

           this.$nextTick(() => {
                this.$store.commit('setEdit', {isDisable: false});
                this.$store.commit('setHistory',{satate: false})
           })
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
    .content-padding{
        box-sizing: border-box;
    }
    .content-padding .ivu-table-body{
        overflow-x: hidden;
    }
    .gobalhidden {
        color: rgb(204, 204, 204);
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
