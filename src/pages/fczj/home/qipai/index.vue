<template>
  <div class="fishing_main">
      <vp-Qipai></vp-Qipai>
  </div>
</template>

<script>
  import vpQipai from '../../../public/qipai/newindex.vue'
  export default {
    data () {
      return {
       
      }
    },
    methods: {
    },
    created(){
    },
    components: {
      vpQipai
    }
  }
</script>
<style lang="less" scoped>
  .fishing_main {
    position: relative !important;
    height: 900px;
    background: url("/static/fczj/img/chess_bg.jpg") center top;
    display:flex; 
    justify-content: center; 
    align-items: center; 
  }
</style>
