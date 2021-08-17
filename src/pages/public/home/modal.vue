<template>
    <div class="mcBox">
        <Modal :scrollable=true title="提示信息" v-model="tipDatas.bool" class-name="vp-all-tipModel-wrap" width="450" :class="[tipDatas.type=='closeMaret'?'tipMarket':'']">
        <div :class="[tipDatas.type=='closeMaret'?'tipMarket-box':'tipModel-box']">
                    <span>
                        <i v-if="tipDatas.model=='warn'" class="iconfont icon-baojing"></i>
                        <i v-if="tipDatas.model=='error'" class="iconfont icon-cuowu"></i>
                        <i v-if="tipDatas.model=='success'" class="iconfont icon-chenggong"></i>
                    </span>
            <span v-html="tipDatas.title"></span>
        </div>
        </Modal>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    tipDatas() {
      return this.$store.state.alert.tipModel;
    }
  }
};
</script>
<style lang="less" scoped>
.mcBox{
  z-index: 2000;
}
/deep/.ivu-modal-mask {
  z-index: 2000;
}
/deep/.ivu-modal-wrap {
  z-index: 2000;
}
</style>