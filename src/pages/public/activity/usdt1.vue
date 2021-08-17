<template>
  <div>
    <div v-if="usdt">
      <div class="new2020 animated fadeInUp" :style="usdtStyle" @click="gopath1">
        <div class="clBtn" @click.stop="usdt = false"></div>
      </div>
    </div>
    <div v-if="cow">
      <div class="cattle animated fadeInUp" :style="{backgroundImage: bgi}" @click="gopath2">
        <div class="clBtn" @click.stop="cow = false"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'usdt1',
  data () {
    return {
      usdt: false,
      cow: false,
      cattle: '',
      bgi: '',
      usdtStyle: {
        bottom: '10px',
        right: '10px'
      }
    }
  },
  props: {
  },
  methods: {
    gopath1 () {
      window.open('/static/public/active/usdt/index.html')
    },
    gopath2 () {
      window.open('/static/public/active/' + this.cattle + '/index.html')
    },
    setCattle () {
      if (['jsyl', 'xpj', 'vnst', 'amxpj', 'dalao', 'aqvns'].includes(this.$websiteName)) {
        this.cattle = 'cattle1f'
        this.bgi = 'url("/static/public/image/activity/' + this.cattle + '.gif")'
      } else if (['pjdc', 'amvnsr','vns81', 'tycjt', 'tyc82', '99qp'].includes(this.$websiteName)) {
        this.cattle = 'cattle2s'
        this.bgi = 'url("/static/public/image/activity/' + this.cattle + '.gif")'
      } else {
        this.cattle = 'cattle3t'
        this.bgi = 'url("/static/public/image/activity/' + this.cattle + '.gif")'
      }
    },
    async getActiveStatus () {
      let res = await this.$http.get(`${this.$HOST_NAME}/activityIsOpen?class=C0002`)
      if (res && res.code === 200) {
        if (res.data === 'on') {
          this.usdtStyle = {
            left: '10px',
            bottom: '10px'
          }
          this.usdt = !['99qp'].includes(this.$websiteName)
          this.cow = true
        } else {
          this.usdt = !['99qp'].includes(this.$websiteName)
        }
      }
    }
  },
  created () {
    this.setCattle()
    this.getActiveStatus()
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.new2020 {
  position: fixed;
  z-index: 9999;
  cursor: pointer;
  width: 320px;
  height: 310px;
  background-image: url("/static/public/image/activity/usdt.png");
  .clBtn{
     width: 32px;
     height: 32px;
     background-image: url("/static/public/image/activity/x.png");
     position: absolute;
     top: -12px;
     right: 0;
     cursor: pointer;
  }
}
.cattle {
  position: fixed;
  z-index: 9999;
  cursor: pointer;
  width: 380px;
  height: 380px;
  bottom: 10px;
  right: 10px;
  .clBtn{
    width: 32px;
    height: 32px;
    background-image: url("/static/public/image/activity/x.png");
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
}
</style>
