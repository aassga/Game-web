import UserService from '@/service/public/UserService.js'
import { _SetPost, postS, getS } from '@/service/public/service.js'
import store from '@/vuex/store'
import Vue from 'vue'


const mixin = {
    data() {
        return {
            // 请求的方式vm/v1
            params:{},
            vType: 'v1',
            // 用户名信息
            userName: '',
            password: '',
            password_confirmation: '',
            phoneNumber: '',
            pulicError: '',
            // 手机号等信息
            register: [],
            // 验证码
            iscode: false,
            codeImg: '/static/public/image/common/code2.jpg',
            captcha_key: '',
            code: '',
            // 邀请码相关
            agent: null,
            // 无用
            // islink:true,
            // 邀请码，只读
            incodeReadonly: false,
            // 邀请码
            intacode: '',
            // 单独的一些配置
            isCheckbox: true,
            checkSrc: '/static/public/image/common/xuanzhong.png',
            //同意注册条款
            agree: true,
            //短信验证码
            smsCode: '',
            isShowSms: false,
            hasSendMsg: false, //发送验证码之前显示该按钮,点击之后显示计时,该按钮变为灰色不可用
            countDownTime: 60, //倒计时
            //isShowTnCode : JSON.parse(localStorage.config).VerificationCode.pc[0]=='tCode' ? true : false,
            isShowTnCode:false,
            Watchman:null,
            anti_code:"",
            countInitWy:0,
        }
    },
    mounted() {
        this.inInMounted();
    },
    methods: {
        //获取验证码
        inInMounted(){
            this.agent = this.GetQueryString('agent') || this.GetQueryString('k');
            this.intacode = this.agent;
            this.incodeReadonly = !!this.agent
            
            if(this.$store.state.home.isImgortg=='imgCode'){
                this.isShowTnCode = false
            }else{
                this.isShowTnCode = true
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
        inInCreate(){
            this.agent = this.GetQueryString('agent') || this.GetQueryString('k');
            this.intacode = this.agent;
            let registerPc = JSON.parse(localStorage.getItem('config')).register.pc
            let registermodel = JSON.parse(localStorage.getItem('config')).site_model
            if (registermodel == 'invite_code') {
                this.iscode = true;
            } else {
                this.iscode = false;
            }
            registerPc.forEach((v, i) => {
                this.register[i] = {}
                switch (v) {
                    case 'phone':
                        this.register[i].placeholder = '请输入手机号'
                        this.register[i].value = ''
                        this.register[i].key = v
                        this.register[i].name = '手机号码'
                        this.register[i].divclass = "shoujihao"
                        this.register[i].maxlength = 11
                        break
                    case 'email':
                        this.register[i].placeholder = '请输入邮箱地址'
                        this.register[i].value = ''
                        this.register[i].key = v
                        this.register[i].name = '邮箱'
                        this.register[i].divclass = "youxiang"
                        this.register[i].maxlength = 20
                        break
                    case 'wechat':
                        this.register[i].placeholder = '请输入微信号'
                        this.register[i].value = ''
                        this.register[i].key = v
                        this.register[i].name = '微信'
                        this.register[i].divclass = "weixin"
                        this.register[i].maxlength = 20
                        break
                    case 'realName':
                        this.register[i].placeholder = '请输入真实姓名'
                        this.register[i].value = ''
                        this.register[i].key = v
                        this.register[i].name = '真实姓名'
                        this.register[i].divclass = "yonghu"
                        this.register[i].maxlength = 10
                        break
                    case 'payPassword':
                        this.register[i].placeholder = '请输入支付密码'
                        this.register[i].value = ''
                        this.register[i].key = v
                        this.register[i].name = '支付密码'
                        this.register[i].divclass = "zhifumima"
                        this.register[i].maxlength = 6
                        break
                }
            })
    
            if (registerPc.includes('phone') && registerPc.includes('sms')) {
                this.isShowSms = true;
            } else {
                this.isShowSms = false;
    
            }
            this.register = this.register.filter((item, index) => {
                return JSON.stringify(item) !== "{}"
            })
        },
        registerCode(){
            if (!this.userName) {
                return false
            }
            if (this.userName.length < 5) {
                this.errorAlert("请输入6位帐号", 'warn')
                this.userName = ''
                return false
            }
            getS(`captcha`, { userName: this.userName }).then(res => {
                if (res.code == 200) {
                    this.codeImg = res.data.captcha_image_text
                    this.captcha_key = res.data.captcha_key
                }
            })
        },
        getCode() {
            if(JSON.parse(localStorage.getItem('config')).antiCheatSystem && JSON.parse(localStorage.getItem('config')).antiCheatSystem == 'on'){
                this.initWyToken2();
            }
            if (!this.userName) {
                return false
            }
            if (this.userName.length < 5) {
                this.errorAlert("请输入6位帐号", 'warn')
                this.userName = ''
                return false
            }
            getS(`captcha`, { userName: this.userName }).then(res => {
                if (res.code == 200) {
                    this.codeImg = res.data.captcha_image_text
                    this.captcha_key = res.data.captcha_key
                }
            })
        },
        //获取短信验证码
        async getMsgCode() {
            //0.获取用户输入的电话号码
            this.register.forEach(item => {
                    if (item.key == 'phone') {
                        this.phoneNumber = item.value;
                    }
                })
                //1.调用接口, 发起请求
                //1.1先判断电话号码是否为空/正确
            if (!this.phoneNumber) {
                this.errorAlert('请输入手机号', 'warn')
            } else if (!this.testPhone(this.phoneNumber)) {
                this.errorAlert('请输入正确的手机号码', 'warn')
            } else {
                let res = await getS(`getSmsCode`, { phone: this.phoneNumber, device: 'pc' });

                if (res && res.code == 200) {
                    //2.获取验证码按钮变为无效,
                    this.hasSendMsg = true;
                    //3.出现倒计时 59S

                    let countTimer = setInterval(() => {
                        this.countDownTime--;

                        if (this.countDownTime <= 0) {
                            this.hasSendMsg = false;
                            clearInterval(countTimer);
                            this.countDownTime = 60;
                        }
                    }, 1000);
                    //4.表单提示: '验证码已发送,2分钟内输入有效'
                    //5.倒计时结束并消失 获取验证码按钮变为有效, 表单提示消失
                } else {
                    this.errorAlert(res.message, 'warn')
                    return false
                }
            }
        },
        // 密码框禁止输入空格
        clearNull(){
            // this.password_confirmation = this.password_confirmation.replace(/\s+/g,"");
            // this.password = this.password.replace(/\s+/g,"");
        },
        changeTab(num){
            this.tabIndex = num;
            this.showForm = num;
            if (num == 1) {
                this.passKey.userName = '';
                this.passKey.password = '';
                this.passKey.code = '';
            }else{
                this.userName = "";
                this.password = "";
                this.password_confirmation = "";
                this.code = "";
                this.smsCode = "";
                // this.intacode = '';
                this.register.forEach(v => {
                    v.value = "";
                });
            }
        },
        //重置
        replaceMent() {
            this.userName = "";
            this.password = "";
            this.password_confirmation = "";
            this.code = "";
            this.smsCode = "";
            this.register.forEach(v => {
                v.value = "";
            });
        },
        initWyToken2(){
            // 初始化SDK，只需初始化一次
            // auto使用默认值，即自动化模式
            let that = this;
            initWatchman({
                productNumber: 'YD00815584448686',
                onload: function (instance) {
                    instance&&instance.getToken('b0ee4d4447ca4bdb8a39b92a27378b8e', function(token) {
                        that.anti_code = token;
                    },function(error) {
                        if(that.countInitWy<=3)  that.initWyToken2();
                        else that.anti_code = '9ca17ae2e6ffcda170e2e6ee86c77eacbfc097d27a82b08fa2d85f968a9faeae64acad9bd5e76eb5b89696e82af0feaec3b92af1ada4abea4df28d8290d55e978e9bb2d54f8eaea48cbc5bb1bcaa8de860e9efee9e'
                    });
                }
            });
        },
        // 预注册
        async registerTest() {
            
            if(this.$websiteName == "betsb"){
                this.$errorAlert('预览版 暂未开放', 'warn');
                return false
            }
            if(this.isShowTnCode){
                this.$store.commit('home/safeLogin', '')
            }
            let staueAcc = this.validateAccountUserNamenew(this.userName)
            let stauePassword = this.validateLoginPwd(this.password)
                // 确认年龄框
            if (!this.isCheckbox) {
                this.errorAlert("请确认您是否年满18周岁")
                return false
            }
            if (!staueAcc) {
                this.errorAlert('帐号6-10位数字或字母', 'warn')
                return false
            }
            if (!stauePassword) {
                this.errorAlert('密码8-20位数字或字母', 'warn')
                return false
            }

            if (this.password == this.userName) {
                this.errorAlert('登录密码不能与帐号相同', 'warn')
                return false
            }
            if (this.password !== this.password_confirmation) {
                this.errorAlert('两次密码不一致', 'warn')
                return false
            }

            //当有短信验证码时需判断
            if (this.isShowSms) {
                let reg = /^\d{6}$/;
                if (this.smsCode.length == 0) {
                    this.errorAlert('请输入短信验证码', 'warn')
                    return false
                } else if (this.smsCode.length !== 6) {
                    this.errorAlert('请输入6位验证码', 'warn')
                    return false
                } else if (!reg.test(this.smsCode)) {
                    this.errorAlert('短信验证码只能是数字!', 'warn');
                    return false
                }
            }
            //当短信验证码显示的时候不显示验证码
            if (!this.isShowSms&&!this.isShowTnCode) {
                if (this.code.length == 0) {
                    this.errorAlert('请输入验证码', 'warn')
                    return false
                } else if (this.code.length < 4 || this.code.length > 4) {
                    this.errorAlert('请输入4位验证码', 'warn')
                    return false
                }
            }


            //如果还没获取验证码,需先获取
            if (this.isShowSms) {
                if (!this.hasSendMsg) {
                    this.errorAlert('请先发送正确的验证码', 'warn')
                    return false
                }
            }

            if (this.iscode == true) {
                if (!this.intacode) {
                    this.errorAlert('请输入6位邀请码', 'warn')
                    return false
                }
                if (this.intacode.length < 6 || this.intacode.length > 6) {
                    this.errorAlert('请输入6位邀请码', 'warn')
                    return false
                }
            }
            if (!this.agree) {
                this.errorAlert('请确认同意各项开户条约,', 'warn')
                return false
            }
            this.params = {}
            this.params.userName = this.userName
            this.params.password = this.password
            if (!this.isShowSms) {
                if(this.isShowTnCode){
                    this.params.code = '6569'
                }else{
                    this.params.code = this.code
                }
            }
            this.params.sms = this.smsCode
            this.params.device = 'pc'
            this.params.captcha_key = this.captcha_key
            this.params.anti_code = this.anti_code;
            let flag = true

            // 邀请码
            if (this.intacode) {
                this.params.invite_code = this.intacode
            }

            for (let i = 0; i < this.register.length; i++) {
                if (JSON.stringify(this.register[i]) !== '{}' && !this.register[i].value) {
                    this.errorAlert(this.register[i].placeholder, 'warn')
                    flag = false
                    break
                }
                this.params[this.register[i].key] = this.register[i].value
            }

            if (!flag) {
                return false
            }
            // 邀请码
            if (this.agent) {

                this.params.agent = this.agent
                this.params.invite_code = this.agent
            }
            
            let res = await _SetPost(
                `${this.$HOST_NAME}/checkUsername/${this.userName}`, {}
            )
            if (res && res.code == 200) {} else {
                this.errorAlert('帐号已存在', 'warn')
                return false
            }
            if(this.isShowTnCode) {
                this.$store.commit('home/safeStatus', true)
                this.$store.commit('home/safeCheck', 1)
                this.$store.commit('home/safeName',this.params.userName)
                this.$store.commit('home/isLoginorRegister','register')
               setTimeout(()=>{
                 this.$store.commit('home/safeCheck', 2)
               },this.getRandom(1600,3200))
           }else{
            this.registerSubmit()
           }
        },
        // 注册提交
        async registerSubmit() {
            let vType = this.vType;
            
            
            for (let key in this.params) {
                if (!this.params[key]) delete this.params[key];
            }
            let res = await postS(`userRegister`, this.params, vType)
            if (res.code == 200) {
                if (!res.data.token && res.data.userInfo.userType == 'vm') {
                    this.vType = 'vm';
                    Vue.prototype.$HOST_NAME = '/frontend/vm'
                    this.registerSubmit();
                    return false;
                } else {
                    UserService.setCachereg(res, vType);
                    setTimeout(()=>{
                        UserService.vpGetBasWebsocIo();
                    })
                    this.getRedLope();
                    if (res.data.activity_url) {
                        window.location.href = location.origin + res.data.activity_url
                    } else {
                        window.location.href = "/";
                        // if(["qygj","bet365","pjdc","jltx","xpj",'mgm',"amvnsr","jsyl",'blr'].includes(this.$websiteName)){
                        //     this.$router.push("/home");
                        // }else{
                        // }
                    }
                }
            }
            if (res.code === 400 && res.status === 'error') {
                this.errorAlert(res.message, 'error')
            } else {
                this.errorAlert(res.message, 'error')
                this.getCode()
            }
        },

        // 注册的错误提示
        errorAlert(errMsg, type) {
            if (errMsg == "code 字段必须填写") {
                errMsg = "验证码不能为空!"
            }
            if (errMsg == "code 必须全部由字母和数字构成") {
                errMsg = "验证码错误!"
            }

            errMsg = errMsg || "错误";
            type = type || 'warn';

            let $registerStyle = this.$registerStyle;
            if (this.$router.history.current.path.includes('/plays/hall')) {
                $registerStyle = 2
            }
            switch ($registerStyle) {
                case 1:
                    this.pulicError = errMsg;
                    break;
                case 2:
                    // 常用弹框
                    this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: errMsg,
                        model: type
                    });
                    break;
                case 3:
                    // 第三种
                    this.dNotify(errMsg, type)
                    break;
                case 4:
                    // qygj,特殊弹框
                    this.$store.commit('alert/newshowtip', {
                        bool: true,
                        title: errMsg,
                        model: '',
                        leftspan: true
                    })
                    break;
                default:
                    // 常用弹框
                    this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: errMsg,
                        model: type
                    });
                    break;
            }
        },
        changeSrc() {
            this.isCheckbox = !this.isCheckbox;
            if (this.isCheckbox) {
                this.checkSrc = '/static/public/image/common/xuanzhong.png'
            } else {
                this.checkSrc = '/static/public/image/common/weixuanzhong.png'
            }
        }
    },
    computed:{
        safeLogin(){
            return this.$store.state.home.safeLogin
        },
        // reloadeKefu () {
        //     return this.$store.state.home.reloadeKefu
        // }
    },
    watch:{
        safeLogin:function(val){
            if(val=='register'){
                if(this.isShowTnCode){
                    this.registerSubmit();
                }
            }
        },
        reloadeKefu:function(val){
            if(val){
               this.inInCreate();
               this.inInMounted();
            }
        }
    },
    created() {
        if(JSON.parse(localStorage.getItem('config')).register.pc){
            this.inInCreate();
        }else{
            setTimeout(()=>{
                this.inInCreate();
             },3500)
        }
    },
    store
}


export default mixin