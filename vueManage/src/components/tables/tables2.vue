<template>
    <div class="tables  tables-auto">
        <div class="title text-center">
           <h3 class="text-center wxc-table-style-title">党员数量变化情况</h3>
           <p>截至日期：2016年12月31日</p>
        </div>

        <div class="start-box box-pack" style="position: relative; top: -16px;">
            <p class="wxc-table-style-name">填报单位：天房科技党总支</p>
            <p>第一表</p>
        </div>
        <div class="table-outer"  style="margin-top:-10px;">
            <div class="start-box">
                <table class="tables1" align=center cellspacing=0 cellpadding=0>
                    <tr>
                        <td width="310" colspan="2" style="height:80px;">项目</td>
                        <td width="290" colspan=2>人数</td>
                    </tr>
                    <tr>
                        <td colspan="2" height="44">甲</td>
                        <td colspan=2 class="comm-reset">A</td>
                    </tr>
                    <tr >
                        <td colspan="2" class="justify" style="height: 88px;">上年底汇报总数</td>
                        <td width="50" class="comm-reset">1</td>
                        <td><input type="text" :disabled="disabled" v-model="lists.A1" :class="{'bg-class3': colors.A1=='1','bg-class1':colors.A1=='2'}"></td>
                    </tr>

                    <tr >
                        <td colspan="2" class="justify" style="height: 44px;">二 、 本年增加</td>
                        <td width="50" class="comm-reset">2</td>
                        <td><input type="text" :readonly = "colors.A2=='2'" v-model="lists.A2" :class="{'bg-class3': colors.A2=='1','bg-class1':colors.A2=='2'}"></td>
                    </tr>
                    <tr >
                        <td width="60" style="border-bottom: none;border-right: none;"></td>
                        <td class="justify" style="height: 44px;">发展党员</td>
                        <td width="50" class="comm-reset">3</td>
                        <td><input type="text" :disabled="disabled"  v-model="lists.A3" :class="{'bg-class3': colors.A3=='1','bg-class1':colors.A3=='2'}"></td>
                    </tr>
                    <tr >
                        <td width="60"></td>
                        <td  class="justify" style="height: 44px;">重新入党</td>
                        <td width="50" class="comm-reset">4</td>
                        <td><input type="text" :disabled="disabled" v-model="lists.A4" :class="{'bg-class3': colors.A4=='1','bg-class1':colors.A4=='2'}"></td>
                    </tr>
                    <tr >
                        <td width="60" style="border-bottom: none;border-right: none;"></td>
                        <td class="justify" style="height: 44px;">恢复党籍</td>
                        <td width="50" class="comm-reset">5</td>
                        <td><input type="text" :disabled="disabled" v-model="lists.A5" :class="{'bg-class3': colors.A5=='1','bg-class1':colors.A5=='2'}"></td>
                    </tr>
                    <tr >
                        <td width="60"></td>
                        <td  class="justify" style="height: 44px;">停止党籍后恢复党籍</td>
                        <td width="50" class="comm-reset">6</td>
                        <td><input type="text" :disabled="disabled" v-model="lists.A6" :class="{'bg-class3': colors.A6=='1','bg-class1':colors.A6=='2'}"></td>
                    </tr>
                    <tr >
                        <td width="60" style="border-bottom: none;border-right: none;"></td>
                        <td class="justify" style="height: 44px;">转入组织关系</td>
                        <td width="50" class="comm-reset">7</td>
                        <td><input type="text" :disabled="disabled" v-model="lists.A7" :class="{'bg-class3': colors.A7=='1','bg-class1':colors.A7=='2'}"></td>
                    </tr>
                    <tr >
                        <td width="60"></td>
                        <td  class="justify" style="height: 44px;">整建制转入</td>
                        <td width="50" class="comm-reset">8</td>
                        <td><input type="text" :disabled="disabled" v-model="lists.A8" :class="{'bg-class3': colors.A8=='1','bg-class1':colors.A8=='2'}"></td>
                    </tr>
                </table>
                <table align=center cellspacing=0 cellpadding=0 style="border-left:none;">
                    <tr>
                        <td width="310" colspan="2" style="height:80px;border-left: none;">项目</td>
                        <td width="290" colspan=2>人数</td>
                    </tr>
                    <tr>
                        <td colspan="2" height="44" style="border-left: none;">甲</td>
                        <td colspan=2 class="comm-reset">A</td>
                    </tr>
                    <tr >
                        <td colspan="2" class="justify bl0" style="height: 44px;">三、本年减少</td>
                        <td width="50" class="comm-reset">9</td>
                        <td><input type="text" :readonly = "colors.A2=='2'" v-model="lists.A9" :class="{'bg-class3': colors.A9=='1','bg-class1':colors.A9=='2'}"></td>
                    </tr>
                    <tr >
                        <td colspan="2" class="justify bl0" style="height: 44px;">出党</td>
                        <td width="50" class="comm-reset">10</td>
                        <td><input type="text" :disabled="disabled" v-model="lists.A10" :class="{'bg-class3': colors.A10=='1','bg-class1':colors.A10=='2'}"></td>
                    </tr>
                    <tr >
                        <td colspan="2" class="justify bl0" style="height: 44px;">停止党籍</td>
                        <td width="50" class="comm-reset">11</td>
                        <td><input type="text" :disabled="disabled" v-model="lists.A11" :class="{'bg-class3': colors.A11=='1','bg-class1':colors.A11=='2'}"></td>
                    </tr>
                    <tr >
                        <td colspan="2" class="justify bl0" style="height: 44px;">死亡</td>
                        <td width="50" class="comm-reset">12</td>
                        <td><input type="text" :disabled="disabled" v-model="lists.A12" :class="{'bg-class3': colors.A12=='1','bg-class1':colors.A12=='2'}"></td>
                    </tr>
                    <tr >
                        <td width="60" style="border-width:0;"></td>
                        <td class="justify bl0" style="height: 44px;">转出组织关系</td>
                        <td width="50" class="comm-reset">13</td>
                        <td><input type="text" :disabled="disabled" v-model="lists.A13" :class="{'bg-class3': colors.A13=='1','bg-class1':colors.A13=='2'}"></td>
                    </tr>
                    <tr >
                        <td width="60" style="border-left-width:0;"></td>
                        <td class="justify bl0" style="height: 44px;">整建制转出</td>
                        <td width="50" class="comm-reset">14</td>
                        <td><input type="text" :disabled="disabled" v-model="lists.A14" :class="{'bg-class3': colors.A14=='1','bg-class1':colors.A14=='2'}"></td>
                    </tr>
                    <tr >
                        <td colspan="2" class="justify bl0" style="height: 44px;">四、本年底应有数</td>
                        <td width="50" class="comm-reset">15</td>
                        <td><input type="text" :readonly = "colors.A2=='2'" v-model="lists.A15" :class="{'bg-class3': colors.A15=='1','bg-class1':colors.A15=='2'}"></td>
                    </tr>
                    <tr >
                        <td colspan="2" class="justify bl0" style="height: 44px;">五、本年底实有数</td>
                        <td width="50" class="comm-reset">16</td>
                        <td><input type="text" :disabled="disabled" v-model="lists.A16" :class="{'bg-class3': colors.A16=='1','bg-class1':colors.A16=='2'}"></td>
                    </tr>
                    <tr >
                        <td colspan="2" class="justify bl0" style="height: 44px;">六、实有数与应有数之差</td>
                        <td width="50" class="comm-reset">17</td>
                        <td><input type="text" :readonly = "colors.A2=='2'" v-model="lists.A17" :class="{'bg-class3': colors.A17=='1','bg-class1':colors.A17=='2'}"></td>
                    </tr>
                </table>
            </div>


        </div>
        <router-view></router-view>
    </div>
</template>
<script>
	export default {
		name: 'form2',
		data() {
			return {
                msg: 'this is table',
                tablesData: [
                    {type: 1,title: '一 、上年底总数', label: '任届期满', calc: '', disabled: false, bgcolor: "#222", lists:[{disabled: false,value: ""}]}
                ],

                orignData: {},
                lists: { "A1": "", "A2": "", "A3": "", "A4": "", "A5": "", "A6": "", "A7": "", "A8": "", "A9": "", "A10": "", "A11": "", "A12": "", "A13": "", "A14": "", "A15": "", "A16": "", "A17": "" },
                disabled:true,
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
                    {
                        key: 'FOOTER5',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER6',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },{
                        key: 'FOOTER7',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER8',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER9',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER10',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },{
                        key: 'FOOTER11',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },{
                        key: 'FOOTER12',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },{
                        key: 'FOOTER13',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },{
                        key: 'FOOTER14',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER15',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER16',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER17',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER18',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER19',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER20',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER21',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER22',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER23',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER24',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER25',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER26',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER27',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER28',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER29',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER30',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER31',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    },
                    {
                        key: 'FOOTER32',
                        value: '',
                        orignValue: '',
                        class: '',
                        disabled: true,
                    }
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
        listsA2(){
            return this.lists.A2 = this.lists.A3*1+this.lists.A5*1+this.lists.A7*1
        },
        listsA9(){
            return this.lists.A9 = this.lists.A10*1+this.lists.A11*1+this.lists.A12*1+this.lists.A13*1
        },
        listsA15(){
            return this.lists.A15 = this.lists.A1*1+this.lists.A2*1-this.lists.A9*1
        },
        listsA17(){
            return this.lists.A17 = this.lists.A16*1-this.lists.A15*1
        },



        remberStat() {
            return this.$store.state.remberStatus;
        },
        nullStatus() {
            return this.setNull;
        },
        tablesData1() {
          return this.tablesData.filter((item, index) => {
              return index < 8;
            })
        },
        tablesData2() {
            return this.tablesData.filter((item, index) => {
              return index > 7;
            })
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
            },
            'listsA2'(newval,oldval){
            },
            'listsA9'(newval,oldval){
            },
            'listsA15'(newval,oldval){
            }
            ,'listsA17'(newval,oldval){
            },
            lists:{
                handler: function (val, oldVal) { /* ... */
                    console.log(val);
                },
                deep: true
            },

    },
    methods: {
            //初始化
            init() {
                let that = this;
                const count = 1;

                this.orignData = Object.assign({}, JSON.parse(localStorage.getItem('formData')))
                // 第一步填数据
                this.tablesData.forEach((item, index) => {
                    this.tablesData[index].lists = Object.assign([], this.splitData(index));
                })

                // 第二步设置颜色 和 状态
                for (let i = 0; i < this.tablesData.length; i++) {
                    that.tablesData[i].lists.forEach((item, index) => {
                        that.tablesData[i].lists[index].disabled = that.splitData2(i)[index] == 2 ? true : false;
                        //that.tablesData[i].lists.isYellow = that.splitData2(i)[index] == 1 ? true : false;
                    })
                };

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
                    let tp1 = that.footerVal[10].value == "" ? 0 : that.footerVal[10].value;
                    let tp2 = that.footerVal[11].value == "" ? 0 : that.footerVal[11].value;
                    let tp3 = that.footerVal[12].value == "" ? 0 : that.footerVal[12].value;

                    let tp5 = that.footerVal[14].value == "" ? 0 : that.footerVal[14].value;
                    let tp6 = that.footerVal[15].value == "" ? 0 : that.footerVal[15].value;
                    let tp7 = that.footerVal[16].value == "" ? 0 : that.footerVal[16].value;

                    let tp8 = that.footerVal[19].value == "" ? 0 : that.footerVal[19].value;
                    let tp9 = that.footerVal[20].value == "" ? 0 : that.footerVal[20].value;
                    let tp10 = that.footerVal[21].value == "" ? 0 : that.footerVal[21].value;


                    that.footerVal[9].value = parseInt(tp1) + parseInt(tp2) + parseInt(tp3);
                    that.footerVal[13].value = parseInt(tp5) + parseInt(tp6) + parseInt(tp7);
                    that.footerVal[18].value = parseInt(tp8) + parseInt(tp9) + parseInt(tp10);


                    newV.forEach((item, index) => {
                        if (index != 9 && index != 13 && index != 18) {
                          that.footerVal[index].class = item.orignValue != item.value ? 'red' : '';
                        };
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
                    if (item.value != item.orignValue && index != 9 && index != 13 && index != 18) {
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
                let postData1 = Object.assign({},that.lists);
                let postDataNext={};//处理过的数据传递给后台
//                console.log(postData1);

                for(var key in postData1){
                    if(key!='A2' && key!='A9' && key!='A15' && key!='A17'){
                       postDataNext[key]=postData1[key];
                    }
                }
                console.log(postDataNext);

                let postData = {
                    dept_id: this.$store.state.remberId,
                    year: '2017',
                    type_id: '1',
                    form_id: this.$route.name.split('-')[1],
//                    data: this.dealData(this.origin, this.footerVal)
                    data:JSON.stringify(postDataNext)
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
                                    for(let key in that.lists){
                                        that.lists[key]=='';
                                    }
                                    this.detailContent();
                                    console.log(that.lists);
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
                    console.log(item.status)
                        if (item.status) {
                            // 数据刷新 或者还原 
//                            this.origin.forEach((item, index) => {
//                                that.origin[index].newDis = false;
//                            })
                            this.disabled=true;


                        } else {
                            //启用可编辑的数据
//                            this.origin.forEach((item, index) => {
//                                that.origin[index].newDis = false;
//                            })
                            this.disabled=false;
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
                if(temp.length < 4) {
                    for (let i = 65; i < (65+4); i++) {
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
                        console.log(k,i);
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
                        this.colors = needData.data.color;
//                        this.lists = needData.data.list;
                        for(let key in needData.data.list){
                            this.lists[key]= needData.data.list[key]
                        }

                        console.log(this.colors, this.lists);

//                        that.init();
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
        height: 36px;
    }
    table tr td input {
        border: none;
        width: 100%;
        height: 100%;
        text-align: center;
        outline: none;
        background-color: #f9f9f9;
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
      background: #88e1fe !important;
      color: #111;
    }
    .bg-class2{
      background: #fff;
    }
    .bg-class3{
      background: #ffce9a !important;
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
    .tables1 tr td:last-child {
        border-right:1px solid #222;
    }
</style>
