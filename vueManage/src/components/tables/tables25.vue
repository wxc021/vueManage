<template>
    <div class="tables tables-auto">
        <div class="title text-center">
           <h3 class="text-center wxc-table-style-title">发展对象情况</h3>
           <p>截至日期：2017年12月31日</p>
        </div>
        
        <div class="start-box box-pack" style="position: relative; top: -16px;">
            <p class="wxc-table-style-name">填报单位：天房科技党总支</p>
            <p>第十八表</p>
        </div>
        <div class="table-outer" style="margin-top: -10px;">
            <table align=center cellspacing=0 cellpadding=0 width="100%">
                <tr>
                    <td  class="justify" style="padding: 0 30px;" width="140" colspan=3 rowspan=3>项目</td>
                    <td style="border-right: none;border-bottom: none;" colspan=2></td>
                    <td style="border-right: 2px solid #222;" colspan=9></td>
                </tr>
                <tr>
                    <td  class="justify" style="border-left:none;width:60px;" rowspan=2 colspan=2>总数</td>
                    <td width="60" rowspan=2>女</td>
                    <td width="60" rowspan=2>少数<br>名族</td>
                    <td width="60" rowspan=2>35岁<br>及以下</td>    
                    <td width="60" rowspan=2>大专及<br>以上学历</td>
                    <td width="60" rowspan=2>中专、高中、中技学历</td>
                    <td width="60" style="border: none;"></td>
                    <td width="60" colspan=3></td>
                </tr>
                <tr>
                    <td width="60" style="border-left:0px;">生产、工作第一线</td>
                    <td width="60">企业生产第一线</td>
                    <td width="60">农村生产第一线</td>
                    <td width="60">教学科研第一线</td> 
                </tr>
                <tr class="comm-style">
                   <td colspan=3>甲</td> 
                   <td></td>
                   <td width="120">A</td>
                   <td>B</td>
                   <td>C</td>
                   <td>D</td>
                   <td>E</td>
                   <td>F</td>
                   <td>G</td>
                   <td>H</td>
                   <td>I</td>
                   <td>J</td>
                </tr>
                <tr  v-for="(item, index) in tablesData">

                    <td  class="justify" colspan=3 v-if="item.type == 1">{{item.label}}</td>

                    <td  class="justify" width='20' v-if="item.type == 3"></td>
                    <td  class="justify" colspan=2 v-if="item.type == 3">{{item.label}}</td>
                    
                    <td  class="justify" width='20'  v-if="item.type == 2" rowspan=7>{{item.title}}</td>
                    <td  class="justify" colspan=2  v-if="item.type == 2">{{item.label}}</td>

                    <td  class="justify" width='20'  v-if="item.type == 7" rowspan=8>{{item.title}}</td>
                    <td  class="justify" colspan=2  v-if="item.type == 7">{{item.label}}</td>
                    
                    <td  class="justify"  v-if="item.type == 4" style="border-left: none;" colspan=2>{{item.label}}</td>
                    
                    <td  class="justify" v-if="item.type == 5" width="20" style="border:none;"></td>
                    <td  class="justify" v-if="item.type == 5" style="border-left: none;">{{item.label}}</td>
                    
                    <td  class="justify" v-if="item.type == 6" width="20" style="border-left: none;"></td>
                    <td  class="justify" v-if="item.type == 6" style="border-left: none;">{{item.label}}</td>

                    <td class="comm-reset" width=30>{{index+1}}</td>

                    <td width="78" v-for="(inner, inx) in item.lists">
                        <input  v-if="inner.disabled"  type="text" :disabled="inner.disabled" :class="{'yellow2': inner.isYellow}" v-model="inner.value" :style="{'color': inner.disabled ? '#111' : inner.class, 'backgroundColor': (index == 0 || index == 1 || index == 2 || index == 10 ) && inner.value != '--' ? '#88e1fe' : (index == 9 || index == 16 || index == 18) && inner.value != '--' ? '#ffce9a' : '' }">
                        <input v-if="!inner.disabled" type="text" :disabled="inner.newDis" :class="{'yellow2': inner.isYellow}" v-model="inner.value" :style="{'color': inner.disabled ? '#111' : inner.class, 'backgroundColor': (index == 0 || index == 1 || index == 2 || index == 10)  && inner.value != '--' ? '#88e1fe' : (index == 9 || index == 16 || index == 18) && inner.value != '--' ? '#ffce9a' : '' }">
                    </td>
                    
                </tr>  
            </table>
            <div class="tips-outer start-box">
                <p>补充资料：</p>
                <div class="tips box-flex wxc-table-style-footer">
                    <p>截至2016年底，共有农民工发展对象<input type="text" :disabled="footerVal[0].disabled" :style="{color: footerVal[0].class,'backgroundColor':'#ffce9a'}" v-model="footerVal[0].value" class="yellow">名，其中女性<input type="text" class="yellow" :disabled="footerVal[1].disabled" :style="{color: footerVal[1].class,'backgroundColor':'#ffce9a'}" v-model="footerVal[1].value">名，35岁及以下的<input type="text" class="yellow" :disabled="footerVal[2].disabled" :style="{color: footerVal[2].class,'backgroundColor':'#ffce9a'}" v-model="footerVal[2].value">名，大专及以上学历的<input type="text" :disabled="footerVal[3].disabled" :style="{color: footerVal[3].class,'backgroundColor':'#ffce9a'}" v-model="footerVal[3].value" class="yellow">名。</p>  
                </div>
            </div>
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
                    {type: 1,title: '', label: '总计',  disabled: false, calc: 'for (let i = 0; i < 10; i++) {let tp1 = this.origin[1].lists[i].value == "" || this.origin[1].lists[i].value == "--" ? 0 : this.origin[1].lists[i].value; let tp2 = this.origin[17].lists[i].value == "" || this.origin[17].lists[i].value == "--" ? 0 : this.origin[17].lists[i].value; let tp3 = this.origin[19].lists[i].value == "" || this.origin[19].lists[i].value == "--" ? 0 : this.origin[19].lists[i].value; let tp4 = this.origin[20].lists[i].value == "" || this.origin[20].lists[i].value == "--" ? 0 : this.origin[20].lists[i].value; let tp5 = this.origin[21].lists[i].value == "" || this.origin[21].lists[i].value == "--" ? 0 : this.origin[21].lists[i].value; let tp6 = this.origin[22].lists[i].value == "" || this.origin[22].lists[i].value == "--" ? 0 : this.origin[22].lists[i].value; this.origin[0].lists[i].value = parseInt(tp1) + parseInt(tp2)+ parseInt(tp3)+ parseInt(tp4)+ parseInt(tp5)+ parseInt(tp6)}', bgcolor: "#222", lists: []},

                    {type: 1,title: '', label: '一、在岗职工', calc: 'for (let i = 0; i < 10; i++) {let tp1 = this.origin[2].lists[i].value == "" || this.origin[2].lists[i].value == "--" ? 0 : this.origin[2].lists[i].value; let tp2 = this.origin[10].lists[i].value == "" ||  this.origin[10].lists[i].value == "--" ? 0 : this.origin[10].lists[i].value; this.origin[1].lists[i].value = parseInt(tp1) + parseInt(tp2)}', disabled: false, bgcolor: "#222", lists: []},

                    {type: 7,title: '公共制单位', label: '合计', calc: 'for (var i = 0; i < 10; i++) { let temp = 0; if (i == 0) { for (let j = 3; j < 9; j++) { let ii = this.origin[j].lists[i].value == "" || this.origin[j].lists[i].value == "--" ? 0 : this.origin[j].lists[i].value; temp += parseInt(ii)}  } else { for (let j = 3; j < 8; j++) { let jj = this.origin[j].lists[i].value == "" || this.origin[j].lists[i].value == "--" ? 0 : this.origin[j].lists[i].value; temp += parseInt(jj) }  } this.origin[2].lists[i].value = temp }', disabled: false, bgcolor: "#222", lists: []},

                    {type: 4, title: '', label: '党政机关工作人员', calc: '',  disabled: false, bgcolor: "#222", lists: []},
                    {type: 4, title: '', label: '事业单位管理人员', calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 4, title: '', label: '事业单位专业技术人员', calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 4, title: '', label: '企业管理人员', calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 4, title: '', label: '企业专业技术人员', calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 5, title: '', label: '工勤技能人员', calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 6, title: '', label: '农民工',  calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 2,title: '非公有制单位', label: '合计', calc:'for (var i = 0; i < 10; i++) { let temp = 0; for (let j = 11; j < 16; j++) {let tp = this.origin[j].lists[i].value == "" || this.origin[j].lists[i].value == "--" ? 0 : this.origin[j].lists[i].value; temp += parseInt(tp) } this.origin[10].lists[i].value = temp }', disabled: false, bgcolor: "#222", lists: []},
                    {type: 4, title: '', label: '企业管理人员', calc: '', disabled: false, bgcolor: "#222", lists: []}, 
                    {type: 4, title: '', label: '企业专业技术人员', calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 4, title: '', label: '民办非企业 单位管理人员', calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 4, title: '', label: '民办非企业 专业技术人员', calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 5, title: '', label: '工勤技能人员', calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 6, title: '', label: '农民工',  calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 1, title: '', label: '二、农牧渔民',  calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 3, title: '', label: '外出务工经商人员',  calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 1, title: '', label: '三、军人、武警',  calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 1, title: '', label: '四、学 生', calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 1, title: '', label: '五、离退休人员',  calc: '', disabled: false, bgcolor: "#222", lists: []},
                    {type: 1, title: '', label: '其它', calc: '', disabled: false, bgcolor: "#222", lists: []},
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
                    {
                        key: 'FOOTER2',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER3',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER4',
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
                const count = 10;

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
                

                // 设置禁用表格 没有规律
                for (let i = 6; i < 10; i++) {
                    that.tablesData[20].lists[i] = Object.assign(that.tablesData[20].lists[i], {disabled: true, value: '--', originValue: '--'});
                    that.tablesData[21].lists[i] = Object.assign(that.tablesData[21].lists[i], {disabled: true, value: '--', originValue: '--'});
                    if (i != 6) {
                        that.tablesData[22].lists[i] = Object.assign(that.tablesData[22].lists[i], {disabled: true, value: '--', originValue: '--'});
                    };
                    if (i != 6 && i != 9) {
                        that.tablesData[19].lists[i] = Object.assign(that.tablesData[19].lists[i], {disabled: true, value: '--', originValue: '--'});
                    };
                };
                that.tablesData[17].lists[7] = Object.assign(that.tablesData[17].lists[7], {disabled: true, value: '--', originValue: '--'});
                that.tablesData[18].lists[7] = Object.assign(that.tablesData[18].lists[7], {disabled: true, value: '--', originValue: '--'});
                for (let i = 1; i < 17; i++) {
                    that.tablesData[i].lists[8] = Object.assign(that.tablesData[i].lists[8], {disabled: true, value: '--', originValue: '--'});
                };
                
                for (let i = 7; i < 10; i++) {
                    that.tablesData[3].lists[i] = Object.assign(that.tablesData[3].lists[i], {disabled: true, value: '--', originValue: '--'});
                    if (i != 9) {
                        that.tablesData[4].lists[i] = Object.assign(that.tablesData[4].lists[i], {disabled: true, value: '--', originValue: '--'});
                        that.tablesData[5].lists[i] = Object.assign(that.tablesData[5].lists[i], {disabled: true, value: '--', originValue: '--'});
                    };
                };
                
                that.tablesData[13].lists[7] = Object.assign(that.tablesData[13].lists[7], {disabled: true, value: '--', originValue: '--'});
                that.tablesData[14].lists[7] = Object.assign(that.tablesData[14].lists[7], {disabled: true, value: '--', originValue: '--'});

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
                if(temp.length < 10) {
                    for (let i = 65; i < (65+10); i++) {
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
        overflow: auto; 
    }
    table tr:first-child td{
        border-top: 1px solid #222;
    }
    table tr td{
        border-bottom: 1px solid #222;
        border-right: 1px solid #222;
        text-align: center;
        height: 22px;
    }
    table tr td input {
        display: inline-block;
        display: table-cell;
        width: 100%;
        /*height: 100%;*/
        border: none;
        /*width: 50px;*/
        padding-left: 3px;
        text-align: center;
        outline: none;
    }
    table tr td:first-child {
        border-left: 1px solid #222;
    }
    .tips-outer {
        margin-top: 15px;
    }
    .tips input {
        width: 60px;
        height: 22px;
        margin: 0 3px;
        padding-left: 3px;
    }
    .tips p {
        line-height: 24px;
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
