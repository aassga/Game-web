import UserService from '@/service/public/UserService.js'
import { _SetPost, postS, getS } from '@/service/public/service.js'
import store from '@/vuex/store'
import Vue from 'vue'


const mixin = {
    data() {
        return {
            // 请求的方式vm/v1
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
            code: '',
            codeImg: '/static/public/image/common/code.png',
            captcha_key: '',
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
            //同意注册条款
            agree: true,
            isShowMsg: localStorage.isShowMsg, //根据isShowMsg值判断: 0: 都不显示;1:显示普通验证码; 2: 显示短信验证码
            hasSendMsg: false, //发送验证码之前显示该按钮,点击之后显示计时,该按钮变为灰色不可用
            countDownTime: 60 //倒计时
        }
    },
    mounted() {
        // 是否需要邀请码
        this.agent = this.GetQueryString('agent') || this.GetQueryString('k');
        this.intacode = this.agent;
        this.incodeReadonly = !!this.agent
    },
    methods: {
        //获取验证码
        getCode() {
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
        //重置
        replaceMent() {
            this.userName = "";
            this.password = "";
            this.password_confirmation = "";
            this.code = "";
            this.register.forEach(v => {
                v.value = "";
            });
        },
        // 预注册
        async registerTest() {
            
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
            if (this.code === '') {
                this.errorAlert('请输入验证码', 'warn')
                return false
            }
            if (this.code.length < 4 || this.code.length > 4) {
                this.errorAlert('请输入4位验证码', 'warn')
                return false
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
            let params = {}
            params.userName = this.userName
            params.password = this.password
            params.code = this.code
            params.device = 'pc'
            params.captcha_key = this.captcha_key
            let flag = true

            // 邀请码
            if (this.intacode) {
                params.invite_code = this.intacode
                params.agent = this.intacode
            }

            for (let i = 0; i < this.register.length; i++) {
                if (!this.register[i].value) {
                    this.errorAlert(this.register[i].placeholder, 'warn')
                    flag = false
                    break
                }
                params[this.register[i].key] = this.register[i].value
            }

            if (!flag) {
                return false
            }
            // 邀请码
            if (this.agent) {

                params.agent = this.agent
                params.invite_code = this.agent
            }

            let res = await _SetPost(
                `${this.$HOST_NAME}/checkUsername/${this.userName}`, {}
            )
            if (res && res.code == 200) {} else {
                this.errorAlert('帐号已存在', 'warn')
                return false
            }
            this.registerSubmit(params)
        },
        // 注册提交
        async registerSubmit(params) {
            let vType = this.vType;
            for (let key in params) {
                if (!params[key]) delete params[key];
            }
            let res = await postS(`register`, params, vType)
            if (res.code == 200) {
                if (!res.data.token && res.data.userInfo.userType == 'vm') {
                    this.vType = 'vm';
                    Vue.prototype.$HOST_NAME = '/frontend/vm'
                    this.registerSubmit(params);
                    return false;
                } else {
                    UserService.setCachereg(res, vType);
                    if (res.data.activity_url) {
                        window.location.href = location.origin + res.data.activity_url
                    } else {
                        window.location.href = '/'
                    }
                }
            } else {
                this.errorAlert(res.message, 'error')
                this.getCode()
            }
        },

        // 注册的错误提示
        errorAlert(errMsg, type) {
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
        }
    },

    created() {
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
    },
    store
}


export default mixin