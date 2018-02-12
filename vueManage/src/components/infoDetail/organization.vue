<template>
<div class="info-content start-box box-orient" @click="stopP">
	<div class="aside-header">
        <span class="title">{{real_name}}</span>
        <Button  @click="closeInfo" :style="{'float': 'right', 'font-size' : '16px', 'height': '100%'}" type="text"><Icon type="close"></Icon></Button>
    </div>
	<Switchs :switchs="switchs" @changSwitch="changSwitch"></Switchs>
	<orgForm @name1='showName'  v-if="switchOpen == 0" :direction='direction'></orgForm>
	<processForm v-if="switchOpen == 1"></processForm>
	<router-view></router-view>
</div>
</template>

<script>
import Switchs from '@/components/switchs.vue'
import orgForm from '@/components/forms/org/orgForm.vue'
import ContactInfo from '@/components/forms/contactInfo.vue'
import processForm from '@/components/forms/org/processForm.vue'
export default {
	name: 'info',
	data() {
		return {
			switchOpen: this.$route.params.switchs ? this.$route.params.switchs : 0,
			buttonType: 'ghost',
			switchs: [{
					name: '基本信息',
					active: true,
					route: 'orgForm',
					show: true
				},
				{
					name: '转接流程',
					active: false,
					route: 'processForm',
					show: true
				},
			],
			direction : '',
			real_name:'',
		}
	},
	computed: {
//        getParamsRow(){
//            return this.$route.params
//        }

    },
	watch: {
		'$route'(to,form){
			let name = to.name;
			if(/organization/.test(name)){
				this.direction = to.params.direction
			}
		}

	},
	components: {
		orgForm,
		Switchs,
		processForm,

	},
	methods: {
		showName(str){
			this.real_name = str;
		},
		stopP() {
			//event.stopPropagation();
		},
		switchButton() {
			this.buttonType = 'error'
		},
		closeInfo() {
			this.$router.push({
				name : 'organizationManageList'
			});
		},
		// events up tableswitch change
		changSwitch(data) {
			if (!this.$store.state.isEdit) {
				alert('编辑模式下请完成编辑');
				return;
			};
			let that = this;
			if (!this.switchs[data.index].active) {
				for (let i = 0; i < this.switchs.length; i++) {
					this.switchs[i].active = false;
				};
				that.switchs[data.index].active = true;
			};
			that.switchOpen = data.index;
		},
	},
	created() {

	},
	mounted() {
		this.direction = this.$route.params.direction;
		if (this.$route.params.switchs) {
			this.switchs.forEach(item => item.active = false)
			this.switchs[this.$route.params.switchs].active = true;
		};
		
	},
}
</script>

<style scoped>
.aside-header{
    line-height: 49px;
    height: 49px;
    border-bottom: 1px solid #dddddd;
    background-color: #f8f8f8;
	font-size: 16px;
	padding-left: 10px;
}
</style>
