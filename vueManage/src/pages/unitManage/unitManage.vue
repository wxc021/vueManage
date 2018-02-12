<template>
    <div class="app-main" :style="{'width':'100%','height':'100%'}">
        <div class="layout start-box box-orient" :style="{'width':'100%','height':'100%'}">
            <!-- 头部 -->
            <top  @click="closeDefault"></top>
            <Row type="flex" class="box-flex">
                <!-- 侧边栏树结构 -->
                <i-col span="5" class="layout-menu-left" @click="closeDefault">
                    <Slide ref="slide"
                        @reflashList="reflashList"
                        @getnode="getnode"
                        @slideDown="slideDown"
                        :url="url"
                        :params="params"
                        :openitem="openitem"
                        :currentnode="currentnode"
                        :openlist="openlist"
                        unitType = '2'
                        :setStatus= "setStatus"
                        >
                    </Slide>
                </i-col>
                <i-col span="19" class="start-box box-orient">
                    <!-- 表单主结构 -->
                    <div class="layout-content box-flex" style="position:realtive;" @click="closeDefault">
                        <div class="content-padding">
                            <!-- 搜索和过滤 -->
                            <div class="search-filter start-box box-align">
                                <div class="search-content start-box box-align box-flex">
                                    <Button type="ghost" style='margin-right: 5px;' @click="addUnit">新增下级单位（部门）</Button>
                                    <Button type="ghost" style='margin-right: 5px;' @click="delUnit">删除单位（部门）</Button>
                                    <Button type="ghost" style='margin-right: 5px;' @click="sortUnit">排序</Button>
                                    <Button type="ghost" style='margin-right: 5px;' @click="UnitTransfer">整建制转移</Button>
                                    <!-- <Button type="ghost">信息校核</Button> -->
                                  <Dropdown trigger="click" placement="bottom-start" @on-click="pleaseWait">
                                    <Button type="ghost">查询统计 <Icon type="arrow-down-b"></Icon></Button>
                                    <DropdownMenu slot="list">
                                      <DropdownItem name="1">组合查询</DropdownItem>
                                      <DropdownItem name="2">一个党组织的组合统计</DropdownItem>
                                      <DropdownItem name="3">多个党组织的组合统计</DropdownItem>
                                    </DropdownMenu>
                                  </Dropdown>
                                </div>
                                <div class="set-config">
                                    <Select style="width:100px" placeholder="列表设置">
                                         <CheckboxGroup  v-model="social">
                                            <Checkbox v-for="item in cityList" :key="item.value" :label="item.key" :disabled="item.disabled" style="display:block;border-bottom: 1px solid #ddd; padding:3px 5px; margin-right:0px;"> {{item.title}} </Checkbox>
                                        </CheckboxGroup>
                                    </Select>
                                    <Button type="ghost" :style="{'background':'#fff'}" @click="reflash">刷新</Button>
                                    <!-- <Button type="ghost" :style="{'background':'#fff'}" @click="exportXLS">导出excel</Button> -->
                                </div>
                            </div>
                            <Table
                                :style="{'marginTop':'20px', 'height':'calc(100% - 92px)', 'height': '-webkit-calc(100% - 92px)'}"
                                border
                                :columns="headers"
                                :data="lists"
                                stripe
                                highlight-row
                                @on-row-click="goDetail"></Table>
                        </div>
                    </div>
                    <transition name="slides">
                        <Info v-if="slideBar"></Info>
                    </transition>

                    <transition name="slides">
                        <router-view :saveresult="controlSave"></router-view>
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
                controlSave: false,
                setStatus: {},
                url: '/v1/trees/org-trees',
                params:{
                    org_id : this.$route.params.dept ? this.$route.params.dept : ''
                },
                openitem: [],
                openlist: [],
                radiosObj: {},
                currentnode: '',
                searchString: '',
                slideBar: false,
                cityList: [
                    {
                        title: '单位/机构名称',
                        key: 'full_name',
                        disabled: true,
                    },
                    {
                        title: '类型',
                        key: 'org_type_desc',
                        disabled: true,
                    },
                    {
                        title: '隶属关系',
                        key: 'type_id_desc',
                        disabled: false,
                    },
                    {
                        title: '性质类别',
                        key: 'prop_id_desc',
                        disabled: false,
                    },
                    {
                        title: '所属行业',
                        key: 'belong_type_desc',
                        disabled: false,
                    },
                ],
                soltname: 'mainContent',
                copyHeader:  [
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
                        title: '单位/机构名称',
                        key: 'full_name',
                        isShow: true,
                        sortable: true,
                        width: 400
                    },
                    {
                        title: '类型',
                        key: 'org_type_desc',
                        isShow: true,
                        sortable: true,
                    },
                    {
                        title: '隶属关系',
                        key: 'type_id_desc',
                        isShow: true,
                        sortable: true,
                    },
                    {
                        title: '性质类别',
                        key: 'prop_id_desc',
                        isShow: true,
                        sortable: true,
                    },
                    {
                        title: '所属行业',
                        key: 'belong_type_desc',
                        isShow: true,
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
            '$route' (to, from) {
                if(from.name=='UnitQuery'){
                    let that = this;
                    that.lists = [];
                    let data = that.$store.state.combUnitData;
                    let tempObj = {};
                    data.forEach(item => {
                        that.lists.push(item);
                        tempObj['items'+item.id] = false;
                });
                    let ids = this.$store.state.remberId;
                    that.setSelect(ids)
                    that.radiosObj = Object.assign({}, tempObj);
                    console.log(that.lists);
                }
            },
        },
        components: {
            top,
            Slide,
        },
        methods: {
            changeRadio(val, params) {
                let that = this;
                for(let i in that.radiosObj) {
                    that.$set(that.radiosObj, i, false);
                }
                that.$set(that.radiosObj, 'items'+params.row.id, true);
                this.remberRow = Object.assign({}, params);
                this.currentnode = params.row['id'];
            },
            //添加下级机构
            addUnit() {
                // this.setStatus = Object.assign({}, {id: this.remberRow.row['id'], type: 1, data: {nid: 12345, type: 890, type_icon: 2} })
                // return;
                let that = this;
                if (this.$route.name === 'unit') {
                    return;
                };
                this.$router.push({name:'unitAdd',params:{unitState:"0"}})
            },
            //整建制转移
            UnitTransfer() {
                if (!this.remberRow.row) {
                    this.$Message.info('请勾选需要转移的单位');
                    return;
                };
                this.$router.push({name:'UnitTransfer', params:{name: this.remberRow.row['full_name'], id: this.remberRow.row['id']}})
            },
            //删除机构
            delUnit() {
                let qs = require('qs');
                let that = this;
                if (!this.remberRow.row) {
                    this.$Message.info('请勾选需要删除的单位');
                    return;
                };
                this.$Modal.confirm({
                    title: '删除机构',
                    content: '是否要彻底删除'+this.remberRow.row['full_name']+'单位',
                    onOk: () => {
                        this.axios({
                            method: 'post',
                            url: '/v1/org/delunit',
                            data: qs.stringify({
                                id: this.remberRow.row['id']
                            })
                        })
                        .then(res => {
                            let needData = res.data;
                            if (needData.code == 200) {
                                that.$Message.success('删除成功');
                                // that.getList(that.$store.state.remberId, 1);
                                that.searchId(that.remberRow.row['id'])
                                that.setStatus = Object.assign({}, {id: this.remberRow.row['id'], type: 2})
                            } else {
                                that.$Message.error(needData.msg);
                            }
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        })
                    },
                    onCancel: () => {

                    }
                });
            },
            searchId(id) {
                let that = this;
                this.lists.forEach((item, index) => {
                    if (id == item.id) {
                        that.lists.splice(index, 1);
                    };
                })
            },
            //排序
            sortUnit(){
              this.$router.push({name:'UnitSort'});
            },
            searchChange(item) {
              switch(parseInt(item)) {
                case 1: this.$router.push({name: 'UnitQuery', params: {}}); break;
              }
            },
            slideDown() {
                console.log('jieshu')
            },
            closeDefault() {
                if (this.$route.name == 'unit' || this.$route.name == 'group') {
                    this.$router.go(-1);
                };
            },
            //查看详情
            goDetail(row) {
                event.stopPropagation();
                if (this.$route.name !== 'unitManage') {
                    if (this.remberId == row.id) {
                        return;
                    };
                    this.$router.replace({name:'unit',params:{id: row.id,unitState:'1',full_name:row.full_name}})
                   this.remberId = row.id;
                } else {
                    this.remberId = row.id;
                    this.$router.push({name:'unit',params:{id: row.id,unitState:'1',full_name:row.full_name}})
                }
                this.$store.commit('setSlideBar', {'isShow': false, sliderow: row});
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
                this.remberRow = {};
            },
            setSelect(id) {
                this.lists.forEach(item => {
                    if (item.id == id) {
                        item._highlight = true;
                    } else {
                        item._highlight = false;
                    }
                })
            },
            // main list
            getList(id, type) {
                let that = this;
                let qs = require('qs');
                if(that.$store.state.remberId=='1'){
                  return ;
                }
                this.axios({
                    method: 'get',
                    url: '/v1/org/unitlist',
                    params: {
                        org_id: id ? id :that.$store.state.remberId,
                        opt: type ? type : 0,
                    }
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
                        let ids = this.$store.state.remberId;
                        that.setSelect(ids)
                        that.radiosObj = Object.assign({}, tempObj);
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
            },
            reflash() {
              this.getList();
            },
            // exportXLS(){
            //     window.open('/v1/dept/export?dept_id=' + ids);
            // }
            pleaseWait(item){
                switch(item){
                    case '1':
                        /*if (!this.remberRow.row) {
                            this.$Message.info('请勾选需要查询的单位');
                            return;
                        };*/
                        this.$router.push({name:'UnitQuery'});
                        break;
                }

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
            //this.getList();
            console.log(this.$store.state.remberId);

            this.$store.commit('setEdit', {isDisable: false});
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
