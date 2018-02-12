<template>
    <div class="app-main" :style="{'width':'100%','height':'100%'}">
        <div class="layout" :style="{'width':'100%','height':'100%'}">
            <!-- 头部 -->
            <div class="top-bar">
                <div class="index-wrap start-box" :style="{'justify-content' : 'space-between'}">
                    <router-link :to="{name : 'mainIndex'}">
                        <div class="layout-header start-box box-align" :style="{'backgroundColor':'#de3018', 'width':'100%', 'paddingLeft': '15px'}">
                            <div class="start-box">
                                <div class="bg"></div>
                                <p style="font-size: 20px;">天津市党内统计信息系统</p>
                            </div>
                        </div>
                    </router-link>
                    <a style="flex:1; text-align: right;" class="feedback" href="http://10.99.153.22:8080/ " target="_blank"><Icon type="compose"></Icon> 问题建议反馈</a>     
                    <Profile></Profile>
                </div>
            </div>
            <div class="index-box">
                <div class="index-wrap index-container clearfix">
                    <div class="index-nav-box">
                        <div class="index-nav-header">组织管理</div>
                        <div class="index-nav-list">
                            <router-link to="/orgManage/0" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-branch"></i>
                                <div>党组织管理</div>
                            </router-link>
                            <router-link to="/unitManage" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-unit"></i>
                                <div>单位管理</div>
                            </router-link>
                        </div>
                    </div>
                    <div class="index-nav-box">
                        <div class="index-nav-header">党员管理</div>
                        <div class="index-nav-list">
                            <router-link to="/dangyuan" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-member"></i>
                                <div>党员管理</div>
                            </router-link>
                            <router-link to="/historyManage" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-history"></i>
                                <div>历史人员管理</div>
                            </router-link>
                            <router-link to="/organizationManage" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-relation"></i>
                                <div>转接组织关系</div>
                            </router-link>
                            <router-link to="/interview" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-letter"></i>
                                <div>介绍信管理</div>
                            </router-link>
                        </div>
                    </div>
                    <div class="index-nav-box">
                        <div class="index-nav-header">发展党员</div>
                        <div class="index-nav-list">
                            <router-link to="/applicantManage" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-apply"></i>
                                <div>申请人管理</div>
                            </router-link>
                            <router-link to="/recruitMembers" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-dev"></i>
                                <div>发展党员</div>
                            </router-link>
                            <router-link to="/recruitExamine" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-devverify"></i>
                                <div>发展党员审核</div>
                            </router-link>
                        </div>
                    </div>
                    <div class="index-nav-box">
                        <div class="index-nav-header">统计数据</div>
                        <div class="index-nav-list">
                            <router-link to="/baseSituation" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-info"></i>
                                党建情况
                            </router-link>
                            <router-link to="/countForm/covers/form-5?id=68" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-count"></i>
                                统计报表
                            </router-link>
                            <router-link to="/custom/0" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-design"></i>
                                设计报表
                            </router-link>
                        </div>
                    </div>
                    <div class="index-nav-box">
                        <div class="index-nav-header">系统设置</div>
                        <div class="index-nav-list">
                            <router-link to="/adminconfig" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-manage"></i>
                                管理员设置
                            </router-link>
                            <router-link to="/repeatMembers" class="index-nav-item">
                                <i class="index-nav-icon index-nav-icon-repeat"></i>
                                <div>重复人员查询</div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import subNav from '@/components/subNav.vue'
    import Profile from '@/components/profile.vue'
    export default {
        name: 'index',
        computed: {
        },
        watch: {

        },
        components: {
            top,
            subNav,
            Profile
        },
        methods: {

        },
        created() {
                
        },
        mounted() {             

        },
    }
</script>
<style scope>
    .index-box{
        position: absolute;
        width: 100%;
        top: 60px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        background: url('../assets/index/index_bg.png') 100% 100% no-repeat;
        background-size: cover;
    }
    /* .index-container{
        position: absolute;
        top: 30px;
        right: 20px;
        bottom: 90px;
        left: 50%;
        width: 1200px;
        margin-left: -600px;
        margin: 30px auto 0;
        padding: 0px 20px 14px;
        border: 1px solid #eaeaea;
        background-color: #fff;
        box-sizing: border-box;
        overflow: auto;
    } */
    .index-nav-header{
        height: 48px;
        line-height: 48px;
        border: 1px solid #ddd;
        background-color: #fff;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #333;
    }
    .index-nav-item{
        /* display: inline-block; */
        display: block;
        width: 100%;
        height: 150px;
        margin-top: -1px;
        font-size: 16px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #ddd;
        background-color: #fcfcfc;
        color: #333;
    }
    .index-nav-item:hover{
        color: #ed3f14;
    }
    .index-nav-icon{
        display: block;
        margin: 40px auto 8px;
        width: 36px;
        height: 36px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .index-nav-box{
        width: 224px;
        margin-right: 20px;
        float: left;
    }
    .index-nav-box:last-child{
        margin-right: 0;
    }
    .index-nav-box-2{
        width: 371px;
        margin-right: 20px;
        float: left; 
    }
    .index-nav-box-2 .index-nav-list{
        position: relative;
        left: 1px;
        width: 186px;
        margin-left: -1px;
        float: left;
    }
    .index-nav-icon-manage{
        background-image: url('../assets/index/manage.png');
    }
    .index-nav-icon-design{
        background-image: url('../assets/index/design.png');
    }
    .index-nav-icon-count{
        background-image: url('../assets/index/count.png');
    }
    .index-nav-icon-info{
        background-image: url('../assets/index/info.png');
    }
    .index-nav-icon-repeat{
        background-image: url('../assets/index/repeat.png');
    }
    .index-nav-icon-letter{
        background-image: url('../assets/index/letter.png');
    }
    .index-nav-icon-devverify{
        background-image: url('../assets/index/devverify.png');
    }
    .index-nav-icon-dev{
        background-image: url('../assets/index/dev.png');
    }
    .index-nav-icon-relation{
        background-image: url('../assets/index/relation.png');
    }
    .index-nav-icon-history{
        background-image: url('../assets/index/history.png');
    }
    .index-nav-icon-apply{
        background-image: url('../assets/index/apply.png');
    }
    .index-nav-icon-member{
        background-image: url('../assets/index/member.png');
    }
    .index-nav-icon-unit{
        background-image: url('../assets/index/unit.png');
    }
    .index-nav-icon-branch{
        background-image: url('../assets/index/branch.png');
    }
    .inline-block{
        display: inline-block;
    }
    .index-wrap{
        width: 1200px;
        margin: auto;
    }
    .index-container{
        padding-top: 20px;
    }
</style>