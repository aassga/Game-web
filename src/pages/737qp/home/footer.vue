<template>
  <div class="footer-box">
    <div class="footer">
      <div class="footer_top">
        <img src="/static/737qp/img/index_130.png" alt="">
      </div>
      <div class="footer_bottom">
        <img src="/static/737qp/img/footer_logo.png" alt="">
        <p>通过进入、继续使用或浏览此网站，您即被认定接受：我们将使用特定的浏览器cookies优化您的客户享用体验。新葡京棋牌仅会使用优化您服务体验的cookies，而不是可侵犯您隐私的cookies。关于我们使用cookies，以及您如何取消、管理cookies使用的更多详情，请参考我们的Cookies政策。</p>
        <ul>
          <li><router-link to="/home/about/1">关于我们</router-link></li>
           <li><router-link to="/home/about/3">存款帮助</router-link></li>
          <li><router-link to="/home/about/4">取款帮助</router-link></li>
         <li><router-link to="/home/about/2">常见问题</router-link></li>
        </ul>
      </div>
      <div class="copyright">
        <p>Venetian Macau © 版权所有 2011-2020属于新葡京棋牌(中国)有限公司注册运营</p>
        <p>新葡京棋牌所提供的产品和服务，是由澳门特别行政区 The Macau Special Administrative Region.授权和监管。选择我们，您将拥有可靠的资金保障和优质的服务。</p><p>Copyright © 新葡京棋牌 Reserved</p>
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
        title: "来自新葡京棋牌的消息",
        bgcolor: {
          background: "linear-gradient(to right, #f1d35e, #ac821b)"
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
  font-family: Microsoft YaHei !important;
  .footer {
    width: 100%;
    background: #151515;
    .footer_top {
      width: 100%;
      padding: 35px 0;
      border-bottom: 1px solid #2b3633;
      img {
        display: block;
        margin: 0 auto;
      }
    }
    .footer_bottom {
      width: 100%;
      border-top: 1px solid #8e614c;
      border-bottom: 1px solid #2b3633;
      img {
        display: block;
        height: 66px;
        margin: 25px auto;
        width: 166px;
      }
      p {
        width: 835px;
        margin: 0 auto;
        line-height: 20px;
        color: #89624d;
        text-align: center;
        font-size: 12px;
      }
      ul {
        text-align: center;
        padding: 30px 0;
        li {
          display: inline-block;
          font-size: 15px;
          line-height: 15px;
          color: #fff;
          &:not(:last-child) {
            border-right: 2px solid #fff;
            padding-right: 15px;
            margin-right: 15px;
          }
          a {
            text-decoration: none;
            font-size:14px;
            color: #fff;
          }
        }
      }
    }
    .copyright {
      padding: 20px 0;
      border-top: 1px solid #8e614c;
      p {
        width: 100%;
        line-height: 22px;
        text-align: center;
        color: #896249;
        font-size: 12px;
      }
    }
  }
}
</style>