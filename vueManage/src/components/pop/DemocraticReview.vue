<!--民主评议新增的弹窗-->
<template>
  <div class="DemocraticReview">
    <Modal
      v-model="modal1"
      title="民主评议"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name="vertical-center-modal  max-height"
      @on-ok="handleSubmit('DemocraticFormItem')"
      @on-cancel="cancel">
      <Row>
        <Form class=nosel ref="DemocraticFormItem" :rules="ruleValidate" :model="DemocraticFormItem" :label-width="110" :inline="true">
          <Col span="12">
            <FormItem label="开展评议日期"  prop="startDate">
                <DatePicker  type="date" placeholder="选择日期" v-model="DemocraticFormItem.startDate" :disabled="disabled"></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="结束评议日期"  prop="endDate">
              <DatePicker  type="date" placeholder="选择日期" v-model="DemocraticFormItem.endDate" :disabled="disabled"></DatePicker>
            </FormItem>
          </Col>
        </Form>
      </Row>
      <Row>
        <div class="newdangyuan-list" v-show="type != 2">
          <table>
            <thead>
              <th>姓名</th>
              <th>评议结果</th>
              <th>评议奖惩情况</th>
              <th>评议奖惩原因</th>
            </thead>
            <tbody>
            <tr v-for="(inner,index) in newlist">
              <td width="100px">{{inner.real_name}}</td>
              <td><Select v-model="inner.result" style="width:200px;text-align: left;" @on-change="setNext(inner, index)">
                  <Option v-for="item in resultList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select></td>
              <td>
                <!--<Select v-model="inner.desc" style="width:200px; text-align: left;" :disabled="inner.disabled || disabled">-->
                  <!--<Option v-for="item in inner.descList" :value="item.value" :key="item.value">{{ item.label }}123</Option>-->
                <!--</Select>-->
                <select  v-model="inner.desc" style="width: 200px;height: 30px;border: 1px solid #dddee1;border-radius: 4px;outline: none font-size: 14px;" :class="{'disable':inner.disabled}" :disabled="inner.disabled || disabled">
                  <option value="" disabled selected style="font-size:14px;height: 30px;
    line-height: 30px;">请选择</option>
                  <option style="line-height: 30px;" v-for="item in inner.descList" :value="item.value" :key="item.value">{{ item.label }}</option>
                </select>
              </td>
              <td><Select v-model="inner.reason" style="width:200px; text-align: left;"  :disabled="inner.disabled || disabled">
                  <Option v-for="item in inner.reasonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="newdangyuan-list" v-show="type == 2">
          <table>
            <thead>
              <th>姓名</th>
              <th>评议结果</th>
              <th>评议奖惩情况</th>
              <th>评议奖惩原因</th>
            </thead>
            <tbody>
            <tr v-for="(inner,index) in detailList">
              <td width="100px">{{inner.real_name}}</td>
              <td> {{inner.result}}</td>
              <td> {{inner.desc}}</td>
              <td> {{inner.reason}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </Row>
    </Modal>
  </div>
</template>
<script>
  export default {
    name:'DemocraticReview',
    data () {
      return {
        statusModel: '',
        publishModel: '',
        modal1: true,//是否显示弹窗
        loading: true,
        disabled: true,
        resultList: [],
        publishStu: [],
        publishRes: [],
        type: this.$route.params.type,
        detailList: [],
        DemocraticFormItem: {  //form的绑定
          startDate: '',//开始时间
          endDate: '',//结束时间
        },
        ruleValidate: {
          startDate:[
            {required: true,type: 'date', message: '开展日期不能为空', trigger: 'change'},
          ],
          endDate:[
            {required: true,type: 'date', message: '结束日期不能为空', trigger: 'change'},
          ],
        },
        options1:{
          disabledDate: (date)=> {
            console.log(this);
            return date > this.DemocraticFormItem.endDate.getTime();
          }
        },
        options2:{
          disabledDate: (date)=> {
            console.log(this);
            return date < this.DemocraticFormItem.startDate.getTime();
          }
        },
        newlist:[],
        detailList: [],

      }
    },

    methods: {
      setNext(item, index) {
        let that = this;
        if (item.result == '1140' || item.result == '1143') {
          this.newlist[index].disabled = false;
          //党组织优秀和合格时候的数据
          // if (!this.$store.state.RP.length) {
          //   that.$store.commit('getRP', {_: this});
          // };
          this.axios({
              method: 'get',
              url: '/v1/discuss/reason-list',
              params: {
                  id: item.result
              }
          })
          .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  that.newlist[index].reasonList = [];
                  that.newlist[index].reasonList = needData.data;
              } else {
                  that.$Message.error(needData.msg);
              }
          })
          .catch(err => {
              this.$Message.error('网络请求异常');
          })
          this.axios({
              method: 'get',
              url: '/v1/discuss/desc-list',
              params: {
                  id: item.result
              }
          })
          .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  that.newlist[index].descList = [];
                  that.newlist[index].descList = needData.data;
              } else {
                  that.$Message.error(needData.msg);
              }
          })
          .catch(err => {
              this.$Message.error('网络请求异常');
          })
        } else {
          this.newlist[index].disabled = true;
          this.newlist[index].descList = [];
          this.newlist[index].reasonList = [];
        }
      },
      setStr(val) {
        return val > 9 ? val : '0'+val;
      },
      getDate(obj) {
        return obj.getFullYear()+'-'+this.setStr(obj.getMonth()+1)+'-'+this.setStr(obj.getDate());
      },
      //民主评议结果
      getResult() {
          let that = this;
          let qs = require('qs');
          this.axios({
              method: 'get',
              url: '/v1/dictionary/get-list-by-type',
              params: {
                  type: 'C06007',
              }
          })
          .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                that.resultList = needData.data;
              } else {
                  that.$Message.error(needData.msg);
              }
          })
          .catch(err => {
              this.$Message.error('网络请求异常');
          })
      },
      //获取党员列表
      getPerson() {
        let that = this;
          let qs = require('qs');
          this.axios({
              method: 'post',
              url: '/v1/member/list',
              data: qs.stringify({
                  dept_id: that.$route.params.id,
                  opt: 1,
              })
          })
          .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                needData.data.forEach(item => {
                  item.result = "1141";
                  item.desc = '';
                  item.reason = '';
                  item.disabled = true;
                  item.descList = [];
                  item.reasonList = [];
                });
                that.newlist = needData.data;
              } else {
                  that.$Message.error(needData.msg);
              }
          })
          .catch(err => {
              this.$Message.error('网络请求异常');
          })
      },
      handleSubmit(name) {
        let that = this;
        if(this.$route.params.type == 2) {
          let that = this;
          this.$Modal.remove()
          setTimeout(function(args) {
            that.$router.go(-1);
          }, 500)
          return
        }

        this.$refs[name].validate((valid) => {
            if (valid) {  

              if(this.DemocraticFormItem.startDate.getTime() > this.DemocraticFormItem.endDate.getTime()) {
                that.$Message.error('开始时间不能大于结束时间');
                setTimeout(() => {
                    that.loading = false;
                    that.$nextTick(() => {
                        that.loading = true;
                    });
                }, 1000);
                return;
              }

              let postArr = [];
              this.newlist.forEach(item => {
                postArr.push({
                  uid: item.id,
                  result: item.result,
                  desc: item.desc,
                  reason: item.reason,
                });
              });
              let postData = {
                start_time: this.getDate(this.DemocraticFormItem.startDate),
                end_time: this.getDate(this.DemocraticFormItem.endDate),
                dept_id: that.$route.params.id,
                users: JSON.stringify(postArr),
              };
              let url = '';
              if (!postArr.length) {
                that.$Message.error('没有相关党员,不能增加,返回吧！');
                setTimeout(() => {
                    that.loading = false;
                    that.$nextTick(() => {
                        that.loading = true;
                    });
                }, 1000);
                return;
              };
              if (this.$route.params.type == 1) { //编辑
                url = "/v1/discuss/edit?id="+that.$route.params.recodeId+"&dept_id="+that.$route.params.id;
                postData.id = this.$route.params.recodeId;
              } else if(this.$route.params.type == 2) { //查看

              } else { // 新增
                url = '/v1/discuss/add'
              }
              let qs = require('qs');
              this.axios({
                  method: 'post',
                  url: url,
                  data: qs.stringify(postData),
              })
              .then(res => {
                  let needData = res.data;
                  if (needData.code == 200) {
                    that.$Message.success('成功提交');
                    that.$Modal.remove()
                    setTimeout(function(args) {
                      that.$router.go(-1);
                    }, 500)
                  } else {
                    setTimeout(() => {
                        that.loading = false;
                        that.$nextTick(() => {
                            that.loading = true;
                        });
                    }, 1000);
                    that.$Message.error(needData.msg);
                  }
              })
              .catch(err => {
                  this.$Message.error('网络请求异常');
              })
            } else {
              this.loading=false;
              this.$Message.error('表单验证失败!');
              setTimeout(() => {
                  that.loading = false;
                  that.$nextTick(() => {
                      that.loading = true;
                  });
              }, 1000);
            }
        })
      },
      cancel () {
        let that = this;
        this.$Modal.remove()
        setTimeout(function(args) {
          that.$router.go(-1);
        }, 500)
      },
      showDetail(id) {
        let that = this;
        let qs = require('qs');
        this.axios({
            method: 'get',
            url: '/v1/discuss/detail',
            params: {id: id,dept_id: that.$route.params.id, opt: 1}
        })
        .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
                that.detailList = needData.data;
                that.DemocraticFormItem.startDate = new Date(needData.data[0].start_time);
                that.DemocraticFormItem.endDate = new Date(needData.data[0].end_time);
            } else {
                that.$Message.error(needData.msg);
            }
        })
        .catch(err => {
            this.$Message.error('网络请求异常');
        })
      },
      getDetail(id) {
        let that = this;
        let qs = require('qs');
        this.axios({
            method: 'get',
            url: '/v1/discuss/ajax-edit',
            params: {id: id, opt: 1}
        })
        .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
                if (needData.data.list) {
                  needData.data.list.forEach(item => {
                    if (item.result == '1140' || item.result == '1143') {
                      item.disabled = false;
                    } else {
                      item.disabled = true;
                    }
                    item.desc = parseInt(item.desc);
                    item.reason = parseInt(item.reason);
                    item.descList = item['desc-list'];
                    item.reasonList = item['reason-list'];
                  })
                  that.newlist = needData.data.list;
                } else {

                }
                
                that.DemocraticFormItem.startDate = new Date(needData.data.start_time);
                that.DemocraticFormItem.endDate = new Date(needData.data.end_time);
            } else {
                that.$Message.error(needData.msg);
            }
        })
        .catch(err => {
            this.$Message.error('网络请求异常');
        })
      }
    },
    mounted() {
      let that = this;
      this.getResult();

      if (this.$route.params.type != 1 && this.$route.params.type != 2) {
        this.getPerson();
      };
      // this.getSitation();
      switch(parseInt(this.$route.params.type)) {
        case 1:
          // 编辑
          this.disabled = false
          that.getDetail(that.$route.params.recodeId);

        break;
        case 2:
          // 查看
          this.disabled = true
          this.showDetail(this.$route.params.recodeId);
        break;
        default: this.disabled = false
      }
    }
  }
</script>
<style>
  .nosel{
    user-select: none;
  }
  .disable{
      background: #f3f3f3 !important;
  }


  .newdangyuan-list{
    width: 100%;
    margin-top: 20px;
    margin-bottom:100px;
  }
  .newdangyuan-list table{
    border-collapse: collapse;
    text-align: center;
    width: 100%;
    color: #333;
  }
  .newdangyuan-list table thead{
    background: #f2f2f2;
  }
  .newdangyuan-list table thead th,.newdangyuan-list table tr td{
    border:1px solid #e2e2e2;
    height: 40px;
    line-height: 40px;
  }
  .newdangyuan-list table tr td input{
    width: 100%;
    height: 100%;
    border:none;
    outline: none;
    text-align: center;
  }
</style>
