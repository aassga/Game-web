<template>
  <div class="footer-box">
    <div class="footer-area">
      <div class="title">
        <ul>
          <li>澳门新葡京</li>
          <li>浏览器推荐</li>
          <li>监管机构</li>
          <li>合作伙伴</li>
        </ul>
      </div>
      <div class="link-area">
        <ul>
          <li><router-link to="/home/about/aboutUs">关于我们</router-link></li>
          <li><router-link to="/home/about/contactUs">联系我们</router-link></li>
          <li><router-link to="/home/about/deposit">存款帮助</router-link></li>
          <li><router-link to="/home/about/wthdrawal">取款帮助</router-link></li>
          <li><router-link to="/home/about/partner">合作伙伴</router-link></li>
        </ul>
      </div>
      <div class="footer-text">
        <p>Copyright © 澳门新葡京 Reserved</p>
      </div>
      <div class="shuxian1 shuxian">
        <img src="/static/cjw/img/home/footer-shuxian.png" alt />
      </div>
      <div class="shuxian2 shuxian">
        <img src="/static/cjw/img/home/footer-shuxian.png" alt />
      </div>
      <div class="shuxian3 shuxian">
        <img src="/static/cjw/img/home/footer-shuxian.png" alt />
      </div>
      <img src="/static/cjw/img/home/footer-bg1.png" alt="" class="footer-bg1 footer-bg">
      <img src="/static/cjw/img/home/footer-bg2.png" alt="" class="footer-bg2 footer-bg">
      <img src="/static/cjw/img/home/footer-bg3.png" alt="" class="footer-bg3 footer-bg">
    </div>
      <new-modal :newmodal="newmodal"></new-modal>
  </div>
</template>

<script>
import store from "@/vuex/store";
import newModal from '../../public/home/newmodal.vue'
export default {
  data() {
    return {
      newmodal:{
          title:"来自澳门新葡京的消息",
          bgcolor:{
            background: 'linear-gradient(to right, #65e0f4, #4fade6)'
          }
        }
    };
  },
  methods: {},
  computed: {},
  mounted() {},
  components:{
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
  background:linear-gradient(-30deg,rgba(108,215,225,1),rgba(79,184,230,1));
  font-family:Microsoft YaHei !important;
  .footer-area {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    .title{
      overflow: hidden;
      ul {
        margin-top: 22px;
        li:nth-child(1){
          margin-left: 6px;
          margin-right: 66px;
        }
        li:nth-child(2){
          margin-right: 71px;
        }
        li:nth-child(3){
          margin-right: 76px;
        }
        li {
          display: inline-block;
          font-size:18px;
          font-weight:400;
          color:#fff;
        }
      }
    }
    .link-area{
      ul{
        li {
          margin-top: 20px;
          margin-left: 4px;
          a{
            font-size: 14px;
            color: #fff;
            &:hover {
              color: #3B8D95;
            }
          }
        }
      }
    }
    .footer-text{
      background: url('/static/cjw/img/home/footer-line.png') no-repeat;
      background-size: 100% auto;
      margin-top: 26px;
      p{
        text-align: center;
        font-size:14px;
        font-weight:400;
        color:#fff;
        padding-top: 16px;
      }
    }
    .shuxian {
      position: absolute;
      top: 54px;
      &.shuxian1 {
        left: 100px;
      }
      &.shuxian2 {
        left: 280px;
      }
      &.shuxian3 {
        left: 414px;
      }
    }
    .footer-bg {
      position: absolute;
      top: 64px;
      &.footer-bg1{
        left: 140px;
      }
      &.footer-bg2{
        left: 310px;
      }
      &.footer-bg3{
        left: 469px;
      }
    }
  }
}
</style>