<template>
    <div class="new-header view view-slideup on">
        <!-- 头部上面 -->
        <div class="header-top" :class="{night:colorbool}">
            <!-- 登录 -->
            <div class="login">
                <div class="sj">
                    <img src="/static/ylhg/img/logo/Homelogo.png" alt="" style="height:50px;margin-top:10.5px">
                    <span class='class1'></span>
                    <span class='class2'></span>
                    <span class="remHostname">易记域名: 478.cc</span>
                </div>

                <!-- 登录前 -->
                <div class="login-before" v-if="!userinfo" :class="{headerColor:headerColorBool}">
                    <!-- 帐号 -->
                    <div class="username">
                        <input autocomplete="off" type="text" placeholder="帐号" id="userName" v-model="passKey.userName" @blur="getCode"
                            @focus="focusname" maxlength="20">
                    </div>
                    <!-- 密码 -->
                    <div class="password">
                        <input autocomplete="off" maxlength="20" type="password" placeholder="密码" v-model="passKey.password"
                            v-on:keyup.enter="login">
                    </div>
                    <!-- 验证码 -->
                    <div class="code" v-if="code_show">
                        <input autocomplete="off" maxlength="4" type="text" placeholder="验证码" v-model="passKey.code"
                            v-on:keyup.enter="login">
                        <span :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'100% 100%'}" @click="getCode"></span>
                    </div>
                    <!-- 登录 -->
                    <div>
                        <input id="loginBtn" type="button" value="登录" @click="login">
                    </div>
                    <!-- 开户 -->
                    <div>
                        <router-link id="regBtn" tag="input" to="/home/register" type="button" value="免费开户"></router-link>
                    </div>

                    <!-- 忘记密码 -->
                    <div class="last_item" style="margin-right:0">
                        <a class="forgetpwd" @click="forget" href="javascript:void(0)">帐号问题?</a>
                    </div>
                </div>

                <!-- 登录后 -->
                <div class="login-after" v-if="userinfo">

                    <!-- 欢迎 -->
                    <div class="part1" :class="{headerColor:headerColorBool}">
                        <!-- <span>欢迎您！</span> -->
                        <i class="vip-sprite"
                            :style="{backgroundImage: 'url(' + dengjiImg + ')', backgroundPosition:left+'px '+top+'px'}"></i>
                        <span>帐号：</span>
                        <span style="margin-left:-8px">{{userinfo.userName}}</span>
                    </div>
                    <!-- 余额 -->
                    <div class="part2 " :class="{headerColor:headerColorBool}">
                        &nbsp;
                        <label>
                            <label>余额(RMB)</label>
                        </label>
                        <span style="margin-left: 5px; margin-right: 5px;">{{userinfo&&userinfo.balance}}</span>
                    </div>

                    <div class="part3" :class="{headerColor:headerColorBool}">
                        <a href="javascript:void(0);">
                            <label style="cursor:pointer;background: linear-gradient(#fcc65b, #b0701c);color:#480f00;border-radius: 5px;" for="" v-if="!showReload" @click="getBalance">一键刷新</label>
                            <label style="cursor:default;background: #aeaeae;color:#fff;border-radius: 5px;" for="" v-if="showReload">刷新完成</label>
                        </a>
                    </div>

                    <div class="part5" :class="{headerColor:headerColorBool}">
                        <i class="iconfont icon-home-user"></i>
                        <a href="javascript:void(0)" @click="goUserCen('personage',0)">会员中心</a>
                    </div>

                    <div class="part6" :class="{headerColor:headerColorBool}">
                        <i class="iconfont icon-home-message"></i>
                        <a href="javascript:void(0)" @click="goUserCen('message',0)" style="position:relative">
                            我的信息
                            <inForMation></inForMation>
                        </a>
                    </div>

                    <div class="last_item" style="margin-right:0">
                        <a href="javascript:void(0);" @click="logout">登出</a>
                    </div>
                </div>
            </div>
            <Modal :visible.sync="modal6" class="model" width="306" height="146" v-model="showmodle" title="信息" :loading="loading"
                @on-ok="asyncOK">
                <p>开始进行缓存清除，完毕后将会刷新网站！</p>
            </Modal>
            <qyLogin ref="qylogin" :logiinTishi="logiinTishi"></qyLogin>
        </div>
    </div>
</template>

<script>
import UserService from '@/service/public/UserService.js';
import store from '@/vuex/store';
import { postS, getS } from '@/service/public/service.js';
import qyLogin from '../../public/home/qy-login.vue';
import inForMation from "../../public/home/information.vue" 
import data from '../../public/user/login';
export default {
    mixins: [data],
    data() {
        return {
            logiinTishi: {
                title: '来自澳门永利皇宫的消息',
                bgcolor: {
                    background: 'linear-gradient(to right, #65e0f4, #4fade6)'
                }
            },
            time: '',
            colorbool: false,
            modal6: false,
            loading: true,
            headerColorBool: false,
            headerbgColor: '#697dac',
            headerbgColor: '#d0d9e5',
            showmodle: false,
            codeImg: '/static/ylhg/img/thirdparty/code.png',
            left: 5,
            top: -193,
            showReload: false
        };
    },
    methods: {
        goHeader(typeNum) {
            if (typeNum == 0) {
                // 线路检测
                return false;
            } else if (typeNum == 1) {
                // 借呗
                this.$store.commit('alert/newshowtip', {
                    bool: true,
                    title: '暂未开放，敬请期待',
                    model: '',
                    leftspan: true
                });
            } else if (typeNum == 2) {
                // 金管家
                // window.open("/static/qygj/html/active/sxjgj/index.html","_blank");
            }
        },
        //获取时间
        ee(num) {
            if (num < 10) {
                num = '0' + num;
            }
            return num;
        },
        we(num) {
            switch (num) {
                case 1:
                    num = '一';
                    break;
                case 2:
                    num = '二';
                    break;
                case 3:
                    num = '三';
                    break;
                case 4:
                    num = '四';
                    break;
                case 5:
                    num = '五';
                    break;
                case 6:
                    num = '六';
                    break;
                case 7:
                    num = '七';
                    break;
            }
            return num;
        },

        getTimes() {
            var that = this;
            let timestam = new Date().getTime();
            let time = timestam;
            let T = '';
            let dateObj = new Date(time),
                p0 = this.ee,
                Y = dateObj.getFullYear(),
                Mh = dateObj.getMonth() + 1,
                D = p0(dateObj.getDate()),
                X = this.we(dateObj.getDay()),
                H = p0(dateObj.getHours()),
                M = p0(dateObj.getMinutes()),
                S = p0(dateObj.getSeconds());
            if (Mh > 12) {
                Mh = '01';
            } else if (Mh < 10) {
                Mh = '0' + Mh;
            }
            let str = `${Y}-${Mh}-${D} ${H}:${M}:${S}`;
            this.time = str;
        },

        focusname() {},
        changcolor() {
            this.colorbool = !this.colorbool;
            this.$store.commit('mainState/changcolor', this.colorbool);
        },

        cleanUp() {
            this.showmodle = true;
        },
        asyncOK() {
            window.location.reload();
        },

        getBalance () {
        this.showReload = true
        getS(`member/balance`).then(res => {
            if (res.code == 200) {
              let userinfo = JSON.parse(localStorage.userinfo)
              userinfo.balance = res.data.member
              userinfo.agent=res.data.agency
              this.$store.commit('mainState/reloadUserinfo', userinfo)
              this.$store.commit('alert/newshowtip',{
                bool:true,
                title:'刷新余额成功！',
                model:'',
                leftspan:false
              })
            }else{
              this.$store.commit('alert/newshowtip',{
                bool:true,
                title:'服务器报错',
                model:'',
                leftspan:false
              })
            }
          })
          setTimeout(()=>{
              this.showReload = false
          },5000)

      },
        // 打开个人中心
        goUserCen(name, num) {
            //name的类型有 ：  recharge （充值）  personage （个人资料）
            //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）
            this.$store.commit('showPersonal', {
                bool: true
            });
            this.$store.commit('showContent', {
                parent: name
            });
            this.$store.commit('showNav', {
                child: num
            });
        },
        forget() {
            this.$store.commit('alert/newshowtip', {
                bool: true,
                title: '忘记帐号密码,请联系在线客服人员取回！',
                model: '',
                leftspan: false
            });
        }
    },
    computed: {
        userinfo() {
            return this.$store.state.mainState.userinfo;
        }
    },
    watch: {},
    mounted() {
        //获取时间
        let time = setInterval(this.getTimes, 1000);
        if (localStorage.qyLogin) {
            this.$refs.qylogin.qyLogin = true;
        }
    },
    created() {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState == 'hidden') {
                if (!localStorage.userinfo) {
                    let timer = setInterval(() => {
                        if (localStorage.userinfo) {
                            clearInterval(timer);
                            window.location.reload();
                        }
                    }, 1000);
                }
            }
        });
        if (!this.userinfo) return false;
        switch (this.userinfo.levelId) {
            case 2:
                this.top = 1;
                break;
            case 3:
                this.top = -31;
                break;
            case 4:
                this.top = -64;
                break;
            case 5:
                this.top = -96;
                break;
        }
    },
    components: {
        qyLogin,
        inForMation
    },
    store
};
</script>

<style lang="less" scoped>
.headerLinkBox {
    width: 350px;
    display: inline-block;
    overflow: hidden;
    height: 100%;
    li {
        float: left;
        margin: 0 15px;
        position: relative;
        a {
            color: #697dac;
            font-size: 15px;
            margin-left: 30px;
        }
        img {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    li:nth-child(1) {
        margin-left: 0;
    }
}

.new-header {
    background: #fff;
    width: 100%;
    margin: 0 auto;
    .header-top {
        height: 72px;
        background: #0f0f0f;
        line-height: 72px;
        border-bottom: 1px solid #2a2c31;
        .login {
            margin: 0 auto;
            width: 1200px;
            .sj {
                height: 100%;
                display: inline-block;
                font-size: 15px;

                .class1 {
                    display: inline-block;
                    width: 90px;
                    height: 45px;
                    animation: myfirst 2s;
                    -ms-zoom-animation: myfirst 2s;
                    background-image: url('/static/ylhg/img/logo/1.png');
                    background-size: 100%;
                    background-repeat: no-repeat;
                }
                .class2 {
                    display: inline-block;
                    width: 90px;
                    height: 45px;
                    animation: mytwo 2s;
                    background-image: url('/static/ylhg/img/logo/2.png');
                    background-size: 100%;
                    background-repeat: no-repeat;
                    margin-left: -8px;
                }
                .remHostname {
                    display: inline-block;
                    height: 50px;
                    line-height: 50px;
                    transform: translate(12px, -8px);
                    color: #f2c54d;
                    font-style: italic;
                    font-size: 16px;
                }

                @keyframes myfirst {
                    0% {
                        -ms-transform: rotateY(0deg); /* IE9 */
                        -moz-transform: rotateY(0deg); /* firefox */
                        -o-transform: rotateY(0deg); /* opera */
                        -webkit-transform: rotateY(0deg); /* safari & chrome */
                        /* IE8+ - must be on one line, unfortunately */
                        -ms-filter: progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=0, M21=0, M22=1, SizingMethod='auto expand');
                        transform: rotateY(0deg);
                    }
                    80% {
                        -ms-transform: rotateY(360deg);
                        -moz-transform: rotateY(360deg);
                        -o-transform: rotateY(360deg);
                        -webkit-transform: rotateY(360deg);
                        -ms-filter: progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=0, M21=0, M22=1, SizingMethod='auto expand');
                        transform: rotateY(360deg);
                    }
                    85% {
                        -ms-transform: scale(0.7) rotateY(360deg);
                        -moz-transform: scale(0.7) rotateY(360deg);
                        -o-transform: scale(0.7) rotateY(360deg);
                        -webkit-transform: scale(0.7) rotateY(360deg);
                        -ms-filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.7, M12=0, M21=0, M22=0.7, SizingMethod='auto expand');
                        transform: scale(0.7) rotateY(360deg);
                    }
                    90% {
                        -ms-transform: scale(1) rotateY(360deg);
                        -moz-transform: scale(1) rotateY(360deg);
                        -o-transform: scale(1) rotateY(360deg);
                        -webkit-transform: scale(1) rotateY(360deg);
                        -ms-filter: progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=0, M21=0, M22=1, SizingMethod='auto expand');
                        transform: scale(1) rotateY(360deg);
                    }
                    95% {
                        -ms-transform: scale(0.7) rotateY(360deg);
                        -moz-transform: scale(0.7) rotateY(360deg);
                        -o-transform: scale(0.7) rotateY(360deg);
                        -webkit-transform: scale(0.7) rotateY(360deg);
                        -ms-filter: progid:DXImageTransform.Microsoft.Matrix(M11=0.7, M12=0, M21=0, M22=0.7, SizingMethod='auto expand');
                        transform: scale(0.7) rotateY(360deg);
                    }
                    100% {
                        -ms-transform: scale(1) rotateY(360deg);
                        -moz-transform: scale(1) rotateY(360deg);
                        -o-transform: scale(1) rotateY(360deg);
                        -webkit-transform: scale(1) rotateY(360deg);
                        -ms-filter: progid:DXImageTransform.Microsoft.Matrix(M11=1, M12=0, M21=0, M22=1, SizingMethod='auto expand');
                        transform: scale(1) rotateY(360deg);
                    }
                }

                @keyframes mytwo {
                    0% {
                        -ms-transform: rotateY(0deg);
                        -moz-transform: rotateY(0deg);
                        -o-transform: rotateY(0deg);
                        -webkit-transform: rotateY(0deg);
                        transform: rotateY(0deg);
                    }
                    80% {
                        -ms-transform: rotateY(-360deg);
                        -moz-transform: rotateY(-360deg);
                        -o-transform: rotateY(-360deg);
                        -webkit-transform: rotateY(-360deg);
                        transform: rotateY(-360deg);
                    }
                    85% {
                        -ms-transform: scale(0.7) rotateY(-360deg);
                        -moz-transform: scale(0.7) rotateY(-360deg);
                        -o-transform: scale(0.7) rotateY(-360deg);
                        -webkit-transform: scale(0.7) rotateY(-360deg);
                        transform: scale(0.7) rotateY(-360deg);
                    }
                    90% {
                        -ms-transform: scale(1) rotateY(-360deg);
                        -moz-transform: scale(1) rotateY(-360deg);
                        -o-transform: scale(1) rotateY(-360deg);
                        -webkit-transform: scale(1) rotateY(-360deg);
                        transform: scale(1) rotateY(-360deg);
                    }
                    95% {
                        -ms-transform: scale(0.7) rotateY(-360deg);
                        -moz-transform: scale(0.7) rotateY(-360deg);
                        -o-transform: scale(0.7) rotateY(-360deg);
                        -webkit-transform: scale(0.7) rotateY(-360deg);
                        transform: scale(0.7) rotateY(-360deg);
                    }
                    100% {
                        -ms-transform: scale(1) rotateY(-360deg);
                        -moz-transform: scale(1) rotateY(-360deg);
                        -o-transform: scale(1) rotateY(-360deg);
                        -webkit-transform: scale(1) rotateY(-360deg);
                        transform: scale(1) rotateY(-360deg);
                    }
                }
            }

            .username > input,
            .password > input,
            .code > input {
                width: 150px;
                height: 34px;
                padding: 0 0 0 5px;
                background: #2a2c31;
                line-height: 34px;
                color: #fff;
                border: 1px solid #141414;
                font-size: 14px;
                outline: none;
                text-indent: 4px;
                border-radius: 5px;
            }
            input:focus {
                outline: none;
            }
            input::-webkit-input-placeholder {
                color: #fff;
            }

            input[type='button'] {
                width: 80px;
                height: 34px;
                line-height: 34px;
                border-radius: 5px;
                color: #480f00;
                cursor: pointer;
                border: 0;
            }
            .login_after {
                width: 100px;
                float: left;
                height: 40px;
                li {
                    height: 40px;
                    line-height: 40px;
                    margin-left: 10px;

                    a {
                        color: #697dac;
                        font-size: 14px;
                    }
                }
            }
            .headerColor {
                color: white !important;
                a {
                    color: white !important;
                }
                li {
                    a {
                        color: white;
                    }
                }
            }
            .login-before {
                float: right;
                div {
                    float: left;
                    position: relative;
                    margin: 0 4px 0;
                    text-align: left;

                    #loginBtn {
                        padding: 0;
                        text-indent: 0;
                        color: #000;
                        transition: all 0.3s linear;
                        background: linear-gradient(to bottom, #fbf58c, #f2c54d);

                        &:hover {
                            background: linear-gradient(to bottom, #f7f06c, #eeb827);
                        }
                    }

                    #regBtn {
                        border: 1px solid #f3c952;
                        background: transparent;
                        color: #f5d35f;
                        padding: 0;
                        text-indent: 0;

                        &:hover {
                            border: 1px solid #f7f06c;
                            color: #fae25f;
                        }
                    }
                }

                .code {
                    input {
                        width: 160px;
                    }

                    span {
                        display: inline-block;
                        cursor: pointer;
                        width: 80px;
                        height: 34px;
                        position: absolute;
                        right: 0;
                        top: 19px;
                        border-bottom-right-radius: 5px;
                        border-top-right-radius: 5px;
                    }
                }

                .last_item {
                    margin: 0 0 0 6px;

                    a {
                        line-height: 34px;
                        color: #fff;
                        cursor: pointer;
                        font-size: 14px;
                    }
                }
            }

            .login-after {
                float: right;
                font-size: 13px;
                // margin-right: 6px;
                a {
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    color: #fff;
                    min-width: 60px;
                    display: inline-block;
                }
                .part3 {
                   
                    a {
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    min-width: 70px;
                    display: inline-block;
                    label{
                      display: inline-block;
                      height: 30px;
                      width:100%;
                      line-height: 30px;
                      text-align: center;
                    }
                  }
                }
                &>div {
                    height: 72px;
                    margin-right: 10px;
                    float: left;
                    line-height: 72px;
                    color: #fff;
                    font-size: 15px;

                    i {
                        vertical-align: middle;
                    }

                    a {
                        vertical-align: middle;
                    }
                }

                .part1 {
                    .vip-sprite {
                        width: 38px;
                        height: 30px;
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 4px;
                    }
                }

                .part5 {
                    position: relative;

                    .login-dropdown {
                        display: none;
                        position: absolute;
                        top: 50px;
                        left: -30px;
                        z-index: 9999666;
                        height: 68px;
                        line-height: 68px;
                        border-radius: 0 0 10px 10px;
                        box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
                        background-color: #fff;

                        ul {
                            li {
                                display: block;
                                width: 100%;
                                text-align: center;
                                height: 34px;
                                line-height: 34px;
                                cursor: pointer;
                            }
                            li:last-child:hover {
                                border-radius: 0 0 10px 10px;
                            }
                            li:hover {
                                background: #d0d9e5;
                            }
                        }
                    }
                }

                .part5:hover {
                    .login-dropdown {
                        display: block;
                    }
                }

                .last_item {
                    a {
                        background: linear-gradient(#fcc65b, #b0701c);
                        border-radius: 5px;
                        color: #480f00;
                    }
                }
            }
        }
    }
    .night {
        background: rgb(16, 17, 35);
    }
}
.model /deep/.ivu-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -153px;
    margin-top: -73px;
}
.model /deep/.ivu-modal-close {
    display: none;
}
.model /deep/.ivu-btn-text {
    display: none;
}
.model /deep/.ivu-modal-body p {
    font-size: 14px;
}

.view.view-slideup {
    opacity: 0;
}

.view.view-slideup.on {
    opacity: 1;
    animation: view-slideup 0.8s ease;
}

@keyframes view-slideup {
    0% {
        opacity: 0;
        transform: translate(0, 30px);
    }

    100% {
        opacity: 1;
        transform: translate(0, 0);
    }
}

input:-webkit-autofill {
    -webkit-text-fill-color: #fff !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    background-color: transparent !important;
    // background-image: none!important;
    transition: background-color 50000s ease-in-out 0s !important;
}
</style>
