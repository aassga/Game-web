<template>
  <div class="filter" :class="theme" v-if="isNewUser && isOpen">
    <transition name="bounce">
      <div class="box-newuser" :class="theme">
        <img class="main" :src="imgList.imgMain" alt="" />
        <div class="numbers">
          <span class="freebonus">30</span>
          <span class="save">500</span>
          <span class="bonus">500</span>
          <span class="least">9750</span>
        </div>
        <div class="buttons">
          <img :src="imgList.imgBtbNo" class="no" @click="close" alt="" />
          <img :src="imgList.imgBtbYes" class="yes" alt="" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "JumpNewuser",
  props: {
    theme: {
      type: String,
      required: true,
    },
    isNewUser: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: true,
      imgList: {},
      lightThemeImg: {
        imgMain: "/static/public/image/jump/lightTheme/newuser-main.png",
        imgBtbNo: "/static/public/image/jump/lightTheme/newuser-btn-no.png",
        imgBtbYes: "/static/public/image/jump/lightTheme/newuser-btn-yes.png",
      },
      darkThemeImg: {
        imgMain: "/static/public/image/jump/darkTheme/newuser-main.png",
        imgBtbNo: "/static/public/image/jump/darkTheme/newuser-btn-no.png",
        imgBtbYes: "/static/public/image/jump/darkTheme/newuser-btn-yes.png",
      },
      purpleThemeImg: {
        imgMain: "/static/public/image/jump/purpleTheme/newuser-main.png",
        imgBtbNo: "/static/public/image/jump/purpleTheme/newuser-btn-no.png",
        imgBtbYes: "/static/public/image/jump/purpleTheme/newuser-btn-yes.png",
      },
    };
  },
  methods: {
    close() {
      this.isOpen = false;
    },
    changeThemeImg() {
      switch (this.theme) {
        case "light":
          this.imgList = this.lightThemeImg;
          break;
        case "dark":
          this.imgList = this.darkThemeImg;
          break;
        case "purple":
          this.imgList = this.purpleThemeImg;
          break;
        default:
          this.imgList = this.darkThemeImg;
      }
    },
  },
  created() {
    this.changeThemeImg();
  },
  beforeDestroy() {
    this.close();
  },
};
</script>

<style lang="less">
.bounce-enter-active {
  animation: bounce-in 0s;
}
.bounce-leave-to {
  animation: bounce-in 1s reverse !important;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
.bounce-leave-active.filter {
  background-color: transparent !important;
}
</style>

<style lang="less" scoped>
// mixin
.top-left(@t:0; @l:0;) {
  top: @t;
  left: @l;
}
//
.filter {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 10002;
  &.dark {
    background: rgba(0, 0, 0, 0.5);
  }
  &.light {
    background: rgba(0, 0, 0, 0.4);
  }
}
.box-newuser {
  display: inline-block;
  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  // .main { }

  .numbers {
    width: 100%;
    .top-left;
    position: absolute;
    span {
      position: absolute;
    }
    .freebonus {
      &:after {
        content: "%";
      }
    }
    .save,
    .bonus,
    .least {
      &:after {
        content: "元";
      }
    }
  }
  .buttons {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    img {
      cursor: pointer;
      margin: auto 0;
    }
  }

  // site customize
  &.dark {
    .numbers {
      span {
        color: #ea1a28;
        font-style: italic;
        font-weight: bold;
        &:after {
          font-size: 0.75em;
        }
      }
      .freebonus {
        .top-left(140px, 382px);
        font-size: 90px;
      }
      .save {
        .top-left(240px, 216px);
        font-size: 34px;
      }
      .bonus {
        .top-left(231px, 380px);
        font-size: 55px;
      }
      .least {
        .top-left(308px, 268px);
        font-size: 30px;
      }
    }
    .buttons {
      bottom: 84px;
      .no {
        margin-right: 16px;
      }
      .yes {
        margin-top: 6px;
      }
    }
  }
  &.purple {
    .numbers {
      span {
        color: #ff2a2a;
        font-weight: bold;
        &:after {
          font-size: 0.9em;
        }
      }
      .freebonus {
        .top-left(97px, 307px);
        font-size: 84px;
      }
      .save {
        .top-left(196px, 142px);
        font-size: 32px;
      }
      .bonus {
        .top-left(183px, 311px);
        font-size: 59px;
      }
      .least {
        .top-left(259px, 209px);
        font-size: 24px;
      }
    }
    .buttons {
      bottom: 30px;
      .no {
        margin-right: 8px;
      }
      .yes {
        margin-top: 3px;
      }
    }
  }
  &.light {
    .numbers {
      span {
        color: #ff3434;
        font-style: italic;
        font-weight: bold;
        &:after {
          font-size: 0.9em;
        }
      }
      .freebonus {
        .top-left(200px, 260px);
        font-size: 90px;
      }
      .save {
        .top-left(286px, 130px);
        font-size: 42px;
      }
      .bonus {
        .top-left(288px, 310px);
        font-size: 38px;
      }
      .least {
        .top-left(346px, 170px);
        font-size: 28px;
      }
    }
    .buttons {
      bottom: 15px;
      .no {
        margin-right: 8px;
      }
      .yes {
        margin-top: 3px;
      }
    }
  }
}
</style>

