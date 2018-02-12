<template>
<div class="memberinfo-train start-box box-orient">
    <div class="memberinfo-form box-flex">
        <Form :label-width="0" ref="infoform" :model="infoform" :rules="ruleValidate">
            <Row>
                <Col span='12'>
                    <FormItem class="reset-style" label="申请入党日期"  prop="apply_date">
                        <DatePicker :disabled="!editing" v-model="infoform.apply_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem class="reset-style" label="列为积极份子日期" prop="active_date">
                        <DatePicker :disabled="!editing" v-model="infoform.active_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
            </Row> 
            <Row>
                <Col span='12'>
                    <FormItem class="reset-style" label="列为发展对象日期" prop="develop_date">
                        <DatePicker :disabled="!editing" v-model="infoform.develop_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem class="reset-style" label="参加培训日期" prop="train_date">
                        <DatePicker :disabled="!editing" v-model="infoform.train_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
            </Row> 
            <Row>
                <Col span='12'>
                    <FormItem class="reset-style" label="入党日期" prop="party_date">
                        <DatePicker :disabled="!editing" v-model="infoform.party_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem class="reset-style" label="转正日期">
                        <DatePicker :disabled="!editing" v-model="infoform.join_party_date" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
            </Row> 
            <Row>
                <Col span='12'>
                    <FormItem class="reset-style" label="转正情况">
                        <Select v-model="infoform.to_normal_type" :disabled="!editing">
                            <Option v-for='item in to_normal_type_list' :key="item.id" :value="item.id" :disabled="item.choosed==0">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span='12'>
                    <FormItem class="reset-style" label="入党介绍人">
                        <Input :disabled="!editing"  v-model="infoform.party_introducer"></Input>
                    </FormItem>
                </Col>
            </Row> 
        </Form>
    </div>
    <div class="aside-bottom" v-show="editable">
        <Button v-show="!editing" @click="toggleEdit" type="primary">编辑</Button>
        <Button v-show="editing" @click="cancelEdit" type="ghost">取消</Button>
        <Button v-show="editing" @click="save('infoform')" type="primary">保存</Button>
    </div>
</div>
</template>
<script>
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
                develop_date:'',
                train_date:'',
                party_date:'',
                join_party_date:'',
                party_introducer:'',
                to_normal_type:'',
            },
            editing:false,
            oldData:{},
            to_normal_type_list:[],
            url:'/v1/member/recruit-edit',
            uid:this.$route.params.uid,
            ruleValidate: {
                
                apply_date:[
                    {required: true,type:'date', message: '申请入党日期不能为空', trigger: 'change'}
                ],
                active_date:[
                    {required: true,type:'date', message: '列为积极份子日期不能为空', trigger: 'change'}
                ],
                develop_date:[
                    {required: true,type:'date', message: '列为发展对象日期不能为空', trigger: 'change'}
                ],
                train_date:[
                    {required: true,type:'date', message: '参加培训日期不能为空', trigger: 'change'}
                ],
                party_date:[
                    {required: true,type:'date', message: '入党日期不能为空', trigger: 'change'}
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
            let that = this;
            that.axios({
                url:'/v1/member/recruit-detail',
                method:'get',
                params:{
                    uid:that.$route.params.uid,
                },
            })
            .then(res=>{
                let needData = res.data;
                if (needData.code == 200) {
                    for (var key in needData.data ) {
                       if(key.indexOf('time')>=0||key.indexOf('date')>=0){
                           if( needData.data[key]!==""){
                                needData.data[key] = new Date(needData.data[key]);
                           }
                       }
                    }
                    that.infoform = Object.assign({},needData.data);
                    that.oldData =  Object.assign({},needData.data);
                    
                } else {
                    that.Message.error(needData.msg);
                }
            })
            .catch(err=>{
                this.Message.error('网络请求异常');
            })
        },
        toggleEdit(){
            this.editing = !this.editing
        },
        cancelEdit(){
            // 延迟改变默认值
            setTimeout(() => {
                this.infoform = Object.assign({}, this.oldData);
            }, 300)
            this.toggleEdit();
        },
        save(name){
            // TODO save request
            let that = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let qs = require('qs');
                    let _data = Object.assign({},this.infoform);
                    _data['uid'] = that.uid;
                    for (var key in _data ) {
                       if(key.indexOf('time')>=0||key.indexOf('date')>=0){
                           _data[key] = that.filters.dateFormat(_data[key]);
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
                            that.toggleEdit();
                            //that.getData();
                        },200)
                        } else {
                            that.$Message.error(needData.msg);
                        }
                    })
                    .catch(err => {
                        this.$Message.error('网络请求异常');
                    });
                
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        },
    }, 
    mounted(){
        this.getList('C02018','to_normal_type_list');
        this.getData();
    },
}
</script>
<style scoped>
.info-detail {
    padding: 0 15px;
}
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
    /*position: absolute;*/
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ddd;
    padding: 8px;
    text-align: right;
    background-color: #f8f8f8;
}
</style>