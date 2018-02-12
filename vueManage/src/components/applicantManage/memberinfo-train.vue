<template>
<div class="memberinfo-train">
    <div class="memberinfo-form" style="min-height:550px">
        <Form :label-width="0" ref="infoform" :model="infoform" label-position="top" :rules="ruleValidate">
             <Row>
                <Col span="11"offset='1'>
                    <FormItem label="人员类型"   prop="">
                         <Input disabled  v-model="infoform.type_id_desc"></Input>
                    </FormItem>
                </Col>
                <Col span="11"offset='1'>
                     <FormItem label="发展流程"  prop="">
                          <Input disabled  v-model="infoform.recruit_step"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="11"offset='1'>
                    <FormItem label="申请入党日期"   prop="apply_date">
                        <DatePicker :disabled="false" v-model="infoform.apply_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="11"offset='1'>
                     <FormItem label="列为积极份子日期"  prop="active_date">
                        <DatePicker :disabled="disabledData.active_date < 0" v-model="infoform.active_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row>    
                <Col span="11" offset='1'>
                    <FormItem label="列为发展对象日期"  prop="develop_date">
                        <DatePicker :disabled="disabledData.develop_date < 0" v-model="infoform.develop_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="11" offset='1'>
                    <FormItem label="参加培训日期"  prop="train_date">
                        <DatePicker :disabled="disabledData.train_date < 0" v-model="infoform.train_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <div style="color:#d73826;font-size:14px;font-weight:bold;padding-left:20px;">*发展流程变更请到【发展党员】模块中进行操作</div>
        </Form>
    </div>
    <div class="aside-bottom" v-show="editable">
        <Button @click="save(null, $event)" type="primary">保存</Button>
    </div>
</div>
</template>
<script>
let formDataWatcher = null;
export default {
    name : 'memberinfo-train',
    props: {
        viewdata : null,
        editable : {
            type : Boolean,
            default : true
        }
    },
    data(){
        return{
            infoform : {
                apply_date:'',
                active_date:'',
                train_date:'',
                develop_date:'',
                party_date:'',
                join_source:'',
                type_id : '',
                recruit_step:'',
            },
            oldData:{},
            disabledData:{
                active_date:0,
                develop_date:0,
                train_date:0,
            },
            join_source_list:[],
            url:'/v1/member/recruit-edit',
            uid:this.$route.params.uid,
            ruleValidate: {
                apply_date:[
                    {required: true,type:'date', message: '申请入党日期不能为空', trigger: 'change'}
                ],
            },     
            filters:{
                dateFormat(value){
                    if(value==''){return}
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
    watch:{
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
    methods:{
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
            let that = this;
            that.axios({
                url:'/v1/member/recruit-detail',
                method:'get',
                params:{
                    uid:that.$route.params.uid,
                    opt:1,
                },
            })
            .then(res=>{
                let needData = res.data;
                if (needData.code == 200) {
                    for (let key in needData.data ) {
                        
                        if(key.indexOf('time')>=0||key.indexOf('date')>=0){
                           if( needData.data[key]!=""){
                                needData.data[key] = new Date(needData.data[key]);
                           }else{
                               
                           }
                       }
                    }
                    that.infoform = Object.assign({},needData.data);
                    that.oldData =  Object.assign({},needData.data);
                    formDataWatcher = that.$watch('infoform',(newVal, oldVal) => {
                        that.$store.commit('setEdit', {isDisable: true});
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
                    for (let key in _data ) {
                       if(key.indexOf('time')>=0||key.indexOf('date')>=0){
                            if(_data[key]!=""){
                                _data[key] = that.filters.dateFormat(_data[key]);
                            }   
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
                            if(needData.msg!="" && needData.msg!='ok'){
                                that.$Message.success(needData.msg)
                            }else{
                                that.$Message.success('提交成功!')
                                that.$store.commit('setEdit',{isDisable: false});
                                next && next();
                            };
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
                    this.$Message.error('表单验证失败!');
                }
            });
        },
    },
    mounted(){
        this.getList('C03043','join_source_list');
        this.getData();
        this.getdisableData();
        this.$store.commit('setEdit',{isDisable: false});        
    },
}
</script>
<style scoped>
.memberinfo-train{
    height: 100%;
}
.memberinfo-form{
    padding: 20px 8px 50px 8px;
}
.memberinfo-avatar{
    display: block;
    margin: auto;
    width: 85px;
    height: 120px;
    vertical-align: middle;
}
.aside-bottom{
    position: absolute!important;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ddd;
    padding: 8px;
    text-align: right;
    background-color: #f8f8f8;
}
</style>
