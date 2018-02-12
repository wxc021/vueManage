<!--党组织管理/查询统计/组合查询弹窗-->
<template>
    <div class="CombinationQuery">
        <Modal
                v-model="modal1"
                title="组合查询"
                width="950"
                :loading="loading"
                :mask-closable=false
                class-name="max-height vertical-center-modal"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form style="position: relative" ref="CombinationQueryForm" :model="CombinationQueryForm"
                  :rules="ruleValidate" inline label-position="top">

                <Row>
                    <div class="party"><label class="">当前查询党组织</label>:<span>{{partyName}}</span>
                    </div>
                    <p class="bold">条件设置</p>
                    <Col span="5">
                    <FormItem label="选择信息集：" prop="map" style="width: 95%;">
                        <Select @on-change="changeMap" v-model="CombinationQueryForm.map" placeholder="请选择信息集">
                            <Option v-for="item in mapModule" :key="item.name" :value="item.name">{{item.name}}</Option>
                            <!--<Option value="1">联系方式</Option>-->
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="5">
                    <FormItem label="选择信息项：" prop="option" style="width: 95%;">
                        <Select @on-change="changeOption" v-model="CombinationQueryForm.option" placeholder="请选择信息项">
                            <Option v-for="item in optionModule" :key="item.name" :value="item.name">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="5">
                    <FormItem label="操作符：" prop="operator" style="width: 95%;">
                        <Select  @on-change="changeOperator" v-model="CombinationQueryForm.operator" placeholder="请选择">
                            <Option v-for="(item,index) in operatorModule" :key="item" :value="item">{{item}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="5">
                    <FormItem label="查询值：" style="width: 95%;">
                        <Input v-if="isChar==2" v-model="CombinationQueryForm.value" placeholder="请输入"></Input>
                        <Cascader :transfer="true" v-if="isChar==0" :render-format="renders" :data="data" v-model="CombinationQueryForm.value"></Cascader>
                        <DatePicker v-if="isChar==1" v-model="CombinationQueryForm.value" type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="4">
                    <Button class="fr w100" @click="add">添加</Button>
                    </Col>
                </Row>
                <Row>
                    <Button class="mr-5" @click="and">并且</Button>
                    <Button class="mr-5" @click="or">或者</Button>
                    <Button class="mr-5" @click="addLeft">(+</Button>
                    <Button class="mr-5" @click="addRight">+)</Button>
                    <Button class="mr-5" @click="removeLeft">(-</Button>
                    <Button class="mr-5" @click="removeRight">-)</Button>
                </Row>
                <Row>
                    <Col span="20">
                    <div class="box-wrap">
                        <li v-for="(item,index) in condition" class="line-option" @click="clickMe(index)"
                            :class="{ selectClass: item.checked==='1' }">{{item.singleCondition}}
                        </li>

                    </div>
                    </Col>
                    <Col span="4">
                    <Row style="text-align: center;margin-top: 35px">
                        <Button class="mb10 w100" @click="upMove">上移</Button>
                        <Button class="mb10 w100" @click="downMove">下移</Button>
                        <Button class="mb10 w100" @click="singleRemove">删除</Button>
                        <Button class="mb10 w100" @click="allRemove">全删</Button>
                    </Row>
                    </Col>
                </Row>
                <Row style="text-align: center;margin-top: 10px">
                    <Button type="error" size="large" @click="query" class="w100">查询</Button>
                    <Button type="warning" v-show="isSaveBtn" size="large" @click="saveFixed" class="ml-10">保存为固定条件</Button>
                </Row>
                <!--<Row style="margin-top: 30px;margin-bottom: 10px;">-->
                    <!--<span class="bold">固定查询条件</span>-->
                    <!--<Input placeholder="请输入固定查询条件ID" style="width: 700px;margin-left: 14px;"></Input>-->
                    <!--<Button class="w100" style="margin-left: 8px;">查找</Button>-->
                <!--</Row>-->
                <Row style="margin-bottom: 30px;margin-top: 20px;">
                    <Col span="24">
                    <Table border :columns="columns1" :data="data1"></Table>
                    </Col>
                </Row>
                <!--<Row>-->
                <!--<Col span="24">-->
                <!--<Table border :columns="columns1" :data="data1"></Table>-->
                <!--</Col>-->
                <!--</Row>-->
            </Form>
            <div slot="footer">
                <Button  size="large"  @click="cancel">关闭</Button>
            </div>
        </Modal>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'CombinationQuery',
        data () {
            return {
                modal1: true,//是否显示弹窗
                loading: true,
                isClass: false,
                partyName:'',//党支部名称
                queryId: '',//保存固定条件的id
                singleCondition: '',//单行的条件
                condition: [],//保存用户的条件
                itemIndex: '',//保存条件item的index
                CombinationQueryForm: {  //form的绑定
                    map: [],//信息集
                    option: [],//信息项
                    operator: '',//操作符
                    value: '',//查询值
                },
                mapModule:[],//信息集数据源
                optionModule:[],//信息项数据源
                operatorModule:[],//操作符数据源
                data:[],//级联数据源
                conditionName:'',//保存固定条件名称
                isChar:'2',//判断查询值的展示方式 0 下拉  1 date 2输入框
                fixedConditionArr:[],//自定义组合查询集合 dataJson
                singleDataJson:{},//单个条件
                key1:'',//暂时存储信息集的表名
                isSaveBtn:true,//是否显示 保存固定查询按钮 (点击系统条件是 设置为false 自定义条件为 true);
                ruleValidate: {
                    map: [
                        {required: true, message: '请选择信息集', trigger: 'change'}
                    ],
                    option: [
                        {required: true, message: '请选择信息项', trigger: 'change'}
                    ],
                    operator: [
                        {required: true, message: '请选择操作符', trigger: 'change'}
                    ],
//                    value: [
//                        {required: true, message: '查询值不能为空', trigger: 'blur'}
//                    ],
                },
                columns1: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: '固定条件名称',
                        key: 'name'
                    },
                    {
                        title: '类别',
                        key: 'is_system'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            if(params.row.is_system=='系统定义'){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.changeBtnColor(params.index,params.row)
                                            }
                                        }
                                    }, '使用')
                                ]);
                            }else{
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.changeBtnColor(params.index,params.row)
                                            }
                                        }
                                    }, '使用'),
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row)
                                            }
                                        }
                                    }, '移除')
                                ]);
                            }

                        }
                    },
                ],
                data1: [
                    {
                        id: '000001',
                        name: '系统条件一',
                        is_system: '系统定义',
                    },
                    {
                        id: '000002',
                        name: '条件二',
                        is_system: '手动添加',
                    },

                ]
            }
        },
        methods: {
            //获取信息集
            getInfoMap(){
                let that = this;
                let qs = require('qs');
                this.axios({
                    method:'post',
                    url:'/v1/sqlbuilder/info-list',
                    data:qs.stringify({
                        type:'1',//党组织类型
                    })
                })
                .then(res=>{
                    let needData = res.data;
                    if (needData.code == '200') {
                        that.mapModule=needData.data
                    }
                })
            },
            //选择信息集
            changeMap(value){
                let that= this;
                that.operatorModule=[];

                this.mapModule.forEach(item=>{
                    if(item.name==value){
                        that.optionModule = item.item;
                        that.key1 = item.table;
                        that.singleDataJson.tablename=item.table;//表名
                    }
                })
            },
            //选择信息项
            changeOption(value){
                let that = this;
                let qs = require('qs');
                let type='';
                let url='';//请求数据的url
                that.optionModule.forEach(item=>{
                    if(item.name==value){
                        that.singleDataJson.is_char=item.is_char;//查询辅助字段1
                        that.singleDataJson.is_count=item.is_count;//查询辅助字段2
                        that.singleDataJson.fieldtext=item.name;//信息项名称
                        that.singleDataJson.fieldname=item.field;//字段
                        that.singleDataJson.tablename = that.key1;




                        if(item.is_char==0 && item.url==''){
                            that.isChar = '2';
                        }else if(item.is_char==0 && item.url!=''){
                            that.isChar = 0;
                            url=item.url;
                            url=url.replace(/\'/g,'')
                        }else{
                            that.isChar = item.is_char;
                        }
                    }
                })

                if(that.isChar=='0'){
                    that.CombinationQueryForm.value=[];
                }else{
                    that.CombinationQueryForm.value='';
                }
                this.axios({
                    method:'post',
                    url:'/v1/sqlbuilder/operator-list',
                    data:qs.stringify({
                        type:that.isChar,//党组织类型
                    })
                })
                .then(res=>{
                    let needData = res.data;
                    if (needData.code == '200') {
                        that.operatorModule=needData.data
                    }
                })
                .then(()=>{
                    that.axios({
                        method:'get',
                        url:url,
                    })
                    .then(res=>{
                        let needData = res.data;
                        if (needData.code == '200') {
                            needData.data.forEach(item=>{
                                if(!item.value){
                                    item.value = item.id;
                                    item.label = item.name;
                                }
                            })

                            that.data=needData.data;
                        }
                    })
                })
            },
            //选择操作符
            changeOperator(value){
                /*this.singleDataJson.operator=value;*/
            },
            //查询
            query() {
                if(this.condition.length<=0){
                    this.$Message.error('请选择查询条件');
                    return ;
                }
                let qs = require('qs');
                let that = this;
                let postDataArr =[];
                let post_id='';//系统条件查询id
                //获取查询条件jsonArr
                that.condition.forEach((item,index)=>{
                    if(item.isSystem){
                        if (item.isSystem.id!=''){
                            post_id=item.isSystem.id;
                        }
                    }
                    item.singleDataJson.ordernum=index+1;
                    postDataArr.push(item.singleDataJson)
                });

               /* //查询 location[] 树节点
                this.axios({
                    method: 'get',
                    url: '/v1/dept/search-list',
                    params: {
                        dept_id: that.$store.state.remberId,
                        keyword: this.partyName,
                        opt: 0
                    }
                })
                .then(res=>{
                    let needData = res.data;
                    if(needData.code=='200'){
                        this.$store.commit('setCombinatorQueryData',{postDataArr:postDataArr,location:needData.data[0].location});
                        window.open(location.href.replace(/\/CombinationQuery/, ''));

                    } else {
                        that.$Message.error(needData.msg)
                    }
                });*/
                if(post_id!=''){
                    that.axios({
                        url:'/v1/sqlsysbuilder/sql-sys-query',
                        method:'post',
                        data:qs.stringify({
                            id:post_id,
                            dept_id:that.$store.state.remberId,
                            page_number:'1',
                            page_size:'10'
                        })
                    })
                    .then((res)=>{
                        let needData = res.data;
                        if(needData.code=='200'){
                            if (needData.data.length==0){
                                that.$Message.info('该条件无数据');
                            }else{

                                this.$store.commit('setCombinatorQueryData',{postDataArr:needData.data});
                                //this.$parent.$parent.$parent.$emit('just',{data: needData.data})
                                that.$router.go(-1);
                            }
                        } else {
                            that.$Message.error(needData.msg)
                        }
                    })
                    .catch(err=>{
                        that.$Message.error('网络请求异常');
                    })
                }else{
                    that.axios({
                        url:'/v1/sqlbuilder/sql-query',
                        method:'post',
                        data:qs.stringify({
                            type:'1',
                            dept_id:that.$store.state.remberId,
                            data:JSON.stringify(postDataArr),
                            page_number:'1',
                            page_size:'10'
                        })
                    })
                    .then((res)=>{
                        let needData = res.data;
                        if(needData.code=='200'){
                            if (needData.data.length==0){
                                that.$Message.info('该条件无数据');
                            }else{
                                //this.$parent.$parent.$parent.$emit('just',{data: needData.data});
                                this.$store.commit('setCombinatorQueryData',{postDataArr:needData.data});
                                that.$router.go(-1);
                            }
                        } else {
                            that.$Message.error(needData.msg)
                        }
                    })
                    .catch(err=>{
                        that.$Message.error('网络请求异常');
                    })
                }

            },
            //保存固定条件
            saveFixed(){
                console.log(this.condition);
                let that = this;
                let qs = require('qs');
                this.$Modal.confirm({
                    onOk: () => {
                        that.fixedConditionArr=[];
                        that.condition.forEach((item,index)=>{
                            item.singleDataJson.ordernum=index+1;
                            that.fixedConditionArr.push(item.singleDataJson)
                        });
                        console.log(that.fixedConditionArr);
                        that.axios({
                            url:'/v1/sqlbuilder/sql-save',
                            method:'post',
                            data:qs.stringify({
                                name:this.conditionName,
                                type: '1',
                                //data:JSON.stringify([{ordernum:'1',is_char:'2',is_count:'0',lbracket:'',tablename:'dept',fieldname:'full_name',fieldtext:'党组织名称',operator:'等于',value:'江测试',rbracket:'',clink:'and',text:'江测试'}]),
                                data:JSON.stringify(that.fixedConditionArr)
                            })
                        })
                        .then((res)=>{
                            let needData = res.data;
                            if(needData.code=='200'){
                                that.$Message.success('保存成功');
                                that.getTableList();
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
                                value: '',
                                autofocus: true,
                                placeholder: '请输入固定查询名称'
                            },
                            on: {
                                input: (val) => {
                                    this.conditionName = val;
                                },
                            }
                        })
                    },
                })
            },
            changeBtnColor(index,row){
                this.queryId = this.data1[index].id;
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/sqlbuilder/sql-info',
                    params: {
                        id: that.queryId
                    }
                }).then(res=> {
                    let needData = res.data;
                    if (needData.code == '200') {
                        that.condition = [];
                        let isSystem =false,id='';
                        if(row.is_system=='系统定义'){
                            this.isSaveBtn=false;
                            isSystem=true;
                            id=row.id;
                        }else{
                            this.isSaveBtn=true;
                            isSystem=false;
                        }

                        needData.data.forEach(item => {
                            let str = '';
                            if (item.clink == 'and') {
                                str = item.lbracket + item.fieldtext + item.operator + item.text + item.rbracket + '并且'
                            } else if (item.clink == 'or') {
                                str = item.lbracket + item.fieldtext + item.operator + item.text + item.rbracket + '或者'
                            }
                            let obj = {singleCondition: str, checked: 0,singleDataJson:item,isSystem:{isSys:isSystem,id:id ||''}}
                            that.condition.push(obj);
                        })
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })


                this.$Message.success("使用该条件成功")


            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        this.modal1 = false;
                        this.$router.go(-1)
                    } else {
                        this.loading = false;
                        this.$Message.error('表单验证失败!');
                        setTimeout(() => {
                            this.loading = true;
                        }, 20);
                    }
                })
            },
            //并且
            and(){
                //条件的索引
                if (this.itemIndex === '') {
                    return
                }
                let index = this.itemIndex;
                //获取原字符串长度
                let len = this.condition[index].singleCondition.length;
                //截取后两位
                let reStr = this.condition[index].singleCondition.slice(len - 2);
                //添加 ) 后赋值
                this.condition[index].singleCondition = this.condition[index].singleCondition.replace(reStr, ' 并且');
                this.condition[index].singleDataJson.clink='and';


            },
            //或者
            or(){
                //条件的索引
                if (this.itemIndex === '') {
                    return
                }
                let index = this.itemIndex;
                //获取原字符串长度
                let len = this.condition[index].singleCondition.length;
                //截取后两位
                let reStr = this.condition[index].singleCondition.slice(len - 2);
                //添加 ) 后赋值
                this.condition[index].singleCondition = this.condition[index].singleCondition.replace(reStr, ' 或者');
                this.condition[index].singleDataJson.clink='or';
            },
            addLeft(){
                //条件的索引
                if (this.itemIndex === '') {
                    return
                }
                let index = this.itemIndex;
                //将原有的条件前添加 (
                if (this.condition[index].singleCondition.indexOf("(") > -1) {
                    return;
                }
                let data = '( ' + this.condition[index].singleCondition;
                this.condition[index].singleCondition = data;
                this.condition[index].singleDataJson.lbracket='(';


                console.log(this.condition[index], index);
            },
            addRight(){
                //console.log(obj.target.innerText);
                //条件的索引
                if (this.itemIndex === '') {
                    return
                }
                let index = this.itemIndex;
                //将原有的条件前添加 (
                if (this.condition[index].singleCondition.indexOf(")") > -1) {
                    return;
                }
                //获取原字符串长度
                let len = this.condition[index].singleCondition.length;
                //截取后两位
                let reStr = this.condition[index].singleCondition.slice(len - 2);
                //添加 ) 后赋值
                this.condition[index].singleCondition = this.condition[index].singleCondition.replace(reStr, ' ) ' + reStr);
                this.condition[index].singleDataJson.rbracket=')';
            },
            removeLeft(){
                //条件的索引
                if (this.itemIndex === '') {
                    return
                }
                let index = this.itemIndex;
                //将原有的条件前添加 (
                this.condition[index].singleCondition = this.condition[index].singleCondition.replace('(', '');
                this.condition[index].singleDataJson.lbracket='';
            },
            removeRight(){
                //条件的索引
                if (this.itemIndex === '') {
                    return
                }
                let index = this.itemIndex;
                //将原有的条件前添加 (
                this.condition[index].singleCondition = this.condition[index].singleCondition.replace(')', '');
                this.condition[index].singleDataJson.rbracket='';
            },
            //把级联数据转化为字符串
            searchStr(id, arr) {
                let len = arr.length;
                if (Array.isArray(arr) && !len) {return};
                for (let i = 0; i < len; i++) {
                    if(arr[i].value === id) {
                        return arr[i].label;
                    } else {
                        if ( Array.isArray(arr[i].children) && arr[i].children.length) {
                            if (this.searchStr(id, arr[i].children)) {
                                return this.searchStr(id, arr[i].children);
                            };
                        }
                    }
                };
                return '';
            },
            //添加单个条件
            add(){
                console.log(this.singleDataJson);

                this.singleDataJson.lbracket='';
                this.singleDataJson.rbracket='';
                this.singleDataJson.clink='and';
                this.singleDataJson.operator = this.CombinationQueryForm.operator;
                let that = this;
                if (this.CombinationQueryForm.value instanceof Date){
                    this.CombinationQueryForm.value = this.CombinationQueryForm.value.format("yyyy-MM-dd")
                    this.singleDataJson.value = this.CombinationQueryForm.value;
                    this.singleDataJson.text=this.CombinationQueryForm.value;
                }else{
                    this.CombinationQueryForm.value = this.CombinationQueryForm.value
                }
                //this.isChar=='0' 为级联展示 传递给后台的 value为id   text为描述
                if (this.isChar=='0'){
                    this.singleCondition = this.CombinationQueryForm.map + " " +
                            this.CombinationQueryForm.option + " " + this.CombinationQueryForm.operator + " " + this.searchStr(that.CombinationQueryForm.value[that.CombinationQueryForm.value.length-1],that.data) + " 并且";
                    //传递字典表id
                    this.singleDataJson.value=this.CombinationQueryForm.value[this.CombinationQueryForm.value.length-1];
                    //传递字典表描述
                    this.singleDataJson.text=this.searchStr(that.CombinationQueryForm.value[that.CombinationQueryForm.value.length-1],that.data)
                }else{
                    this.singleCondition = this.CombinationQueryForm.map + " " +
                            this.CombinationQueryForm.option + " " + this.CombinationQueryForm.operator + " " + this.CombinationQueryForm.value + " 并且";
                    this.singleDataJson.value=this.CombinationQueryForm.value;
                    this.singleDataJson.text=this.CombinationQueryForm.value;
                }
                let singleConditionObj = {singleCondition: this.singleCondition, checked: 0,singleDataJson:this.singleDataJson};// checked 0 未选中 1 选中
                let objtemp = {};
                objtemp = JSON.parse(JSON.stringify(singleConditionObj));
                this.condition.push(objtemp);
                console.log(this.condition);

                this.getInfoMap();

            },
            //点击选中的条件
            clickMe(index){
                this.condition.forEach(item=> {
                    item.checked = '0'
                });
                this.itemIndex = index;
                this.condition[index].checked = '1';
            },
            //上移方法
            upMove(){
                let index = this.itemIndex;
                if (index <= 0)
                    return
                let spliceArr = this.condition.splice(index, 1)[0];
                this.condition.splice(index - 1, 0, spliceArr);
                this.itemIndex = index - 1
            },
            //下移方法
            downMove(){
                let index = this.itemIndex;
                let spliceArr = this.condition.splice(index, 1)[0];
                this.condition.splice(index + 1, 0, spliceArr);
                this.itemIndex = index + 1 >= this.condition.length ? this.condition.length - 1 : index + 1;
            },
            //删除单个条件
            singleRemove(){
                let index = this.itemIndex;
                this.condition.splice(index, 1);

            },
            //全部删除
            allRemove(){
                this.condition = [];
            },
            //移除固定列表数据
            remove (row) {
                let that = this;
                that.axios({
                    url:'/v1/sqlbuilder/sql-delete',
                    method:'get',
                    params:{
                        id:row.id
                    }
                })
                .then((res)=>{
                    let needData = res.data;
                    if(needData.code=='200'){
                        that.$Message.success('删除成功');
//                        that.data1.splice(index, 1);
                        that.getTableList();
                    } else {
                        that.$Message.error(needData.msg)
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$Message.error('网络请求异常');
                })

            },
            cancel () {
                this.$router.go(-1)
            },
            ok(){
                console.log(this.$route.params.ids);
                let ids = this.$route.params.ids;
                let queryId = this.queryId;

                if (/^CombinationQuery$/.test(this.$route.name)) {//党组织
                    this.$router.push({name: 'orgManage', params: {ids: ids, queryId: queryId}});
                } else if (/^dangyuan$/.test(this.$route.name)) {
                    type = '2';
                } else if (/^applicantManage$/.test(this.$route.name)) {
                    type = '3';
                } else if (/^UnitQuery$/.test(this.$route.name)) {//单位
                    this.$router.push({name: 'unitManage', params: {queryId: queryId}});
                }
            },
            getTableList(){
                let that = this;
                let qs = require("qs");
                let type = '1'
                if (/^CombinationQuery$/.test(this.$route.name)) {//党组织
                    type = '1';
                } else if (/^dangyuan$/.test(this.$route.name)) {
                    type = '2';
                } else if (/^applicantManage$/.test(this.$route.name)) {
                    type = '3';
                } else if (/^UnitQuery$/.test(this.$route.name)) {//单位
                    type = '4';
                }
                this.axios({
                        method: 'post',
                        url: '/v1/sqlbuilder/sql-list',
                        data: qs.stringify({
                            type: type
                        })
                    })
                    .then(res=> {
                        let needData = res.data;
                        if (needData.code == '200') {
                            that.data1 = needData.data;
                        }
                    })
            },
        },
        mounted(){
            this.getTableList();
            this.getInfoMap();
            this.partyName = this.$store.state.remberNode.name
        }
    }
</script>
<style scoped>
    .max-height .ivu-modal-body {
        max-height: 500px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .party {
        font-size: 12px;
        margin-bottom: 20px;
    }

    .party label {
        font-weight: bold;
    }

    .box-wrap {
        width: 100%;
        height: 180px;
        overflow: auto;
        border: 1px solid #dddee1;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;;
        margin-top: 20px;
    }

    .bold {
        font-weight: bold;
        font-size: 12px;
        margin-bottom: 10px;
    }

    .fr {
        float: left;
        margin-top: 22px;
        margin-left: 25px;
    }

    .mr-5 {
        margin-right: 10px;
        padding-left: 25px;
        padding-right: 25px;
    }

    .ml-10 {
        margin-right: 26px;
        float: right;
    }

    .mb10 {
        margin-bottom: 10px;
    }

    .w100 {
        width: 100px;
    }

    .line-option {
        padding: 5px 10px;
        font-size: 14px;
        list-style: none;
        line-height: 18px;
        cursor: pointer;
    }

    .line-option.selectClass {
        background: #f1f1f1;
        color: #454545;
    }
</style>
