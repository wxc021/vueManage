<template>
  <!--<div id="login">-->
    <!--<div class="login-title">-->
      <!--<img src="../assets/login-logo.png" alt="logo" />-->
      <!--<span>天津市党内统计信息系统</span>-->
    <!--</div>-->
    <!--<div class="login-body">-->
      <!--<div class="login-left">-->
        <!--<img src="../assets/login-left.png" alt="" class="login-left-img">-->
      <!--</div>-->
      <!--<div class="login-right">-->
        <!--<h3>欢迎使用</h3>-->
        <!--<div class="input-wrap">-->
          <!--<div class="input-group">-->
            <!--<Icon type="android-person" class="fz30"></Icon>-->
            <!--<div class="vertical"></div>-->
            <!--<input type="text" v-model="loginForm.username" class="input-text" placeholder="请输入用户名">-->
          <!--</div>-->
          <!--<div class="input-group">-->
            <!--<Icon type="android-unlock fz30 fz32"></Icon>-->
            <!--<div class="vertical ml12"></div>-->
            <!--<input type="password" class="input-text" v-model="loginForm.passwd" @keyup.enter="handleSubmit" placeholder="请输入密码">-->
          <!--</div>-->
          <!--<Button type="primary" class="w100p" @click="handleSubmit">登录</Button>-->
          <!--<div class="forget-password"><a href="javascript:">忘记密码</a></div>-->
          <!--<p class="footer-text">天津市党内统计信息系统 | 网络版（单机版）</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<div class="login">
    <div class="login-center">
        <div class="form-group">
            <h1>天津市党内统计信息系统</h1>
            <div class="input-item">
                <i class="user"></i>
                <input type="text" v-model="loginForm.username" placeholder="请输入用户名" autocomplete="off">
            </div>
            <div class="input-item">
                <i class="pwd"></i>
                <!-- <input type="password" v-model="loginForm.passwd" @keyup.enter="handleSubmit" placeholder="请输入密码" autocomplete="off"> -->
                <input type="password" v-model="loginForm.passwd" @keyup.enter="getKey" placeholder="请输入密码" autocomplete="off">
            </div>
             <button class="login-btn" @click="handleSubmit">登录</button>
            <!--<button class="login-btn" @click="getKey">登录</button>-->
            <!-- <p>
            <a href="javascript:">忘记密码?</a>
            </p> -->
        </div>
    </div>
</div>
</template>
<script>

const TIMEOUT = 8000;
let timeOuter = null;
export default {
    name: 'login',
    data () {
        const validateUser = (rule, value, callback) =>{
        if (value === '') {
            callback(new Error('请输入用户名'));
        }
        callback();
        }
        const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入密码'));
        }
        callback();
        };
        return {
            loginForm: {
                username: '',
                passwd: '',
                key: ''
            },
            formValidate: {
                username: [{ validator: validateUser, trigger: 'blur'}],
                passwd: [{ validator: validatePass, trigger: 'blur' }]
            }
        }
    },
    methods: {
        getUrl() {
            let result = window.location.hash;
            let re = /redirect=/;
            if (re.test(result)) {
                return decodeURIComponent(result.split('redirect=')[1]);
            } else {
                return null;
            }
        },
        handleSubmit (name) {
            let that = this;
            if (that.loginForm.username == '') {
                that.$Message.error('请输入用户名');
                return
            }
            if (that.loginForm.passwd == '') {
                that.$Message.error('请输入密码');
                return
            }

            this.login()
            .then(res => {
                let needData = res.data;
                if (needData.code == 200) {
                    that.$Message.success('登录成功!');
                    setTimeout(function() {
                    that.$router.push('/index')
                    }, 600)
                } else {
                    that.$Message.error(needData.msg);
                }
            })
            .catch(err => {
                that.$Message.error("网络请求错误");
            })
        },
        getUserInfo(){
            var that = this;
            this.axios({
                method: 'post',
                url: '/v1/user/logininfo-base',
            })
            .then(res => {
                let _data = res.data;
                if(_data.code == 200) {
                that.$router.replace('/index');
                }
            })
            .catch(error => {
                console.log('请求失败');
            })
        },
        handleReset (name) {
            localStorage.removeItem("djwtoken");
            this.$refs[name].resetFields();
        },
        login () {
            let qs = require('qs');
            return this.axios({
                method: 'post',
                url: '/v1/user/login',
                data: qs.stringify({
                username: this.loginForm.username,
                password: this.loginForm.passwd
                })
            })
        },
        loginWithKey () {
            let that = this;
            let qs = require('qs');
            return this.axios({
                method: 'post',
                url: '/v1/user/login-ukey',
                data: qs.stringify({
                username: that.loginForm.username,
                password: that.loginForm.passwd,
                ukey: that.loginForm.key
                })
            })
        },
        getKey() {
            clearTimeout(timeOuter)
            this.listenKey();
            var evt = document.createEvent("CustomEvent");  
            evt.initCustomEvent('startRockeyEvent', true, false, {type: 'getkey'});  
            document.dispatchEvent(evt);
        },
        listenKey() {
            document.addEventListener('receiveKey', this.reciveKey, false);
            timeOuter = setTimeout(() => {
                this.removeListenKey();
                this.$Message.error("获取Ukey信息超时，请安装并启用浏览器扩展后插入Ukey重试");
            }, TIMEOUT)
        },
        removeListenKey() {
            document.removeEventListener('receiveKey', this.reciveKey);
        },
        reciveKey(event){
            clearTimeout(timeOuter)
            this.removeListenKey();
            let msg = sessionStorage.getItem('key');
            if (msg === 'Error') {
                this.$Message.error("获取Ukey信息失败，请检查Ukey是否插入");
                return;
            }
            this.loginForm.key = msg;

            this.handleSubmit();

        }
    },
    mounted() {
        var that = this;
        this.getUserInfo();
        // this.listenKey();
    }
}
</script>
<style scoped>
  .login{
    width: 100%;
    height: 100%;
    display:flex;
    justify-content:center;
    align-items: center;
    background: url("../assets/bg01.png") top center;
    background-size: cover;
  }
  .login-center{
    width: 978px;
    height: 574px;
    overflow: hidden;
    background: url("../assets/login-gif.gif") no-repeat;
  }
  .form-group{
    width: 326px;
    height: 260px;
    margin: 171px auto 0;
    text-align: center;
  }
  .login-btn{
    width: 326px;
    height: 48px;
    background: #fbd24c;
    margin-top: 30px;
    border: none;
    outline:none;
    border-radius: 3px;
    font-size: 22px;
    color: #ef4132;
    cursor: pointer;

  }
  .input-item{
    width: 326px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    overflow: hidden;
    margin-top: 20px;
    background: #ffffff;
  }
 .input-item i{
   width: 48px;
   height: 28px;
   float: left;
   margin-top: 6px;
   border-right:1px solid #dfd8d4;
 }
 .input-item i.user{
   background: url("../assets/icon-user.png") center no-repeat;
 }
 .input-item i.pwd{
   background: url("../assets/icon-password.png") center no-repeat;
 }
 .input-item input{
   height: 40px;
   line-height: 40px;
   width: 276px;
   border: none;
   outline: none;
   display: block;
   float: left;
   text-indent:13px;
 }
 p{
   color: #fff;
   text-align: right;
   margin-top: 13px;
 }
 p a{
   color: #fff;
   font-size: 12px;
 }
  h1{
    color: #fffffd;
    /*letter-spacing: 5px;*/
    font-size: 28px;
  }
</style>
