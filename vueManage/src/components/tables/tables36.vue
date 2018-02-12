<template>
    <div class="tables tables-auto">
        <div class="title text-center">
           <h3 class="text-center wxc-table-style-title">事业法人单位建立党的基层组织情况</h3>
           <p>截至日期：2017年12月31日</p>
        </div>
        
        <div class="start-box box-pack" style="position: relative; top: -16px;">
            <p class="wxc-table-style-name">填报单位：天房科技党总支</p>
            <p>第二十八表</p>
        </div>
        <div class="table-outer" style="margin-top: -10px;">
            <table align=center cellspacing=0 cellpadding=0 width="100%">
                <tr>
                    <td style="width:280px;height: 100px;" colspan=4 rowspan=2>项目</td>
                    <td style="border-right: none;border-bottom: none;" colspan=2></td>
                    <td colspan=10 style="height: 22px"></td>
                </tr>
                <tr>
                    <td colspan="2" style="border-left: none;height: 78px;">总数</td>
                    <td width="58">农业</td>
                    <td width="58">科学研究</td>
                    <td width="58">普通高等学校</td>
                    <td width="58">中等学校</td>
                    <td width="58">小学校</td>
                    <td width="58">幼儿园</td>
                    <td width="58">卫生</td>
                    <td width="58">新闻出版广电</td>
                    <td width="58">文化艺术</td>
                    <td width="58">体育</td>
                </tr>

                <tr class="comm-style">
                   <td colspan=4>甲</td>
                   <td colspan="2" style="height:26px;width:58px;">A</td>
                   <td>B</td>
                   <td>C</td>
                   <td>D</td>
                   <td>E</td>
                   <td>F</td>
                   <td>G</td>
                   <td>H</td>
                   <td>I</td>
                   <td>J</td>
                   <td>K</td>
                </tr>
                <tr  v-for="(item, index) in tablesData">

                    <td  class="justify" colspan=4 v-if="item.type == 1">{{item.label}}</td>

                    <td  class="justify" rowspan="3" width="30" v-if="item.type == 2">{{item.title}}</td>
                    <td  class="justify" colspan="3" v-if="item.type == 2">{{item.label}}</td>

                    <td  class="justify" style="border-left: none;" colspan="3" v-if="item.type == 3">{{item.label}}</td>

                    <td  class="justify" style="border-right: none;border-bottom:none;" v-if="item.type == 4">{{item.title}}</td>
                    <td  class="justify" style="border-left: none;" colspan="3" v-if="item.type == 4">{{item.label}}</td>

                    <td  class="justify" style="border-top: none" rowspan="2" v-if="item.type == 5">{{item.title}}</td>
                    <td  class="justify" style="" colspan="3" v-if="item.type == 5">{{item.label}}</td>

                    <td  class="justify" style="border-left: none;" colspan="3" v-if="item.type == 6">{{item.label}}</td>


                    <td  class="justify" style="" rowspan="4" v-if="item.type == 7">{{item.title}}</td>
                    <td  class="justify" style="border-left: none;border-right: none;border-bottom: none;" width="30" v-if="item.type == 7"></td>
                    <td  class="justify" style="border-left: none;" colspan="2" width="30" v-if="item.type == 7">{{item.label}}</td>

                    <td  class="justify" style="border-left: none;border-right: none;" width="30" v-if="item.type == 8"></td>
                    <td  class="justify" style="border-left: 1px solid #222;" colspan="2" width="30" v-if="item.type == 8">{{item.label}}</td>
                    <td  class="justify" style="border-left: none;" colspan="3" width="30" v-if="item.type == 9">{{item.label}}</td>

                    <td  class="justify" style="border-bottom-width:2px;" rowspan="4" width="30" v-if="item.type == 10">{{item.title}}</td>
                    <td  class="justify" style="border-left: none;border-right:none;border-bottom:none;"  width="30" v-if="item.type == 10"></td>
                    <td  class="justify" style="" colspan="2" width="30" v-if="item.type == 10">{{item.label}}</td>

                    <td  class="justify" style="border-left: none;border-right:none;border-bottom:none;"  width="30" v-if="item.type == 11"></td>
                    <td  class="justify" style="border-left: 1px solid #222;" colspan="2" width="30" v-if="item.type == 11">{{item.label}}</td>

                    <td  class="justify" style="border-left: none;border-bottom: none;border-right: none;" width="20" v-if="item.type == 12"></td>
                    <td  class="justify" style="border-left: 1px solid #222;border-bottom: none; border-right:none;" width="20" v-if="item.type == 12"></td>
                    <td  class="justify" style="" v-if="item.type == 12">{{item.label}}</td>

                    <td  class="justify" style="border-left: none;border-top: none;border-right: none;"  width="20" v-if="item.type == 13"></td>
                    <td  class="justify" style="border-right:1px solid #222;border-left: 1px solid #222" width="20" v-if="item.type == 13"></td>
                    <td  class="justify" style="" v-if="item.type == 13" width="80">{{item.label}}</td>



                    <td  width=30 class="comm-reset">{{index+1}}</td>

                    <td v-for="(inner, inx) in item.lists" v-if="inx<=10" width="50">
                        <input  v-if="inner.disabled"  type="text" :disabled="inner.disabled" :class="{'yellow2': inner.isYellow}" v-model="inner.value" :style="{'color': inner.disabled ? '#111' : inner.class, 'backgroundColor': (index == 0 ) ? '#88e1fe' : (index > 1 && inx == 6) ? '#ffce9a' : '' }">
                        <input v-if="!inner.disabled" type="text" :disabled="inner.newDis" :class="{'yellow2': inner.isYellow}" v-model="inner.value" :style="{'color': inner.disabled ? '#111' : inner.class, 'backgroundColor':  (index == 0 ) ? '#88e1fe' : (index > 1 && inx == 6) ? '#ffce9a' : '' }">
                    </td>
                    
                </tr>  
            </table>
            <!--<div class="tips-outer start-box">-->
                <!--<p>补充资料：</p>-->
                <!--<div class="tips box-flex">-->
                    <!--<p>1.能够按时按标准交纳党费<input type="text" :disabled="footerVal[0].disabled" :style="{color: footerVal[0].class}" v-model="footerVal[0].value" class="yellow">名，经批准少交党费的党员<input type="text" class="yellow" :disabled="footerVal[1].disabled" :style="{color: footerVal[1].class}" v-model="footerVal[1].value">名，免交党费的党员<input type="text" class="yellow" :disabled="footerVal[2].disabled" :style="{color: footerVal[2].class}" v-model="footerVal[2].value">名，自愿一次性多交纳1000元以上党费的<input type="text" :disabled="footerVal[3].disabled" :style="{color: footerVal[3].class}" v-model="footerVal[3].value" class="yellow">名。</p>-->
                    <!--<p>2.生活不能自理、丧失劳动能力的党员<input type="text" :disabled="footerVal[4].disabled" :style="{color: footerVal[4].class}" v-model="footerVal[4].value"  class="yellow">名。</p>-->
                    <!--<p>3.企事业、民办非企业单位党员中担任高级专业技术职务的<input type="text" :disabled="footerVal[5].disabled" :style="{color: footerVal[5].class}" v-model="footerVal[5].value">名，其中女性<input type="text" :disabled="footerVal[6].disabled" :style="{color: footerVal[6].class}" v-model="footerVal[6].value">名，35岁及以下的<input type="text" :disabled="footerVal[7].disabled" :style="{color: footerVal[7].class}" v-model="footerVal[7].value">名；担任中级专业技术职务的<input type="text" :disabled="footerVal[8].disabled" :style="{color: footerVal[8].class}" v-model="footerVal[8].value">名，其中女性<input type="text" :disabled="footerVal[9].disabled" :style="{color: footerVal[9].class}" v-model="footerVal[9].value">名，35岁及以下的<input type="text" :disabled="footerVal[10].disabled" :style="{color: footerVal[10].class}" v-model="footerVal[10].value">名；担任初级专业技术职务的<input type="text" :disabled="footerVal[11].disabled" :style="{color: footerVal[11].class}" v-model="footerVal[11].value">名，其中女性<input type="text" :disabled="footerVal[12].disabled" :style="{color: footerVal[12].class}" v-model="footerVal[12].value">名，35岁及以下的<input type="text" :disabled="footerVal[13].disabled" :style="{color: footerVal[13].class}" v-model="footerVal[13].value">名。</p>-->
                <!--</div>-->
            <!--</div>-->
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
                    {type: 1,title: '', label: '单位数',  disabled: false, calc: 'for(let i=0;i<11;i++){let tp1=this.origin[1].lists[i].value==""?0:this.origin[1].lists[i].value;let tp2=this.origin[2].lists[i].value==""?0:this.origin[2].lists[i].value;let tp3=this.origin[3].lists[i].value==""?0:this.origin[3].lists[i].value;let tp4=this.origin[4].lists[i].value==""?0:this.origin[4].lists[i].value;let tp5=this.origin[7].lists[i].value==""?0:this.origin[7].lists[i].value;let tp6=this.origin[9].lists[i].value==""?0:this.origin[9].lists[i].value;let tp7=this.origin[10].lists[i].value==""?0:this.origin[10].lists[i].value;this.origin[0].lists[i].value=parseInt(tp1)+parseInt(tp2)+parseInt(tp3)+parseInt(tp4)+parseInt(tp5)+parseInt(tp6)+parseInt(tp7)}', bgcolor: "#222", lists: []},
                    {type: 2,title: '已单独建立党组织', label: '建立党委的',  disabled: false, calc: '', bgcolor: "#222", lists: []},
                    {type: 3,title: '', label: '建立总支部的',  disabled: false, calc: '', bgcolor: "#222", lists: []},
                    {type: 3,title: '', label: '建立支部的',  disabled: false, calc: '', bgcolor: "#222", lists: []},

                    {type: 4,title: '', label: '已建立联合党支部的',  disabled: false, calc: '', bgcolor: "#222", lists: []},

                    {type: 5,title: '', label: '具有3名以上党员的',  disabled: false, calc: '', bgcolor: "#222", lists: []},
                    {type: 6,title: '', label: '联合党支部数',  disabled: false, calc: '', bgcolor: "#222", lists: []},

                    {type: 7,title: '未建立党组织', label: '应建尚未建立党组织的',  disabled: false, calc: '', bgcolor: "#222", lists: []},
                    {type: 8,title: '', label: '建立党小组的',  disabled: false, calc: '', bgcolor: "#222", lists: []},
                    {type: 9,title: '', label: '仅有个别党员的',  disabled: false, calc: '', bgcolor: "#222", lists: []},
                    {type: 9,title: '', label: '没有党员的',  disabled: false, calc: '', bgcolor: "#222", lists: []},

                    {type: 10,title: '补充情况', label: '在岗职工',  disabled: false, calc: '', bgcolor: "#222", lists: []},
                    {type: 11,title: '', label: '党员',  disabled: false, calc: '', bgcolor: "#222", lists: []},
                    {type: 12,title: '', label: '专业技术人员',  disabled: false, calc: '', bgcolor: "#222", lists: []},

                    {type: 13,title: '', label: '党员',  disabled: false, calc: '', bgcolor: "#222", lists: []},













//                    {type: 1,title: '', label: '总计',  disabled: false, calc: 'for (let i = 0; i < 15; i++) {let tp1 = this.origin[1].lists[i].value == "" ? 0 : this.origin[1].lists[i].value; let tp2 = this.origin[17].lists[i].value == "" ? 0 : this.origin[17].lists[i].value; let tp3 = this.origin[19].lists[i].value == "" ? 0 : this.origin[19].lists[i].value; let tp4 = this.origin[20].lists[i].value == "" ? 0 : this.origin[20].lists[i].value; let tp5 = this.origin[21].lists[i].value == "" ? 0 : this.origin[21].lists[i].value; let tp6 = this.origin[22].lists[i].value == "" ? 0 : this.origin[22].lists[i].value; this.origin[0].lists[i].value = parseInt(tp1) + parseInt(tp2)+ parseInt(tp3)+ parseInt(tp4)+ parseInt(tp5)+ parseInt(tp6)}', bgcolor: "#222", lists: []},
//
//                    {type: 1,title: '', label: '一、在岗职工', calc: 'for (let i = 0; i < 15; i++) {let tp1 = this.origin[2].lists[i].value == "" ? 0 : this.origin[2].lists[i].value; let tp2 = this.origin[10].lists[i].value == "" ? 0 : this.origin[10].lists[i].value; this.origin[1].lists[i].value = parseInt(tp1) + parseInt(tp2)}', disabled: false, bgcolor: "#222", lists: []},
//
//                    {type: 7,title: '公共制单位', label: '合计', calc: 'for (var i = 0; i < 15; i++) { let temp = 0; if (i == 0) { for (let j = 3; j < 9; j++) { let ii = this.origin[j].lists[i].value == "" ? 0 : this.origin[j].lists[i].value; temp += parseInt(ii)}  } else { for (let j = 3; j < 8; j++) { let jj = this.origin[j].lists[i].value == "" ? 0 : this.origin[j].lists[i].value; temp += parseInt(jj) }  } this.origin[2].lists[i].value = temp }', disabled: false, bgcolor: "#222", lists: []},
//
//                    {type: 4, title: '', label: '党政机关工作人员', calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[3].lists[i].value == "" ? 0 : this.origin[3].lists[i].value; temp += parseInt(tp)};this.origin[3].lists[0].value = temp',  disabled: false, bgcolor: "#222", lists: []},
//                    {type: 4, title: '', label: '事业单位管理人员', calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[4].lists[i].value == "" ? 0 : this.origin[4].lists[i].value; temp += parseInt(tp)};this.origin[4].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 4, title: '', label: '事业单位专业技术人员', calc: 'let temp = 0;for (let i = 5; i < 15; i++) { let tp = this.origin[5].lists[i].value == "" ? 0 : this.origin[5].lists[i].value; temp += parseInt(tp)};this.origin[5].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 4, title: '', label: '企业管理人员', calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[6].lists[i].value == "" ? 0 : this.origin[6].lists[i].value; temp += parseInt(tp)};this.origin[6].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 4, title: '', label: '企业专业技术人员', calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[7].lists[i].value == "" ? 0 : this.origin[7].lists[i].value; temp += parseInt(tp)};this.origin[7].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 5, title: '', label: '工勤技能人员', calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[8].lists[i].value == "" ? 0 : this.origin[8].lists[i].value; temp += parseInt(tp)};this.origin[8].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 6, title: '', label: '农民工',  calc: 'let temp = 0;for (let i = 5; i < 15; i++) { let tp = this.origin[9].lists[i].value == "" ? 0 : this.origin[9].lists[i].value; temp += parseInt(tp)}; this.origin[9].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 2,title: '非公有制单位', label: '合计', calc:'for (var i = 0; i < 15; i++) { let temp = 0; for (let j = 11; j < 16; j++) {let tp = this.origin[j].lists[i].value == "" ? 0 : this.origin[j].lists[i].value; temp += parseInt(tp) } this.origin[10].lists[i].value = temp }', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 4, title: '', label: '企业管理人员', calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[11].lists[i].value == "" ? 0 : this.origin[11].lists[i].value; temp += parseInt(tp)};this.origin[11].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 4, title: '', label: '企业专业技术人员', calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[12].lists[i].value == "" ? 0 : this.origin[12].lists[i].value; temp += parseInt(tp)};this.origin[12].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 4, title: '', label: '民办非企业 单位管理人员', calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[13].lists[i].value == "" ? 0: this.origin[13].lists[i].value; temp += parseInt(tp)}; this.origin[13].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 4, title: '', label: '民办非企业 专业技术人员', calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[14].lists[i].value == "" ? 0 : this.origin[14].lists[i].value; temp += parseInt(tp)}; this.origin[14].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 5, title: '', label: '工勤技能人员', calc: 'let temp = 0;for (let i = 5; i < 15; i++) { let tp = this.origin[15].lists[i].value == "" ? 0 : this.origin[15].lists[i].value; temp += parseInt(tp)};this.origin[15].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 6, title: '', label: '农民工',  calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[16].lists[i].value == "" ? 0 : this.origin[16].lists[i].value;  temp += parseInt(tp)};this.origin[16].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 1, title: '', label: '二、农牧渔民',  calc: 'let temp = 0;for (let i = 5; i < 15; i++) { let tp = this.origin[17].lists[i].value == "" ? 0 : this.origin[17].lists[i].value; temp += parseInt(tp)};this.origin[17].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 3, title: '', label: '外出务工经商人员',  calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[18].lists[i].value == "" ? 0 : this.origin[18].lists[i].value; temp += parseInt(tp)};this.origin[18].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 1, title: '', label: '三、军人、武警',  calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[19].lists[i].value == "" ? 0 : this.origin[19].lists[i].value; temp += parseInt(tp)};this.origin[19].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 1, title: '', label: '四、学 生', calc: 'let temp = 0;for (let i = 5; i < 15; i++) {let tp = this.origin[20].lists[i].value == "" ? 0 : this.origin[20].lists[i].value; temp += parseInt(tp)};this.origin[20].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 1, title: '', label: '五、离退休人员',  calc: 'let temp = 0;for (let i = 5; i < 15; i++) { let tp = this.origin[21].lists[i].value == "" ? 0 : this.origin[21].lists[i].value;  temp += parseInt(tp)}; this.origin[21].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
//                    {type: 1, title: '', label: '其它', calc: 'let temp = 0;for (let i = 5; i < 15; i++) { let tp =  this.origin[22].lists[i].value == "" ? 0 : this.origin[22].lists[i].value; temp += parseInt(tp)};this.origin[22].lists[0].value = temp', disabled: false, bgcolor: "#222", lists: []},
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
                const count = 15;

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
                if(temp.length < 15) {
                    for (let i = 65; i < (65+15); i++) {
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
                
                //eval('for (let i = 5; i < 15; i++) {this.origin[3].lists[0].value += parseInt(this.origin[3].lists[i].value)}');

                // this.origin[0].lists[0].value = parseInt(this.origin[1].lists[0].value) + parseInt(this.origin[17].lists[0].value)+ parseInt(this.origin[19].lists[0].value)+ parseInt(this.origin[20].lists[0].value)+ parseInt(this.origin[21].lists[0].value)+ parseInt(this.origin[22].lists[0].value);
                //this.origin[0].lists[1].value = parseInt(this.origin[1].lists[1].value) + parseInt(this.origin[17].lists[1].value)+ parseInt(this.origin[19].lists[1].value)+ parseInt(this.origin[20].lists[1].value)+ parseInt(this.origin[21].lists[1].value)+ parseInt(this.origin[22].lists[1].value);
                // this.origin[0].lists[2].value = parseInt(this.origin[1].lists[2].value) + parseInt(this.origin[17].lists[2].value)+ parseInt(this.origin[19].lists[2].value)+ parseInt(this.origin[20].lists[2].value)+ parseInt(this.origin[21].lists[2].value)+ parseInt(this.origin[22].lists[2].value);

                //第一行的计算表达式
                //for (let i = 0; i < 15; i++) {this.origin[0].lists[i].value = parseInt(this.origin[1].lists[i].value) + parseInt(this.origin[17].lists[i].value)+ parseInt(this.origin[19].lists[i].value)+ parseInt(this.origin[20].lists[0].value)+ parseInt(this.origin[21].lists[i].value)+ parseInt(this.origin[22].lists[i].value)}

                //第二行的表达式
               // for (let i = 0; i < 15; i++) {this.origin[1].lists[i].value = parseInt(this.origin[2].lists[i].value) + parseInt(this.origin[10].lists[i].value)}

                //第三行的表达式
                //for (var i = 0; i < 15; i++) { let temp = 0; if (i == 0) { for (let j = 3; j < 9; j++) { temp += parseInt(this.origin[j].lists[i].value)}  } else { for (let j = 3; j < 8; j++) { temp += parseInt(this.origin[j].lists[i].value) }  } this.origin[2].lists[i].value = temp }

                //第11行的表达式
                //for (var i = 0; i < 15; i++) { let temp = 0; for (let j = 11; j < 16; j++) { temp += parseInt(this.origin[j].lists[i].value) } this.origin[10].lists[i].value = temp }
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
        padding: 0 5px;
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
        height: 24px;
    }
    table tr td input {
        display: inline-block;
        display: table-cell;
        width: 100%;
        height: 100%;
        border: none;
        /*width: 50px;*/
        padding-left: 3px;
        text-align: center;
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
