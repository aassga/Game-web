<template>
    <div>
     <Modal
      v-model="qyLogin"
      class-name="agent-transfer"
      width="500"
      :scrollable="true"
      :mask-closable="false"
    >
      <div slot="header" class="tishi" :style="logiinTishi.bgcolor">
           <span>{{logiinTishi.title}}</span>
           <span></span>
      </div>
      <div class="agent-con">
          <p>您的登录密码过于简单</p>
          <p>强烈建议前往修改密码</p>
          <button class="button" @click="goUserCen('personage',8)" :style="logiinTishi.bgcolor">立即修改</button>
      </div>
      <div slot="footer"></div>
      </Modal>
    </div>
</template>
<script>
export default {
    props:{
      logiinTishi:{
        type: Object,
      }
    },
    data(){
        return {
            qyLogin:false
        }
    },
    methods:{
        goUserCen (name, num) {
        //name的类型有 ：  recharge （充值）  personage （个人资料）
        //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）
        this.qyLogin=false
        localStorage.removeItem('qyLogin')
        this.$store.commit('showPersonal', {
          bool: true
        })
        this.$store.commit('showContent', {
          parent: name
        })
        this.$store.commit('showNav', {
          child: num
        })
      },
    },
    computed: {
    },
}
</script>
<style lang="less" scoped>
/deep/.ivu-modal-mask {
  z-index: 2000;
}
/deep/.ivu-modal-wrap {
  z-index: 2000;
}
/deep/.ivu-modal-close {
  right: 0;
}
/deep/.ivu-modal-footer {
  border-top: none;
  display: none;
}
/deep/.ivu-modal {
  top: 50%;
  margin-top: -159px;
  height: 318px;
}
/deep/.ivu-modal-header {
  border-bottom: none;
  padding: 0;
}
/deep/ .ivu-modal-close .ivu-icon-ios-close-empty{
    display: none
}

/deep/ .ivu-modal-body{
   padding: 37px 0 30px 0;
}

/deep/.ivu-modal-close{
    top:0;
    right: 20px;

} 
.headerp{
   text-align: center;
   margin-top:20px; 
}
.tishi{
   height: 40px;
   line-height: 40px;
   font-size:18px;
   color:#fff;
  //  background: linear-gradient(to right, #65e0f4, #4fade6);
   border-radius:6px 6px 0 0; 
   span{
     margin-left: 30px;
   }
}
.agent-con{
     text-align: center;
     vertical-align:middle;
     p{
        font-size: 17px;
        color: #1f1f1f;
       
     }
     button{
          width: 174px;
          height: 30px;
          // background: linear-gradient(to right, #65e0f4, #4fade6);
          border: none;
          border-radius:20px;
          color: #fff; 
          margin-top: 16px;
          font-size:15px; 
          cursor: pointer;
          outline: none;
     }
}
</style>