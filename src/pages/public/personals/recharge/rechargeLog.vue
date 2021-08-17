<template>
    <div class="rechargeLog" v-if="showRecharge">
      <div class="rechargeContent" :style="{background:'url('+local + rechargeBg+')center center/100% no-repeat'}">
        <div class="closeLog" @click="$store.state.personal.showRecharge = false"></div>
        <div class="someMessage" v-html="rechargeMsg"></div>
      </div>
    </div>
</template>

<script>
import store from '@/vuex/store';
import UserService from '@/service/public/UserService.js';
import axios from 'axios';

export default {
    data() {
        return {
          local:JSON.parse(localStorage.config).statics
        };
    },
    methods: {
        
    },
    created(){
      // let a = JSON.parse(localStorage.config).statics
      // this.local = a.substring(0,a.lastIndexOf('/'));
    },
    computed:{
      showRecharge(){
        return this.$store.state.personal.showRecharge
      },
      rechargeText(){
        return this.$store.state.personal.rechargeText.msg
      },
      rechargeBg(){
        return this.$store.state.personal.rechargeText.msgImagePc
      },
      rechargeMsg(){
        return this.$store.state.personal.rechargeMsg
      }
    },
    created() {
        
    },
};
</script>

<style lang="less" scoped>
  .rechargeLog{
    width:100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(128, 109, 109, 0.3);
    z-index: 1501;
    .rechargeContent{
      height: 447px;
      width: 492px;
      background-image:url("/static/public/image/userImg/tc.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .someMessage{
        height: 240px;
        width: 430px;
        margin: 100px auto;
        font-size: 22px;
        line-height: 45px;
        text-indent: 1em;
      }
      .closeLog{
        height: 40px;
        width: 40px;
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 10px;
      }
    }
  }
</style>