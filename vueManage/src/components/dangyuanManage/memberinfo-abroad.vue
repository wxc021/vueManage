<template>
<div class="memberinfo-abroad start-box box-orient">
    <div class="memberinfo-form box-flex">
        <Form :label-width="0" ref="infoform" :model="infoform" :rules="ruleValidate">
            <div style="color:#d73826;font-size:16px;font-weight:bold;">出国</div>
            <Row>
                <Col span='12'>
                <FormItem class="reset-style" label="所至国家(地区)" prop="country">
                    <Cascader :render-format="renders" v-model="infoform.country" :data="country_list"></Cascader>
                </FormItem>
                </Col>
                <Col span='12'>
                <FormItem class="reset-style" label="出国(境)日期" prop="abroad_time">
                    <DatePicker v-model="infoform.abroad_time" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                </FormItem>
                </Col>
            </Row>  
            <Row>
                <Col span='12'>
                <FormItem class="reset-style" label="出国(境)原因" prop="abroad_reason">
                    <Cascader :render-format="renders" v-model="infoform.abroad_reason" :data="abroad_reason_list"></Cascader>
                </FormItem>
                </Col>
                <Col span='12'>
                <FormItem class="reset-style" label="组织关系出国（境）时是否转往国（境）外">
                    <Select v-model="infoform.relation_abroad" clearable>
                        <Option value="1">是</Option>
                        <Option value="2">否</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='12'>
                <FormItem class="reset-style" label="出国党员与党组织联系情况" prop="concat">
                    <Select v-model="infoform.concat" clearable>
                        <Option v-for='item in concat_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                    </Select>
                </FormItem>

                </Col>
            </Row>
            <div style="color:#d73826;font-size:16px;font-weight:bold;margin-top:10px;">回国</div>

            <Row>
                <Col span='12'>
                <FormItem class="reset-style" label="回国情况">
                    <Cascader :render-format="renders" v-model="infoform.back" :data="back_list"></Cascader>
                </FormItem>
                </Col>
                <Col span='12'>
                <FormItem class="reset-style" label="回国日期">
                    <DatePicker v-model="infoform.back_time" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='12'>
                <FormItem class="reset-style" label="恢复组织生活情况">
                    <Select v-model="infoform.recover" clearable>
                        <Option v-for='item in recover_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
    <div class="aside-bottom" v-show="editable">
        <!-- <Button  @click="cancelEdit" type="ghost">取消</Button> -->
        <!-- <Button  @click="reset" type="ghost">重置</Button> -->
        <Button  @click="save(null, $event)" type="primary">保存</Button>
    </div>
</div>
</template>

<script>
let formDataWatcher = null;
export default {
    name: 'memberinfo-abroad',
    props: {
        viewdata: null,
        editable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            infoform: {
                country: [],
                abroad_time: '',
                abroad_reason: [],
                concat: '',
                back: [],
                back_time: '',
                recover: '',
                relation_abroad: '',
            },
            oldData: {},
            country_list: [],
            concat_list: [],
            back_list: [],
            recover_list: [],
            abroad_reason_list: [],
            editing: false, // 编辑状态
            url: '/v1/abroad/edit',
            uid: this.$route.params.uid,
            ruleValidate: {

            },
            ruleValidate2: {

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
            }
        };
    },

    methods: {
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
        getData() {
            if (formDataWatcher) {
                console.log(formDataWatcher);
                formDataWatcher();
                formDataWatcher = null;
            }
            let that = this;
            that.axios({
                    url: '/v1/abroad/detail',
                    method: 'get',
                    params: {
                        uid: that.$route.params.uid,
                    },
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        if (needData.data.length <= 0) {
                            formDataWatcher = that.$watch('infoform',(newVal, oldVal) => {
                                that.$store.commit('setEdit', {isDisable: true});
                            }, {deep : true});
                            return
                        }
                        for (let key in needData.data) {
                            if (key.indexOf('time') >= 0) {
                                if (needData.data[key] == null) {
                                    needData.data[key] = ''
                                } else {
                                    needData.data[key] = new Date(needData.data[key]);
                                }
                            }
                        }
                        res.data.data.back = that.getArray(res.data.data.back_array);
                        res.data.data.country = that.getArray(res.data.data.country_array);
                        res.data.data.abroad_reason = that.getArray(res.data.data.abroad_reason_array);
                        for (let key in needData.data) {
                            that.infoform[key] = needData.data[key];
                            that.oldData[key] = needData.data[key];
                        }
                        formDataWatcher = that.$watch('infoform',(newVal, oldVal) => {
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
        cancelEdit() {
            // 延迟改变默认值
            setTimeout(() => {
                // this.infoform = Object.assign({}, this.oldData);
                for (let key in needData.data) {
                    that.oldData[key] = needData.data[key];
                }
            }, 300)
            this.$refs['infoform'].resetFields();
        },
        save(next) {
            // TODO save request
            let that = this;
            this.$refs['infoform'].validate((valid) => {
                if (valid) {
                    let qs = require('qs');
                    let _data = Object.assign({}, this.infoform);
                    _data['uid'] = that.uid;
                    _data['back'] = that.getLastValue(_data['back']);
                    _data['country'] = that.getLastValue(_data['country']);
                    _data['abroad_reason'] = that.getLastValue(_data['abroad_reason']);
                    _data.abroad_time = _data.abroad_time == "" ? "" : that.filters.dateFormat(_data.abroad_time);
                    _data.back_time = _data.back_time == "" ? "" : that.filters.dateFormat(_data.back_time);
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
                                    that.$store.commit('setEdit',{isDisable: false});
                                    that.getData();
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
                    next && next(false);
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        //重置功能
        reset() {
            let _this = this;
            for (let i in _this.infoform) {
                if(_this.infoform[i].constructor == Array){
                    _this.infoform[i] = [];
                }else{
                    _this.infoform[i] = "";
                }
            }

        }
    },
    watch: {

    },
    mounted() {
        this.getList('A12001A', 'country_list');
        this.getList('C09003', 'concat_list');
        this.getList('C09006', 'back_list');
        this.getList('C09007', 'recover_list');
        this.getList('A12014', 'abroad_reason_list');
        this.getData();
        this.$store.commit('setEdit',{isDisable: false});
    },
}
</script>

<style scoped>
.ivu-select-dropdown {
    max-height: 280px;
}

.ivu-cascader-menu {
    height: 280px;
}

.info-detail {
    padding: 0 15px;
}

.memberinfo-abroad {
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
    /*position: absolute;*/
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ddd;
    padding: 8px;
    text-align: right;
    background-color: #f8f8f8;
}
</style>
