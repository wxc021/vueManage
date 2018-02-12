<template>
    <div class="app-main" :style="{'width':'100%','height':'100%'}">
        <div class="layout start-box box-orient" :style="{'width':'100%','height':'100%'}">
            <!-- 头部 -->
            <top></top>
            <div class="start-box box-flex">
                <div class="custom-title">
                    <customList ref="cusList"></customList>
                </div>
                <div class="custom-table start-box box-orient">
                    <Row>
                        <Form style="padding: 0 20px;" :model="formItem" :label-width="90" class="start-box">
                            <FormItem label="报表名称：" style="margin-right:15px;">
                                <Input v-model="formItem.title" placeholder="请输入报表名称"></Input>
                            </FormItem>
                            <FormItem label="报表格式：">
                                <Select v-model="formItem.format" style="width: 100px;" @on-change="changeFormat">
                                    <Option value="1">统计表</Option>
                                    <Option value="2">花名册</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </Row>
                    <Row style="padding: 0 20px">
                            <span class="label">报表说明：</span>
                        <Col span="9" >
                            <Input style="width: 391px;" v-model="formItem.remark" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="添加报表说明"></Input>
                        </Col>
                    </Row>
                    <p style="color:red; padding-left:20px;margin-top: 10px;">注意：鼠标拖动表头可以进行排序</p>
                    <div class="tb-outer start-box box-flex" style="overflow: auto;padding:40px 20px 0 20px;">
                        <div class="item items wxc-item">
                            <div v-show="formItem.format==1" class="origobj li" style="border-left: 1px solid #222;">项目</div>
                            <div v-show="formItem.format==2" class="origobj li" style="border-left: 1px solid #222;border-top:1px solid #222 ;">名称</div>
                            <draggable v-model="lists" @start="drag=true" @end="drag=false">
                                <div class="li" v-for="(item, index) in lists" :key="item.id" style="position: relative; border-left:1px solid #222;" @mouseover="hoverF(item, index, lists,'2')" @mouseout="outerF(item, index, lists)" @mousedown.self="outerF(item, index, lists)" :style="{'borderTop':'none'}">
                                    {{item.value}}
                                    <div  class="start-box box-align box-pack" style="position: absolute; top:-24px; z-index: 100; width:100%; left:0;" v-show="item.show">
                                        <Button class='box-flex' icon="edit" style="font-size:12px !important; padding: 2px;" size="small" type="dashed" @click="render(item, index, lists)">编辑</Button>
                                        <Button  class='box-flex' icon="trash-a" style="font-size:12px !important;padding: 2px;" size="small" type="dashed" @click="remove(item, index, lists, 'cloums')">删除</Button>
                                    </div>
                                </div>
                            </draggable>
                            <div v-show="colsShow" class="origobj start-box box-align box-pack pack-center li" style="border-left: 1px solid #222;border-right:1px solid #222;" @click="add(lists, 'lists')">
                                    <Icon type="plus-round"></Icon>
                            </div>
                        </div>

                        <draggable v-model="cloums" :options="{group:'people'}" @start="drag=true" @end="drag=false" class="start-box hehe">
                            <ul class="item" v-for="(item, index) in cloums"  :key="item.id" style="position: relative;" >
                                <li class="li" @mouseover="hoverF(item, index, cloums,'1')" @mouseout="outerF(item, index, cloums)" @mousedown.self="outerF(item, index, cloums)">
                                    {{item.value}}
                                    <div  class="start-box box-align box-pack" style="position: absolute; top:-24px; z-index: 100; width:100%; left:0;" v-show="item.show">
                                        <Button icon="edit" style="font-size:12px !important; padding: 2px;" size="small" type="dashed" @click="render(item, index, cloums)">编辑</Button>
                                        <Button icon="trash-a" style="font-size:12px !important;padding: 2px;" size="small" type="dashed" @click="remove(item, index, cloums, 'rows')">删除</Button>
                                    </div>
                                </li>
                                <li class="li" v-for="inner in item.list"></li>
                            </ul>  
                        </draggable>
                        <div class="start-box box-align box-pack pack-center add-btn wxc-btn" style="min-width:50px;" @click="add(cloums, 'cloums')">
                            <Icon type="plus-round"></Icon>
                        </div>
                    </div>
                    <div class="info-footer start-box box-align">
                        <div class="box-flex"></div>
                        <Button type="ghost" style="margin-right: 15px;" @click="cancer">取消</Button>
                        <Button type="error" @click="save">保存</Button>
                    </div>
                </div> 
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '@/components/top.vue'
    import editDiv from './edit-input.vue'
    import customList from '@/components/custom/customList.vue'
    import draggable from 'vuedraggable'
    export default {
        name: 'custom',
        data() {
            return {
                formItem: {
                    title: '',
                    format: '1',
                    remark:''
                },
                saveType:'',
                colsShow:true,
                //lists: [{value: 1, show:false, id: '1'}, {value: 2, show:false, id: '2' }, {value: 3, show:false, id: '3'}, {value: 4, show:false, id: '4'}],
                //cloums: [{value: 'A', show: false, list: ['','','',''], id: '1'}, {value: 'B', show: false, list: ['','','',''], id: '2'}, {value: 'C', show: false, list: ['','','',''], id: '3'}, {value: 'D', show: false, list: ['','','',''], id: '4'}]
                lists: [{value: '', show:false, id: '1'}],
                cloums: [{value: 'A', show: false, list: [''], id: '1'}]
            }
        },
        computed: {
            
        },
        watch: {

        },
        components: {
            top,
            editDiv,
            draggable,
            customList
        },
        methods: {
            add(obj, tips) {
                let bol = tips === 'cloums' ? true : false;
                if (bol) {
                    if(this.cloums.length>=26) return
                    obj.push({value: String.fromCharCode(this.cloums.length+1+64), show: false, list: new Array(this.lists.length).fill('')})
                        setTimeout(()=>{
                            let maxBox =  $('.hehe').width()+$(".wxc-btn").width()+$('.wxc-item').width();
                            if(maxBox > $('.tb-outer').width()){
                                let computed = maxBox - $('.tb-outer').width();
                                $('.tb-outer').scrollLeft(computed)
                            }
                        },16);
                } else {
                    obj.push({value: this.lists.length+1, show: false});
                    this.cloums.forEach(item => {
                        item.list.push('');
                    })
                }
            },
            render(item, index, lists) {
                let temp = item.value;
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: item.value,
                                autofocus: true,
                                placeholder: '请输入需要修改的值'
                            },
                            on: {
                                input: (val) => {
                                    lists[index].value = val;
                                }
                            }
                        })
                    },
                    onCancel: () => {
                        lists[index].value = temp;
                    }
                })
            },
            remove(item, index, obj, tips) {
                let str = tips === 'cloums' ? '确定删除该行？' : '确定删除该列？';
                this.$Modal.confirm({
                    title: '提示',
                    content: str,
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        if (tips === 'cloums') {
                            obj.splice(index, 1);
                            this.cloums.forEach((item) => item.list.splice(index, 1));
                        } else {
                            obj.splice(index, 1);
                        }
                    },
                    onCancel: () => {
                        
                    }
                });
            },
            hoverF(item, index, obj,type) {
                let that = this;
                if(obj.length == 1 && type == 2 && that.formItem.format == 2){
                    return
                }
                obj.forEach((item) => {
                    item.show = false;
                })
                obj[index].show = true;
            },
            outerF(item, index, obj) {
                obj.forEach((item) => {
                    item.show = false;
                })
            },
            save() {
                let rows =[];
                let cols =[];
                this.lists.forEach(item=>{
                    rows.push(item.value)
                })
                this.cloums.forEach(item=>{
                    cols.push(item.value)
                })
                let that = this;
                let qs = require('qs');
                this.axios({
                    method:'post',
                    url:'v1/statement/add',
                    data:qs.stringify({
                        id:that.$route.params.id,
                        title:that.formItem.title,
                        type:that.formItem.format,
                        remark:that.formItem.remark,
                        structure:JSON.stringify({cols:cols,rows:rows})
                    }),
                })
                .then(res=>{
                    let needData = res.data;
                    if(needData.code == '200'){
                        this.$Message.success('保存成功!');
                        this.$refs.cusList.getList();
                    }else{

                        this.getDetail(this.$route.params.id)
                        this.$Message.error(needData.msg);
                    }
                })
                console.log(rows, cols);


            },
            cancer() {

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
            },
            getDetail(id){
                console.log('getDetail');
                let that = this;
                if (id==0)return;
                this.axios({
                    method:'get',
                    url:'v1/statement/detail',
                    params:{id:id}
                })
                .then(res=>{
                    let needData = res.data;
                    if(needData.code='200'){
                        that.formItem.title = needData.data.title; //表名
                        that.formItem.format = needData.data.type; //类型
                        that.formItem.remark = needData.data.remark; //报表说明
                        that.saveType= needData.data.type;//保存type值 作为对比使用
                        if(needData.data.structure.cols.length==0 && needData.data.structure.rows.length==0){
                            if(needData.data.type == 1){
                                this.lists= [{value: 1, show:false, id: '1'}];
                                this.cloums = [{value: 'A', show: false, list: [''], id: '1'}];
                                this.colsShow = true;
                            }else if(needData.data.type==2){
                                this.colsShow = false;
                                this.lists = [{value: '', show:false, id: '1'}];
                                this.cloums = [{value: 'A', show: false, list: [''], id: '1'}];
                            }
                        }else {
                            if(needData.data.type == 1){
                                this.colsShow = true;
                                let listLen = needData.data.structure.rows.length;
                                let tempcols = [];
                                needData.data.structure.cols.forEach((item,index) => {
                                    tempcols.push({
                                        value: item,
                                        show: false,
                                        id: index + 1,
                                        list: new Array(listLen).fill('')
                                    })
                                });
                                that.cloums = Object.assign([], tempcols);
                                let temprows = [];
                                needData.data.structure.rows.forEach((item,index) => {
                                    temprows.push({
                                        value: item,
                                        show: false,
                                        id: index + 1
                                    })
                                });
                                this.lists = Object.assign([], temprows);
                            }else if(needData.data.type == 2) {
                                this.colsShow = false;
                                let listLen = needData.data.structure.rows.length;
                                let tempcols = [];
                                needData.data.structure.cols.forEach((item,index) => {
                                    tempcols.push({
                                        value: item,
                                        show: false,
                                        id: index + 1,
                                        list: new Array(listLen).fill('')
                                    })
                                });
                                that.cloums = Object.assign([], tempcols);
                                that.lists = [{value: '', show:false, id: '1'}];


                            }
                        }
                    }else{
                        this.$Message.error(needData.msg);
                    }
                })
            },
            listenGetID(){
                let that = this;
                this.$refs.cusList.$on('getId',(res)=>{
                    that.getDetail(res)
                })
            },
            changeFormat(value){
                if(this.saveType===value){
                   this.getDetail(this.$route.params.id)

                }else{
                    if(value == 1){
                        this.lists= [{value: 1, show:false, id: '1'}];
                        this.cloums = [{value: 'A', show: false, list: [''], id: '1'}];
                        this.colsShow = true;
                    }else if(value==2){
                        this.colsShow = false;
                        this.lists = [{value: '', show:false, id: '1'}];
                        this.cloums = [{value: 'A', show: false, list: [''], id: '1'}];
                    }
                }


            }
        },
        created() {
                
        },
        mounted() {
            this.listenGetID();
            this.getDetail(this.$route.params.id)

        }
    }
</script>
<style>
    .ht_master:not(.innerBorderLeft):not(.emptyColumns) ~ .handsontable tbody tr th {
        height: 22px !important;
    }
</style>
<style scoped>
    .label{
        font-size: 14px !important;
        width: 90px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 12px;
        color: #495060;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: border-box;
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
        width: 67%;
        border:1px solid #dddee1;
        background:#fff;
        margin: 20px auto;
        padding-top: 20px;
        overflow: hidden;
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
</style>