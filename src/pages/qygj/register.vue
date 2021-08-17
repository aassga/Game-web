<template>
    <div class="register">
        <div class="content">
            <div class="clearfloat">
                <div class="titleTab">
                    <span @click="changeTab(1)" :class="{clicked:tabIndex==1}"><i>登录</i></span>
                    <!-- <span @click="changeTab(2)" :class="{clicked:tabIndex==2}"><i>注册</i></span> -->
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
                                <div class="input-cont input-cont1 cont">
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
                            <!-- <div class="treaty">完成即视为同意已满18岁，且同意各项开户条约。</div> -->
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
                                <div :class="['remenberPwd',chooseBox ? 'checkedBox':'']" @click="chooseBox = !chooseBox">
                                    <span>
                                        <i></i>
                                    </span>
                                    记住密码
                                </div>
                                <div class="forgetPwd" @click="$forget()">忘记密码?</div>
                            </div>
                            <div style="clear:both"></div>
                            <div class="err" v-if="pulicError">
                                <i class="iconfont icon-baojing"></i>
                                <span ref="pulicError">{{pulicError}}</span>
                            </div>

                            <div @click="login" class="submit">立即登录</div>
                            <!-- <div class="treaty">完成即视为同意已满18岁，且同意各项开户条约。</div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="service" @mousedown="move" style="position:absolute; width:102px;" >
            <span @click="getUrl" class="serPic" @mousedown="move"></span>
            <span @click="getUrl" @mousedown="move">客服</span>
        </div>
        <new-modal :newmodal="newmodal"></new-modal>
        <!-- <attentionModel :parmas="attPar"></attentionModel> -->
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
            chooseBox:false,
            theName:'qygj',
            rate:23,
            lastTime:0,
            firstTime:0,
            positionX:0,
            positionY:0,
            isClick:false,
            url:"",
            screenWidth: document.body.clientWidth,
            nameSta:"qygj",
            newmodal:{
                title:"来自澳门新葡京的消息",
                bgcolor:{
                    background: 'linear-gradient(to right, #65e0f4, #4fade6)'
                }
            },
            codeImg: '/static/qygj/img/new_games/re.png',
            smsInputBox: {
                marginTop: 15/23 +'vw'
            },
            codeImg: '/static/qygj/img/new_games/log.png',
            tabIndex:1,
            rememberPassword:false,
            paddingBottom2:15/23 + "vw",
            smsCodeWrapper: {
                paddingBottom: 40/23+'vw',
                position: 'relative',
                fontSize: 22/23+'vw',
                color: '#333',
                textAlign: 'center'
            },
            curLabel: {
                width: 99/23+"vw",
                height: 44/23+'vw',
                lineHeight: +44/23+'vw',
                color: '#666666',
                fontSize: 22/23+'vw',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-'+67/23+'vw)'
            },
            star: {
                display: 'none'
            },
            inputBox: {
                width: 208/23 + 'vw',
                height: 45/23+'vw',
                lineHeight: 45/23+'vw',
                border: "1px solid #BDBDBD",
                borderRadius: 5/23+'vw',
                padding: '0 '+8/23+'vw',
                background: 'transparent',
                color: '#444',
                fontSize: 20/23+'vw',
                outline: 'none',
                transform: 'translateX'+'(-'+67/23+'vw)'
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
                fontSize: 20/23+'vw',
                borderRadius: 5/23+'vw',
                boxSizing: 'border-box',
            },
            beforeSend: {
                color: '#fff',
                background:"#3f83cb"
            },
            reSend: {
                color: '#fff',
                background: '#ff4545'
            },
            msgTip: {
                margin: '0.24vw 0 0.76vw 4.19vw',
                color: '#696969',
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
              this.screenWidth = val;
        },
        tabIndex(val){
            localStorage.setItem('tabIndex',val)
        },
        chooseBox(newVal,oldVal){
            if (newVal) {
                localStorage.setItem('user', this.passKey);
            }else{
                localStorage.removeItem('user');
            }
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
@media screen and (max-width: 1500px){
    .remenberPwd{
        span{
            display: inline-block;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 2px solid #a5a6a7;
            position: relative;
            top: 3px;
            i{
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #a5a6a7;
                position: absolute;
                top: 2px;
                left: 2px;
            }
            
        }
        
    }
}
@media screen and (min-width: 1501px){
    .remenberPwd{
    span{
        display: inline-block;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 2px solid #a5a6a7;
        position: relative;
        top: 4px;
        i{
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #a5a6a7;
            position: absolute;
            top: 3px;
            left: 3px;
        }
        
    }
     
}
}

.checkedBox{
    span{
        border: 2px solid #3f83cb!important;
    }
    i{
        background: #3f83cb!important;
    }
    
} 
.register {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: url(/static/qygj/img/register_bg.png) no-repeat center;
    background-size:100% 100% ;
    display: flex;
    justify-content:center;
    align-items:center; 
    overflow: hidden;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    .clearfloat{
        width: .convert(466px)[@rem];
        position: relative;
        margin-left: .convert(966px)[@rem];
        margin-top: .convert(231px)[@rem];
        .regin{
            margin-top: .convert(28px)[@rem];
            .input-cont{
                width: .convert(352px)[@rem]!important;
            }
            .input-cont1{
                width: .convert(173px)[@rem]!important;
            }
        }
        .login{
            margin-top: .convert(55px)[@rem]!important;
            .title {
                min-width:.convert(91px)[@rem]!important;
                text-align: left!important;
            } 
            .title1 {
                min-width:.convert(58px)[@rem]!important;
                text-align: left!important;
                display: inline-block;
                font-size: .convert(22px)[@rem];
                line-height: .convert(40px)[@rem];
                color: #666666;
            }
            .input-cont{
                width: .convert(368px)[@rem]!important;
            }
            .input-cont2{
                width: .convert(394px)[@rem]!important;
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
                    border: 1px solid #BDBDBD;
                    outline: 0;
                }
            }
            .text-context{
                margin-bottom:.convert(45px)[@rem]!important;
            }
            .submit{
                float: right!important;
            }
            .text-context1{
                margin-bottom:.convert(23px)[@rem]!important;
                width:.convert(466px)[@rem];
                float: right;
            }
            .code {
                position: relative;
                // padding-left: 67px;
                input {
                    width: .convert(166px)[@rem];
                    height: .convert(44px)[@rem];
                    line-height:.convert(44px)[@rem];
                    border-radius: 5px 0 0 5px;
                    outline: none;
                    padding-left: .convert(10px)[@rem];
                    border: 1px solid #BDBDBD;
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
        top: .convert(260px)[@rem];
        right:.convert(30px)[@rem];
        span{
            display: inline-block;
            width: 100%;
            text-align: center;
            line-height: 35px;
            color: #264E70;
            font-size: 28px;
            cursor: pointer;
            &:first-child{
                width: 102px;
                height: 102px;
                background: url('../../../static/qygj/img/ser.png');
                background-repeat: no-repeat;
	           background-size:cover;
            }
        }
    }
    .content {
        width: .convert(1649px)[@rem];
        height: .convert(951px)[@rem];
        background: url('../../../static/qygj/img/form_bg.png');
        background-repeat: no-repeat;
        background-size:100% 100% ;
        position: relative;
        .titleTab{
            width:.convert(466px)[@rem];
            display: flex;
            float: right;
            border-bottom: 1px solid #ACACAC;
            .clicked{
                color: #3f83cb;
                font-size: .convert(36px)[@rem];
                border-bottom: 2px solid #3f83cb;
                i{
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    position: relative;
                    bottom: .convert(18px)[@rem];
                }
            }
            span{
                display: inline-block;
                width: .convert(121px)[@rem];
                // padding-bottom: .convert(14px)[@rem];
                text-align: center;
                color: #666666;
                font-size: .convert(30px)[@rem];
                cursor: pointer;
                position: relative;
                top: 1px;
                &:first-child{
                    margin-right: .convert(35px)[@rem];
                }
                i{
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    position: relative;
                    bottom: .convert(14px)[@rem];
                }
            }
        }
        .register-wrap {
            width: 600px;
            .list-box {
                float: right;
                .text-context {
                    margin-bottom:.convert(24px)[@rem];
                    box-sizing: border-box;
                    position: relative;
                    .title {
                        display: inline-block;
                        text-align: right;
                        min-width: .convert(110px)[@rem];
                        font-size: .convert(22px)[@rem];
                        line-height: .convert(40px)[@rem];
                        color: #666666;
                    }
                    
                    .input-cont {
                        
                        display: inline-block;
                        height: .convert(44px)[@rem];
                        width: .convert(359px)[@rem];
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
                        }
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
                        top: .convert(2.5px)[@rem];
                        right:.convert(75px)[@rem];
                        cursor: pointer;

                        img {
                            height: .convert(35px)[@rem];
                            width: .convert(100px)[@rem];
                            border-radius: .convert(20px)[@rem];
                        }
                    }
                    .yam {
                        position: absolute;
                        top: .convert(12px)[@rem];
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
                        height: .convert(44px)[@rem];
                        text-align: left;
                        line-height: .convert(44px)[@rem];
                        color: #2E6EA7;
                        font-size: .convert(18px)[@rem];
                        cursor: pointer;
                        &:last-child{
                            text-align: right;
                        }
                        .ivu-radio-wrapper{
                            font-size: .convert(18px)[@rem]!important;
                        }
                    }
                }
                .err {
                    width: .convert(180px)[@rem];
                    margin-left: .convert(210px)[@rem];
                    height: .convert(30px)[@rem];
                    line-height: .convert(30px)[@rem];
                    color: #444444;
                    font-size: 14px;
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
                    width:.convert(466px)[@rem];
                    height:.convert(60px)[@rem];
                    background:#3f83cb;
                    border-radius:10px;
                    line-height: .convert(60px)[@rem];
                    border: none;
                    box-shadow: none;
                    text-align: center;
                    font-size: .convert(28px)[@rem];
                    color: #fff;
                    transition: all 0.2s;
                    cursor: pointer;
                }
            }
        }
    }
}
.smsContainer {
    position: relative;
    margin-bottom: 8px;
    input:hover{
        border: 1px solid rgb(189, 189, 189)!important;
    }
}
</style>
