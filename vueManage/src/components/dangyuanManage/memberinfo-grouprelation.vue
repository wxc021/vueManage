<template>
<div class="memberinfo-grouprelation" style="padding-top:20px">
    <div class="memberinfo-form">
        <Form :label-width="160" ref="infoform" :model="infoform" :rules="ruleValidate">  
            <Row>
                <Col span="16">
                    <FormItem label="进入党支部日期" prop="join_dept_time">
                        <DatePicker v-model="infoform.join_dept_time"  type="date" placeholder="选择日期" style="width: 100%" :disabled="!editable"></DatePicker>
                    </FormItem>
                    <FormItem label="进入党支部类型" prop="join_dept_type">
                        <Select v-model="infoform.join_dept_type" clearable :disabled="!editable">
                            <Option v-for='item in join_dept_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                        </Select>
                    </FormItem>   
                    <FormItem label="减少方式" prop="" v-if="decrease_opt && decrease_opt > 0">
                        <Input v-model="infoform.decrease_opt_desc" :disabled="true"></Input>
                    </FormItem>    
                    <FormItem label="减少时间" prop="left_date" v-if="left_date && left_date!==''">
                        <DatePicker v-model="infoform.left_date"  type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>   
                    <FormItem label="转出类型" prop="move_type" v-if="types == 1 || types == 8">
                        <Select v-model="infoform.move_type" clearable>
                            <Option v-for="item in outTypeList"  :key="item.id" :value="item.id">{{item.name}}</Option>
                        </Select>
                    </FormItem>   
                    <FormItem label="转往党组织" prop=""  v-if="types == 1 || types == 8">
                        <Input v-model="infoform.move_to_dept"></Input>
                    </FormItem>  
                    <FormItem label="出党原因" prop="left_reason" v-if="types == 3">
                        <Select v-model="infoform.left_reason" :disabled="false" clearable>
                            <Option v-for='item in left_reason_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                        </Select>
                    </FormItem>  
                    <FormItem label="出党类型" prop="left_type" v-if="types == 3">
                        <Select v-model="infoform.left_type" clearable>
                            <Option v-for='item in left_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
    <div class="aside-bottom" v-show="editable">
        <Button  @click="save(null, $event)" type="primary">保存</Button>
    </div>
</div>
</template>
<script>
let formDataWatcher = null;
export default {
    name : 'memberinfo-grouprelation',
    props: {
        viewdata : null,
        editable : {
            type : Boolean,
            default : true
        }
    },
    data(){
        return {
            types: 0,
            infoform : {
                join_dept_time:'',
                join_dept_type:'',
                decrease_opt_desc: '',
                left_date: '',
                move_type: '',
                move_to_dept: '',
                left_reason: '',
                left_type:'',
            },
            outTypeList:[],
            left_reason_list: [],
            left_type_list: [],
            oldData:{},
            join_dept_type_list:[],
            editing : false, // 编辑状态
            url:'/v1/member/org-relation-edit',
            uid:this.$route.params.uid,
            ruleValidate: {
                join_dept_time:[
                    {required: true,type:'date', message: '进入党支部日期不能为空', trigger: 'change'}
                ],
                join_dept_type: [
                    {required: true, message: '进入党支部类型', trigger: 'change'}
                ],
                left_date: [
                    {required: true,type:'date', message: '减少时间不能为空', trigger: 'change'}
                ],
                move_type: [
                    {required: true, message: '转出类型不能为空', trigger: 'change'}
                ],
                // move_to_dept:  [
                //     {required: true, message: '转往党组织不能为空', trigger: 'change'}
                // ],
                left_reason: [
                    {required: true, message: '出党原因不能为空', trigger: 'blur'}
                ],
                left_type: [
                    {required: true, message: '出党类型不能为空', trigger: 'blur'}
                ],
            },
            filters:{
                dateFormat(value){
                    if(value==''){return value}
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
                    var t = Y+'-'+ m +'-'+ d;
                    return t;
                }
            }
        }
    },
    methods:{
        getList(type,arr){
            let that = this;
            let qs = require('qs');
            if(that[arr].length>1){
                return
            }
            that.axios({
                method : 'get',
                url : 'v1/dictionary/get-list-by-type',
                params:{
                    type:type
                },
            })
            .then(res=>{
                let needData = res.data;
                if (needData.code == 200) {
                setTimeout(()=>{
                    that[arr] = needData.data;
                },200)
                } else {
                    that.$Message.error(needData.msg);
                }
            })
            .catch(err => {
                this.$Message.error('网络请求异常');
            });
        },
        getData(){
            if (formDataWatcher) {
                formDataWatcher();
                formDataWatcher = null;
            }
            let that = this;
            that.axios({
                url:'/v1/member/org-relation-detail',
                method:'get',
                params:{
                    uid:that.$route.params.uid,
                },
            })
            .then(res=>{
                let needData = res.data;
                if (needData.code == 200) {
                    let _needData = needData.data;
                    for (let key in _needData ) {
                       if(key.indexOf('date')>=0||key.indexOf('time')>=0){
                           _needData[key] = _needData[key] == ""? "" : new Date(_needData[key]);
                       }
                    }
                    that.infoform = Object.assign({},_needData);
                    that.types = _needData.decrease_opt;
                    that.oldData =  Object.assign({},_needData);
                    formDataWatcher = this.$watch('infoform',(newVal, oldVal) => {
                        this.$store.commit('setEdit', {isDisable: true});
                    }, {deep : true});
                } else {
                    that.$Message.error(needData.msg);
                }
            })
            .catch(err=>{
                this.$Message.error('网络请求异常');
            })
        },

        cancelEdit(){
            // 延迟改变默认值
            setTimeout(() => {
                this.infoform = Object.assign({}, this.oldData);
            }, 300)

        },
        save(next){
            // TODO save request
            let that = this;
            this.$refs['infoform'].validate((valid) => {
                if (valid) {
                    let qs = require('qs');
                    let _data = Object.assign({},this.infoform);
                    _data['uid'] = that.uid;
                    for (var key in _data ) {
                        if(key.indexOf('date')>=0||key.indexOf('time')>=0){
                           _data[key] = that.filters.dateFormat( _data[key]);
                        }
                    }
                    that.axios({
                        method : 'post',
                        url : that.url,
                        data:qs.stringify(_data)
                    })
                    .then(res=>{
                        let needData = res.data;
                        if (needData.code == 200) {
                        setTimeout(()=>{
                            that.$Message.success('提交成功!');
                            that.getData();
                            that.$store.commit('setEdit',{isDisable: false});                           
                            next && next();
                        },0)
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
                    _this.outTypeList = res.data.data;
                } else {
                    that.$Message.error(res.data.msg);
                }
            })
        },
    },  
    mounted(){
        this.getList('C03043','join_dept_type_list');
        this.getData();
        this.$store.commit('setEdit',{isDisable: false});
        this.getOutType();
        this.getList('C02027', 'left_reason_list');
        this.getList('DT12', 'left_type_list');

    },
    watch: {
        '$route' (to, from) {
            if (to.query.model) {
                this.modal = to.query.model
            }
            else {
                this.modal = null;
            }
        }
    }
}
</script>
<style scoped>
.memberinfo-grouprelation{
    min-height: 400px;
    height: 100%;
    /* padding: 8px; */
}

.aside-bottom{
    position: absolute!important;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    border-top: 1px solid #ddd;
    padding: 8px;
    text-align: right;
    background-color: #f8f8f8;
}
</style>