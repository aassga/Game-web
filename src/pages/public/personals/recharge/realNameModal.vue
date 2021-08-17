<template>
  <div>
    <Modal
      v-model="ifmodel"
      class-name="agent-transfer"
      width="345"
      :mask-closable="false"
    >
      <div class="vp-admin-wrap-close" slot="close"></div>
      <div slot="header" class="tishi">
        <span>请填写真实姓名</span>
      </div>
      <div class="agent-con">
        <span class="rename">请务必填写真实姓名，一旦绑定将无法修改姓名</span>
        <input
          type="text"
          placeholder="真实姓名"
          id="inputtext"
          v-model="realName"
          maxlength="15"
        />
      </div>
      <div slot="footer" class="footer">
        <span class="span1" @click="hidemode">取消</span>
        <span @click="sendName">确定</span>
      </div>
    </Modal>
  </div>
</template>
<script>
import store from '@/vuex/store'
import UserService from "@/service/public/UserService.js";
export default {
  data() {
    return {
      ifmodel: false,
      realName: "",
    };
  },
  methods: {
    hidemode(){
          this.ifmodel=false
    },
   sendName(){
        var reg = /^[\u4E00-\u9FA5·]+$/
        if(reg.test(this.realName)){
             this.$postS(`member/set-member-info`, {
                realName:this.realName
           }).then(res=>{
                if(res && res.code==200){
                    this.ifmodel=false
                    UserService.vpGetBasicInfo.call(this);
                    this.$emit("payMoney")
                }else{
                    this.ifmodel=false
                    this.$error(res.message);
                }
           })
        }else{
            this.$error('请输入正确的姓名');
        }
      },
  },
};
</script>>
<style type="text/css" lang="less" scoped>
/deep/ .ivu-modal-mask {
  z-index: 2000;
}

/deep/ .ivu-modal-wrap {
  z-index: 2000;
}

/deep/ .ivu-modal-close {
  right: 0;
}

/deep/ .ivu-modal-footer {
  border-top: none;
  padding: 0;
  text-align: left;
}
/deep/ .ivu-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 318px;
  -webkit-animation: _scaleEnter 0.3s ease;
  animation: _scaleEnter 0.3s ease;
  &.ease-leave-active {
    -webkit-animation: _scaleLeave 0.3s ease;
    animation: _scaleLeave 0.3s ease;
  }
}

/deep/ .ivu-modal-header {
  border-bottom: none;
  padding: 0;
}

/deep/ .ivu-modal-close .ivu-icon-ios-close-empty {
  display: none;
}

/deep/ .ivu-modal-body {
  padding: 0;
}

/deep/ .ivu-modal-close {
  top: 3px;
}
.footer {
  height: 39px;
  background: #d93d32;
  border-radius: 0 0 6px 6px;
  display: flex;
  span {
    width: 172.5px;
    height: 39px;
    display: inline-block;
    color: #ffffff;
    font-size: 16px;
    line-height: 39px;
    text-align: center;
    cursor: pointer;
  }
  .span1 {
    border-right: 1px solid #e96057;
  }
}
.headerp {
  text-align: center;
  margin-top: 20px;
}

.tishi {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  color: #ffffff;
  background-color: #403d58;
  border-radius: 6px 6px 0 0;
  border-bottom: 1px solid #4b495c;
  span {
    margin-left: 110px;
    margin-top: 16px;
    font-size: 18px;
  }
}
.agent-con {
  position: relative;
  background-color: #403d58;
  height: 135px;
  padding-top: 17px;
  .showname {
    color: #d93d32;
  }
  .rename {
    margin-left: 27px;
    font-size: 14px;
    color: #fff;
  }
  input {
    width: 238px;
    height: 38px;
    margin-left: 54px;
    margin-top: 21px;
    border: 1px solid #6e6c7c;
    border-radius: 3px;
    color: #fff;
    text-indent: 5px;
  }
  #inputtext {
    background-color: #403d58;
  }
}
.vp-admin-wrap-close {
  display: none;
  width: 60px;
  height: 40px;
  background: #f2f2f2;
  border-bottom-left-radius: 24px;
  border-top-left-radius: 24px;

  &:hover {
    background: linear-gradient(180deg, #ff3492, #ff1e4f);
  }

  .vp-admin-wrap-close-empty {
    position: relative;
    background: #fff;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    font-size: 56px;
    left: 2px;
    top: 2px;
    -moz-transition: all 0.5s ease-in;
    -webkit-transition: all 0.5s ease-in;
    -o-transition: all 0.5s ease-in;
    transition: all 0.5s ease-in;
    a {
      position: absolute;
      top: 9px;
      left: 9px;
      width: 20px;
      height: 20px;
      display: inline-block;
      background: url("/static/public/image/common/vp-common-close.png") #fff;
      background-size: 98% 98%;
    }

    &:hover {
      transform: translateX(40%);
    }
  }
}
</style>