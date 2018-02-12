<template>
<div class="box-flex start-box box-orient">
    <div class="info-detail box-flex">
        <Row>
            <Col span="20" offset="1" v-show="current==1">
            <Steps :current="current" direction="vertical" style="width: 195px;">
                <Step title="发起转接" :content="step1Content"></Step>
            </Steps>
            </Col>
            <Col span="20" offset="1" v-show="current==2">
            <Steps :current="current" direction="vertical" style="width: 195px;">
                <Step title="发起转接" :content="step1Content"></Step>
                <Step :title="stepTitle" :content="step2Content"></Step>
            </Steps>
            </Col>
        </Row>
    </div>
</div>
</template>

<script>
export default {
    name: 'processForm',
    data() {
        return {
            isDisable: true,
            process: {
                status: '',
                createdt: '',
                updatedt: '',
                createby: '',
                updateby: '',
            },
        }
    },
    computed: {
        current() {
            let num = this.process.status == 0 ? 1 : 2;
            return num;
        },
        stepTitle() {
            switch (this.process.status) {
                case 1:
                    return '同意接受'
                    break;
                case 2:
                    return '驳回'
                    break;
                case 3:
                    return '撤销'
                    break;
            }
        },
        step1Content() {
            let str = '发起时间:' + this.process.createdt + '操作人:' + this.process.createby;
            return str
        },
        step2Content() {
            let str = '操作时间:' + this.process.updatedt + '操作人:' + this.process.updateby;
            return str
        },
    },
    watch: {
        '$route' (to, from) {
            this.getprocess(this.$route.params['id'], 1);
        },
    },
    methods: {
        getprocess(id, type) {
            let that = this;
            this.axios({
                    method: 'get',
                    url: '/v1/relation/progress',
                    params: {
                        id: id ? id : 0,
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.process = Object.assign({}, needData.data.progress);
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
        let that = this;
        this.$store.commit('setEdit', {
            isDisable: this.isDisable
        });
        this.getprocess(this.$route.params['id'], 1);
    },
}
</script>

<style scoped>
.box-info {
    line-height: 40px;
    padding-left: 20px;
    color: #333;
    font-size: 12px;
}
</style>
