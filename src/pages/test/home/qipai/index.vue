<template>
  <div class="qipai-wrap">
    <vp-qipai></vp-qipai>
  </div>
</template>
<script>
  import vpQipai from '../../../public/qipai/tg_index.vue'

  export default {
    data () {
      return {}
    },
    methods: {},
    created: function () {
    },
    mounted () {
    },
    watch: {},
    components: {
      vpQipai
    }
  }
</script>

<style lang="less" scoped>
  .qipai-wrap {
    // background: url('/static/public/image/buyu/pro_bg.jpg') top center no-repeat, #f3f2ef;
    padding-bottom: 20px;
    // padding-top: 30px;
    max-width: 1920px;
    min-width: 1200px;
    margin: 0 auto;
  }
</style>
