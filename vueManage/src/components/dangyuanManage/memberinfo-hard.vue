<template>
<div class="memberinfo-hard start-box box-orient">
    <div class="memberinfo-form box-flex">
        <Form :label-width="0" ref="memberhard" :model="infoform" :rules="ruleValidate">
            <div style="color:#d73826;font-size:16px;font-weight:bold">困难党员</div>
            <Row>
                <Col span='12'>
                    <FormItem class="reset-style" label="困难党员类型">
                        <Select :on-change="hardlifeTypeChange" clearable  v-model="infoform.hardlife_type">
                            <Option v-for='item in hardlife_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem class="reset-style" label="健康状况" prop="health">
                        <Cascader :render-format="renders"  v-model="infoform.health" :data="health_list"></Cascader>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span='12'>
                    <FormItem class="reset-style" label="生活困难情况补充">
                        <Input  v-model="infoform.hardlife_ext"></Input>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem class="reset-style" label="是否享受城镇最低生活保障">
                        <Select  v-model="infoform.min_guarantee" clearable>
                            <Option value="2">否</Option>
                            <Option value="1">是</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <div style="color:#d73826;font-size:16px;font-weight:bold;margin-top:10px;">建国前入党没有工作老党员</div>
            <Row>
                <Col span='12'>
                    <FormItem class="reset-style" label="建国前入党没有工作老党员">
                        <Cascader :render-format="renders" :transfer="true"  v-model="infoform.before_country_without_job" :data="before_country_without_job_list"></Cascader>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem class="reset-style" label="是否享受优抚对象抚恤补助">
                        <Select  v-model="infoform.is_saved" clearable>
                            <Option value="1">是</Option>
                            <Option value="2">否</Option>
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
    name: 'memberinfo-hard',
    props: {
        viewdata: null,
        editable: {
            type: Boolean,
            default: true
        }
    },
    data() {

        const validateHealth = (rule, value, callback) => {
            if (this.infoform.hardlife_type != '' && this.infoform.hardlife_type != undefined) {
                if (value == '' || value == undefined) {
                    callback(new Error('请选择健康类型'));
                } else {
                    callback()
                }
            } else {
                callback();
            }
        }

        return {
            infoform: {
                hardlife_type: '',
                health: [],
                min_guarantee: '',
                is_saved: '',
                before_country_without_job: [],
                hardlife_ext: '',
            },
            infoEditStates: {
                hardlife_type: false,
                health: false,
                min_guarantee: false,
                is_saved: false,
                before_country_without_job: false,
                hardlife_ext: false,
            },
            ruleValidate: {
                // health: [{
                //     validator: validateHealth,
                //     trigger: 'change'
                // }]
            },
            oldData: {},
            before_country_without_job_list: [],
            hardlife_type_list: [],
            health_list: [],
            currentData: this.viewdata,
            editing: false, // 编辑状态
            url: '/v1/member/edit-hardlife',
            uid: this.$route.params.uid,
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
                        }, 200);
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
                    url: '/v1/member/hardlife',
                    method: 'get',
                    params: {
                        uid: that.$route.params.uid,
                    },
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        res.data.data.health = res.data.data.health_array.map(function(a) {
                            return a.id
                        });
                        res.data.data.before_country_without_job = res.data.data.before_country_without_job_array.map(function(a) {
                            return a.id
                        });
                        that.infoform = Object.assign({}, needData.data);
                        that.oldData = Object.assign({}, needData.data);
                        formDataWatcher = this.$watch('infoform',(newVal, oldVal) => {
                            this.$store.commit('setEdit', {isDisable: true});
                        }, {deep : true});
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
        },

        hardlifeTypeChange(newVal) {
            console.log('change');
            if (newVal != undefined && newVal != '') {
                for (let i in this.infoEditStates) {
                    this.infoEditStates[i] = true
                }
            } else {
                for (let i in this.infoEditStates) {
                    if (i != 'hardlife_type') {
                        this.infoEditStates[i] = false
                    };
                }
            }
        },
        cancelEdit() {
            let that = this;
            // 不能改变对象的引用 会导致双向绑定失败
            for (let i in that.oldData) {
                that.infoform[i] = that.oldData[i] == 0 ? "" : that.oldData[i];
            }
        },
        reset() {
            let _this = this;
            for (let i in _this.infoform) {
                if (i.indexOf('health') >= 0 || i.indexOf('before_country_without_job') >= 0) {
                    _this.infoform[i] = [];
                } else {
                    _this.infoform[i] = "";
                }

            }
            this.hardlifeTypeChange(this.infoform.hardlife_type);
        },
        save(next) {
            let that = this;
            this.$refs['memberhard'].validate((valid) => {
                if (valid) {
                    let qs = require('qs');
                    let _data = Object.assign({}, this.infoform);
                    _data['uid'] = that.uid;
                    _data['health'] = that.getLastValue(_data['health']);
                    _data['before_country_without_job'] = that.getLastValue(_data['before_country_without_job']);
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
                                }, 200);
                                
                            } else {
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
        }
    },
    watch: {

    },
    mounted() {
        this.getList('C11001', 'hardlife_type_list');
        this.getList('A01027', 'health_list');
        this.getList('KZ66', 'before_country_without_job_list');
        this.getData();
        this.$store.commit('setEdit',{isDisable: false});
    },
}
</script>

<style scoped>
.info-detail {
    padding: 0 15px;
}

.memberinfo-hard {
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