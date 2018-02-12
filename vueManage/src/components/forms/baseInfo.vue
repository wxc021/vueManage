<template>
    <div class="box-flex start-box box-orient">
        <div class="info-detail box-flex">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="0">
                <Row>
                    <Col span="24">
                        <FormItem class="reset-style" label="党组织代码" prop="partycode">
                            <Input v-model="formValidate.partycode"  placeholder="请输入党组织代码" :maxlength="3">
                                <span slot="prepend">{{front}}</span>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem class="reset-style" label="党组织名称" prop="name">
                            <Input v-model="formValidate.name"  placeholder="请输入党组织名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="批准建立党组织日期" prop="found_time">
                            <DatePicker :style="{'width' : '100%'}" type="date" placeholder="选择日期"  v-model="formValidate.found_time"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem class="reset-style" label="党组织类型" prop="type_id">
                          <Cascader :render-format="renders" :data="dataType"  @on-change="changeParty" v-model="formValidate.type_id" ></Cascader>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="党组织属地关系" prop="affiliation_id">
                            <Cascader :render-format="renders"  :data="realtive" v-model="formValidate.affiliation_id"></Cascader>
                            <!-- <Select v-model="formValidate.affiliation_id"  placeholder="请选择党组织属地关系">
                                <Option v-for="item in realtive" :disabled="item.choosed==0 ? true :false" :value="item.id" :key="item.id">{{item.name}}</Option> -->
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem class="reset-style" label="选举方式" prop="vote_way">
                        <Select v-model="formValidate.vote_way" :disabled="nextDisable" placeholder="请选择选举方式">
                            <Option v-for="item in voteStyle" :key="item.id" :value="item.id">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="任期年限" prop="">
                            <!--<Input v-model="formValidate.gap" :disabled="nextDisable" placeholder="请输入任期年限"></Input>-->
                            <Select v-model="formValidate.gap" :disabled="nextDisable" placeholder="请选择任期年限">
                                <Option value="3">3年</Option>
                                <Option value="4">4年</Option>
                                <Option value="5">5年</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem class="reset-style" label="本届班子当选时间" prop="">
                            <DatePicker :style="{'width' : '100%'}" type="date" placeholder="选择日期" :disabled="nextDisable" v-model="formValidate.start_time"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="本届班子届满日期" prop="">
                          <DatePicker v-show="false" :style="{'width' : '100%'}" type="date" :disabled="true"placeholder="选择日期" v-model="formValidate.end_time"></DatePicker>
                          <DatePicker :style="{'width' : '100%'}" type="date" placeholder="选择日期" :disabled="true" v-model="copy_end_time"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem class="reset-style" label="选举应到会人数" prop="vote_due">
                            <Input v-model="formValidate.vote_due" :disabled="nextDisable" placeholder="请输入选举应到会人数"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="选举实到会人数" prop="vote_actual">
                            <Input v-model="formValidate.vote_actual" :disabled="nextDisable" placeholder="请输入选举实到会人数"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem class="reset-style" label="上级核定委员名额" prop="leadernum">
                            <Input v-model="formValidate.leadernum" :disabled="nextDisable" placeholder="请输入核定委员数"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="实有委员数" prop="">
                            <Input v-model="formValidate.haved_leaders" :disabled="true" placeholder="请输入实有委员数"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem class="reset-style" v-if="this.$route.query.del==1" label="撤销日期:" prop="history_time">
                          <DatePicker :style="{'width' : '100%'}" :disabled="nextDisable" type="date" placeholder="选择撤销日期" v-model="formValidate.history_time"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>  
            </Form>
        </div>
        <div class="info-footer start-box box-align">
            <div class="box-flex"></div>
            <!-- <Button type="ghost" style="margin-right: 15px;"  @click="handleReset('formValidate')">取消</Button> -->
            <!-- <Button v-show="isDisable" type="primary" @click="editBtn">编辑</Button> -->
            <Button type="error" @click="handleSubmit('formValidate')">保存</Button>
        </div>
        <TypeTree v-if="treeShow" @setConfirm="setConfirm" @setCancer="setCancer" :params="params" :setid="setid"></TypeTree>
    </div>
</template>

<script>
    import TypeTree from '@/components/pop/baseInfoTypeTree.vue'
    export default {
        name: 'info',
        data() {
            return {
                watcher: null,
                isDisable: false,
                nextDisable:false,
                treeShow:'',
                setid: '',//编辑的时候传入的id
                copy_end_time: '',
                params:{type:'D01021'},
                formValidate: {
                    partycode: '',
                    name: '',
                    type_id: [],
                    affiliation_id: [],
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
                    history_time: '',
                },
                dataType:[],
                ruleValidate: {
                    partycode: [{
                        required: true, message: '党组织代码不能为空', trigger: 'blur'
                    }],
                    name: [
                        { required: true, message: '党组织名称不能为空', trigger: 'blur' }
                    ],
                    type_id: [
                        { required: true, type: 'array', min: 1, message: '请选择党组织类型', trigger: 'change' }
                    ],
                    affiliation_id: [
                        { required: true, type: 'array', min: 1, message: '请选择党组织属地关系', trigger: 'change' }
                    ],
                    found_time: [
                        { required: true, type: 'date', message: '批准建立党组织日期时间不能为空', trigger: 'change' }
                    ],
                    is_flow: [
                        { required: false, message: '党支部标识不能为空', trigger: 'blur' }
                    ],
                    start_time: [
                        { required: false, type: 'date', message: '请选择本届班子当选时间', trigger: 'change' }
                    ],
                    gap: [
                        { required: false, message: '任期年限不能为空', trigger: 'change' }
                    ],
                    end_time: [
                        { required: false, type: 'date', message: '请选择届满时间', trigger: 'change' }
                    ],
                    vote_way: [
                        { required: false, message: '请选择选举方式', trigger: 'change' }
                    ],
                    // vote_due: [
                    //     { required: true, message: '选举实到会人数不能为空', trigger: 'change' }
                    // ], 
                    // vote_actual: [{
                    //     required: true, message: '选举应到会人数不能为空', trigger: 'blur'
                    // }],
                    // leadernum: [{
                    //     required: true, message: '核定委员数不能为空', trigger: 'blur'
                    // }],
                    haved_leaders: [{
                        required: false, message: '实有委员数不能为空', trigger: 'blur'
                    }],
                    history_time: [{
                        required: true, type: 'date', message: '撤销日期不能为空', trigger: 'change'
                    }],
                },
                datas: this.infodata,
                dangType: [],
                realtive: [],
                voteStyle: [],
                front: ''
            }
        },
        props: ['infodata', 'controlSave'],
        components: {
          TypeTree
        },
        watch: {
            '$route' (to, from) {
                this.getInfo(this.$route.params['id'], 1);
                this.getType(this.$route.query.type);
                this.getRealtive();
                this.getVote();
            },
            'controlSave' (newD, oldD) {
                this.handleSubmit('formValidate');
            },
            'formValidate.start_time' (nD, oD) {
                this.changeTime();
            },
            'formValidate.gap' (nD, oD) {
                this.changeTime();
            }
        },
        methods: {
            changeTime() {
                let that = this;
                this.$nextTick(function() {
                    if (this.formValidate.gap && this.formValidate.start_time) {
                        let [newD, temp2] = ['', ''];
                        if (this.formValidate.start_time) {
                            temp2 = this.getDate(this.formValidate.start_time) ? this.getDate(this.formValidate.start_time).split('-') : '';
                        };
                        if (temp2 && this.formValidate.gap) {
                           temp2[0] = parseInt(temp2[0]) + parseInt(this.formValidate.gap);
                           newD = temp2.join('-');
                        };
                        // that.formValidate.end_time = newD ? new Date(newD) : '';
                        that.copy_end_time = newD ? new Date(newD) : '';
                    };
                }) 
            },
            //选择党组织类型
            changeParty(value, selectedData){
                if (value[0]=='1510'|| value[0]=='1504'){
                    this.nextDisable = true;
                    this.formValidate.vote_way = '';
                    this.formValidate.gap = '';
                    this.formValidate.start_time = '';
                    this.formValidate.end_time = '';
                    this.formValidate.vote_actual = '';
                    this.formValidate.vote_due = '';
                    this.formValidate.haved_leaders = '';
                    this.formValidate.leadernum = '';
                } else {
                    this.nextDisable = false;
                }
            },
            setStr(val) {
                return val > 9 ? val : '0'+val;
            },
            getDate(obj) {
                if (obj == '') {
                    return  '';
                } else {
                    return obj.getFullYear()+'-'+( this.setStr( obj.getMonth()+1 ) )+'-'+this.setStr(obj.getDate());
                }
            },
            //党组织类型
            getType(type) {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'get',
                    url: '/v1/dictionary/get-list-by-type',
                    params: {
                        type: 'D01021',
                        type_icon: type
                    }
                })
                .then(res => {
                    let needData = res.data;
                    //重新组装data数据
                    that.dataType = [];
                    if (needData.code == 200) {
                        needData.data.forEach(item => {
                            that.dataType.push(item);
                        });
                    } else {
                      this.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            //获取组织类型tree
            getTypeTree(){
              this.treeShow=true;
            },
            setConfirm(item) {
              this.treeShow = false;
              this.RewardFormItem.organization = item.data['name'];
            },
            setCancer() {
              this.treeShow = false;
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
                        that.realtive = [];
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
                    that.voteStyle = [];
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
              this.isDisable = !this.isDisable;
              this.$store.commit('setEdit', {isDisable: this.isDisable});
            },
            handleSubmit (name) {
                let that = this;
                let postData = Object.assign({},this.formValidate);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        //this.isDisable = !this.isDisable;//改变编辑状态
                        let qs = require('qs');
                        postData.dept_id = this.$route.params['id'];
                        postData.leadernum = this.formValidate.leadernum;
                        postData.affiliation_id = this.formValidate.affiliation_id[this.formValidate.affiliation_id.length-1];
                        postData.opartycodept = this.formValidate.partycode;

                        postData.type_id = this.formValidate.type_id[this.formValidate.type_id.length-1];
                        postData.affiliation_id = this.formValidate.affiliation_id[this.formValidate.affiliation_id.length-1];
                        
                        postData.found_time = this.getDate(this.formValidate.found_time);
                        // postData.start_time = this.getDate(this.formValidate.start_time);
                        postData.start_time = this.getDate(this.formValidate.start_time);

                        postData.end_time = this.getDate(this.copy_end_time);
                        postData.history_time = this.getDate(this.formValidate.history_time);
                        this.axios({
                            method: 'post',
                            url: '/v1/dept/modify-dept-base-info',
                            // params: postData
                            data: qs.stringify(postData)
                        })
                        .then(res => {
                            let needData = res.data;
                            if (needData.code == 200) {
                              this.$Message.success('提交成功!');
                              this.isDisable=!this.isDisable;
                              this.$store.commit('setStrict')
                              this.$store.commit('setFlash2', {type: 1})

                              this.$store.commit('setEdit', {isDisable: false});
                              setTimeout(function(args) {
                                let temp = Object.assign([], that.formValidate.type_id);
                                  if (temp[0] == '1510'|| temp[0] == '1504') {
                                    that.nextDisable = true;
                                  } else {
                                    that.nextDisable = false;
                                  }
                              }, 300)
                              
                            } else {
                                this.isDisable = false;
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
                // this.isDisable = true;
                this.$store.commit('setEdit', {isDisable: false});
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
                        that.front = that.formValidate.partycode = that.datas.partycode.substring(0,that.datas.partycode.length-3);
                        that.formValidate.partycode = that.datas.partycode.substring(that.datas.partycode.length-3);
                        that.formValidate.name = that.datas.name;
                        that.formValidate.type_id = that.datas.type_id_array.map(item => {
                            return item.id;
                        })
                        // that.dataType = [{value:that.datas.type_id,label:that.datas.type}];
                        that.formValidate.affiliation_id = that.datas.affiliation_id_array.map(item => {
                            return item.id;
                        });

                        that.formValidate.found_time = that.datas.found_time ? new Date(that.datas.found_time) : '';
                        that.formValidate.is_flow = that.datas.is_flow;
                        that.formValidate.start_time = that.datas.start_time ? new Date(that.datas.start_time) : '';
                        that.formValidate.gap = that.datas.gap;

                        
                        let newD = '';
                        if (that.datas.end_time) {
                            let temp = that.datas.end_time.split('-');
                            let temp2 = that.datas.start_time ? that.datas.start_time.split('-') : '';
                            if (temp2) {
                               temp = Object.assign([], temp2);
                               temp[0] = parseInt(temp[0])+parseInt(that.datas.gap);
                               newD = temp.join('-');
                            };
                        };
                        
                        // that.formValidate.end_time = newD ? new Date(newD) : '';
                        that.copy_end_time = newD ? new Date(newD) : '';

                        that.formValidate.end_time = that.datas.end_time ? new Date(that.datas.end_time) : '';


                        that.formValidate.vote_way = that.datas.vote_way == 0 ? '' : that.datas.vote_way;
                        that.formValidate.vote_due = that.datas.vote_due == 0 ? '' : that.datas.vote_due;
                        that.formValidate.vote_actual = that.datas.vote_actual == 0 ? '' : that.datas.vote_actual;
                        that.formValidate.leadernum = that.datas.leadernum;
                        that.formValidate.haved_leaders = that.datas.haved_leaders;
                        that.formValidate.history_time =  that.datas.history_time ? new Date(that.datas.history_time) : '';

                        if (this.watcher) {
                            this.watcher();
                        };

                        this.watcher = this.$watch('formValidate', function(newD) {
                            that.$store.commit('setEdit', {isDisable: true});
                        }, {deep: true})
                        that.$store.commit('setEdit', {isDisable: false});
                        this.$nextTick(() => {
                            let temp = Object.assign([], that.formValidate.type_id);
                            if (temp[0] == '1510'|| temp[0] == '1504') {
                                that.nextDisable = true;
                            } else {
                                that.nextDisable = false;
                            }
                        })
                        
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
            this.getType(this.$route.query.type);
            this.getRealtive();
            this.getVote();
        },
        
    }
</script>
<style scoped>
    .info-detail {
        padding: 0 15px;
    }
</style>
