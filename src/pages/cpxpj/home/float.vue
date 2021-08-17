<template>
  <div class="v-left">
    <ul class="vl-lis">
      <li class="vlm-cur" @click="service">
        <div class="vl-icon">
          <img :src="serviceIcon" alt="" width="22">
        </div>
        <div class="vl-font">在线客服</div>
      </li>
      <li class="vlm-cur">
        <div class="vl-icon">
          <img :src="phoneIcon" alt="" width="22">
        </div>
        <div class="vl-font">APP下载</div>
        <div class="qrcode-wrapper">
          <div class="qrcode">
            <div ref="qr-code"></div>
          </div>
          <div class="download-text">扫码下载APP</div>
        </div>
      </li>
      <li class="vlm-cur" @click="scrollToTop" v-if="show">
        <div class="vl-icon">
          <img :src="topIcon" alt="" width="22">
        </div>
        <div class="vl-font">返回顶部</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      serviceIcon: require('../../../../static/cpxpj/img/service.svg'),
      phoneIcon: require('../../../../static/cpxpj/img/phone.svg'),
      topIcon: require('../../../../static/cpxpj/img/top.svg'),
    }
  },
  methods: {
    handleScroll(e) {
      this.show = window.scrollY >= 100
    },
    service() {
      const data = {
        name: '在线客服',
        text: 'SERVICE',
        link: 'service',
        type:"service",
      }
      this.$goPath('one',data)
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.createDownloadQRCode({
        el: this.$refs['qr-code'],
        url: window.location.origin + '/m/#/home?register=1',
        size: 120
    });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="less" scoped>
  .v-left {
    width: 80px;
    position: fixed;
    bottom: 50px;
    right: 10px;
    z-index: 13;
    background-color: #ededed;
    border-radius: 10px;

    .vl-lis {
      .vlm-cur {
        position: relative;
        border-bottom: 1px solid #fff;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        text-align: center;
        cursor: pointer;
        color: #8f98b2;
        font-size: 14px;

        .vl-icon {
          padding-top: 10px;
          width: 80px;
        }

        .vl-font {
          width: 80px;
        }

        &:hover {
          color: #fff;
          background-image: linear-gradient(0deg,#bb9759,#dac08f),linear-gradient(90deg,#553700,#664200);

          .qrcode-wrapper {
            display: block;
          }
        }

        &:first-of-type {
          border-radius: 10px 10px 0 0;
        }

        &:not([style*="display:none"]):last-of-type {
          border-bottom: none;
          border-radius: 0 0 10px 10px;
        }
      }
    }
  }

  .qrcode-wrapper {
    display: none;
    width: 180px;
    height: 220px;
    position: absolute;
    left: -200px;
    border-radius: 10px;
    bottom: 0;
    background-image: linear-gradient(0deg,#bb9759,#dac08f),linear-gradient(90deg,#553700,#664200);
    color: black;

    .qrcode {
      padding: 10px;
      width: 140px;
      height: 140px;
      margin: 20px auto;
      border-radius: 8px;
      background-color: #fff;
    }
  }
</style>