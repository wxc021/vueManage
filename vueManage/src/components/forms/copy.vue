<template>
    <div class="box-flex start-box box-orient">
        <div class="info-detail box-flex">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
                <FormItem label="党组织代码" prop="opartycodept">
                    <Input v-model="formValidate.opartycodept" :disabled="isDisable" placeholder="请输入党组织代码"></Input>
                </FormItem>
                <FormItem label="党组织名称" prop="name">
                    <Input v-model="formValidate.name" :disabled="isDisable" placeholder="请输入邮箱"></Input>
                </FormItem>
                <FormItem label="党组织类型" prop="type_id">
                    <Select v-model="formValidate.type_id" :disabled="isDisable" placeholder="请选择所在地">
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem label="党组织属地关系" prop="affiliation_id">
                    <Select v-model="formValidate.affiliation_id" :disabled="isDisable" placeholder="请选择所在地">
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem label="批准建立党组织日期">
                    <FormItem prop="found_time">
                        <DatePicker type="date" placeholder="选择日期" :disabled="isDisable" v-model="formValidate.found_time"></DatePicker>
                    </FormItem>
                </FormItem>
            </Form>
        </div>
        <div class="info-footer start-box box-align">
            <div class="box-flex"></div>
            <Button type="ghost" style="margin-right: 15px;"  @click="handleReset('formValidate')">取消</Button>
            <Button v-show="isDisable" type="primary" @click="editBtn">编辑</Button>
            <Button v-show="!isDisable" type="error"  @click="handleSubmit('formValidate')">保存</Button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'copy',
        data() {
            return {
                isDisable:true,
                formValidate: {
                    opartycodept: '',
                    name: '',
                    type_id: '',
                    affiliation_id: '',
                    found_time: '',
                    is_flow: '',
                    start_time: '',
                    gap: '',
                    end_time: '',
                    vote_way: '',
                    vote_due: '',
                    vote_actual: '',
                    leadernum: '',
                    haved_leaders: ''
                },
                ruleValidate: {
                    opartycodept: [{
                        required: true, message: '党组织代码不能为空', trigger: 'blur'
                    }],
                    name: [
                        { required: true, message: '党组织名称不能为空', trigger: 'blur' }
                    ],
                    type_id: [
                        { required: true, message: '请选择党组织类型', trigger: 'blur' }
                    ],
                    affiliation_id: [
                        { required: true, message: '请选择党组织属地关系', trigger: 'change' }
                    ],
                    found_time: [
                        { required: true, type: 'date', message: '批准建立党组织日期时间不能为空', trigger: 'change' }
                    ],
                    is_flow: [
                        { required: true, message: '党支部标识不能为空', trigger: 'blur' }
                    ],
                    start_time: [
                        { required: true, type: 'date', message: '请选择本届班子当选时间', trigger: 'change' }
                    ],
                    gap: [
                        { required: true, message: '任期年限不能为空', trigger: 'blur' }
                    ],
                    end_time: [
                        { required: true, type: 'date', message: '请选择届满时间', trigger: 'change' }
                    ],
                    vote_way: [
                        { required: true, message: '请选择选取方式', trigger: 'change' }
                    ],
                    vote_due: [
                        { required: true, message: '选举实到会人数不能为空', trigger: 'change' }
                    ],
                    vote_actual: [{
                        required: true, message: '选举应到会人数不能为空', trigger: 'blur'
                    }],
                    leadernum: [{
                        required: true, message: '设置委员数不能为空', trigger: 'blur'
                    }],
                    haved_leaders: [{
                        required: true, message: '实有委员数不能为空', trigger: 'blur'
                    }]
                },
                datas: this.infodata,
            }
        },
        props: ['infodata'],
        components: {

        },
        watch: {
            '$route' (to, from) {
                if (/copy/.test(to.path)) {
                    this.initF();
                } else if(/info/.test(to.path)) {
                    this.initF();
                }
            },
            // infodata(val) {
            //     this.datas = val;
            // }
        },
        methods: {
            editBtn: function () {
              this.isDisable=!this.isDisable;
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        this.isDisable=!this.isDisable;
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                this.$router.go(-1)
            },
            initF() {
                let that = this;

                that.formValidate.opartycodept = that.datas.opartycodept;
                that.formValidate.name = that.datas.name;
                that.formValidate.type_id = that.datas.type_id;
                that.formValidate.affiliation_id = that.datas.affiliation_id;
                that.formValidate.found_time = that.datas.found_time;
                that.formValidate.is_flow = that.datas.is_flow;
                that.formValidate.start_time = that.datas.start_time;
                that.formValidate.gap = that.datas.gap;
                that.formValidate.end_time = that.datas.end_time;
                that.formValidate.vote_way = that.datas.vote_way;
                that.formValidate.vote_due = that.datas.vote_due;
                that.formValidate.vote_actual = that.datas.vote_actual;
                that.formValidate.leadernum = that.datas.leadernum;
                that.formValidate.haved_leaders = that.datas.haved_leaders;
            }
        },
        created() {

        },
        mounted() {
            let that = this;
            this.$watch('infodata', function(newD, oldD) {
                that.datas = newD;
            }, {deep: true, immediate: true});
            setTimeout(function() {
                that.formValidate.opartycodept = that.datas.opartycodept;
                that.formValidate.name = that.datas.name;
                that.formValidate.type_id = that.datas.type_id;
                that.formValidate.affiliation_id = that.datas.affiliation_id;
                that.formValidate.found_time = that.datas.found_time;
                that.formValidate.is_flow = that.datas.is_flow;
                that.formValidate.start_time = that.datas.start_time;
                that.formValidate.gap = that.datas.gap;
                that.formValidate.end_time = that.datas.end_time;
                that.formValidate.vote_way = that.datas.vote_way;
                that.formValidate.vote_due = that.datas.vote_due;
                that.formValidate.vote_actual = that.datas.vote_actual;
                that.formValidate.leadernum = that.datas.leadernum;
                that.formValidate.haved_leaders = that.datas.haved_leaders;
            }, 300)
        },
    }
</script>
<style scope>

</style>
