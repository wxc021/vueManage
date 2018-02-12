<template>
  <div style="width:100%;height:100%; overflow: auto; positio:realtive;">
    <div class="tips-pop box-align start-box box-pack box-orient" v-show="thatistips">
        <div class="tips-icon" @mouseover="togleshow" @mouseout="toglehide"></div>
        <transition name="togoole">
            <ul class="tips-dropdown-menu" v-if="isTogoole">
                <li class="tips-dropdown-item start-box box-align" v-for="item in tipslist">
                    <div :class="item.class" style="margin:0 10px;"></div>
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </transition> 
    </div>
    <el-tree
      :data="lists" 
      :props="defaultProps"
      node-key="nid" 
      :default-expanded-keys="thatExpanded" 
      accordion 
      :indent='8'
      :load="loadNode"
      lazy
      ref="tree"
      :highlight-current="true" 
      :current-node-key="thatCurrent"
      @node-click="handleNodeClick" 
      :render-content="renderContent"></el-tree>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Tree } from 'element-ui'
  Vue.use(Tree)
  const tips = [{name: '地方党委', class: 'tree-icons-1'},
    {name: '党组', class: 'tree-icons-2'},
    {name: '党委、工委', class: 'tree-icons-3'},
    {name: '党总支', class: 'tree-icons-4'},
    {name: '党支部', class: 'tree-icons-5'},
    {name: '党小组', class: 'tree-icons-6'},
  ];
  export default {
    name: 'subpartytree',
    data() {
      return {
        lists: [],
        isTogoole: false,
        thatExpanded: this.openitem,
        thatCurrent: this.currentnode,
        thatOpenlist: this.openlist,
        thaturl: this.url,
        thatistips: this.istips,
        remberIndex: 0,
        defaultProps: {
          children: 'children',
          label: 'name',
          isLeaf: 'isLeaf'
        },
        timer: null,
      }
    },
    props: {
      openitem: {
        type: Array,
        default: function() {
          return [];
        }
      },
      currentnode: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      },
      openlist: {
        type: Array,
        default: function() {
          return [];
        }
      },
      tipslist: {
        type: Array,
        default: function() {
          return tips;
        }
      },
      istips:  {
        type: Boolean,
        default: true
      },
      params: {
        type: Object,
        default: function() {
          return {
            'dept_id': '', 
            'opt': 1,
          }
        }
      } 
    },
    computed: {
      setHistory() {
        // this.setDom(this.$store.state.isHistory);
        // return this.$store.state.isHistory;
      },
    },
    watch: {
      url(v) {
        this.thaturl = v;
      },
      openitem(v) {
        this.thatExpanded = v;
      },
      currentnode(v) {
        this.thatCurrent = v;
      }, 
      openlist(v, v2) {
        if(!this.timer) {
          this.thatOpenlist = v;
          this.remberIndex = 0;
          if (v.length) {
            this.setpand();
          };
        }
      },
    },
    methods: {
      togleshow() {
          this.isTogoole = true;
      },
      toglehide() {
          this.isTogoole = false;
      },
      setpand() {
        let that = this;
        this.timer = setTimeout(function() {
          that.thatExpanded = [that.thatOpenlist[that.remberIndex]];
          that.remberIndex++;
          if (that.remberIndex != that.thatOpenlist.length) {
            that.setpand();
          } else {
            that.timer = null;
            clearTimeout(that.timer);
            that.$emit('slideDown');
          }
        }, 300)
      },
      setDom(res) {
        this.findNode(res);
      },
      loadNode(node, resolve) {
        // console.log(node);
        let that = this;
        if (node.level === 0) {
          return;
        }
        setTimeout(function() {
          if (node.data.type_icon == 6) {
            resolve([]);
            return;
          };
          that.axios({
              method: 'get',
              url: '/v1/trees/search-list',
              params: {'dept_id': node.data.nid, opt: 1}
          })
          .then(res => { //东方
              let needData = res.data;
              if (needData.code == 200) {
                  resolve(needData.data);
              } else {
                  that.$Message.error(needData.msg);
              }
          })
          .catch(err => {
              that.$Message.error('网络请求异常');
          });
        }, 200)
      },
      handleNodeClick(data) {
        let that = this;
        that.thatCurrent = data.nid;
        // that.$store.commit('setId', {id: data.nid});
        // this.$store.commit('setNode',{data: data});
        that.$emit('reflashList',{id: data.nid,data: data})
      },
      getIcon(data) {
        return 'tree-icons tree-icons-'+data.type_icon;
      },
      getStyle(data) {
        return data.deleteflag == 0 ? '' : 'history-model';
      },
      findNode(bool) {
        let obj = $('.history-model');
        obj.each(function(index, el) {
          if (bool) {
            $(el).closest('.el-tree-node').css('display','block');
          } else {
            $(el).closest('.el-tree-node').css('display','none');
          }
        });
      },
      renderContent(h, { node, data, store }) {
        // if (!this.setHistory) {
        //   if (data.deleteflag == 1) {node.visible = false; }
        // };
        if (!data.isParent) {
          node.isLeaf = true;
        };
        return (
          <span class={this.getStyle(data)}>
            <span>
              <span class={this.getIcon(data)}></span>
              <span>{node.label}</span>
            </span>
          </span>);
      },
      getTreeData() {
        let that = this;  
        console.log(that.thaturl, that.params);
        this.axios({
            method: 'get',
            url: that.thaturl,
            params: that.params,
        })
        .then(res => {
            let needData = res.data;
            console.log(needData);
            if (needData.code == 200) {
              needData.data.forEach(item => {
                that.lists.push(item);
              })
              that.$nextTick(function() {
                that.thatExpanded = [that.lists[0].nid];
                console.log(that.thatExpanded);
                that.thatCurrent = that.lists[0].nid;
                // that.$store.commit('setId', {id: that.lists[0].nid});
              })
            } else {
              that.$Message.error(needData.msg);
            }
        })
        .catch(err => {
            that.$Message.error('网络请求异常');
        }) 
      }
    },
    created() {
      this.getTreeData();
    },
    mounted() {
      // this.$emit('getnode', this.$refs.tree);
    },
  }
</script>
<style scoped>
  body,html,#app {
    width: 100%;
    height: 100%;
  }
  .el-tree-node>.el-tree-node__children {
    overflow: inherit;
    background-color: transparent;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 200px;
    /* margin: 15px; */
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
</style>
