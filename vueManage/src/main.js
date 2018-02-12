import Vue from 'vue'
import jQuery from 'jquery'
import router from './router/router'
import axios from '@/store/axios'
import store from './store/store'
import iView from 'iview'
 //import 'iview/dist/styles/iview.css'
import '@/less/theme.less'
import '@/css/comm.css'
import '@/lib/webuploader-0.1.5/webuploader.css'
import 'element-ui/lib/theme-default/index.css'
Vue.prototype.axios = axios;
Vue.prototype.renders = function(label){
  "use strict";
  return label[label.length-1]
};

Vue.use(iView)

window.globalUploadUrl = '';
if (window.location.hostname === '10.99.153.22') {
  globalUploadUrl = 'http://10.99.153.7:8880/mptup'
} else {
  globalUploadUrl = 'http://10.20.1.141:8880/mptup'
}

window.$ = jQuery
window.jQuery = jQuery
window.debug = true
Vue.prototype.goback = function() {
  this.$router.go(-1);
};
/**
 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
 * Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
 * Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
 * Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
 * Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
 * Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function(fmt) {
  var o = {
    "Y+" : this.getFullYear(),
    "M+" : this.getMonth() + 1,
    // 月份
    "d+" : this.getDate(),
    // 日
    "h+" : this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
    // 小时
    "H+" : this.getHours(),
    // 小时
    "m+" : this.getMinutes(),
    // 分
    "s+" : this.getSeconds(),
    // 秒
    "q+" : Math.floor((this.getMonth() + 3) / 3),
    // 季度
    "S" : this.getMilliseconds()
    // 毫秒
  };
  var week = {
    "0" : "/u65e5",
    "1" : "/u4e00",
    "2" : "/u4e8c",
    "3" : "/u4e09",
    "4" : "/u56db",
    "5" : "/u4e94",
    "6" : "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
      .substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt
      .replace(
        RegExp.$1,
        ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f"
          : "/u5468")
          : "")
        + week[this.getDay() + ""]);
  }
  for ( var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
        : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
}).$mount('#app')

