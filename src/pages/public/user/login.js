import UserService from "@/service/public/UserService.js";
import store from "@/vuex/store";
import { postS, getS } from "@/service/public/service.js";
import Vue from "vue";

const mixin = {
    data() {
        return {
            vType: "v1",
            passKey: {},
            codeImg: "/static/public/image/common/code2.jpg",
            dengjiImg: "/static/public/image/common/vip-sprites.png",
            code_show: 0,
            // 用户名和密码提示语
            usertipMsg: "请输入正确的帐号密码",
            psdtipMsg: "帐号或密码错误",
            // 错误信息
            pulicError: "",
            //isShowTnCode : JSON.parse(localStorage.config).VerificationCode.pc[0]=='tCode' ? true : false,
            tn_code_show:0, 
            isShowTnCode:false,
            websiteName:this.$websiteName,
            wm:null,
            anti_code2:""
        };
    },
    mounted() {
        // this.initWyToken();
    },
    methods: {
        tipMsg() {
            switch (this.$tipMsg) {
                case "new":
                    this.usertipMsg = "请输入正确的帐号密码";
                    this.psdtipMsg = "帐号或密码错误";
                    break;
                case "old":
                    this.usertipMsg = "请输入正确的帐号密码";
                    this.psdtipMsg = "帐号或密码错误";
                    break;
                default:
                    this.usertipMsg = "请输入正确的帐号密码";
                    this.psdtipMsg = "帐号或密码错误";
                    break;
            }
        },
        getRedLope(){
            this.$store.dispatch('home/getQipaiShouyeHongbao').then(res=>{
                 if(res.code === 200){
                     try{
                        this.$store.commit('home/getRedLopeMoney',res.data.gift_money)
                        this.$store.commit('home/getRedLopeId',res.data.id)
                        this.$store.commit('home/getRedLopeType',res.data.send_type)
                     }catch(error){
                        this.$store.commit('home/getRedLopeMoney', 0)
                     }
                     this.$store.commit('home/getisRedLop',true)
                 }
            })
          },
        getCode() {
            this.initWyToken();
            if (this.tn_code_show == 0) {
                return;
            }
            if (!this.passKey.userName) {
                return false;
            }
            if (this.passKey.userName.length < 5) {
                this.errorAlert(this.usertipMsg, "warn");
                this.passKey.userName = "";
                return false;
            }
            getS(`captcha`, { userName: this.passKey.userName }).then(res => {
                if (res.code == 200) {
                    this.codeImg = res.data.captcha_image_text;
                    this.passKey.captcha_key = res.data.captcha_key;
                } else {
                    this.errorAlert(res.message, "warn");
                }
            });
        },
        // 密码框禁止输入空格
        clearNull(){
            // this.passKey.password = this.passKey.password.replace(/\s+/g,"");
        },
        initWyToken(){
            // 初始化SDK，只需初始化一次
            // auto使用默认值，即自动化模式
            let that = this;
            initWatchman({
                productNumber: 'YD00815584448686',
                onload: function (instance) {
                    if (JSON.parse(localStorage.getItem('config')).antiCheatSystem && JSON.parse(localStorage.getItem('config')).antiCheatSystem == 'on') {
                        instance.getToken('b0ee4d4447ca4bdb8a39b92a27378b8e', function(token) {
                            that.anti_code2 = token;
                        });
                        
                    }
                }
            });
        },
        login(name) {
            if(this.$websiteName == "betsb"){
                this.$errorAlert('预览版 暂未开放', 'warn');
                return false
            }
            if(name == 'betsb' || name == 'mgm-preview' || name == 'betsb-preview'){
                this.$errorAlert('预览版 暂未开放', 'warn')
                return false
            }else{
                if (!this.passKey.userName) {
                    this.errorAlert("请输入帐号", "warn");
                    return false;
                }
                if (!this.validateLoginPwd(this.passKey.userName)) {
                    this.errorAlert(this.usertipMsg, "warn");
                    return false;
                }
                if (!this.passKey.password) {
                    this.errorAlert("请输入密码", "warn");
                    
                    return false;
                }
                if (!this.validateLoginPwd(this.passKey.password)) {
                    this.errorAlert(this.psdtipMsg, "warn");
                    return false;
                }
                if (this.code_show) {
                    if (!this.passKey.code) {
                        this.errorAlert("验证码请务必输入", "warn");
                        return false;
                    }
                }
                if (this.code_show) {
                    if (this.passKey.code.length < 4 || this.passKey.code.length > 4) {
                        this.errorAlert("请输入4位验证码", "warn");
                        return false;
                    }
                }
                this.passKey.anti_code = this.anti_code2;
                this.passKey.device = "pc";
                if(this.isShowTnCode) {
                     this.$store.commit('home/safeStatus', true)
                     this.$store.commit('home/safeCheck', 1)
                     this.$store.commit('home/safeName',this.passKey.userName)
                     this.$store.commit('home/isLoginorRegister','login')
                    setTimeout(()=>{
                      this.$store.commit('home/safeCheck', 2)
                    },this.getRandom(1600,3200))
                }else{
                    this.loginOpt(this.passKey);
                    
                }
            }
            
        },
        loginOpt(params) {
            if(this.isShowTnCode){
                this.$store.commit('home/safeLogin', '')
            }
            let vType = this.vType;

            for (let key in params) {
                if (!params[key]) delete params[key];
            }
            postS(`login`, params).then(res => {
                if (res.code == 200) {
                    if (!res.data.token && res.data.userInfo.userType == "vm") {
                        this.vType = "vm";
                        Vue.prototype.$HOST_NAME = "/frontend/vm";
                        this.loginOpt(params);
                        return false;
                    } else {
                        // 一切正常
                        UserService.setCachereg(res, vType);
                        setTimeout(()=>{
                            UserService.vpGetBasWebsocIo();
                         })
                         this.getRedLope();
                        if (["qygj", "xpj80", 'bet365', 'betsb', 'jsyl', "cmgm", 'pjdc', 'tycjt', 'tyc82'].includes(this.$websiteName)) {
                            if (this.passKey.password.length < 8) {
                                localStorage.setItem('qyLogin', true)
                            }
                        }
                        window.location.href = "/";
                        // if(["qygj", 'bet365',"pjdc","jltx","xpj","mgm","amvnsr","jsyl",'amxpj','blr'].includes(this.$websiteName)){
                        //     this.$router.push("/home");
                        // }else{
                        // }
                    }
                    localStorage.setItem('relope', true) 
                } else {
                    this.errorAlert(res.message, "warn");
                    this.is_code_show();
                }
            });
        },
        logout() {
            UserService.logout.call(this);
        },
        is_code_show() {
            this.$store.commit('home/reloadeKefu',false)
            getS(`is-show-captcha-with-type`, { device: 'pc' }).then(res => {
                if (res && res.code === 200) {
                    this.code_show = res.data.isShowCaptcha;
                    this.tn_code_show = res.data.isShowCaptcha
                    this.$store.commit('home/wyToken', res.data.key)
                    this.isShowTnCode = res.data.captchaType === 'wyCode'
                    if(this.isShowTnCode){
                        this.code_show = 0
                    }
                    if (this.code_show == 1) {
                        this.getCode();
                    }
                }
            });
        },
        errorAlert(errMsg, type) {
            errMsg = errMsg || "错误";
            type = type || "warn";
            let $loginStyle = this.$loginStyle;
            if (this.$router.history.current.path.includes("/plays/hall")) {
                $loginStyle = 2;
            }
            switch ($loginStyle) {
                case 1:
                    this.pulicError = errMsg;
                    break;
                case 2:
                    // 常用弹框
                    this.$store.commit("alert/showTipModel", {
                        bool: true,
                        title: errMsg,
                        model: type
                    });
                    break;
                case 3:
                    // 第三种
                    this.dNotify(errMsg, type);
                    break;
                case 4:
                    // qygj,特殊弹框
                    this.$store.commit("alert/newshowtip", {
                        bool: true,
                        title: errMsg,
                        model: "",
                        leftspan: true
                    });
                    break;
                default:
                    // 常用弹框
                    this.$store.commit("alert/showTipModel", {
                        bool: true,
                        title: errMsg,
                        model: type
                    });
                    break;
            }
        }
    },
    created() {
        // if(this.$store.state.home.isImgortg=='tCode'||this.$store.state.home.isImgortg=='wyCode'){
        //       this.isShowTnCode = true
        // }else{
        //       this.isShowTnCode = false
        // }
        this.is_code_show();
        this.tipMsg();
    },
    computed:{
        safeLogin(){
            return this.$store.state.home.safeLogin
        },
        isImgortg(){
            return this.$store.state.home.isImgortg
        },
        reloadeKefu () {
            return this.$store.state.home.reloadeKefu
        }
    },
    watch:{
        safeLogin:function(val){
            if(val=='login'){
                if(this.isShowTnCode){
                    if(this.tn_code_show){
                        this.passKey.code='9695'
                    } 
                    this.loginOpt(this.passKey);
                }
            }
        },
        reloadeKefu:function(val){
            if(val){
                // if(this.$store.state.home.isImgortg=='tCode'||this.$store.state.home.isImgortg=='wyCode'){
                //     this.isShowTnCode = true
                // }else{
                //     this.isShowTnCode = false
                // }
                this.is_code_show();
            }
        }
    },
    store
};

export default mixin;