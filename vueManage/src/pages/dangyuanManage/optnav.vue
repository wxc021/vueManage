<template>
    <div class="toolbar">
        <Dropdown @on-click="toolOpt" trigger="click" placement="bottom-start">
            <Button type="ghost">党员维护 <Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem name="Modal-serv-add">党员增加</DropdownItem>
                <DropdownItem name="Modal-serv-del">党员删除</DropdownItem>
                <DropdownItem name="Modal-serv-sort">党员排序</DropdownItem>
                <DropdownItem name="Modal-serv-distribution">党小组人员分配</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Dropdown @on-click="toolOpt" trigger="click" placement="bottom-start">
            <Button type="ghost">党员减少 <Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem name="Modal-decr-out">党员出党</DropdownItem>
                <DropdownItem name="Modal-decr-dead">党员死亡</DropdownItem>
                <DropdownItem name="Modal-decr-stop">停止党籍</DropdownItem>
                <!-- <DropdownItem name="Modal-decr-transfer">党员转出</DropdownItem> -->
            </DropdownMenu>
        </Dropdown>
        <!-- <Button type="ghost" @click="toolOpt('Modal-serv-batch')">批量修改</Button> -->
        <Dropdown @on-click="toolOpt" trigger="click" placement="bottom-start">
            <Button type="ghost">批量处理 <Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem name="Modal-group-batchedit">批量修改</DropdownItem>
                <DropdownItem name="Modal-group-batchadd">批量增加</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Dropdown @on-click="toolOpt" trigger="click" placement="bottom-start">
            <Button type="ghost">查询／统计 <Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem name="Modal-search-combos">组合查询</DropdownItem>
                <DropdownItem name="">一个党组织的组合统计</DropdownItem>
                <DropdownItem name="">多个党组织的组合统计</DropdownItem>
                <!-- <DropdownItem name="Modal-search-random">随机统计</DropdownItem>
                <DropdownItem name="Modal-search-single">一个党组织的组合统计</DropdownItem>
                <DropdownItem name="Modal-search-multi">多个党组织的组合统计</DropdownItem> -->
            </DropdownMenu>
        </Dropdown>
        <Button type="ghost" @click="checkMember">信息校核</Button>
        <!-- <Dropdown @on-click="toolOpt" trigger="click" placement="bottom-start">
            <Button type="ghost">打印 <Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem>打印啥啊</DropdownItem>
            </DropdownMenu>
        </Dropdown> -->
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
                modal : this.modalname,
                Row : this.currentRow,
            }
        },
        watch: {
            currentRow(newVal, oldVal){
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
                let that = this;
                let menuName = name.split('-');
                if (menuName.length < 3) {
                    return
                }

                if ((name === 'Modal-serv-sort' || name === 'Modal-group-batchedit' || name === 'Modal-group-batchadd') && this.$store.state.remberNode['type_icon'] != 5 ) {
                    this.$Message.error('请选择党支部');
                    return;
                }
                this.$emit('select');
                if(menuName[1]=='decr'){
                    if(!that.uid){
                        this.$Message.error('请选择人员');
                        return
                    }
                    this.$router.push({path: '/dangyuan/modal/' + menuName[2], query: {uid:that.uid,dept_id:that.$route.params.dept,type:that.$route.query.type}});
                }else if(menuName[2]=='del'){
                        if(!that.$route.params.dept||!that.remberRow){
                            this.$Message.error('请选择人员');
                            return
                        }
                        this.$Modal.confirm({
                            title: '警告',
                            // content: '确定要删除'+that.remberRow.row['real_name']+'吗？',
                            content : '删除后将不可恢复，请确认是否要删除该党员？',
                            onOk: () => {
                                var that = this;
                                let qs = require('qs')
                                that.axios({
                                    url:'/v1/member/remove-direct',
                                    method:'get',
                                    params:{
                                        uid : that.uid,
                                        // dept_id : that.$route.params.dept,
                                        // gruop:that.$route.query.type==5?"":'1',
                                    },
                                })
                                .then(res=>{
                                    let needData = res.data;
                                    if (needData.code == 200) {
                                        this.$Message.success('操作成功');
                                        that.$emit('del');
                                    } else {
                                        that.$Message.error(needData.msg);
                                    }
                                })
                                .catch(err=>{
                                    this.$Message.error('网络请求异常');
                                })
                            },
                            onCancel: () => {
                            // this.$Message.info('操作取消');
                            }
                        });
                }else if(menuName[2]=='add'||menuName[2]=='distribution'||menuName[2]=='sort'){
                    if(!that.$route.params.dept||that.$route.query.type!='5'){
                        this.$Message.error('请选择党支部');
                        return
                    }else{
                        this.$router.push({path: '/dangyuan/modal/' + menuName[2], query: {dept_id:that.$route.params.dept,type:that.$route.query.type}});
                    }
                }else{
                    this.$router.push({path: '/dangyuan/modal/' + menuName[2], query: {dept_id:that.$route.params.dept,type:that.$route.query.type}});
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
                    url: '/v1/validate/member',
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
                        }  else if(needData.code == '2083') {
                            let urls = window.location.port ? window.location.hostname+':'+window.location.port : window.location.hostname;
                            let posts = 'http://' + urls + '/#memberCheck/' + id+'?name='+this.$store.state.remberNode.name
                            window.open(posts);
                        } else {
                            that.$Message.error(needData.msg);
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
          // console.log(this.$route.params);
           
        }
    }
</script>
<style scope>
    .toolbar{
        display: inline-block;
    }
    .toolbar .ivu-btn-ghost{
        background-color: #fff;
    }
</style>