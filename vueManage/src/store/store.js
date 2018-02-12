import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios'
Vue.use(Vuex)
const ajax = function(url,type) {
  return  axios({
              method: 'get',
              url: url,
              params: {
                  type: type,
              }
          })
}
const url = '/v1/dictionary/get-list-by-type'
const store = new Vuex.Store({
    state: {
      isHistory: false, //历史党支部
      token: '',
      isClose: false,
      infoData: {},
      isEdit: false, //是否是编辑状态
      isLoading : false, // 全局的网络请求状态，现用于信息校核的加载状态
      slideBar: false,
      slideData: {},
      flashType: 0,
      flashType2: 0,
      strictRefalsh: false,//数据保存后强制跟新
      remberId: '',//记住当前树结点的id
      remberNode: {},//记住当前树节点的整个数据
      realtive: [],//组织属地关系
      dangType: [], //党组织类型
      voteStyle: [], //党组织领导班子选举方式
      duty: [], // 党内职务
      rewardPenalties: [],//党组织奖惩
      discussResult: [], //党员民主评议结果
      personRP: [],//党员奖惩名称
      rewardReason: [], //党员奖惩原因
      discussRP: [],//党员民主评议奖惩情况
      departmentLevel: [],//党员奖惩批准机关级别
      nation: [],//民族
      healthStatus: [],//健康状况
      marriedStatus: [],//婚姻状况
      adminDutity: [],//行政职务
      adminDutityLeval: [],//行政职务级别
      edicational: [],//学历
      wordArea: [], //世界各国和地区名称
      outReason: [],// 出国（出境）原因
      socialId: [], // 新的社会阶层标识
      joinType: [], //党员加入中共组织的类型
      workType: [], // 工作岗位类型
      deputyLeval: [], //党代表级别
      deputyType: [], //党代表类型
      getDeputyType: [],//进入党支部类型
      checkPearson: {},//选择的内部人员
      unitId:'',//党组织单位信息新增单位ID
      RP: [],//党组织奖惩对应的优秀数据
      remberStatus: true,
	    combinatorQueryData:[],//保存党组织组合查询list 数据
	    combUnitData:[],//保存单位组合查询list 数据
	    combMemberData:[],//保存党员组合查询list 数据
	    combApplicatData:[],//保存申请人组合查询list 数据
	    isComQuery:false,//是否为党员组合查询
	    isApplicationQuery:false,//是否为申请人组合查询
	    location:[],//组合查询 tree节点信息
    },
    mutations: {

      // 全局的请求状态
      setLoading(state, payload){
        let status = payload == undefined ? true : payload;
        state.isLoading = status;
      },

      setCheckPearson(state, payload) {
        state.checkPearson = Object.assign({}, payload);
      },
      //录改
      setStatus(state, payload) {
        state.remberStatus = payload.stat;
      },
      //历史党支部
      setHistory(state, payload) {
        if (payload) {
          state.isHistory = false;
        } else {
          state.isHistory = !state.isHistory;
        }
      },
      //是否是编辑状态
      setEdit(state, payload) {
        state.isEdit = payload.isDisable;
      },
      setSlideBar(state, payload) {
        state.slideBar = payload.isShow;
        state.slideData = payload.sliderow;
      },
      setStrict(state, payload) {
        state.strictRefalsh = !state.strictRefalsh;
      },
      setFlash(state, payload) {
        state.flashType = payload.type;
      },
      setFlash2(state, payload) {
        state.flashType2 = payload.type;
      },
      setId(state, payload) {
        state.remberId = payload.id;
      },
      setNode(state, payload) {
        state.remberNode = payload.data;
      },
      switchs(state) {
        state.isClose = !state.isClose;
      },
      setToken(state, data) {
        localStorage.setItem('djwtoken', data);
        state.token = data;
      },
      delToken(state) {
        state.token = '';
        localStorage.removeItem("djwtoken");
      },
      getRP(state, data) {
        let that = data._;
        if (state.RP.length) {
          return;
        }
        ajax(url, 'D03052')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.RP.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //党内职务
      getDuties(state, data) {
        let that = data._;
        if (state.duty.length) {
          return;
        }
        ajax(url, 'D03052')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.duty.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //党组织奖惩
      getRewardPenalties(state, data) {
        let that = data._;
        if (state.rewardPenalties.length) {
          return;
        }
        ajax(url, 'D01022')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.rewardPenalties.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //组织属地关系
      getRealtive(state, data) {
        let that = data._;
        if (state.realtive.length) {
          return;
        }
        ajax(url, 'D01022')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.realtive.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //党组织类型
      getType(state, data) {
        let that = data._;
        if (state.dangType.length) {
          return;
        }
        ajax(url, 'D01021')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.dangType.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //党组织领导班子选举方式
      getVote(state, data) {
        let that = data._;
        if (state.voteStyle.length) {
          return;
        }
        ajax(url, 'KZ13')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.voteStyle.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //党员民主评议结果代码
      getDicussResult(state, data) {
        let that = data._;
        if (state.discussResult.length) {
          return;
        }
        ajax(url, 'C06007')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.discussResult.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //党员奖惩名称代码
      getPersonRP() {
        let that = data._;
        if (state.personRP.length) {
          return;
        }
        ajax(url, 'C12002')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.personRP.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //党员奖惩原因
      getRewardReason() {
        let that = data._;
        if (state.rewardReason.length) {
          return;
        }
        ajax(url, 'C12004')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.rewardReason.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //党员民主评议奖惩情况
      getDiscussRP() {
        let that = data._;
        if (state.discussRP.length) {
          return;
        }
        ajax(url, 'C06011')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.discussRP.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //党员奖惩批准机关级别
      getDepartmentLevel() {
        let that = data._;
        if (state.departmentLevel.length) {
          return;
        }
        ajax(url, 'C12007')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.departmentLevel.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //民族
      getNation() {
        let that = data._;
        if (state.nation.length) {
          return;
        }
        ajax(url, 'A01017')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.nation.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //健康状况
      getHealthStatus() {
        let that = data._;
        if (state.healthStatus.length) {
          return;
        }
        ajax(url, 'A01017')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.healthStatus.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //婚姻状况
      getMarriedStatus() {
        let that = data._;
        if (state.marriedStatus.length) {
          return;
        }
        ajax(url, 'A01031')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.marriedStatus.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //行政职务
      getAdminDutity() {
        let that = data._;
        if (state.adminDutity.length) {
          return;
        }
        ajax(url, 'A02015A')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.adminDutity.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //行政职务级别
      getAdminDutityLeval() {
        let that = data._;
        if (state.adminDutityLeval.length) {
          return;
        }
        ajax(url, 'A02021')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.adminDutityLeval.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //学历
      getEdicationall() {
        let that = data._;
        if (state.edicational.length) {
          return;
        }
        ajax(url, 'A08001A')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.edicational.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //世界各国和地区名称
      getWordArea() {
        let that = data._;
        if (state.wordArea.length) {
          return;
        }
        ajax(url, 'A12001A')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.wordArea.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //出国（出境）原因
      getOutReason() {
        let that = data._;
        if (state.outReason.length) {
          return;
        }
        ajax(url, 'A12014')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.outReason.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //新的社会阶层标识
      getSocialId() {
        let that = data._;
        if (state.socialId.length) {
          return;
        }
        ajax(url, 'A39041')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.socialId.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //党员加入中共组织的类型
      getJoinType() {
        let that = data._;
        if (state.joinType.length) {
          return;
        }
        ajax(url, 'C02011')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.joinType.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //工作岗位类型
      getWorkType() {
        let that = data._;
        if (state.WorkType.length) {
          return;
        }
        ajax(url, 'A48007')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.WorkType.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //党代表级别
      getDeputyLeval() {
        let that = data._;
        if (state.deputyLeval.length) {
          return;
        }
        ajax(url, 'DT03')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.deputyLeval.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //党代表类型
      getDeputyType() {
        let that = data._;
        if (state.deputyType.length) {
          return;
        }
        ajax(url, 'DT02')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.deputyType.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
      //进入党支部类型
      getDepartType() {
        let that = data._;
        if (state.departType.length) {
          return;
        }
        ajax(url, 'C03043')
        .then(res => {
              let needData = res.data;
              if (needData.code == 200) {
                  needData.data.forEach(item => state.departType.push(item))
              } else {
                  that.$Message.error(needData.msg);
              }
        })
        .catch(error => {
          that.$Message.error('网络请求异常');
        })
      },
	    setCombinatorQueryData(state, data){
		    state.combinatorQueryData = data.postDataArr;
		    //state.location = data.location;
	    },
	    setCombUnitData(state, data){
		    state.combUnitData = data.postDataArr;
	    },
	    setCombMemberData(state, data){
		    state.combMemberData = data.postDataArr;
	    },
	    setCombApplicatData(state, data){
		    state.combApplicatData = data.postDataArr;
	    },
	    setIsComQuery(state,data){
		    state.isComQuery = data.isComQuery;
	    },
	    setIsApplicationQuery(state,data){
		    state.isApplicationQuery = data.isApplicationQuery;
	    }
    },
    getters: {
    	myResult: state => state.isClose
    },
    actions: {

    }
})
export default store
