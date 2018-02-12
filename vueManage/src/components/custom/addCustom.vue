<!--班子成员新增的弹窗-->
<template>
    <div class="addCustom">
        <Modal
                v-model="modal1"
                title="新增报表"
                width="950"
                :loading="loading"
                :mask-closable=false
                class-name="vertical-center-modal"
                @on-ok="ok('memberFormItem')"
                @on-cancel="cancel">
            <Row>
                <Col span="24">
                    <Form :model="memberFormItem" ref="memberFormItem" :label-width="120" :rules="ruleValidate">
                        <FormItem label="类型" prop="type">
                            <RadioGroup v-model="memberFormItem.type">
                                <Radio label="1">新建报表</Radio>
                                <Radio label="2">复制报表</Radio>
                            </RadioGroup>
                        </FormItem>
                        <div v-if="memberFormItem.type==1">
                            <Col span="15">
                                <FormItem label="子表名称：" prop="name">
                                    <Input v-model="memberFormItem.name"   placeholder="请输入"></Input>
                                </FormItem>
                                <FormItem label="报表格式：" prop="tableFormat">
                                    <Select v-model="memberFormItem.tableFormat"   placeholder="请选择" :transfer="true">
                                        <Option  value="1">统计表</Option>
                                        <Option  value="2">花名册</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="报表说明：" style="margin-right:15px;">
                                    <Input v-model="memberFormItem.remark" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="添加报表说明"></Input>
                                </FormItem>
                            </Col>
                        </div>
                        <div v-if="memberFormItem.type==2">
                            <Table @on-row-click="clickRow" highlight-row border  :columns="columns1" :data="data1"></Table>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Modal>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                modal1: true,//是否显示弹窗
                loading:true,
                memberFormItem:{
                    type:'1',
                    name:'',
                    tableFormat:'',
                    selectData:{},
                    remark:''
                },
                ruleValidate: {
                    type: [
                        {required: true, message: '类型不能为空', trigger: 'change'}
                    ],
                    name: [
                        {required: true, message: '子表名称不能为空', trigger: 'blur'}
                    ],
                    tableFormat: [
                        {required: true, message: '报表格式不能为空', trigger: 'change'}
                    ],
                },
                columns1: [
                    {
                        title: '报表名称',
                        key: 'title'
                    },
                    {
                        title: '报表格式',
                        key: 'format',
                        width:120
                    },
                ],
                data1: [
                    {
                        title: '自定义报表一',
                        format: '统计表',
                    },
                    {
                        title: '自定义报表二',
                        format: '花名册',
                    },
                ]
            }
        },
        components:{

        },
        methods: {
            clickRow(row){
                this.selectData = row.id;
                console.log(this.selectData);
            },
            ok(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var that = this;
                        let qs = require('qs');
                        let postData = {};
                        let url='';
                        if(this.memberFormItem.type=='1'){
                            url = 'v1/statement/add'
                            postData.title = that.memberFormItem.name;
                            postData.type = that.memberFormItem.tableFormat;
                            postData.remark = that.memberFormItem.remark;
                        }else if (this.memberFormItem.type=='2'){
                            url='v1/statement/copy';
                            postData.id = that.selectData;
                        }
                        that.axios({
                            url:url,
                            method:'post',
                            data:qs.stringify(postData)
                        })
                        .then(res=> {
                            let needData = res.data;
                            if (needData.code == 200) {
                                this.$Message.success('操作成功');
                                this.$router.push({name:'custom'});
                            } else {
                                this.loading = false;
                                this.$Message.error(needData.msg);
                                setTimeout(() => {
                                    this.loading = true;
                                }, 20);
                            }
                        })
                        .catch(err=> {
                            this.Message.error('网络请求异常');
                        })
                    } else {
                        this.loading = false;
                        this.$Message.error('表单验证失败!');
                        setTimeout(() => {
                            this.loading = true;
                        }, 20);
                    }
                });
            },
            cancel(){
                this.$router.push({name:'custom'});
            },
            getList(){
                this.axios({
                            method:'get',
                            url:'/v1/statement/list'
                        })
                        .then(res=>{
                            let needData = res.data;
                            if(needData.code=='200'){
                                needData.data.forEach(item=>{
                                    if(item.type=='1'){
                                        item.format='统计表';
                                    }else{
                                        item.format='花名册';
                                    }
                                });
                                this.data1 = needData.data;

                            }else{
                                this.$Message.error(needData.msg)
                            }
                        })
                        .catch(err=>{
                            this.$Message.error('网络异常');
                        })
            }
        },
        mounted(){
            this.getList();
        }
    }
</script>
<style scrop>
    .TeamMember{
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .no-cursor{
        cursor: pointer !important;
    }
</style>
