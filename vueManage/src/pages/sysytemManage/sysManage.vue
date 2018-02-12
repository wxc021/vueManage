<template>
    <div class="app-main" :style="{'width':'100%','height':'100%'}" @click="closeDefault">
        <div class="layout start-box box-orient" :style="{'width':'100%','height':'100%'}">
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
                                <div class="search-content start-box box-align box-flex">
                                    <Button type="ghost" @click="addManage">新增</Button>
                                    <Button type="ghost" @click="resetPassword">重置密码</Button>
                                    <Button type="ghost" @click="disable">禁用</Button>
                                    <Button type="ghost" @click="delUnit">删除</Button>
                                </div>
                            </div>
                            <Table
                                :style="{'marginTop':'20px', 'height':'calc(100% - 92px)', 'height': '-webkit-calc(100% - 92px)'}"
                                border
                                :columns="headers"
                                :data="lists"
                                stripe
                                highlight-row></Table>
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
<script type="text/ecmascript-6">
    import top from '@/components/top.vue'
    import Slide from '@/components/slide.vue'

    export default {
        name: 'unitManage',
        data() {
            return {
                url: '/v1/trees/list',
                openitem: [],
                openlist: [],
                currentnode: '',
                searchString: '',
                slideBar: false,
                social:['name', 'partycode', 'type', 'sec', 'items', 'endtime'],
                cityList: [
                    {
                        title: '姓名',
                        key: 'name',
                        disabled: true,
                    },
                    {
                        title: '身份证号',
                        key: 'partycode',
                        disabled: true,
                    },
                    {
                        title: '手机号',
                        key: 'type',
                        disabled: false,
                    },
                    {
                        title: '账号状态',
                        key: 'sec',
                        disabled: false,
                    },
                    {
                        title: '最后操作时间',
                        key: 'items',
                        disabled: false,
                    },
                ],
                soltname: 'mainContent',
                //表单header
                headers: [
                    {
                        title: '姓名',
                        key: 'name',
                        sortable: true,
                    },
                    {
                        title: '身份证号',
                        key: 'partycode',
                        sortable: true,
                    },
                    {
                        title: '手机号',
                        key: 'type',
                        sortable: true,
                    },
                    {
                        title: '账号状态',
                        key: 'sec',
                        sortable: true,
                    },
                    {
                        title: '最后操作时间',
                        key: 'items',
                        sortable: true,
                    },
                ],
                copyHeader:  [
                  {
                    title: '姓名',
                    key: 'name',
                    sortable: true,
                  },
                  {
                    title: '身份证号',
                    key: 'partycode',
                    sortable: true,
                  },
                  {
                    title: '手机号',
                    key: 'type',
                    sortable: true,
                  },
                  {
                    title: '账号状态',
                    key: 'sec',
                    sortable: true,
                  },
                  {
                    title: '最后操作时间',
                    key: 'items',
                    sortable: true,
                  },
                ],
                //表单数据
                lists: [],
                remberId: '', //记住点击的列
                remberRow: {}
            }
        },
        computed: {
            isRef() {
                return this.$store.state.strictRefalsh;
            },
            ishis() {
                return this.$store.state.isHistory;
            }
        },
        watch: {
            social(newD, oldD) {
                let that = this;
                if (newD.length > oldD.length) {
                    let oldSet = new Set(oldD);
                    let comp = newD.filter(v => {return !oldSet.has(v)});
                    let serArr = this.searchStr(comp[0], this.copyHeader, 'object');
                    let seri = this.searchStr(comp[0], this.copyHeader);
                    that.headers.splice(seri, 0, serArr);
                } else if(newD.length < oldD.length) {
                    let newSet = new Set(newD);
                    let comp = oldD.filter(v => {return !newSet.has(v)});
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
            }
        },
        components: {
            top,
            Slide,
        },
        methods: {
            //添加下级机构
            addManage() {
              this.$router.push({name:'addManage'})
            },
            //整建制转移
            resetPassword(){
              this.$Modal.confirm({
                title: '重置密码',
                content: '是否要重置此管理员密码',
                onOk: ()=>{
                  this.$Message.info('点击了确定');
                },
                onCancel: () => {
                  this.$Message.info('点击了取消');
                }
              });
            },
            //删除管理员
            delUnit(){
              this.$Modal.confirm({
                title: '删除管理员',
                content: '是否要删除此管理员',
                onOk: ()=>{
                this.$Message.info('点击了确定');
                },
                onCancel: () => {
                  this.$Message.info('点击了取消');
                 }
              });
            },
            //禁用管理员
            disable(){
              this.$Modal.confirm({
                title: '禁用管理员',
                content: '是否要禁用此管理员',
                onOk: ()=>{
                  this.$Message.info('点击了确定');
                },
                onCancel: () => {
                  this.$Message.info('点击了取消');
                }
              });
            },
            //排序
            sortUnit(){
              this.$router.push({name:'UnitSort'});
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
                    } else if(ser[i].key != str && i == (ser.length -1) ) {
                        return null;
                    }
                };
            },
            closeDefault() {
                if (this.$route.name == 'unit' || this.$route.name == 'group') {
                    this.$router.go(-1);
                };
            },
            eidt(item) {
                this.$router.push({path: '/cms/singleVideoAdd', query: {id: item.row.id}});
            },
            // tree emit events（events up）
            reflashList(item) {
                if (/^unit$/.test(this.$route.name)) {
                    this.$router.go(-1);
                }
                this.lists = [];
                this.getList(item.id, 1)
            },
            // main list
            getList(id, type) {
                let that = this;
                let qs = require('qs');
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
                    if (needData.code == 200) {
                        that.lists = [];
                        needData.data.forEach(item => {
                            that.lists.push(item);
                        });
                    } else {
                        that.$Message.error(needData.msg);
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
                 this.openlist = [798, 797, 792, 796];
            }

        },
        created() {

        },
        mounted() {
            this.getList(68);
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
