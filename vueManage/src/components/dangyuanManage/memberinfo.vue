<template>
<div class="member-infom start-box box-orient" style="height:100%">
    <div class="button-box">
        <Row :gutter="8">
            <Col v-for="item in buttons" span="4" :key="item.name">
                <Button @click="switchInfo(item)" long :type="item.active ? 'primary' : 'ghost'">{{ item.text }}</Button>
            </Col>
        </Row>
    </div>
    <div class="info-container box-flex">
        <component ref="asidetab" @event-bus="eventBus" :editable="allowEdit" :is="currentView" :viewdata="currentViewData"></component>
    </div>
</div>
</template>
<script>
import baseinfo from '@/components/dangyuanManage/memberinfo-base.vue';
// import addres from '@/components/dangyuanManage/memberinfo-addres.vue';
import education from '@/components/dangyuanManage/memberinfo-education.vue';
import post from '@/components/dangyuanManage/memberinfo-post.vue';
import partyjob from '@/components/dangyuanManage/memberinfo-partyjob.vue';
import adminjob from '@/components/dangyuanManage/memberinfo-adminjob.vue';
import partymemberinfo from '@/components/dangyuanManage/memberinfo-partymemberinfo.vue';
import grouprelation from '@/components/dangyuanManage/memberinfo-grouprelation.vue';
import rewardinfo from '@/components/dangyuanManage/memberinfo-rewardinfo.vue';
import democratic from '@/components/dangyuanManage/memberinfo-democratic.vue';
// import flow from '@/components/dangyuanManage/memberinfo-flow.vue';
import hard from '@/components/dangyuanManage/memberinfo-hard.vue';
import abroad from '@/components/dangyuanManage/memberinfo-abroad.vue';
import representative from '@/components/dangyuanManage/memberinfo-representative.vue';
import train from '@/components/dangyuanManage/memberinfo-train.vue';


export default {
    name: 'memberinfo',
    props: {
        viewdata : null,
        viewname : {
            type : String,
            default : 'baseinfo'
        },
        editable : {
            type : Boolean,
            default : true
        }
    },
    data() {
        return {
            buttons : [{
                name : 'baseinfo',
                text : '基本情况',
                active : true
            }
            // ,{
            //     name : 'addres',
            //     text : '通讯地址',
            //     active : false
            // }
            ,{
                name : 'education',
                text : '学历学位',
                active : false
            },{
                name : 'post',
                text : '工作岗位',
                active : false
            },{
                name : 'partyjob',
                text : '党内职务',
                active : false
            },{
                name : 'adminjob',
                text : '行政职务',
                active : false
            },{
                name : 'partymemberinfo',
                text : '党籍信息',
                active : false
            },{
                name : 'grouprelation',
                text : '组织关系',
                active : false
            },{
                name : 'rewardinfo',
                text : '奖惩情况',
                active : false
            },{
                name : 'democratic',
                text : '民主评议',
                active : false
            },
            // {
            //     name : 'flow',
            //     text : '流动党员',
            //     active : false
            // },
            {
                name : 'hard',
                text : '困难党员',
                active : false
            },{
                name : 'abroad',
                text : '出国出境',
                active : false
            },{
                name : 'representative',
                text : '党代表',
                active : false
            },
            // {
            //     name : 'train',
            //     text : '培养发展',
            //     active : false
            // }
            ],
            currentViewData : this.viewdata,
            currentView : this.viewname,
            allowEdit : this.editable
        }
    },
    components : {
        baseinfo : baseinfo,
        // addres : addres,
        education : education,
        post : post,
        partyjob : partyjob,
        adminjob : adminjob,
        partymemberinfo : partymemberinfo,
        grouprelation : grouprelation,
        rewardinfo : rewardinfo,
        democratic : democratic,
        // flow : flow,
        hard : hard,
        abroad : abroad,
        representative : representative,
        train : train
    },
    methods: {
        switchInfo(data){
            let _this = this;
            _this.$router.push({ 
                name: _this.$route.name, 
                params: { 
                    uid: this.$route.params.uid
                },
                query: Object.assign({}, this.$route.query, {tab: data.name})
            });
        },

        activeButton(tabName){
            this.buttons.forEach((item,index) => {
                if (item.name == tabName) {
                    item.active = true;
                } else {
                    item.active = false
                }
            },this);
        },

        // [name, args...]
        eventBus(name, args){
            args.unshift(name);
            this.$emit.apply(this, args);
        }
    },
    watch : {
        viewdata(newVal, oldVal){
            this.currentViewData = newVal;
            this.switchInfo(this.buttons[0]);
        },
        
        '$route' (to, from) {
            
            this.currentView = to.query.tab ? to.query.tab : 'baseinfo';
            // if(this.currentView=='baseinfo'){
            //     this.switchInfo(this.buttons[0]);
            // }
            this.activeButton(this.currentView);
        }
    },
    mounted() {

        // 检查路由中的参数
        let viewName = this.$route.query.tab ? this.$route.query.tab : 'baseinfo';
        this.currentView = viewName;
        this.activeButton(viewName);
        // this.$on('event-bus', this.eventBus);
    }
}
</script>
<style scoped>
.button-box{
    padding: 8px 8px 0 8px;
    border-bottom: 1px solid #ddd;
}
.button-box .ivu-btn{
    margin-bottom: 8px;
}
.button-group{
    margin-bottom: 8px;
}
.member-info{
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -moz-box-orient:vertical;
    -moz-box-direction:normal;
    flex-direction:column;
    -webkit-flex-direction:column;
    height: 100%;
}
.info-container{
    overflow: auto;
}
</style>