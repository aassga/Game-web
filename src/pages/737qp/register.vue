<template>
    <div class="register">
        <div class="content" >
            <div :class="['clearfloat',showForm == 2 ?'clearfloat1':code_show ==false?'clearfloat2': '']" >
                <!-- <div class="titleTab">
                    <span>{{title}}</span>
                    <!-- <span @click="tabIndex = 1" :class="{clicked:tabIndex==1}">登录</span>
                    <span @click="tabIndex = 2" :class="{clicked:tabIndex==2}">注册</span> -->
                <!-- </div> --> 
                <div style="clear:both"></div>
                <!-- <div class="reg-img fl">
                    <img src="/static/737qp/img/register_img.png" alt="">
                </div> -->
                <div class="right fr regin" v-if="showForm == 2">
                    <div class="titleTab">
                        <span>{{title}}</span>
                    </div>
                    <div class="register-wrap">
                        <div class="list-box">
                            <div class="text-context">
                                <div class="title">会员帐号 ：</div>
                                <div class="input-cont">
                                    <i class="iconfont yonghu"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                        placeholder="帐号6-10位数字或字母" type="text" v-model="userName" @blur="registerCode" maxlength="10">
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title">登入密码 ：</div>
                                <div class="input-cont">
                                    <i class="iconfont mima"></i>
                                    <input autocomplete="off" ref="pwd1" @keydown="pulicError=''" v-on:keyup.enter="registerTest"
                                        placeholder="密码8-20位数字或字母" type="password" v-model="password" maxlength="20">
                                    <i :class="showEye1?'openEyes':'closeEyes'" @click="changeEyes(1)"></i>
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title">重复密码 ：</div>
                                <div class="input-cont">
                                    <i class="iconfont mima"></i>
                                    <input autocomplete="off" ref="pwd2" @keydown="pulicError=''" v-on:keyup.enter="registerTest" placeholder="请重复密码"
                                        type="password" v-model="password_confirmation" maxlength="20">
                                    <i :class="showEye2?'openEyes':'closeEyes'" @click="changeEyes(2)"></i>
                                </div>
                            </div>

                            <!-- 手机号 微信等信息 -->
                            <div :key='index' v-for="(item,index) in register">
                                <div v-if="JSON.stringify(item) !== '{}'" class="text-context">
                                    <div class="title">{{item.name}} ：</div>
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
                                <sms-input :qygj="theName" :smsCodeWrapper="smsCodeWrapper" :curLabel="curLabel" :star="star"
                                    :inputBox="inputBox" :msgVerifyBox="msgVerifyBox" :btnStyle="btnStyle" :beforeSend="beforeSend"
                                    :reSend="reSend" :msgTip="msgTip" @my-event="getMsgCode" v-model="smsCode" :isShowSms="isShowSms"
                                    :hasSendMsg="hasSendMsg" :countDownTime="countDownTime" :paddingBottom2="paddingBottom2">
                                </sms-input>
                            </div>

                            <!-- 正常验证码 -->
                            <div v-if="!isShowSms&&!isShowTnCode" class="text-context">
                                <div class="title" >验证码 ：</div>
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
                                <div class="title">邀请码 ：</div>
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
                            <div class="treaty">已有帐号？<span @click="changeTab(1)">点击登录</span></div>
                        </div>
                    </div>
                </div>
                <div class="right fr login" v-if="showForm == 1">
                    <div class="titleTab">
                        <span>{{title}}</span>
                    </div>
                    <div class="register-wrap">
                        <div class="list-box">
                            <div class="text-context">
                                <div class="title">帐号：</div>
                                <div class="input-cont">
                                    <i class="iconfont1"></i>
                                    <input autocomplete="off" @keydown="pulicError=''" v-on:keyup.enter="login"
                                        placeholder="请输入5-20位数字或字母" type="text" v-model="passKey.userName" @blur="getCode" maxlength="20">
                                </div>
                            </div>

                            <div class="text-context">
                                <div class="title">密码：</div>
                                <div class="input-cont">
                                    <i class="iconfont2"></i>
                                    <input autocomplete="off" ref="pwd3" @keydown="pulicError=''" v-on:keyup.enter="login"
                                        placeholder="请输入8-20位数字或字母" type="password" v-model="passKey.password" maxlength="20">
                                    <i :class="showEye3?'openEyes':'closeEyes'" @click="changeEyes(3)"></i>
                                </div>
                            </div>
                            <div class="text-context code" v-if="code_show">
                                <i class="iconfont3"></i>
                                <div class="title">验证码：</div>
                                <input autocomplete="off" maxlength="4" type="text" placeholder="验证码" v-model="passKey.code" v-on:keyup.enter="login">
                                <span :style="{backgroundImage: 'url(' + codeImg + ')', backgroundSize:'100% 100%'}" @click="getCode"></span>
                            </div>
                            
                            
                            <div class="err" v-if="pulicError">
                                <i class="iconfont icon-baojing"></i>
                                <span ref="pulicError">{{pulicError}}</span>
                            </div>
                            <div class="text-context2">
                                <div @click="login" class="submit">立即登录</div>
                            </div>
                            <div style="clear:both"></div>
                            <div class="text-context1">
                                <!-- <div class="remenberPwd">
                                    <input type="checkbox" id="inputId">
                                    <label for="inputId"></label>记住密码
                                </div> -->
                                <div class="forgetPwd" @click="$forget()">忘记密码?</div>
                                <div class="toRegisiter" @click="changeTab(2)">立即注册</div>
                            </div>
                            <!-- <div class="treaty">完成即视为同意已满18岁，且同意各项开户条约。</div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ref="service" class="service" @mousedown="move" style="position:absolute; width:102px;" >
            <!-- <span @click="getUrl" class="serPic" @mousedown="move"></span> -->
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
            title:"欢迎登录",
            defaultPwd:"",
            defaultPwd2:"",
            formBg:"../../../static/737qp/img/form_bg.png",
            showEye1:false,
            showEye2:false,
            showEye3:false,
            showForm:1,
            theName:'737qp',
            rate:23,
            lastTime:0,
            firstTime:0,
            positionX:0,
            positionY:0,
            isClick:false,
            url:"",
            screenWidth: document.body.clientWidth,
            nameSta:"737qp",
            newmodal:{
                title:"来自新葡京棋牌的消息",
                bgcolor:{
                    background: 'linear-gradient(to right, #65e0f4, #4fade6)'
                }
            },
            codeImg: '/static/737qp/img/new_games/re.png',
            // smsInputBox: {
            //     marginTop: '15px'
            // },
            codeImg: '/static/737qp/img/new_games/log.png',
            tabIndex:1,
            rememberPassword:false,
            paddingBottom2:'20px',
            smsCodeWrapper: {
                paddingBottom: '25px',
                position: 'relative',
                fontSize: '20px',
                color: '#333',
                textAlign: 'center'
            },
            curLabel: {
                width: '99px',
                height: '44px',
                lineHeight: '44px',
                color: '#696969',
                fontSize: '19px',
                textAlign: 'right',
                display: 'inline-block',
                transform: 'translateX(-51px)'
            },
            star: {
                display: 'none'
            },
            inputBox: {
                width: '205px',
                height: '44px',
                lineHeight: '44px',
                paddingLeft: '11px',
                color: '#000',
                fontSize: '16px',
                outline: 'none',
                transform: 'translateX(-54px)'
            },
            msgVerifyBox: {
                position: 'absolute',
                top: '0',
                right: '0',
                display: 'flex',
                justifyContent: 'flex-start',
                width: '108px'
            },
            btnStyle: {
                display: 'inline-block',
                width: '108px',
                height: '44px',
                lineHeight: '44px',
                textAlign: 'center',
                fontSize: '19px',
                boxSizing: 'border-box',
                borderRadius: '5px',
                // transform: 'translateY('+10/23+'vw)'
            },
            beforeSend: {
                color: '#fff',
                background:"#4C9CF2"
            },
            reSend: {
                color: '#fff',
                background: '#ff4545'
            },
            msgTip: {
                margin: '5px 0 16px 88px',
                color: '#696969',
                fontSize: '19px'
            }
        };
    },
    methods: {
        
        changeEyes(type){
            if (this.showEye1 == true && type == 1) {
                this.showEye1 = !this.showEye1;
                this.$refs.pwd1.type = "text"
            }else if (this.showEye1 == false && type == 1) {
                this.showEye1 = !this.showEye1;
                this.$refs.pwd1.type = "password"
            }else if (this.showEye2 == true && type == 2) {
                this.showEye2 = !this.showEye2;
                this.$refs.pwd2.type = "text"
            }else if (this.showEye2 == false && type == 2) {
                this.showEye2 = !this.showEye2;
                this.$refs.pwd2.type = "password"
            }else if (this.showEye3 == true && type == 3) {
                this.showEye3 = !this.showEye3;
                this.$refs.pwd3.type = "text"
            }else if (this.showEye3 == false && type == 3) {
                this.showEye3 = !this.showEye3;
                this.$refs.pwd3.type = "password"
            }
            
        },
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
                if (left >= right-12) {
                    left = right-12;
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
            
        },
        tipDatas () {
            return this.$store.state.alert.tipModel
        }
    },
    components: {
        smsInput,
        newModal,
        safeModal,
    },
    mounted(){
        let tab = localStorage.showForm;
        if(tab){
            this.showForm = tab;
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
            that.$refs.service.style.right = 30+'px';
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
        showForm(val){
            localStorage.setItem('showForm',val);
            if(val == 1){
                this.title = "欢迎登录"
            }else{
                this.title = "欢迎注册"
            }
            
        },
        
    },
    destroyed(){
        localStorage.removeItem('showForm')
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
    background-size:cover;
    font-weight:500;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 0!important;
    background: url(/static/737qp/img/register_bg.png) no-repeat;
    background-size: cover;
    .clearfloat1{
        position: relative;
        top: 195px!important;
        right: 148px;
    }
    .clearfloat2{
        position: relative;
        top: 290!important;
        right: 160px;
    }
    .clearfloat{
        width: 100%;
        position: relative;
        top: 210px;
        right: 148px;
        
        .regin{
            margin-top: -35px;
            .text-context {
                margin-bottom:20px!important;
            }
            .list-box {
                >div{
                    // float: right;
                    clear: both;
                }
            }
        }
        .login{
            .input-cont{
                width: 404px!important;
                height: 44px!important;
                line-height: 44px!important;
            }
            .text-context{
                margin-bottom:45px!important;
                .title {
                  display: none!important;
                } 
                
                input{
                    padding-left: 65px!important;
                    height: 44px!important;
                    line-height: 44px!important;
                }
                input::-webkit-input-placeholder {
                    font-size: 17px;
                    font-weight: 400;
                    color: #B6B6B6;
                }
                .iconfont1 {
                  width: 20px;
                  height: 22px;
                  background: url("/static/737qp/img/acc.png");
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                  position: absolute;
                  left: 15px;
                  top: 6px;
                  background-size: cover;
                }
                .iconfont2 {
                  width: 20px;
                  height: 24px;
                  background: url("/static/737qp/img/pwd.png");
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                  position: absolute;
                  left: 15px;
                  top: 6px;
                  background-size: cover;
                }
                .iconfont3 {
                  width: 22px;
                  height: 24px;
                  background: url('/static/737qp/img/yanzhengma.png') no-repeat;
                  background-size: 100% 100%;
                  position: absolute;
                  left: 14px;
                  top: 5px;
                  background-size: cover;
                }
                
            }
            .text-context1{
                margin-bottom:23px!important;
            }
            .code {
                position: relative;
                margin-bottom: 25px!important;
                input {
                    width: 230px;
                    height: 44px;
                    line-height: 44px;
                    outline: none;
                    border: none;
                    border-bottom: 1px solid transparent;
                    border-image: linear-gradient(to bottom,transparent 50%, #e7e7e7 50%) 0 0 100%/1px 0;
                }
                input::-webkit-input-placeholder {
                    font-size: 17px;
                    font-weight: 400;
                    color: #B6B6B6;
                }
                span {
                    display: inline-block;
                    cursor: pointer;
                    width: 80px;
                    height: 44px;
                    position: absolute;
                    border-bottom-right-radius: 5px;
                    border-top-right-radius: 5px;
                }
            }
        }
    }
    .service{
        // position: absolute;
        top: 160px;
        right:30px;
        // width: 102px;

        span{
            display: inline-block;
            width: 100%;
            text-align: center;
            line-height: 35px;
            color: #264E70;
            font-size: 28px;
            cursor: pointer;
            // &:first-child{
            //     width: 114px;
            //     height: 114px;
            //     background: url('../../../static/737qp/img/ser.png');
            //     background-repeat: no-repeat;
            //     background-size: cover;
            // }
        }
    }
    .content {
        width: 1338px;
        height: 811px;
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // transform: translate(-50%,-50%);
        background: #fff;
        border-radius: 30px;
        background: url('/static/737qp/img/register_img.png');
        background-repeat: no-repeat;
        background-size:100% 100% ;
        // margin-top: 41px;
        .reg-img{
            margin-top:-130px;
        }
        .titleTab{
            width:404px;
            display: flex;
            float: right;
            margin-bottom: 15px;
            border-bottom: 1px solid transparent;
            border-image: linear-gradient(to bottom,transparent 60%, #e7e7e7 60%) 0 0 100%/1px 0;
            .clicked{
                color:#721922 ;
                font-size: 36px;
                border-bottom: 2px solid #721922;
            }
            span{
                display: block;
                width: 100%;
                height: 50px;
                line-height: 40px;
                text-align: center;
                color: transparent;
                background:#4EA7F5;
                -webkit-background-clip: text;
                font-size: 36px;
                font-weight: 400;
                cursor: pointer;
                position: relative;
                top: 1px;
                &:first-child{
                    margin-right: 25px;
                }
            }
        } 
        .register-wrap {
            .list-box {
                .text-context {
                    margin-bottom:30px;
                    box-sizing: border-box;
                    .title {
                        display: inline-block;
                        text-align: right;
                        min-width: 108px;
                        font-size: 19px;
                        line-height: 40px;
                        color: #666666;
                    }
                    .openEyes{
                      width: 18px;
                      height: 13px;
                      display: inline-block;
                      background: url('/static/737qp/img/eye1.png') no-repeat;
                      background-size: 100% 100%;
                      position: absolute;
                      top: 9px;
                      right: 15px;
                      cursor: pointer;
                    }
                    .closeEyes{
                      width: 18px;
                      height: 13px;
                      display: inline-block;
                      background: url('/static/737qp/img/eye2.png') no-repeat;
                      background-size: 100% 100%;
                      position: absolute;
                      top: 9px;
                      right: 15px;
                      cursor: pointer;
                    }
                    .input-cont {
                        position: relative;
                        display: inline-block;
                        height: 38px;
                        width: 315px;
                        background: transparent;

                        
                        input {
                            position: relative;
                            width: 100%;
                            height: 38px;
                            line-height: 38px;
                            padding-left: 10px;
                            background: transparent;
                            border: none;
                            border-bottom: 1px solid transparent;
                            border-image: linear-gradient(to bottom,transparent 50%, #e7e7e7 50%) 0 0 100%/1px 0;
                            outline: 0;
                        }
                        input::-webkit-input-placeholder {
                            font-size: 17px;
                            font-weight: 400;
                            color: #B6B6B6;
                        }
                        input:-internal-autofill-previewed,
                        input:-internal-autofill-selected {
                            -webkit-text-fill-color: #8A8A8A;
                            transition: background-color 5000s ease-out 0.5s;
                        }
                    }
                    .input-cont1 {
                        width: 137px;
                    }
                    .yzm_reg {
                        position: absolute;
                        top: -5px;
                        right: -113px;
                        cursor: pointer;

                        img {
                            height: 44px;
                            width: 100px;
                            border-radius: 20px;
                        }
                    }
                    .yam {
                        position: absolute;
                        top: 10px;
                        right: -176px;
                        color: #4CA2F4;
                        cursor: pointer;
                    }
                }
                .text-context1{
                    display: flex;
                    flex-wrap: nowrap;
                    margin-bottom: 15px;
                    div{
                        width: 50%;
                        height: 50px;
                        text-align: left;
                        line-height: 85px;
                        color: #B6B6B6;
                        font-size: 17px;
                        font-weight: 400;
                        cursor: pointer;
                        &:last-child{
                            text-align: right;
                            color: #4EA7F5;
                        }
                    }
                }
                .treaty{
                    font-size: 18px;
                    height: 50px;
                    line-height: 60px;
                    width: 100%;
                    color: #999;
                    text-align: center;

                  span{
                    color: #4CA2F4;
                    cursor: pointer;
                  }
                }
                .err {
                    width: 180px;
                    margin-left: 210px;
                    height: 30px;
                    line-height: 30px;
                    color: #444444;
                    font-size: 14px;
                    border: 1px solid #666666;
                    box-shadow: 0 0 6px #3a3a3a;
                    // background: #fdffef;
                    border-radius: 3px;
                    // padding: 0 14px;
                    margin-bottom: 20px;

                    i {
                        padding-left: 5px;
                        font-size: 15px;
                    }
                }
                .forget {
                    font-size: 16px;
                    color: #666;
                    zoom: 1;
                    overflow: hidden;
                    padding-bottom: 26px;

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
                    width:402px;
                    height:57px;
                    background: linear-gradient(91deg, #56CBFF, #4B9DF2);
                    background-size: 100% 100%;
                    border-radius:30px;
                    line-height: 60px;
                    border: none;
                    box-shadow: none;
                    text-align: center;
                    font-size: 24px;
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
    width: 100%;
}
</style>
