<!--工作岗位新增的弹窗-->
<template>
    <div>
        <Modal
          v-model="modal1"
          :title="title"
          width="950"
          :loading="loading"
          :mask-closable="false"
          class-name="vertical-center-modal"
          @on-ok="ok"
          @on-cancel="cancel">
          <div class="swich-bar">
            类型：
            <RadioGroup v-model="fromType">
              <Radio label="inner">
                  <span>选择内部人员</span>
              </Radio>
              <Radio label="outer">
                  <span>选择外部人员</span>
              </Radio>
            </RadioGroup>
          </div>
          <div class="modal-container">
            <div class="inner-box clearfix" v-if="fromType == 'inner'">
              <div class="tree-box">
                选择党组织
                <div class="box-border">
                  <subpartytree ref="subpartytree" url="/v1/trees/get-dept-info" :params="treeParam" :istips="false" @reflashList="reflashList"></subpartytree>
                </div>
              </div>
              <div class="member-box">
                选择党员
                <div class="box-border">
                  <RadioGroup v-if="memberList.length > 0" v-model="selectPerson" vertical>
                    <Radio v-for="item in memberList" :label="item.id" :key="item.id">
                        <span>{{item.real_name}}</span>
                    </Radio>
                  </RadioGroup>
                  <div v-else>
                    {{ emptytxt }}
                  </div>
                </div>
              </div>
            </div>
            <div class="outer-box" v-if="fromType == 'outer'">
              <div class="search-content start-box box-align box-flex">
                  居民身份证号：<Input v-model="searchString" placeholder="请输入身份证号查询" :style="{'display':'block', 'width':'35%','marginRight':'10px'}"></Input><Button type="primary" @click="search">查询</Button>
              </div>
              <div :style="{'padding': '8px 0'}">
                查询结果：
              </div>
              <Table highlight-row :no-data-text="tableTxt"  border :columns="tableModel" :data="lists"></Table>
            </div>
          </div>
        </Modal>
    </div>
</template>
<script>
import subpartytree from '@/components/subpartytree.vue'
export default {
    name:'addadmin',
    props : {
        title : {
            type : String,
            default : '新增人员'
        }
    },
    components : {
        subpartytree
    },
    data () {
        let _this = this;
        return {
            modal1: true,//是否显示弹窗
            loading: true,
            fromType: 'inner',
            nodeSelect: this.selectNode,
            radiosObj: {},
            treeParam : {
              dept_id : this.$route.params.dept ? this.$route.params.dept : ''
            },
            memberList : [],
            selectPerson : '',
            emptytxt : '请选择一个党支部',
            searchString : '', // 120222199104234010
            searchResult : [],

            //表单header
            tableModel: [{
                title : '操作',
                isshow: true,
                width: 65,
                align: "center",
                    render(h, params){
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
                            [h('Radio', {
                                class: {
                                    'radio-check': true
                                },
                                props: {
                                    size: 'large',
                                    value: _this.radiosObj['items' + params.row._index]
                                },
                                on: {
                                    'on-change': (val) => {
                                        event.stopPropagation()
                                        _this.changeRadio(val, params);
                                    }
                                },
                                nativeOn: {
                                    click(){
                                        event.stopPropagation()
                                    }
                                }
                            }),
                        ]);
                    }
                },
                {
                    title: '姓名',
                    key: 'real_name',
                    isshow: true,
                    sortable: true,
                },
                {
                    title: '所属党组织',
                    key: 'branch_name',
                    isshow: true,
                    sortable: true,
                },
                {
                    title: '联系方式',
                    key: 'mobile',
                    isshow: true,
                    sortable: true,
                }
            ],
            tableTxt: '暂无数据',
            //表单数据
            lists: []
        }
    },
    methods: {
        fetchMember(id, isfresh){
            return this.axios({
                method: 'get',
                url: '/v1/member/list',
                params: {
                dept_id: id,
                opt: isfresh ? 1 : 0,
                }
            })
        },
        cancel () {
            this.goback();
        },
        changeRadio(val, params) {
            let that = this;
            for(let i in that.radiosObj) {
                that.$set(that.radiosObj, i, false);
            }

            that.$set(that.radiosObj, 'items'+params.row._index, true);
            that.selectPerson = params.row.id;
            //  this.$store.state.checkPearson={uid:that.selectPerson.uid,real_name:that.selectPerson.real_name,mobile:that.selectPerson.mobile}
            this.$store.state.checkPearson={uid:params.row.id,real_name:params.row.real_name,mobile:params.row.mobile}
        },
        ok() {
            //console.log(this.$store.state.checkPearson);
            if (this.selectPerson == ''){
                this.$Message.error("请选择一名党员")
                this.loading = false;
                setTimeout(() => {
                    this.loading = true;
                }, 20);
                return;
            }

            if(this.$route.name == 'adminconfigadd'){
                let qs = require('qs')
                this.axios({
                    method: 'post',
                    url: '/v1/auth-manage/add',
                    data: qs.stringify({
                        dept_id: this.$route.params.dept,
                        uid: this.selectPerson
                    })
                })
                .then( res => {
                    if (res.data.code == 200) {
                        this.$Message.success("添加成功");
                        this.$router.push({
                            name : 'adminconfiglist',
                            params: {
                              dept: this.$route.params.dept
                            }
                        });
                    }
                    else {
                        this.$Message.error(res.data.msg);
                        this.loading = false;
                        setTimeout(() => {
                            this.loading = true;
                        }, 20);
                    }
                })
                .catch(error => {
                    this.$Message.error("SERV ERR");
                    this.loading = false;
                    setTimeout(() => {
                        this.loading = true;
                    }, 20);
                    console.log(error);
                });
            } else {
                if (this.fromType == 'outer') {
                    this.goback();
                    return
                } else {
                    this.memberList.forEach(item=>{
                        if(item.id == this.selectPerson) {
                            let obj = {uid:this.selectPerson,real_name:item.real_name,mobile:item.mobile};
                            this.$store.commit('setCheckPearson', obj)
                        }
                    })
                    this.goback();
                }
            }
        },
        reflashList(item, isfresh){
            let _this = this;
            let nodeType = parseInt(item.data.type_icon);
            this.memberList = [];
            this.selectPerson = '';
            // if (nodeType > 6 || nodeType < 5) {
            if (nodeType == 5){
                _this.emptytxt = '暂无数据';
                this.fetchMember(item.id, true).then(res => {
                    if (res.data.code == 200) {
                        _this.memberList = res.data.data
                    };
                })
                .catch(err => {
                    console.log(err);
                    this.$Message.error('网络请求异常');
                });
                return
            }
            else {
                _this.emptytxt = '请选择一个党支部';
            }
        },
        search(){
            let that = this;
            if (this.searchString.trim() == '') {
                this.$Message.error("请输入身份证号");
                return
            };
            this.axios({
                method:'get',
                url:'/v1/member/idcard-detail',
                params:{
                    id:that.searchString
                }
            })
            .then( res => {
                let needData = res.data;
                if(needData.code ='200'){
                    that.lists = [];
                    that.radiosObj = {};
                    needData.data.forEach((item, index) => {
                        that.lists.push(item);
                        that.radiosObj['items'+item.index] = false;
                    });
                    console.log(that.lists, that.radiosObj);
                }
                else {
                    this.$Message.error(res.data.msg);
                }
            })
        }
    },
    mounted(){
        // 加载顶级人员数据
        let _this = this;
        this.fetchMember(this.$route.params.dept, true).then(res => {
           if (res.data.code == 200) {
               _this.memberList = res.data.data
           };
        })
        .catch(err => {
           console.log(err);
           this.$Message.error('网络请求异常');
        });
    }
}
</script>
<style scoped>
.swich-bar{
    margin-bottom: 8px;
}
.box-border{
    box-sizing: border-box;
    border: 1px solid #e2e2e2;
    height: 390px;
    border-radius: 4px;
    overflow: auto;
}
.tree-box{
    width: 660px;
    float: left;
}
.member-box{
    width: 240px;
    float: right;
}
.modal-container{
    height: 391px;
}
.member-box .box-border{
    padding:  8px;
}
</style>
