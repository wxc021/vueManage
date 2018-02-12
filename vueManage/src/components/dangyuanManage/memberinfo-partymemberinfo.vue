<template>
<div class="memberinfo-partymemberinfo">
    <div class="memberinfo-form">
        <Form :label-width="0" ref="infoForm" :model="infoForm" :rules="ruleValidate">
            <div v-if="infoForm.deleteflag=='0'||infoForm.deleteflag==''">
                <Row>
                    <Col span="12">
                        <FormItem class="reset-style" label="人员类型">
                            <Input disabled v-model="infoForm.type_id_desc"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" v-show="infoForm.recruit_step && infoForm.recruit_step!==''">
                        <FormItem class="reset-style" label="发展流程">
                            <Input disabled v-model="infoForm.recruit_step"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span='12'>
                        <FormItem class="reset-style" label="申请入党日期" prop="apply_date">
                            <DatePicker :disabled="disabledData.apply_date < 0" v-model="infoForm.apply_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span='12'>
                    <FormItem class="reset-style" label="列为积极份子日期" prop="active_date">
                        <DatePicker :disabled="disabledData.active_date < 0" v-model="infoForm.active_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span='12'>
                        <FormItem class="reset-style" label="列为发展对象日期" prop="develop_date">
                            <DatePicker :disabled="disabledData.develop_date < 0" v-model="infoForm.develop_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span='12'>
                        <FormItem class="reset-style" label="参加培训日期" prop="train_date">
                            <DatePicker :disabled="disabledData.train_date < 0" v-model="infoForm.train_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem class="reset-style" label="入党日期" prop="party_date">
                            <DatePicker :transfer=true :disabled="disabledData.party_date < 0" type="date" v-model="infoForm.party_date" placeholder="选择日期" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style wxc-style" label="入党类型" prop="join_source_list">
                            <Cascader :render-format="renders" :disabled="disabledData.join_source < 0" :data="join_source_list" v-model="infoForm.join_source" style="width:100%;overflow-x: auto;"></Cascader>
                        </FormItem>
                    </Col>

                </Row>
                <Row>
                    <Col span="12">
                        <FormItem class="reset-style" label="转正日期" prop='join_party_date'>
                            <DatePicker change-on-select :transfer=true :disabled="disabledData.join_party_date < 0" type="date" v-model="infoForm.join_party_date" placeholder="选择日期" style="width: 100%"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem class="reset-style" label="转正情况" prop='to_normal_type'>
                            <Cascader :render-format="renders" :transfer=true :disabled="disabledData.to_normal_type < 0" :data="to_normal_type_list" v-model="infoForm.to_normal_type"></Cascader>
                        </FormItem>
                    </Col>
                </Row>
            </div>
            <div v-if="infoForm.deleteflag!=='0'&&infoForm.deleteflag!==''">
                <Row>
                    <Col span="12">
                    <FormItem class="reset-style" label="离开中共组织日期">
                        <DatePicker :disabled="false" type="date" v-model="infoForm.left_dept_time" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem class="reset-style" label="离开中共组织类型">
                        <Select v-model="infoForm.left_type" :disabled="false" clearable>
                            <Option v-for='item in left_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem class="reset-style" label="出党原因">
                            <Select v-model="infoForm.left_reason" :disabled="false" clearable>
                                <Option v-for='item in left_reason_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        </Form>
    </div>
    <div class="aside-bottom">
        <Button  type="primary" @click="save(null, $event)">保存</Button>
    </div>
</div>
</template>

<script>
let formDataWatcher = null;
export default {
    name: 'memberinfo-partymemberinfo',
    props: {
        viewdata: null,
        editable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isEdit: false,
            join_source_list: [],
            to_normal_type_list: [],
            left_type_list: [],
            left_reason_list: [],
            url: '/v1/membership/edit',
            uid: this.$route.params.uid,
            infoForm: {
                type_id: '',
                type_id_desc: '123',
                party_date: '',
                join_source: [],
                join_party_date: '',
                to_normal_type: [],
                left_dept_time: '',
                left_type: '',
                left_reason: '',
                deleteflag: '0',
                apply_date: '',
                active_date: '',
                develop_date: '',
                train_date: '',
            },
            oldForm: {

            },
            disabledData:{
                apply_date :0,
                active_date:0,
                develop_date:0,
                train_date:0,
                join_party_date:0,
                join_source:0,
                to_normal_type:0,
                party_date:0,
            },
            ruleValidate: {
                party_date: [{
                    required: true,
                    type: 'date',
                    message: '入党日期不能为空',
                    trigger: 'change'
                }],
                join_source: [{
                    required: true,
                    message: '入党类型不能为空',
                    trigger: 'change',
                    type: 'array',
                }],
            },
            filters: {
                dateFormat(value) {
                    if (value == '') {
                        return value
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
        };
    },
    watch: {
        'infoForm.join_party_date' (newV, oldV) {
            if (newV == undefined || newV == "" || newV.length == 0) {
                this.infoForm.to_normal_type = [];
            }
        },
        'disabledData.apply_date' (val,oval){
            if(val==1){
                this.ruleValidate['active_date'] = [
                     {required: true,type:'date', message: '申请入党日期不能为空', trigger: 'change'}
                ]
            }
        },
        'disabledData.active_date' (val,oval){
            if(val==1){
                this.ruleValidate['active_date'] = [
                     {required: true,type:'date', message: '列为积极份子日期不能为空', trigger: 'change'}
                ]
            }
        },
        'disabledData.develop_date' (val,oval){
             if(val==1){
                this.ruleValidate['develop_date'] = [
                     {required: true,type:'date', message: '列为发展对象日期不能为空', trigger: 'change'}
                ]
            }
        },
        'disabledData.train_date' (val,oval){
             if(val==1){
                this.ruleValidate['train_date'] = [
                     {required: true,type:'date', message: '参加培训日期不能为空', trigger: 'change'}
                ]
            }
        },
    },
    methods: {
        getdisableData(){
            let that = this;
            that.axios({
                url:'/v1/member/recruit-field',
                method:'get',
                params:{
                    uid : that.uid
                },
            })
            .then(res=>{
                let needData = res.data;
                if (needData.code == 200) {
                    for (let key in that.disabledData) {
                       that.disabledData[key] = needData.data[key]
                    }
                } else {
                      that.$Message.error(needData.msg);
                }
            })
            .catch(err=>{
                this.$Message.error('网络请求异常');
            })
        },        
		getLastValue(arr) {
			let _arr = '';
			let index = arr.length;
			if (index == 0) {
				return ""
			} else {
				_arr = arr[index-1];
				return _arr;
			}
		},
        getArray(obj) {
            return obj.map(function(item) {
                return item.id
            });
        },
        save(next) {
            let that = this;
            that.$refs['infoForm'].validate((valid) => {
                if (valid) {
                    let qs = require('qs');
                    let _data = {};
                    _data['uid'] = that.uid;
                    for (let item in that.infoForm) {
                        if (item.indexOf('time') >= 0 || item.indexOf('date') >= 0) {
                            if (that.infoForm[item] == "") {
                                _data[item] = that.infoForm[item]
                            } else {
                                _data[item] = that.filters.dateFormat(that.infoForm[item]);
                            }
                        } else {
                            _data[item] = that.infoForm[item];
                        }
                    }
                    for (let key in _data) {
                        if (that.infoForm.deleteflag == "0" && key.indexOf('left') >= 0) {
                            delete _data[key]
                        } else if (that.infoForm.deleteflag == "1" && key.indexOf('left') < 0) {
                            delete _data[key]
                        }
                    }
                    _data.join_source = that.getLastValue(_data.join_source);
                    console.log(_data.join_source)
                    _data.to_normal_type = that.getLastValue(_data.to_normal_type);
                    if (_data.join_party_date == "" && _data.to_normal_type != "") {
                        that.$Message.error('请填写转正日期');
                        return

                    } else if (_data.to_normal_type == "" && _data.join_party_date != "") {
                        that.$Message.error('请填写转正情况');
                        return
                    };
                    that.axios({
                            method: 'post',
                            url: that.url,
                            data: qs.stringify(_data)
                        })
                        .then(res => {
                            let needData = res.data;
                            if (needData.code == 200) {
                                setTimeout(() => {
                                    that.$Message.success('提交成功!');
                                    that.getDetail();
                                    that.$store.commit('setEdit',{isDisable: false});
                                     next && next();
                                }, 0)
                            } else {
                                 next && next(false);
                                that.$Message.error(needData.msg);
                            }
                        })
                        .catch(err => {
                             next && next(false);
                            this.$Message.error('网络请求异常');
                        });
                } else {
                    this.loading = false;
                    this.$Message.error('表单验证失败!');
                     next && next(false);
                    setTimeout(() => {
                        this.loading = true;
                    }, 20);
                }
            })
        },
        returnData() {
            this.infoForm = Object.assign({}, this.oldForm);
        },
        getList(type, arr) {
            let that = this;
            let qs = require('qs');
            if (that[arr].length > 1) {
                return
            }
            that.axios({
                    method: 'get',
                    url: 'v1/dictionary/get-list-by-type',
                    params: {
                        type: type
                    },
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        setTimeout(() => {
                            that[arr] = needData.data;
                        }, 200)
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                });
        },
        getDetail() {
            let that = this;
            that.axios({
                    url: '/v1/membership/detail',
                    method: 'get',
                    params: {
                        uid: that.$route.params.uid,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        for (var key in needData.data) {
                            if (key.indexOf('time') >= 0 || key.indexOf('date') >= 0) {
                                if (needData.data[key] != "") {
                                    needData.data[key] = new Date(needData.data[key]);
                                }
                            }
                        }
                        needData.data.join_source = that.getArray(needData.data.join_source_array);
                        needData.data.to_normal_type = that.getArray(needData.data.to_normal_type_array);
                        that.infoForm = Object.assign({}, needData.data);
                        console.log(that.infoForm)
                        that.oldForm = Object.assign({}, needData.data);
                        formDataWatcher = that.$watch('infoForm',(newVal, oldVal) => {
                            that.$store.commit('setEdit', {isDisable: true});
                        }, {deep : true});
                    } else {
                        that.Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.Message.error('网络请求异常');
                })
        },
        cancel() {
            //this.$Message.info('点击了取消');
            this.$router.back();
        }
    },
    mounted() {
        this.getList('C02011', 'join_source_list');
        this.getList('C02018', 'to_normal_type_list');
        this.getList('DT12', 'left_type_list');
        this.getList('C02027', 'left_reason_list');
        this.getDetail();
        this.getdisableData();
        this.$store.commit('setEdit',{isDisable: false});
    }
}
</script>

<style scoped>
.info-detail {
    padding: 0 15px;
}

.memberinfo-partymemberinfo {
    height: 100%;
}

.memberinfo-form {
    padding: 20px 8px 50px 8px;
}

.memberinfo-avatar {
    display: block;
    margin: auto;
    width: 85px;
    height: 120px;
    vertical-align: middle;
}

.aside-bottom {
    position: absolute!important;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ddd;
    padding: 8px;
    text-align: right;
    background-color: #f8f8f8;
}
</style>