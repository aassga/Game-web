
const mixin = {
  data: function () {
    return {

    };
  },
  created() {
  },
  mounted() {},
  methods: {
    //轮播图
    async getBanner() {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/position`, {
        position: "banner",
        clientType: "pc"
      });
      if (res && res.code == 200) {
        this.carouselData = res.data[0] && res.data[0].body;
      }
    },
    //走马灯
    async getLantern () {
      let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
        type: 'lantern',
        client_type:"PC"
      })
      if (res && res.code == 200) {
        if(res.data.data.length){
          this.lantern = res.data.data[0] && res.data.data[0].description
        }else{  
          return false;
        }
      }
    },
  },
};

export default mixin;
