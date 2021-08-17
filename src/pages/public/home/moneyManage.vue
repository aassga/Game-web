<template>
  <div class="mannage" v-if="showJinggj">
    <div :style="{background: 'url(/static/' + nameSta + '/img/jing1.png)no-repeat'}">
      <img :src="'/static/'+nameSta+'/img/jing2.png'">
      <img :src="'/static/'+nameSta+'/img/jing3.png'">
      <img @click="closeTheLog" :src="'/static/'+nameSta+'/img/jing_close.png'">
    </div>
  </div>
</template>

<script>
export default {
  props:{
    nameSta:{
      type:String
    }
  },
  data(){
    return{

    }
  },
  methods:{
    closeTheLog(){
      this.$store.state.alert.showJinggj = false;
    }
  },
  computed:{
    showJinggj(){
      return this.$store.state.alert.showJinggj; 
    }
  }
}
</script>

<style lang="less" scoped>
  .mannage{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9;
    background: rgba(0, 0, 0, 0.7);
    div{
      height: 562px;
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%,-50%);
      width: 657px;
      // background: url('/static/test-1/img/jing1.png') no-repeat;
      background-size: 100% 100%;
      img{
        &:first-child{
          position: absolute;
          top: 210px;
          left: 220px;
        }
        &:nth-child(2){
          position: absolute;
          bottom: 26px;
          left:220px;
        }
        &:last-child{
          position: absolute;
          bottom: -66px;
          left: 331px;
          cursor: pointer;
        }
      }
    }
  }
</style>