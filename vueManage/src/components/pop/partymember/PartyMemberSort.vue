<!--党员排序的弹窗-->
<template>
  <div class="PartyMemberSort">
    <Modal
      v-model="modal1"
      title="党员排序"
      width="950"
      :loading="loading"
      :mask-closable=false
      class-name='max-height max-height3 vertical-center-modal'
      @on-ok="submit"
      @on-cancel="cancel">
      <Row>
        <div class="tabs">
          <p style="color:red;padding-bottom:20px;">注意：鼠标拖动单元格可以进行排序。</p>
          <table>
            <thead>
              <th>序号</th>    
              <th>姓名</th>
              <th>性别</th>
              <th>出生日期</th>
              <th>人员状态</th>
              <th>支部职务</th>
            </thead>
              <draggable :list="listData" :element="'tbody'">
                <tr v-for="(item,index) in listData" :key="item.index">
                  <td><Icon type="drag"></Icon>  {{index+1}}</td>
                  <td>{{item.real_name}}</td>
                  <td>{{item.sex}}</td>
                  <td>{{item.birthday}}</td>
                  <td>{{item.member_status}}</td>
                  <td>{{item.duty_name}}</td>
                </tr>
              </draggable>
          </table>
        </div>
      </Row>
    </Modal>
  </div>
</template>
<script TYPE="text/ecmascript-6">
  import draggable from 'vuedraggable'
  export default {
    name:'PartyMemberSort',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        listData:[],
        dept_id:this.$route.query.dept_id,
        type:this.$route.query.type,

      }
    },
    components: {
      draggable
    },
    watch: {
      '$route' (to, from) {
         
      },
    },
    mounted () {
      this.getList();
    },
    methods: {
      submit (){
        let that = this;
        let dept_id = that.dept_id;
        let ids = '';
        that.listData.forEach(function(item,index) {
          if(index==that.listData.length-1){
              ids+=item.id;
          }else{
              ids+=item.id+',';
          }
        });
        that.axios({
          url:'/v1/member/order-update',
          method:'GET',
          params:{
            dept_id:dept_id,
            ids:ids,
            group:that.type=='5'?"":'1',
          },
        })
        .then(res=>{
          let needData = res.data;
          if (needData.code == 200) {
            this.$Message.success('提交成功!');
            this.$router.push({path:'/dangyuan/'+this.dept_id+'?type='+this.type});
          } else {
              that.$Message.error(needData.msg);
          }
            

        })
        .catch(err=>{
          // that.$Message.error(needData.msg);
        })
      },
      getList () {
        let that = this;
        let dept_id = that.dept_id;
        let type = that.$route.query.type;
        if(dept_id){
          that.axios({
            url:'/v1/member/order-list',
            method:'get',
            params:{
              dept_id:dept_id,
              group:type == 6? 1 : '',
            },
          })
          .then(res=>{
            let needData = res.data;
            if (needData.code == 200) {
                that.listData = needData.data;
            } else {
                that.$Message.error(needData.msg);
            }
          })
          .catch(err => {
              this.$Message.error('网络请求异常');
              setTimeout(() => {
               this.$router.push({path:'/dangyuan/'+this.dept_id+'?type='+this.type});
              }, 200);
						}
          )
        }
        
      },
      cancel () {
 				this.$router.push({path:'/dangyuan/'+this.dept_id+'?type='+this.type});
      }
    }
  }
</script>
<style>
  td{padding: 0;margin: 0;}
  .tabs{margin-top: 10px;margin-left: 10px;user-select: none}
  .tabs table{border-collapse: collapse;text-align: center;width: 100%;color: #333;font-family: "微软雅黑"; border: 1px solid #e2e2e2;}
  .tabs table thead{line-height: 40px;background: #F8F8F9;font-weight: normal;}
  .tabs table thead {border-bottom: 1px solid #e9eaec;border-top: 1px solid #e9eaec;}
  .tabs table thead th{font-weight: normal;}
  .tabs table tbody tr{line-height: 32px;height: 32px;border-bottom: 1px solid #e9eaec;;color: #333;box-sizing: border-box}
  .tabs table tbody tr:hover{background-color: #EBF7FF}
  .tabs table tbody tr.drag:hover{background-color: #eee;cursor: move}
  .tabs table .checkbox{width: 20px;height: 20px;box-sizing:border-box;border:1px solid #ccc;;margin: 3px auto 0}
  .tabs table .checkbox.on{background: #d73826;border-color: #d73826}
  .tabs table .checkbox.on:after{content: "√";width: 0;height: 0;color: #fff;position: relative;top: -11px;}
  .tabs table tbody td,.tabs table thead th{ border-right:1px solid #e9eaec;}
  .tabs table tbody td.ready{color: #d73826}
  .tabs table tbody td.out{color: #f07100}
  .tabs table tbody td.in{color: #008df0}
</style>
