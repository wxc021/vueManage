<template>
    <div class="check-status">
        <Dropdown trigger="click" placement="bottom-start"  @on-click="zuzhiChange">
            <Button type="ghost" style="background: #ffffff;">党组织维护 <Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem v-for="item in zuzhiList" :disabled="item.disabled"  :name="item.value" :key="item.value">{{item.label}}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Dropdown trigger="click" placement="bottom-start"  @on-click="zhibuChange">
            <Button type="ghost" style="background: #ffffff;">党支部维护 <Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem v-for="item in zhibuList" :name="item.value" :key="item.value">{{item.label}}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <!-- <Button type="ghost" @click="updateAll">批量修改</Button> -->
        <Dropdown trigger="click" placement="bottom-start" @on-click="searchChange">
            <Button type="ghost" style="background: #ffffff;">查询统计 <Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem v-for="item in serachSet" :name="item.value" :key="item.value">{{item.label}}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Button type="ghost" @click="infoCheck" style="background: #ffffff;">信息校核</Button>
        <!-- <Dropdown trigger="click" placement="bottom-start" @on-click="prientChange">
            <Button type="ghost">打印 <Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem v-for="item in prientList" :name="item.value"  :key="item.value">{{item.label}}</DropdownItem>
            </DropdownMenu>
        </Dropdown> -->
        <Checkbox style="margin-left: 20px;" v-model="isHistory">显示历史党支部</Checkbox>
    </div>
</template>
<script>
    import axios from 'axios'
    let timer = null;
    let CancelToken = axios.CancelToken;
    let cancel;
	export default {
		name: 'subnav',
		data() {
			return {
                isHistory: false,
                zuzhiList: [{value: 1, label: '党组织增加', disabled: false}, {value: 2, label: '党组织删除', disabled: false}, {value: 3, label: '整建制转移', disabled: false}],
                zuzhiModel: '',
                zhibuList: [{value: 1, label: '党支部合并'}, {value: 2, label: '党支部拆分'}, {value: 3, label: '党支部撤销'}, {value: 4, label: '设党小组'}],
                zhibuModel: '',
                serachSet: [
                    {value: 1, label: '组合查询'}, 
                    // {value: 2, label: '随机统计'}, 
                    {value: 3, label: '一个党组织的组合统计'}, 
                    {value: 4, label: '多个党组织的组合统计'}
                ],
                searchModel: 1,
                prientList: [{value: 1, label: '打印'}],
                prientModel: '',
			}
		},
		props: ['tags','remberRow'],
        computed: {
            newRow() {
                return this.remberRow;
            }
        },
		watch: {
            isHistory(newD, oldD) {
                if (newD != oldD) {
                    this.$store.commit('setHistory');
                };
            }
		},
		methods: {
            zuzhiChange(item) {
                // alert(this.$store.state.remberNode['type_icon'])
                
                switch(parseInt(item)) {
                    case 1: 
                        if (this.$store.state.remberNode['type_icon'] < 5) {
                            this.$router.push({name: 'AddOrganization', params: {}}); break;
                        } else {
                            this.$Message.error('当前党组织不能新增党组织'); 
                            return; 
                        }
                    case 2:
                    console.log(this.newRow)
                        if(!this.newRow.row) {
                          this.$Message.error('请勾选需要删除的党支部或者党小组'); 
                          return; 
                        }  
                        let postData = {}, url = '';

                        //党支部删除
                        if (this.newRow.row.type_icon != 6) {
                            postData = Object.assign({}, {
                                        dept_id: this.newRow.row['id'],
                                    });
                            url = '/v1/dept/remove';
                            this.$store.commit('setFlash2', {type: 1})
                        } else if(this.newRow.row.type_icon == 6) { //党小组删除
                            postData = Object.assign({}, {
                                        dept_id: this.newRow.row['dept_id'],
                                        id: this.newRow.row['id']
                                    });
                            url = '/v1/deptgroup/del';
                            this.$store.commit('setFlash2', {type: 2})
                        }
                        this.$Modal.confirm({
                            title: '提示',
                            content: '确定要删除"'+this.newRow.row['name']+'"吗？',
                            onOk: () => {
                                let that = this;
                                let qs = require('qs');
                                this.axios({
                                    method: 'post',
                                    url: url,
                                    params: postData
                                })
                                .then(res => {
                                    let needData = res.data;
                                    if (needData.code == 200) {
                                        that.$Message.success('删除成功');
                                        that.$store.commit('setStrict');
                                    } else {
                                        that.$Message.error(needData.msg);
                                    }
                                })
                                .catch(err => {
                                    this.$Message.error('网络请求异常');
                                })
                            },
                            onCancel: () => {
                            }
                        }); break;
                    case 3: 
                        if(!this.newRow.row) {
                          this.$Message.error('请在列表中勾选需要转移的党组织'); 
                          return; 
                        }  
                        if (this.$store.state.remberNode['type_icon'] == 6) {
                           this.$Message.error('党小组不能整建制转移'); 
                           return; 
                        };
                        this.$router.push({name: 'InsideTransfer', params: {id: this.newRow.row['id'], data: this.newRow.row}});break;
                }
            },
            check() {
                console.log(this.newRow)
                if(!this.newRow.row) {
                    this.$Message.error('请勾选需要操作的党支部'); 
                    return false; 
                }  
                if (this.newRow.row && this.newRow.row.type_icon!=5) {
                    this.$Message.error('您勾选的是非党支部，请勾选需要操作的党支部'); 
                    return false; 
                };
                return true;
            },
            zhibuChange(item) {
                switch(parseInt(item)) {
                    case 1:  
                        if (!this.check()) {return;};
                        this.$router.push({name: 'PartyMerge', params: {id: this.$route.params['ids']}}); 
                    break;
                    case 2: 
                        if (!this.check()) {return;};
                        if (this.newRow.row['deleteflag'] != 0) {
                            this.$Message.error('历史党支部不可操作'); 
                            return false; 
                        };
                        this.$router.push({name: 'PartySplit', params: {id: this.$route.params['ids']} });break;
                    case 3: 
                        if (!this.check()) {return;};
                        if (this.newRow.row['deleteflag'] != 0) {
                            this.$Message.error('历史党支部不可操作'); 
                            return false; 
                        };
                        this.$router.push({name: 'PartyRevoke', params: {id: this.$route.params['ids']}});break;
                    case 4: 
                        if (!this.check()) {return;};
                        if (this.newRow.row['deleteflag'] != 0) {
                            this.$Message.error('历史党支部不可操作'); 
                            return false; 
                        };
                        this.$router.push({name: 'PartyTeam', params: {id: this.$route.params['ids']} });break;
                }
            },
            searchChange(item) {
                switch(parseInt(item)) {
                    case 1:
                        /*if(!this.newRow.row) {
                            this.$Message.error('请在列表中勾选党组织');
                            return;
                        }*/
                        this.$router.push({name: 'CombinationQuery', params: {}}); break;
                }
            },
            prientChange() {

            },
            updateAll(){
              this.$router.push({name: 'BatchUpdate', params: {}});
            },
            infoCheck() {
                let that = this;
                let ids = this.$route.params['ids'];
                if (this.$store.state.remberNode['type_icon'] == 6) {
                    that.$Message.error('党小组不具备信息校核');
                    return;
                };
                if (ids == 0) {
                    ids = this.$store.state.remberId;
                };
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                this.$store.commit('setLoading');
                this.axios({
                    method: 'get',
                    url: '/v1/validate/dept',
                    params: {
                        dept_id: ids,
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
                        } else if(needData.code == '2083') {
                            // that.$router.push({name: 'infoCheck', params: {ids: this.$route.params['ids']}});
                            let urls = window.location.port ? window.location.hostname+':'+window.location.port : window.location.hostname;
                            let posts = 'http://'+urls+'/#infoCheck/'+ids+'?name='+this.$store.state.remberNode.name;
                            if (this.$store.state.remberNode['type_icon'] == 5) {
                                posts = 'http://'+urls+'/#infoCheck/'+ids+'?type=5'+'&name='+this.$store.state.remberNode.name
                            };
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
            this.$store.state.remberNode
	    },
	}
</script>
<style scoped>
	body,html,#app {
		width: 100%;
		height: 100%;
	}

	.layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        /* margin: 15px; */
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
</style>
