<template>
  <div>
    <div class="bindPhone" v-if="$store.state.alert.bindPhone">
      <div class="pop-img">
        <p class="desc">手机验证</p>
        <div>
          <input type="text" placeholder="请输入手机号码" maxlength="11" v-model="phone" />
        </div>
        <div>
          <input type="text" placeholder="清输入验证码" v-model="code" minlength="6" maxlength="6" />
          <button class="button" @click="getCode"> {{ isGoTime ? "获取验证码" : "重新获取(" + stepTime + ")" }}</button>
        </div>
        <p class="bind" style="margin-top:30px">为了保证资金安全，请先绑定手机</p>
        <p class="bind">
          信息在确认后将无法修改，如需帮助，请
          <span @click="$openKefu">联系客服</span>
        </p>
        <button class="enter" @click="validateSmsPhone">确定</button>
        <div @click="hideAttention" class="close">
           <img src="/static/public/image/modal_top/close_3.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserService from '@/service/public/UserService.js'
export default {
  props: {},
  data() {
    return {
      phone: "",
      code: "",
      isGoTime: true,
      stepTime: 60,
      interval: null,
    };
  },
  methods: {
    hideAttention(){
       this.$store.commit('alert/changbindPhone', false)
    },
    getCode() {
      if (!this.phone) {
        this.errorAlert("请输入手机号", "warn");
        return;
      }
      if (!this.testPhone(this.phone)) {
        this.errorAlert("请输入正确的手机号码", "warn");
        return;
      }
      this.$store
        .dispatch("home/getSmsCode", {
          phone: this.phone,
        })
        .then((res) => {
          if (res.code == 200) {
            this.isGoTime = false;
            this.interval = setInterval(() => {
              this.stepTime--;
              if (this.stepTime < 0) {
                this.isGoTime = true;
                this.stepTime = 60;
                clearInterval(this.interval);
              }
            }, 1000);
          } else {
            this.isGoTime = true;
            this.$errorAlert(res.message, "warn");
          }
        });
    },
    validateSmsPhone() {
      if (!this.phone) {
        this.$errorAlert("请输入手机号", "warn");
        return;
      }
      if (!this.code) {
        this.$errorAlert("请输入短信验证码", "warn");
        return;
      }
      this.$store
        .dispatch("home/validateSmsPhone", {
          phone: this.phone,
          code: this.code,
        })
        .then((res) => {
          if (res.code == 200) {
               UserService.vpGetBasicInfo();
               this.$store.commit('alert/changbindPhone', false)
               let _config = this.$getObjByLocalStorage('config')
              if(_config.depositBankValidate=='on' && this.$store.state.mainState.userinfo.cardNum=='unset') {
                  this.$store.commit('alert/changbindbank', true)
              } else {
                this.$goUserCen('recharge',0);
              }
          } else {
            this.$errorAlert(res.message, "warn");
          }
        });
    },
  },
  beforeDestroy() {
     clearInterval(this.interval);
  },
  mounted() {},
  //是否展示公告列表
  computed: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.bindPhone {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  .pop-img {
    width: 580px;
    height: 401px;
    border-radius: 22px;
    background-color: #fff;
    position: relative;
    overflow: hidden;
    padding: 31px 140px 44px 140px;
    .desc {
      font-size: 40px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: #000000;
      line-height: 53px;
    }
    div {
      position: relative;
      input {
        width: 100%;
        border: none;
        border-bottom: 2px dashed #666;
        height: 45px;
        margin-top: 33px;
        outline: none;
        color: #aaaaaa;
        font-size: 16px;
        text-indent: 5px;
        &:hover,
        &:focus {
          outline: 0;
        }
      }
      input::-webkit-input-safebox-button {
        display: none; /*去掉搜狗浏览器密码软盘*/
      }
      .button {
        width: 94px;
        height: 33px;
        line-height: 33px;
        color: #fff;
        background-color: #c2a775;
        font-size: 16px;
        position: absolute;
        right: 0px;
        top: 35px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
      }
    }
    .bind {
      font-size: 12px;
      color: #aaaaaa;
      letter-spacing: 1px;
      margin-bottom: 5px;
      span {
        color: #e60b08;
        cursor: pointer;
      }
    }
    .enter {
      width: 300px;
      height: 41px;
      margin-top: 25px;
      background-color: #f0f2f5;
      font-size: 18px;
      text-align: center;
      border: none;
      color: #000;
      cursor: pointer;
    }
    .close{
        width: 42px;
        height: 42px;
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 20px;
        img{
            width: 100%;
            height: 100%;
        }
    }
  }
}
</style>
