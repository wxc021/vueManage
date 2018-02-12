<!--奖惩情况form-->
<template>
    <div class="box-flex start-box box-orient">
        <div class="info-detail box-flex">
          <Row>
            <Button style="float: right;" type="primary" @click="addReward">新增</Button>
          </Row>
          <Row>
            <Table border :columns="cloums" :data="lists" style="margin-top: 10px;margin-left: 10px"></Table>
          </Row>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'reward',
        data() {
          return {
            cloums: [
                {
                  title: '奖惩名称',
                  key: 'type_name',
                },
                {
                  title: '批准组织',
                  key: 'approval_dept_name'
                },
                {
                  title: '批准时间',
                  key: 'time'
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 140,
                  align: 'center',
                  render: (h, params) => {
                  return h('div', [
                  //   h('Button', {
                  //     props: {
                  //       type: 'info',
                  //       size: 'small'
                  //     },
                  //     style: {
                  //       marginRight: '5px'
                  //     },
                  //     on: {
                  //       click: () => {
                  //         this.showDetail(params);
                  //       }
                  // }
                  // }, '查看'),
                    h('Button', {
                      props: {
                        // type: 'info',
                        size: 'small'
                      },
                      class: {
                        'resetbtn-hover': true
                      },
                      style: {
                        marginRight: '5px',
                        padding: '10px 5px'
                      },
                      on: {
                        click: () => {
                          this.edit(params);
                        //this.remove(params.index)
                    }
                  }
                  }, '编辑'),
                    h('Button', {
                      props: {
                        // type: 'error',
                        size: 'small'
                      },
                      class: {
                        'resetbtn-hover': true
                      },
                      style: {
                        marginRight: '5px',
                        padding: '10px 5px'
                      },
                      on: {
                        click: () => {
                          this.remove(params)
                        }
                      }
                    }, '删除'),
                  ]);
                  }
                }
            ],
            lists: [
            ],
            formValidate: {

            },
            ruleValidate: {

            },
            datas: this.infodata,
          }
        },
        props: ['infodata', 'controlSave'],
        filters:{
          dateFormat(value){
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
        props: ['infodata'],
        components: {
        },
        watch: {
            '$route' (to, from) {
              this.lists = [];
              this.getList();
              // if (from.name == 'RewardPunishment') {
              //   this.lists = [];
              //   this.getList();
              // };
            },
        },
        methods: {
          showDetail(item) {
            this.$router.push({name: 'RewardPunishment', params: {recodeId: item.row.id, type: 2}});
          },
          remove(item) {
            let that = this;
            let qs = require('qs');
            this.$Modal.confirm({
                title: '提示',
                content: '<p>您确定要删除该条记录吗？</p>',
                onOk: () => {
                    this.axios({
                        method: 'post',
                        url: '/v1/deptrule/del-record',
                        data: qs.stringify({
                          id: item.row.id,
                        })
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
              this.$router.push({name: 'checkRewardPunishment', params: { recodeId: item.row.id, type: 1 }});
            } else {
              this.$router.push({name: 'RewardPunishment', params: { recodeId: item.row.id, type: 1 }});
            }
            
          },
          addReward() {
            if (this.$route.name == 'checkinfo') {     
              this.$router.push({name: 'checkRewardPunishment', params: {id: this.$route.params['id']}});
            } else {
              this.$router.push({name: 'RewardPunishment', params: {id: this.$route.params['id']}});
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
              url: '/v1/deptrule/list',
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
