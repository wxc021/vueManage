<!- 学历学位新增弹窗-->
<template>
  <div class="Degree">
    <Modal
      v-model="modal1"
      title="学历学位"
      width="950"
      :mask-closable=false
      closable=false
      class-name="max-height vertical-center-modal"
      :loading="loading"
      @on-ok="handleSubmit('degreeForm')"
      @on-cancel="cancel">
      <Row>
        <Form ref="degreeForm" :model="degreeForm"  :label-width="110" :rules="ruleValidate">
          <Col span="12">
          <FormItem label="教育类别" prop="selectDegree">
            <Select style="width: 340px" v-model="degreeForm.selectDegree" placeholder="请选择">
              <Option value="0">全日制</Option>
              <Option value="1">非全日制</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="专业：" prop="major">
              <Input v-model="degreeForm.major" style="width: 340px" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="学历：" prop="education">
            <Input v-model="degreeForm.education" style="width: 340px" placeholder="请输入"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="毕业院校：" prop="university">
            <Input v-model="degreeForm.university" style="width: 340px" placeholder="请输入"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="入党日期：" prop="communistDate">
            <DatePicker style="width: 340px"   type="date" placeholder="选择日期" v-model="degreeForm.communistDate"></DatePicker>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="学位：" prop="degree">
            <Input v-model="degreeForm.degree" style="width: 340px" placeholder="请输入"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="毕业日期：" prop="graduationDate">
            <DatePicker style="width: 340px"   type="date" placeholder="选择日期" v-model="degreeForm.graduationDate"></DatePicker>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="学位授予日期：" prop="academicDate">
            <DatePicker style="width: 340px"   type="date" placeholder="选择日期" v-model="degreeForm.academicDate"></DatePicker>
          </FormItem>
          </Col>

        </Form>
      </Row>
    </Modal>
  </div>
</template>
<script TYPE="text/ecmascript-6">
  export default {
    name:'Degree',
    data () {
      return {
        modal1:true,
        loading:true,
        degreeForm:{
          selectDegree:'',//教育类别
          major:'',//专业
          education:'',//学历
          university:'',//毕业院校
          communistDate:'',//入党时间
          degree:'',//学位
          graduationDate:'',//毕业时间
          academicDate:'',//学位授予时间
        },
        ruleValidate: {
          selectDegree: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          major: [
            {required: true, message: '专业不能为空', trigger: 'blur'},
          ],
          education:[
            {required: true, message: '学历不能为空', trigger: 'blur'}
          ],
          university:[
            {required: true, message: '毕业院校不能为空', trigger: 'blur'},
          ],
          communistDate:[
            {required: true,type: 'date', message: '入党时间不能为空', trigger: 'change'},
          ],
          degree:[
            {required: true, message: '学位不能为空', trigger: 'blur'},
          ],
          graduationDate:[
            {required: true,type: 'date', message: '毕业时间不能为空', trigger: 'change'},
          ],
          academicDate:[
            {required: true,type: 'date', message: '学位授予时间不能为空', trigger: 'change'},
          ]
        }
      }
    },

    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
            this.modal1=false;
          } else {
            this.loading=false;
            this.$Message.error('表单验证失败!');
            setTimeout(() => {
              this.loading=true;
            }, 20);
          }
        })
      },
      okfn () {



      },
      cancel () {
        this.$Message.info('点击了取消');
      }
    }
  }
</script>
<style>

</style>
