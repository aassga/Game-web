<template>
     <div>
        <Modal :scrollable=true title="游戏公告" ok-text="关闭" v-model="showPopout" width="657" class="vp-popout-box">
            <div class="popout-box">
                <span v-html="popups" id="content"></span>
            </div>
        </Modal>
     </div>
</template>
<script>
import { postS, getS, _SetGet, _SetPost } from "@/service/public/service.js";
export default {
   data () {
       return {
           showPopout:false,
           popups:""
       }
   },
   methods: {
        async messageAlert(){
            let res = await getS(`member/lotteryAlertMessage`,{
                 lottery_id:12
            });
            if( res.code==200 && res.data!==""){
                this.showPopout=true
                this.popups=res.data
            }
        }
   },
   created () {
    if(this.$route.meta.id==12){
        this.messageAlert()
    }
   },
   watch: {
   },
   updated(){
       let content=document.getElementById("content")
       let textP=content.getElementsByTagName('p')
       for(let i=0;i<textP.length;i++){
            textP[i].style.fontSize="18px"
       }
   }
}
</script>

<style lang="less" scoped>
    /deep/ .ivu-modal-header-inner{
         font-size: 15px;
    }
</style>

