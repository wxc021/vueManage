<template>
    <div>
        <!--<DatePicker  type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width:309px"></DatePicker>-->
        <!--<Input v-model="number" placeholder="请输入..." style="width: 300px"></Input>-->
        <table>
            <thead>
                    <th>表格</th>
                    <th>填写</th>
                    <th style="width:270px;">成果</th>
            </thead>
             <tbody>
                <tr v-for="(item,index) in msg" >
                    <td>{{item.title}}</td>
                    <!--<td v-if="item.type=='1'"><span @click="onlineTable(item)">在线填表</span></td>-->
                    <td>
                        <span v-if="item.type=='2'" @click="onlineTable(item)">在线填表</span>
                        <span v-if="item.download=='1'" @click="downloadTable(item)">下载表格</span>
                        <span v-if="item.download=='1'" @click="normalTemp(item)">下载空模版</span>
                    </td>
                    <td style="display: flex;justify-content: center">
                      <Upload ref="file" v-if="item.type=='1' || item.type=='2' " style=""
                        :show-upload-list="false"
                        :before-upload="getToken"
                        :data="postData"
                        :on-success="successFile"
                        :action="globalUploadUrl"
                    >
                          <!--http://10.20.1.141:8880/mptup-->
                          <!--http://192.168.41.175/upload.php-->
                      <Button size="small" @click="getTemplateId(index,item.template_id)" type="text" icon="">上传附件</Button>
                    </Upload>
                    <!--<span @click="normalFile(item)">查看附件</span>-->
                    <Button v-show="item.isChecked=='1'" style="line-height: 48px;" @click="normalFile(item)" size="small" type="text" icon="">查看附件</Button>
                    </td>
                </tr>
                <tr v-if="msg.length == 0">
                    <td colspan="3">暂无数据</td>
                </tr>
                <!--<tr>-->
                    <!--<td>党员推荐入党积极分子汇总表</td>-->
                    <!--<td><span>在线填表</span><span>下载空模版</span></td>-->
                    <!--<td><span>上传附件</span><span>查看附件</span></td>-->
                <!--</tr>-->
                 <!--<tr>-->
                    <!--<td>党员推荐入党积极分子汇总表</td>-->
                    <!--<td><span>在线填表</span><span>下载空模版</span></td>-->
                    <!--<td><span>上传附件</span><span>查看附件</span></td>-->
                <!--</tr>-->
                 <!--<tr>-->
                    <!--<td>党员推荐入党积极分子汇总表</td>-->
                    <!--<td><span>在线填表</span><span>下载空模版</span></td>-->
                    <!--<td><span>上传附件</span><span>查看附件</span></td>-->
                <!--</tr>-->
                 <!--<tr>-->
                    <!--<td>党员推荐入党积极分子汇总表</td>-->
                    <!--<td><span>在线填表</span><span>下载空模版</span></td>-->
                    <!--<td><span>上传附件</span><span>查看附件</span></td>-->
                <!--</tr>-->
            </tbody>
        </table>
        <!--<div class="start-box box-pack" style="margin-top:20px;">-->
            <!--<p class="box-flex"><span style="font-weight:bold;">注意：</span>附件须上传PDF格式文件，若是图片可粘贴至WPS中再导出至PDF</p>-->
            <!--<p class="box-flex" style="text-align:right;">-->
                <!--<Button type="primary" @click="nextProcess" v-if="isNextBtnShow">提交并进入下一个流程</Button>-->
            <!--</p>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name:'dataTable',
        data(){
          return{
            number:'',//志愿书编号
            token:'',
            postData:{},
            templateId:'',
            isShowCheckBtn:[],//是否显示查看附件
              index:'',
          }
        },
        props: ['msg','isNextBtnShow','uid','step_id'],
        computed:{
            globalUploadUrl(){
                return globalUploadUrl
            }
        },
        methods:{
            //下载表格
          downloadTable(item){
             window.open("/v1/recruit/download-table-data?template_id="+item.template_id+"&uid="+this.uid.uid)
          },
          normalTemp(item){
              window.open("/v1/recruit/download-template?template_id="+item.template_id)
          },
          normalFile(item){
              let that = this;
              let qs = require('qs');
              that.axios({
                          url:'/v1/recruit/member-step-material',
                          method:'post',
                          data:qs.stringify({
                              uid:that.uid.uid,
                              step_id:that.step_id,
                          }),
                      })
                      .then((res)=>{
                          let needData = res.data;
                      if(needData.code=='200'){
                          console.log(item.template_id,needData.data);
                            if(needData.data[item.template_id]=='1'){
                                window.open("/v1/recruit/download-material?template_id="+item.template_id+"&uid="+this.uid.uid)
                            }else {
                                that.$Message.error('该附件没有上传,请上传');
                            }
                      } else {
                          that.$Message.error(needData.msg)
                      }
                  })
                  .catch(err=>{
                          that.$Message.error('网络请求异常');
                  })



            //location.href="/v1/recruit/download-material?template_id="+item.template_id+"&uid="+this.uid.uid
          },
          getTemplateId(index,templateId){
            this.templateId = templateId;
            this.index=index;
          },
          //在线填表
          onlineTable(item){
            console.log(item.template_id, this.uid.uid);
            this.$router.push({
              name:'recruitTable'+item.template_id,
              params:{
                id:item.template_id,
              },
              query:{
                uid:this.uid.uid
              }
            });
       },
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
                  that.$refs.file[0].post(file);
                })
                .catch(function(err) {
                  console.log(err);
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
            if (res.errno=='0'){
              console.log(file.name);
              that.axios({
                url:'/v1/recruit/upload-material',
                method:'post',
                data:qs.stringify({
                  uid:that.uid.uid,
                  template_id:that.templateId,
                  file_id:file.response.data.filesha1,
                  file_name:file.name
                })
              })
              .then((res)=>{
                let needData = res.data;
                if(needData.code=='200'){
                    that.$Message.success('上传成功')
                    that.msg[that.index].isChecked='1';
                }else{
                  that.$Message.error(needData.msg)
                }
              })
              .catch(err=>{
                  that.$Message.error('网络请求异常');
              console.log(err);
            })
            }else{
              this.$Message.error('上传失败');
            }
          },
        }
    }
</script>

<style scoped>
    table{margin-top: 8px; border-collapse: collapse;text-align: center;width: 100%;color: #333;font-family: "微软雅黑"; border: 1px solid #e2e2e2;}
    table thead{line-height: 40px;background: #F8F8F9;font-weight: normal;}
    table thead {border-bottom: 1px solid #e9eaec;border-top: 1px solid #e9eaec;}
    table thead th{font-weight: bold;background: #f2f2f2;}
    table tbody tr{line-height: 48px;height: 48px;border-bottom: 1px solid #e9eaec;;color: #333;box-sizing: border-box}
    /*table tbody tr:hover{background-color: #EBF7FF}*/
    table tbody tr.drag:hover{background-color: #eee;cursor: move}
    table tbody td,table thead th{ border-right:1px solid #e9eaec;}
    table tbody td span{display: inline-block;margin-right: 10px;cursor: pointer}
    table tbody td span:hover{color: #d73826}
</style>
