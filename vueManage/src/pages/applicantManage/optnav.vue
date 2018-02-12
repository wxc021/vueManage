<template>
<div class="toolbar">
    <Button type="ghost" @click='toolOpt("Modal-to-add")'>申请人增加</Button>
    <Dropdown @on-click="toolOpt" trigger="click" placement="bottom-start">
        <Button type="ghost">批量处理 <Icon type="arrow-down-b"></Icon></Button>
        <DropdownMenu slot="list">
            <DropdownItem name="Modal-group-batchedit">批量修改</DropdownItem>
            <DropdownItem name="Modal-group-batchadd">批量增加</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Button type="ghost" @click="toolOpt('Modal-to-history')">转为历史申请人</Button>
    <Dropdown @on-click="toolOpt" trigger="click" placement="bottom-start">
        <Button type="ghost">查询／统计 <Icon type="arrow-down-b"></Icon></Button>
        <DropdownMenu slot="list">
            <DropdownItem name="Modal-search-combos">组合查询</DropdownItem>
            <DropdownItem name="Modal-search-random">随机统计</DropdownItem>
            <DropdownItem name="Modal-search-single">一个党组织的组合统计</DropdownItem>
            <DropdownItem name="Modal-search-multi">多个党组织的组合统计</DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Button type="ghost"  @click="checkMember">信息校核</Button>
</div>
</template>

<script>
import axios from 'axios'
let timer = null;
let CancelToken = axios.CancelToken;
let cancel;
export default {
    name: 'opt-nav',
    props:{
        currentRow:null,
        uid: null,
        remberRow:null,
    },
    data() {
        return {
            modal: this.modalname,
            Row: this.currentRow,
        }
    },
    watch: {
        currentRow(newVal, oldVal) {
            this.Row = newVal
        },
        uid(newVal, oldVal){
            this.uid = newVal;

        },
        remberRow(newVal, oldVal){
            this.remberRow = newVal;
        }
    },
    methods: {
        toolOpt(name) {
            let isEditing = this.$store.state.isEdit;
            let that = this;
            let menuName = name.split('-');
            if (menuName.length < 3) {
                return
            }
            this.$emit('select');
            if(menuName[2]=="history"){
                if(!that.$route.params.dept||!that.remberRow){
                    this.$Message.error('请选择申请人');
                    return
                }
                this.$Modal.confirm({
                    title: '警告',
                    content: '确定要将'+that.remberRow.row['real_name']+'转为历史申请人吗？',
                    onOk: () => {
                        var that = this;
                        let qs = require('qs')
                        that.axios({
                            url:'/v1/member/applytohistory',
                            method:'get',
                            params:{
                                uid : that.uid,
                                dept_id : that.$route.params.dept,
                            },
                        })
                        .then(res=>{
                            let needData = res.data;
                            if (needData.code == 200) {
                                this.$Message.success('操作成功');
                                that.$emit('del',that.$route.params.dept);
                            } else {
                                that.Message.error(needData.msg);
                            }
                        })
                        .catch(err=>{
                            this.Message.error('网络请求异常');
                        })

                    },
                    onCancel: () => {
                    // this.$Message.info('操作取消');
                    }
                });
            }else if(menuName[2]=="add") {
                
                if (this.$route.name == 'applicantinfo' || isEditing) {
                    this.$emit('cacelDefault')
                } else {
                    if(!this.$route.params.dept||this.$route.query.type!='5'){
                        this.$Message.error('请选择党支部');
                        return
                    }
                    this.$router.push({
                        path: '/applicantManage/modal/' + menuName[2],
                        query: {
                            dept_id: this.$route.params.dept,
                            type : this.$route.query.type,
                        }
                    });
                }
                
            }else if(menuName[2].indexOf('batch')>=0){
                 if(!this.$route.params.dept){
                    this.$Message.error('请选择党支部或党小组');
                    return
                }
                this.$router.push({
                    path: '/applicantManage/modal/' + menuName[2],
                    query: {
                        dept_id: this.$route.params.dept,
                        type : this.$route.query.type,
                    }
                });
            }else{
                this.$router.push({
                    path: '/applicantManage/modal/' + menuName[2],
                    query: {dept_id: that.$route.params.dept, type: that.$route.query.type}
                });
            }

        },
        checkMember(){
            let that = this;
            let id = this.$store.state.remberId;
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            this.$store.commit('setLoading');
            this.axios({
                method: 'get',
                url: '/v1/validate/apply',
                params: {
                    dept_id: id,
                },
                cancelToken: new CancelToken(function(c) {
                    cancel = c;
                })
            })
            .then(res => {
                let needData = res.data;
                timer = setTimeout(() => {
                    if (needData.code == 200) {
                        that.$Message.success('没有查出错误');
                    } else {
                        // that.$router.push({name: 'infoCheck', params: {ids: this.$route.params['ids']}});
                        let urls = window.location.port ? window.location.hostname+':'+window.location.port : window.location.hostname;
                        let posts = 'http://' + urls + '/#applicantCheck/' + id+'?name='+this.$store.state.remberNode.name
                        window.open(posts);
                    }
                    that.$store.commit('setLoading', false);
                }, 2000);
            })
            .catch(err => {
                timer = setTimeout(() => {
                    this.$Message.error('网络请求异常');
                    that.$store.commit('setLoading', false);
                }, 2000)
            })
        },
        cancelCheck(){
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            cancel();
            this.$store.commit('setLoading', false);
            this.$Message.info('操作取消');
        }      
    },
    created() {

    },
    mounted() {

    }
}
</script>

<style scope>
.toolbar .ivu-btn-ghost {
    background-color: #fff;
}
</style>
