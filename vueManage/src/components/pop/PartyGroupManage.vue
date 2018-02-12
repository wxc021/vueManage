
<!--党小组人员分配弹窗-->
<template>
  <div class="PartyGroupManage">
    <Modal
        v-model="modal1"
        title="党小组人员分配"
        width="950"
        :loading="loading"
        :mask-closable=false
        class-name="vertical-center-modal"
        @on-ok="submit"
        @on-cancel="cancel">
      <Row>
         <Table border :columns="columns1" :data="data1"></Table>
      </Row>
    </Modal>
  </div>
</template>
<script TYPE="text/ecmascript-6">
  export default {
    name:'DemocraticReview',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
         columns1: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '性别',
                    key: 'sex'
                },
                {
                    title: '出生日期',
                    key: 'birthday'
                },
                {
                    title: '人员状态',
                    key: 'status'
                },
                {
                    title: '所在党小组1',
                    key: 'group_num'
                },
                {
                    title: '党小组长',
                    key: 'group_leader',
                    render:(h,params) =>{
                        return h('div',
                            params.row.group_leader == 0?  '' : '组长'
                        );
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (h, params) => {
                        return h('div', [
                             h('Button', {
                                props: {
                                    type: params.row.group_leader == 0 ? 'ghost' : 'warning',
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
                            }, params.row.group_leader == 0 ? '设为小组长' : '取消小组长'),
                        ]);
                    }
                },
            ],
            data1: [
                    {
                        name: '王小明',
                        sex: '男',
                        birthday: '2014-11-26',
                        status : '正式党员',
                        group_num : '第一党小组',
                        group_leader : '0',
                    },
                    {
                        name: '王小明',
                        sex: '男',
                        birthday: '2014-11-26',
                        status : '正式党员',
                        group_num : '第一党小组',
                        group_leader : '1',
                    },
                    {
                        name: '王小明',
                        sex: '男',
                        birthday: '2014-11-26',
                        status : '正式党员',
                        group_num : '第一党小组',
                        group_leader : '1',
                    },
                    {
                        name: '王小明',
                        sex: '男',
                        birthday: '2014-11-26',
                        status : '正式党员',
                        group_num : '第一党小组',
                        group_leader : '0',
                    },
                ],

      }
    },

    methods: {
        getGroup(){
            let that = this;
            that.axios({
                url:'/v1/deptgroup/list',
                method:'get',
                params:{
                    dept_id : that.$store.state.remberNode.nid;
                },
            })
            .then(res=>{
                let needData = res.data;
                if (needData.code == 200) {
                    that.data1 = needData.data;
                } else {
                      that.Message.error(needData.msg);
                }
            })
            .catch(err=>{
                this.Message.error('网络请求异常');
            })
        },
        stopUse(a,item) {
           item.row.group_leader = item.row.group_leader==0? 1 : 0;
        },
        getList(){


        },
        cancel () {
           // this.$Message.info('点击了取消');
        }
    },
  }
</script>
