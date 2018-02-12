<template>
    <div class="app-main" :style="{'width':'100%','height':'100%'}" >
        <div class="layout  start-box box-orient" :style="{'width':'100%','height':'100%'}">
            <!-- 头部 -->
            <top></top>
            <Row type="flex" class='setHeight'>
                <div class="check-form">
                    <h4>报表校核结果</h4>
                    <Table 
                        border 
                        highlight-row 
                        :columns="resultHeader" 
                        :data="resultList"
                        :height="320"
                        @on-row-click="resultF"></Table> 
                    <h4>反查对照</h4>
                    <Table 
                        border 
                        highlight-row 
                        :columns="compareHeader" 
                        :data="compareList"
                        :height="320"
                        @on-row-click="compareF"></Table> 
                </div>
            </Row>
      </div>
      <right-slide :title="asideTitle" :show="rightSlide" :viewname="asideViewName"></right-slide>
    </div>
</template>
<script>
    import top from '@/components/top.vue'
    import rightSlide from '@/pages/dangyuanManage/aside.vue'

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
                        
                        title: '统计报表名称',
                        key: 'report_name',
                    },
                    {   
                        width: 100,
                        title: '审核类型',
                        key: 'check_type'
                    },
                    {
                        width: 100,
                        title: '左边值',
                        key: 'operand_left'
                    },
                    {   
                        
                        title: '关系',
                        key: 'logic_desc'
                    },
                    {
                        width: 100,
                        title: '右边值',
                        key: 'operand_right'
                    },
                    {
                        width: 100,
                        title: '结果',
                        key: 'result',
                    },
                    {
                        width: 100,
                        title: '备注',
                        key: 'mark'
                    }
                ],
                resultList: [
                ],
                compareHeader: [
                    {title: '党支部名称', key: 'full_name'},
                    {title: '党组织编码', key: 'partycode'},
                    {title: '姓名', key: 'real_name',width: 150},
                    {title: '身份证号', key: 'idcard', width: 180,},
                    {title: '年龄', key: 'age', width:80},
                    {title: '性别', key: 'sex', width:80},
                    {title: '民族', key: 'nation', width:80},
                ],
                compareList: [],
                remberStr: '',
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
                console.log(routerName)
                switch (routerName) {
                    case 'membercheck':
                        this.rightSlide = false;
                        break;
                    case 'membercheckinfo':
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
            resultF(row) {
                this.getDetail(row.rule, this.$route.params.type);
            },
            compareF(row) {
                if (this.remberStr == 'member') {
                    // this.$router.push({
                    //     name:'membercheckinfo',
                    //     params:{
                    //         uid: row.id
                    //     }
                    // });
                    this.$router.push({
                        name: 'membercheckinfo',
                        params: {
                            uid: row.id,
                            dept: this.$route.params.id
                        },
                        query : {
                            tab: "baseinfo"
                        }
                    });
                } else if(this.remberStr == 'dept') {
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
                } else {
                    this.$router.replace({name:'unit',params:{id: row.id,unitState:'1',full_name:row.full_name}})
                }
                // this.$router.push();
            },
            getList() {
                this.ajax('post', '/v1/report/error-list', {
                    dept_id: this.$route.params.id ? this.$route.params.id : this.$store.remberId,
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                       this.resultList = Object.assign([], needData.data);
                       this.resultList.forEach(item => {
                            item.result = '错误';
                       })
                       if (this.resultList.length) {
                            let rule = this.resultList[0].rule;
                            let type = this.$route.params.type;
                            this.getDetail(rule, type);
                            this.resultList[0] = Object.assign(this.resultList[0], {_highlight: true})
                       };
                    } else {
                       this.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            getDetail(rule, type) {
                this.ajax('post', '/v1/report/reverse-check', {
                    dept_id: this.$route.params.id ? this.$route.params.id : this.$store.remberId,
                    type_id: type,
                    year: '2017',
                    rule: rule,
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        this.remberStr = needData.data.type;
                        if (this.remberStr == 'member') {
                            this.compareHeader = [
                                {title: '党支部名称', key: 'full_name'},
                                {title: '党组织编码', key: 'partycode'},
                                {title: '姓名', key: 'real_name'},
                                {title: '身份证号', key: 'idcard'},
                                {title: '年龄', key: 'age'},
                                {title: '性别', key: 'sex'},
                                {title: '民族', key: 'nation'},
                            ];
                        } else if(this.remberStr == 'dept') {
                            this.compareHeader = [
                                {
                                    title: '党组织名称',
                                    key: 'name',
                                },
                                {
                                    title: '党组织代码',
                                    key: 'partycode',
                                },
                                {
                                    title: '组织类别',
                                    key: 'type',
                                },
                                {
                                    title: '党组织书记',
                                    key: 'sec',
                                },
                                {
                                    title: '信息完整度',
                                    key: 'newInter',
                                },
                                {
                                    title: '本届届满日期',
                                    key: 'end_time',
                                }
                            ];
                        } else {
                            this.compareHeader = [
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
                            ];
                        }
                        this.compareList = Object.assign([], needData.data.info);
                    } else {
                       this.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            }
		},
		created() {

		},
		mounted() {
            console.log(this.$route)
            this.getList();
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
    .setHeight {
        overflow-y: scroll;
    }
</style>
