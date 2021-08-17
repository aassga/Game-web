<template>
  <div class="footer-bg clear">
    <div style="margin-top: 40px">
      <div class="footer index-footer">
        <div class="w1000">
          <div class="footer-img"></div>
          <div class="footer-link">
            <a
              v-for="(branch, index) in muneList"
              :key="index"
              href="javascript:void(0)"
              @click="goView(branch.link)"
              >{{ branch.name }}</a
            >
          </div>
          <div class="copyright">Copyright © 澳门金沙赌场 Reserved</div>
        </div>
      </div>
    </div>
    <div v-show="show_mobile" class="appDown animated mobile_auto">
      <span @click="show_mobile = false" class="clBtn"></span>
      <div class="codebox">
        <div ref="qr-code"></div>
      </div>
    </div>
    <new-modal :newmodal="newmodal"></new-modal>
  </div>
</template>

<script>
import store from "@/vuex/store";
import newModal from "../../public/home/newmodal.vue";
import { Modal } from "iview";
import $ from "jquery";

export default {
  data() {
    return {
      show_mobile: false,
      muneList: [
        { name: "游戏规则", link: "/rules/ssc?id=4" },
        { name: "关于我们", link: "/about-page" },
        { name: "联系我们", link: "/relation" },
        { name: "存款帮助", link: "/save-help" },
        { name: "取款帮助", link: "/pull-help" },
      ],
      newmodal: {
        title: "来自澳门金沙赌场的消息",
        bgcolor: {
          background: "linear-gradient(to right, #f1d35e, #ac821b)",
        },
      },
    };
  },
  methods: {
    goHelp(link) {
      this.$router.push(link);
    },
    goView(href) {
      if (href == "Kefu") {
        let service = JSON.parse(localStorage.config).service;
        if (service) {
          let ser = service.find((item) => item.status === "on");
          if (ser) {
            window.open(ser.url);
          }
        }
        return false;
      } else if (href.indexOf("rules") > -1) {
        var i = window.location.href.indexOf("#");
        var host = window.location.href.slice(0, i + 1);
        window.open(host + href, "_blank");
      } else {
        this.$router.push(href);
      }
    },
    shake(element, className, times) {
      var i = 0,
        t = false,
        o = element.attr("class"),
        c = "",
        times = times || 2;
      if (t) return;
      t = setInterval(function () {
        i++;
        c = i % 2 ? o + " " + className : o;
        element.attr("class", c);

        if (i == 2 * times) {
          clearInterval(t);
          element.removeClass(className);
        }
      }, 500);
    },
  },
  computed: {
    // 是否提示信息
    tipDatas() {
      return this.$store.state.alert.tipModel;
    },
    modeldetail() {
      return this.$store.state.alert.newtip;
    },
  },
  mounted() {
    this.shake($("#zmdl"), "yellow", -1);
    this.createDownloadQRCode({
      el: this.$refs["qr-code"],
      url: window.location.origin + "/m#/download",
      size: 80,
    });
  },
  components: {
    newModal,
  },
  store,
};
</script>

<style lang="less" scoped>
.footer {
  height: 120px;
  background: #161515;

  .w1000 {
    .footer-img {
      background: url("/static/js85/img/home/v0601_img/footer-bg.png") no-repeat
        center;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      height: 54px;
    }
    .footer-link {
      line-height: 28px;
      color: #707070;
      text-align: center;
      margin-top: 10px;
      font-size: 13px;

      a {
        color: #707070;
        margin: 0 20px;
        transition: all 0.4s;
        &:hover {
          color: #fff;
        }
        &.yellow {
          color: yellow !important;
        }
        &.red {
          color: #f00;
        }
      }
    }
  }
}

.footer-contact {
  height: 62px;
  padding-top: 20px;
  overflow: hidden;
  text-align: left;
  border-bottom: 1px dotted #535353;
  border-top: 1px solid #535353;

  li {
    float: left;
    height: 36px;
    line-height: 36px;
    color: #a0a0a0;
    font-family: Microsoft Yahei;
    font-size: 15px;
    transition: all 0.5s;
    cursor: pointer;

    a {
      color: #a0a0a0;
      font-size: 14px;
      transition: all 0.4s;
    }
  }
}

.footer-contact li b {
  color: #f2af41;
  font-size: 18px;
  font-weight: normal;
  font-family: Arial;
  margin-left: 9px;
  transition: all 0.4s;
}
.footer-contact li a b {
  margin-left: 0;
}
.footer-contact li.c1 {
  width: 280px;
}
.footer-contact li.c2 {
  width: 320px;
}
.footer-contact li.c3 {
  width: 200px;
}
.footer-contact li.c4 {
  width: 170px;
}
.footer-contact li span {
  width: 36px;
  height: 36px;
  display: block;
  float: left;
  margin-right: 3px;
  transition: all 0.4s;
}

.copyright {
  line-height: 28px;
  color: #707070;
  text-align: center;
}

.mobile_auto {
  position: fixed;
  z-index: 99999;
  left: 20px;
  bottom: 30px;
  cursor: pointer;
  width: 302px;
  height: 260px;
  background-image: url(/static/js85/img/APPxx.png);

  .codebox {
    display: block;
    width: 90px;
    height: 90px;
    background: #fff;
    padding: 5px;
    position: absolute;
    left: 30%;
    transform: translateX(-50%);
    bottom: 85px;
    text-align: center;
  }

  .clBtn {
    position: absolute;
    right: 40px;
    top: 5px;
    padding: 18px;
    cursor: pointer;
  }

  &:hover {
    transform: scale(1.1);
  }

  -webkit-animation: animateSub 2s linear infinite;
  -o-animation: animateSub 2s linear infinite;
  -moz-animation: animateSub 2s linear infinite;
  animation: animateSub 2s linear infinite;
  @-webkit-keyframes animateSub {
    25% {
      transform: translateY(5px);
    }
    75% {
      transform: translateY(-5px);
    }
  }
  @-moz-keyframes animateSub {
    25% {
      transform: translateY(5px);
    }
    75% {
      transform: translateY(-5px);
    }
  }
  @-o-keyframes animateSub {
    25% {
      transform: translateY(5px);
    }
    75% {
      transform: translateY(-5px);
    }
  }
  @-ms-keyframes animateSub {
    25% {
      transform: translateY(5px);
    }
    75% {
      transform: translateY(-5px);
    }
  }
  @keyframes animateSub {
    25% {
      transform: translateY(5px);
    }
    75% {
      transform: translateY(-5px);
    }
  }
}
</style>
