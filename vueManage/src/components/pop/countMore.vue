<!--工作岗位新增的弹窗-->
<template>
  <div class="countMore">
    <Modal
      v-model="pops"
      :title="titles"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name="vertical-center-modal"
      @on-ok="handleSubmit('WorkerFormItem')"
      @on-cancel="cancel">
      <div class="">
          <p style="margin: 0 0 10px 0">{{tip}}</p>
          <Table height="300" border :columns="columns4" :data="lists" @on-selection-change="selections"></Table>
      </div>   
    </Modal>
  </div>
</template>
<script>
  export default {
    name:'countMore',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        columns4: [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
            {
                title: '报表',
                key: 'label'
            },
        ],
        data1: [
            {
                name: '表一，党员基本情况表',
                id: 12
            },
            {
                name: '表二，党员入党时间情况表',
                id: 12
            },
           
        ],
        remberList: []
        // lists: []
      }
    },
    props: ['controls', 'datas', 'titles', 'tips', 'froms', 'typevalue'],
    computed: {
      pops: {
        get: function() {
          return this.controls;
        },
        set: function(val) {
          this.$emit('cancel')
        }
      },
      lists() {
        return this.datas;
      },
      title() {
        return this.titles;
      },
      tip() {
        return this.tips;
      },
      fs() {
        return this.froms;
      },
      tv() {
        return this.typevalue;
      }
    },
    methods: {
      ajax(method, url, data) {
          let qs = require('qs');
          return method.toLowerCase() == 'post'  ? this.axios({
              method: method,
              url: url,
              data: qs.stringify(data)
          }) : this.axios({
              method: method,
              url: url,
              params: data,
          })
      },
      selections(val) {
        this.remberList = Object.assign([], val);
      },
      handleSubmit(name) {
        let temp = this.remberList.map(item => {
          return item.id;
        })
        let postData = {
            dept_id: this.$store.state.remberId,
            year: '2017',
            type_id: this.tv,
            form_id: temp.join()
        }
        switch(parseInt(this.fs)) {
          //清空多表
          case 1: 
              this.ajax('post', '/v1/report/clear', postData)
              .then(res => {
                  let needData = res.data;
                  if (needData.code == 200) {
                     this.$Message.success('多表清空成功');
                  } else {
                      this.$Message.error(needData.msg);
                  }
              })
              .catch(err => {
                  this.$Message.error('网络请求异常');
              })
              break;
          // 直统多表
          case 2:
              this.ajax('post', '/v1/report/pull', postData)
              .then(res => {
                  let needData = res.data;
                  if (needData.code == 200) {
                      this.$Message.success('直统多表成功');
                  } else {
                      this.$Message.error(needData.msg);
                  }
              })
              .catch(err => {
                  this.$Message.error('网络请求异常');
              })
              break;
          // 报表汇总
          case 3: 
              this.ajax('post', '/v1/report/sum', postData)
              .then(res => {
                  let needData = res.data;
                  if (needData.code == 200) {
                     this.$Message.success('汇总多表成功');
                  } else {
                      this.$Message.error(needData.msg);
                  }
              })
              .catch(err => {
                  this.$Message.error('网络请求异常');
              })
              break;
          default: return;
        }
        this.$emit('cancel');
      },
      cancel () {
        this.$emit('cancel')
      }
    },
    mounted(){

    }
  }
</script>
<style>
  .TeamMember{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  /*.TeamMember .ivu-modal{*/
    /*width: 950px !important;*/
  /*}*/
</style>
