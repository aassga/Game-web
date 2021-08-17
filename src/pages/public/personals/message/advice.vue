<template>
  <!-- 投诉建议 -->
  <div class="log_shadow" v-if="$store.state.home.advice">
      <div class="advice_log">
          <div class="head_title">
              <div>
                  <span>投诉建议</span>
              </div>
              <div class="close_btn">
                <div>
                  <p @click="closeLog"><img src="/static/public/image/userImg/closebtn.png" width="18px"></p>
                </div>
              </div>
          </div>
          <div class="line"></div>
          <div class="advice_content">
            <div><span>标题:</span> <input type="text" @focus="showTip" v-model="title"><br></div>
            <div><span>内容:</span> <textarea cols="40" rows="10" @focus="showTip" v-model="adviceContent"></textarea></div>
          </div>
          <div class="submitAdvice">
            <button @click="submitAdvice">确认</button>
          </div>
          <div class="notice_mark">
            备注：站内信是为方便会员的服务功能，类似于邮箱，主要由收件箱，发件 箱组成，但该功能仅对网站的注册会员开发，会员可对管理员发送
          </div>
      </div>
      <div class="toast" v-if="toastShow" :style="{top:toastNum+'px'}">
        {{toastText}}
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      title:"",
      adviceContent:"",
      toastShow: false,
      toastNum: 86,
      toastText: ''
    }
  },
  methods:{
    closeLog(){
      this.$store.state.home.advice = false;
      this.title = ''
      this.adviceContent = ''
    },
    showTip(){
      this.toastShow = false;
    },
    submitAdvice(){
      if (!this.title) {
        this.toastText = '请输入标题'
        this.toastNum = 370
        this.toastShow = true
        return false
      }

      if (!this.adviceContent) {
        this.toastText = '请输入内容'
        this.toastNum = 414
        this.toastShow = true
        return false
      }
      this.toastShow = false
      this.$http
        .post(`${this.$HOST_NAME}/member/messageSubmit`, {
          title: this.title,
          content: this.adviceContent
        })
        .then(res => {
          if (res.code == 200) {
            this.$store.state.home.advice = false;
            this.$errorAlert(res.message, 'success')
            this.title = ''
            this.adviceContent = ''
          } else {
            this.$errorAlert(res.message, 'warn')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .log_shadow{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(128, 109, 109, 0.3);
    z-index: 9999;
    .advice_log{
        width:450px;
        height:417px;
        background:rgba(255,255,255,1);
        border-radius:13px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background:#fff;
        .head_title{
          height: 80px;
          line-height: 80px;
          display: flex;
          flex-wrap: nowrap;
          div{
            width: 50%;
            &:first-child{
              text-align: center;
              line-height: 112px;
              span{
                  display: inline-block;
                  width: 100px;
                  text-align: center;
                  height: 50px;
                  line-height: 50px;
                  color: #393939;
                  font-size: 20px;
                  border-bottom: 2px solid #FF2745;
              }
            }
            &:last-child{
              position: relative;
              div{
                width:60px;
                height:40px;
                background:linear-gradient(0deg,rgba(255,52,145,1),rgba(255,31,80,1));
                border-radius:20px 0px 0px 20px;
                position: absolute;
                top: 20px;
                right: 0px;
                line-height: 65px;
                p{
                  width: 36px;
                  height: 36px;
                  line-height: 45px;
                  text-align: center;
                  background: #fff;
                  border-radius: 50%;
                  transition:all 0.5s linear;
                  margin-top: 2px;
                  margin-left: 2px;
                }
                p:hover{
                  transform:translateX(20px);
                  cursor: pointer;
                }
              }
            }
          }
        }
    }
    .line{
      width: 383px;
      margin: 0 auto;
      border: 1px solid #F4F4F5;
    }
    .advice_content{
      div{
        margin: 15px auto;
        width: 383px;
        font-size: 18px;
        input{
          background: #F5F5F5;
            border: none;
            outline: none;
            width: 335px;
            height: 25px;
            padding-left: 10px;
        }
        input,textarea{
          border-radius: 10px;
          border-color: #E7E7E7;
          font-size: 16px;
        }
        &:last-child{
          position: relative;
          span{
            display: inline-block;
            width: 45px;
            position: absolute;
          }
          textarea{
            margin-left: 45px;
            width: 337px;
            height: 127px;
            padding: 10px;
          }
        }
      }
    }
    .submitAdvice{
      width: 383px;
      margin: 10px auto;
      text-align: center;
      button{
        border: none;
        outline: none;
        width:141px;
        height:41px;
        margin: 0 auto;
        background:linear-gradient(0deg,rgba(255,25,79,1),rgba(255,34,134,1));
        border-radius:10px;
        color: #fff;
        font-size: 22px;
        cursor: pointer;
      }
    }
    .notice_mark{
      color: #696969;
      font-size: 12px;
      line-height: 20px;
      width: 383px;
      margin: 36px auto;
    }
    .toast {
      width: 96px;
      height: 30px;
      line-height: 30px;
      background: #ff9900;
      color: #fff;
      font-size: 14px;
      font-weight: 200;
      position: absolute;
      right: 450px;
      top: 30px;
      border-radius: 5px;
      z-index: 99;
      text-indent: 1em;
    }
    .toast::after {
      content: "";
      width: 0;
      height: 0;
      border-width: 4px 8px 4px 0px;
      border-style: solid;
      border-color: transparent #f90 transparent transparent;
      display: block;
      position: absolute;
      top: 10px;
      left: -8px;
    }
}
</style>