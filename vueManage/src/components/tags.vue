<template>
    <div class="check-status">
        <Select v-model="model3" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model3" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button type="ghost" :style="{'background':'#fff'}">批量修改</Button>
        <Select v-model="model3" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button type="ghost" :style="{'background':'#fff'}">信息校验</Button>
        <Select v-model="model3" style="width:100px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Checkbox v-model="isHistory">显示历史党支部 </Checkbox>
    </div>
</template>
<script>
	export default {
		name: 'tags',
		data() {
			return {
                cityList: [
                    {
                        value: 'beijing',
                        label: '党组织维护'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }
                ],
                model3: 'beijing',
                isHistory: true
			}
		},
		props: ['tags'],
		watch: {
            tags(value) {
            	this.newTags = value;
            }
		},
		methods: {
		},
		created() {
			
		},
		mounted() { 
	    },
	}
</script>
<style scoped>
	body,html,#app {
		width: 100%;
		height: 100%;
	}

	.layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        /* margin: 15px; */
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
</style>