
<template>
    <!-- 短信验证码 -->
    <div class="smsInputBox" :style="smsInputBox">
        <div class="smsCodeWrapper" :style="[smsCodeWrapper,{paddingBottom: hasSendMsg ? '3px' :paddingBottom2}]">
            <label v-if="qygj == 'test-1'||qygj == 'jltx-new'||qygj == 'vnso'" :style="curLabel">
                <span class="star" :style="star">{{ShowStar ? '*' : ''}}&nbsp;</span>验证码 ：
            </label>
             <label v-else-if="qygj == '478qp'" :style="curLabel">
                <span class="star" :style="star"> * &nbsp;</span>验证码
            </label>
            <label v-else class="we" :style="curLabel">
                <span class="star" :style="star">{{ShowStar ? '*' : ''}}&nbsp;</span>验证码：
            </label>
             <input :class="qygj" :value="smsCode" @input="$emit('parent-event',$event.target.value)" name="txtValidationCode2" minlength="6" maxlength="6"
                type="text" :style="inputBox" @keyup.enter="registerTest" @keydown="pulicError=''"
                @mouseover="inputMouseOver(0)" @mouseout="inputMouseOut(1)" ref="inputVal" @focus="inputMouseOver(2)"
                @blur="inputMouseOut(3)" class="validate[required,minSize[6],maxSize[6],custom[integer]] verify_input" v-if="showplaceholder">

            <input :class="qygj" :value="smsCode" @input="$emit('parent-event',$event.target.value)" name="txtValidationCode2" minlength="6" maxlength="6"
                type="text" placeholder="请输入验证码" :style="inputBox" @keyup.enter="registerTest" @keydown="pulicError=''"
                @mouseover="inputMouseOver(0)" @mouseout="inputMouseOut(1)" ref="inputVal" @focus="inputMouseOver(2)"
                @blur="inputMouseOut(3)" class="validate[required,minSize[6],maxSize[6],custom[integer]] verify_input" v-else>
            
            <div :style="msgVerifyBox">
                <a :style="[btnStyle,beforeSend]" @click="getMsgCode" v-show="!hasSendMsg">获取验证码</a>
                <a :style="[btnStyle,reSend]" v-show="hasSendMsg">重新发送({{countDownTime}})</a>
            </div>
             <span v-if="showCode" style="color:#777777;position: absolute;right: 318px;top:11px">请输入验证码</span>
        </div>
        <div :style="msgTip" v-show="hasSendMsg">验证码已发送,5分钟内有效,请勿泄露</div>
    </div>
</template>

<script>
import { postS, getS } from '@/service/public/service.js';
import data from '../../public/user/register_copy';

export default {
    // mixins: [data],
    model: {
        prop: 'smsCode',
        event: 'parent-event'
    },
    props: {
        /* 以下是变量 */
        qygj:{
            type: String,
            default: function() {
                return '';
            }
        },
        smsCode: String,
        isShowSms: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        hasSendMsg: {
            type: Boolean,
            default: () => {
                return false;
            }
        },
        countDownTime: {
            type: Number,
            default: () => {
                return 60;
            }
        },
        /* 以下是样式 */
        smsInputBox: {
            type: Object,
            default: function() {
                return {};
            }
        },
        smsCodeWrapper: {
            type: Object,
            default: function() {
                return {};
            }
        },
        paddingBottom2: {
            type: String,
            default: function() {
                return '';
            }
        },
        curLabel: {
            type: Object,
            default: function() {
                return {};
            }
        },
        star: {
            type: Object,
            default: function() {
                return {};
            }
        },
        inputBox: {
            type: Object,
            default: function() {
                return {};
            }
        },
        bColor: {
            type: String,
            default: function() {
                return '';
            }
        },
        msgVerifyBox: {
            type: Object,
            default: function() {
                return {};
            }
        },
        btnStyle: {
            type: Object,
            default: function() {
                return {};
            }
        },
        beforeSend: {
            type: Object,
            default: function() {
                return {};
            }
        },
        reSend: {
            type: Object,
            default: function() {
                return {};
            }
        },
        msgTip: {
            type: Object,
            default: () => {
                return {};
            }
        },
        ShowStar: {
            type: Boolean,
            default: true,
        },
        showplaceholder: {
            type: Boolean,
            default: false,
        },
        showCode:{
            type: Boolean,
            default: false,
        }
        
    },
    data() {
        return {
            isGetFocus: false,
            isMovedIn: false
        };
    },
    methods: {
        getMsgCode() {
            this.$emit('my-event');
            //点击触发方法，然后用$emit触发my-event的自定义方法，还可以传递数据。
        },
        inputMouseOver(value) {
            //0: mouseover; 2: focus
            if (this.qygj != 'qygj'&&this.qygj != 'bet365'&&this.qygj != 'xpj'&&this.qygj != 'vnso'&&this.qygj != 'pjdc'&&this.qygj != 'jltx'&&this.qygj != 'mgm'&&this.qygj != 'test-1') {
                if (value == 2) {
                    this.isGetFocus = true;
                    if (this.isGetFocus) {
                        this.$refs.inputVal.style.borderColor = this.bColor;
                    }
                } else {
                    this.isGetFocus = false;
                    this.$refs.inputVal.style.borderColor = this.bColor;
                }
            }
            
        },
        inputMouseOut(value) {
            if (value == 1) {
                //1: onmouseout; 3: blur
                if (this.isGetFocus) {
                    this.$refs.inputVal.style.borderColor = this.bColor;
                } else {
                    this.$refs.inputVal.style.border = this.inputBox.border;
                }
            } else {
                //3: blur
                this.$refs.inputVal.style.border = this.inputBox.border;
            }
        }
    }
};
</script>

<style lang="less">
@default-w:23;
.convert(@px, @width: @default-w) {
  @var: round(unit(@px / @width),2);
  @rem: ~'@{var}vw';
}
input::-webkit-input-placeholder {
    color: #676a70;
    font-size: .convert(18px)[@rem];
}
.qygj:-ms-input-placeholder,.pjdc:-ms-input-placeholder,.jltx:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #B3B3B3 !important;
    font-size: .convert(18px)[@rem]!important;
}
.a478qp{
    border-image: linear-gradient(to bottom,transparent 50%, #e7e7e7 50%) 0 0 100%/1px 0;
}
.a478qp::-webkit-input-placeholder {
    color:#B3B3B3!important;
    font-size: 17px!important;
}
.test-1{
    border-image: linear-gradient(to bottom,transparent 50%, #e7e7e7 50%) 0 0 100%/1px 0;
}
.jltx-new{
    border-image: linear-gradient(to bottom,transparent 50%, #C9C9C9 50%) 0 0 100%/1px 0;
}
.jltx-new::-webkit-input-placeholder {
    font-size: 16px!important;
    color: #A3A3A3!important;
}
.vnso,.ylhg{
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(to bottom,transparent 50%, #e7e7e7 50%) 0 0 100%/1px 0;
}
.amhg{
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(to bottom,transparent 50%, #f0f0f4 50%) 0 0 100%/1px 0;
    
}
.amhg::-webkit-input-placeholder {
    color: #cac7c7!important;
}
.ylhg::-webkit-input-placeholder {
    font-size: 18px!important;
    color: #b6b6b6!important;
}
.vnso::-webkit-input-placeholder {
    font-size: 18px!important;
    color: #A6A6A6!important;
}
.jsyl::-webkit-input-placeholder {
    font-size: 15px;
    color: #E4E4E4;
}
.jltx{
    border: 1px solid #B5B4B7;
    border-radius: 5px;
}
.jltx::-webkit-input-placeholder {
    font-size: 15px;
    color: #E4E4E4;
    
}
.mgm{
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(to bottom,transparent 50%, #e7e7e7 50%) 0 0 100%/1px 0;
}
.mgm::-webkit-input-placeholder {
    font-size: 19px;
    color: #bbbbbb!important;
}

.mgm:-ms-input-placeholder { /* Internet Explorer 10+ */
    font-size: 18px!important;
    color: #bbbbbb!important;
}
.pjdc::-webkit-input-placeholder {
    font-size: .convert(20px)[@rem];
    color: #bbbbbb;
}
.bet365::-webkit-input-placeholder {
    font-size: .convert(20px)[@rem];
    color: #666;
}
.bet365_1::-webkit-input-placeholder {
    font-size: 15px;
    color: #666;
}
</style>
