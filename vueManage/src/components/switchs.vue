<template>
    <div class="table-switch info-padding">
        <Button style="margin-bottom: 5px;margin-right:5px;" v-for="(item, index) in tables"  :type="item.active ? 'error' : 'ghost'" :key="item.name" @click="changeBt(item, index)">{{item.name}}</Button>
    </div>
</template>
<script>
    export default {
        name: 'switchs',
        props: ['switchs'],
        data() {
            return {
            }
        },
        computed: {
            tables() {
                // 根据show控制按钮显示
                return this.switchs.filter(item => {
                    return item.show
                });
            }
        },
        watch: {
            switchs(val) {
                this.tables = val;
            },
        },
        components: {
        },
        methods: {
            changeBt(item, index) {
                this.$emit('changSwitch', {item: item, index: index});
            }
        },
        created() {
        },
        mounted() {
            // console.log(this.$route)
        },
    }
</script>
<style scoped>

</style>
