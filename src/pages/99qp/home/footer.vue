<template>
  <div class="footer-box">
    <div class="footer-area">
      <div class="title"></div>
      <div class="link-area">
        <ul>
          <li><router-link to="/home/about/1">关于我们</router-link></li>
          <li><router-link to="/home/about/2">联系我们</router-link></li>
          <li><router-link to="/home/about/2">合作伙伴</router-link></li>
          <li><router-link to="/home/about/3">存款帮助</router-link></li>
          <li><router-link to="/home/about/4">取款帮助</router-link></li>
          <li><router-link to="/home/about/2">常见问题</router-link></li>
          <!-- <li><a @click="gameRules">游戏帮助</a></li> -->
          <li><router-link to="/home/about/1">责任博彩</router-link></li>
          <!-- <li><a @click="gameRules">责任与条款</a></li> -->
          <li></li>
        </ul>
      </div>
      <div class="footer-text">
        <p>Cparisian Casino © 版权所有 2011-2021属于澳门威尼斯人注册运营</p>
          <p>澳门威尼斯人所提供的产品和服务，是由澳门特别行政区 The Macao Special Administrative Region.授权和监管。选择我们，您将拥有可靠的资金保障和优质的服务。</p>
        <p>Copyright © 澳门威尼斯人 Reserved</p>
      </div>
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
        title: "来自澳门威尼斯人的消息",
        bgcolor: {
          background: "linear-gradient(90deg,#65e0f4,#4fade6)"
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
  height: 260px;
  background: #F7F9FB;
  padding-top: 30px;
  font-family: Microsoft YaHei !important;
  .footer-area {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    .title {
      width: 1200px;
      height: 60px;
      margin: 0 auto;
      background: url('/static/99qp/img/fo_bg.png') no-repeat center center;
    }
    .link-area {
      margin-left: 7px;
      ul {
        display: flex;
        width: 473px;
        margin: 0 auto;
        li {
          margin-top: 20px;
          margin-left: 10px;
          a {
            font-size: 14px;
            color:#898e96;
            &:hover {
              color: red;
            }
          }
        }
      }
    }
    .footer-text {
      background-size: 100% auto;
      margin-top: 5px;
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
        left: 112px;
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