<template>
  <div>
    <div class="new2019 animated fadeInUp" @click="gopath('open',leftHref)"
         v-if="showleft" :class="[leftad]">
      <div class="clBtn" @click.stop="showleft=false" :class="[leftadClose]"></div>
    </div>
    <div class="new2019 animated fadeInUp" @click="gopath('open',rightHref)"
         v-if="showright" :class="[rightad]">
      <div class="clBtn" @click.stop="showright=false" :class="[rightadClose]"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      showNew2019: true
    };
  },
  props: {
    leftHref: {
      type: String,
      default: function() {
        return 'mobile'
      }
    },
    rightHref: {
      type: String,
      default: function() {
        return 'mobile'
      }
    },
    showleft: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    showright: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    leftad: {
      type: String,
      default: function() {
        return "Mobile";
      }
    },
    leftadClose: {
      type: String,
      default: function() {
        return "Mobile-close";
      }
    },
    rightad: {
      type: String,
      default: function() {
        return "Mobile";
      }
    },
    rightadClose: {
      type: String,
      default: function() {
        return "Mobile-close";
      }
    }
  },
  methods: {
    gopath(type,path) {
      let jumpPath= `/static/${this.$websiteName}/html/active/${path}/`;
      switch (type) {
        case "open":
          if (jumpPath == "#") {
            return false;
          }
          window.open(jumpPath);
          break;
        default:
          window.location.href = jumpPath;
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.new2019 {
  position: fixed;
  z-index: 9999;
  cursor: pointer;
  .clBtn {
    z-index: 99999;
    position: absolute;
    display: inline-block;
  }
  &:hover .clBtn {
    display: block;
  }
}

.Mobile {
  width: 265px;
  height: 258px;
  bottom: 30px;
  right: 20px;
  background-image: url("/static/public/image/activity/gift.png");
  &-close {
    width: 36px;
    height: 36px;
    top: 0;
    left: 0;
  }
}
// 红包
// .packet {
//   width: 400px;
//   height: 359px;
//   bottom: 30px;
//   right: 20px;
//   background-image: url("/static/public/image/activity/packet.gif");
//   &-close {
//     width: 28px;
//     height: 28px;
//     top: 0;
//     right: 0;
//     background-image: url("/static/public/image/activity/close1.png");
//   }
// }
// .packetRain {
//   width: 382px;
//   height: 376px;
//   bottom: 30px;
//   right: 20px;
//   background-image: url("/static/public/image/activity/packetRain.gif");
//   &-close {
//     width: 28px;
//     height: 28px;
//     top: 0;
//     right: 0;
//     background-image: url("/static/public/image/activity/close1.png");
//   }
// }
</style>
