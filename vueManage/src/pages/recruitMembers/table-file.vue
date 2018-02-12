<template>
    <div>
      <Upload ref="file" style="float: right;margin-bottom: 10px;"
              :show-upload-list="false"
              :before-upload="getToken"
              :data="postData"
              :on-success="successFile"
              :on-preview="previewFile"
              :action="globalUploadUrl"
      >
        <Button size="large" type="error" icon="">上传</Button>
      </Upload>
      <table>
            <thead>
                <tr>
                    <th>标题</th>
                    <th>上传时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in data">
                    <td>{{item.file_name}}</td>
                    <td>{{item.createdt}}</td>
                    <td>
                        <Button @click="render('1',item)" style="padding: 6px;" type="text"><Icon type="compose"></Icon> 编辑</Button>
                        <Button @click="render('2',item)" style="padding: 6px;" type="text"><Icon type="search"></Icon> 查看</Button>
                        <Button @click="remove(item,index)" style="padding: 6px;" type="text"><Icon type="trash-a"></Icon> 删除</Button>
                    </td>
                </tr>
                <tr v-if="data.length==0">
                    <td  colspan="3">暂无数据</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          token:'',
          data:[],//列表数据
          postData:{},
          newVal: '',
        }
      },
      props:['fileTableData','uid','templateid'],
      watch:{
        fileTableData: function (val) {
          this.data=this.getData;
        }
      },
      computed:{
        getData(){
          let dataMsg=this.fileTableData
          return dataMsg
        },
        globalUploadUrl(){
          return globalUploadUrl
        }
      },
      methods:{
        pro(isTrue) {
          return new Promise(function(resolve, reject) {
            if (isTrue) {
              resolve();
            } else {
              reject();
            }
          });
        },
        //获取文件上传token
        getToken(file){
          let that = this;
          let qs = require('qs');
          that.axios({
            url:'/v1/file/uptoken',
            method:'post',
          })
          .then((res)=>{
            let needData = res.data;
            if(needData.code=='200'){
              that.postData={};
              that.postData.uptoken  = needData.data.uptoken;
              that.postData.size  = file.size;
              that.postData.start='0';
              that.postData.end='0';
              return that.pro(true)
              .then(function(res) {
                console.log(that.$refs)
                that.$refs.file.post(file);
              })
              .catch(function() {
              })
            } else {
              that.$Message.error(needData.msg)
            }
          })
          .catch(err=>{
            that.$Message.error('网络请求异常');
          })
          return false;
        },
        successFile(res,file,fileList){
          let that = this;
          let qs = require('qs');
          console.log(that.postData);
          if (res.errno=='0'){
            that.axios({
                url:'/v1/recruit/step-normal-user-material-add',
                method:'post',
                data:qs.stringify({
                  uid:that.uid,
                  template_id:that.templateid,
                  file_id:file.response.data.filesha1,
                  file_name:file.name
                })
              })
              .then((res)=>{
                let needData = res.data;
                if(needData.code=='200'){
                  that.axios({
                      method:'post',
                      url:'/v1/recruit/step-normal-user-material',
                      data:qs.stringify({
                        uid:that.uid,
                        template_id:that.templateid,
                        opt:'1'
                      })
                    })
                    .then(res =>{
                      let needData = res.data;
                      if(needData.code=='200'){
                        that.data = needData.data;
                      }
                    })

                }else{
                  that.$Message.error(needData.msg)
                }
              })
              .catch(err=>{
                that.$Message.error('网络请求异常');
              })
          }else{
            this.$Message.error('上传失败');
          }


        },
        previewFile(file){
          console.log(file);
        },
        render (type,item) {
          // type: 1是编辑 2是查看
          let disabled = false;
          let that = this;
          let qs = require('qs');
          if(type=='1'){
            disabled=false;
          }else if(type=='2'){
//              location.href='/v1/recruit/step-normal-user-material-download?id='+item.id;
              window.open('/v1/recruit/step-normal-user-material-download?id='+item.id);
              disabled=true;
              return
          }
          this.$Modal.confirm({
              onOk: () => {
                  that.axios({
                    url:'/v1/recruit/step-normal-user-material-rename',
                    method:'post',
                    data:qs.stringify({
                      id:item.id,
                      file_name: that.newVal,
                      opt:'1'
                    })
                  })
                  .then((res)=>{
                    let needData = res.data;
                    if(needData.code=='200'){
                      item.file_name= that.newVal;
                    } else {
                      that.$Message.error(needData.msg)
                    }
                  })
                  .catch(err=>{
                      that.$Message.error('网络请求异常');
                  })
              },
              onCancel: () => {
                  
              },
              render: (h) => {
                return h('Input', {
                  props: {
                    value: item.file_name,
                    disabled:disabled,
                    autofocus: true,
                    placeholder: '请输入修改的标题名'
                  },
                  on: {
                    input: (val) => {
                      that.newVal = val;
                    },
                  }
                })
              },
          })
        },
        remove(item,index){
          let id =item.id;
          var that= this;
          let qs = require('qs');
          this.$Modal.confirm({
            title:'温馨提示:',
            content:'是否删除该条信息',
            onOk() {
              that.axios({
                  url:'/v1/recruit/step-normal-user-material-delete',
                  method:'post',
                  data:qs.stringify({
                    id:item.id
                  })
                })
                .then((res)=>{
                  let needData = res.data;
                  if(needData.code='200'){
                    that.$Message.success('删除成功!');
                    that.data.splice(index, 1);
                  }
              })
            }
          })
        }
      },
      mounted(){
        this.data=this.getData;
      }

    }
</script>

<style scoped>
    table{margin-top: 8px; border-collapse: collapse;text-align: center;width: 100%;color: #333;font-family: "微软雅黑"; border: 1px solid #e2e2e2;}
    table thead{line-height: 40px;background: #F8F8F9;font-weight: normal;}
    table thead {border-bottom: 1px solid #e9eaec;border-top: 1px solid #e9eaec;}
    table thead th{font-weight: bold;background: #f2f2f2;}
    table tbody tr{line-height: 48px;height: 48px;border-bottom: 1px solid #e9eaec;;color: #333;box-sizing: border-box}
    table tbody tr:hover{background-color: #EBF7FF}
    table tbody tr.drag:hover{background-color: #eee;cursor: move}
    table tbody td,table thead th{ border-right:1px solid #e9eaec;}
    table tbody td span{display: inline-block;margin-right: 10px;cursor: pointer}
    table tbody td span:hover{color: #d73826}
</style>
