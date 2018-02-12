
<!--党小组人员分配弹窗-->
<template>
<div class="PartyGroupManage">
    <Modal v-model="modal1" title="党小组人员分配" width="950" :loading="loading" class-name='max-height vertical-center-modal' :mask-closable=false @on-ok="submit" @on-cancel="cancel">
        <Row>
            <!-- <Table border :columns="columns1" :data="data1"></Table> -->
            <div class="tabs">
                <table>
                    <thead>
                        <tr>
                            <th v-for="item in columns1">{{item.title}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in data1" v-if="groupList.length > 0">
                            <td>{{item.real_name}}</td>
                            <td>{{item.birthday}}</td>
                            <td>{{item.member_status}}</td>
                            <td>
                                <Select :clearable="false"  :transfer="true" clearable v-model="item.group_id" style="width:180px" @on-change="changeGroup(item)">
                                    <Option v-for="item in groupList"   :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </td>
                            <td>
                                <span :class="{active:item.is_leader==0}" @click="toggleGroupleader(item)">{{item.is_leader==0?"设为小组长":"取消小组长"}}</span>
                            </td>
                        </tr>
                        <tr v-if="groupList.length <= 0">
                            <td colspan="5">该支部尚未设立党小组，请到【党组织管理】中设置党小组后再进行此操作</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </Row>
    </Modal>
</div>
</template>
<script TYPE="text/ecmascript-6">
export default {
    name: 'DemocraticReview',
    data() {
        return {
            modal1: true, //是否显示弹窗
            loading: true,
            columns1: [{
                    title: '姓名',
                    key: 'name'
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
                    title: '所在党小组',
                    key: 'group_id'
                },
                {
                    title: '操作',
                    key: 'action',
                },
            ],
            groupList: [],
            data1: [],
            dept_id: this.$route.query.dept_id,
            type: this.$route.query.type,

        }
    },

    methods: {
        getList() {
            let that = this;
            that.axios({
                    url: '/v1/member/grp-list',
                    method: 'get',
                    params: {
                        dept_id: that.dept_id,
                        group: that.type == '5' ? "" : '1',
                    },
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.data1 = needData.data;
                    } else {
                        that.Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.Message.error('网络请求异常');
                })
        },
        getGroupList() {
            let that = this;
            that.axios({
                    url: '/v1/deptgroup/list',
                    method: 'get',
                    params: {
                        dept_id: that.dept_id,
                        group: that.type == '5' ? "" : '1',
                    },
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.groupList = needData.data;
                    } else {
                        that.Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.Message.error('网络请求异常');
                })
        },
        submit() {
            let that = this;
            let _data = {};
            if(that.groupList.length == 0){
                this.$router.push({
                    path: '/dangyuan/' + this.dept_id + '?type=' + this.type
                });
                return
            }
            let postData = Object.assign({},that.data1);
            for(let key in postData){

                postData[key]['group_id'] = postData[key]['group_id'] == '' ?  '0' : postData[key]['group_id'];
            }

            that.axios({
                    url: '/v1/member/assigngrp',
                    method: 'post',
                    params: {
                        dept_id: that.dept_id,
                        list: JSON.stringify(postData),
                        group: that.type == '5' ? "" : '1',
                    },
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.$Message.success('提交成功!');
                        this.$router.push({
                            path: '/dangyuan/' + this.dept_id + '?type=' + this.type
                        });
                    } else if (needData.code == 3006) {
                        that.$Message.error(needData.msg);
                        setTimeout(() => {
                            that.loading = false;
                            that.$nextTick(() => {
                                that.loading = true;
                            });
                        }, 1000);

                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })

        },
        toggleGroupleader(item) {
            if(item.group_id==0||!item.group_id){
                this.$Message.warning('请先选择党小组');
                return
            }
            console.log(item);
            
            if (item.is_leader == 0) {
                let num = item.group_id;
                this.data1.forEach(function(list) {
                    if (list.group_id == num) {
                        list.is_leader = 0;
                    }
                });
            };
            item.is_leader = item.is_leader == 1 ? '0' : '1';
        },
        changeGroup(item) {
            item.is_leader = '0';
        },
        cancel() {
            this.$router.push({
                path: '/dangyuan/' + this.dept_id + '?type=' + this.type
            });
        }
    },
    mounted() {
        this.getList();
        this.getGroupList();
    },
}
</script>
<style scoped>
td {
    padding: 0;
    margin: 0;
}

.tabs {
    margin-top: 10px;
    margin-left: 10px;
    user-select: none
}

.tabs table {
    border-collapse: collapse;
    text-align: center;
    width: 100%;
    color: #333;
    font-family: "微软雅黑";
    border: 1px solid #e2e2e2;
}

.tabs table thead {
    line-height: 40px;
    background: #F8F8F9;
    font-weight: normal;
}

.tabs table thead {
    border-bottom: 1px solid #e9eaec;
    border-top: 1px solid #e9eaec;
}

.tabs table thead th {
    font-weight: normal;
}

.tabs table tbody tr {
    line-height: 48px;
    height: 48px;
    border-bottom: 1px solid #e9eaec;
    ;
    color: #333;
    box-sizing: border-box
}

.tabs table tbody tr:hover {
    background-color: #EBF7FF
}

.tabs table tbody td,
.tabs table thead th {
    border-right: 1px solid #e9eaec;
}

.tabs table tbody td .active {
    color: #f07100
}

.tabs table tbody td span {
    cursor: pointer;
}
</style>

