<template>
  <div class="recommend">
    <div class="header">
       <!-- 邀请好友 -->
       <ul>
        <li>
          <span>邀请好友</span>
        </li>
        <li class="aisle">
          <span :class="{spanActive:spanActive ==0}" @click="toggle(0)">分享链接</span>
        </li>
        <li class="aisle">
          <span :class="{spanActive:spanActive ==1}" @click="toggle(1)">直接开户</span>
        </li>
      </ul>
    </div>
    <div class="content" v-if="spanActive ==0">
      <div class="left fl">
        <div class="bar">
          <label class="text">注册链接:</label>
          <input type="text" v-model="linkVal">
          <span @click="Copy(linkVal)">复制链接</span>
        </div>

        <div class="bar">
          <label class="text">您的二维码:</label>
          <div id="qrcode"></div>
        </div>

        <div class="main">
          <p>扫描推送更便捷</p>
          <p>右击图标保存分享微信、QQ、微博让你推广更便捷</p>
        </div>

        <div class="bottom">
          <h3 class="font-color">温馨提示</h3>
          <p>您的好友必须从您的
            <span class="font-color">专属链接</span>来
            <span class="font-color">注册</span>。</p>
          <p>反赠金额在
            <span class="font-color">隔日18:00</span>前派发，彩金转入平台后需要达到
            <span class="font-color">1倍流水</span>才能进行提款。</p>
          <p>领取好友彩金时，对应的老虎机平台的余额必须小于5元。</p>
          <p>好友彩金有效时间为30天（从派发当日开始计算），规定时间内未领取则自动取消。</p>
        </div>
      </div>
      <div class="right fr">
        <div class="title">
          最近推荐好友记录
        </div>

        <Table :columns="columns" :data="data"
               no-data-text="<div style='line-height:453px;background:#f2f2f2;'><img src='/static/public/image/userImg/no-data.png' alt=''></div>"></Table>
      </div>
    </div>
    <div v-if="spanActive ==1" class="newcontent">
      <div class="row">
        <label>开户帐号</label>
        <input type="text" v-model="userName" placeholder="6-10位数字或字母" maxlength="10">
      </div>
      <!-- 默认密码 -->
      <div class="row">
        <label>默认密码</label>
        <input type="text" v-model="password" disabled>
      </div>
       <div class="submitPay" @click="submitOpen">确认提交</div>
    </div>
  </div>
</template>

<script>
// import store from "@/vuex/store";
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      columns: [
        {
          title: "邀请人名称",
          key: "userName"
        },
        {
          title: "邀请时间",
          key: "created_at",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                moment
                  .unix(params.row.created_at - 0)
                  .format("YYYY-MM-DD HH:mm:ss")
              )
            ]);
          }
        },
        {
          title: "被邀请人帐号",
          key: "inviteUserName"
        },
        {
          title: "站点名称",
          key: "siteName"
        }
      ],
      data: [],
      linkVal: "www.baidu.com",
      spanActive: 0,
      userName: "",
      password: Math.random().toString().slice(-8),
    };
  },
  methods: {
    inviteRecord() {
      this.$http.post(`${this.$HOST_NAME}/member/invite/record`).then(res => {
        if (res.code == 200) {
          this.data = res.data.data;
        }
      });
    },
    Copy(link) {
      this.$success("复制成功");
      this.$copyText(link);
    },
    toggle(i) {
      this.spanActive = i;
      if(i==0){
         this.createCode();
      }
    },
    submitOpen(){
      
    },
    createCode(){
        this.$http.get(`${this.$HOST_NAME}/member/invite`).then(res => {
        if (res.code == 200) {
          this.linkVal = res.data.invite_link;
          let qrcode = new QRCode("qrcode", {
            width: 202,
            height: 202, // 高度
            text: res.data.invite_link, // 二维码内容
            render: "table" // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
            // background: '#f0f'
            // foreground: '#ff0'
          });
          this.$store.commit("loading", false);
        }
      }); 
    }
  },
  mounted() {
    this.$store.commit("loading", true);
    this.$nextTick(() => {
        this.createCode();
      // this.$http.get(`${this.$HOST_NAME}/member/invite`).then(res => {
      //   if (res.code == 200) {
      //     this.linkVal = res.data.invite_link;
      //     let qrcode = new QRCode("qrcode", {
      //       width: 202,
      //       height: 202, // 高度
      //       text: res.data.invite_link, // 二维码内容
      //       render: "table" // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      //       // background: '#f0f'
      //       // foreground: '#ff0'
      //     });
      //     this.$store.commit("loading", false);
      //   }
      // });
    });
  },
  created() {
    this.inviteRecord();
  },
  destroyed() {
    this.$store.commit("loading", false);
  }
  //   store
};
</script>

<style lang="less">
.ivu-table {
  background: transparent;
}

.recommend {
  // .header {
  //   height: 66px;
  //   // line-height: 66px;
  //   border-bottom: 1px solid #f3f3f3;
  //   font-size: 1.8em;
  //   padding-left: 10px;
  //   color: #696969;
  //   line-height: 85px;
  //   font-weight: 400;
  //   margin: 0 14px;

  // }
  .header {
    border-bottom: 1px solid #f3f3f3;
    height: 66px;
    line-height: 66px;
    margin-left: 28px;
    ul {
      line-height: 66px;
      overflow: hidden;
      padding: 15px 0;
      li {
        padding: 0 20px;
        font-size: 1.8em;
        height: 40px;
        float: left;
        line-height: 40px;
        text-align: center;
      }
      li:nth-child(1) {
        padding: 0;
        height: 40px;
        line-height: 40px;
        span {
          line-height: 28px;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          display: inline-block;
          padding-right: 14px;
          height: 28px;
          border-right: 1px solid #dbdbdb;
          font-weight: 400;
          color: #696969;
        }
      }
      .aisle {
        border: none;
        font-size: 1.6em;
        font-weight: 200;
        padding-left: 14px;
        span {
          padding: 6px 20px;
          cursor: pointer;
        }
        .spanActive {
          background: linear-gradient(180deg, #fe8983, #f0b761);
          border-radius: 10px;
          color: #fff;
        }
      }
    }
  }
  .content {
    .left {
      width: 52%;
      .bar {
        margin-top: 30px;
        .text {
          display: inline-block;
          width: 144px;
          text-align: right;
          font-size: 1.4em;
          vertical-align: middle;
          margin-right: 10px;
        }
        input {
          height: 36px;
          border: 1px solid #dbdbdb;
          outline: none;
          text-indent: 1em;
          border-radius: 4px 0 0 4px;

          &:not(.other) {
            width: 239px;
            height: 36px;
            background: #f9f9f9;
          }
        }
        span {
          height: 36px;
          display: inline-block;
          width: 80px;
          background: linear-gradient(180deg, #ff3493, #ff1b46);
          line-height: 36px;
          color: #fff;
          text-align: center;
          margin-left: -5px;
          border-radius: 0 4px 4px 0;
          font-size: 16px;
          transform: translateY(3%);
          cursor: pointer;
        }
      }
      .main {
        // margin-left: 210px;
        text-align: center;
        font-size: 1.3em;
        margin-top: 10px;
        p:nth-child(1) {
          padding-bottom: 12px;
          font-size: 16px;
        }
      }
      .bottom {
        margin: 30px 36px;
        background: #fefef2;
        padding: 16px 8px 10px 8px;
        h3 {
          margin-bottom: 10px;
          font-size: 15px;
        }
        p {
          margin-bottom: 6px;
        }
      }
      .font-color {
        color: #ff8c53;
      }
      #qrcode {
        width: 202px;
        height: 202px;
        background: #fff;
        display: inline-block;
        vertical-align: top;
      }
    }
    .right {
      width: 48%;
      border-radius: 0 0 15px 0;
      height: 650px;
      background: #f2f2f2;
      padding: 0 20px;
      .title {
        font-size: 15px;
        height: 64px;
        line-height: 64px;
      }
    }
  }
}

.ivu-table {
  background: #f2f2f2;
}
@inputPlaceholder: {
  width: 55px;
  height: 42px;
  font-size: 14px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(170, 170, 170, 1);
  line-height: 42px;
  text-indent: 15px;
};
.newcontent {
  .row {
    label {
      width: 67px;
      height: 16px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 52px;
      margin-right: 15px;
      margin-left: 28px;
    }
    input {
      height: 36px;
      font-size: 16px;
      background: rgba(113, 14, 31, 1);
      border: 0 solid #f5f5f5;
      border-radius: 10px;
      // padding: 0 16px;
      text-align: left;
      text-indent: 1em;
      -webkit-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
      -moz-box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
      box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06);
      color: #666;
      &:not(.other) {
        width: 240px;
        height: 38px;
        background: #fdfdfd;
      }
      .ivu-radio {
        font-size: 16px;
        color: #666;
      }
    }
    input::-webkit-input-placeholder {
      @inputPlaceholder();
    }
    input:focus {
      outline: none !important;
      border: 1px solid rgba(254, 134, 93, 0.6);
      box-shadow: inset 0 1px 10px 0 RGBA(0, 0, 0, 0.06),
        0 1px 10px 5px rgba(254, 134, 93, 0.14);
    }
  }
  .submitPay {
    width: 140px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    color: #fff;
    font-size: 1.8em;
    background: linear-gradient(180deg, #ff3494, #ff1c4b);
    border-radius: 5px;
    margin: 12px 110px;
    cursor: pointer;
  }
}
</style>
