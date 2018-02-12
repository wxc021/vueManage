<template>
    <div class="box-flex start-box box-orient">
        <div class="info-detail box-flex">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
                <FormItem label="党组织代码" prop="partycode">
                    <Input v-model="formValidate.partycode" :disabled="isDisable" placeholder="请输入党组织代码"></Input>
                </FormItem>
                <FormItem label="党组织名称" prop="name">
                    <Input v-model="formValidate.name" :disabled="isDisable" placeholder="请输入邮箱"></Input>
                </FormItem>
                <FormItem label="党组织类型" prop="type_id">
                    <Select v-model="formValidate.type_id" :disabled="isDisable" placeholder="请选择党组织类型">
                        <Option v-for="item in dangType" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="党组织属地关系" prop="affiliation_id">
                    <Select v-model="formValidate.affiliation_id" :disabled="isDisable" placeholder="请选择党组织属地关系">
                        <Option v-for="item in realtive" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="批准建立党组织日期" prop="found_time">
                    <DatePicker type="date" placeholder="选择日期" :disabled="isDisable" v-model="formValidate.found_time"></DatePicker>
                </FormItem>

                <FormItem label="流动党员党支部标识" prop="is_flow">
                    <Input v-model="formValidate.is_flow" :disabled="isDisable" placeholder="请输入流动党员党支部标识"></Input>
                </FormItem>
                <FormItem label="本届班子当选时间" prop="start_time">
                    <DatePicker type="date" placeholder="选择日期" :disabled="isDisable" v-model="formValidate.start_time"></DatePicker>
                </FormItem>
                <FormItem label="任期年限" prop="gap">
                    <Input v-model="formValidate.gap" :disabled="isDisable" placeholder="请输入任期年限"></Input>
                </FormItem>
                <FormItem label="本届届满日期" prop="end_time">
                  <DatePicker  type="date" :disabled="isDisable"placeholder="选择日期" v-model="formValidate.end_time"></DatePicker>
                </FormItem>
                <FormItem label="选举方式" prop="vote_way">
                    <Select v-model="formValidate.vote_way" :disabled="isDisable" placeholder="请选择选举方式">
                        <Option v-for="item in voteStyle" :key="item.id" :value="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="选举应到会人数" prop="vote_due">
                    <Input v-model="formValidate.vote_due" :disabled="isDisable" placeholder="请输入选举应到会人数"></Input>
                </FormItem>
                <FormItem label="选举实到会人数" prop="vote_actual">
                    <Input v-model="formValidate.vote_actual" :disabled="isDisable" placeholder="请输入选举实到会人数"></Input>
                </FormItem>
                <FormItem label="设置委员数" prop="vote_actual">
                    <Input v-model="formValidate.leadernum" :disabled="isDisable" placeholder="请输入设置委员数"></Input>
                </FormItem>
                <FormItem label="实有委员数" prop="leadernum">
                    <Input v-model="formValidate.haved_leaders" :disabled="isDisable" placeholder="请输入实有委员数"></Input>
                </FormItem>
                <FormItem label="撤销日期:" prop="delDate">
                  <DatePicker style="width: 100%;"  :disabled="isDisable" type="date" placeholder="选择撤销日期" v-model="formValidate.delDate"></DatePicker>
                </FormItem>
            </Form>
        </div>
        <div class="info-footer start-box box-align">
            <div class="box-flex"></div>
            <Button type="ghost" style="margin-right: 15px;"  @click="handleReset('formValidate')">取消</Button>
            <Button v-show="isDisable" type="primary" @click="editBtn">编辑</Button>
            <Button v-show="!isDisable" type="error" @click="handleSubmit('formValidate')">保存</Button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'unitForm',
        data() {
            return {
                isDisable:true,
                formValidate: {
                    partycode: '',
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
                    haved_leaders: '',
                    delDate: '',
                },
                ruleValidate: {
                    partycode: [{
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
                    }],
                    delDate: [{
                        required: true, type: 'date', message: '撤销日期不能为空', trigger: 'change'
                    }],
                },
                datas: this.infodata,
                dangType: [],
                realtive: [],
                voteStyle: []
            }
        },
        props: ['infodata', 'controlSave'],
        components: {

        },
        watch: {
            '$route' (to, from) {
                this.getInfo(this.$route.params['id'],1);
                this.getType();
                this.getRealtive();
                this.getVote();
            },
        },
        methods: {
            //党组织类型
            getType() {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'get',
                    url: '/v1/dictionary/get-list-by-type',
                    params: {
                        type: 'D01021',
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        needData.data.forEach(item => that.dangType.push(item))
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            //组织属地关系
            getRealtive() {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'get',
                    url: '/v1/dictionary/get-list-by-type',
                    params: {
                        type: 'D01022',
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        needData.data.forEach(item => that.realtive.push(item))
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            //选举方式
            getVote() {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'get',
                    url: '/v1/dictionary/get-list-by-type',
                    params: {
                        type: 'KZ13',
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        needData.data.forEach(item => that.voteStyle.push(item))
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            editBtn() {
              // console.log(this.$root.$children[0])
              // this.$store.commit('setStrict')
              this.isDisable=!this.isDisable;
              this.$store.commit('setEdit', {isDisable: this.isDisable});
            },
            handleSubmit (name) {
                let that = this;
                console.log(this.formValidate);
                let postData = this.formValidate;
                postData.dept_id = this.$route.params['id'];
                // postData.leadernum = this.formValidate.haved_leaders;
                postData.opartycodept = this.formValidate.partycode;
                // return;
                this.$refs[name].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        this.isDisable =! this.isDisable;//改变编辑状态
                        let qs = require('qs');
                        this.axios({
                            method: 'post',
                            url: '/v1/dept/modify-dept-base-info',
                            // params: postData
                            data: qs.stringify(postData)
                        })
                        .then(res => {
                            let needData = res.data;
                            if (needData.code == 200) {
                                
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
            handleReset (name) {
                // this.$refs[name].resetFields();
                // this.$router.go(-1)
                this.getInfo(this.$route.params['id'], 1);
                this.isDisable = true;
                this.$store.commit('setEdit', {isDisable: this.isDisable});
            },
            getInfo(id, type) {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'get',
                    url: '/v1/dept/detail',
                    params: {
                        dept_id: id ? id : 0,
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.datas = needData.data;
                        that.formValidate.partycode = that.datas.partycode;
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
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
        },
        created() {

        },
        mounted() {
            let that = this;
            this.$store.commit('setEdit', {isDisable: false});
            this.getInfo(this.$route.params['id'], 1);
            this.getType();
            this.getRealtive();
            this.getVote();
        },
    }
</script>
<style scope>

</style>
