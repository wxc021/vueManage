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
                <DropdownItem name="Modal-decr-transfer">党员转出</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Button type="ghost" @click="toolOpt('Modal-serv-batch')">批量修改</Button>
        <Dropdown @on-click="toolOpt" trigger="click" placement="bottom-start">
            <Button type="ghost">查询／统计 <Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem name="Modal-search-combos">组合查询</DropdownItem>
               <!--  <DropdownItem name="Modal-search-random">随机统计</DropdownItem>
                <DropdownItem name="Modal-search-single">一个党组织的组合统计</DropdownItem>
                <DropdownItem name="Modal-search-multi">多个党组织的组合统计</DropdownItem> -->
            </DropdownMenu>
        </Dropdown>
        <Button type="ghost">信息校核</Button>
        <Dropdown @on-click="toolOpt" trigger="click" placement="bottom-start">
            <Button type="ghost">打印 <Icon type="arrow-down-b"></Icon></Button>
            <DropdownMenu slot="list">
                <DropdownItem>打印啥啊</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>
<script>
    export default {
        name: 'opt-nav',
        props:{
            currentRow:null
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
            }
        },
        methods: {
            toolOpt(name) {
                console.log(name);
                let menuName = name.split('-');
                let uid = this.Row? this.Row.id : null;
                if (menuName.length < 3) {
                    return
                }
                this.$emit('select');
                if(menuName[2]=='del'||menuName[1]=='decr'){
                    if(!uid){
                        return
                    }
                    this.$router.push({path: '/dangyuan/modal/' + menuName[2], query: {uid: uid}});
                }else{
                    this.$router.push('/dangyuan/modal/' + menuName[2])
                }
            }
        },
        created() {
            
        },
        mounted() {
            
        }
    }
</script>
<style scope>
    .toolbar .ivu-btn-ghost{
        background-color: #fff;
    }
</style>