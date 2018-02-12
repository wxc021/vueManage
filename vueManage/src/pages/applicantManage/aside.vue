<template>
    <transition name="slide">
        <div  v-if="isshow" class="aside">
            <div class="aside-header">
                <span class="title">{{title}}</span>
                <Button @click="close" :style="{'float': 'right', 'font-size' : '16px', 'height': '100%'}" type="text"><Icon type="close"></Icon></Button>
            </div>
            <div class="aside-body">
                <component  ref="asidebody" :is="currentView" :viewdata="currentViewData"></component>
            </div>
        </div>
    </transition>
</template>
<script>
    import memberInfo from '@/components/applicantManage/memberinfo.vue'

    export default {
        name: 'right-aside',
        props: {
            title : {
                type: String,
                default: '信息'
            },
            show : {
                type: Boolean,
                default: false
            },
            viewname : {
                type: String,
                default: ''
            },
            viewdata : null
        },
        data(){
            return {
                isshow : this.show,
                asideTitle : this.title,
                currentView : this.viewname,
                currentViewData : this.viewdata
            }
        },
        components: {
            memberInfo : memberInfo
        },
        watch: {
            show(newVal, oldVal){
                this.isshow = newVal
            },
            viewname(newVal, oldVal){
                this.currentView = newVal
            },
            viewdata(newVal, oldVal){
                this.currentViewData = newVal
            }
        },
        methods: {
            close(){
               
                if (/checkForm/.test(this.$route.matched[0])) {
                    this.$router.go(-1);
                } else {
                    this.$router.push({ 
                        name: this.$route.matched[0].name,
                        params: {
                            dept: this.$route.params.dept
                        },
                        query : this.$route.query
                    }) 
                }
            }
        }
    }
</script>
<style scoped>
.aside{
    position: absolute;
    width: 800px;
    right: 0;
    top: 60px;
    bottom: 0;
    background-color: #fff;
    box-shadow: -4px 0 4px rgba(0,0,0,0.2);
    z-index: 100;
}
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
.aside-body{
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
}
.slide-enter-active {
    transition: right 0.5s;
}
.slide-leave-active {
    transition: right 0.5s;
}
.slide-enter, .slide-leave-to {
    right: -600px;
}
</style>