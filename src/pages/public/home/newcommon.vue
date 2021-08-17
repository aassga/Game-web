<template>
     <div>
        <div class="newBox" v-show="showPopout">
             <div class="pop-img" :class="['pop_'+poptype]">
                    <img :src="'/static/public/image/modal/'+poptype+'.png'" alt="">
                    <div :class="['desprite','desprite_'+poptype]">
                         <span v-html="popups"></span>
                    </div>
                    <div :class="['close','close_'+poptype]" @click="showPopout=false"></div>
             </div>
        </div>
        <div style="text-align:center" >
        <div class="mcBox" v-show="showimg && $store.state.home.loadedImg">
            <span class="cellSpan"></span>
            <div class="cellContent">
                <span style="position:absolute;right:0px;top:0;width:70px;height:70px;cursor:pointer;" @click="mcClose"></span>
                <a href="javascript:void(0)"><img ref="loadImg" :src="imgsrc" alt=""></a>
            </div>
        </div>
        </div>
     </div>
</template>
<script>
export default {
  props:{
      poptype:{
         type:String
      }
  },
    data(){
       return{
        isTest:false,
        popoutObj:{
          client_type:"PC"
        },
        popups:"",
        imgsrc:"",
        showPopout:false,
        description:"text",
        showimg:false,
        loadedImg:false
       }
    },
    methods:{
      mcClose(){
          this.showimg=false
      },
      getPosition(){
        let appears_location="";
        let bounce_location="";
        let fullPath=this.$router.currentRoute.path;
        // 是否首页
        if(fullPath=="/home"){
          this.popoutObj.appears_location=1;
        }else if(fullPath.includes("/home/live")||
          fullPath.includes("/home/games")||
          fullPath.includes("/home/buyu")||
          fullPath.includes("/home/tiyu")||
          fullPath.includes("/home/chess")||
          fullPath.includes("/home/sport")||
          fullPath.includes("/home/qipai")||
          fullPath.includes("/home/caipiao")
          ){
          this.popoutObj.appears_location=2;
        }else {
          // 非游戏页面和首页
          this.popoutObj.appears_location=3;
        }

        // 是否登录
        if(localStorage.token){
          // 存在表示登录后
          this.popoutObj.bounce_location=2;
        }else{
          // 登录前
          this.popoutObj.bounce_location=1;
        }
      },
      async getPopout1 () {
        this.getPosition();
        if(this.popoutObj.appears_location==3){
          // 非首页和游戏页，不用请求
          return false;
        }
        let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
          type: 'popups',
          client_type:this.popoutObj.client_type,
          appears_location:this.popoutObj.appears_location,
          bounce_location:this.popoutObj.bounce_location,
        })
        // 换一种写法
        let hasContent=false;
        if(res&&res.code==200){
          if(res.data.data.length){
            this.description=res.data.data[0].desc_format_type
            hasContent=true;
            if(localStorage.token && this.popoutObj.appears_location==1){
                this.$store.state.mainState.showDialog.home.login=false
            }else if(!localStorage.token && this.popoutObj.appears_location==1){
                this.$store.state.mainState.showDialog.home.noLogin=false
            }else if(localStorage.token && this.popoutObj.appears_location==2){
                this.$store.state.mainState.showDialog.game.login=false
            }else if(!localStorage.token && this.popoutObj.appears_location==2){
                 this.$store.state.mainState.showDialog.game.noLogin=false
            }
          }
        }else{
          return false;
        }

        let is_appears_location=false;
        // 判断登录状态按钮
        if(hasContent){
            if(res.data.data[0] && res.data.data[0].description){
              this.popups=res.data.data[0].description
            }else{
              this.imgsrc=res.data.data[0].pc_pic
            }
            this.$store.commit('mainState/resetPour', true)
            if(res.data.data[0].appears_location==this.popoutObj.appears_location){
              is_appears_location=true;
            }
        }else{
            return false;
        }
        if(is_appears_location){
            // 登录状态一直
            if(res.data.data[0].bounce_location!=3){
              // 返回数据显示，并非是不限制登录，都要弹出（登录前和登录后，都要）
              if(res.data.data[0].bounce_location==res.data.data[0].bounce_location){
                // 表示符合后台返回的情况,弹出
                if(this.description=="text"){
                     this.showPopout=true;
                }else{
                     this.showimg=true;
                }
              }else{
                // 不符合，不弹出
               if(this.description=="text"){
                     this.showPopout=false;
                }else{
                     this.showimg=false
                }
              }
            }else{
              // 不限制，都要弹出
                if(this.description=="text"){
                     this.showPopout=true;
                }else{
                     this.showimg=true
                }
            }
        }else{
            // 当前页和后台返回的页面不一致（主要判断是否是游戏页面和首页），
              if(res.data.data[0].appears_location=="1,2"){
                // 所有页面都要弹出
                 if(this.description=="text"){
                     this.showPopout=true;
                }else{
                     this.showimg=true
                }
              }else{
                // 不弹
                if(this.description=="text"){
                     this.showPopout=true;
                }else{
                     this.showimg=true
                }
              }
          }
      }
    },
    created(){
      let {game,home}=this.dalaDog
      if(game.login && game.noLogin && home.login && home.noLogin){
        if(!localStorage.register){
          this.getPopout1();
        }
      }
      
    },
    mounted(){},
    computed: {
      dalaDog(){
        return  this.$store.state.mainState.showDialog;
      },
     },
     watch:{
        $route(nVal,oVal){
          let {game,home}=this.dalaDog
           if(nVal.path=="/home" &&  !oVal.path.includes("/plays/hall")&&!oVal.path.includes("/rules")){
                if(home.login && home.noLogin){
                      this.getPopout1()
                }
           }
           if(nVal.path=="/home/qipai"||nVal.path=="/home/tiyu" ||nVal.path=="/home/live"||nVal.path=="/home/buyu"||nVal.path.includes("/home/games")){
                 if(game.login && game.noLogin){
                      this.getPopout1()
                 }
           }
        },
        showimg(nVal,oVal){
          if (nVal == true) {
            let img = this.$refs.loadImg;
            let that = this;
            img.onload = function() {
              that.$store.commit('home/changeIoadedImg', true)
            }
          }
        }
     },
}
</script>
<style lang="less" scoped>
       .newBox{
          width:100%;
          height: 100%;
          background-color: rgba(0,0,0,.6);
          position:fixed;
          left:0;
          top:0;
          right:0;
          bottom:0;
          margin:auto;
          z-index:10001;
          display: flex;
	        justify-content:center;
          align-items:center;
          .pop-img{
            position:relative;
            .desprite{
                z-index: 3000; 
                padding: 8px;
                line-height: 1.5;
                position: absolute;
                overflow-y: scroll;
            }
            .desprite::-webkit-scrollbar {
              display: none;
            }
            .desprite_blr{
                width: 530px;
                height: 280px;
                left: 34px;
                bottom:70px; 
            }
            .desprite_bet{
                width: 660px;
                height:445px;
                left: 13px;
                bottom:12px; 
            }
            .desprite_js{
                width: 720px;
                height: 440px;
                left: 14px;
                bottom:53px; 
            }
             .desprite_klk{
                width: 530px;
                height: 280px;
                left: 33px;
                bottom:63px; 
            }
            .desprite_pj{
                width: 720px;
                height: 440px;
                left: 18px;
                bottom:66px; 
            }
             .desprite_vns{
                width: 530px;
                height: 280px;
                left: 46px;
                bottom:80px; 
            }
            .desprite_vnst{
                width: 530px;
                height: 280px;
                left: 46px;
                bottom:80px; 
            }
             .desprite_tc{
                width: 720px;
                height: 440px;
                left: 14px;
                bottom:60px; 
            }
             .desprite_mgm{
                width: 720px;
                height: 440px;
                left: 18px;
                bottom:66px; 
            }
             .desprite_jhcp{
                width: 712px;
                height: 345px;
                left: 14px;
                bottom:60px; 
            }
             .desprite_ecp{
                width:670px;
                height: 407px;
                left: 39px;
                bottom:78px; 
            }
             .desprite_eyc{
                width:690px;
                height: 396px;
                left: 28px;
                bottom:78px; 
            }
            .desprite_szc{
                width:700px;
                height: 364px;
                left: 25px;
                bottom:55px; 
            }
            .desprite_ly88{
                width:716px;
                height: 407px;
                left: 14px;
                bottom:70px; 
            }
            .desprite_fczx{
                width:690px;
                height: 385px;
                left: 27px;
                bottom:80px; 
            }
            .desprite_sjcp{
                width:690px;
                height: 396px;
                left: 27px;
                bottom:80px; 
            }
            .desprite_wycp{
                width: 712px;
                height: 363px;
                left: 14px;
                bottom:60px; 
            }
            .desprite_pjyl{
                width:690px;
                height: 420px;
                left: 27px;
                bottom:80px; 
            }
            .desprite_ybcp{
                width: 712px;
                height: 334px;
                left: 14px;
                bottom:88px; 
            }
            .desprite_zyyl{
                width: 715px;
                height: 360px;
                left: 14px;
                bottom:60px; 
            }
            .desprite_t111{
                width:704px;
                height: 405px;
                left: 26px;
                bottom:61px; 
            }
            .desprite_500wcp{
                width: 715px;
                height: 360px;
                left: 14px;
                bottom:60px; 
            }
            .desprite_tycjt{
                width: 720px;
                height: 440px;
                left: 14px;
                bottom:60px; 
            }
            .desprite_hqyl{
                width: 720px;
                height: 440px;
                left: 14px;
                bottom:60px; 
            }
             .desprite_jsyl{
                width: 720px;
                height: 440px;
                left: 14px;
                bottom:60px; 
            }
            .desprite_vnso{
                width: 720px;
                height: 440px;
                left: 14px;
                bottom:60px; 
            }
            .desprite_jltx{
                width: 720px;
                height: 440px;
                left: 14px;
                bottom:60px; 
            }
            .desprite_xpj{
                width: 720px;
                height: 440px;
                left: 14px;
                bottom:60px; 
            }
            .desprite_478qp{
                width: 720px;
                height: 440px;
                left: 14px;
                bottom:60px; 
            }
            .desprite_632qp{
                width: 720px;
                height: 440px;
                left: 14px;
                bottom:60px; 
            }
            .desprite_839qp{
                width: 720px;
                height: 440px;
                left: 14px;
                bottom:60px; 
            }
            .desprite_935qp{
                width: 720px;
                height: 440px;
                left: 14px;
                bottom:60px; 
            }
            .close{
              position: absolute;
              cursor: pointer;
            }
            .close_blr{
              width: 150px;
              height: 35px;
              left: 218px;
              bottom: 20px;
            }
             .close_bet{
              width: 55px;
              height: 55px;
              right:6px;
              top: 15px;
            }
             .close_js{
              width:65px;
              height: 40px;
              right: 16px;
              top: 20px;
            }
             .close_klk{
              width: 150px;
              height: 35px;
              left: 217px;
              bottom: 22px;
            }
            .close_pj{
              width: 55px;
              height: 55px;
              right:8px;
              top: 12px;
            }
            .close_vns{
              width: 150px;
              height: 35px;
              left: 230px;
              bottom: 31px;
            }
            .close_vnst{
              width: 150px;
              height: 35px;
              left: 230px;
              bottom: 31px;
            }
            .close_tc{
              width: 55px;
              height: 55px;
              right:6px;
              top: 10px;
            }
            .close_mgm{
              width: 55px;
              height: 55px;
              right:8px;
              top: 12px;
            }
           .close_jhcp{
              width: 55px;
              height: 55px;
              right:13px;
              top: 10px;
            }
            .close_ecp{
              width: 55px;
              height: 55px;
              right:13px;
              top: 10px;
            }
            .close_eyc{
              width: 55px;
              height: 55px;
              right:13px;
              top: 10px;
            }
            .close_szc{
              width: 55px;
              height: 55px;
              right:13px;
              top: 10px;
            }
            .close_ly88{
              width: 55px;
              height: 55px;
              right:13px;
              top: 10px;
            }
            .close_fczx{
              width: 55px;
              height: 55px;
              right:13px;
              top: 10px;
            }
            .close_sjcp{
              width: 55px;
              height: 55px;
              right:8px;
              top: 10px;
            }
             .close_wycp{
              width: 55px;
              height: 55px;
              right:13px;
              top: 10px;
            }
             .close_pjyl{
              width: 55px;
              height: 55px;
              right:8px;
              top: 10px;
            }
            .close_ybcp{
              width: 55px;
              height: 55px;
              right:13px;
              top: 10px;
            }
             .close_zyyl{
              width: 55px;
              height: 55px;
              right:13px;
              top: 10px;
            }
             .close_t111{
              width: 55px;
              height: 55px;
              right:13px;
              top: 10px;
            }
            .close_500wcp{
               width: 55px;
              height: 55px;
              right:13px;
              top: 10px;
            }
            .close_tycjt{
              width: 55px;
              height: 55px;
              right:6px;
              top: 10px;
            }
             .close_hqyl{
              width: 55px;
              height: 55px;
              right:6px;
              top: 10px;
            }
              .close_jsyl{
              width: 55px;
              height: 55px;
              right:6px;
              top: 10px;
            }
              .close_vnso{
              width: 60px;
              height: 55px;
              right:20px;
              top: 10px;
            }
            .close_jltx{
              width: 55px;
              height: 55px;
              right:6px;
              top: 10px;
            }
            .close_xpj{
              width: 55px;
              height: 55px;
              right:6px;
              top: 10px;
            }
            .close_478qp{
              width: 55px;
              height: 55px;
              right:6px;
              top: 10px;
            }
            .close_935qp{
              width: 55px;
              height: 55px;
              right:6px;
              top: 10px;
            }
            .close_632qp{
              width: 55px;
              height: 55px;
              right:6px;
              top: 10px;
            }
            .close_839qp{
              width: 55px;
              height: 55px;
              right:6px;
              top: 10px;
            }
          }
          .pop_js{
             width: 740px;
             height: 580px;
          }
           .pop_bet{
             width: 680px;
             height: 540px;
          }
           .pop_blr{
             width: 587px;
             height: 434px;
          }
            .pop_klk{
             width: 587px;
             height: 434px;
          }
            .pop_pj{
             width: 748px;
             height: 588px;
          }
            .pop_vns{
             width: 611px;
             height: 463px;
          }
          .pop_vnst{
             width: 611px;
             height: 463px;
          }
          .pop_478qp{
             width: 611px;
             height: 463px;
          }
          .pop_632qp{
             width: 611px;
             height: 463px;
          }
          .pop_839qp{
             width: 611px;
             height: 463px;
          }
          .pop_935qp{
             width: 611px;
             height: 463px;
          }
            .pop_tc{
             width:740px;
             height: 580px;
          }
          .pop_jhcp{
             width:740px;
             height: 580px;
          }
          .pop_ecp{
             width: 740px;
             height: 580px;
          }
          .pop_eyc{
             width: 740px;
             height: 580px;
          }
          .pop_szc{
             width: 740px;
             height: 580px;
          }
          .pop_ly88{
             width: 740px;
             height: 580px;
          }
          .pop_fczx{
             width: 740px;
             height: 580px;
          }
          .pop_sjcp{
             width: 740px;
             height: 580px;
          }
          .pop_wycp{
             width: 740px;
             height: 580px;
          }
          .pop_pjyl{
             width: 740px;
             height: 580px;
          }
          .pop_ybcp{
             width: 740px;
             height: 580px;
          }
          .pop_zyyl{
             width: 740px;
             height: 580px;
          }
          .pop_t111{
             width: 740px;
             height: 580px;
          }
          .pop_500wcp{
             width: 740px;
             height: 580px;
          }
          .pop_500wcp{
             width: 740px;
             height: 580px;
          }
           .pop_tycjt{
             width: 740px;
             height: 580px;
          }
           .pop_hqyl{
             width: 740px;
             height: 580px;
          }
          .pop_jsyl{
             width: 740px;
             height: 580px;
          }
           .pop_vnso{
             width: 740px;
             height: 580px;
          }
           .pop_jltx{
             width: 740px;
             height: 580px;
          }
          .pop_mgm{
             width: 748px;
             height: 588px;
          }
          .pop_xpj{
             width: 748px;
             height: 588px;
          }
       }
       .mcBox{
        width:100%;
        height:100%;
        background-color: rgba(0,0,0,.6);
        position:fixed;
        left:0;
        top:0;
        right:0;
        bottom:0;
        margin:auto;
        z-index:10001;
        display: flex;
	    justify-content:center;
	    align-items:center;
        .cellSpan{
            display: inline-block;
            vertical-align: middle;
            height:100%;
            
        }
        .cellContent{
            position:relative;
            display: inline-block;
            vertical-align: middle;
            // background-color: red;
            .mcX{
                width:50px;
                height:50px;
                position:absolute;
                // right:10px;
                // top:110px; 
                right:0;
                top:0;
                // 此处位置需要根据位置随时更改
                cursor:pointer;
                font-size:40px;
                color:#000;
            }
        }
    }
</style>
