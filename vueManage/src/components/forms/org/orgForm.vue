<template>
<div class="box-flex start-box box-orient">
    <div class="info-detail box-flex">
        <Row>
            <Col span="12">
                <p class="box-info"><strong>状态</strong>:<span
                        :class="{
                         zhuanchu:baseInfo.status=='转入中'||baseInfo.status=='转入中',
                         complete:baseInfo.status=='转出完成'||baseInfo.status=='转入完成',
                         bohui:baseInfo.status=='被驳回'||baseInfo.status=='已驳回'||baseInfo.status=='已撤回'||baseInfo.status=='被撤回'
                         }"
                >{{baseInfo.status}}</span></p>
                <p class="box-info">姓名:<span>{{baseInfo.real_name}}</span></p>
                <p class="box-info">身份证号:<span>{{baseInfo.idcard}}</span></p>
            </Col>
            <Col span="12">
                <p class="box-info" style="margin-top: 40px;">手机号码:<span>{{baseInfo.mobile}}</span></p>
                <p class="box-info">转出组织关系日期:<span>{{baseInfo.out_date}}</span></p>
            </Col>
        </Row>
        <Row style="border-bottom: 1px solid #ddd;width: calc(100% + 10px)">
            <Col span="12">
                <p class="box-info"><strong>原党组织:<span>{{baseInfo.from_dept_name}}</span></strong></p>
                <p class="box-info">所在党支部:<span>{{baseInfo.from_branch_name}}</span></p>
                <p class="box-info">党组织联系方式:<span>{{baseInfo.from_dept_contact_phone}}</span></p>
                <p class="box-info">原党组织联系人:<span>{{baseInfo.from_dept_contact_person}}</span></p>
                <p class="box-info">联系人手机号:<span>{{baseInfo.from_dept_contact_person_mobile}}</span></p>
            </Col>
            <Col span="12">
                <p class="box-info"><strong>目标党组织:<span>{{baseInfo.to_dept_name}}</span></strong></p>
                <p class="box-info">党组织联系方式:<span>{{baseInfo.to_dept_contact_phone}}</span></p>
                <p class="box-info">党组织联系人:<span>{{baseInfo.to_dept_contact_person}}</span></p>
                <p class="box-info">联系人手机号:<span>{{baseInfo.to_dept_contact_person_mobile}}</span></p>
            </Col>





        </Row>
        <Row v-show="status == 2">
            <Col span="19" style="margin-left: 20px;">
            <Form label-position="top">
                <FormItem label="驳回理由：" style="margin-top: 20px;">
                    <Input disabled v-model="reason" type="textarea" :autosize="{minRows: 5,maxRows: 8}" placeholder="党员因私事短期出国、出境或自费出国留学，因办理保留当即手续，其他组织关系保留在原单位党组织。出国出境定居的党员，应办理溶质党籍手续。"></Input>
                </FormItem>
            </Form>
            </Col>
        </Row>
        <Row  v-show="status <= 1 && direction == 'to'">
            <Col span="22" style="margin-left: 20px;">
                <Form ref="orgManageForm" :model="orgManageForm" :label-width="160" label-position="right" :rules='ruleValidate'>
                    <FormItem label="转入党支部：" style="margin-top: 20px;" prop='to_branch_name'>
                        <Input :disabled='status == 1' v-model="orgManageForm.to_branch_name" type="text" placeholder="请选择" @click.native="popTree(status)"></Input>
                    </FormItem>
                    <FormItem label="转入组织关系日期：" style="margin-top: 20px;" prop="in_date">
                        <DatePicker v-model="orgManageForm.in_date" :disabled='status == 1' type="date" placeholder="选择日期" style="width: 100%;"></DatePicker>
                    </FormItem>
                    <FormItem label="进入党支部类型：" style="margin-top: 20px;" prop="in_type">
                        <Select :disabled='status == 1' placement='top' v-model="orgManageForm.in_type" placeholder="请选择">
                            <Option v-for='item in in_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
    <div class="info-footer start-box box-align" v-if="status == '0' && direction == 'to'">
        <div class="box-flex"></div>
        <Button type="primary" style="margin-right: 15px;" @click="handleSubmit('orgManageForm')">同意接受</Button>
        <Button type="ghost" style="margin-right: 15px;" @click="reject">驳回</Button>
        <Button type="ghost" @click="closeInfo">取消</Button>
    </div>
    <partyTree v-if="treeShow" @setConfirm="setConfirm" @setCancer="setCancer" loadUrl="/v1/trees/get-dept-info" url="/v1/trees/search-list" :setid="baseInfo.to_dept"></partyTree>
</div>
</template>

<script>
import partyTree from '@/components/pop/org/partyTree.vue'
export default {
    name: 'orgForm',
    data() {
        return {
            isDisable: true,
            in_type_list: [],
            status: '0',
            baseInfo: {
                contact_phone: '',
                from_dept: '',
                from_dept_name: '',
                id: '',
                idcard: '',
                out_date: '',
                real_name: '',
                to_dept: '',
                to_dept_name: '',
            },
            orgManageForm: {
                to_branch_name: '',
                to_branch: '',
                in_date: '',
                in_type: '',
            },
            status_desc_list:{
                to : ['转入中','转入完成','已驳回','已撤回'],
                from : ['转出中','转出完成','被驳回','被撤回'],
            },//状态集
            reason: '',
            treeShow: false,
            // setid: '', //编辑的时候传入的id
            ruleValidate: {
                to_branch_name: [{
                    required: true,
                    message: '转入党支部不能为空',
                    trigger: 'change'
                }],
                in_date: [{
                    required: true,
                    message: '转入组织关系日期不能为空',
                    trigger: 'change',
                    type: 'date'
                }],
                in_type: [{
                    required: true,
                    message: '进入党支部类型不能为空',
                    trigger: 'change'
                }],
            },
            filters: {
                dateFormat(value) {
                    if (value == '') {
                        return
                    }
                    var date = new Date(+value),
                        Y = date.getFullYear(),
                        m = date.getMonth() + 1,
                        d = date.getDate(),
                        H = date.getHours(),
                        i = date.getMinutes(),
                        s = date.getSeconds();
                    if (m < 10) {
                        m = '0' + m;
                    }
                    if (d < 10) {
                        d = '0' + d;
                    }
                    if (H < 10) {
                        H = '0' + H;
                    }
                    if (i < 10) {
                        i = '0' + i;
                    }
                    if (s < 10) {
                        s = '0' + s;
                    }
                    var t = Y + '-' + m + '-' + d;
                    return t;
                }
            },
        }
    },
    props: ['direction'],
    computed:{
        getStatus(){
            return this.status_desc_list[this.direction]
        }
    },
    components: {
        partyTree
    },
    watch: {
        '$route' (to, from) {
            this.getInfo(this.$route.params['id'], 1);
            this.getType();
        },

    },
    methods: {
		closeInfo() {
			this.$router.push({
				name : 'organizationManageList'
			});
		},        
        //党组织类型
        getType() {
            let that = this;
            let qs = require('qs');
            this.axios({
                    method: 'get',
                    url: '/v1/dictionary/get-list-by-type',
                    params: {
                        type: 'C03043',
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        needData.data.forEach(item => that.in_type_list.push(item))
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
        },
        editBtn() {
            this.isDisable = !this.isDisable;
            this.$store.commit('setEdit', {
                isDisable: this.isDisable
            });
        },
        //驳回
        reject() {
            this.$router.push({
                name: 'partyReject',

            });
        },
        handleSubmit(name) {
            let that = this;
            that.$refs[name].validate((valid) => {
                if (valid) {
                    this.isDisable = !this.isDisable; //改变编辑状态
                    let qs = require('qs');
                    let postData = Object.assign({}, that.orgManageForm);
                    postData.id = that.$route.params.id,
                    postData.in_date = that.filters.dateFormat(postData.in_date);
                    postData.review = 1;
                    that.axios({
                            method: 'get',
                            url: '/v1/relation/review',
                            params: postData
                        })
                        .then(res => {
                            let needData = res.data;
                            if (needData.code == 200) {
                                that.$Message.success('操作成功');
                                // setTimeout(() => {
                                //     that.$router.push({
                                //         name: 'organization',
                                //         params:{
                                //             id:that.$route.params.id
                                //         },
                                //     })
                                // },100);
                                that.status = 1;
                            } else {
                                that.$Message.error(needData.msg);
                            }
                        })
                        .catch(err => {
                            this.$Message.error('网络请求异常');
                        })
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        popTree(status) {
            if(status==1){return}
            this.treeShow = true;
        },
        setConfirm(item) {
            if (item.data.type_icon != 5) {
                this.$Message.error('请选择一个党支部');
                return;
            };
            this.treeShow = false;
            this.orgManageForm.to_branch_name = item.data['name'];
            this.orgManageForm.to_branch = item.data['nid']
        },
        setCancer() {
            this.treeShow = false;
        },
        handleReset() {
            for (let key in this.orgManageForm) {
               this.orgManageForm[key] = "";
            }
        },
        getInfo(id, type) {
            let that = this;
            let qs = require('qs');
            this.axios({
                    method: 'get',
                    url: '/v1/relation/detail',
                    params: {
                        id: id ? id : 0,
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.baseInfo = Object.assign({}, needData.data.detail);
                        that.status = needData.data.detail.status;
                        that.baseInfo.status=that.getStatus[that.status];
                        needData.data.detail.in_type = needData.data.detail.in_type=='0'? "" : needData.data.detail.in_type;
                        that.$emit('name1',needData.data.detail.real_name);
                        if (that.status == 1) {
                            that.handleReset();
                            for (let key in that.orgManageForm) {
                                if (key == 'in_date' && needData.data.detail[key] != "") {
                                    that.orgManageForm[key] = new Date(needData.data.detail[key])
                                } else if (needData.data.detail[key] != "") {
                                    that.orgManageForm[key] = needData.data.detail[key];
                                }
                            }
                        } else if (that.status == 2) {
                            that.reason = needData.data.detail.reason;
                        }else if(that.status == 0){
                            that.handleReset();
                            that.$refs['orgManageForm'].resetFields();                           
                        }
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$Message.error('网络请求异常');
                })
        },
    },
    created() {

    },
    mounted() {
        let that = this;
        this.$store.commit('setEdit', {
            isDisable: this.isDisable
        });
        this.getInfo(this.$route.params['id'], 1);
        this.getType();
    },
}
</script>

<style scoped>
.box-info {
    line-height: 40px;
    padding-left: 20px;
    color: #333;
    font-size: 14px;
}
    .zhuanchu{
        color: #454545;
        font-weight: bold;
    }
    .complete{
        color: #2e99e4;
        font-weight: bold;
    }
    .bohui{
        color: #d73826;
        font-weight: bold;
    }
</style>
