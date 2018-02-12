<template>
<div class="app-main" :style="{'width':'100%','height':'100%'}" @click="closeDefault">
    <div class="layout" :style="{'width':'100%','height':'100%'}">
        <!-- 头部 -->
        <top></top>
        <Row type="flex" class="setHeight">
            <!-- 侧边栏树结构 -->
            <i-col span="5" class="layout-menu-left">
                <Slide ref="slide" @reflashList="reflashList" @getnode="getnode" @slideDown="slideDown" :url="url" :openitem="openitem" :currentnode="currentnode" :openlist="openlist">
                </Slide>
            </i-col>
            <i-col span="19">
                <!-- 表单主结构 -->
                <div class="layout-content" style="position:realtive;">
                    <div class="content-padding">
                        <!-- 搜索和过滤 -->
                        <div class="search-filter start-box box-align">
                            <div class="search-content start-box box-align box-flex">
                                <Button type="error" style="height:32px;line-height:18px;" @click="partyOut">发起转出</Button>
                                <Button type="ghost"  style="background:#fff;height:32px;line-height:18px;margin-right: 10px;margin-left:10px;" @click="revokeEvent">撤销转出</Button>
                               <!--  <Select style="width: 100px; margin-right: 10px;" placeholder="发起时间" v-model="yearSelect">
                                    <Option v-for=" item in selectYear" :value="item" :key="item">{{ item }}年</Option>
                                </Select> -->
                                <div class="search-content start-box box-align box-flex" style="margin-top:-2px;">
                                    <Input v-model="searchString" @on-keyup.enter="search" :style="{'width':'30%','marginRight':'10px'}">
                                        <Button type="primary" style="height: 32px;line-height: 16px;border-radius:0 4px 4px 0px ;background: #d73826;color:#fff" slot="append" @click="search">查询</Button>
                                    </Input>
                                </div>
                            </div>
                        </div>
                        <Table :style="{'marginTop':'20px', 'height':'calc(100% - 52px)', 'height': '-webkit-calc(100% - 52px)'}" border :columns="headers" :data="lists" stripe highlight-row @on-row-click="goDetail">
                        </Table>
                    </div>
                </div>
                <transition name="slides">
                    <Info v-if="slideBar"></Info>
                </transition>

                <transition name="slides">
                    <router-view></router-view>
                </transition>
            </i-col>
        </Row>
    </div>
</div>
</template>

<script>
import top from '@/components/top.vue'
import Slide from '@/components/slide.vue'

export default {
    name: 'unitManage',
    data() {
        return {
            url: '/v1/trees/search-list',
            openitem: [],
            openlist: [],
            currentnode: '',
            searchString: '',
            slideBar: false,
            social: ['name', 'partycode', 'type', 'sec', 'items', 'endtime'],
            dateStart: '',
            soltname: 'mainContent',
            id: '',
            dept_id: this.$route.params.dept,
            // startYear : 2017,
            // yearSelect: '',
            //表单header
            headers: [{
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
                        }, [
                            h('Radio', {
                                class: {
                                    'radio-check': true
                                },
                                props: {
                                    size: 'large',
                                    value: this.radiosObj['items' + params.row.id]
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
                    key: 'real_name',
                    sortable: true,
                },
                {
                    title: '身份证号',
                    key: 'idcard',
                    sortable: true,
                    width: 200
                },
                {
                    title: '手机号码',
                    key: 'mobile',
                    sortable: true,
                },
                {
                    title: '状态',
                    key: 'status_desc',
                    sortable: true,
                    filters: [
                        {
                            label: '转出中',
                            value: '转出中'
                        },
                        {
                            label: '转入中',
                            value: '转入中'
                        },
                        {
                            label: '被驳回',
                            value: '被驳回'
                        }
                    ],
                    filterMethod (value, row) {
                        return row.status_desc==value;
                    }
                },
                {
                    title: '原党组织',
                    key: 'from_dept_name',
                    sortable: true,
                },
                {
                    title: '目标党组织',
                    key: 'to_dept_name',
                    sortable: true,
                }
            ],
            copyHeader: [{
                    title: '单位/机构名称',
                    key: 'name',
                    sortable: true,
                },
                {
                    title: '类型',
                    key: 'partycode',
                    sortable: true,
                },
                {
                    title: '隶属关系',
                    key: 'type',
                    sortable: true,
                },
                {
                    title: '性质类别',
                    key: 'sec',
                    sortable: true,
                },
                {
                    title: '所属行业',
                    key: 'items',
                    sortable: true,
                },
                {
                    title: '信息完整度',
                    key: 'endtime',
                    sortable: true,
                }
            ],
            //表单数据
            lists: [],
            remberId: '', //记住点击的列
            remberRow: {},
            radiosObj: {},
            status_desc_list:{
                to : ['转入中','转入完成','已驳回','已撤回'],
                from : ['转出中','转出完成','被驳回','被撤回'],
            },

        }
    },
    computed: {
        isRef() {
            return this.$store.state.strictRefalsh;
        },
        ishis() {
            return this.$store.state.isHistory;
        },
        selectYear(){
            let arr = [];
            let nowYear = new Date().getFullYear();
            for( let i=this.startYear; i <= nowYear; i++){
                arr.push(i);
            }
            return arr;
        }
    },
    watch: {
        social(newD, oldD) {
            let that = this;
            if (newD.length > oldD.length) {
                let oldSet = new Set(oldD);
                let comp = newD.filter(v => {
                    return !oldSet.has(v)
                });
                let serArr = this.searchStr(comp[0], this.copyHeader, 'object');
                let seri = this.searchStr(comp[0], this.copyHeader);
                that.headers.splice(seri, 0, serArr);
            } else if (newD.length < oldD.length) {
                let newSet = new Set(newD);
                let comp = oldD.filter(v => {
                    return !newSet.has(v)
                });
                let seri = this.searchStr(comp[0], this.headers);
                that.headers.splice(seri, 1);
            }
        },
        isRef(newD, oldD) {
            if (newD != oldD) {
                this.getList(this.$store.state.remberId, 1);
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
        yearSelect(newVal, oldVal){
            this.getList(this.dept_id, 1);
        },
        '$route' (to, from) {
            // 对路由变化作出响应...
            let routerName = to.name;
            let param = to.params;
            let query = this.$route.query
            let _this = this;
            switch (routerName) {
                case 'organizationManage':
                    this.rightSlide = false;
                    break;
                case 'organizationManageList':
                    this.rightSlide = false;
                    this.getList(param.dept, 1);
                    this.dept_id = param.dept;
                    break;
                default:
                    // statements_def
                    break;
            };
        }
    },
    components: {
        top,
        Slide,
    },
    methods: {
        tableCol() {
            return this.tableModel.filter((item) => {
                return item.isshow
            })
        },
        changeRadio(val, params) {
            let that = this;
            for (let i in that.radiosObj) {
                that.$set(that.radiosObj, i, false);
            }
            that.$set(that.radiosObj, 'items' + params.row.id, true);
            this.remberRow = Object.assign({}, params);
            this.id = params.row['id'];
        },
        addUnit() {
            let that = this;
            if (this.$route.name === 'unit') {
                return;
            };
            this.$router.push({
                name: 'unitNew'
            })
        },
        //撤销事件
        revokeEvent() {
            if (!this.id) {
                this.$Message.error('请选择要撤销的党员');
                return
            }
            this.$Modal.confirm({
                title: '撤销组织关系转接',
                content: '是否撤销该党员的组织关系转接流程',
                onOk: () => {
                    let that = this;
                    that.axios({
                            url: '/v1/relation/revoke',
                            method: 'get',
                            params: {
                                id: that.id,
                            },
                        })
                        .then(res => {
                            let needData = res.data;
                            if (needData.code == 200) {
                                that.getList(that.$route.params.dept, 1);
                            } else {
                                that.$Message.error(needData.msg);
                            }
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        })
                },
                onCancel: () => {
                    this.$Message.info('点击了取消');
                }
            });
        },
        slideDown() {
            console.log('jieshu')
        },
        searchStr(str, ser, returnType) {
            for (var i = 0; i < ser.length; i++) {
                if (ser[i].key == str) {
                    if (returnType == 'object') {
                        return ser[i];
                    } else {
                        return i;
                    }
                } else if (ser[i].key != str && i == (ser.length - 1)) {
                    return null;
                }
            };
        },
        closeDefault() {
            if (this.$route.name == 'unit' || this.$route.name == 'group') {
                this.$router.go(-1);
            };
        },
        //查看详情
        goDetail(row) {
            event.stopPropagation();
            this.remberId = row.id;
            this.$router.push({
                name: 'organization',
                params: {
                    id: row.id,
                    direction : row.direction,
                }
            })
            this.$store.commit('setSlideBar', {
                'isShow': false,
                sliderow: row
            });
        },
        search() {
            var _this = this;
            if (this.searchString.trim() == '') {
                this.$Message.warning('请输入需要查询的内容');
                return
            };
            if (this.$route.params.dept) {
                //this.tempLists = [].concat(this.lists);
                this.queryData(this.$route.params.dept, this.searchString,1).then(res => {
                        if (res.data.code == 200) {
                            _this.lists = res.data.data.list
                        };
                    })
                    .catch(err => {
                        this.$Message.error('网络请求异常');
                    });
            }
        },
        queryData(id, query, opt) {
            let _this = this;
            let param = Object.assign({
                dept_id: id,
                // year: _this.yearSelect,
                keyword: query.trim()
            }, {
                page_number: 1,
                page_size: 20,
                opt: 0
            }, opt);
            return this.axios({
                method: 'get',
                url: '/v1/relation/search',
                params: param
            })
        },
        reflashList(item) {
            let _this = this;
            this.currentNode = item;
            this.searchString = '';
            this.currentRow = null; // 清空当前所选的表格行
            let nodeType = parseInt(item.data.type_icon);
            this.$router.push({
                name: 'organizationManageList',
                params: {
                    dept: item.id
                },
                query: {
                    type: nodeType
                }
            });
        },
        // main list
        getList(id, type) {
            let _this = this;
            let qs = require('qs');
            this.axios({
                    method: 'get',
                    url: '/v1/relation/list',
                    params: {
                        dept_id: id,
                        // year: _this.yearSelect,
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    if (res.data.code == 200) {
                        _this.lists = res.data.data.list;
                        _this.lists.forEach(function(item) {
                           let index = item.status;
                           let key = item.direction;
                            console.log(item);
                            item['status_desc'] = _this.status_desc_list[key][index];
                        });
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
        //党员转出弹出层
        partyOut() {
            this.$router.push({
                name: 'partyOut'
            });
            // if (!this.dept_id) {
            //     this.$Message.warning('请选择党组织');
            //     return
            // } else {
            //     this.$router.push({
            //         name: 'partyOut'
            //     });
            // }

        }

    },
    created() {

    },
    mounted() {
        this.getList(this.dept_id, 1);
    },
}
</script>

<style scoped>
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

.slides-enter,
.slides-leave-to {
    transform: translateX(800px);
    opacity: 0;
}

.box {
    margin-left: 20px;
}
</style>
