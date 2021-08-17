<template>
  <div v-if="usdt">
    <div class="new2020 animated fadeInUp" @click="gopath">
      <div class="clBtn" @click.stop="usdt=false"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "usdt",
  data() {
    return {
      usdt:true,
    };
  },
  props: {
  },
  methods: {
    gopath(){
      window.open('/static/public/active/usdt/index.html')
    }
  }
};
</script>
<style lang="less" scoped>
.new2020 {
  position: fixed;
  z-index: 9999;
  cursor: pointer;
  width: 320px;
  height: 310px;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  background-image: url("/static/public/image/activity/usdt.png");
  .clBtn{
    width: 32px;
    height: 32px;
    background-image: url("/static/public/image/activity/x.png");
    position: absolute;
    top: -12px;
    right: 0;
    cursor: pointer;
  }
}
</style>
