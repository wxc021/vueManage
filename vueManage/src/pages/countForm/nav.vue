<template>
    <div>
        
        <div class="form-set-nav layout-breadcrumb clearfix" v-show="verify == 4">
            <Button type="ghost" style="background: #fff;" :disabled="setDis" @click="clearTable(1)">清空报表</Button>
                
            <Button type="ghost" style="background: #fff;"  @click="tableSet(1)" :disabled="setDis">汇总本表</Button>
            
            <Button type="ghost" style="background: #fff;" :disabled="setDis">打印本表</Button>
                
            <Button type="ghost" style="background: #fff;" @click="output(1)"  :disabled="setDis">导出本表</Button>

            <Button type="ghost" style="background: #fff;" :disabled="setDis" @click="lockFStyle">{{lockLabel}}</Button>
            <!-- <Button type="ghost">上报解锁</Button> -->
            <div class="right-set fr">
                <Button type="error"  @click="beginDo">{{btnTips}}</Button>
                <Button type="ghost" :disabled="!saveStatus" @click="saveTable">保存</Button>
            </div>
        </div>

    	<div class="form-set-nav layout-breadcrumb clearfix" v-show="verify == 1">
            <Dropdown trigger="click" placement="bottom-start" @on-click="clearTable">
                <Button type="ghost" style="background: #fff;" :disabled="setDis">报表清空 <Icon type="arrow-down-b"></Icon></Button>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in tableClearList" :name="item.value" :key="item.value">{{item.name}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown trigger="click" placement="bottom-start" @on-click="tableCountF"> 
                <Button type="ghost" style="background: #fff;" :disabled="setDis">报表直统 <Icon type="arrow-down-b"></Icon></Button>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in tableCountList" :name="item.value" :key="item.value">{{item.name}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown trigger="click" placement="bottom-start" @on-click="tableSet">
                <Button type="ghost" style="background: #fff;" :disabled="setDis">报表汇总 <Icon type="arrow-down-b"></Icon></Button>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in tableAllList" :name="item.value" :key="item.value">{{item.name}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <!-- <Button type="ghost" style="background: #fff;" :disabled="setDis">数据反查</Button> -->
            
            <Dropdown trigger="click" placement="bottom-start" @on-click="checkF">
                <Button type="ghost" style="background: #fff;" :disabled="setDis">报表校核 <Icon type="arrow-down-b"></Icon></Button>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in checkTableList" :name="item.value" :key="item.value">{{item.name}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown trigger="click" placement="bottom-start">
                <Button type="ghost" style="background: #fff;" :disabled="setDis">查询 <Icon type="arrow-down-b"></Icon></Button>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in searchList" :name="item.value"  :key="item.value">{{item.name}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown trigger="click" placement="bottom-start" @on-click="prientF">
                <Button type="ghost" style="background: #fff;" :disabled="setDis">打印 <Icon type="arrow-down-b"></Icon></Button>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in prientList" :name="item.value"  :key="item.value">{{item.name}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <!-- <Dropdown trigger="click" placement="bottom-start" @on-click="output">
                <Button type="ghost" style="background: #fff;" :disabled="setDis">导出 <Icon type="arrow-down-b"></Icon></Button>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in exportList" :name="item.value" :key="item.value">{{item.name}}</DropdownItem>
                </DropdownMenu>
            </Dropdown> -->
            <Button type="ghost" style="background: #fff;" :disabled="setDis" @click="lockF">{{lockLabel}}</Button>
            <!-- <Button type="ghost">上报解锁</Button> -->
            <div class="right-set fr">
                <Button type="error" @click="beginDo">{{btnTips}}</Button>
                <Button type="ghost" :disabled="!saveStatus" @click="saveTable">保存</Button>
            </div>
        </div>
    </div>
</template>
<script>
	export default {
		name: 'nav',
        data() {
        	return {
                setDis: false,
                lockLabel: '上报锁定',
                // saveStatus: true,
                btnTips: '开始录改',
                tableClearList: [{name: '清空本表', value: 1},{name: '清空多表', value: 2}],
                tableCountList:  [{name: '直统本表', value: 1},{name: '直统多表', value: 2}],
                tableAllList:  [{name: '汇总本表', value: 1},{name: '汇总多表', value: 2}],
                checkTableList:  [{name: '校核本表', value: 1},{name: '校核全部',value: 2}],
                searchModel: 1,
                prientList: [{name: '打印本表', value: 1}, {name: '打印多表', value: 2}, {name: '打印多表', value: 2}, {name: '打印整套报表', value: 3}, {name: '打印整套说明', value: 4}, {name: '导出EXCEL', value: 5}],
                // exportList: [{name: '导出本表', value: 1}, {name: '导出多表', value: 2}],
                searchList: [{name: '数据反查', value: 1}, {name: '单项查询', value: 2}, {name: '按行查询', value: 3}, {name: '按列查询', value: 4}],
        	}
        },
        props: ['lockstatus', 'verify'],
        computed: {
            saveStatus: { 
                set(val) {
                    this.$store.commit('setStatus', {stat: val})
                },
                get() {
                    this.btnTips = this.$store.state.remberStatus ? '开始录改' : '取消录改';
                    return !this.$store.state.remberStatus;  
                }
            },
            isLock: {
                set(val) {
                },
                get() {
                    return this.lockstatus;
                }
            }
        },
        watch: {
            '$route' (to, from) {
                this.$store.commit('setStatus', {stat: true}) 
            },
            isLock (a, b) {
              this.lockLabel = a ? '解锁报表' : '上报锁定';  
            },
            verify (a, b) {
                if(a != b) {
                   this.$emit('changeurl', {id: this.verify}) 
                }
            }
        },
        methods: {
            ajax(method, url, data) {
                let qs = require('qs');
                return this.axios({
                    method: method,
                    url: url,
                    params: data,
                    data: qs.stringify(data)
                })
            },
        	//报表清空
        	clearTable(val) {
                this.$emit('allControl', {value: val, type: 1})
            },
            //报表直统
            tableCountF(val) {
                this.$emit('allControl', {value: val, type: 2})
            },
            //报表汇总
            tableSet(val) {
            	this.$emit('allControl', {value: val, type: 3})
            },
            //报表校核
            checkF(val) {
            	this.$emit('allControl', {value: val, type: 4})
            },
            //打印
            prientF(val) {
            	this.$emit('allControl', {value: val, type: 5})
            },
            //导出
            output(val) {
            	this.$emit('allControl', {value: val, type: 6})
            },
            //上所解锁
            lockF() {
                if (this.isLock) {
                    this.$emit('allControl', {value: 1, type: 7})
                } else {
                    this.$emit('allControl', {value: 2, type: 7})
                }
            },
            lockFStyle(){
                if (this.isLock) {
                    this.$emit('allControl', {value: 1, type: 10, isLock: this.isLock})
                } else {
                    this.$emit('allControl', {value: 2, type: 10, isLock: this.isLock})
                }
            },
            //开始录制
            beginDo() {
                this.saveStatus = !this.saveStatus;       
                this.$nextTick(() => {
                    this.saveStatus && (this.setDis = true)
                    !this.saveStatus && (this.setDis = false)
                })
            	this.$emit('allControl', {value: 1, type: 8, status: this.saveStatus})
                this.$store.commit('setStatus', {stat: this.saveStatus})
            },
            //保存报表
            saveTable() {
            	this.$emit('allControl', {value: 1, type: 9})
            },
        }
	}
</script>
<style scoped>
	
</style>