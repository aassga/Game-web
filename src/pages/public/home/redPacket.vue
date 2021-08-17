<template>
    <div class="tip" v-show='redpacket.showpacket'>
      <a :href="redpacket.hrefpacket" target="_bank">
         <img src="/static/public/image/common/redb.gif"/>
      </a>
      <span class="fa" @click="redpacket.showpacket= false">
           <i class="ivu-icon ivu-icon-close-round" :class="{'packetwhite':redpacket.isColor}"></i>
      </span>
    </div>
</template>
<script>
export default {
    props: {
        redpacket:{
            type:Object
        }
    },
    data () {
        return {
        }
    }
}
</script>
<style lang="less" scoped>
    .tip {
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 230px;
    height: 230px;
    z-index: 1000;

    img {
      width: 100%;
      height: 100%;
    }
    .fa {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      i:hover {
        color: #f13131;
      }
    }
    .packetwhite{
         color: #fff;
    }
  }      
</style>

