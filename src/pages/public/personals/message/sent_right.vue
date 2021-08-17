<template>
  <div class="sent-right" id="my-scrollbar">
    <div class="title">
      {{messageDetail.title}}
    </div>

    <div class="times">
      {{this.$moment.unix(messageDetail.updated_at-0).format('YYYY-MM-DD HH:mm:ss')}}
    </div>

    <div class="content" v-html="messageDetail.content">

    </div>
     <div v-for="(item,index) in receivedText" :key="index">
        <div class="huifu-title" v-if="flag">
          网站回复：
        </div>
        <div class="huifu-content" v-if="flag">
          {{item.content}}
        </div>
     </div>
  </div>
</template>

<script>
  import Scrollbar from 'smooth-scrollbar'

  export default {
    props: ['messageDetail', 'receivedText', 'flag'],
    mounted () {
      // Scrollbar.init(document.querySelector('#my-scrollbar'), {
      //   alwaysShowTracks: true
      // })
    }
  }
</script>

<style lang="less">
  .sent-right {
    //   width: 48%;

    //   background: #f2f2f2;
    //   padding: 28px;
    //   border-radius: 0 0 15px 0;
    //   height: 584px;
    overflow-y: auto;
    .title {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
      // text-align: center;
    }
    .times {
      margin-bottom: 24px;
      // text-align: center;
    }
    .content {
      line-height: 26px;
    }
    .huifu-title {
      font-size: 14px;
      margin-top: 20px;
      color: #000;
    }
    .huifu-content {
      margin-top: 20px;
      font-size: 14px;
    }
  }
</style>
