<!--奖惩中的批准树-->
<template>
  <div class="InsideTransfer" style="height:300px;">
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
      <div style="height: 300px; overflow: auto;position: relative;">
        <Slide ref="slide"
            @reflashList="reflashList"
            @getnode="getnode"
            @slideDown="slideDown"
            :url="url"
            :params="params"
            :openitem="openitem"
            :currentnode="currentnode"
            :openlist="openlist"
            unitType="2"
            >
        </Slide>
      </div>
      
    </Modal>
  </div>
</template>
<script>
  import Slide from '@/components/slide.vue'
  export default {
    name:'InsideTransfer',
    data () {
      return {
        modal1: true,//是否显示弹窗
        loading: true,
        openitem: [],
        remberData: {},
        url:'/v1/trees/org-trees',
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
      }
    },
    components: {
      Slide
    },
    props: {
      setid : null,
      params : null,
      title : {
        type : String,
        default : '党组织类型'
      }
    },
    computed: {
      getId() {
        return this.setid;
      }
    },
    watch:{
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
      }
    },
    mounted(){
//      this.url=this.uri;
//      console.log(this.uri);
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
