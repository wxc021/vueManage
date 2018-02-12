<template>
    <div class="app-main" :style="{'width':'100%','height':'100%'}">
        <div class="layout  start-box box-orient" :style="{'width':'100%','height':'100%'}">
            <!-- 头部 -->
            <top></top>
            <Row type="flex" class="box-flex">
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
                <i-col span="19" class="start-box box-orient">
                    <!-- 表单主结构 -->
                    <div class="layout-content box-flex" style="position:realtive;">
                        <div class="content-padding">
                            <!-- 搜索和过滤 -->
                            <div class="search-filter start-box box-align">
                                <div class="search-content" style="width: 100%;">
                                    <Button type="ghost" @click="introduce">补开介绍信</Button>
                                    <Button type="ghost" style="margin-right: 5px;" @click="remove">删除</Button>
                                    <span>开具日期：</span>
                                    <DatePicker type="date" v-model="startDate" placeholder="选择开具日期" style="width: 150px"></DatePicker>
                                    <span style="margin: 0 3px;">至</span>
                                    <DatePicker type="date"  v-model="endDate"  placeholder="选择开具日期" style="width: 150px"></DatePicker>
                                    <Input v-model="searchString"  @on-keyup.enter="searchbar" placeholder="姓名/身份证号/手机号" :style="{'width':'20%','marginLeft':'10px'}">
                                    </Input>
                                    <Button type="primary" style="background: #d73826;color:#fff;margin-left: 6px;height: 32px;"  @click="searchbar">查询</Button>
                                </div>
                            </div>
                            <Table
                                :style="{'marginTop':'20px', 'height':'calc(100% - 92px)', 'height': '-webkit-calc(100% - 92px)'}"
                                border
                                :columns="headers"
                                :data="lists"
                                stripe
                                highlight-row
                                @on-row-click="goDetail"
                                ></Table>
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
    import subNav from '@/components/subNav.vue'
    import Info from '@/components/infoDetail/info.vue'

    export default {
        name: 'orgManage',
        data() {
            return {
                url: '/v1/trees/search-list',
                openitem: [],
                radiosObj: {},
                openlist: [],
                currentnode: '',
                searchString: '',
                slideBar: false,
                startDate: '',
                endDate: '',
                //表单header
                headers: [
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
                        title: '姓名',
                        key: 'real_name',
                        isShow: true,
                        sortable: true,
                    },
                    {
                        title: '介绍信编码',
                        key: 'letter_no',
                        sortable: true,
                        isShow: true,
                    },
                    {
                        title: '开具日期',
                        key: 'createdt',
                        sortable: true,
                        isShow: true,
                    },
                    {
                        title: '目标党组织',
                        key: 'destination',
                        sortable: true,
                        isShow: true,
                    },
                ],
                //表单数据
                lists: [],
                remberId: '', //记住点击的列
                remberRow: {} //单选按钮选中的值
            }
        },
        computed: {
            isRef() {
                return this.$store.state.strictRefalsh;
            },
            ishis() {
                return this.$store.state.isHistory;
            },
        },
        watch: {
            isRef(newD, oldD) {
                if (newD != oldD) {
                    this.getList(this.$store.state.remberId, 1, '');
                };
            },
        },
        components: {
            top,
            Slide,
            Info
        },
        methods: {
            setStr(val) {
                return val > 9 ? val : '0'+val;
            },
            getDate(obj) {
                if (obj == '') {
                  return  '';
                } else {
                  return obj.getFullYear()+'-'+( this.setStr( obj.getMonth()+1 ) )+'-'+this.setStr(obj.getDate());
                }
            },
            changeRadio(val, params) {
                let that = this;
                for(let i in that.radiosObj) {
                    that.$set(that.radiosObj, i, false);
                }
                that.$set(that.radiosObj, 'items'+params.row.id, true);
                this.remberRow = Object.assign({}, params);
                this.currentnode = params.row['id'];
            },
            introduce() {
                this.$router.push({name:'interviewpop',params:{id: this.$store.state.remberId,switchs: 0}});
            },
            remove() {
                let that = this;
                let qs = require('qs');
                if (!this.remberRow.row) {
                    this.$Message.error('请勾选需要删除介绍信');
                    return;
                } else {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>您确定要删除该介绍信吗？</p>',
                        onOk: () => {
                            this.axios({
                                method: 'post',
                                url: '/v1/introletter/del',
                                data: qs.stringify({
                                    id: this.remberRow.row['id']
                                })
                            })
                            .then(res => {
                                let needData = res.data;
                                if (needData.code == 200) {
                                    that.$Message.success('删除成功');
                                    that.getList(that.$store.state.remberId,1, '');
                                } else {
                                    that.$Message.error(needData.msg);
                                }
                            })
                            .catch(err => {
                                that.$Message.error('网络请求异常');
                            })
                        },
                        onCancel: () => {

                        }
                    });

                }
            },
            goDetail(row,index) {
              let ids = row.id;
              console.log(ids);
              this.$router.push({name:"interviewnext",query:{id:ids,interState:"1"}});



            },
            slideDown() {
                console.log('jieshu')
            },
            //search
            searchbar() {
                let that = this;
                let qs = require('qs');
                this.getList(that.$store.state.remberId, 1, that.searchString)
            },
            // tree emit events（events up）
            reflashList(item) {
                this.lists = [];
                this.getList(item.id, 1, '')
            },
            // main list
            getList(id, type, key) {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'post',
                    url: '/v1/introletter/list',
                    data: qs.stringify({
                        dept_id: id,
                        time_begin: this.getDate(this.startDate),
                        time_end: this.getDate(this.endDate),
                        keyword: key ? key : '',
                        opt: type ? type : 0,
                    })
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.lists = [];
                        let tempObj = {};
                        needData.data.forEach(item => {
                            that.lists.push(item);
                            tempObj['items'+item.id] = false;
                        });
                        that.radiosObj = Object.assign({}, tempObj);
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            getnode(node) {
                // console.log(node)
            },
        },
        created() {

        },
        mounted() {
            this.getList('', 1, '')
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
    .slides-enter, .slides-leave-to
    {
      transform: translateX(800px);
      opacity: 0;
    }
</style>
