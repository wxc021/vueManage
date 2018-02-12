<template>
<div class="member-info">
    <div class="button-box">
        <Row :gutter="8">
            <Col v-for="item in buttons" span="4" :key="item.name">
                <Button @click="switchInfo(item)" long :type="item.active ? 'primary' : 'ghost'">{{ item.text }}</Button>
            </Col>
        </Row>
    </div>
    <div class="info-container">
        <component ref="asidetab" :editable="allowEdit" :is="currentView" :viewdata="currentViewData"></component>
    </div>
</div>
</template>
<script>
import baseinfo from '@/components/applicantManage/memberinfo-base.vue';
import education from '@/components/applicantManage/memberinfo-education.vue';
import post from '@/components/applicantManage/memberinfo-post.vue';
import adminjob from '@/components/applicantManage/memberinfo-adminjob.vue';
import rewardinfo from '@/components/applicantManage/memberinfo-rewardinfo.vue';
import train from '@/components/applicantManage/memberinfo-train.vue';


export default {
    name: 'applicantinfo',
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
            ,{
                name : 'education',
                text : '学历学位',
                active : false
            },{
                name : 'post',
                text : '工作岗位',
                active : false
            },{
                name : 'adminjob',
                text : '行政职务',
                active : false
            },{
                name : 'rewardinfo',
                text : '奖惩情况',
                active : false
            },{
                name : 'train',
                text : '培养发展',
                active : false
            }],
            currentViewData : this.viewdata,
            currentView : this.viewname,
            allowEdit : this.editable
        }
    },
    components : {
        baseinfo : baseinfo,
        education : education,
        post : post,
        adminjob : adminjob,
        rewardinfo : rewardinfo,
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
    },
    watch : {
        viewdata(newVal, oldVal){
            this.currentViewData = newVal;
            this.activeView = 'name';
            this.switchInfo(this.buttons[0]);
        },
        '$route' (to, from) {
            this.currentView = to.query.tab ? to.query.tab : 'baseinfo';
            this.activeButton(this.currentView);
        }
    },
    mounted() {
        // 检查路由中的参数
        let viewName = this.$route.query.tab ? this.$route.query.tab : 'baseinfo';
        this.currentView = viewName;
        this.activeButton(viewName);
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
    display: -webkit-flex;
    display: flex;
    flex-direction : column;
    height: 100%;
}
.info-container{
    overflow: auto;
}
</style>