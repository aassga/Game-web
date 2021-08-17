
import {getS} from '@/service/public/service.js';
const mixin = {
    data: function() {
        return {
            isclick:false,
            balanceRefreshing:false,
            showfresh:false,
        };
    },
    created() {
         
    },
    methods: {
    getBalance() {
      if(this.isclick) return false
      this.isclick=true
      this.balanceRefreshing=true
      this.showfresh=false
      setTimeout(()=>{
          this.balanceRefreshing=false
      },600)
      setTimeout(()=>{
          this.isclick=false
      },1000)
      getS(`member/balance`).then(res => {
        if (res.code === 200) {
          let userinfo = JSON.parse(localStorage.userinfo);
          userinfo.balance = res.data.member;
          userinfo.agent = res.data.agency;
          this.$store.commit("mainState/reloadUserinfo", userinfo);
        }
      });
    },
    },
    beforeDestroy() {}
};
export default mixin;