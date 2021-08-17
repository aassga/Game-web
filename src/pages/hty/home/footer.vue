<template>
  <div class="footer-box">
    <div class="arrCont">
      <div class="iconArr">
        <!-- <div></div> -->
        <div></div>
      </div>
    </div>
    
    <div class="footer-area">
      
      <div class="link-area">
        <ul>
          <li><router-link to="/about-page">关于我们</router-link></li>
          <li><router-link to="/relation">联系我们</router-link></li>
          <li><router-link to="/save-help">存款帮助</router-link></li>
          <li><router-link to="/pull-help">取款帮助</router-link></li>
          <li><a @click="gameRules">游戏规则</a></li>
        </ul>
      </div>
      <div class="footer-text">
        <p>Copyright © 金沙娱乐场Sands MACAO Reserved</p>
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
        title: "来自金沙娱乐场的消息",
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
  height: 215px;
  background: #000;
  font-family: Microsoft YaHei !important;
  padding-top: 30px;
  .arrCont{
    border-bottom: 1px solid #2A2A2A;
    padding-bottom: 30px;
  }
  .iconArr{
    display: flex;
    width: 1200px;
    margin: 0 auto;
    div{
      &:first-child{
        width: 89px;
        height: 35px;
        background: url('/static/hty/img/bbIcon.png')no-repeat;
        background-size: cover;
        position: relative;
        top: 10px;
        right: 10px;
      }
      &:last-child{
        width: 916px;
        height: 41px;
        background: url('/static/hty/img/iconArr.png')no-repeat;
        background-size: cover;
        margin: 0 auto;
      }
    }
    
  }
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
          margin-right: 41px;
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
      margin: 0 auto;
      width: 500px;
      ul {
        display: flex;
        li {
          margin-top: 20px;
          margin-left: 30px;
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
      margin-top: 10px;
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