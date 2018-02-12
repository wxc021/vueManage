<!--民主评议form-->
<template>
    <div class="box-flex start-box box-orient">
        <div class="info-detail box-flex">
          <Row>
            <!-- <p style="float: left;margin-left: 10px;margin-top: 7px;">单位信息</p> -->
            <Button style="float: right;"  type="primary" @click="addReward">新增</Button>
          </Row>
          <Row>
            <Table border :columns="headers" :data="lists" style="margin-top: 10px;margin-left: 10px"></Table>
          </Row>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'review',
        data() {
          return {
              headers: [
                {
                  title: '开始评议日期',
                  key: 'start_time',
                },
                {
                  title: '结束评议日期',
                    key: 'end_time'
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 140,
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      // h('Button', {
                      //   props: {
                      //     type: 'info',
                      //     size: 'small'
                      //   },
                      //   style: {
                      //     marginRight: '5px'
                      //   },
                      //   on: {
                      //     click: () => {
                      //       this.showDetail(params);
                      //     }
                      //   }
                      // }, '查看'),
                      h('Button', {
                        props: {
                          type: 'info',
                          size: 'small'
                        },
                        style: {
                          marginRight: '5px'
                        },
                        on: {
                          click: () => {
                            this.edit(params)
                          }
                        }
                      }, '编辑'),
                      h('Button', {
                        props: {
                          type: 'error',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            this.remove(params)
                          }
                        }
                      }, '删除')
                    ]);
                  }
                }
              ],
              lists: [],
          }
        },
        props: ['infodata', 'controlSave'],
        components: {
        },
        watch: {
            '$route' (to, from) {
              this.lists = [];
              this.getList();
            },
        },
        methods: {
          showDetail(item) {
            this.$router.push({name: 'DemocraticReview', params: {recodeId: item.row.id, type: 2}});
          },
          remove(item) {
            let that = this;
            let qs = require('qs');
            this.$Modal.confirm({
                title: '提示',
                content: '<p>您确定要删除该条记录吗？</p>',
                onOk: () => {
                    this.axios({
                        method: 'get',
                        url: '/v1/discuss/del',
                        params: {
                          id: item.row.id,
                          dept_id: that.$route.params['id']
                        }
                      })
                      .then(res => {
                        let needData = res.data;
                        if (needData.code == 200) {
                          that.$Message.success('删除成功');
                          that.lists = [];
                          that.getList();
                        } else {  
                          that.$Message.error(needData.msg);
                        }
                      })
                      .catch(err => {
                        this.$Message.error('网络请求异常');
                      })
                },
                onCancel: () => {
                    
                }
            });
          },
          edit(item) {
            if (this.$route.name == 'checkinfo') {
              this.$router.push({name: 'checkDemocraticReview', params: { recodeId: item.row.id, type: 1 }});
            } else {
              this.$router.push({name: 'DemocraticReview', params: { recodeId: item.row.id, type: 1 }});
            }
            
          },
          addReward() {
            if (this.$route.name == 'checkinfo') {
              this.$router.push({name: 'checkDemocraticReview', params: {id: this.$route.params['id']}});
            } else {
              this.$router.push({name: 'DemocraticReview', params: {id: this.$route.params['id']}});
            }
          },
          handleSubmit (name) {
              this.$refs[name].validate((valid) => {
                  if (valid) {
                      this.$Message.success('提交成功!');
                  } else {
                      this.$Message.error('表单验证失败!');
                  }
              })
          },
          handleReset (name) {
              this.$refs[name].resetFields();
          },
          getList(opt) {
            let that = this;
            let qs = require('qs');
            this.axios({
              method: 'get',
              url: '/v1/discuss/dept-list',
              params: {
                dept_id: that.$route.params['id'],
                opt: 1,
              }
            })
            .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                needData.data.forEach(item => {
                  that.lists.push(item);
                })
              } else {
                that.$Message.error(needData.msg);
              }
            })
            .catch(err => {
              this.$Message.error('网络请求异常');
            })
          }
         
        },
        created() {

        },
        mounted() {
          this.$store.commit('setEdit', {isDisable: false});
          this.getList();
        },
    }
</script>
<style scope>

</style>
