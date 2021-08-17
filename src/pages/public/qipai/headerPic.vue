<template>
    <div class="picBox" :style="{height: picBox+'px',background:'url(' + headerImg + ')  no-repeat center top',backgroundSize:'cover'}">
        <!-- <img :src="headerImg" alt=""> -->

    </div>
</template>
<script>
export default {
    props:{
        headerImg:{
            type:String
        }
    },
    data () {
        return {
             clientwidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
        picBox:400,
        }
    },
    created () {
         if(this.clientwidth>1920){
            this.picBox= (400*this.clientwidth)/1920
       }
    }
}
</script>
<style lang="less" scoped>
    .picBox{
        // min-width: 1200px;
        // max-width:1920px;
        width:100%;
        margin:0 auto;
        // height:400px;
    }

    .newgong {
        position: absolute;
        height: 40px;
        width: 100%;
        bottom:0px;
        left: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 12;
        .newgong-content {
          width: 1200px;
          height: 40px;
          margin: 0 auto;
          .notice {
            display: inline-block;
            float: left;
            position: relative;
            top: 12px;
            left: 25px;
            margin-right: 50px;
            i {
              font-weight: 600;
              color:white;
              font-family: "iconfont" !important;
              font-size: 16px;
              font-style: normal;
              -webkit-font-smoothing: antialiased;
            }
          }
        .demolist {
          display: inline-block;
          width: 990px;
        }
      }
    }
</style>