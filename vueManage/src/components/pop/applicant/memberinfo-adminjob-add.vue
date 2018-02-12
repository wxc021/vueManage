<!--学历新增弹窗-->
<template>
<div class="memberinfo-education">
	<Modal v-model="modal1" title="新增行政职务" width="950" :loading="loading" :mask-closable="false" @on-ok="handleSubmit('memberinfo')" @on-cancel="cancel">
		<Form ref="memberinfo" :model="memberinfo" :label-width="150" :rules="ruleValidate">
			<Row>
				<Col span="12">
				<FormItem label="任职机构/单位:" style="width: 100%;" prop="full_name">
					<!-- <Select v-model="memberinfo.full_name" placeholder="请选择" style="width: 61%;">
                      <Option v-for="(item,index) in full_name_list" :disabled="item.choosed==0" :key="item.id" :value="item.id">{{item.name}}</Option>
                    </Select> -->
					<Input v-model="memberinfo.full_name" placeholder="请选择" @click.native="popTree"></Input>
				</FormItem>
				<FormItem label="职务名称" style="width: 100%;" prop="duty_id">
					<!-- <select name="duty_id" id="duty_id" v-model="memberinfo.duty_id">
                        <template v-for="(item,index) in duty_id_list">
                          <optgroup :key="item.id" v-if="item.choosed == 0" :label="item.name"></optgroup>
                          <option :key="item.id" v-if="item.choosed == 1" :value="item.id" :checked="item.id == memberinfo.duty_id">{{item.name}}</option>
						</template>
                    </select> -->
					<Cascader :render-format="renders" :transfer=true :data="duty_id_list" v-model="memberinfo.duty_id"></Cascader>
					
                </FormItem>
                <FormItem label="职务级别" style="width: 100%;" prop="duty_level">
                    <!-- <Select v-model="memberinfo.duty_level" placeholder="请选择" style="width: 61%;">
                      <Option v-for="(item,index) in duty_level_list" :disabled="item.choosed==0" :key="item.id" :value="item.id">{{item.name}}</Option>
                    </Select> -->
					<Cascader :render-format="renders" :transfer=true :data="duty_level_list" v-model="memberinfo.duty_level"></Cascader>

                </FormItem>
                <FormItem label="职务说明" style="width: 100%;" prop="duty_desc">
                    <Input v-model="memberinfo.duty_desc" type="textarea" :rows="3" placeholder="请输入..."></Input>
                </FormItem>
                 <FormItem label="批准任职日期" prop="start_time">
                    <DatePicker type="date"  v-model="memberinfo.start_time" placeholder="选择日期" style=""></DatePicker>
                </FormItem>
            </Col>
        </Row>
      </Form>
    </Modal>
    <infoTree v-if="treeShow" @setConfirm="setConfirm" @setCancer="setCancer" :params='params' :setid="setid"></infoTree>
  </div>
</template>
<script>
import duty from '@/lib/duty.js'
import infoTree from '@/components/pop/baseInfoTypeTree.vue'
export default {
	name: 'memberinfo_education',
	data() {
		return {
			modal1: true, //是否显示弹窗
			loading: true,
			treeShow: false,
			setid: '', //编辑的时候传入的id
			memberinfo: {
				org_id: "",
				full_name: "",
				duty_level: [],
				start_time: '',
				duty_desc: "",
				duty_id: [],
			},
			params: {
				org_id: this.$route.params.dept ? "" : ''
			},
			url: '/v1/administration/add',
			uid: this.$route.params.uid,
			full_name_list: [],
			duty_id_list: [],
			duty_level_list: [],
			ruleValidate: {
				full_name: [{
					required: true,
					message: '任职机构不能为空',
					trigger: 'change'
				}],
				duty_id: [{
					required: true,
					message: '职务名称不能为空',
					trigger: 'change',
					type:'array'
				}],
				// duty_level: [{
				// 	required: true,
				// 	message: '职务级别不能为空',
				// 	trigger: 'change',
				// 	type:'array'
				// }],
				// duty_desc: [{
				// 	required: true,
				// 	message: '职务说明不能为空',
				// 	trigger: 'blur'
				// }],
				start_time: [{
					required: true,
					message: '日期不能为空',
					trigger: 'change',
					type: 'date'
				}],
			},
			filters: {
				dateFormat(value) {
					if (value == '') {
						return value
					}
					var date = new Date(+value),
						Y = date.getFullYear(),
						m = date.getMonth() + 1,
						d = date.getDate(),
						H = date.getHours(),
						i = date.getMinutes(),
						s = date.getSeconds();
					if (m < 10) {
						m = '0' + m;
					}
					if (d < 10) {
						d = '0' + d;
					}
					if (H < 10) {
						H = '0' + H;
					}
					if (i < 10) {
						i = '0' + i;
					}
					if (s < 10) {
						s = '0' + s;
					}
					var t = Y + '-' + m + '-' + d;
					return t;
				}
			},
		}
	},
	components: {
		infoTree
	},
	methods: {
		getLastValue(arr) {
			let _arr = '';
			let index = arr.length;
			if (index == 0) {
				return ""
			} else {
				_arr = arr[index-1];
				return _arr;
			}
		},
		getArray (obj){
			return obj.map(function(item){return item.id});
		},
		handleSubmit(name) {
			let that = this;
			this.$refs[name].validate((valid) => {
				if (valid) {
					let qs = require('qs');
					let _data = {};
					_data['uid'] = that.uid;
					if (that.$route.params.item) {
						_data['id'] = that.$route.params.item.id;
					}
					for (let item in that.memberinfo) {
						if (item.indexOf('time') >= 0) {
							_data[item] = that.filters.dateFormat(that.memberinfo[item]);
						} else {
							_data[item] = that.memberinfo[item];
						}
					}
					_data.duty_level = that.getLastValue(_data.duty_level);
					_data.duty_id = that.getLastValue(_data.duty_id);
					that.axios({
							method: 'post',
							url: that.url,
							data: qs.stringify(_data)
						})
						.then(res => {
							let needData = res.data;
							if (needData.code == 200) {
								setTimeout(() => {
									that.$Message.success('提交成功!');
									that.modal1 = false;
									this.$router.back();
									that.$emit('add');
								}, 200)
							} else {
								that.$Message.error(needData.msg);
							}
						})
						.catch(err => {
							this.$Message.error('网络请求异常');
						});

				} else {
					this.loading = false;
					this.$Message.error('表单验证失败!');
					setTimeout(() => {
						this.loading = true;
					}, 20);
				}
			})
		},
		getList(type, arr) {
			let that = this;
			let qs = require('qs');
			if (that[arr].length > 1) {
				return
			}
			that.axios({
					method: 'get',
					url: 'v1/dictionary/get-list-by-type',
					params: {
						type: type
					},
				})
				.then(res => {
					let needData = res.data;
					if (needData.code == 200) {
						setTimeout(() => {
							that[arr] = needData.data;
						}, 200)
					} else {
						that.$Message.error(needData.msg);
					}
				})
				.catch(err => {
					this.$Message.error('网络请求异常');
				});
		},
		getDetail() {
			let that = this;
			that.axios({
					url: '/v1/administration/detail',
					method: 'get',
					params: {
						uid: that.$route.params.uid,
						id: that.$route.params.item.id
					}
				})
				.then(res => {
					let needData = res.data;
					if (needData.code == 200) {
						//that.memberinfo = needData.data;
						needData.data.start_time = new Date(needData.data.start_time);
						needData.data.duty_level = that.getArray(needData.data.duty_level_array);
						needData.data.duty_id = that.getArray(needData.data.duty_id_array);
						that.memberinfo = Object.assign({},needData.data);
					} else {
						that.Message.error(needData.msg);
					}
				})
				.catch(err => {
					this.Message.error('网络请求异常');
				})
		},
		popTree() {
			this.treeShow = true;
		},
		setConfirm(item) {
			this.treeShow = false;
			this.memberinfo.org_id = item.data.nid;
			this.memberinfo.full_name = item.data.name;
		},
		setCancer() {
			this.treeShow = false;
		},
		cancel() {
			this.$router.back();
		}
	},
	mounted() {
		this.getList('A02015A', 'duty_id_list');
		this.getList('A02021', 'duty_level_list');
		if (this.$route.params.item) {
			this.url = '/v1/administration/edit';
			this.getDetail();
		}
	}

}
</script>
<style scoped>
#duty_id {
	display: block;
	height: 30px;
	line-height: 30px;
	font-size: 12px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding-left: 8px;
	padding-right: 59px;
	outline: #e96156;
}
</style>

