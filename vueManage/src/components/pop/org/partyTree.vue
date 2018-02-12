<!--奖惩中的批准树-->
<template>
  <div class="partyTree">
    <Modal
      v-model="modal1"
      :title="title"
      width="950"
      :loading="loading"
      :mask-closable=false
      :closable="false"
      :styles="setStyle"
      class-name="max-height vertical-center-modal"
      @on-ok="ok"
      @on-cancel="cancel">
      <div style="height:500px;position:relative;">
        <Slide ref="slide"
          @reflashList="reflashList"
          @getnode="getnode"
          @slideDown="slideDown"
          :url="treeUrl"
          :loadUrl="treeLoad"
          :openitem="openitem"
          :currentnode="currentnode"
          :openlist="openlist"
          :params="treeParam"
          >
        </Slide>
      </div>
    </Modal>
  </div>
</template>
<script>
  import Slide from '@/components/slide.vue'
  export default {
    name:'partyTree',
    props : {
      setid : {
        type: String,
        default: ''
      },
      // uri : null,
      title : {
        type : String,
        default : '转入党支部'
      },
      url : {
        type : String,
        default : '/v1/trees/search-list',
      },
      loadUrl : {
        type : String,
        default : '/v1/trees/search-list'
      }
    },
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        openitem: [],
        remberData: {},
        treeUrl: this.url,
        treeLoad: this.loadUrl,
        currentnode: '',
        openlist: [],
        setStyle: {
          'zIndex': '1004'
        },
        formInline:{

        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        // treeRoot: ,
        treeParam:{
          dept_id : this.setid
        }
      }
    },
    components: {
      Slide
    },
    // props: ['setid','uri','title'],
    computed: {
      getId() {
        return this.setid;
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      // tree emit events（events up）
      reflashList(item) {
        this.remberData = item.data;
      },
      slideDown() {
          console.log('jieshu')
      },
      getnode() {

      },
      cancel() {
        this.$emit('setCancer');
      },
      ok() {
        this.$emit('setConfirm', {data: this.remberData});
        setTimeout(() => {
            this.loading = false;
            this.$nextTick(() => {
                this.loading = true;
            });
        }, 2000);
      }
    },
    mounted(){
      // console.log(this.treeUrl);
    },
    watch:{
      setid(newVal, oldVal){
        // console.log(newVal);
        this.treeParam.dept_id = newVal;
      }
    }
  }
</script>
<style>
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

</style>
