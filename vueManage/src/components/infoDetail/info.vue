<template>
    <div class="info-content start-box box-orient" @click="stopP">
        <!-- <div class="info-title start-box box-align box-pack info-padding">
            <p>{{this.$store.state.slideData.name}}{{this.$route.params['title']}}</p>
            <i style="float: right;" class="cursor-point ivu-icon ivu-icon-close"  @click="closeInfo"></i>
        </div> -->
        <div class="aside-header">
            <span class="title">{{this.$store.state.slideData.name}}{{this.$route.params['title']}}</span>
            <Button  @click="closeInfo" :style="{'float': 'right', 'font-size' : '16px', 'height': '100%'}" type="text"><Icon type="close"></Icon></Button>
        </div>
        <Switchs :switchs="switchs" @changSwitch="changSwitch"></Switchs>
        <Info v-if="switchOpen == 0" :controlSave="controlSave"></Info>
        <ContactInfo v-if="switchOpen == 1" :controlSave="controlSave"></ContactInfo>
        <Team v-if="switchOpen == 2" :controlSave="controlSave"></Team>
        <Reward v-if="switchOpen == 3" :controlSave="controlSave"></Reward>
        <Unit v-if="switchOpen == 4" :controlSave="controlSave"></Unit>
        <Review v-if="switchOpen == 5" :controlSave="controlSave"></Review>
        <HistoryParty v-if="switchOpen == 6" :controlSave="controlSave"></HistoryParty>
        <!-- <Info v-if="switchOpen"></Info> -->
        <router-view></router-view>
    </div>
</template>
<script>

    import Switchs from '@/components/switchs.vue'
    import Info from '@/components/forms/baseInfo.vue'
    import ContactInfo from '@/components/forms/contactInfo.vue'
    import Team from '@/components/forms/team.vue'
    import Reward from '@/components/forms/reward.vue'
    import Unit from '@/components/forms/unit.vue'
    import Review from '@/components/forms/review.vue'
    import HistoryParty from '@/components/forms/historyParty.vue'
    export default {
        name: 'info',
        data() {
            return {
                switchOpen: this.$route.params.switchs ? this.$route.params.switchs : 0,
                buttonType: 'ghost',
                controlSave: false,
                switchs: [{name: '基本情况', active: true, route: 'baseInfo', show: true},
                    {name: '联系方式', active: false, route: 'ContactInfo', show: true},
                    {name: '班子成员', active: false, route: 'Team', show: true},
                    {name: '奖惩情况', active: false, route: 'Reward', show: true},
                    {name: '单位信息', active: false, route: 'Unit', show: true},
                    {name: '支部民主评议', active: false, route: 'Review', show: false},
                    // {name: '历史党支部信息', active: false, route: 'HistoryParty'},
                ],
                infodata: {}
            }
        },
        props: ['saveresult'],
        computed: {
            isSave() {
                return this.saveResult;
            }
        },
        watch: {
            '$route' (to, from) {
                if (this.$store.state.isEdit) {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>是否保存修改？</p>',
                        onOk: () => {
                            this.controlSave = !this.controlSave;
                        },
                        onCancel: () => {  
                            this.$store.commit('setEdit', {isDisable: false});
                        }
                    });
                }
                if (to.name == "info") {
                    // 如果是党支部(type ) 右侧按钮选项显示支部民主评议按钮
                    if (this.$route.query && this.$route.query.type != 5) {
                        this.switchs[5].show = false;
                    }
                    else {
                        this.switchs[5].show = true;
                    }
                };
            },
            'saveresult'() {
                this.controlSave = !this.controlSave;
            }
        },
        components: {
           Info,
           Switchs,
           ContactInfo,
           Team,
           Reward,
           Unit,
           Review,
           HistoryParty
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
            promiseF(isTrue) {
                return new Promise(function() {
                    if (isTrue) {
                        resolve();
                    } else {
                        reject();
                    }
                })
            },
            commF(data) {
                let that = this;
                if (!that.switchs[data.index].active) {
                    for (let i = 0; i < that.switchs.length; i++) {
                         that.switchs[i].active = false;
                    };
                    that.switchs[data.index].active = true;
                };
                that.switchOpen = data.index;
                this.$store.commit('setEdit', {isDisable: false});
            },
            // events up tableswitch change
            changSwitch(data) {
                let that = this;
                if (that.$store.state.isEdit) {
                    this.$Modal.confirm({
                        title: '提示',
                        content: '<p>是否保存修改？',
                        onOk: () => {
                            this.controlSave = !this.controlSave;
                        },
                        onCancel: () => {
                            this.commF(data);
                        }
                    });
                } else {
                    this.commF(data);
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
           //this.getInfo(this.$route.params.id);
        },
        mounted() {
            if (this.$route.params.switchs) {
                this.switchs.forEach(item => item.active = false)
                this.switchs[this.$route.params.switchs].active = true;
            };
            if (this.$route.query && this.$route.query.type != 5) {
                this.switchs[5].show = false;
            } else {
                this.switchs[5].show = true;
            }
            this.$store.commit('setEdit', {isDisable: false});
        },
    }
</script>
<style scope>
    .aside-header{
        line-height: 49px;
        height: 49px;
        border-bottom: 1px solid #dddddd;
        background-color: #f8f8f8;
    }
    .aside-header .title{
        padding-left: 16px;
        font-size: 16px;
    }
</style>
