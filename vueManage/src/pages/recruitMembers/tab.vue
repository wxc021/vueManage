<template>
    <div class='task-step-box'>

        <div class="nav-box" >
            <div class="nav-box-item"
                 v-for="(item,index) in navList"
                 :class="{sel:item.active}"
                 @click="navClickItem(item,index)">
                {{item.name}}</div>
        </div>
        <div class="wrap-tab" v-show="isProcessShow">
            <div style="clear:both;overfllow:hidden;">
                <div class="task-step1" v-if="users.uid==undefined">
                    <div @click="initStep" v-for="(item,index) in init_task_step"  :style="{'z-index':init_task_step.length-index}" :class="{active: index==0 }">{{item}}</div>
                </div>
                <div class="task-step"><!-- ,bg-disable:item.disableCol-->
                    <div v-for="(item,index) in task_step" @click="active(item.id,item)" :class="{active:item.active=='true',disable:item.disableCol}" :style="{'z-index':task_step.length-index}" >{{index+1}}<span >、{{item.title}}</span></div>
                </div>
            </div>
            <div class="wrap-datatable" v-show="isTabShow">
                <div class="task-branch-step">
                    <div @click="clickMe(item,index)" v-for="(item,index) in task_branch_module" :class="{bingo:item.status=='1', error:item.status=='-1', active:item.status=='0', active:item.status=='2'}">
                        <p class="task-status" style="height:21px">
                          {{item.status==1?'已通过':item.status=='-1'?'被驳回':item.status=='0'?'待审核':item.status=='2' ?'':''}}
                          <Tooltip class="wxc-tip" v-if="item.status=='-1'" :content="item.reason">
                            <Icon style="font-size: 16px;color: #d73826;" type="ios-information-outline"></Icon>
                          </Tooltip>
                        </p>
                        <!--<p><span :class="{'active-bg':item.status=='1' || item.status=='0' || item.status=='-1'}">{{item.step}}</span>{{item.content}}</p>-->
                        <p :class="{'nostep':item.status=='4'}"><span :class="{'active-bg':item.activeClass,'current':item.currentClass}">{{item.step}}</span>{{item.content}}</p>
                    </div>
                </div>
                <!--<p style="font-size:12px;border-bottom:1px solid #ddd;padding-bottom:10px;margin-bottom:20px;"><span style="font-weight:bold">材料：</span>入党申请人基本情况；推荐和推优情况；支部委员会建议等。<span style="font-weight:bold">要求：</span>了解入党积极分子是否具备条件；手续是否齐全</p>-->
                <p style="font-size:12px;border-bottom:1px solid #ddd;padding-bottom:10px;margin-bottom:20px;">{{remark}}</p>
                <div v-if="isNextBtnShow" class="" style="clear: both;overflow: hidden;margin-bottom: 20px;">
                    <div v-for="item in stepInput" style="float: left;margin-right: 10px;">
                        <!---->
                        <DatePicker :transfer=true v-if="item.type=='date'" type="date" v-show="isShowDate && isShowDateAll" v-model="postData[item.field]" format="yyyy-MM-dd"   :placeholder="item.name" style="width:309px;float: left;"></DatePicker>
                        <!--<Input v-model="number" v-if="isShowText" placeholder="请填写志愿书编号" style="width: 300px"></Input>-->
                        <Cascader :placeholder="item.name" :data="item.name=='转正情况'?to_normal_type_list : join_source_list" v-show="isShowDate && isShowDateAll" v-if="item.type=='select'" v-model="postData[item.field]" style="width: 300px; float: left;margin-left: 20px;" :render-format="renders" :transfer=true ></Cascader>
                    </div>
               </div>
                <dataTable v-if="isShow" :msg="dataparams" :uid="users" :step_id="step_id" :isNextBtnShow="isNextBtnShow"></dataTable>
                <div v-show="isShow" class="start-box box-pack" style="margin-top:20px;">
                  <p class="box-flex"><span style="font-weight:bold;">注意：</span>附件须上传PDF格式文件，若是图片可粘贴至WPS中再导出至PDF</p>
                  <p class="box-flex" style="text-align:right;"><!--v-show="isShowDate && isShowDateAll"-->
                    <Button type="primary" @click="nextProcess" v-if="isNextBtnShow">提交并进入下一个流程</Button>
                  </p>
                </div>
            </div>
        </div>
        <!--{{fileIsShow}}{{users.uid}}{{template_id}}-->
        <!--{{users.uid}}-->
        <fileTable v-if="fileTableIsShow" :fileTableData="fileTableData" :uid="uid" :templateid="template_id"></fileTable>
        <allFile  v-if="allFileShow" :uid="file_uid"></allFile>
    </div>
</template>

<script type="text/ecmascript-6">
    import dataTable from '@/pages/recruitMembers/table-data.vue'
    import fileTable from '@/pages/recruitMembers/table-file.vue'
    import allFile from '@/components/recruitMembers/affiliatedFile/allFIleCom.vue'

    export default {
        name:'recruit-tab',
        data(){
            return {
                navList:[

                ],//导航菜单
                init_task_step:[],//初始化步骤
                fileTableIsShow:false,//是否显示思想汇报的数据表格
                allFileShow:false,//查询附件是否显示
                isProcessShow:true,//是否显示发展流程
                file_uid:'',//附件的uid
                postData:{},//传递数据
                stepInput:[],//当前步骤填写
                copyStepInput:[],//复制当前步骤
                isShowDateAll:true,//尚未提交的显示
                date:'',
                to_normal_type_list:[],//转正情况
                join_source_list:[],//入党类型
                isShow: true,
                number:'',//志愿书编号
                crateDate:'',//申请时间
                datePlaceholder:'',
                statData: [],
                stepIndex : 0,
                task_step : [],
                dataparams:[],//步骤列表信息
                topBtn:[],//头部按钮  思想汇报 & 发展党员工作信访情况记录
                task_branch_module:[],//小步骤数据源
                fileTableData:[],//思想汇报的列表信息
                btn_index:'',//点击按钮的index
                template_id:'',//模板id
                uid:'',//用户id
                isNextBtnShow:false,//提交到下步是否显示
                childId:'',//小步骤id
                isShowDate:false,//v-show 绑定  是否显示,
                isShowText:false,//v-show 绑定志愿书编号  是否显示
                step_id:'',//传递给子组件的小步骤序号
                currentIndex:'',//当前小步骤索引
                treeModle:[],//保存步骤tree的数据
                remark:'',//每个小步骤的备注
//                currentClass:false
            }
        },
        props:['users','processTree','getStepTree','isTabShow'],
        components:{
            dataTable,
            fileTable,
            allFile
        },
        methods: {
            //初始化切换发展步骤
            initStep(){
                this.$Message.error('请选择发展党员')

            },
            //头部切换导航
            navClickItem(items,index){
                if (this.users.uid=='' || this.users.uid==undefined){
                   this.$Message.error('请选择发展党员')
                    return
                }

                this.navList.forEach(item=>{
                  item.active = false
              });
                this.navList[index].active = true
                if(index=='0'){
                    this.isShow=true;
                    this.fileTableIsShow=false;
                    this.allFileShow=false;
                    this.isProcessShow=true;
                }
                else if (index=='1'||index=='2'){
                    this.clickBtn(items.template_id,index)
                    this.fileTableIsShow=true
                    this.isProcessShow=false;
                    this.allFileShow=false;
                }else if(index=='3'){
                    this.file_uid=this.users.uid
                    this.allFileShow=true;
                    this.isProcessShow=false;
                    this.fileTableIsShow=false;
                }


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
            //点击每个操作小步事件
            clickMe(item,index){

//                console.log(this.isShowDate,this.isNextBtnShow);
                if (item.status=='4'){
                    this.$Message.error('此用户没有该步骤权限');
                    return;
                }
                //将思想汇报按钮取消高亮
                this.topBtn.forEach(item=>{
                    item.active='false'
                })


                //循环步骤树取备注信息 渲染到页面
                this.processTree.forEach(itemParent=>{
                    itemParent.child.forEach(itemChild=>{
                        if(itemChild.id==item.id){
                            this.remark = itemChild.remark
                        }
                    })
                })

                console.log(item.step);
                this.stepInput=[];
                if (item.step==25){
                    this.isNextBtnShow=false;
                    this.isShowDate=false;
                    this.isShowDateAll=false;
                }else{
                    if(item.id==this.childId){
                        this.isNextBtnShow=item.status=='0' ?false :true;
                        this.stepInput =this.copyStepInput
                        this.isShowDate=true;
                    }else{
                        this.isNextBtnShow=false;
                        this.isShowDate=false;
                    }
                }
                this.task_branch_module.forEach((item,index)=>{
                    item.activeClass=false;
                })
               if(index==this.currentIndex){
                   this.task_branch_module[index].currentClass=true
               }else {
                   this.task_branch_module[index].currentClass=true
               }
//                console.log(index, this.currentIndex,this.task_branch_module[index].currentClass);

                this.task_branch_module[index].activeClass=true

                this.step_id=item.id;


//              if(item.id==this.childId){
//                this.isNextBtnShow=item.status=='0' ?false :true;
//                  this.stepInput =this.copyStepInput
//                  this.isShowDate=true;
//              }else{
//                this.isNextBtnShow=false;
//                this.isShowDate=false;
//              }
//                console.log(this.stepInput);
                this.isShow=true;
              let that = this;
              let qs = require('qs');
//                console.log(item);
                this.axios({
                method:'post',
                url:'/v1/recruit/step-material',
                data:qs.stringify({
                  step_id:item.id
                })
              })
              .then(res =>{
                let needData = res.data;
                if(needData.code=='200'){
                    let postData= [];
                    postData = needData.data;
//                    console.log(that.users.uid,that.dataparams,item.step);
                    that.axios({
                        url:'/v1/recruit/member-step-material',
                        method:'post',
                        data:qs.stringify({
                            uid:that.users.uid,
                            step_id:item.id,
                            opt:'1'
                        }),
                    })
                    .then((res)=>{
                        let needData = res.data;
                        if(needData.code=='200'){
//                            console.log(that.dataparams);
                                postData.forEach(item=>{
                                item.isChecked = '0'
//                                console.log(needData.data[item.template_id]);
                                if(needData.data[item.template_id]=='1'){
                                    item.isChecked='1';
                                }
                            })
                            that.dataparams = postData;
                            console.log();

                        } else {
                            that.$Message.error(needData.msg)
                        }
                    })


                }
              })
            },
            active(pid,item) {
                console.log('active');
//                console.log(index,item)
//                return
              if(+item.id>+this.users.step_pid){
                this.$Message.error('此用户没有该步骤权限');
                return;
              }

                //获取小步骤数据源
              this.axios({
                  method: 'get',
                  url: '/v1/recruit/step-process'
              })
              .then(res => {
                  let  that = this;
                  this.task_step.forEach(function(item,index){
                      if(pid==item.id){
                          item.active = 'true';
                          that.stepIndex = index;
                      }else{
                          item.active = 'false';
                      }
                  });
                  this.statData = this.processTree;
                let needData = res.data;
//                  console.log(this.getStepTree==needData.data);
                  that.task_branch_module =[];
                if (needData.code == '200') {
                  for (let i=0; i< needData.data[item.id].child.length; i++) {
//                     console.log(i);
                    let childId = needData.data[item.id].child[i].id;
                    //判断是否已启用
                    if (that.users.step_info[childId].enable=='1'){
                        //判断是否为当前步
                        if (that.users.step_info[childId].current=='1'){
                            this.childId=childId;
                            if (that.users.step_info[childId].check_status=='null') {//null 为不需要审核
                              that.task_branch_module.push({
                                step: this.statData[this.stepIndex].child[i].ordernum,
                                id: this.statData[this.stepIndex].child[i].id,
                                content: this.statData[this.stepIndex].child[i].name,
                                status: "2",
                                reason:that.users.step_info[childId].reason,
                                activeClass:true,
                                currentClass:false
                              });

                                this.statData[this.stepIndex].child[i].key_field.forEach(item =>{
                                    that.postData[item.field]=item.type=='date'? '' : [];
                                })
                                that.stepInput = this.statData[this.stepIndex].child[i].key_field
                                console.log(that.stepInput);
//                                console.log('当前步1');
                                that.copyStepInput=this.statData[this.stepIndex].child[i].key_field


                            }else{
                              //如果状态是待审核 0  就屏蔽下一步按钮
                              if (that.users.step_info[childId].check_status=='0'){
                                that.isNextBtnShow=false;
                              }
                                that.task_branch_module.push({
                                step: this.statData[this.stepIndex].child[i].ordernum,
                                id: this.statData[this.stepIndex].child[i].id,
                                content: this.statData[this.stepIndex].child[i].name,
                                status: that.users.step_info[childId].check_status,
                                reason:that.users.step_info[childId].reason,
                                activeClass:true,
                                currentClass:false
                              });
                            }
                            this.clickMe(that.task_branch_module[i],i)
//                            console.log(i);
                            this.currentIndex = i;

                        }else{
//                            console.log(this.statData[this.stepIndex].child[i].ordernum);
                            that.task_branch_module.push({
                                step: this.statData[this.stepIndex].child[i].ordernum,
                                id: this.statData[this.stepIndex].child[i].id,
                                content: this.statData[this.stepIndex].child[i].name,
                                status: 1,
                                reason:that.users.step_info[childId].reason,
                                activeClass:false,
                                currentClass:false
                              });
                        }
                     }else {
                        that.task_branch_module.push({
                         step: this.statData[this.stepIndex].child[i].ordernum,
                         id: this.statData[this.stepIndex].child[i].id,
                         content: this.statData[this.stepIndex].child[i].name,
                         status: 4,
                         reason:that.users.step_info[childId].reason,
                         activeClass:false,
                         currentClass:false
                       });
                    }
                  }
                }else {
                  that.$Message.error(needData.msg)
                };
              });
            },
            getSteps(flag){
                console.log('getSteps');
                let  _this = this;
              this.axios({
                    method: 'get',
                    url: '/v1/recruit/step-process'
                })
                .then(res => {
                    if (res.data.code == 200) {
                        _this.statData = _this.processTree;
                        _this.task_step = [];
                        for(let i=0; i<_this.statData.length; i++){

                            let active = 'false';
                            if ( i == 0) {
                                active = 'true';
                            };
                            _this.task_step.push({
                                title: this.statData[i].name,
                                id:this.statData[i].id,
                                active : '',
                                disableCol:''
                            })

                            _this.task_step[i].disableCol=+this.statData[i].id<=+_this.users.step_pid ? false : true;
                            if(this.statData[i].id==_this.users.step_pid){
                                _this.task_step[i].active='true'
                            }
                        }
                            let init_task_step=[];

                           let needData = res.data;
                            for(let key in needData.data){
                                _this.init_task_step.push(needData.data[key]['name']);
                            }

                    };
                });
            },
            //获取按钮
            getButton(){
              let that = this;
              let qs = require('qs');
              this.axios({
                method:'post',
                url:'/v1/recruit/step-normal',
//                params:{opt:1},
              })
              .then(res =>{
                let needData = res.data;
                if(needData.code=='200'){

                  needData.data.forEach(item =>{
                    item.active = false;
                  })

                  that.navList = needData.data;
                  that.navList[0].active='true';
                }
              })
            },
            //点击思想汇报 & 发展党员工作信访情况记录 按钮事件
            clickBtn(id,index){
              //时间/志愿书 输入框 不显示
              this.isShowDate=false
              this.isShowText=false,

              this.btn_index = index;
//              this.topBtn.forEach(function(item){
//                item.active = 'false';
//              });
//              this.topBtn[index].active = 'true';
              this.isShow=false;
              let that = this;
              let qs = require('qs');
              this.axios({
                  method:'post',
                  url:'/v1/recruit/step-normal-user-material',
                  data:qs.stringify({
                    uid:that.users.uid,
                    template_id:id,
                    opt:'1'
                  })
                })
                .then(res =>{
                let needData = res.data;
                if(needData.code=='200'){
                  that.fileTableData = needData.data;
                  that.template_id = id;
                  that.uid = that.users.uid;
                }
              })

          },
          //提交到下一流程
          nextProcess(){
              let that = this;
              let qs = require('qs');
            this.$Modal.confirm({
                title: '友情提示:',
                content: '<p>进入下一流程则不可回退，请确认是否要进入下一流程？</p>',
                onOk: () => {

                    let postVal = '';
//                    if(that.crateDate == ''&& that.isShowDate==true){
//                        that.$Message.error('请输入表单中的值')
//                        return;
//                    }
                    if (that.crateDate != '') {
                        postVal = that.crateDate.format('yyyy-MM-dd');
                    } else if (that.number != '') {
                        postVal = that.number;
                    }
                        let newPostData = Object.assign({},that.postData)
//                    console.log(Object.keys(this.postData).length);
                    if(Object.keys(this.postData).length>0){

                        for (let key in newPostData){
                            console.log(newPostData[key]);
                            if(newPostData[key]==''){
                                that.$Message.error('请输入表单中的值')
                                return
                            }
                            if(newPostData[key].constructor==Date){
                                newPostData[key] =  newPostData[key].format('yyyy-MM-dd')
                            }else {
                                newPostData[key] = JSON.parse(JSON.stringify(newPostData[key]));
                                newPostData[key] =newPostData[key].pop()
                            }
                        }
                    }else{
                        newPostData=''
                    }
//                    console.log(newPostData);
                    this.axios({
                                method: 'post',
                                url: '/v1/recruit/submit',
                                data: qs.stringify({
                                    uid: that.users.uid,
                                    key_field_value: newPostData
                                })
                            })
                            .then(res => {
                                let needData = res.data;
                                if (needData.code == '200') {
                                    this.$Message.success('提交成功')
                                    that.crateDate = '';
                                    that.isShowDateAll=true;
                                    this.$emit('search');
                                } else {
                                    this.$Message.info(needData.msg)
                                }
                            })
                },
                onCancel: () => {
//                    this.$Message.info('取消成功');
                }
            });
            return ;




          }
        },
        mounted(){
            this.getSteps();
            this.getButton();
            this.uid = this.users.uid
            this.getList('C02011', 'join_source_list');
            this.getList('C02018', 'to_normal_type_list');
        }
    }
</script>
<style scoped>
    .nav-box{
        height: 44px;
        line-height: 44px;
        display: flex;
        border-bottom:1px solid #ddd;
        margin-bottom: 30px;
    }
    .nav-box .nav-box-item{
        /*flex: 1;*/
        margin-right: 40px;
        position: relative;
        top: 1px;
        cursor: pointer;
    }
    .nav-box .nav-box-item.sel{
        color:#e1330e;
        border-bottom: 4px solid #f04134;
        position: relative;
        top: 1px;
    }



    .activeBg{
      background: #f04134;
      color: #fff;
    }
    .nostep{
        color: #aaa;
    }
    .current{
        background: #989898 !important;
    }
    .task-step1{
        font-size: 0;
        display: inline-block;
        border: 1px solid #ddd;
    }
    .task-step1 > div{
        font-size: 14px;
        display: inline-block;
        position: relative;
        padding: 0 20px;
        height: 32px;
        line-height: 32px;
        color: #333;
        cursor: pointer;
        background:#fff;
        text-indent: 10px;

    }
    .task-step1 > div.disable{
        background: #fcfcfc;
        color: #aaa;
    }

    .task-step1 > div:not(:last-child)::after{
        display: block;
        position: absolute;
        right: -32px;
        top: 0;
        content: "";
        width:0;
        height: 0;
        border: 16px solid transparent;
        border-left-color: #fff;
    }
    .task-step1 > div:not(:last-child)::before{
        display: block;
        position: absolute;
        right: -33px;
        top: 0;
        content: "";
        width:0;
        height: 0;
        border: 16px solid transparent;
        border-left-color: #ddd;
    }
    .task-step1 > div.active{
        background: #d73826;
        color: #fff;
    }
    .task-step1 > div.active:not(:last-child)::after{
        border-left-color: #d73826;
    }


    .task-step{
        font-size: 0;
        display: inline-block;
        border: 1px solid #ddd;
    }
    .task-step > div{
        font-size: 14px;
        display: inline-block;
        position: relative;
        padding: 0 20px;
        height: 32px;
        line-height: 32px;
        color: #333;
        cursor: pointer;
        background:#fff;
        text-indent: 10px;

    }
    .task-step > div.disable{
        background: #fcfcfc;
        color: #aaa;
    }

    .task-step > div:not(:last-child)::after{
        display: block;
        position: absolute;
        right: -32px;
        top: 0;
        content: "";
        width:0;
        height: 0;
        border: 16px solid transparent;
        border-left-color: #fff;
    }
    .task-step > div:not(:last-child)::before{
        display: block;
        position: absolute;
        right: -33px;
        top: 0;
        content: "";
        width:0;
        height: 0;
        border: 16px solid transparent;
        border-left-color: #ddd;
    }
    .task-step > div.active{
        background: #d73826;
        color: #fff;
    }
    .task-step > div.active:not(:last-child)::after{
         border-left-color: #d73826;
    }





















    .task-branch-step{font-size: 0;margin:20px 0;}
    .task-branch-step > div{
        display: inline-block;
        font-size: 12px;
        color: #333;
        cursor: pointer;
        position: relative;
        margin-bottom: 10px;
    }
    .task-branch-step>div:not(:last-child){
        margin-right: 26px;
    }
    .task-branch-step > div:not(:last-child)::after{
        display: block;
        content: '';
        position: absolute;
        width: 22px;
        background: #e7e7e7;
        height: 2px;
        right: -24px;
        top: 50%;
        margin-top: 8px;
    }
    .task-branch-step > div p.task-status{
        padding-left: 20px;
        text-align: center;
        font-weight: bold;
    }
    .task-branch-step > div.working p.task-status{
        color: #999;
    }
    .task-branch-step > div.bingo p.task-status{
        color: #3798e2;
    }
    .task-branch-step > div.error p.task-status{
        color:#d73826;
    }
    .task-branch-step > div p:last-child span{
        display: inline-block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #d5d5d5;
        line-height: 22px;
        text-align: center;
        color: #fff;
        margin-right: 10px;
    }
    .task-branch-step>div p:last-child span.active-bg{
      background: #e14e28 !important;
    }


    .task-branch-step>div.bingo p:last-child span{
        background: #989898;
    }
    /*.task-branch-step>div.active p:last-child span{*/
        /*background: #e14f27;*/
    /*}*/


</style>
