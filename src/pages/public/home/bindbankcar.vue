<template>
  <div>
    <div class="bindbank" v-if="$store.state.alert.bindbank">
      <div class="pop">
          <div class="pop-img">
            <p class="title">请填写提款银行卡！</p>
            <div class="btn">
                <button @click="hideAttention">暂不绑定</button>
                <button @click="gobind">前往绑定</button>
            </div>
          </div>
           <div @click="hideAttention" class="close">
                <img src="/static/public/image/bind.png" alt="">
            </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      phone: "",
      code: "",
    };
  },
  methods: {
    hideAttention(){
       this.$store.commit('alert/changbindbank', false)
    },
    gobind(){
       this.$store.commit('alert/changbindbank', false)
       this.$goUserCen('withdraw',2)
    }
  },
  mounted() {},
  //是否展示公告列表
  computed: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.bindbank {
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
  .pop{
     width: 600px;
     height: 400px;
     display: flex;
     justify-content: center;
     align-items: center;
     position: relative;
    .pop-img {
      width: 520px;
      height: 326px;
      background-color: #fff;
      position: relative;
      overflow: hidden;
      .title{
        width: 100%;
        height: 40px;
        font-size: 30px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #000000;
        line-height: 40px;
        text-align: center;
        margin-top: 93px;
      }
      .btn{
        height: 41px;
        margin: 59px 110px;
      }
      button{
         width: 140px;
         height: 41px;
         border: none;
         font-size: 16px;
         border-radius:5px;
         cursor: pointer;
         &:hover,
         &:focus {
          outline: 0;
          border: non;
        }
      }
      button:nth-child(1){
         background-color: #f0f2f5;
         color:#000000;
      }
      button:nth-child(2){
        background-color: #c2a775;
        color: #fff;
        margin-left: 10px;
      }
    }
    .close{
        width: 30px;
        height: 30px;
        position: absolute;
        right: 20px;
        top:5px;
        cursor: pointer;
        img{
          width: 30px;
          height: 30px;
        }
      }
  }
}
</style>
