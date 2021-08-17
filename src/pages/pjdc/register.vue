<template>
    <div class="register">
        <div class="content">
            <div class="clearfloat">
                <div class="titleTab">
                    <span @click="changeTab(1)" :class="{clicked:tabIndex==1}">登录</span>
                    <!-- <span @click="changeTab(2)" :class="{clicked:tabIndex==2}">注册</span> -->
                </div>
                <div style="clear:both"></div>
                <div class="right fr regin" v-if="tabIndex == 2">
                    <div class="register-wrap">
                        <div class="list-box">
                            <div class="text-context">
                                <div class="title">会员帐号：</div>
                                <div class="input-cont">
                                    <i class="iconfont yonghu"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                        placeholder="帐号6-10位数字或字母" type="text" v-model="userName" @blur="registerCode" maxlength="10">
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title">登入密码：</div>
                                <div class="input-cont">
                                    <i class="iconfont mima"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                        placeholder="密码8-20位数字或字母" type="password" v-model="password" maxlength="20">
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title">重复密码：</div>
                                <div class="input-cont">
                                    <i class="iconfont mima"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="请重复密码"
                                        type="password" v-model="password_confirmation" maxlength="20">
                                </div>
                            </div>

                            <!-- 手机号 微信等信息 -->
                            <div :key='index' v-for="(item,index) in register">
                                <div v-if="JSON.stringify(item) !== '{}'" class="text-context">
                                    <div class="title">{{item.name}}：</div>
                                    <div class="input-cont">
                                        <i class="iconfont" :class="item.divclass"></i>
                                        <input @keydown="pulicError=''" v-on:keyup.enter="registerTest" :placeholder="item.placeholder"
                                            type="text" v-model="item.value" :maxlength="item.maxlength">
                                    </div>
                                </div>
                            </div>

                            <!-- 短信验证码 -->
                            <div class="smsContainer" v-if="isShowSms">
                                <!-- <i class="iconfont yanzhengma"></i> -->
                                <sms-input :qygj="theName" :smsInputBox="smsInputBox" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :star="star"
                                    :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend"
                                    :reSend="reSend" :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms"
                                    :hasSendMsg="hasSendMsg" :countDownTime="countDownTime" :paddingBottom2="paddingBottom2">
                                </sms-input>
                            </div>

                            <!-- 正常验证码 -->
                            <div v-if="!isShowSms&&!isShowTnCode" class="text-context">
                                <div class="title">验证码：</div>
                                <div class="input-cont input-cont1">
                                    <i class="iconfont yanzhengma"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="请输入验证码"
                                        type="text" v-model="code" maxlength="4">
                                    <span class="yzm_reg">
                                        <img class="checkLoginCodeImage" :src="codeImg" @click="registerCode">
                                    </span>
                                    <span class="yam" @click="registerCode">换一张</span>
                                </div>
                            </div>

                            <div class="text-context" v-if='iscode'>
                                <div class="title">邀请码：</div>
                                <div class="input-cont">
                                    <i class="iconfont yaoqingma"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="邀请码"
                                        type="text" v-model="intacode" :readonly="incodeReadonly" id="incode" maxlength="6">
                                </div>
                            </div>

                            <div class="err" v-if="pulicError">
                                <i class="iconfont icon-baojing"></i>
                                <span ref="pulicError">{{pulicError}}</span>
                            </div>

                            <div @click="registerTest" class="submit">立即注册</div>
                        </div>
                    </div>
                </div>
                <div class="right fr login" v-if="tabIndex == 1">
                    <div class="register-wrap">
                        <div class="list-box">
                            <div class="text-context">
                                <div :class="code_show ? 'title':'title1'">帐号：</div>
                                <div :class="code_show ? 'input-cont':'input-cont2'">
                                    <i class="iconfont yonghu"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="login"
                                        placeholder="请输入5-20位数字或字母" type="text" v-model="passKey.userName" @blur="getCode" maxlength="20">
                                </div>
                            </div>

                            <div class="text-context">
                                <div :class="code_show ? 'title':'title1'">密码：</div>
                                <div :class="code_show ? 'input-cont':'input-cont2'">
                                    <i class="iconfont mima"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="login"
                                        placeholder="请输入8-20位数字或字母" type="password" v-model="passKey.password" maxlength="20">
                                </div>
                            </div>
                            <div class="text-context code" v-if="code_show">
                                <div class="title">验证码：</div>
                                <input autocomplete="off" maxlength="4" type="text" placeholder="验证码" v-model="passKey.code" v-on:keyup.enter="login">
                                <span :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'100% 100%'}" @click="getCode"></span>
                            </div>
                            
                            <div class="text-context1">
                                <div class="remenberPwd">
                                    <input type="checkbox" id="inputId">
                                    <label for="inputId"></label>记住密码
                                </div>
                                <div class="forgetPwd" @click="$forget()">忘记密码?</div>
                            </div>
                            <div style="clear:both"></div>
                            <div class="err" v-if="pulicError">
                                <i class="iconfont icon-baojing"></i>
                                <span ref="pulicError">{{pulicError}}</span>
                            </div>
                            <div class="text-context2">
                                <div @click="login" class="submit">立即登录</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="service" @mousedown="move" style="position:absolute; width:102px;" >
            <span @click="getUrl" class="serPic" @mousedown="move"></span>
            <!-- <span @click="getUrl" @mousedown="move">客服</span> -->
        </div>
        <new-modal :newmodal="newmodal"></new-modal>
        <safeModal :stationName="nameSta"></safeModal>
    </div>
</template>

<script>
import store from '@/vuex/store';
import data1 from '../public/user/register_copy';
import data2 from "../public/user/login"
import smsInput from '../public/home/smsInput';
import newModal from '../public/home/newmodal.vue'
import safeModal from  "../public/home/safeCheck.vue"
export default {
    mixins: [data1,data2],
    data() {
        return {
            theName:'pjdc',
            rate:23,
            lastTime:0,
            firstTime:0,
            positionX:0,
            positionY:0,
            isClick:false,
            url:"",
            screenWidth: document.body.clientWidth,
            nameSta:"pjdc",
            newmodal:{
                title:"来自葡京赌场的消息",
                bgcolor:{
                    background: 'linear-gradient(to right, #c93e4f, #8b1120)'
                }
            },
            codeImg: '/static/pjdc/img/new_games/re.png',
            smsInputBox: {
                marginTop: '15px'
            },
            tabIndex:1,
            rememberPassword:false,
            paddingBottom2:20/23+"vw",
            smsCodeWrapper: {
                paddingBottom: 25/23+'vw',
                position: 'relative',
                fontSize: 22/23+'vw',
                color: '#666',
                textAlign: 'center'
            },
            curLabel: {
                width: 98/23+'vw',
                height: 44/23+'vw',
                lineHeight: 44/23+'vw',
                color: '#484848',
                fontSize: 22/23+'vw',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-'+66/23+'vw)'
            },
            star: {
                display: 'none'
            },
            inputBox: {
                width: 208/23+'vw',
                height: 44/23+'vw',
                lineHeight: 44/23+'vw',
                border: 'none',
                border: "1px solid #BDBDBD",
                borderRadius: 6/23+'vw',
                paddingLeft: 10/23+'vw',
                color: '#484848',
                fontSize: 22/23+'vw',
                textIndent: 6/23+'vw',
                outline: 'none',
                transform: 'translateX(-'+68/23+'vw)'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '0',
                right: '0',
                display: 'flex',
                justifyContent: 'flex-start',
                width: 142/23+'vw'
            },
            btnStyle: {
                display: 'inline-block',
                width: 142/23+'vw',
                height: 44/23+'vw',
                lineHeight: 44/23+'vw',
                textAlign: 'center',
                fontSize: 22/23+'vw',
                boxSizing: 'border-box',
                borderRadius: 5/23+'vw',
                // transform: 'translateY('+10/23+'vw)'
            },
            beforeSend: {
                color: '#fff',
                background:"linear-gradient(270deg,rgba(113,25,33,1) 0%,rgba(169,51,62,1) 100%)"
            },
            reSend: {
                color: '#fff',
                background: '#ff4545'
            },
            msgTip: {
                margin: '5px 0 16px 88px',
                color: '#fff',
                fontSize: 20/23+'vw'
            }
        };
    },
    methods: {
       
        move(e){
            let box = e.target.offsetParent;
            let disX = e.clientX - box.offsetLeft;
            let disY = e.clientY - box.offsetTop;
            this.firstTime = new Date().getTime();
            document.onmousemove = (e)=>{
                let windowHei = window.innerHeight;
                let windowWid = window.innerWidth;
                let wid = box.offsetWidth;
                let hei = box.offsetHeight;
                let bottom = windowHei - hei;
                let right = windowWid - wid;
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                this.positionX = top;
                this.positionY = left;
                if (top <= 0) {
                    top = 0;
                }
                if (left <= 0) {
                    left = 0;
                }
                if (left >= right) {
                    left = right
                }
                if (top >= bottom) {
                    top = bottom;
                }

                box.style.left = left + 'px';
                box.style.top = top + 'px';
                
            
            }
            document.onmouseup = (e)=>{
                this.lastTime = new Date().getTime();
                document.onmousemove = null;
                document.onmouseup = null;
            }
        },
        getUrl(){
            if( (this.lastTime - this.firstTime) < 215){
                let service = JSON.parse(localStorage.config).service;
                if (service) {
                    let ser = service.find(item => item.status === 'on');
                    if (ser) {
                        this.url = ser.url;
                        window.open(ser.url)
                    }
                }
            }
            
        },
        doRememberPassword(){
            if (rememberPassword) {
                localStorage.setItem('user', this.passKey)
            }
        }
    },
    computed:{
        rightPo(){
            if (this.screenWidth >= 1920) {
                return 30 + 'px'
            }else{
                return 15 + 'px'
            }
        },
        boxWidth(){
            if (this.screenWidth >= 1920) {
                return (this.screenWidth - (this.screenWidth / 2.8)) + 'px'
            }else{
                return (this.screenWidth - (this.screenWidth / 4)) + 'px'
            }
            
        }
    },
    components: {
        smsInput,
        newModal,
        safeModal,
    },
    mounted(){
        let tab = localStorage.tabIndex;
        if(tab == 2){
            this.tabIndex = tab;
        }
        if(localStorage.user){
            let user = JSON.parse(localStorage.user);
            this.passKey = {
                userName:user.userName,
                password:user.password
            }
        }
        const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })()
        }
       
    },
    created() {
        this.$store.commit('home/isImgortg',JSON.parse(localStorage.config).VerificationCode.pc[0])
    },
    watch:{
        screenWidth (val) {
            this.screenWidth = val
        },
        tabIndex(val){
            localStorage.setItem('tabIndex',val)
        },
    },
    destroyed(){
        localStorage.removeItem('tabIndex')
    },
    store
};
</script>

<style lang="less" scoped>
@default-w:23;
.convert(@px, @width: @default-w) {
  @var: round(unit(@px / @width),2);
  @rem: ~'@{var}vw';
}
.register {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: url(/static/pjdc/img/register_bg.png) no-repeat center;
    background-size:100% 100% ;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .clearfloat{
        width: 100%;
        position: relative;
        top: .convert(200px)[@rem];
        right: .convert(190px)[@rem];
        .regin{
            .input-cont{
                width: .convert(352px)[@rem]!important;
            }
            .input-cont1{
                width: .convert(170px)[@rem]!important;
            }
        }
        .login{
            margin-top: .convert(25px)[@rem]!important;
            .title {
                min-width: .convert(88px)[@rem]!important;
                text-align: left!important;
            }
            .title1 {
                min-width: .convert(59px)[@rem]!important;
                text-align: left!important;
                display: inline-block;
                font-size: .convert(22px)[@rem];
                line-height: .convert(40px)[@rem];
                color: #666666;
            } 
            .input-cont{
                width: .convert(378px)[@rem]!important;
            }
            .input-cont2{
                width: .convert(398px)[@rem]!important;
                position: relative;
                display: inline-block;
                height: .convert(44px)[@rem];
                background: transparent;
                input {
                    position: relative;
                    width: 100%;
                    height: .convert(44px)[@rem];
                    line-height: .convert(44px)[@rem];
                    border-radius: 5px;
                    padding-left: .convert(10px)[@rem];
                    background: transparent;
                    border: .convert(0.7px)[@rem] solid #B5B4B7;
                    outline: 0;
                }
            }
            .text-context{
                margin-bottom:.convert(45px)[@rem]!important;
            }
            .text-context1{
                width:.convert(469px)[@rem];
                float: right;
                margin-bottom:.convert(23px)[@rem]!important;
            }
            .code {
                position: relative;
                // padding-left: 67px;
                input {
                    width: .convert(166px)[@rem];
                    height: .convert(44px)[@rem];
                    line-height: .convert(44px)[@rem];
                    border-radius: 5px 0 0 5px;
                    outline: none;
                    padding-left: .convert(10px)[@rem];
                    border: .convert(0.7px)[@rem] solid #B5B4B7;
                }
                input::-webkit-input-placeholder {
                    font-size: .convert(20px)[@rem];
                    color: #bbbbbb;
                }
                span {
                    display: inline-block;
                    cursor: pointer;
                    width: .convert(80px)[@rem];
                    height: .convert(44px)[@rem];
                    position: absolute;
                    border-bottom-right-radius: 5px;
                    border-top-right-radius: 5px;
                }
            }
        }
    }
    .service{
        top: .convert(162px)[@rem];
        right:.convert(30px)[@rem];
        span{
            display: inline-block;
            width: 100%;
            text-align: center;
            line-height: .convert(35px)[@rem];
            color: #264E70;
            font-size: .convert(28px)[@rem];
            cursor: pointer;
            &:first-child{
                width: .convert(112px)[@rem];
                height: .convert(112px)[@rem];
                background: url('../../../static/pjdc/img/ser.png');
                background-repeat: no-repeat;
                background-size: cover;
            }
        }
    }
    .content {
        width: .convert(1629px)[@rem];
        height: .convert(884px)[@rem];
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%,-50%);
        background: url('../../../static/pjdc/img/form_bg.png');
        background-repeat: no-repeat;
        background-size:100% 100% ;
        
        .titleTab{
            width:.convert(469px)[@rem];
            display: flex;
            float: right;
            margin-bottom: .convert(35px)[@rem];
            border: 1px solid #ACACAC;
            border-left-color: transparent;
            border-top-color: transparent;
            border-right-color: transparent;
            .clicked{
                color:#721922 ;
                font-size: .convert(36px)[@rem];
                border-bottom: 2px solid #721922;
            }
            span{
                display: inline-block;
                width: .convert(121px)[@rem];
                height: .convert(50px)[@rem];
                line-height: .convert(40px)[@rem];
                text-align: center;
                color: #656465;
                font-size: .convert(28px)[@rem];
                cursor: pointer;
                position: relative;
                &:first-child{
                    margin-right: .convert(25px)[@rem];
                }
            }
        } 
        .register-wrap {
            .list-box {
                .text-context {
                    position: relative;
                    margin-bottom:.convert(24px)[@rem];
                    box-sizing: border-box;
                    .title {
                        display: inline-block;
                        text-align: right;
                        min-width: .convert(110px)[@rem];
                        font-size: .convert(22px)[@rem];
                        line-height: .convert(40px)[@rem];
                        color: #666;
                    }
                    
                    .input-cont {
                        
                        display: inline-block;
                        height: .convert(44px)[@rem];
                        width: .convert(392px)[@rem];
                        background: transparent;
                        .iconfont {
                            width: .convert(20px)[@rem];
                            height: .convert(20px)[@rem];
                            vertical-align: middle;
                            color: #bbafd2;
                        }
                       
                        input {
                            position: relative;
                            width: 100%;
                            height: .convert(44px)[@rem];
                            line-height: .convert(44px)[@rem];
                            border-radius: 5px;
                            padding-left: .convert(10px)[@rem];
                            background: transparent;
                            border: 1px solid #BDBDBD;
                            outline: 0;
                        }
                        input::-webkit-input-placeholder {
                            font-size: .convert(20px)[@rem];
                            color: #bbbbbb;
                        }
                    }
                    .input-cont1 {
                        width: .convert(177px)[@rem];
                    }

                    i {
                        position: absolute;
                        top: .convert(10px)[@rem];
                        left: .convert(13px)[@rem];
                        font-size: .convert(24px)[@rem];
                        color: #949494;
                    }

                    .yzm_reg {
                        position: absolute;
                        top: .convert(3px)[@rem];
                        right: .convert(82)[@rem];
                        cursor: pointer;

                        img {
                            height: .convert(35px)[@rem];
                            width: .convert(100px)[@rem];
                            border-radius: 20px;
                        }
                    }
                    .yam {
                        position: absolute;
                        top: .convert(10px)[@rem];
                        right: 0;
                        color: #5caaea;
                        cursor: pointer;
                    }
                }
                .text-context1{
                    display: flex;
                    flex-wrap: nowrap;
                    margin-bottom: .convert(15px)[@rem];
                    div{
                        width: 50%;
                        height: .convert(50px)[@rem];
                        text-align: left;
                        line-height: .convert(50px)[@rem];
                        color: #A9333E;
                        font-size: .convert(18px)[@rem];
                        cursor: pointer;
                        position: relative;
                        &:last-child{
                            text-align: right;
                        }
                        input {
                            display: block;
                            width: 100px;
                            height: 18px;
                            position: absolute;
                            top: 10px;
                            opacity: 0;
                            cursor: pointer;
                        }
                        label {
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            border-radius: 5px;
                            border: 1px solid #DB4643;
                            position: relative;
                            cursor: pointer;
                            top: 2px;
                            margin-right: 5px;
                        }
                        label::before {
                            display: inline-block;
                            content: " ";
                            width: 10px;
                            border: 2px solid #DB4643;
                            height: 4px;
                            border-top: none;
                            border-right: none;
                            transform: rotate(-45deg);
                            top: 5px;
                            left: 3px;
                            position: absolute;
                            opacity: 0;
                        }
                        input:checked+label::before{
                            opacity: 1;
                            transform: all 0.5s;
                        }

                        
                    }
                }
                .err {
                    width: .convert(180px)[@rem];
                    margin: 0 auto;
                    height: .convert(30px)[@rem];
                    line-height: .convert(30px)[@rem];
                    color: #444444;
                    font-size: .convert(14px)[@rem];
                    border: 1px solid #666666;
                    box-shadow: 0 0 6px #3a3a3a;
                    // background: #fdffef;
                    border-radius: 3px;
                    // padding: 0 14px;
                    margin-bottom: .convert(20px)[@rem];

                    i {
                        padding-left: .convert(5px)[@rem];
                        font-size: .convert(15px)[@rem];
                    }
                }
                .forget {
                    font-size: .convert(16px)[@rem];
                    color: #666;
                    zoom: 1;
                    overflow: hidden;
                    padding-bottom: .convert(26px)[@rem];

                    span {
                        &:first-child {
                            float: left;

                            label {
                                text-decoration: underline;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .submit {
                    width:.convert(470px)[@rem];
                    height:.convert(60px)[@rem];
                    background:linear-gradient(270deg,rgba(113,25,33,1) 0%,rgba(169,51,62,1) 100%);
                    border-radius:10px;
                    line-height: .convert(60px)[@rem];
                    border: none;
                    box-shadow: none;
                    text-align: center;
                    font-size: .convert(24px)[@rem];
                    color: #fff;
                    transition: all 0.2s;
                    cursor: pointer;
                    float: right;
                }
            }
        }
    }
}
.smsContainer {
    position: relative;
    margin-bottom: 8px;
}
</style>
