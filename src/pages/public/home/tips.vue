<template>
<div>
  <div class="tips" v-if="showTips">
    <div class="tipContent">
      <p class="title">消息</p>
      <p class="content">{{tipsContent}}</p>
      <p class="closeBtn" @click="closeTips">确定</p>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    closeTips(){
      this.$store.state.alert.tips.showTips = false
    }
  },
  computed:{
    showTips(){
      return this.$store.state.alert.tips.showTips
    },
    tipsContent(){
      return this.$store.state.alert.tips.tipsContent
    }
  }
}
</script>

<style lang="less" scoped>
  .tips{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0, 0, 0, 0.7);
    z-index: 9;
    .tipContent{
      height: 205px;
      width: 501px;
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      
      transform: translate(-50%, -50%);
      .title{
        height: 51px;
        text-align: center;
        line-height:50px;
        background: linear-gradient(90deg,rgba(86,205,255,1),rgba(75,154,242,1));;
        color: #fff;
        font-size: 18px;
      }
      .content{
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 20px;
        color: #868686;
      }
      .closeBtn{
        width: 90px;
        height: 31px;
        text-align: center;
        line-height: 31px;
        margin: 0 auto;
        border-radius: 5px;
        color: #fff;
        font-size: 15px;
        background: #788AB4;
        cursor: pointer;
      }
    }
  }
</style>