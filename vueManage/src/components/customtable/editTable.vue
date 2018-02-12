<!--班子成员新增的弹窗-->
<template>
    <div class="editTable">
        <Modal
                v-model="modal1"
                title="添加信息"
                width="950"
                :mask-closable=false
                class-name="vertical-center-modal"
                @on-ok="ok"
                @on-cancel="cancel">
            <Row :gutter="16">
                <Form :model="memberFormItem" label-position="top"  ref="memberFormItem">
                    <Col span="12"  v-for="(itemData,index) in getRowData.cols" :key="index">
                        <FormItem  :label="itemData.rows">
                            <Input v-model="itemData.value" placeholder="请输入"></Input>
                        </FormItem>
                    </Col>
                </Form>
            </Row>
        </Modal>
    </div>
</template>
<script>
    export default {
        name:'editTable',
        data () {
            return {
                modal1: true,//是否显示弹窗
                memberFormItem:{
                    name:''
                },
                cacheData:{},
                //rows:['年龄','学历','性别','学位','手机号']
            }
        },
        props:['rowData','rows'],
        components: {},
        computed:{
            getRowData:function(){
                let postRowData = Object.assign({},this.rowData);
                return postRowData
            }
        },
        methods: {
            cancel(){
                this.$emit('setCancer');
            },
            ok(){
                this.getRowData.cols.forEach((item, index) => {
                    this.getRowData.cols[index] = Object.assign({},item, {newV: item.value})
                })
                this.$emit('setCancer');

            }


        },
        mounted(){
            this.cacheData = Object.assign({}, this.rowData);
            this.getRowData.cols.forEach((item, index) => {
                this.getRowData.cols[index] = Object.assign({},item, { newV: item.value})
                console.log(item.value);
            })
        }
    }
</script>
<style scrop>
    .TeamMember{
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .no-cursor{
        cursor: pointer !important;
    }
</style>
