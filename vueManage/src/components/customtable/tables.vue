<template>
    <div class="tables tables-auto">
        <div class="custom-table start-box box-orient box-pack pack-center box-align">
            <p style="font-family: 'fangzheng';font-size: 20px;margin-bottom: 10px;">{{tableName}}</p>
            <p style="font-size: 14px;margin-bottom: 18px;">表格制作：{{deptName}}  表格类型：{{type}}</p>
            <p style="color:#e3392c; padding-left:20px;">填表说明：{{remark}}</p>
            <div class="tb-outer start-box box-flex" style="overflow: auto;padding:25px 20px 0 20px;">
                <div class="item items wxc-item">
                    <table>
                        <thead>
                            <th v-for="(item,index) in rows" :key='index'>{{item}}</th>
                        </thead>
                        <tbody>
                        <!--{{itemChild.newV}}-->
                            <tr v-for="(item,index) in colsModel" :key="index" @mouseover="hoverF(index)" @mouseout="outerF(index)" >
                                <td v-for="(itemChild,indexChild) in item.cols" :key="indexChild" v-model="itemChild.model" style="position: relative;">
                                    {{itemChild.newV}}
                                    <div v-show="item.isEdit" v-if="indexChild!==0 ? false : true" class="start-box box-align box-pack" style="position: absolute; top:-24px; z-index: 100; width: 120px; left:0;">
                                        <Button class='box-flex' icon="edit" style="font-size:12px !important; padding: 2px;" size="small" @click="editBtn(item,index)" type="dashed">编辑</Button>
                                        <Button  class='box-flex' icon="trash-a" style="font-size:12px !important;padding: 2px;" size="small" @click="removeRow(item,index)" type="dashed">删除</Button>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                        <div v-show="isAddBtn" class="origobj start-box box-align box-pack pack-center li" style="border-bottom:0;" @click="addRow">
                            <Icon type="plus-round"></Icon>
                        </div>
                    </table>
                </div>
            </div>
        </div>
        <editTable v-if="modalShow" :rowData="rowData" :copyData="copyData" @setCancer="setCancer" :rows="rows"></editTable>
        <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '@/components/top.vue'
    import customList from '@/components/custom/customList.vue'
    import editTable from '@/components/customtable/editTable.vue'
    export default {
        name: 'custom',
        data() {
            return {
                isAddBtn:false,//是否显示添加按钮  统计表(type==1) 不显示  花名册(type==2)显示
                tableName:'',//表名
                deptName:'',//党组织名称
                type:'',   //表类型1 统计表 2 花名册
                remark:'',//填表说明
                formItem: {
                    title: '',
                    format: ''
                },
                rows:['A'],
                colsModel:[
                    {
                        isEdit: false,
                        cols: [
                            {value: '1', model: 'A1'},
                            {value: '', model: 'B1'},
//                            {value: '45',model: 'C1'},
//                            {value: '44', model: 'D1'},
//                            {value:'66',model:'E1'}
                        ]
                    }
                ],
                isEditAll:'',//是否开启全局编辑状态
                indexAll:'',//编辑的第几条数据
                rowData:{},
                modalShow:false,//传递给编辑组件  false 隐藏  true 显示
            }
        },
        props: {
            orders: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            remberData: {
                type: Object,
                default: function() {
                    return {
                        remberType: '',
                        remberYear: ''
                    }
                }
            },
            setNull: {
                type: Boolean,
                default: function() {
                    return false;
                }
            },
            verify: {
                type: Number,
                default: function() {
                    return 1;
                }
            }
        },
        computed: {
            
        },
        components: {
            top,
            customList,
            editTable
        },
        methods: {
            todo(item) {
                let that = this;
                let postData = {
                    dept_id: this.$route.query.id ? this.$route.query.id : this.$store.state.remberId,
                    year: '2017',
                    type_id: this.remberData.remberType ? this.remberData.remberType : 1,
                    form_id: this.$route.name.split('-')[1]
                }
                switch(parseInt(item.type)) {
                    //清空报表
                    case 1:
                        this.clearTable();
                        console.log(item,this.$route.query.fid,1);


                        break;
                    //报表直统
                    case 2:
                        console.log(item,2);
                        break;
                    //报表汇总
                    case 3:
                        console.log(item,3);
                        this.totalTable();
                        break;
                    //报表校核
                    case 4: //console.log('报表校核');
                        console.log(item,4);
                        break;
                    //打印
                    case 5:
                        console.log(item,5);
                        break;
                    //导出
                    case 6:
                        console.log(item,6);
                            window.open('v1/statement/export?id=' +this.$route.query.fid);
                        break;
                    //上所解锁
                    case 10:
                        this.$emit('doSome')
                        //value 2锁定  1解锁
                        if (item.value == 2){
                            this.axios.get('v1/statement/report',{params: {id: this.$route.query.fid,type:'1'}})
                            .then((res)=>{
                                if(res.data.code ==200){
                                    this.$Message.success('解锁报表');
                                    that.$emit('setDoing');
                                }
                            });
                        }else if(item.value == 1){
                            this.axios.get('v1/statement/report',{params: {id: this.$route.query.fid,type:'2'}})
                            .then((res)=>{
                                if(res.data.code ==200){
                                    this.$Message.success('上报锁定');
                                    that.$emit('setDoing');
                                }
                            });;
                        }
                        break;
                    //开始录改
                    case 8:
                        if(this.verify==4){
                            this.isEditAll = !item.status;
                        }
                        console.log(this.$store.state.remberStatus);
                        break;
                    //保存报表
                    case 9:
                        this.verify==4 && this.saveBtn() ;
                        break;
                    default: return;
                }
            },
            //清空报表
            clearTable(){
                let  that = this;
                this.axios({
                            method:'get',
                            url:'v1/statement/empty',
                            params:{
                                id:that.$route.query.fid,
                            }
                        })
                        .then(res=>{
                            let needData = res.data;
                            if(needData.code='200'){
                                that.getDetail(that.$route.query.fid);
                                that.$Message.success('清空成功');
                            }else {
                                this.$Message.error(needData.msg);
                            }
                        })
                        .catch(err => {
                            this.$Message.error("网络请求失败");
                        });

            },
            //汇总表
            totalTable(){
                this.getDetail(this.$route.query.fid,'v1/statement/getgather',{id:this.$route.query.fid});
            },
            //添加行
            addRow(){
                let that = this;
                if(that.isEditAll == false){
                    that.$Message.error('请点击开始录改按钮')
                    return
                }
                let postData = {};//单个row添加的数据集合
                postData.cols=[];//设置数据的集合
                let rowsIndex = this.colsModel.length*1 + 1;//获取当前有多少条数据 进行++操作
                this.rows.forEach( (item,index) => {
                    let charCode = String.fromCharCode(65 + index);//转化成  字母
                    let obj = {value:'',model:charCode + rowsIndex,rows:that.rows[index] };//设置单个数据的key  value
                    postData.cols.push(obj);//添加单条数据集
                })
                postData.isEdit = false;//设置是否编辑状态
                this.colsModel.push(postData);
                console.log(this.colsModel);
            },
            //编辑当前行
            editBtn(item,index) {
                this.rowData = item;
                this.copyData = item;
                this.modalShow = true;
                this.indexAll = index;
            },
            setCancer(item){
                this.modalShow = false;
                console.log(this.colsModel);
            },
            getRows() {
                this.rows.unshift('项目');
            },
            saveBtn(){
                let  that = this;
                let postData = Object.assign([],this.colsModel);
                let saveArr = [],submitData={};

                postData.forEach(item => {
                    item.cols.forEach(itemCols =>{
                        saveArr.push(itemCols);
                    })
                });

                saveArr.forEach(item => {
                    submitData[item.model] = item.value
                });
                this.axios({
                    method:'get',
                    url:'v1/statement/add-json',
                    params:{
                        id:that.$route.query.fid,
                        data_json:submitData
                    }
                })
                .then(res=>{
                    let needData = res.data;
                    if(needData.code='200'){
                        this.$store.commit('setStatus', {stat: true})
                        that.$Message.success('保存成功');
                    }else {
                        this.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error("网络请求失败");
                });


            },
            //获取详情数据
            getDetail(id,url,data){

                let that = this;
                if (id==0)return;
                this.axios({
                        method:'get',
                        url: url || 'v1/statement/detail',
                        params:data || {id:id}
                    })
                    .then(res=>{
                        let needData = res.data;
                        if(needData.code=='200'){
                            this.isEditAll = false;//初始化开始录改 状态
                            this.tableName = needData.data.title;
                            this.deptName = needData.data.dept_name;
                            this.remark = needData.data.remark;
                            this.type = needData.data.type == 1 ? '统计表' : '花名册';
                            //判断是否为统计表
                            if(needData.data.structure.cols.length > 0){
                                if( needData.data.type == 1){
                                    that.isAddBtn = false;
                                }else if( needData.data.type == 2 ){
                                    that.isAddBtn = true;
                                }
                                this.rows = needData.data.structure.cols;
                                this.rows.unshift('项目');
                                let arrMap = [];//所有数组;
                                let childarrMap = [];//单行的数组
                                needData.data.data_json.forEach(item => {
                                    childarrMap = [];//单行的数组
                                    for(let key in item.cols){
                                        childarrMap.push(item.cols[key]);
                                    }

                                    childarrMap.forEach((item,index) => {
                                        item.rows = that.rows[index];
                                    });
                                    arrMap.push(childarrMap);
                                });

                                let postColsModel = Object.assign([],needData.data.data_json);
                                postColsModel.forEach((item,index) => {
                                    item.cols = arrMap[index];
                                });

                                this.colsModel = postColsModel;

                                this.colsModel.forEach(itemP =>{
                                    itemP.cols.forEach((item, index) => {
                                        itemP.cols[index] = Object.assign({},item, { newV: item.value})
                                    })
                                })


                            }else if ( needData.data.structure.cols.length == 0 ){
                                if( needData.data.type == 1){
                                    that.isAddBtn = false;
                                    this.rows = ['项目','A'];
                                    that.colsModel = [
                                        {
                                            isEdit: false,
                                            cols: [
                                                {value: '1', model: 'A1',rows:'项目'},
                                                {value: '', model: 'B1',rows:'A'}
                                            ]
                                        }
                                    ];
                                }else if( needData.data.type == 2 ){
                                    that.isAddBtn = true;
                                    this.rows = ['项目','A'];
                                    that.colsModel = [
                                        {
                                            isEdit: false,
                                            cols: [
                                                {value: '', model: 'A1',rows:'项目'},
                                                {value: '', model: 'B1',rows:'A'}
                                            ]
                                        }
                                    ];

                                }
                            }


                        }else{
                            this.$Message.error(needData.msg);
                        }
                    })
            },
            //删除当前行
            removeRow(item, index) {
                let that = this;
                this.$Modal.confirm({
                    title: '提示',
                    content: '确定删除该行',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        that.colsModel.splice(index, 1);

                    },
                    onCancel: () => {
                        
                    }
                });
            },
            hoverF(index) {
                let that = this;
                this.colsModel.forEach((item,idx) => {
                    if(idx == index && that.isEditAll == true){
                        item.isEdit = true;
                    }
                })
            },
            outerF(index) {
                let that = this;
                this.colsModel.forEach((item,idx) => {
                    if(idx == index && that.isEditAll===true){
                        item.isEdit = false;
                    }
                })
            },
            changeText(item, index) {
                this.lists[index] = this.$el.innerHTML;
                this.$emit('input',this.lists[index]);
            },
            setValue(item) {
                this.lists[item.index].value = item.value;
            },
            setCloums(item) {
                this.cloums[item.index].value = item.value;
            }
        },
        watch:{
            '$route'(form, to){
                let that = this;
                this.getDetail(that.$route.query.fid)
            },
            'orders' (newD, oldD) {
                if (newD != oldD) {
                    this.todo(newD)
                }
            }
        },
        created() {
                
        },
        mounted() {
            let that = this;
            this.getRows();
            this.getDetail(that.$route.query.fid)
        },
    }
</script>
<style scoped>
    .justify {
        text-align:justify;
        text-justify:inter-word;
        text-align-last:justify;
        padding: 0 10px;
    }
    .table-outer {
        width: 100%;
        /*overflow: auto; */
    }
    .tips.box-flex input{
      outline: none;
      border: none;
      border:1px solid #333;
      text-align: center;
    }

    .tips-outer {
        margin-top: 15px;
    }
    .tips input {
        width: 60px;
        height: 22px;
        margin: 0 3px;
    }
    .tips p {
        line-height: 32px;
    }
    .tables-containter div {
        text-align: center;
    }
    .comm-left {
        width: 120px;
        border: 1px solid #222;
        border-width: 0 1px 0 0;
        height: 100%;
    }
    .wh100 {
        width: 100%;
        height: 100%;
        display: block;
    }
    .text-left{
      text-align: left;
    }
    .br0{
      border-right: 0;
    }
    .bb0{
      border-bottom: 0 !important;
    }
    .bl0{
      border-left: 0;
    }
    .text-index{
      text-indent: 5px;
    }
    .tables-containter {
        border: 1px solid #222;
    }
    .tables-header {
        height: 60px;
    }
    .header-top {
        height: 40px;
        border-bottom: 1px solid #222;
        line-height: 40px;
    }
    .header-bottom {
        height: 20px;
        line-height: 20px;
        border-bottom: 1px solid #222;
    }
    .bg-class1{
      background: #88e1fe;
      color: #111;
    }
    .bg-class2{
      background: #fff;
    }
    .bg-class3{
      background: #ffce9a;
    }

    .yellow {
        background: #FFF4EE;
        border: none;
        outline: medium;
        border: 1px solid #ccc;
    }
    .yellow2 {
        background: #ffce9a;
        border: none;
        outline: medium;
    }
    .color-red {
        color: red !important;
    }
    .add-btn {
        width:40px; 
        height:40px; 
        border:1px solid #222; 
        border-left: none;
    }
    .add-btn:hover {
        cursor: pointer;
    }
    .tb-outer .item .li:first-child {
        border-top: 1px solid #222;
    }
    .tb-outer .item .li {
        min-width: 100px;
        border-bottom: 1px solid #222;
        border-right: 1px solid #222;
        height: 40px;
        text-align: center;
        padding:10px;
        font-weight: bold;
    }
    .tb-outer .item .li:hover {
        cursor: pointer;
    }
    .tb-outer .items:first-child {
        /*border-left: 1px solid #222;*/
    }
    .tb-outer .item .li input {
        width: 100%;
        border: none;
        height: 100%;
        text-align: center;
        outline: none;
        background-color: #fff;
    }
    .custom-title {
        width:30%;
        border:1px solid #dddee1;
        background:#fff;
    }
    .custom-table {
        background:#fff;
        margin: 20px auto;
        /*padding-top: 20px;*/
    }
    .table {
        margin-left:6px;
        margin-top:5px;
    }
    .table tr:first-child td{
        border-top: 1px solid #222;
    }

    .table tr td{
        border-bottom: 1px solid #222;
        border-right: 1px solid #222;
        text-align: center;
    }
    .table tr td input {
        border: none;
        width: 100%;
        height: 100%;
        text-align: center;
        outline: none;
        background-color: #f9f9f9;
    }
    .table tr td:first-child {
        border-left: 1px solid #222;
    }


     td{padding: 0;margin: 0;}
     table{border-collapse: collapse;text-align: center;width: 100%;color: #333;font-family: "微软雅黑"; border: 1px solid #222;}
     table thead{line-height: 40px;font-weight: normal;}
     table thead {border-bottom: 1px solid #222;border-top: 1px solid #222;}
     table thead th{font-weight: normal;padding: 0 25px}
     table thead th:first-child{background-color: #efefef}
     table tbody tr{line-height: 32px;height: 32px;border-bottom: 1px solid #222;;color: #333;box-sizing: border-box}
     /*table tbody tr:hover{background-color: #EBF7FF}*/
     table tbody tr:hover{
        background: #fff4ee;
     }
     table tbody tr.drag:hover{background-color: #eee;cursor: move}
     table .checkbox{width: 20px;height: 20px;box-sizing:border-box;border:1px solid #ccc;;margin: 3px auto 0}
     table .checkbox.on{background: #d73826;border-color: #222}
     table .checkbox.on:after{content: "√";width: 0;height: 0;color: #fff;position: relative;top: -11px;}
     table tbody td, table thead th{ border-right:1px solid #222;
         height: 32px;}
     table tbody td.ready{color: #d73826}
     table tbody td.out{color: #f07100}
     table tbody td.in{color: #008df0}


</style>
