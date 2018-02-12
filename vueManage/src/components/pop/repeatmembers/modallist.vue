<!-- 学历学位新增弹窗 -->
<template>
  <div class="Degree">
    <Modal
      v-model="modal1"
      title="重复人员查询"
      width="1000"
      :mask-closable = "false"
      @on-cancel="cancel"
      class-name="max-height">
      <Table ref="repeattable" border :columns="tableModel" :data="lists"></Table>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name:'Degree',
    props : {
      viewdata : null
    },
    data () {
      return {
        modal1:true,
        loading:true,
        currentData : this.viewdata,
        tableModel: [
          {
              title: '姓名',
              key: 'real_name',
          },
          {
              title: '人员状态',
              key: 'member_status',
          },
          {
              title: '组织关系所在党支部',
              key: 'full_name',
          },
          {
              title: '组织办公电话',
              key: 'contact_phone',
          },
          {
              title: '联系人',
              key: 'contact_person',
          },
          {
              title: '上级党组织',
              key: 'parent_full_name',
          },
          {
              title: '组织办公电话',
              key: 'parent_contact_phone',
          },
          {
              title: '联系人',
              key: 'parent_contact_person',
          }
        ],
        lists: []
      }
    },
    methods: {
      fetchData(idcard, isfresh){
          return this.axios({
              method: 'get',
              url: '/v1/identity/detail',
              params: {
                  idcard: idcard,
                  opt: isfresh ? 1 : 0,
              }
          })
      },
      cancel(){
        this.$router.push({
          name : 'repeatmemberlist',
          params : {
            dept : this.$route.params.dept
          }
        })
      }
    },
    mounted(){
      console.log(this.currentData);
      let _this = this;
      this.fetchData(this.$route.params.idcard, true)
      .then(res => {
        if (res.data.code == 200) {
            _this.lists = res.data.data;
        };
      })
    }
  }
</script>
<style>

</style>
