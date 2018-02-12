<template>
    <div class="app-main" :style="{'width':'100%','height':'100%'}" @click="closeDefault">
        <div class="layout start-box box-orient" :style="{'width':'100%','height':'100%'}">
            <!-- 头部 -->
            <top></top>
            <Row type="flex" class="box-flex">
                <!-- 侧边栏树结构 -->
                <i-col span="5" class="layout-menu-left">
                    <Slide ref="slide" 
                        @reflashList="reflashList" 
                        @getnode="getnode"
                        @slideDown="slideDown"
                        :url="url"
                        :openitem="openitem"
                        :currentnode="currentnode"
                        :openlist="openlist"
                        >
                    </Slide>
                </i-col>
                <i-col span="19" class="start-box box-orient">
                    <div class="set-com">
                       <Button type="ghost">重新计算</Button><Button type="ghost" @click="exportSingnal">导出本页到word</Button><Button type="ghost" @click="exportAll">导出全部到word</Button> 
                    </div>
                    <div class="set-tabs tabs demo-tabs-style1 box-flex">
                        <Tabs type="card" @on-click="getMsg" style="height:100%;">
                            <TabPane label="党组织党员基本情况" name="1" style="height:96%;">
                                <div class="items">
                                    <h3>党组织基本情况</h3>
                                    <p>目前共建立基层党组织 {{orgObj.dangzuzhi[0]}} 个，其中：党委  {{orgObj.dangzuzhi[1]}} 个，党总支 {{orgObj.dangzuzhi[2]}} 个，党支部 {{orgObj.dangzuzhi[3]}} 个。</p>
                                    <p>另有工委 {{orgObj.dangzuzhi[4]}} 个（其中：其中省一级 {{orgObj.dangzuzhi[5]}} 个，地一级 {{orgObj.dangzuzhi[6]}} 个，县一级 {{orgObj.dangzuzhi[7]}} 个 ）；党组 {{orgObj.dangzuzhi[8]}} 个（其中：中央一级机关 {{orgObj.dangzuzhi[9]}} 个，市一级 {{orgObj.dangzuzhi[10]}} 个，地一级 {{orgObj.dangzuzhi[11]}} 个，县一级 {{orgObj.dangzuzhi[12]}} 个 ）。</p>
                                </div>
                                <div class="items">
                                    <h3>党员基本情况</h3>
                                    <p>目前共有党员 {{orgObj.dangyuan[0]}} 名，其中预备党员 {{orgObj.dangyuan[1]}} 名；女党员 {{orgObj.dangyuan[2]}} 名，占党员总数的 {{orgObj.dangyuan[3]}} %；少数民族党员 {{orgObj.dangyuan[4]}} 名，占党员总数的 {{orgObj.dangyuan[5]}} %；大专及以上学历的党员 {{orgObj.dangyuan[6]}} 名，占党员总数的 {{orgObj.dangyuan[7]}} %；35岁以下的党员 {{orgObj.dangyuan[8]}} 名，占党员总数的 {{orgObj.dangyuan[9]}}  %；60以上党员 {{orgObj.dangyuan[10]}} 名，占党员总数的 {{orgObj.dangyuan[11]}} %。</p>
                                    <p>党员职业分布情况：公有制在岗职工党员 {{orgObj.dangyuan[12]}} 名，占党员总数的 {{orgObj.dangyuan[13]}} %； 非公有制在岗职工党员 {{orgObj.dangyuan[14]}} 名，占党员总数的 {{orgObj.dangyuan[15]}} %； 农牧渔民党员 {{orgObj.dangyuan[16]}} 名，占党员总数的 {{orgObj.dangyuan[17]}} %； 军人、武警党员 {{orgObj.dangyuan[18]}} 名，占党员总数的 {{orgObj.dangyuan[19]}} %； 学生党员 {{orgObj.dangyuan[20]}} 名，占党员总数的 {{orgObj.dangyuan[21]}} %； 离退休党员 {{orgObj.dangyuan[22]}} 名，占党员总数的 {{orgObj.dangyuan[23]}} %； 其他职业党员 {{orgObj.dangyuan[24]}} 名，占党员总数的 {{orgObj.dangyuan[25]}} %；</p>
                                    <p>共有生活困难党员 {{orgObj.dangyuan[26]}} 名， 其中享受城镇最低生活保障费的 {{orgObj.dangyuan[27]}} 名；</p>
                                    <p>共有建国前入党没有工作老党员 {{orgObj.dangyuan[28]}} 名， 其中享受优抚的 {{orgObj.dangyuan[29]}} 名；</p>
                                    <p>共有流动党员 {{orgObj.dangyuan[30]}} 名， 其中流出党员 {{orgObj.dangyuan[31]}} 名，接收流入党员 {{orgObj.dangyuan[32]}} 名；</p>
                                    <p>共有长期出国（境）党员 {{orgObj.dangyuan[33]}} 名。</p>
                                </div>
                            </TabPane>
                            <TabPane label="发展党员基本情况"  name="2" style="height:96%;">
                                <div class="items">
                                    <h3>发展党员情况</h3>
                                    <p>上年度发展党员 {{fazhanObj.apply[0]}} 名，其中发展女党员 {{fazhanObj.apply[1]}}  名，占党员发展总数的 {{fazhanObj.apply[2]}} % ；发展少数民族党员 {{fazhanObj.apply[3]}} 名，占党员发展总数的 {{fazhanObj.apply[4]}} % ；发展大专以上学历的党员 {{fazhanObj.apply[5]}} 名，占党员发展总数的 {{fazhanObj.apply[6]}} % ；发展35岁以下的党员 {{fazhanObj.apply[7]}} 名，占党员发展总数的 {{fazhanObj.apply[8]}} % ；发展农牧渔民党员 {{fazhanObj.apply[9]}} 名，占党员发展总数的 {{fazhanObj.apply[10]}} % ；</p>
                                    <p>发展生产工作一线党员 {{fazhanObj.apply[11]}} 名，占党员发展总数的 {{fazhanObj.apply[12]}} %；从共青团员中发展党员 {{fazhanObj.apply[13]}} 名，占党员发展总数的 {{fazhanObj.apply[14]}} % 从学生中发展党员 {{fazhanObj.apply[15]}}  名，占党员发展总数的 {{fazhanObj.apply[16]}} %  。本年度截止目前发展党员 {{fazhanObj.apply[17]}} 名。</p>
                                </div>
                                <div class="items">
                                    <h3>申请入党入队伍情况</h3>
                                    <p>上年度发展党员 {{fazhanObj.approve[0]}} 名，其中发展女党员 {{fazhanObj.approve[1]}} 名，占党员发展总数的 {{fazhanObj.approve[2]}} % ；发展少数民族党员 {{fazhanObj.approve[3]}} 名，占党员发展总数的 {{fazhanObj.approve[4]}} % ；发展大专以上学历的党员 {{fazhanObj.approve[5]}} 名，占党员发展总数的 {{fazhanObj.approve[6]}} % ；发展35岁以下的党员 {{fazhanObj.approve[7]}} 名，占党员发展总数的 {{fazhanObj.approve[8]}} % ；发展农牧渔民党员{{fazhanObj.approve[9]}} 名，占党员发展总数的 {{fazhanObj.approve[10]}} % ；</p>
                                </div>
                            </TabPane>
                            <TabPane label="党建基本情况"  name="3" style="height:96%;">
                                <div class="items">
                                    <h3>机关事业单位党建情况</h3>
                                      <p>国家机关、政党机关、人民团体机关单位共计 {{dangjianObj.jiguanshiye[0]}} 个， 在岗职工人数为 {{dangjianObj.jiguanshiye[1]}} 人，党员数量为 {{dangjianObj.jiguanshiye[2]}} 名；其中建立独立党组织的 {{dangjianObj.jiguanshiye[3]}} 个，建立联合党支部的 {{dangjianObj.jiguanshiye[4]}} 个 ，未建立党组织的 {{dangjianObj.jiguanshiye[5]}} 个 。</p>
                                      <p>目前共有事业单位 {{dangjianObj.jiguanshiye[6]}} 个；在岗职工人数为 {{dangjianObj.jiguanshiye[7]}} 人，党员数量为 {{dangjianObj.jiguanshiye[8]}} 名；其中建立独立党组织的 {{dangjianObj.jiguanshiye[9]}} 个 ，建立联合党支部的 {{dangjianObj.jiguanshiye[10]}} 个，未建立党组织的 {{dangjianObj.jiguanshiye[11]}} 个 。</p>
                                </div>
                                <div class="items">
                                    <h3>企业党建情况</h3>
                                    <p>目前共有公有经济控制的企业 {{dangjianObj.qiyedangjian[0]}} 家；从业人数为 {{dangjianObj.qiyedangjian[1]}} 人，党员数量为 {{dangjianObj.qiyedangjian[2]}} 名。建立党委的 {{dangjianObj.qiyedangjian[3]}} 家，建立党总支的 {{dangjianObj.qiyedangjian[4]}} 家，建立独立党支部的 {{dangjianObj.qiyedangjian[5]}} 家 ，建立联合党支部的 {{dangjianObj.qiyedangjian[6]}} 家 ，未建立党组织的  {{dangjianObj.qiyedangjian[7]}} 家 。</p>
                                    <p>目前共有非公有经济控制的企业 {{dangjianObj.qiyedangjian[8]}} 家；从业人数为 {{dangjianObj.qiyedangjian[9]}} 人，党员数量为 {{dangjianObj.qiyedangjian[10]}} 名。其中从业50－99人且营业收入500万以上的  {{dangjianObj.qiyedangjian[11]}} 家，党员数量为 {{dangjianObj.qiyedangjian[12]}} 名。建立党委的 {{dangjianObj.qiyedangjian[13]}} 家，建立党总支的 {{dangjianObj.qiyedangjian[14]}} 家，建立独立党支部的 {{dangjianObj.qiyedangjian[15]}} 家 ，建立联合党支部的 {{dangjianObj.qiyedangjian[16]}} 家 ，未建立党组织的 {{dangjianObj.qiyedangjian[17]}} 家 ；从业100人以上的 {{dangjianObj.qiyedangjian[18]}} 家，党员数量为 {{dangjianObj.qiyedangjian[19]}} 名。建立党委的 {{dangjianObj.qiyedangjian[20]}} 家，建立党总支的 {{dangjianObj.qiyedangjian[21]}} 家，建立独立党支部的 {{dangjianObj.qiyedangjian[22]}} 家，建立联合党支部的 {{dangjianObj.qiyedangjian[23]}} 家，未建立党组织的 {{dangjianObj.qiyedangjian[24]}} 家 。</p>
                                </div>
                                <div class="items">
                                    <h3>两新党组织党建情况</h3>
                                    <p>目前共有民办非企业 {{dangjianObj.liangxindangzuzhi[0]}} 个。已经建立党组织的 {{dangjianObj.liangxindangzuzhi[1]}}  个，建立党委的 {{dangjianObj.liangxindangzuzhi[2]}} 个，建立党总支的 {{dangjianObj.liangxindangzuzhi[3]}} 个，建立党支部的 {{dangjianObj.liangxindangzuzhi[4]}} 个。从业党员 {{dangjianObj.liangxindangzuzhi[5]}} 名。</p>
                                    <p>目前共有中介组织 {{dangjianObj.liangxindangzuzhi[6]}} 个。已经建立党组织的 {{dangjianObj.liangxindangzuzhi[7]}} 个，建立党委的 {{dangjianObj.liangxindangzuzhi[8]}} 个，建立党总支的 {{dangjianObj.liangxindangzuzhi[9]}} 个，建立党支部的 {{dangjianObj.liangxindangzuzhi[10]}} 个(其中联合支部 {{dangjianObj.liangxindangzuzhi[11]}} 个)。从业党员 {{dangjianObj.liangxindangzuzhi[12]}} 名。</p>
                                    <p>目前共有社团组织 {{dangjianObj.liangxindangzuzhi[13]}} 个 ，已经建立党组织的 {{dangjianObj.liangxindangzuzhi[14]}} 个，建立党委的 {{dangjianObj.liangxindangzuzhi[15]}} 个，建立党总支的 {{dangjianObj.liangxindangzuzhi[16]}} 个，建立党支部的 {{dangjianObj.liangxindangzuzhi[17]}} 个。从业党员 {{dangjianObj.liangxindangzuzhi[18]}} 名。</p>
                                </div>
                                <div class="items">
                                    <h3>城市社区党建情况</h3>
                                    <p>共有城市社区 {{dangjianObj.chengshishequ[0]}} 个，建立党委的 {{dangjianObj.chengshishequ[1]}} 个，建立总支的 {{dangjianObj.chengshishequ[2]}} 个，建立独立党支部的 {{dangjianObj.chengshishequ[3]}} 个，建立联合党支部的 {{dangjianObj.chengshishequ[4]}} 个，未建立党组织的 {{dangjianObj.chengshishequ[5]}} 个。</p>
                                    <p>城市社区党组织书记共计 {{dangjianObj.chengshishequ[6]}} 名 其中：高中学历及以上的书记 {{dangjianObj.chengshishequ[7]}} 名，45岁以下的 {{dangjianObj.chengshishequ[8]}} 名，60岁以上的 {{dangjianObj.chengshishequ[9]}} 名。</p>
                                    <p>组织关系在城市社区的党员 {{dangjianObj.chengshishequ[10]}} 名。 其中女党员 {{dangjianObj.chengshishequ[11]}} 名，占社区党员总数的 {{dangjianObj.chengshishequ[12]}} %。高中学历及以上的党员 {{dangjianObj.chengshishequ[13]}} 名，占社区党员总数的 {{dangjianObj.chengshishequ[14]}} %。45岁以下的党员 {{dangjianObj.chengshishequ[15]}} 名，占社区党员总数的 {{dangjianObj.chengshishequ[16]}} %。60以上 {{dangjianObj.chengshishequ[17]}} 人，占社区党员总数的 {{dangjianObj.chengshishequ[18]}} %</p>
                                </div>
                                <div class="items">
                                    <h3>建制村党建情况</h3>
                                    <p>建制村 {{dangjianObj.jianzhicun[0]}} 个，建立党委的 {{dangjianObj.jianzhicun[1]}} 个，建立党总支的 {{dangjianObj.jianzhicun[2]}} 个，建立独立党支部的 {{dangjianObj.jianzhicun[3]}} 个，建立联合党支部的 {{dangjianObj.jianzhicun[4]}} 个，未建立党组织的 {{dangjianObj.jianzhicun[5]}} 个。</p>
                                    <p>建制村党组织书记共计 {{dangjianObj.jianzhicun[6]}} 名 其中：女书记 {{dangjianObj.jianzhicun[7]}} 名，高中及以上学历的书记 {{dangjianObj.jianzhicun[8]}}  名，35岁以下的 {{dangjianObj.jianzhicun[9]}} 名，60岁以上的 {{dangjianObj.jianzhicun[10]}} 名 。</p>
                                    <p>建制村党支部委员与村委会委员交叉任职 {{dangjianObj.jianzhicun[11]}} ，其中：村党支部书记、村委会主任一人兼的 {{dangjianObj.jianzhicun[12]}} 名</p>
                                    <p>建制村党员共计 {{dangjianObj.jianzhicun[13]}} 名，占全部党员总数的 {{dangjianObj.jianzhicun[14]}} %。其中女党员 {{dangjianObj.jianzhicun[15]}} 名，占建制村党员总数的 {{dangjianObj.jianzhicun[16]}} %。高中学历及以上的党员 {{dangjianObj.jianzhicun[17]}} 名，占建制村党员总数的 {{dangjianObj.jianzhicun[18]}} %。35岁以下的党员 {{dangjianObj.jianzhicun[19]}} 名，占建制村党员总数的 {{dangjianObj.jianzhicun[20]}} %。</p>
                                    <p>三年以上未发展党员的村党组织有 {{dangjianObj.jianzhicun[21]}} 个。</p>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                    
                </i-col>
            </Row>
        </div>
    </div>
</template>
<script>
    import top from '@/components/top.vue'
    import Slide from '@/components/slide.vue'

    export default {
        name: 'baseSituation',
        data() {
            return {
                url: '/v1/trees/search-list',
                openitem: [],
                openlist: [],
                currentnode: '',
                slideBar: false,
                remberGroup: false,
                lists: [],
                remberId: '', //记住点击的列
                remberRow: {},
                deptsData: {},
                memberData: {},
                jiguanData: {
                    "institution": {
                      "total": "1",
                      "workers": "55",
                      "party_num": "10241",
                      "single_party_num": "1",
                      "union_party_num": "0",
                      "none_party_num": "1"
                    },
                    "organ": {
                      "total": "1",
                      "workers": "55",
                      "party_num": "10241",
                      "single_party_num": "1",
                      "union_party_num": "0",
                      "none_party_num": "1"
                    }
                },
                orgData: {
                    "public": {
                      "total": "0",
                      "workers": 0,
                      "party_number": "0",
                      "construct_party": "0",
                      "construct_branch": "0",
                      "construct_single": "0",
                      "construct_union": "0",
                      "construct_none": "0"
                    },
                    "private": {
                      "total": "1",
                      "workers": "22",
                      "party_number": "9",
                      "over500": 0,
                      "500_party_number": 0,
                      "construct_party": "0",
                      "construct_branch": "0",
                      "construct_single": "1",
                      "construct_union": "0",
                      "construct_none": "0",
                      "100_total": "0",
                      "100_party_number": "0",
                      "100_construct_party": "0",
                      "100_construct_branch": "0",
                      "100_construct_single": "0",
                      "100_construct_union": "0",
                      "100_construct_none": "0"
                    }
                },
                doubleData: {
                    "middleware": {
                      "total": "1",
                      "construct_dept": 1,
                      "construct_party": "0",
                      "construct_branch": "0",
                      "construct_single": "1",
                      "construct_union": "0",
                      "party_number": "9"
                    },
                    "social": {
                      "total": "1",
                      "construct_dept": 1,
                      "construct_party": "0",
                      "construct_branch": "0",
                      "construct_single": "1",
                      "party_number": "9"
                    }
                },
                cityData: {
                    "summary": {
                      "total": "0",
                      "construct_party": "0",
                      "construct_branch": "0",
                      "construct_single": "0",
                      "construct_union": "0",
                      "construct_none": "0"
                    },
                    "clerk": {
                      "total": 0,
                      "primary": 0,
                      "under45": 0,
                      "over60": 0
                    },
                    "relation": {
                      "total": "0",
                      "women": "0",
                      "women_percent": "0",
                      "primary": 0,
                      "primary_percent": "0",
                      "under45": 0,
                      "under45_percent": "0",
                      "over60": 0,
                      "over60_percent": "0"
                    }
                },
                villageData: {
                    "summary": {
                      "total": "0",
                      "construct_party": "0",
                      "construct_branch": "0",
                      "construct_single": "0",
                      "construct_union": "0",
                      "construct_none": "0"
                    },
                    "clerk": {
                      "total": 0,
                      "women": 0,
                      "primary": 0,
                      "under35": 0,
                      "over60": 0
                    },
                    "pluralism": {
                      "total": 11,
                      "both": 0
                    },
                    "distribute": {
                      "total": "0",
                      "total_percent": 0,
                      "women": "0",
                      "women_percent": "0",
                      "primary": 0,
                      "primary_percent": "0",
                      "under35": 0,
                      "under35_percent": "0"
                    },
                    "three_years": "100"
                },
                remberIndex: 1,
                dangjianObj: {
                  jiguanshiye: [],
                  qiyedangjian: [],
                  liangxindangzuzhi: [],
                  chengshishequ: [],
                  jianzhicun:[]
                }, 
                fazhanObj: {
                  apply: [],
                  approve: []
                },
                orgObj: {
                  dangzuzhi: [],
                  dangyuan: []
                }
            }
        },
        computed: {
        },
        watch: {
        },
        components: {
            top,
            Slide,
        },
        methods: {
            exportSingnal() {
              let ids = this.$store.state.remberId;
              switch(parseInt(this.remberIndex)) {
                case 1:  window.open('/v1/deptstatistics/members-doc?dept_id=' + ids); break;
                case 2:  window.open('/v1/construct/develop-export?dept_id=' + ids); break;
                case 3:  window.open('/v1/construct/export?dept_id=' + ids); break;
              }
            },
            exportAll() {
                let ids = this.$store.state.remberId;
                window.open('/v1/deptstatistics/all-export?dept_id=' + ids);
            },
            getMsg(res) {
                this.remberIndex = res;
            },
            slideDown() {
                console.log('jieshu')
            },
            closeDefault() {
                if (this.$route.name == 'info' || this.$route.name == 'group') {
                    this.$router.go(-1);
                };
            },
            // tree emit events（events up）
            reflashList(item) {
                // this.deptsinfo(item.id, 0);
                // this.memberinfo(item.id, 1);
                // this.jiguan(item.id, 1);
                // this.org(item.id, 1);
                // this.double(item.id, 1);
                // this.city(item.id, 1);
                // this.village(item.id, 1);

                this.fazhan(item.id, 1);
                this.dangjian(item.id, 1);
                this.orgbase(item.id, 1);
            },
            getnode(node) {
                
            },
            reflash() {
                 this.openlist = [798, 797, 792, 796];
            },
            //党组织基本情况
            deptsinfo(id, type) {
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/deptstatistics/depts-stat',
                    params: {
                        dept_id: id ? id : '',
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.deptsData = needData.data;
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            //党员基本情况
            memberinfo(id, type) {
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/deptstatistics/members-stat',
                    params: {
                        dept_id: id ? id : '',
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.memberData = needData.data;
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            jiguan(id, type) {
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/construct/institutions',
                    params: {
                        dept_id: id ? id : '',
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.jiguanData = Object.assign({}, needData.data);
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            org(id, type) {
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/construct/org',
                    params: {
                        dept_id: id ? id : '',
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.orgData = needData.data;
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            double(id, type) {
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/construct/double',
                    params: {
                        dept_id: id ? id : '',
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.doubleData = Object.assign({},needData.data);
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            city(id, type) {
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/construct/city',
                    params: {
                        dept_id: id ? id : '',
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.cityData = needData.data;
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
            village(id, type) {
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/construct/village',
                    params: {
                        dept_id: id ? id : '',
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        that.villageData = needData.data;
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },

            //党建情况
            dangjian(id, type) {
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/construct/build',
                    params: {
                        dept_id: id ? id : '',
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        this.dangjianObj.jiguanshiye = needData.data.jiguanshiye;
                        this.dangjianObj.qiyedangjian = needData.data.qiyedangjian;
                        this.dangjianObj.liangxindangzuzhi = needData.data.liangxindangzuzhi;
                        this.dangjianObj.chengshishequ = needData.data.chengshishequ;
                        this.dangjianObj.jianzhicun = needData.data.jianzhicun;
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },

            // 发展党员基本情况
            fazhan(id, type) {
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/construct/apply',
                    params: {
                        dept_id: id ? id : '',
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        this.fazhanObj.apply = Object.assign([], needData.data.apply);
                        this.fazhanObj.approve = Object.assign([], needData.data.approve);
                        console.log(this.fazhanObj)
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },

            //党组织党员基本情况
            orgbase(id, type) {
                let that = this;
                this.axios({
                    method: 'get',
                    url: '/v1/construct/dept',
                    params: {
                        dept_id: id ? id : '',
                        opt: type ? type : 0,
                    }
                })
                .then(res => {
                    let needData = res.data;
                    if (needData.code == 200) {
                        this.orgObj.dangzuzhi = Object.assign([], needData.data.dangzuzhi);
                        this.orgObj.dangyuan = Object.assign([], needData.data.dangyuan);
                    } else {
                        that.$Message.error(needData.msg);
                    }
                })
                .catch(err => {
                    this.$Message.error('网络请求异常');
                })
            },
        },
        created() {
                
        },
        mounted() {
          //党组织党员基本情况
          setTimeout(() => {
            // this.deptsinfo(this.$store.state.remberId, 1);
            // this.memberinfo(this.$store.state.remberId, 1);
            // this.jiguan(this.$store.state.remberId, 1);
            // this.org(this.$store.state.remberId, 1);
            // this.double(this.$store.state.remberId, 1);
            // this.city(this.$store.state.remberId, 1);
            // this.village(this.$store.state.remberId, 1);

            this.fazhan(this.$store.state.remberId, 1);
            this.dangjian(this.$store.state.remberId, 1);
            this.orgbase(this.$store.state.remberId, 1);
          },300)
        },
    }
</script>
<style>
  .set-tabs .ivu-tabs .ivu-tabs-content-animated {
      height: 95%;
  }
  .set-tabs .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    border-radius: 0;
    margin-right: 0px;
    border-top: 0px;
    border-left: 0;
  }
</style>
<style scoped>
    .items h3 {
        font-size: 14px;
        font-weight: bold;
        color: #222;
        margin: 15px 0px;
    }
    .items p {
        font-size: 14px;
        color: #222;
        line-height: 26px;
        margin: 6px 0px;
    }
    .tabs {
        border: 1px solid #e2e2e2;
        /*height: 500px;*/
        /*height: calc(100% - 77px);
        height: -webkit-calc(100% - 77px);*/
        margin: 20px;
        background: #fff;
        overflow: auto;
    }
    .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
        margin-right: 0px;
        border-radius: 0px;
        border-top: 0px;
    }
    .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
        /*border: 0px;*/
        color: #222;
    }
    .ivu-tabs{
      height: 95%;
      /*overflow-y: auto;*/
    }
    
    .ivu-tabs-bar {
        background: #f7f7f7;
    }
    .ivu-tabs .ivu-tabs-content {
        height: 100%;
    }
    .ivu-tabs .ivu-tabs-tabpane {
        padding: 0px 20px;
        /*height: calc(100% - 42px);
        height: -webkit-calc(100% - 42px);
        overflow: auto;*/
        height: 96%;
        overflow-y: auto;
    }
    .set-com {
        margin-top: 20px;
        margin-left: 10px;
    }
    .set-com button {
        background: #fff;
        margin-left: 10px;
    }
    .ivu-tabs { 
        background-color: #fff;
    }
    .slides-enter-active {
      transition: all .3s ease;
    }
    .slides-leave-active {
      transition: all .8s ease;
    }
    .slides-enter, .slides-leave-to
    {
      transform: translateX(800px);
      opacity: 0;
    }
</style>