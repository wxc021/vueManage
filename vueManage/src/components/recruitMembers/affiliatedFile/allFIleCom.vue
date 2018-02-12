<template>
    <div>
        <!--<Modal-->
                <!--v-model="modal1"-->
                <!--title="查看全部附件"-->
                <!--width="1220"-->
                <!--:loading="loading"-->
                <!--:mask-closable="false"-->
                <!--:closable="true"-->
                <!--class-name="max-height-150 vertical-center-modal"-->
                <!--@on-ok="ok"-->
                <!--ok-text="保存"-->
                <!--@on-cancel="cancel">-->
            <div class="onlinetable-wrap">
                <div class="head-file">
                    <div>全部附件</div>
                </div>
                <ul class="content-file" >
                    <!--<li class="disable">1-01-入党申请书</li>-->
                    <li @click="downFile(item)"  v-for="(item,index) in listData" :class="{'disable':item.status==0}" >{{item.title}}</li>
                </ul>
            </div>
        <!--</Modal>-->
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                modal1: true,
                loading:true,
                listData:[],
                table:{

                },
                tableDate:{
                    yyyy : "",
                    mm : "",
                    dd : ""
                }
            }
        },
        props:['uid'],
        computed:{
            // g2(){
            //     return this.tableDate.yyyy + '年' + this.tableDate.mm + '月' + this.tableDate.dd + '日';
            // }
        },
        methods: {
            ok () {

            },
            cancel () {
                this.$router.go(-1)
            },
            downFile(item){

                let that = this;
                let qs = require("qs");
                if(item.status==1){
                    window.open("/v1/recruit/download-material?template_id="+item.template_id+"&uid="+this.uid)
                }

            },
            //获取详情数据
            getDetail(){
                let that = this;
                let qs = require("qs");
                this.axios({
                    method:'post',
                    url:'/v1/recruit/member-all-material',
                    data:qs.stringify({
                        uid:this.uid
                    }),
                })
                .then( res=>{
                    let needData= res.data;
                    if(needData.code=='200'){
                        needData.data.forEach(item =>{
                            if(item.status=='-1'){
                                item.title='';
                            }
                        })
                        that.listData = needData.data;
                    }else{
                        this.$Message.error(needData.msg);
                    }
                })
                .catch (err=>{
                        this.$Message.error('网络请求失败');
                })
            }
        },
        watch: {

        },
        mounted(){
            this.getDetail()
        }
    }
</script>
<style scoped>
    .onlinetable-wrap{
        width: 100%;
        min-height: 500px;
        margin: 18px auto;
        border:1px solid #e2e2e2;
    }
    .head-file{
        width:100%;
        height: 40px;
        line-height: 40px;
        border-bottom:1px solid #e2e2e2;
        background: #f2f2f2;
        display: flex;
    }
    .head-file div{
        text-indent: 19px;
        flex: 1 ;
    }
    .content-file{
        width: 100%;
        overflow: hidden;
    }

    .content-file li{
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        border-bottom:1px solid #e2e2e2;
        border-right:1px solid #e2e2e2;
        float: left;
        width: 33.33%;
        text-align: center;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    .content-file li.disable{
        color: #bbbbbb;
    }
    .content-file li:last-child{
        border-bottom:0;
    }
    .content-file li:nth-last-child(2){
        border-bottom:0;
    }


    .content-file li:hover{
        color: #d73826;
        background: #fff8f6;
    }
    .content-file li.disable:hover{
        color: #bbbbbb;
        background: #ffffff;
        cursor: default;
    }
    .content-file li:nth-child(3n){
        border-right: 0;
    }



    table{
        width: 100%;
        font-size: 14px;
        border: 1px solid #1c2438;
        border-collapse: collapse;
    }
    table input{
        display: block;
        border: none;
        height: 100%;
        width: 100%;
    }
    table textarea{
        display: block;
        border: none;
        width: 100%;
        height: 100%;
        resize: none;
    }
    td{
        height: 45px;
        border: 1px solid #1c2438;
        text-align: center;
        vertical-align: middle;
    }
    h1{
        font-size: 22px;
        text-align: center;
    }
    input, textarea{
        outline: none;

    }
    input{
        text-align: center;
        vertical-align: middle;
    }
    div{
        font-size: 14px;
    }
    .input-date{
        width: 40px;
        text-align: right;
    }
    .table2{
        margin-top: -1px;
        margin-bottom: 20px;
    }
    .table2 input{
        text-align: center;
    }
    .page-header input{
        border: none;
    }
</style>
