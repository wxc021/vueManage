<!--驳回弹窗-->
<template>
<div class="reject">
	<Modal v-model="modal1" title="驳回理由" width="950" :loading="loading" :mask-closable=false class-name="vertical-center-modal" ok-text="确定" @on-ok="handleSubmit('RejectForm')" @on-cancel="cancel">
		<Row>
			<Col span="24">
			<Form ref="RejectForm" :model="RejectForm" label-position="top" :rules="ruleValidate">
				<FormItem label="" prop="reason">
					<Input v-model="RejectForm.reason" type="textarea" :autosize="{minRows: 10,maxRows: 15}" placeholder="请填写驳回理由"></Input>
				</FormItem>
			</Form>
			</Col>
		</Row>

	</Modal>
</div>
</template>

<script>
export default {
	name: 'Reject',
	data() {
		return {
			modal1: true, //是否显示弹窗
			loading: true,
			RejectForm : {
				reason: '',
			},
			ruleValidate: {
				reason: [{
						required: true,
						message: '请输入驳回理由',
						trigger: 'blur'
					},
					{
						type: 'string',
						min: 20,
						message: '驳回理由不能少于20字',
						trigger: 'blur'
					}
				]
			},
		}
	},
	components: {},
	methods: {
		//提交表单验证
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					//this.$Message.success('提交成功!');
					//this.modal1=false;
					let that = this;
						that.axios({
							url: '/v1/relation/review',
							method: 'get',
							params: {
								id: that.$route.params.id,
								review : 2,
								reason : that.RejectForm.reason,
							},
						})
						.then(res => {
							let needData = res.data;
							if (needData.code == 200) {
								that.$Message.success('提交成功!');
								setTimeout(() => {
									this.$router.push({
										name: 'organization',
									});
								},200)
							} else {
								that.$Message.error(needData.msg);
								setTimeout(() => {
									that.loading = false;
									that.$nextTick(() => {
										that.loading = true;
									});
								}, 1000);
							}
						})
						.catch(err => {
							this.Message.error('网络请求异常');
						})
					
				} else {
					this.loading = false;
					this.$Message.error('表单验证失败!');
					setTimeout(() => {
						this.loading = true;
					}, 20);
				}
			})
		},
		cancel() {
			setTimeout(() => {
				this.$router.push({
					name: 'organization',
				});
			},200)
		},
	}
}
</script>

<style>

</style>
