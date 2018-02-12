<template>
<div class="memberinfo-base start-box box-orient">
    <div class="memberinfo-form box-flex">
        <Form :label-width="120">
            <Row>
                <Col span="6">
                    <img src="" alt="" class="memberinfo-avatar">
                </Col>
                <Col span="18">
                    <FormItem label="姓名" :label-width="60">
                        <Input></Input>
                    </FormItem>
                    <Row>
                        <Col span="12">
                            <FormItem label="简拼" :label-width="60">
                                <Input></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="性别" :label-width="60">
                                <Select>
                                    <Option :value="0">男</Option>
                                    <Option :value="1">女</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="民族" :label-width="60">
                        <Select>
                            <Option :value="0">男</Option>
                            <Option :value="1">女</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="籍贯">
                <Select>
                    <Option :value="0">男</Option>
                    <Option :value="1">女</Option>
                </Select>
            </FormItem>
            <FormItem label="出生日期">
                <DatePicker type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
            </FormItem>
            <FormItem label="居民身份证号">
                <Input placeholder="请输入身份证号"></Input>
            </FormItem>
            <FormItem label="组织关系所在党支部">
                <Select>
                    <Option :value="0">男</Option>
                    <Option :value="1">女</Option>
                </Select>
            </FormItem>
            <FormItem label="人事关系所在单位(部门)">
                <Input></Input>
            </FormItem>
            <FormItem label="参加工作日期">
                <DatePicker type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
            </FormItem>
            <FormItem label="专业技术资格">
                <Select>
                    <Option :value="0">男</Option>
                    <Option :value="1">女</Option>
                </Select>
            </FormItem>
            <FormItem label="专职技术职务">
                <Select>
                    <Option :value="0">男</Option>
                    <Option :value="1">女</Option>
                </Select>
            </FormItem>
            <FormItem label="其他党团">
                <Select>
                    <Option :value="0">男</Option>
                    <Option :value="1">女</Option>
                </Select>
            </FormItem>
            <FormItem label="加入其他党团日期">
                <DatePicker type="date" placeholder="选择日期" style="width: 100%"></DatePicker>
            </FormItem>
            <FormItem label="手机号码">
                <Input></Input>
            </FormItem>
            <FormItem label="住宅电话">
                <Input></Input>
            </FormItem>
            <FormItem label="家庭住址">
                <Input></Input>
            </FormItem>
            <FormItem label="户口所在派出所">
                <Select>
                    <Option :value="0">男</Option>
                    <Option :value="1">女</Option>
                    <Option :value="3">女</Option>
                    <Option :value="5">女</Option>
                    <Option :value="6">女</Option>
                    <Option :value="f">女</Option>
                </Select>
            </FormItem>
        </Form>
    </div>
    <div class="aside-bottom">
        <Button type="ghost">取消</Button>
        <Button type="primary">保存</Button>
    </div>
</div>
</template>
<script>
export default {
    name : 'memberinfo-base',
    props: {
        viewdata : null
    },
    data(){
        return {
            formModel : {

            }
        }
    }
}
</script>
<style scoped>
.memberinfo-base{
    height: 100%;
}
.memberinfo-base form{
    padding: 0 8px;
}
.memberinfo-form{
    padding-top: 20px;
    padding-bottom: 50px;
}
.memberinfo-avatar{
    display: block;
    margin: auto;
    width: 85px;
    height: 120px;
    vertical-align: middle;
}
.aside-bottom{
    /*position: absolute;*/
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ddd;
    padding: 8px;
    text-align: right;
    background-color: #f8f8f8;
}
</style>