<template>
	<Row type="flex">
		<i-col span="5" class="layout-menu-left start-box pack-center" style="">
			<router-link :to="{name : 'mainIndex'}" style="display: block;width:100%;">
			<div class="layout-header start-box box-align" :style="{'width':'100%', 'background-color': '#de3018', 'paddingLeft': '15px'}">
				<div class="start-box">
					<div class="bg"></div>
					<p style="font-size: 20px;">天津市党内统计信息系统</p>
				</div>
			</div>
			</router-link>
		</i-col>
		<i-col span="19">
			
			<div class="top-bar start-box">

				<!-- 一级导航 -->
				<div class="nav-manage start-box box-align box-flex">
					
					<div v-for="(item, index) in navData" :key="item.default" :class="{'drown-outer-active': item.active}" class="drown-outer start-box box-align box-pack">
						<Dropdown  trigger="hover" class="start-box box-align box-pack" style="color:#fff;margin: 0 20px;height: 100%;"  @on-click="routeTo">
					        <a href="javascript:void(0)" style="font-size: 16px;color: #fff;">
					            {{item.default}}
					            <Icon type="arrow-down-b"></Icon>
					        </a>
					        <Dropdown-menu slot="list" class="nav-item">
					            <Dropdown-item v-for="it in item.list" :key="it.value" :name="it.value" :class="{'drop-active': it.active}">{{it.name}}</Dropdown-item>
					        </Dropdown-menu>
					    </Dropdown>	
					</div>				    
				</div>
				<a class="feedback" href="http://10.99.153.22:8080/ " target="_blank"><Icon type="compose"></Icon>问题建议反馈</a>
				<!-- 用户信息 -->
				<Profile></Profile>
			</div>
		</i-col>
	</Row>
</template>
<script>
	import Profile from './profile.vue'
	export default {
		name: 'top',
		data() {
			return {
				userInfo:{
				},
				lists: [],
				current: {},
				modal1: false,
				modal2: false,
        		loading: true,
        		OrganizationeForm: {
		          orignpwd: "",
		          pwd: "",
		          newpwd: "",
		        },
		        ruleValidate: {
		          orignpwd: [
		            {required: true, message: '原始密码不能为空', trigger: 'blur'}
		          ],
		          pwd: [
		            {required: true, message: '新密码不能为空', trigger: 'blur'}
		          ], 
		          newpwd: [
		            {required: true, message: '确定新密码不能为空', trigger: 'blur'}
		          ], 
		        },
		        OrganizationeForm2: {
		          radio: "",
		        },
		        ruleValidate2: {
		        },
		        navData: [
		        	{class: 'drown-outer-active', default: '组织管理', active: true, list: [{name: '党组织管理', value: '/orgManage/0', active: true},{name: '单位管理', value: '/unitManage', active: false}]},
		        	{class: 'drown-outer-active', default: '党员管理', active: false, list: [{name: '党员管理', value: '/dangyuan', active: false},{name: '历史人员管理', value: '/historyManage', active: false},{name: '转接组织关系', value: '/organizationManage', active: false},{name: '介绍信管理', value: '/interview', active: false}]},
		        	{class: 'drown-outer-active', default: '发展党员', active: false, list: [{name: '申请人管理', value: '/applicantManage', active: false},{name: '发展党员', value: '/recruitMembers', active: false},{name: '发展党员审核', value: '/recruitExamine', active: false}]},
		        	{class: 'drown-outer-active', default: '统计数据', active: false, list: [{name: '党建情况', value: '/baseSituation', active: false},{name: '统计报表', value: '/countForm/covers/form-5?id=', active: false},{name: '报表设计', value: '/custom/0', active: false} ]},
		        	{class: 'drown-outer-active', default: '系统设置', active: false, list: [{name: '管理员设置', value: '/adminconfig', active: false},{name: '重复人员查询', value: '/repeatMembers', active: false}]}
		        ]
			}
		},
		computed: {
			link() {
				return this.$store.state.remberId;
			}
		},
		components: {
			Profile
		},
		methods: {
			routeTo(path) {
				if (path == '') {
					return;
				};
				console.log(path)
				if (/form/.test(path)) {
					this.$router.push({path: path+this.link})
				} else {
					this.$router.push({path: path})
				}
				
			},
			
			setNav(it) {
				this.navData.forEach(item => {
					item.active = false;
				})
				this.navData[it.value].active = true;
				for (let i = 0; i < this.navData.length; i++) {
					this.navData[i].list.forEach(ii => {
						ii.active = false;
					})
				}
				this.navData[it.value].list.forEach(jj => {
					if (new RegExp(it.test).test(jj.value)) {
						jj.active = true;
					};
				})
			}
		},
		created() {

		},
		mounted() {
			let newObj = {
				'orgManage': {test: 'orgManage', value: 0, name: '党组织管理'},
				'unitManage': {test: 'unitManage', value: 0, name: '单位管理'},
				'dangyuan': {test: 'dangyuan', value: 1, name: '党员管理'},
				'memberCheck': {test: 'dangyuan', value: 1, name: '党员管理'},
				'applicant': {test: 'applicant', value: 2, name: '申请人管理'},
				'historyManage': {test: 'historyManage', value: 1, name: '历史人员管理'},
				'organizationManage': {test: 'organizationManage', value: 1, name: '转接组织关系'},
				'recruitMembers': {test: 'recruitMembers', value: 2, name: '发展党员'},
                'recruitExamine': {test: 'recruitExamine', value: 2, name: '发展党员审核'},
				'interview': {test: 'interview', value: 1, name: '介绍信管理'},
				'repeatMembers': {test: 'repeatMembers', value: 4, name: '重复人员查询'},
				'baseSituation': {test: 'baseSituation', value: 3, name: '党建情况'},
				'form': {test: 'form', value: 3, name: '统计报表'},
				'custom': {test: 'custom', value: 3, name: '报表设计'},
				'adminconfig': {test: 'adminconfig', value: 4, name: '管理员设置'},
			}
			for(let item in newObj) {
				if (new RegExp(item, 'i').test(this.$route.name)) {
					this.setNav(newObj[item])
				};
			}
	    },
	}
</script>
<style>
	.info-tips .ivu-select-dropdown {
		padding: 0px;
	}
	.text-right{
		text-align: right;
	}
	.layout-header{
		overflow: hidden;
		text-align: center;
	}
	.layout-header a{
		display:inline-block;
		margin-top: 10px;
	}
	.layout-header-fav{
		font-size: 0;
		margin-top: 15px;
		padding-right: 20px;
	}

	
	.layout-header-fav img{
		display: inline-block;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin-right: 20px;
		vertical-align: middle;
	}
	.layout-header-fav p{
		display: inline-block;
		font-size: 14px;
		vertical-align: middle;
	}
	.layout-header-fav a{
		font-size: 14px;
		color: #4b4b4b;
		display: inline-block;
		margin-left: 15px;
		vertical-align: middle;
	}
</style>