<template>
  <div>
    <div class="new2019 animated fadeInUp mobile_auto" onclick="window.open('/static/blr/html/active/mobile/')"
         v-if="showNew2019">
      <div class="clBtn clBtn1" @click.stop="hideNew2019"></div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Aside',
    data () {
      return {
        showNew2019: true
      }
    },
    methods: {
      hideNew2019 () {
        this.showNew2019 = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .new2019 {
    position: fixed;
    z-index: 9999;
    right: 20px;
    bottom: 30px;
    cursor: pointer;
    width: 265px;
    height: 258px;
    background-image: url('/static/public/image/activity/gift.png');

    .clBtn {
      /*background: url('/static/test/img/new2019_close.png'); */
      z-index: 99999;
      position: absolute;
      width: 36px;
      height: 36px;
      top: 0;
      left: 0;
      display: inline-block;
    }

    &:hover .clBtn {
      display: block;
    }
  }
</style>
