import UserService from '@/service/public/UserService.js'
import store from '@/vuex/store'
import { postS, getS } from '@/service/public/service.js'
const mixin = {
    data() {
        return {
            passKey: {},
            codeImg: '/static/klk/img/thirdparty/code.jpg',
            dengjiImg: '/static/klk/img/thirdparty/vip-sprites.png',
            code_show: parseInt(localStorage.is_code_show),
        }
    },
    mounted() {},
    methods: {
        getCode() {
            if (this.code_show == 0) {
                return;
            }
            if (this.passKey.userName.length < 5) {
                alert("请输入6位帐号");
                this.passKey.userName = ''
                var oInput = document.getElementById('userName')
                oInput.focus()
                return false
            }
            getS(`captcha`, { userName: this.passKey.userName }).then(res => {
                if (res.code == 200) {
                    this.codeImg = res.data.captcha_image_text;
                    this.passKey.captcha_key = res.data.captcha_key;
                } else {
                    this.$store.commit('alert/showTipModel', {
                        bool: true,
                        title: res.message,
                        model: 'warn'
                    })
                }
            });
        },
        login() {
            if (!this.validateAccountLogin(this.passKey.userName)) {
                alert('请输入6-20位数字或字母组成的帐号')
                return false
            }
            if (!this.validateAccountLogin(this.passKey.password)) {
                alert('请输入6-20位数字或字母组成的密码')
                return false
            }
            if (this.code_show) {
                if (this.passKey.code == '') {
                    alert('验证码请务必输入')
                    return false
                }
            }
            if (this.code_show) {
                if (this.passKey.code.length < 4 || this.passKey.code.length > 4) {
                    alert('请输入4位验证码')
                    return false
                }
            }
            this.passKey.device = 'pc';
            postS(`login`, this.passKey).then(res => {
                if (res.code == 200) {
                    UserService.setCache(res, 'v1', 'login')
                    window.location.href = '/'
                } else {
                    alert(res.message)
                    this.is_code_show();
                }
            })
        },
        logout() {
            UserService.logout.call(this)
        },
        is_code_show() {
            getS(`is-show-captcha-with-type`, { device: 'pc' }).then(res => {
                if (res && res.code === 200) {
                    this.code_show = res.data.isShowCaptcha;
                }
            });
        },
        // 错误提示
        errorAlert(errMsg, type) {
            errMsg = errMsg || "错误";
            type = type || 'warn';
            // 此处在网站的首页vue实例上定义属性，全局共享
            let $alertStyle = this.$alertStyle;
            switch ($alertStyle) {
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
        this.is_code_show();
    },
    store
}


export default mixin