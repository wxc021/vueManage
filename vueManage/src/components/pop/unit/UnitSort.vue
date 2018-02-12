<!--单位管理/排序-->
<template>
  <div class="UnitSort">
    <Modal
      v-model="modal1"
      title="单位排序"
      width="950"
      height="500"
      :loading="loading"
      :mask-closable=false
      class-name="vertical-center-modal max-height-unit"
      @on-ok="ok"
      @on-cancel="cancel">
      <Row>
        <Col span="24">
          <p style="color: #f04134;font-size: 14px;margin-bottom: 10px;">注意：鼠标拖动单元格可以进行排序</p>
          <!--<Table highlight-row :columns="columns3" :data="data1"></Table>-->
        <div class="tabs" style="height: 300px;overflow: auto;">
          <table>
            <thead>
              <th>序号</th>
              <th>单位/机构名称</th>
              <th>类型</th>
              <th>直属关系</th>
              <th>性质类别</th>
              <th>所属行业</th>
            </thead>
            <draggable :list="lists" :element="'tbody'">
              <tr v-show="lists.length"  v-for="(item,index) in lists" :key="item.index">
                <td><Icon type="drag" style="margin: 0 5px;"></Icon>{{index+1}}</td>
                <td>{{item.full_name}}</td>
                <td>{{item.org_type_desc}}</td>
                <td>{{item.type_id_desc}}</td>
                <td>{{item.prop_id_desc}}</td>
                <td>{{item.belong_type_desc}}</td>
              </tr>
            </draggable>
          </table>
          <div class="ivu-table-tip" v-show="lists.length == 0"><table cellspacing="0" cellpadding="0" border="0" style="border-top:0px;"><tbody><tr><td><span>暂无数据</span></td></tr></tbody></table></div>
        </div>

        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script>
  import draggable from 'vuedraggable'
  export default {
    name:'UnitSort',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        lists: [],
        columns3: [
          {
            title:'序号',
            type: 'index',
            width: 60,
            align: 'center',
          },
          {
            title: '单位/机构名称',
            key: 'full_name'
          },
          {
            title: '类型',
            key: 'org_type_desc'
          },
          {
            title: '直属关系',
            key: 'type_id_desc'
          },
          {
            title: '性质类别',
            key: 'prop_id_desc'
          },
          {
            title: '所属行业',
            key: 'belong_type_desc'
          }
        ],
      }
    },
    components:{
      draggable
    },
    methods: {
      cancel() {
        let that = this;
        this.$Modal.remove()
        setTimeout(function(args) {
          that.$router.push({name:'unitManage'})
        }, 500)
      },
      getnode() {

      },
      slideDown() {
      },
      getList(item) {
        let that = this;
        if (this.$store.state.remberId == 1) {
          return;
        };
        this.axios({
            method: 'get',
            url: '/v1/org/unitlist',
            params: {
              org_id: this.$store.state.remberId,
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
              this.$Message.error(needData.msg);
              setTimeout(() => {
                  that.loading = false;
                  that.$nextTick(() => {
                      that.loading = true;
                  });
              }, 1000);
            }
        })
        .catch(err => {
            this.$Message.error('网络请求异常');
            setTimeout(() => {
                that.loading = false;
                that.$nextTick(() => {
                    that.loading = true;
                });
            }, 1000);
        })
      },
      ok() {
        if (!this.lists.length) {
          this.$Message.error('一个单位不需要排序哦');
          return;
        };
        let str = this.lists.map((item) => {return item.id}).join();
        let that = this;
        this.axios({
            method: 'get',
            url: '/v1/org/order-update',
            params: {
              ids: str
            }
        })
        .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
                this.$Message.success('排序成功');
                this.$Modal.remove();
                this.$store.commit('setStrict');
                setTimeout(function(args) {
                  that.$router.push({name:'unitManage'})
                }, 500)
            } else {
              this.$Message.error(needData.msg);
              setTimeout(() => {
                  that.loading = false;
                  that.$nextTick(() => {
                      that.loading = true;
                  });
              }, 1000);
            }
        })
        .catch(err => {
            this.$Message.error('网络请求异常');
            setTimeout(() => {
                that.loading = false;
                that.$nextTick(() => {
                    that.loading = true;
                });
            }, 1000);
        })
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>
<style scoped>
  .TeamMember{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .icon-img{
    position: relative;
    top: 2px;
    margin-right: 5px;
  }
  td{padding: 0;margin: 0;}
  .tabs{margin-top: 10px;margin-left: 10px;user-select: none}
  .tabs table{border-collapse: collapse;text-align: center;width: 100%;color: #333;font-family: "微软雅黑"; border: 1px solid #e2e2e2;}
  .tabs table thead{line-height: 40px;background: #F8F8F9;font-weight: normal;}
  .tabs table thead {border-bottom: 1px solid #e9eaec;border-top: 1px solid #e9eaec;}
  .tabs table thead th{font-weight: normal;}
  .tabs table tbody tr{line-height: 48px;height: 48px;border-bottom: 1px solid #e9eaec;;color: #333;box-sizing: border-box}
  .tabs table tbody tr:hover{background-color: #EBF7FF}
  .tabs table tbody tr.drag:hover{background-color: #eee;cursor: move}
  .tabs table .checkbox{width: 20px;height: 20px;box-sizing:border-box;border:1px solid #ccc;;margin: 3px auto 0}
  .tabs table .checkbox.on{background: #d73826;border-color: #d73826}
  .tabs table .checkbox.on:after{content: "√";width: 0;height: 0;color: #fff;position: relative;top: -11px;}
  .tabs table tbody td,.tabs table thead th{ border-right:1px solid #e9eaec;}
  .tabs table tbody td.ready{color: #d73826}
  .tabs table tbody td.out{color: #f07100}
  .tabs table tbody td.in{color: #008df0}
  tbody {
    height: 300px;
    overflow: auto;
  }
</style>
