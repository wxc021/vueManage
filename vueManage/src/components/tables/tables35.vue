<template>
    <div class="tables tables-auto">
        <div class="title text-center">
           <h3 class="text-center wxc-table-style-title">非公有经济控制的企业法人单位建立党的基层组织情况</h3>
           <p>截至日期：2017年12月31日</p>
        </div>
        
        <div class="start-box box-pack" style="position: relative; top: -16px;">
            <p class="wxc-table-style-name">填报单位：天房科技党总支</p>
            <p>第二十七表</p>
        </div>
        <div class="table-outer" style="margin-top: -10px;">
            <table align=center cellspacing=0 cellpadding=0>
                  <tr class="innerpadding">
                        <td width="280" colspan="4" rowspan="3" style="height:150px;">项目</td>
                        <td class="bb0" colspan="2" style="height:24px;"></td>
                        <td colspan="4" style="height:24px;"></td>

                        <td style="height:24px;" class="bb0 br0"></td>
                        <td colspan="3" style="height:24px;"></td>

                        <td style="height:24px;" class="br0 bb0"></td>
                        <td style="height:24px;"></td>

                        <td style="height:24px;" class="br0 bb0"></td>
                        <td style="height:24px;"></td>
                  </tr>
                  <tr class="innerpadding">
                      <td rowspan="2" colspan="2" class="bl0">总数</td>

                      <td style="height:24px;" class="bb0 br0"></td>
                      <td style="height:24px;"></td>
                      <td style="height:24px;" class="bb0 br0"></td>
                      <td style="height:24px;"></td>


                      <td rowspan="2">私有经济控制</td>
                      <td rowspan="2">私营独资</td>
                      <td rowspan="2">港澳台商投资</td>
                      <td rowspan="2">外商投资</td>
                      <td rowspan="2">港澳台商经济控制</td>
                      <td rowspan="2">港澳台商独资</td>
                      
                      <td rowspan="2">外商经济控制</td>
                      <td rowspan="2">外商独资</td>

                  </tr>
                  <tr  class="innerpadding">
                     <td class="bl0">从业人员50人以上企业</td>   
                     <td>从业人员100人以上企业</td>   
                     <td>法定代表人是党员的</td>   
                     <td style="border-right-width:1px;">兼任企业党组织书记的</td>   
                  </tr>

                  <tr class="comm-style">
                       <td colspan=4>甲</td>
                       <td width="70" colspan="2">A</td>
                       <td width="70">B</td>
                       <td width="70">C</td>
                       <td width="70">D</td>
                       <td width="70">E</td>
                       <td width="70">F</td>
                       <td width="70">G</td>
                       <td width="70">H</td>
                       <td width="70">I</td>
                       <td width="70">J</td>
                       <td width="70">K</td>
                       <td width="70">L</td>
                       <td width="70">M</td>
                  </tr>

                  <tr v-for="(item,index) in tablesData">

                    <td :class="{'justify': true}" v-if="item.type == 1" width="40" class="bb0 br0"></td>
                    <td :class="{'justify': true}" v-if="item.type == 1" colspan=3 class="text-left">{{item.label}}</td>

                    <td :class="{'justify': true}" v-if="item.type == 11" colspan=4 class="text-left">{{item.label}}</td>

                    <td :class="{'justify': true}" v-if="item.type == 22" width="40"></td>
                    <td :class="{'justify': true}" v-if="item.type == 22" colspan=3 class="text-left">{{item.label}}</td>

                    <td :class="{'justify': true}" v-if="item.type == 2" rowspan="4"></td>
                    <td :class="{'justify': true}" width="40" v-if="item.type == 2" class="bb0 br0"></td>
                    <td :class="{'justify': true}" v-if="item.type == 2" class="text-left">{{item.label}}</td>
      
                    <td style="border-bottom-width:2px;" :class="{'justify': true}" v-if="item.type == 3" rowspan="7">{{item.title}}</td>
                    <td :class="{'justify': true}" colspan=3  v-if="item.type == 3" style="border-left: 0px;">{{item.label}}</td>


                    <td :class="{'justify': true}" v-if="item.type == 88" width="40" class="bb0 br0 bl0"></td>
                    <td :class="{'justify': true}" colspan=2  v-if="item.type == 88" style="border-left: 0px;">{{item.label}}</td>


                    <td :class="{'justify': true}" v-if="item.type == 6" width="40" class="bb0 bl0"></td>
                    <td :class="{'justify': true}" colspan=2  v-if="item.type == 6" style="border-left: 0px;">{{item.label}}</td>
                        
                    <td :class="{'justify': true}" v-if="item.type == 9" width="40" class="bb0 bl0"></td>
                    <td :class="{'justify': true}" v-if="item.type == 9" width="40" class="bb0 bl0 br0"></td>
                    <td :class="{'justify': true}" v-if="item.type == 9" style="border-left: 0px;">{{item.label}}</td>

                    <td :class="{'justify': true}" v-if="item.type == 10" width="40" class="bl0"></td>
                    <td :class="{'justify': true}" v-if="item.type == 10" width="40" class="bl0"></td>
                    <td :class="{'justify': true}" v-if="item.type == 10" style="border-left: 0px;">{{item.label}}</td>

                    
                    <td :class="{'justify': true}" v-if="item.type == 33" width="40" class="bb0"></td>
                    <td :class="{'justify': true}" v-if="item.type == 33" colspan="3" style="border-left: 0px;">{{item.label}}</td>

                    <td width="50" :class="{'justify': true}"  v-if="item.type == 4" rowspan="3">{{item.title}}</td>
                    <td :class="{'justify': true}"  v-if="item.type == 4" colspan="3">{{item.label}}</td>

                    <td :class="{'justify': true}"  v-if="item.type == 44" rowspan="2">{{item.title}}</td>
                    <td :class="{'justify': true}"  v-if="item.type == 44" colspan="3">{{item.label}}</td>

                    <td width="50" :class="{'justify': true}" style="border-top:1px solid #222;"  v-if="item.type == 7" rowspan="3">{{item.title}}</td>
                    <!-- <td style="width:20px;" class="bb0 br0" v-if="item.type == 7"></td> -->
                    <td :class="{'justify': true}" colspan="3" v-if="item.type == 7">{{item.label}}</td>

                    <td :class="{'justify': true}" v-if="item.type == 13" width="40" class="bb0 bl0 br0"></td>
                    <td :class="{'justify': true}" v-if="item.type == 13" colspan="2" style="border-left: 0px;">{{item.label}}</td>

                    <td :class="{'justify': true}" v-if="item.type == 14" width="40" class="bl0"></td>
                    <td :class="{'justify': true}" v-if="item.type == 14" colspan="2" style="border-left: 0px;">{{item.label}}</td>

                    
                    <td :class="{'justify': true}" v-if="item.type == 5" colspan="3" class="bl0">{{item.label}}</td>
                    
                    <td width="40" class="comm-reset">{{index+1}}</td>
                    <td width="60" v-for="(inner, inx) in item.lists">
                        <input  v-if="inner.disabled"  type="text" :disabled="inner.disabled" :class="{'yellow2': inner.isYellow}" v-model="inner.value" :style="{'color': inner.disabled ? '#111' : inner.class, 'backgroundColor': (index == 0 || inx == 0) || ((index == 12 || index == 13) && inx == 4 && inner.value != '--') ? '#88e1fe' : ((index == 1 || index > 13 || index == 11 ) && inner.value != '--') || ((index > 1 && index < 14 && inx < 5) && inner.value != '--') ? '#ffce9a' : '' }">
                        <input v-if="!inner.disabled" type="text" :disabled="inner.newDis" :class="{'yellow2': inner.isYellow}" v-model="inner.value" :style="{'color': inner.disabled ? '#111' : inner.class, 'backgroundColor': (index == 0 || inx == 0) || ((index == 12 || index == 13) && inx == 4 && inner.value != '--') ? '#88e1fe' : ((index == 1 || index > 13 || index == 11) && inner.value != '--') || ((index > 1 && index < 14 && inx < 5) && inner.value != '--') ? '#ffce9a' : '' }">
                    </td>
                  </tr>
              </table>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
	export default {
		name: 'form1',
		data() {
			return {
                msg: 'this is table',
                tablesData: [
                    {type: 11,title: '', label: '单位数', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 22,title: '', label: '党建工作指导员联系的', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 4,title: '已单独建立党组织', label: '建立党委的', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 5,title: '', label: '建立总支部的', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 5,title: '', label: '建立支部的', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 1,title: '', label: '已建立联合党支部的', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 33,title: '', label: '具有3名以上党员的', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 33,title: '', label: '联合党支部数', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 7,title: '未建立党组织', label: '应建尚未建立党组织的', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 5,title: '', label: '仅有个别党员的', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 5,title: '', label: '没有党员的', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 3,title: '补充情况', label: '党建工作指导员', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 88,title: '', label: '在岗职工', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 6,title: '', label: '党员', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 9,title: '', label: '已建立党组织的企业在岗职工', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 10,title: '', label: '党员', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 13,title: '', label: '未建立党组织，已派出党建指导员的企业在岗职工', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                    {type: 14,title: '', label: '党员', calc: '', disabled: false, bgcolor: "#222", lists:[]},
                ],
                orignData: {},
                lists: [], 
                colors: [],
                footers: [],
                footerVal: [
                    {
                        key: 'FOOTER1',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                ],
                origin: {},
			}
		},
        props: {
            orders: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            remberData: {
                type: Object,
                default: function() {
                    return {
                        remberType: '',
                        remberYear: ''
                    }
                }
            },
            setNull: {
                type: Boolean,
                default: function() {
                    return false;
                }
            }
        },
        computed: {
            remberStat() {
                return this.$store.state.remberStatus;
            },
            nullStatus() {
                return this.setNull;
            }
        },
		watch: {
            'orders' (newD, oldD) {
                if (newD != oldD) {
                    this.todo(newD)
                };
            },
            'remberStat' (newD, oldD) {
                if (!newD) {
                    // 录改
                    for (let i = 0; i < this.origin.length; i++) {
                        this.origin[i].lists.forEach((item, index) => {
                            if (!item.disabled) {
                                if (item.newDis == true) {
                                    this.origin[i].lists[index].newDis = false;
                                };
                            };
                        })
                    };
                    this.footerVal.forEach((item, index) => {
                        if (item.disabled) {
                            this.footerVal[index].disabled = false;
                        };
                    })
                } else {
                    //取消
                    for (let i = 0; i < this.origin.length; i++) {
                        this.origin[i].lists.forEach((item, index) => {
                            if (!item.disabled) {
                                if (item.newDis == false) {
                                    this.origin[i].lists[index].newDis = true;
                                    if (this.origin[i].lists[index].orignValue != this.origin[i].lists[index].value) {
                                        this.origin[i].lists[index].value = this.origin[i].lists[index].orignValue;
                                    };
                                };
                            };
                        })
                    };
                    
                    this.footerVal.forEach((item, index) => {
                        if (!item.disabled) {
                            this.footerVal[index].disabled = true;
                            if (this.footerVal[index].orignValue != this.footerVal[index].value) {
                                this.footerVal[index].value = this.footerVal[index].orignValue;
                            };
                        };
                    })
                }
            },
            '$route' () {
                this.init();
            },
            nullStatus(n, o) {
               console.log(n, o)
            }
		},
		methods: {
            //初始化
            init() {
                let that = this;
                const count = 13;

                this.orignData = Object.assign({}, JSON.parse(localStorage.getItem('formData')))
                // 第一步填数据
                this.tablesData.forEach((item, index) => {
                    this.tablesData[index].lists = Object.assign([], this.splitData(index));  
                })


                // 第二步设置颜色 和 状态
                for (let i = 0; i < this.tablesData.length; i++) {
                    that.tablesData[i].lists.forEach((item, index) => {
                        that.tablesData[i].lists[index].disabled = that.splitData2(i)[index] == 2 ? true : false;
                        that.tablesData[i].lists.isYellow = that.splitData2(i)[index] == 1 ? true : false;
                    })
                };

                //设置禁用
                that.tablesData[8].lists[4] = Object.assign(that.tablesData[8].lists[4], {disabled: true, value: '--', originValue: '--'});
                that.tablesData[9].lists[4] = Object.assign(that.tablesData[9].lists[4], {disabled: true, value: '--', originValue: '--'});
                that.tablesData[10].lists[4] = Object.assign(that.tablesData[10].lists[4], {disabled: true, value: '--', originValue: '--'});
                that.tablesData[10].lists[3] = Object.assign(that.tablesData[10].lists[3], {disabled: true, value: '--', originValue: '--'});
                that.tablesData[16].lists[4] = Object.assign(that.tablesData[16].lists[4], {disabled: true, value: '--', originValue: '--'});
                that.tablesData[17].lists[4] = Object.assign(that.tablesData[17].lists[4], {disabled: true, value: '--', originValue: '--'});

                

                // 获取footer 数据
                this.footers = [];
                for(let its in this.orignData.list) {
                    if ( /footer/ig.test(its) ) {
                        this.footers.push({
                            key: its,
                            value: this.orignData.list[its],
                            orignValue: this.orignData.list[its],
                            class: '',
                            disabled: true,
                        });
                    };
                }

                //footer 数据填充 
                this.footers.forEach((item, index) =>  {
                    let temp = item.key.split('FOOTER')[1] - 1;
                    this.$set(this.footerVal, temp, Object.assign({}, item) )
                })

                //当未直通和清空后没有footer字段, 重置数据
                if (this.footers.length == 0) {
                    this.footerVal.forEach(item => {
                        item.value = '';
                        item.orignValue = '';
                    })
                };

                //数据处理完毕 需要保存一份本地的原始数据 用来watch
                this.origin = Object.assign([], this.tablesData);

                // 定义多个watch 检测数据改动
                for (let k = 0; k < this.origin.length; k++) {
                    this.$watch(function() {
                        return this.origin[k].lists;
                    }, function(newV, oldV) {  
                        that.checkDuty(newV, k);
                    }, {deep: true}) 
                };

                this.$watch('origin', function(newV, oldV) {

                    for (let i = 0; i < 13; i++) {
                        let temp = 0;
                        for (let j = 2; j < 11; j++) {
                          if (j != 6 && j != 7) {
                            let tp = this.origin[j].lists[i].value == "" || this.origin[j].lists[i].value == "--" ? 0 : this.origin[j].lists[i].value; 
                            temp += parseInt(tp);
                          };
                        }   
                        this.origin[0].lists[i].value = temp;
                    };
                    for (let i = 1; i < 18; i++) {
                      let tp1 = this.origin[i].lists[5].value == '' || this.origin[i].lists[5].value == '--' ? 0 : this.origin[i].lists[5].value;
                      let tp2 = this.origin[i].lists[9].value == '' || this.origin[i].lists[9].value == '--' ? 0 : this.origin[i].lists[9].value;
                      let tp3 = this.origin[i].lists[11].value == '' || this.origin[i].lists[11].value == '--' ? 0 : this.origin[i].lists[11].value;
                      this.origin[i].lists[0].value = parseInt(tp1)+parseInt(tp2)+parseInt(tp3);
                    };
                    for (let i = 0; i < this.origin.length; i++) {
                        if (this.origin[i].calc) {
                            eval(this.origin[i].calc)
                        };
                    };
                },{deep: true});

                //监测 footers 数据
                this.$watch('footerVal', function(newV, oldV) {
                    newV.forEach((item, index) => {
                        that.footerVal[index].class = item.orignValue != item.value ? 'red' : '';
                    })
                }, {deep: true})
            },
            // 修改后的数据 提交前的处理
            dealData(origin, footer) {
                let tempArr = [], postJson = {};
                for (let i = 0; i < origin.length; i++) {
                    origin[i].lists.forEach((item, index) => {
                        //能修改的才是我们需要的数据
                        if (!item.disabled && item.value != item.orignValue) {
                            tempArr.push(Object.assign(item, {index: i+1} ))
                        };
                    })
                };
                tempArr.forEach((item, index) => {
                    let key = String.fromCharCode(item.key)+item.index;
                    postJson[key] = item.value;
                })
                footer.forEach((item, index) => {
                    if (item.value != item.orignValue) {
                        postJson[item.key] = item.value;
                    };
                })
                return JSON.stringify(postJson);
            },
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
            //保存修改后的数据
            saveEdit() {
                let that = this;
                let postData = {
                    dept_id: this.$store.state.remberId, 
                    year: '2017', 
                    type_id: '1', 
                    form_id: this.$route.name.split('-')[1], 
                    data: this.dealData(this.origin, this.footerVal)
                };
                this.$store.commit('setStatus', {stat: true}) 
                this.ajax('post', '/v1/report/edit', postData)
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        this.$Message.success('录改成功');
                        this.detailContent();
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            todo(item) {
                let that = this;
                let postData = {
                    dept_id: this.$route.query.id ? this.$route.query.id : this.$store.state.remberId,
                    year: '2017',
                    type_id: this.remberData.remberType ? this.remberData.remberType : 1,
                    form_id: this.$route.name.split('-')[1]
                }
                switch(parseInt(item.type)) {
                    //清空报表
                    case 1: 
                        if (item.value == 1) {
                            this.ajax('post', '/v1/report/clear', postData)
                            .then(res => {
                                let needData = res.data;
                                if (needData.code == 200) {
                                    this.$Message.success('清空成功');
                                    this.detailContent();
                                } else {
                                    that.$Message.error(needData.msg);
                                }
                            })
                            .catch(err => {
                                this.$Message.error('网络请求异常');
                            })
                        };
                        break;
                    //报表直统
                    case 2: 
                        if (item.value == 1) {
                            this.ajax('post', '/v1/report/pull', postData)
                            .then(res => {
                                let needData = res.data;
                                if (needData.code == 200) {
                                    this.$Message.success('直统成功');
                                    this.detailContent();
                                } else {
                                    that.$Message.error(needData.msg);
                                }
                            })
                            .catch(err => {
                                this.$Message.error('网络请求异常');
                            })
                        };
                        break;
                    //报表汇总
                    case 3: 
                        if (item.value == 1) {
                            this.ajax('post', '/v1/report/sum', postData)
                            .then(res => {
                                let needData = res.data;
                                if (needData.code == 200) {
                                    this.$Message.success('汇总成功');
                                    this.detailContent();
                                } else {
                                    that.$Message.error(needData.msg);
                                }
                            })
                            .catch(err => {
                                this.$Message.error('网络请求异常');
                            })
                        };
                        break;
                    break;
                    //报表校核
                    case 4: //console.log('报表校核'); 
                    break;
                    //打印
                    case 5: console.log('打印'); break;
                    //导出
                    case 6: console.log('导出'); break;
                    //上所解锁
                    case 7: 
                         break;
                    //开始录改
                    case 8: 
                        if (item.status) {
                            // 数据刷新 或者还原 
                            this.origin.forEach((item, index) => {
                                that.origin[index].newDis = false;
                            })
                        } else {
                            //启用可编辑的数据
                            this.origin.forEach((item, index) => {
                                that.origin[index].newDis = false;
                            })
                        }
                        break;
                    //保存报表
                    case 9: 
                        this.saveEdit();
                        break;
                    default: return;
                }
            },
            sortF(arr) {
                return arr.sort(function(a, b) {
                    return a.key-b.key;
                })
            },
            //查找行数据
            getList(id) {
                let temp = [];
                for(let it in this.orignData.list) {
                    if ( new RegExp( String.fromCharCode(id+65) ).test(it) ) {
                        temp.push({
                            disabled: false,
                            value: it,
                            key: it.substring(1)
                        });
                    };
                }
                return this.sortF(temp);
            },

            //查找列数据
            splitData(id) {
                let temp = [];
                for(let it in this.orignData.list) {
                    if ( parseInt(it.split(it[0])[1]) == parseInt(id)+1 ) {
                        temp.push({
                            disabled: false,
                            value: this.orignData.list[it],
                            orignValue: this.orignData.list[it],
                            key: it.charAt(0).charCodeAt(0),
                            class: '',
                            newDis: true
                        });
                    };
                }
                // 找出每一行缺失的数据
                if(temp.length < 13) {
                    for (let i = 65; i < (65+13); i++) {
                        let bool = temp.some((item) => {
                            return item.key == i;
                        })
                        if (!bool) {
                            temp.push({
                                disabled: false,
                                value: '',
                                orignValue: '',
                                key: i,
                                class: '',
                                newDis: true
                            })
                        };  
                    };
                }
                return this.sortF(temp);
            },

            //查找列数据
            splitData2(id) {
                let temp = [];
                for(let it in this.orignData.color) {
                    if ( parseInt(it.split(it[0])[1]) == parseInt(id)+1 ) {
                        temp.push(this.orignData.color[it]);
                    };
                }
                return temp;
            },

            //脏数据检测
            checkDuty(duty, k) {
                let that = this;
                for (let i = 0; i < duty.length; i++) {
                    if (duty[i].orignValue != duty[i].value) {
                        that.setColor(k, i, true)
                    } else {
                        that.setColor(k, i, false)
                    }
                };
            },

            // 脏数据 设置颜色
            setColor(k, i, duty) {
                if (duty) {
                    this.origin[k].lists[i].class = 'red';
                } else {
                    this.origin[k].lists[i].class = '';
                }
            },

            //执行计算表达式
            calcF() {
                this.origin.forEach((item, index) => {
                    if (item.calc) {
                        eval(item.calc)
                    };
                })
            },

            // 报表详情接口 
            detailContent() {
                let that = this;
                let qs = require('qs');
                this.axios({
                    method: 'post',
                    url: '/v1/report/detail',
                    data: qs.stringify({
                        year: '2017',
                        type_id: this.remberData.remberType ? this.remberData.remberType : 1,
                        dept_id: this.$route.query['id'],
                        form_id: this.$route.name.split('-')[1] ? this.$route.name.split('-')[1] : 1
                    })
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        localStorage.setItem('formData', JSON.stringify(needData.data));
                        that.init();
                    } else {

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
            this.detailContent();
	    },
	}
</script>
<style scoped>
    .justify {
        text-align:justify;
        text-justify:inter-word;
        text-align-last:justify;
        padding: 0 10px;
    }
    .table-outer {
        width: 100%;
        /*overflow: auto; */
    }
    .tips.box-flex input{
      outline: none;
      border: none;
      border:1px solid #333;
      text-align: center;
    }
    table tr:first-child td{
        border-top: 1px solid #222;
    }
    table tr td{
        border-bottom: 1px solid #222;
        border-right: 1px solid #222;
        text-align: center;
        height: 28px;
    }
    table tr td input {
        border: none;
        width: 100%;
        height: 100%;
        text-align: center;
        outline: none;
    }
    table tr td:first-child {
        border-left: 1px solid #222;
    }
    table tr td:first-child.bl0{
      border-left:0;
    }
    .tips-outer {
        margin-top: 15px;
    }
    .tips input {
        width: 60px;
        height: 22px;
        margin: 0 3px;
    }
    .tips p {
        line-height: 32px;
    }
    .tables-containter div {
        text-align: center;
    }
    .comm-left {
        width: 120px;
        border: 1px solid #222;
        border-width: 0 1px 0 0;
        height: 100%;
    }
    .wh100 {
        width: 100%;
        height: 100%;
        display: block;
    }
    .text-left{
      text-align: left;
    }
    .br0{
      border-right: 0;
    }
    .bb0{
      border-bottom: 0 !important;
    }
    .bl0{
      border-left: 0;
    }
    .bt0{
      border-top: 0;
    }
    .text-index{
      text-indent: 5px;
    }
    .tables-containter {
        border: 1px solid #222;
    }
    .tables-header {
        height: 60px;
    }
    .header-top {
        height: 40px;
        border-bottom: 1px solid #222;
        line-height: 40px;
    }
    .header-bottom {
        height: 20px;
        line-height: 20px;
        border-bottom: 1px solid #222;
    }
    .bg-class1{
      background: #88e1fe;
      color: #111;
    }
    .bg-class2{
      background: #fff;
    }
    .bg-class3{
      background: #ffce9a;
    }

    .yellow {
        background: #FFF4EE;
        border: none;
        outline: medium;
        border: 1px solid #ccc;
    }
    .yellow2 {
        background: #ffce9a;
        border: none;
        outline: medium;
    }
    .color-red {
        color: red !important;
    }
    .innerpadding td{
      padding: 0 9px;
    }
    table tr:first-child td{
        border-top: 2px solid #222;
    }
    table tr:last-child td{
        border-bottom: 2px solid #222;
    }
    table tr td:first-child {
        border-left: 2px solid #222;
    }
    table tr td:last-child {
        border-right: 2px solid #222;
    }
</style>
