
<template>  
     <div>
         <div :style="newrefreh">刷新余额<i :style="trangle"></i></div>   
    </div>  
</template>

<script>
import { postS, getS } from "@/service/public/service.js";
export default {
    props:{
        newrefreh:{
            type:Object,
            default:function(){
                return {
                    position: 'absolute',
                    width: '67px',
                    height: '25px',
                    top:'-50px',
                    left: '-26px',
                    textAlign: 'center',
                    transition: 'all .3s linear',
                    backgroundColor:'#EE2D2D',
                    lineHeight: '25px',
                    color: '#fff',
                    fontSize: '14px',
                    zIndex: '1000',
                    cursor: 'pointer',
                    borderRadius:'5px',
                }
            }
        },
        trangle:{
            type:Object,
            default:function(){
               return {
                    fontSize: '22px',
                    content: "",
                    position: 'absolute',
                    bottom: '-14px',
                    left: '42%',
                    border: '7px solid transparent',
                    borderTop: '7px solid #EE2D2D',
                    transition: 'all .2s',
               }
            }
        },
    },
    data(){
        return{
            
        }
    },
    methods:{
    // getBalance() {
    //   if(this.isclick) return false
    //   this.isclick=true
    //   this.$parent.balanceRefreshing=true
    //   this.$parent.showfresh=false
    //   this.clickarr.push(this.frehclick)
    //   this.clickarr2.push(this.freh)
    //   setTimeout(()=>{
    //   this.$parent.balanceRefreshing=false
    //   },600)
    //   setTimeout(()=>{
    //       this.isclick=false
    //       this.clickarr.pop()
    //       this.clickarr2.pop()
    //   },5000)
    //   getS(`member/balance`).then(res => {
    //     if (res.code === 200) {
    //       if(["vnst","bet365","blr",'dqr','ecp','eyc','hsyl','hty','jltx','jsyl','ly88','mgm','pjdc','pjyl','sjcp','xpj','vnso','tycjt','cmgm'].includes(this.$websiteName)){
    //                this.$parent.refreshS=true
    //            setTimeout(()=>{
    //                this.$parent.refreshS=false
    //            })
    //       }
    //       let userinfo = JSON.parse(localStorage.userinfo);
    //       userinfo.balance = res.data.member;
    //       userinfo.agent = res.data.agency;
    //       this.$store.commit("mainState/reloadUserinfo", userinfo);
    //     }
    //   });
    //  },
    },
    computed:{
        
    }
}
</script>

<style lang="less" scoped>
    
</style>
