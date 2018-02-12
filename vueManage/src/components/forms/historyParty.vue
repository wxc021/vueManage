<!--历史党支部form-->
<template>
    <div class="box-flex start-box box-orient">
        <div class="info-detail box-flex">
          <Row>
            <Col span="18" style="margin-top: 20px;">
              <Form :model="historyForm" :label-width="80" ref="historyForm" :rules="ruleValidate">
                <FormItem label="撤销日期:" prop="delDate">
                  <DatePicker style="width: 100%;"  :disabled="isDisable" type="date" placeholder="选择撤销日期" v-model="historyForm.delDate"></DatePicker>
                </FormItem>
              </Form>
              </Col>
          </Row>
        </div>
        <div class="info-footer start-box box-align">
            <div class="box-flex"></div>
            <Button type="ghost" style="margin-right: 15px;"  @click="handleReset('historyForm')">取消</Button>
            <Button v-show="isDisable" type="primary" @click="editBtn">编辑</Button>
            <Button v-show="!isDisable" type="error"  @click="handleSubmit('historyForm')">保存</Button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'historyParty',
        data() {
          return {
              isDisable:true,
              historyForm: {
                delDate:''
              },
              ruleValidate: {
                delDate:[
                  {required: true,type: 'date', message: '撤销日期为空', trigger: 'change'},
                ],
              },
              datas: this.infodata,
          }
        },
        props: ['infodata', 'controlSave'],
        components: {
        },
        watch: {
            '$route' (to, from) {
                if (/copy/.test(to.path)) {
                    this.initF();
                } else if(/info/.test(to.path)) {
                    this.initF();
                }
            },
        },
        methods: {
            editBtn: function () {
              this.isDisable=!this.isDisable;
              this.$store.commit('setEdit', {isDisable: this.isDisable});
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        this.isDisable=!this.isDisable;
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                // this.$refs[name].resetFields();
                // this.$router.go(-1)
                //this.getInfo(this.$route.params['id'], 1);
                this.isDisable = true;
                this.$store.commit('setEdit', {isDisable: this.isDisable});
            },
        },
        created() {

        },
        mounted() {
          let that = this;
          this.$store.commit('setEdit', {isDisable: false});
          let qs = require('qs');
        },
    }
</script>
<style scope>

</style>
