<template>
	<Modal
        title="导出excel"
        v-model="modal"
        width="950"
        :loading="loading"
        :mask-closable="false"
        :closable="true"
        class-name="max-height vertical-center-modal"
        @on-ok="confirm"
        @on-cancel="cancel">
        <div class="export-inner">
        	<Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全部信息项</Checkbox>
			<div class="export-item" style="margin-top: 20px;" v-for="(item, index) in final" :key="item.vlaue">
				<p style="font-size:14px;font-weight:bold;margin-bottom:10px;">{{item.title}}</p>
	        	<CheckboxGroup v-model="socialArr[index]" style="margin: 5px;" @on-change="checkAllGroupChange(socialArr[index], index)">
			        <Checkbox style="margin: 5px;" :label="inner.key" v-for="inner in item.value" :key="inner.key">
			            <span>{{inner.value}}</span>
			        </Checkbox>
			    </CheckboxGroup>
			</div>
        </div>
    </Modal>
</template>
<script>
	import exportdata from '@/lib/exportdata'
	export default {
		name: 'export',
		data() {
			return {
				indeterminate: false,
				checkAll: false,
				loading: true,
				social: [],
				watch: null,
				final: [],
				socialArr: new Array(this.countnumber).fill([])
			}
		},
		props:['isShow','postData','urls','countnumber'],
		computed: {
			modal: {
				get() {
					return this.isShow;
				},
				set(value) {
					this.init();
					this.show = value;
				}
			},
		},
		methods: {
			init() {
				this.checkAll = false;
				this.socialArr = new Array(this.countnumber).fill([]);
			},
			check(data) {
				for (let i = 0; i < data.length; i++) {
					if (data[i].length != this.final[i].value.length) {
						return false;
					};
				};
				return true;
			},
			checkAllGroupChange(data, index) {
				if (data.length < this.final[index].value.length) {
					this.indeterminate = false;
                    this.checkAll = false;
				} else {
					if( !this.check(this.socialArr) ) {
						this.indeterminate = false;
                    	this.checkAll = false;
					} else {
						this.indeterminate = false;
                    	this.checkAll = true;
					}
				}
			},
			handleCheckAll() {
				this.indeterminate && (this.checkAll = false);
				!this.indeterminate && (this.checkAll = !this.checkAll);
				this.indeterminate = false;
				if (this.checkAll) {
                    let temp = [];
					this.getValue(this.postData).forEach(item => {
						temp.push(this.getKey(item.data))
					})
					this.socialArr.forEach((item, index) => {
						this.socialArr[index] = Object.assign([], temp[index]);
					})
                } else {
                    this.socialArr = new Array(this.countnumber).fill([]);
                }
			},
			confirm() {
				let newArr = [];
				this.socialArr.forEach((item, index) => {
					newArr.push({key:this.getKey(this.postData)[index],value: item})
				})

				let ids = this.$route.params.ids ? this.$route.params.ids : this.$store.state.remberId;
				let all = this.checkAll ? 1 : 0;
				let isGroup = (this.$store.state.remberNode && this.$store.state.remberNode.type_icon === '6') ? 1 : '';
				window.open(this.urls+'?dept_id=' + ids+'&group='+isGroup+'&all='+all+'&json_post='+JSON.stringify(newArr));
				
				setTimeout(() => {
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
                    });
                }, 1000);
			},
			cancel() {
				this.$Modal.remove()
			},
			getKey(data) {
				if (Object.prototype.toString.call(data) === '[object Object]') {
					return Object.keys(data);
				}
			},
			getValue(data) {
				if (Object.prototype.toString.call(data) === '[object Object]') {
					return Object.values(data);
				}
			},
		},
		mounted() {
			if (this.watch) {
				this.watch();
				this.watch = null;
			};
			this.watch = this.$watch('postData', (a, b) => {
				new exportdata(a, this, 'final').initData();
			},{deep: true})
		},
		created() {

		}
	}
	
</script>
<style>
	
</style>