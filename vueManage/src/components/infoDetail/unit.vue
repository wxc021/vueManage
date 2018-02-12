<template>
    <div class="info-content start-box box-orient" @click="stopP">
        <!-- <div class="info-title start-box box-align box-pack info-padding">
            <p>{{this.$store.state.slideData.name}}</p>
            <i class="cursor-point ivu-icon ivu-icon-close"  @click="closeInfo"></i>
        </div> -->
        <div class="aside-header">
            <span class="title">{{this.$route.params.full_name}}</span>
            <Button  @click="closeInfo" :style="{'float': 'right', 'font-size' : '16px', 'height': '100%'}" type="text"><Icon type="close"></Icon></Button>
        </div>
        <unitForm :controlSave="controlSave"></unitForm>
        <router-view></router-view>
    </div>
</template>
<script>
    import unitForm from '@/components/forms/unit/unitForm.vue'
    export default {
        name: 'unit',
        data() {
            return {
                controlSave: false,
                switchOpen: 0,
                buttonType: 'ghost',
                infodata: {}
            }
        },
        props: ['saveresult'],
        computed: {
        },
        watch: {
            'saveresult'() {
                this.controlSave = !this.controlSave;
            }
        },
        components: {
           unitForm,
        },
        methods: {
            stopP() {
                //event.stopPropagation();
            },
            switchButton() {
                this.buttonType = 'error'
            },
            closeInfo() {
                let that = this;
                if (that.$store.state.isEdit) {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>是否保存修改？',
                        onOk: () => {
                            this.controlSave = !this.controlSave;
                        },
                        onCancel: () => {
                            this.$store.commit('setEdit', {isDisable: false});
                            this.$router.go(-1);
                        }
                    });
                } else {
                    this.$router.go(-1);
                }  
            },
            getInfo(id, type) {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'get',
                    url: '/v1/dept/detail',
                    params: {
                        dept_id: id ? id : 0,
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.infodata = needData.data;
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
        },
        created() {
        },
        mounted() {
        },
    }
</script>
<style scope>
    .aside-header{
        line-height: 49px;
        height: 49px;
        border-bottom: 1px solid #dddddd;
        background-color: #f8f8f8;
        padding-left: 15px;
    }
</style>
