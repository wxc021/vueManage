<template>
    <div class="memberinfo-training" style="padding-top:20px;">
        <Form ref="trainingForm" :model="trainingForm" :label-width="150" :rules="ruleValidate">
            <Row>
                <Col span="12">
                <FormItem label="申请人入党日期：" prop="date">
                    <DatePicker type="date" v-model="trainingForm.date" placeholder="选择日期" style=""></DatePicker>
                </FormItem>
                <FormItem label="列为积极分子日期：" prop="date">
                    <DatePicker type="date" v-model="trainingForm.date" placeholder="选择日期" style=""></DatePicker>
                </FormItem>
                <FormItem label="参加培训日期：" prop="date">
                    <DatePicker type="date" v-model="trainingForm.date" placeholder="选择日期" style=""></DatePicker>
                </FormItem>
                <FormItem label="列为发展对象日期：" prop="date">
                    <DatePicker type="date" v-model="trainingForm.date" placeholder="选择日期" style=""></DatePicker>
                </FormItem>
                </Col>
            </Row>
        </Form>
        <div style="text-align:right;">
            <Button type="ghost" @click='cancel' style="margin-right:10px;">取消</Button>
            <Button type="primary" @click='submit'>修改</Button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'memberinfo-training',
    props: {
        viewdata: null
    },
    methods: {
        submit() {

        },
        cancel() {
            this.$route.go(-1);
        },
    },
    data() {
        return {
            olddata: {},
            trainingForm: {
                date: '',
            },
            ruleValidate: {
                date: [
                    { required: true, message: '死亡日期不能为空', trigger: 'change', type: 'date' }
                ],
                decrease_type: [
                    { required: true, message: '死亡类型不能为空', trigger: 'change' }
                ],
            },
        }
    },
}
</script>
<style scoped>
.memberinfo-rewardinfo {
    height: 100%;
    padding: 8px;
}
</style>