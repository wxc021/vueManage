<template>
  <div class="content-padding">
      <!-- 搜索和过滤 -->
      <div class="search-filter start-box box-align">
          <div class="search-content start-box box-align box-flex">
              <Input v-model="searchString" placeholder="请输入党组织名称" :style="{'display':'block', 'width':'35%','marginRight':'10px'}"></Input>
              <Button type="primary" @click="slidebar">查询</Button>
          </div>
          <div class="set-config">
              <Select v-model="model10" multiple style="width:260px">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="ghost" :style="{'background':'#fff'}" >刷新</Button>
              <Button type="ghost" :style="{'background':'#fff'}">导出excel</Button>
          </div>
      </div>
      <Table :style="{'marginTop':'20px'}" border :columns="headers" :data="lists"></Table>
      <div :style='{"textAlign": "center", "marginTop": "20px"}'>
         <Page v-show="total>6" size="small" :total="parseInt(total)" :page-size="parseInt(pags)" @on-change="goPage"></Page>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'table',
    data() {
        return {
            searchString: '',
            cityList: [
                {
                    value: 'beijing',
                    label: '北京市'
                },
                {
                    value: 'shanghai',
                    label: '上海市'
                },
                {
                    value: 'shenzhen',
                    label: '深圳市'
                },
                {
                    value: 'hangzhou',
                    label: '杭州市'
                },
                {
                    value: 'nanjing',
                    label: '南京市'
                },
                {
                    value: 'chongqing',
                    label: '重庆市'
                },
            ],
            model10: [],
            soltname: 'mainContent',
            page_index: 1,
            page_size: 6,
            total: 0,
            pags: 6,
            //表单header
            headers: [
                {
                    title: '标题',
                    key: 'title',
                },
                {
                    title: '创建时间',
                    key: 'ct',
                },
                {
                    title: '状态',
                    key: 'status',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: params.row.sta == 0 ? 'warning' : 'ghost',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px', 
                                },
                                on: {
                                    click: (e) => {
                                        this.stopUse(e, params)
                                    }
                                }
                            }, params.row.sta == 0 ? '停用' : '启用'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.eidt(params, params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            //表单数据
            lists: [],
        }
    },
    computed: {
    },
    watch: {
        '$route' (to, from) {
            if (to.name === 'sigleVideo') {
                this.page_index = 1;
                this.lists = [];
                this.getList();
            };
        }
    },
    components: {
        // Frame,
        top,
        Slide,
        tags
    },
    methods: {
        slidebar() {
            this.$router.push({name:'test',params:{text: 'jxj'}})
        },
        getValue(value) {
            console.log(value);
        },
        stopUse(a,item) {
            let that = this
            ,index = item.index
            ,qs = require('qs');

            this.axios({
                method: 'post',
                url: '/v1/fm/stopfm',
                data: qs.stringify({'id': item.row['id']})
            })
            .then(res => {
                let needData = res.data;
                if (needData.code == 200) {
                    that.$Message.success('操作成功'); 
                    that.lists[index].sta = needData.data;
                } else {
                    that.$Message.error(needData.msg);
                }
            })
            .catch(err => {
                that.$Message.error('网络请求异常');
            }) 
        },
        eidt(item) {
            this.$router.push({path: '/cms/singleVideoAdd', query: {id: item.row.id}});
        },


        //删除视频
        remove(item) {
            let index = item.index;
            let qs = require('qs');
            let that = this;
            this.$Modal.confirm({
                title: '删除提示',
                content: '确认要删除？',
                onOk: () => {
                    this.axios({
                        method: 'post',
                        url: '/v1/fm/delfm',
                        data: qs.stringify({'id': item.row['id']})
                    })
                    .then(res => {
                        let needData = res.data;
                        if (needData.code == 200) {
                            that.$Message.success('删除成功');
                            that.lists.splice(index, 1);  
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
        //列表
        getList() {
            let that = this;
            let qs = require('qs');
            this.axios({
                method: 'get',
                url: '/v1/dept/list',
                params: qs.stringify({
                    dept_id: 68,
                    opt: 0
                })
            })
            .then(res => {
                let needData = res.data;
                if (needData.code == 200) {
                    needData.data.forEach(item => {
                        that.lists.push({
                            id: item.id,
                            title: item.title,
                            ct: item.createdt,
                            status: item.status == 0 ? '正常' : '停用',
                            sta: item.status == 0 ?  0 : 1,
                        });
                    });
                    that.total = needData.count_num;    
                } else {

                }
            })
            .catch(err => {
                this.$Message.error('网络请求异常');
            })    
        },
        goPage(p) {
            this.lists = [];
            this.page_index = p;
            this.getList();
        }

    },
    created() {
            
    },
    mounted() {             
        this.getList();
        console.log(789)
    },
  }
</script>
<style scoped>
</style>
