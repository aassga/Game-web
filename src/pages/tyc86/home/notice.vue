<template>
  <div class="newgong">
    <div class="newgong-content" @click="showTextModal()">
      <div class="notice" style="margin-left: -22px">
        <img src="/static/amjs/img/lb.png" alt="" />
        <span style="color: #f0e2b0">最新消息</span>
      </div>
      <div class="demolist list">
        <marquee
          v-if="lantern"
          align="middle"
          direction="left"
          loop="-1"
          scrollamount="5"
          onmouseout="this.start()"
          onmouseover="this.stop()"
          class="rollingNews"
        >
          <span v-html="lantern" style="color: #fff"></span>
        </marquee>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../../public/homeMeans/home_index.js";
import data1 from "../../public/homeMeans/Aside.js";

export default {
  name: "notice",
  mixins: [data, data1],
  data() {
    return {
      lantern: "",
      lanternData: "",
    };
  },
  methods: {
    // 获取公告列表接口，并缓存
    async getLanternList() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: "lantern",
        client_type: "PC",
        limit: 1000,
        page: 1,
      });
      if (res && res.code == 200) {
        this.lanternData = res.data;
        if (res.data.total > 0) {
          sessionStorage.setItem(
            "lanterndata",
            JSON.stringify(this.lanternData)
          );
        }
      } else {
        return false;
      }
    },
    //点击展示公告列表
    showTextModal() {
      if (this.lanternData.total > 0) {
        this.$store.commit("alert/showTextTip", true);
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.getLantern();
    this.getLanternList();
  },
};
</script>
<style lang="less" scoped>
.newgong {
  width: 100%;
  background: #191919;
  border: 1px solid #313131;
  color: #b8987f;
  z-index: 12;
  .newgong-content {
    width: 1000px;
    height: 35px;
    margin: 0 auto;
    cursor: pointer;
    .notice {
      float: left;
      position: relative;
      top: 0;
      left: 25px;
      margin-right: 50px;
      line-height: 35px;
      span {
        display: inline-block;
        line-height: 35px;
        font-size: 12px;
      }
      img {
        vertical-align: middle;
      }
      i {
        color: #000;
        font-size: 21px;
      }
    }
    .demolist {
      display: inline-block;
      width: 890px;
      span {
        p {
          color: #b8987f !important;
        }
      }
      .rollingNews {
        color: rgb(255, 255, 255);
        font-size: 14px;
        line-height: 35px;
        overflow: hidden;
        height: 35px;
      }
    }
  }
}
</style>
