<template>
    <div>
        <Modal
            v-model="modal1"
            title="退回理由"
            width="800"
            :loading="loading"
            :mask-closable="false"
            :closable="false"
            class-name="max-height vertical-center-modal"
            @on-ok="ok"
            @on-cancel="cancel">
            <Input style="border:none;" v-model="formItem.textarea" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请输入退回理由..."></Input>
        </Modal>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                modal1: true,
                loading:true,
                formItem:{
                    textarea:''
                },
                tableDate:{

                }
            }
        },
        computed:{

        },
        methods: {
            ok () {
              let that = this;
              let qs = require("qs");
                console.log(that.$route.params);
                this.axios({
                      method:'post',
                      url:'/v1/recruit/check-material',
                      data:qs.stringify({
                          uid:that.$route.params.uid,
                          step_id:that.$route.params.step_id,
                          check:'-1',
                          reason:that.formItem.textarea
                      }),
                  })
                  .then( res=>{
                      let needData= res.data;
                      if(needData.code=='200'){
                          this.$Modal.remove()
                          setTimeout(function(args) {
                              console.log(that);
                              that.$router.push({name:'recruitExamine'});
                          }, 30)
                          this.$Message.success('驳回成功');
                      }else{
                          setTimeout(() => {
                              that.loading = false;
                              that.$nextTick(() => {
                                  that.loading = true;
                              });
                          }, 1000);
                          this.$Message.error(needData.msg);
                      }
                  })
                  .catch (err=>{
                      setTimeout(() => {
                          that.loading = false;
                          that.$nextTick(() => {
                              that.loading = true;
                          });
                      }, 1000);
                      this.$Message.error('网络请求失败');
                  })









            },
            cancel () {
              let that = this;
              this.$Modal.remove()
              setTimeout(function(args) {
                that.$router.push({name:'recruitExamine'});
              }, 30)
            },
            //获取详情数据
            getDetail(){
              let that = this;
              let qs = require("qs");
              this.axios({
                method:'post',
                url:'/v1/recruit/get-table-data',
                data:qs.stringify({
                  uid:that.$route.query.uid,
                  template_id:that.$route.query.id,
                  opt:'1'
                }),
              })
              .then( res=>{
                let needData= res.data;
                if(needData.code=='200'){
                  let baseInfotData=needData.data.baseinfo;
                  let contentData=needData.data.content;
                  for(let key in baseInfotData){
                    that.table[key]=baseInfotData[key];
                  }
                  for(let key in contentData){
                    that.table[key]=contentData[key];
                  }
                }else{
                  this.$Message.error(needData.msg);
                }
              })
              .catch (err=>{
                this.$Message.error('网络请求失败');
              })
            }
        },
      mounted(){
//        this.getDetail()
      }
    }
</script>
<style scoped>
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
