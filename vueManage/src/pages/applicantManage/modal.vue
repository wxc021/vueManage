<template>
    <div v-if="isshow" class="mask">
        <div class="modal">
            <div class="modal-header">
                <span class="title">{{title}}</span>
                <Button @click="close" :style="{'float': 'right', 'font-size' : '16px', 'height': '100%'}" type="text"><Icon type="close"></Icon></Button>
            </div>
            <div class="modal-body">
                <router-view name="modal"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'modal',
        props: {
            title : {
                type: String,
                default: '信息'
            },
            show : {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                isshow : this.show,
                modalTitle : this.title
            }
        },
        watch : {
            show(newVal, oldVal) {
                this.isshow = newVal
            }
        },
        methods: {
            close(){
                this.isshow = false
                this.$parent.$emit('toggleModal', this.isshow)
                //this.$router.push('/dangyuan')
            }
        }
    }
</script>
<style scope>
.mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    z-index: 99;
}
.modal{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 950px;
    max-height: 90%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    overflow: auto;
    z-index: 100;
}
.modal .title{
    padding-left: 16px;
    font-size: 16px;
}
.modal-header{
    line-height: 49px;
    height: 49px;
    border-bottom: 1px solid #dddddd;
    background-color: #f8f8f8;
}
.modal-body{
    /* position: absolute;
    top: 50px;
    bottom: 0;
    overflow: hidden; */
}
</style>