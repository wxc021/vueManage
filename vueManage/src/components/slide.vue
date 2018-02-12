<template>
  <div :style="{'position': 'absolute',  'left' :0, 'top' : 0, 'right' : 0, 'bottom': 0}">
    <div class="tips-pop box-align start-box box-pack box-orient" v-show="thatistips">
        <div class="tips-icon" @mouseover="togleshow" @mouseout="toglehide">
            <transition name="togoole">
                <ul class="tips-dropdown-menu" v-if="isTogoole">
                    <li class="tips-dropdown-item start-box box-align" v-for="item in tipslist" :key="item.class">
                        <div :class="item.class" style="margin:0 10px;"></div>
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </transition>
        </div>
    </div>
    <div class="tree-scroller">
        <el-tree
          :data="lists"
          :props="defaultProps"
          node-key="nid"
          :default-expanded-keys="thatExpanded"
          :expand-on-click-node="false"
          accordion
          :load="loadNode"
          lazy
          :indent="30"
          ref="tree"
          :highlight-current="true"
          :current-node-key="thatCurrent"
          @node-click="handleNodeClick"
          :render-content="renderContent"></el-tree>
      </div>
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
  const units = [{name: '法人单位', class: 'unit-icons-1'},
    {name: '内设机构', class: 'unit-icons-2'},
    {name: '单位分组', class: 'unit-icons-3'},
  ];
  export default {
    name: 'slide',
    data() {
      return {
        show: true,
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
        allNodes: []
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
      loadUrl: {
        type: String,
        default: ''
      },
      openlist: {
        type: Array,
        default: function() {
          return [];
        }
      },
      unitType: {
        type: String,
        default: '1'
      },
      tipslist: {
        type: Array,
        default: function() {
          if (this.unitType == '1') {
            return tips;
          } else {
            return units;
          }
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
      },
      params2: {
        type: Object,
        default: function() {
          return {
            'dept_id': '',
            'statement_id': '',
          }
        }
      },
      setStatus: {
        type: Object,
        default: function() {
          return {}
        }
      },
      change: {
        type: String,
        default: function() {
          return '0';
        }
      },
      verify: {
        type: Number,
        default: function() {
          return 1;
        }
      },
      doing: {
          type: Boolean,
          default: function() {
              return true;
          }
      },
    },
    computed: {
      setHistory() {
        this.setDom(this.$store.state.isHistory);
        return this.$store.state.isHistory;
      },
    },
    watch: {
      change(v) {
        console.log(v)
      },
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
      setStatus(newD, oldD) {
        if (Object.keys(newD).length) {
          if (newD.type == 1) { // 添加
            // console.log(this.allNodes)
            this.searchNode(this.allNodes, newD.id, newD.type, newD.data)
          } else if(newD.type == 2) { //删除
            this.searchNode(this.allNodes, newD.id, newD.type)
          } else { // 删除+添加

          }
          
        };
      },
      verify(newD, oldD) {
        if(newD != oldD) {
          this.$nextTick(() => {
            console.log('verify');
            this.getTreeData();
          })
        }
      },
      doing(a, b) {
          if(a != b) {
              this.$nextTick(() => {
                  this.getTreeData();
              })
          }
      }
    },
    methods: {
      searchNode(obj, id, type, appendData) {
        console.log(appendData)
        let temp = Object.prototype.toString.call(obj);
        
        if ( temp === '[object Object]') {
            if (id != obj.data.nid) {
              this.searchNode(obj.childNodes, id, type);
            };
        } else if(temp === '[object Array]') {
            
            for (let i = 0; i < obj.length; i++) {
              if (id == obj[i].data.nid) {
                switch(parseInt(type)) {
                  case 1: 
                    let newChild = {
                      children:[],
                      deleteflag: "0",
                      isParent: false,
                      name: appendData.name,
                      nid: appendData ? appendData.nid : '',
                      num: "0",
                      open:"false",
                      type: appendData ? appendData.type : '',
                      type_icon: appendData ? appendData.type_icon : '',
                    }
                    if (!obj[i].data.children) {
                      this.$set(obj[i].data, 'children', [])
                    };
                    this.$nextTick(function() {
                      obj[i].data.children.push(newChild);
                      obj[i] = Object.assign(obj[i], {expanded: true,isLeaf: false })
                    })
                    break;
                  case 2: 
                    if (!(obj.length - 1)) {
                      obj[i].parent.isLeaf = true;
                    };
                    obj.splice(i,1);
                    break;
                  case 3: break;
                }
              } else if (id != obj[i].id && i == obj.length - 1) {
                for (let j = 0; j < obj.length; j++) {
                  this.searchNode(obj[j].childNodes, id)
                };
              }
            };
        }
      },
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
        let that = this;
        if (node.level === 0 || node.data.type_icon == 6) {
          resolve([])
          return;
        }
        let postData = {};
        if (this.unitType == '1') {
          postData = Object.assign({},{'dept_id': node.data.nid, opt: 1})
        } else {
          postData = Object.assign({},{'org_id': node.data.nid, opt: 1})
        }
        if(that.thaturl === '/v1/trees/report') {
          postData = Object.assign({},{'dept_id': node.data.nid, type_id: '1', year: '2017'})
        }
        if(that.thaturl === '/v1/trees/report-design') {
          postData = Object.assign({},{'dept_id': node.data.nid, 'statement_id': ''})
        }
          //'statement_id': 25,



        that.axios({
          method: 'get',
          url: that.thaturl,
          params: postData
        })
        .then(res => { 
          let needData = res.data;
          if (needData.code == 200) {
            resolve(needData.data);
          } else {
            resolve([]);
          }
        })
        .catch(err => {
          that.$Message.error('网络请求异常');
        });
      },
      handleNodeClick(data, node, tree) {
        let that = this;
        that.thatCurrent = data.nid;
        that.$store.commit('setId', {id: data.nid});
        this.$store.commit('setNode',{data: data});
        that.$emit('reflashList',{id: data.nid,data: data})
      },
      getIcon(data) {
        if (this.unitType == '1') {
          return 'tree-icons tree-icons-'+data.type_icon;
        } else {
          return 'tree-icons unit-icons-'+data.type_icon;
        }
      },
      setIcon(data) {
        return data.lock !== '' ?  data.lock === 'self' ? 'tree-icons set-lock' : '' : '';
      },
      setColor(data) {
        if(this.thaturl === '/v1/trees/report' || this.thaturl === '/v1/trees/report-design') {
          return data.lock !== '' ? 'lock-grey' : '';
        } else {
          return '';
        }
      },
      getStyle(data) {
        return data.deleteflag != 0 && data.type_icon == 5 ? 'history-model' : '';
      },
      findNode(bool) {
        let obj = $('.history-model');
        obj.each(function(index, el) {
          $(el).css('color','#ccc')
          if (bool) {
            $(el).closest('.el-tree-node').css('display','block');
          } else {
            $(el).closest('.el-tree-node').css('display','none');
          }
        });
      },
      renderContent(h, { node, data, store }) { 
        node.num = "";
        if (node.level == 1) {
          this.allNodes = node;
        };
        if (!data.isParent) {
          node.isLeaf = true;
        };
        if (!this.setHistory) {
          if (data.deleteflag != 0) {node.visible = false; }
        };
        if (data.num && data.num != "") {
          node.num = '（' + data.num + '）';
        }
        // console.log(node, data, store)
        return (
          <span class={this.getStyle(data)}>
            <span>
              <span class={this.setIcon(data)}></span>
              <span class={this.getIcon(data)}></span>
              <span class={this.setColor(data)}>{node.label}{node.num}</span>
            </span>
          </span>
          );
      },
      getTreeData() {
        //console.log(this.loadUrl, this.thaturl,456)
        let qs = require('qs');
        let that = this;
        this.axios({
            method: 'get',
            url: that.loadUrl ? that.loadUrl : that.thaturl,
            params: that.params,
        })
        .then(res => {
            let needData = res.data;
            if (needData.code == 200) {
                that.lists = [];
                needData.data.forEach(item => {
                  that.lists.push(item);
                })
                that.$nextTick(function() {
                  that.thatExpanded = [that.lists[0].nid];
                  that.thatCurrent = that.lists[0].nid;  
                })
                that.$store.commit('setId', {id: that.lists[0].nid});
                setTimeout(function(args) {
                  that.$nextTick(function() {
                    that.findNode(false)
                  })
                },300)
                
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
      this.$emit('getnode', this.$refs.tree);
    },
  }
</script>
<style>
  body,html,#app {
    width: 100%;
    height: 100%;
  }
  .el-tree-node {
    background: #fff;
  }
  /* .el-tree-node>.el-tree-node__children {
    overflow: inherit !important;
    background-color: transparent;
  } */
  .lock-grey {
    color: #ccc;
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
  .el-tree-node__content{
    display: inline-block;
    min-width: 100%;
  }
  .el-tree-node__expand-icon {
    width: 14px !important;
    height: 14px !important;
    border-width: 7px !important;
    border-left-width: 7px !important;
  }
  /* .el-tree-node__expand-icon {
    width: 12px !important;
    height: 12px !important;
    position: relative;
    border: 1px solid #bbb !important;
    margin-top: -2px !important;
    border-left-width: 1px !important;
    border-left-color: #bbb !important;
  }
  .el-tree-node__expand-icon:before, .el-tree-node__expand-icon:after {
    content:'';
    width: 8px;
    height: 1px;
    background: #bbb;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
  .el-tree-node__expand-icon:after {
    -ms-transform: translate(-50%, -50%) rotate(90deg);
    transform: translate(-50%, -50%) rotate(90deg);
  }
  .el-tree-node__expand-icon.expanded:before {
    transform: none;
    -webkit-transform: none;
    width: 0;
    height: 0;
  }
  .el-tree-node__expand-icon.is-leaf {
    border: none !important;
  } */
  /* .el-tree-node__expand-icon.is-leaf:after,.el-tree-node__expand-icon.is-leaf:before {
    width: 0;
    height: 0;
  } */
  /* .el-tree-node__expand-icon:hover {
    border: 1px solid #bbb;
  } */
  .el-tree-node {
    position: relative;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #d0e7ff;
  }
  /*.line-line {
    position: absolute;
    width: 1px;
    height: 100%;
    background: #bbb;
    top: 0px;
  }*/
  .history-model {
    color: #ccc;
  }
  .tree-scroller{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
</style>
