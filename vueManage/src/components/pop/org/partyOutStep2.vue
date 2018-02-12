<!--党组织管理/班子成员/选择内部人员-->
<template>
    <div class="partyOutStep2">
        <Modal
        v-model="modal1"
        title="发起转出"
        width="950"
        :loading="loading"
        :mask-closable=false
        class-name="vertical-center-modal max-height"
        ok-text="确认转出"
        @on-ok="handleSubmit('partyOutForm')"
        @on-cancel="cancel">
            <Row>
                <Col span="15" >
                    <Form ref="partyOutForm" :model="partyOutForm" label-position="right" :label-width="140" :rules="ruleValidate">
                        <FormItem label="转出类型:" prop="move_type">
                            <Select v-model="partyOutForm.move_type">
                                <Option v-for="item in outTypeList" :disabled="item.choosed == 0" :key="item.id" :value="item.id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="转出组织关系日期:" prop="out_date">
                            <DatePicker format="yyyy-MM-dd" type="date" @on-change="dateChange" placeholder="选择日期" style="width: 100%;" v-model="partyOutForm.out_date"></DatePicker>
                        </FormItem>
                        <Row v-show="partyOutForm.move_type < 3762">
                            <Col span="21">
                                <FormItem label="目标党组织:">
                                    <Input v-model="partyOutForm.search"  @on-keyup.enter="search" placeholder="请输入党组织代码/党组织名称(2个字以上)"></Input>
                                </FormItem>
                            </Col>
                            <Col span="3">
                                <Button style="margin-left: 14px;" type="error" @click="search" >查询</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col span="20" offset="1" v-if="isSearch">
                    <p style="margin-bottom: 24px;margin-left: 18px;font-size: 14px;">查询结果:</p>
                    <Table border :columns="searchTableCol" :data="searchTableData"></Table>
                </Col>
            </Row>
        </Modal>
    </div>
</template>
<script>
export default {
    name:'partyOutStep2',
    data () {
        return {
            modal1: true,//是否显示弹窗
            loading: true,
            isSearch:false,//是否显示table党员列表
            radiosObj: {},
            radioSelect: null,
            partyOutForm: {  //form的绑定
                move_type:'',//转出类型
                search: '',
                out_date: ''
            },
            ruleValidate: {
                move_type: { 
                    required: true, 
                    message: '请选择转出类型', 
                    trigger: 'change' 
                },
                out_date : {
                    required: true,
                    message: '请设置日期'
                }

            },
            searchTableCol: [{
                title: '选取',
                key: 'selectParty',
                width: 100,
                align: 'center',
                render:(h, params) => {
                    return h('div', {
                        class: {
                            'radio-outer': true
                        },
                        nativeOn: {
                            click() {
                              event.stopPropagation();
                            }
                        },
                    },
                    [h('Radio', {
                            class: {
                                'radio-check': true
                            },
                            props: {
                                size: 'large',
                                value: this.radiosObj['items' + params.row._index]
                            },
                            on: {
                                'on-change': (val) => {
                                    event.stopPropagation()
                                    this.changeRadio(val, params);
                                }
                            },
                            nativeOn: {
                                click() {
                                    event.stopPropagation()
                                }
                            },
                        }),
                    ]);
                }
            },
            {
                title: '党组织代码',
                key: 'partycode',
            },
            {
                title: '所属党组织',
                key: 'full_name'
            },
            {
                title: '联系方式',
                key: 'contact_phone'
            }],
            searchTableData: [],
            outTypeList : []
        }
    },
    components:{

    },
    methods: {
        //提交表单验证
        handleSubmit(name) {
            let _this = this;
            _this.loading = true;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 非表单字段的验证
                    if( _this.partyOutForm.move_type < 3762 && !this.radioSelect ){
                        this.$Message.error('请选择目标党组织!');
                        setTimeout(() => {
                            _this.loading = false;
                            _this.$nextTick(() => {
                                _this.loading = true;
                            });

                        }, 1000);
                        return
                    }
                    let query = this.$route.query;
                    this.axios({
                        method: 'get',
                        url: '/v1/relation/move',
                        params: Object.assign(_this.partyOutForm, {
                            uid: query.id,
                            from_branch: query.form,
                            to_dept: (_this.partyOutForm.move_type < 3762) ? _this.radioSelect.row.dept_id : '',

                        })
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$Message.success('提交成功!');
                            if(_this.partyOutForm.move_type < 3762){
                                this.$router.push({
                                    path:'partyLetter',
                                    query:{
                                        interState : '0',
                                        id : this.$route.query.id,
                                        dept : query.form
                                    },
                                });
                            }else{
                                _this.$router.push({
                                    name:'organizationManage',
                                });
                            }

                        } else {
                            _this.$Message.error(res.data.msg);
                             setTimeout(() => {
                                _this.loading = false;
                                _this.$nextTick(() => {
                                    _this.loading = true;
                                });
                            }, 1000);
                        }
                    })
                    .catch(err => {
                        this.$Message.error('网络请求异常');
                        setTimeout(() => {
                            _this.loading = false;
                            _this.$nextTick(() => {
                                _this.loading = true;
                            });
                        }, 1000);
                    })

                } else {
                    setTimeout(() => {
                        _this.loading = false;
                        _this.$nextTick(() => {
                            _this.loading = true;
                        });
                    }, 1000);  
                }
            })
        },
        changeRadio(val, params) {
            let that = this;
            for(let i in that.radiosObj) {
                that.$set(that.radiosObj, i, false);
            }
            that.$set(that.radiosObj, 'items' + params.row._index, true);
            that.radioSelect = params;
            //this.remberRow = Object.assign({}, params);
        },
        search() {
            let _this = this;
            if (this.partyOutForm.search.trim() == '') {
                this.$Message.info('请输入需要查询的党组织代码');
                return;
            }else if(this.partyOutForm.search.trim().length < 2 ){
                this.$Message.info('请输入2个字及以上的关键字');
                return
            }
            this.axios({
                method: 'get',
                url: '/v1/dept/search',
                params: {
                    keyword : _this.partyOutForm.search.trim()
                }
            })
            .then(res => {
                if (res.data.code == 200) {
                    _this.isSearch = true;
                    _this.searchTableData = res.data.data;
                    // _this.outTypeList = res.data.data
                } else {
                    _this.$Message.error(res.data.msg);
                }
            })
        },
        cancel() {
            this.$Message.info('操作取消');
            this.$router.push({name:'organizationManage'});
        },
        getOutType() {
            let _this = this;
            this.axios({
                method: 'get',
                url: '/v1/dictionary/get-list-by-type',
                params: {
                    type : 'DT04'
                }
            })
            .then(res => {
                if (res.data.code == 200) {
                    _this.outTypeList = res.data.data
                } else {
                    that.$Message.error(res.data.msg);
                }
            })
        },
        dateChange(val){
            // console.log(val);
            this.partyOutForm.out_date = val;
        }
    },
    mounted(){
        this.getOutType();
    }
}
</script>
<style>

</style>
