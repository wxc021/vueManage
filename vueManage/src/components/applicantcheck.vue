<template>
    <div class="app-main" :style="{'width':'100%','height':'100%'}">
        <div class="layout  start-box box-orient" :style="{'width':'100%','height':'100%'}" @click="closeDefault">
            <!-- 头部 -->
            <top></top>
            <Row type="flex" class='setHeight'>
                <div class="check-form" @click="closeDefault">
                    <h3>当前检查党组织：<span style="color:red;">{{this.$route.query.name}}</span></h3>
                    <h4>校核结果</h4>
                    <Table 
                        border 
                        highlight-row 
                        :height="320"
                        :columns="resultHeader" 
                        :data="resultList"
                        @on-row-click="resultF"></Table> 
                    <h4>反查对照</h4>
                    <Table 
                        border 
                        highlight-row 
                        :height="320"
                        :columns="compareHeader" 
                        :data="compareList"
                        @on-row-click="compareF"></Table> 
                    <router-view></router-view>
                </div>
            </Row>
      </div>
      <right-slide ref="rightslide" :title="asideTitle" :show="rightSlide" :viewname="asideViewName"></right-slide>
    </div>
</template>
<script>
    import top from '@/components/top.vue'
    import rightSlide from '@/pages/applicantManage/aside.vue'
    export default {
        name: 'tables',
        data() {
            return {
                rightSlide : false,
                rightSlideTitle : '',
                asideTitle: '',
                asideViewName : null,       // 侧栏组件名称
                asideViewData: null,         // 向侧栏传递的数据
                resultHeader: [
                    {
                        type: 'index',
                        width: 80,
                        title: '序号',
                        align: 'center'
                    },
                    {
                        title: '简要提示',
                        key: 'err_title',
                    },
                    {
                        title: '数量',
                        key: 'count'
                    },
                    {
                        title: '错误提示',
                        key: 'err_msg',
                        render: function(h, params) {
                            return h('div',{
                                style: {
                                    color: 'red'
                                }
                            },[
                                h('p', params.row.err_msg)
                            ])
                        }
                    },
                ],
                resultList: [],
                compareHeader: [
                    {title: '姓名', key: 'real_name',"sortable": true,},
                    {title: '身份证号', key: 'idcard',"sortable": true,'width': 200},
                    {title: '年龄', key: 'age',"sortable": true,},
                    {title: '性别', key: 'sex',"sortable": true,},
                    {title: '民族', key: 'nation',"sortable": true,},
                    {title: '人员状态', key: 'member_status',"sortable": true,},
                    {title: '手机号码', key: 'mobile',"sortable": true,},
                    {title: '支部职务', key: 'duty_name',"sortable": true,},
                    {title: '信息完整度', key: 'intergrity',"sortable": true,},
                ],
                compareList: []
            }
        },
        computed: {
           
        },
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
                let routerName = to.name;
                let param = to.params;
                let _this = this;
                switch (routerName) {
                    case 'applicantcheck':
                        this.rightSlide = false;
                        break;
                    case 'applicantcheckinfo':
                        this.rightSlide = true;
                        this.asideViewName = 'memberInfo';
                        break;
                    default:
                      // statements_def
                        break;
                };
            }
        },
        components: {
            top,
            rightSlide
        },
        methods: {
            closeDefault() {
                console.log(this.$route.name)
                if (this.$route.name == 'applicantcheckinfo') {
                    this.$router.go(-1);
                };
            },
            ajax(url, type, data) {
                let qs = require('qs');
                return this.axios({
                    method: type,
                    url: url,
                    data: qs.stringify(data),
                    params: data
                })
            },
            resultF(row) {
                event.stopPropagation();
                this.compareList = Object.assign([], row.list);
            },
            compareF(row) {
                // this.asideTitle = row.
                event.stopPropagation();
                console.log(this.$route.name)
                if (this.$route.name === 'applicantcheck') {
                    console.log(456)
                    this.$router.push({
                        name:'applicantcheckinfo',
                        params:{
                            uid: row.id
                        },
                        query:{
                            name: this.$route.query.name
                        }
                    });
                } else {
                    this.$router.replace({
                        name:'applicantcheckinfo',
                        params:{
                            uid: row.id
                        },
                        query:{
                            name: this.$route.query.name
                        }
                    });
                }
                
            },
            //校核结果
            checkList() {
                this.ajax('/v1/validate/error-list','get', {
                    dept_id: this.$route.params['dept'],
                    type: 'apply'
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        needData.data.forEach((item, index) => {
                            let temp = {};
                            if (index == 0) {
                                temp = Object.assign({},item,{'_highlight': true})
                                this.resultList.push(temp);
                                this.compareList = Object.assign([], temp.list);
                            } else {
                                this.resultList.push(item); 
                            }
                        })
                    } else {
                        this.$Message.error(needData.msg);
                    }
                })
                .catch(res => {
                    this.$Message.error('网络请求异常');
                })
            }
        },
        created() {

        },
        beforeRouteUpdate (to, from, next) {            
            let _this = this;
            let isEditing = _this.$store.state.isEdit;
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
        mounted() {
            this.checkList();
        },
    }
</script>
<style scoped>
    .check-form {
        padding: 15px;
    }
    .check-form h4 {
        margin: 15px 0 6px 0;
    }
    .setHeight{
        overflow: auto;
    }
</style>
