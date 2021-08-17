 <template>
    <div class="notice" :class="`${siteName}_notice`">
            <div class="newgong-content" >
                <div class="notice">
                    <img :src="notice" class="notice-icon" alt />
                    <span>最新公告 :</span>
                </div>
                <div v-if="siteName=='jltx'||siteName=='jltx-new2'" class="demolist list" @click="showTextModal()">
                    <marquee
                    v-if="lantern"
                    align="middle"
                    direction="left"
                    loop="-1"
                    scrollamount="5"
                    onmouseout="this.start()"
                    onmouseover="this.stop()"
                    class="marquee"
                    >
                    <span v-html="lantern"></span>
                    </marquee>
                    
                </div>
                <div v-else class="demolist list" @click="showTextModal()">
                    <marquee
                    v-if="lantern"
                    align="middle"
                    direction="left"
                    loop="-1"
                    scrollamount="3"
                    onmouseout="this.start()"
                    onmouseover="this.stop()"
                    class="marquee"
                    >
                    <span v-html="lantern"></span>
                    </marquee>
                    
                </div>
            </div>
    </div>
 </template>
 <script>
export default {
  props: {
    notice: {
      type: String
    },
    siteName: {
      type: String
    }
  },
  data() {
    return {
      lantern: "",
      lanternData:""
    };
  },
  methods: {
    // 公告弹出框
    showTextModal(){
        if(this.lanternData.total>0){
            this.$store.commit('alert/showTextTip', true)
        }else{
            return false
        }  
    },
    async getLantern() {
      this.$store
        .dispatch("home/newNotice", { type: "lantern", client_type: "PC" })
        .then(res => {
          if (res && res.code == 200) {
            this.lanternData = res.data;
            if (res.data.data.length) {
              this.lantern = res.data.data[0] && res.data.data[0].description;
            } else {
              return false;
            }
          }
        });
    }
  },
  mounted() {
    this.getLantern();
  }
};
</script>
 <style lang="less" scoped>
 .notice{
  position: absolute;
  width: 100%;
  height: 36px;
  line-height: 33px;
  color: #140405;
  z-index: 10;
  .newgong-content {
    width: 1200px;
    height: 36px;
    margin: 0 auto;
    .notice {
      float: left;
      position: relative;
      top: 2px;
      left: 25px;
      margin-right: 36px;
      color: #ffd587;
      width: 94px;
      .notice-icon {
        position: absolute;
        top: 7px;
        width: 18px;
        height: 18px;
      }
      span {
        font-size: 14px;
        vertical-align: super;
        margin-left: 27px;
      }
    }
    .demolist {
      display: inline-block;
      width: 990px;
      .marquee {
        color: white;
        font-size: 13px;
        line-height: 36px;
        overflow: hidden;
        height: 36px;
      }
    }
    /deep/.el-carousel {
      overflow: visible;
    }
  }
 }
.mgm-preview_notice{
  background: #030306;
}
.mgm_notice{
  background: #030306;
}
.pjdc_notice {
  background: rgba(0, 0, 0, 0.75);
}
.jltx_notice {
  background: rgba(0, 0, 0, 0.65);
  bottom: 0;
  .demolist .marquee{
    font-size: 16px!important;
    color: #fff!important;
  }
}
.jltx-new2_notice {
  background: rgba(0, 0, 0, 0.65);
  bottom: 0;
  .demolist .marquee{
    font-size: 16px!important;
    color: #fff!important;
  }
}
.jsyl_notice {
  background: url(/static/jsyl/img/noticebg.png) repeat-x;
  .notice span{
    color: #e0bf55!important;
    font-size: 12px!important;
  }
  .demolist .marquee{
    font-size: 16px!important;
  }
}
.vnst_notice {
  background: url(/static/vnst/img/noticebg.png) repeat-x;
  .notice span{
    color: #e0bf55!important;
    font-size: 12px!important;
  }
  .demolist .marquee{
    font-size: 16px!important;
  }
}
.aqvns_notice {
  background: url(/static/aqvns/img/noticebg.png) repeat-x;
  .notice span{
    color: #e0bf55!important;
    font-size: 12px!important;
  }
  .demolist .marquee{
    font-size: 16px!important;
  }
}
.fhcp_notice {
  background: url(/static/fhcp/img/noticebg.png) repeat-x;
  .notice span{
    color: #e0bf55!important;
    font-size: 12px!important;
  }
  .demolist .marquee{
    font-size: 16px!important;
  }
}
.xpj83_notice {
  background: url(/static/xpj83/img/noticebg.png) repeat-x;
  .notice span{
    color: #e0bf55!important;
    font-size: 12px!important;
  }
  .demolist .marquee{
    font-size: 16px!important;
  }
}
.amvnsr_notice {
  background: url(/static/amvnsr/img/noticebg.png) repeat-x;
  .notice span{
    color: #e0bf55!important;
    font-size: 12px!important;
  }
  .demolist .marquee{
    font-size: 16px!important;
  }
}
.amjs_notice {
  .newgong-content{
    width:1050px;
    .demolist{
      width:899px;
    }
  }
  background: url(/static/amvnsr/img/noticebg.png) repeat-x;
  .notice span{
    color: #e0bf55!important;
    font-size: 12px!important;
  }
  .demolist .marquee{
    font-size: 16px!important;
  }
}
.a478qp_notice {
  background: url(/static/478qp/img/noticebg.png) repeat-x;
  .notice span{
    color: #e0bf55!important;
    font-size: 12px!important;
  }
  .demolist .marquee{
    font-size: 16px!important;
  }
}
.aylhg_notice {
  background: url(/static/ylhg/img/noticebg.png) repeat-x;
  .notice span{
    color: #e0bf55!important;
    font-size: 12px!important;
  }
  .demolist .marquee{
    font-size: 16px!important;
  }
}
</style>
 
 