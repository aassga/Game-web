<template>
  <div class="footer-box">
    <div class="footer-area">
      <div class="title">
        <ul>
          <li>金沙娱乐场</li>
          <li>浏览器推荐</li>
          <li>监管机构</li>
          <li>合作伙伴</li>
        </ul>
      </div>
      <div class="link-area">
        <ul>
          <li><router-link to="/home/about/guanyu">关于我们</router-link></li>
          <li><router-link to="/home/about/lianxi">联系我们</router-link></li>
          <li><router-link to="/home/about/cunkuan">存款帮助</router-link></li>
          <li><router-link to="/home/about/qukuan">取款帮助</router-link></li>
          <li><a @click="gameRules">游戏规则</a></li>
        </ul>
      </div>
      <div class="footer-text">
        <p>Copyright © 金沙娱乐场 Reserved</p>
      </div>
      <div class="shuxian1 shuxian">
        <img src="/static/amjs/img/home/footer-shuxian.png" alt />
      </div>
      <div class="shuxian2 shuxian">
        <img src="/static/amjs/img/home/footer-shuxian.png" alt />
      </div>
      <div class="shuxian3 shuxian">
        <img src="/static/amjs/img/home/footer-shuxian.png" alt />
      </div>
      <img src="/static/amjs/img/home/footer-bg1.png" alt="" class="footer-bg1 footer-bg">
      <img src="/static/amjs/img/home/footer-bg2.png" alt="" class="footer-bg2 footer-bg">
      <img src="/static/amjs/img/home/footer-bg3_1.png" alt="" class="footer-bg3 footer-bg">
    </div>
      <new-modal :newmodal="newmodal"></new-modal>
  </div>
</template>

<script>
import store from "@/vuex/store";
import newModal from "../../public/home/newmodal.vue";
export default {
  data() {
    return {
      newmodal: {
        title: "来自金沙娱乐场的消息",
        bgcolor: {
          background: "linear-gradient(to right, rgb(241, 211, 94), rgb(172, 130, 27))"
        }
      }
    };
  },
  methods: {
    gameRules(){
      window.open('#/rules/ssc?id=4');
    }
  },
  computed: {},
  mounted() {},
  components: {
    newModal
  },
  store
};
</script>

<style lang="less" scoped>
.footer {
  .pull-left {
    float: left !important;
  }

  .pull-right {
    float: right !important;
  }

  .clearfix:before,
  .clearfix:after {
    content: " ";
    display: table;
  }

  .clearfix:after {
    clear: both;
  }
}
.footer-box {
  width: 100%;
  height: 300px;
  background: #1e1e1e;
  font-family: Microsoft YaHei !important;
  .footer-area {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    .title {
      overflow: hidden;
      ul {
        margin-top: 22px;
        li:nth-child(1) {
          margin-left: 6px;
          margin-right: 66px;
        }
        li:nth-child(2) {
          margin-right: 71px;
        }
        li:nth-child(3) {
          margin-right: 76px;
        }
        li {
          display: inline-block;
          font-size: 18px;
          font-weight: 400;
          color: #fff;
        }
      }
    }
    .link-area {
      margin-left: 7px;
      ul {
        li {
          margin-top: 20px;
          margin-left: 4px;
          a {
            font-size: 14px;
            color:#707070;
            &:hover {
              color: #fff;
            }
          }
        }
      }
    }
    .footer-text {
      background: url("/static/amjs/img/home/footer-line.png") no-repeat;
      background-size: 100% auto;
      margin-top: 26px;
      p {
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        color: #707070;
        padding-top: 16px;
      }
    }
    .shuxian {
      position: absolute;
      top: 54px;
      &.shuxian1 {
        left: 122px;
      }
      &.shuxian2 {
        left: 292px;
      }
      &.shuxian3 {
        left: 436px;
      }
    }
    .footer-bg {
      position: absolute;
      top: 64px;
      &.footer-bg1 {
        left: 157px;
      }
      &.footer-bg2 {
        left: 327px;
      }
      &.footer-bg3 {
        left: 476px;
      }
    }
  }
}
</style>