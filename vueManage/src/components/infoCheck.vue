<template>
    <div class="app-main" :style="{'width':'100%','height':'100%'}" >
        <div class="layout  start-box box-orient" :style="{'width':'100%','height':'100%'}" @click="closeDefault">
            <!-- 头部 -->
            <top></top>
            <Row type="flex" class='setHeight'>
                <div class="check-form" @click="closeDefault">
                    <h3>当前检查党组织：<span style="color:red;">{{this.checkName}}</span></h3>
                    <h4>报表校核结果</h4>
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
                    
                </div>
            </Row> 
      </div>
      <transition name="slides">
       <router-view></router-view> 
    </transition>
    </div>
</template>
<script>
    import top from '@/components/top.vue'
	export default {
		name: 'tables',
		data() {
			return {
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
                    {title: '党支部名称', key: 'full_name',"sortable": true,},
                    {title: '党组织编码', key: 'partycode',"sortable": true,},
                    {title: '组织类型', key: 'type',"sortable": true,},
                    {title: '党组织书记', key: 'clerk',"sortable": true,},
                    {title: '信息完整度', key: 'intergrity',"sortable": true,},
                    {title: '本届届满日期', key: 'end_time',"sortable": true,},
                ],
                compareList: [],
                checkName: this.$route.query.name
			}
		},
        computed: {
           
        },
		watch: {

		},
        components: {
            top,
        },
		methods: {
            closeDefault() {
                if (this.$route.name == 'checkinfo' || this.$route.name == 'group') {
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
                event.stopPropagation();
                if (this.$route.query.type) {
                    this.$router.push({name:'checkinfo',params:{id: row.id,switchs: 0,title: row.full_name}, query: {type: this.$route.query.type}});
                } else {
                    this.$router.push({name:'checkinfo',params:{id: row.id,switchs: 0,title: row.full_name}, query: {type: row.type_icon}});
                }
            },
            //校核结果
            checkList() {
                this.ajax('/v1/validate/error-list','get', {
                    dept_id: this.$route.params['ids'],
                    type: 'dept'
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
		mounted() {
            this.checkList();
            console.log(this.$route)
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
