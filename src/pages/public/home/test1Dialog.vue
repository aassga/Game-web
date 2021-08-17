<template>
  <div class="test1Dialog" v-if="showPopout">
    <div :class="['dialogContent',dialogPar.activeName=='betActive'?'betDialog':$websiteName=='jsyl'?'jsylDialog':'']" :style="{'border-top':dialogPar.borderTop}">
      <div class="listHead" :style="{'background-color':dialogPar.headBg}">
        <span :style="{color:dialogPar.headColor}">平台公告</span>
        <span v-if="dialogPar.hoverName == 'hoverName1'"><i @click="closeNotice"></i></span>
        <span v-else-if="dialogPar.hoverName == 'hoverName7'"><i @click="closeNotice" class="amhgSpan"></i></span>
        <span v-else><em @click="closeNotice"></em></span>
      </div>
      <div class="listContainer" :style="{'border-top':dialogPar.bandBorder}">
        <div>
          <ul>
            <li v-for="(item,index) in popups" @click="activeTab(item.text,index)" :key="index">
              <a :style="{'border-left':dialogPar.borderLeft}" :class="[index == activeI?dialogPar.activeName : '',dialogPar.hoverName]" href="#">
                <i class="listIcon"></i>{{item.text}}</a>
            </li>
          </ul>
        </div>
        <div :class="[change?'':'','contentBox']">
          <div class="picTitle" :style="{color:dialogPar.titleColor}">{{title}}</div>
          <ul>
            <li v-for="(item,index) in imgsrc" :key="index" v-if="activeI == index">
              <img v-if="item.img" :src="item.img">
              <p v-if="item.description" v-html="item.description"></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
      dialogPar:{
             type: Object,
        }
  },
  data(){
    return{
      title:"",
      activeI:0,
      change:false,
      popoutObj:{
        client_type:"PC"
      },
      popups:[],
      imgsrc:[],
      showPopout:false,
      description:"text",
    }
  },
  mounted(){},
  created(){
    if(this.$route.path=="/home"){
      if(!localStorage.register){
        this.getPopout1();
      }
    }else{
      if(this.$store.state.mainState.newShowDialog){
        this.getPopout1();
        this.$store.commit('mainState/newShowDialog',false)
      }
    }
  },
  methods:{
    activeTab(text,index){
      this.title = text;
      this.activeI = index;
    },
    closeNotice(){
      this.showPopout = false;
    },
    getPosition(){
      let appears_location="";
      let bounce_location="";
      let fullPath=this.$router.currentRoute.path;
      // 是否首页
      if(fullPath=="/home"){
        this.popoutObj.appears_location=1;
      }else if(
        fullPath.includes("/home/slot")||
        fullPath.includes("/home/fish")||
        fullPath.includes("/home/tiyu")||
        fullPath.includes("/home/chess")||
        fullPath.includes("/home/live")
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
          limit:1000
        })
        // 换一种写法
        // let hasContent=false;
        if(res&&res.code==200){
          if(res.data.data.length){
             // 对数据进行处理
             if(res.data.data[0]){
              let data = res.data.data;
              this.imgsrc=[];
              this.popups=[];
              let textArr = {};
              let imgArr = {};
              for (let i = 0; i < data.length; i++) {
                textArr = {text:data[i].title}
                this.popups.push(textArr);
                if(data[i].pc_pic){
                  imgArr = {img:data[i].pc_pic}
                  this.imgsrc.push(imgArr);
                }else{
                  imgArr = {description:data[i].description}
                  this.imgsrc.push(imgArr)
                }
              }
              // this.imgsrc.reverse();
              // this.popups.reverse();
            }
            this.activeTab(this.popups[0].text,0);
            this.$store.commit('mainState/resetPour', true)
            this.showPopout=true;
          }
        }else{
          return false;
        }
      }
  },
  computed: {
  },
  watch:{
    $route(nVal,oVal){
      if(["/home/live","/home/chess","/home/tiyu","/home/fish","/home/slot"].includes(nVal.path)){
          if(this.$store.state.mainState.newShowDialog){
              this.getPopout1();
              this.$store.commit('mainState/newShowDialog',false)
          }
      }
    },
    activeI(val){
      this.change = true;
      setTimeout(() => {
        this.change = false;
      }, 100);
    },
  }
}
</script>

<style lang="less" scoped>

.test1Dialog{
  width:100%;
  height: 100%;
  position:fixed;
  left:0;
  top:0;
  right:0;
  bottom:0;
  margin:auto;
  z-index: 1998;
  font-family: "microsoft jhenghei"!important;
 
  .fadeIn{
    -webkit-transition: all .3s; 
    -moz-transition: all .3s; 
    -ms-transition: all .3s; 
    -o-transition: all .3s; 
    transition: all .3s; 
    opacity: 0;
  }
  .fadeOut{
    -webkit-transition: all .3s; 
    -moz-transition: all .3s; 
    -ms-transition: all .3s; 
    -o-transition: all .3s; 
    transition: all .3s; 
    opacity: 1;
  }
  .betDialog{
    width:1000px!important;
    .listContainer{
      .contentBox{
        width: 655px!important;
        ul{
          width: 635px!important;
        }
      }
    }
  }
  .jsylDialog{
    transform: translate(-50%,-46.5%)!important;
  }
  .dialogContent{
    width:1128px;
    height: 629px;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 9999;
    background: #fff;
    border-radius: 5px;
    // border-top: 3px solid rgb(104, 176, 216);
    box-shadow: 0 0 25px rgba(0,0,0,.3);
    .listHead{
      &:first-child{
        span{
          display: inline-block;
          height: 60px;
          width: 160px;
          line-height: 60px;
          text-align: center;
          color: rgb(104, 176, 216);
          font-size: 30px;
          font-family: 'STHeiti', "microsoft yahei", '微软雅黑', 'simsun', '宋体', 'arial';
          font-weight: normal;
          &:last-child{
            float: right;
            i {
                display: inline-block;
                width: 20px;
                height: 5px;
                background: rgb(175, 214, 235);
                transform: rotate(45deg);
                position: relative;
                left: 45px;
                top: -10px;
                cursor: pointer;
            }
            i::after {
                content: '';
                display: block;
                width: 20px;
                height: 5px;
                font-weight: bold;
                background: rgb(175, 214, 235);
                transform: rotate(-90deg);
                cursor: pointer;
            }
            .amhgSpan{
                background:#c2a775;
            }
            .amhgSpan::after{
                background:#c2a775;
            }
            em{
              display: inline-block;
              height: 21px;
              width: 21px;
              background: url('/static/public/image/logClose.png') no-repeat;
              background-size: 100% 100%;
              position: relative;
              left: 40px;
              cursor: pointer;
            }
          }
        }
      }
      
    }
    .listContainer{
      display: flex;
      border-top: 1px solid #DFDFDF;
      div{
        &:first-child{
          width: 348px;
          background: #F2F2EA;
          border-right: 1px solid #DFDFDF;
          
          ul{
            border-right: 1px solid #fff;
            height: 565px;
            overflow-y: scroll;
          }
          ul::-webkit-scrollbar {
            display: none;
          }
          .hoverName1{
            &:hover{
              background: rgb(104, 176, 216);
              color: #fff;
              border-left: 3px solid rgb(104, 176, 216);
              .listIcon{
                background-position-y: -16px;
              }
            }
          }
          .hoverName2{
            &:hover{
              background: #18B88F;
              color: #fff;
              border-left: 3px solid #18B88F;
              .listIcon{
                background-position-y: -16px;
              }
            }
          }
          .hoverName3{
            &:hover{
              background: #63666D;
              color: #fff!important;
              border-left: 3px solid #63666D !important;
              .listIcon{
                background-position-y: -16px;
              }
            }
          }
          .hoverName4{
            &:hover{
              background: #C1172E;
              color: #fff!important;
              border-left: 3px solid #C1172E !important;
              .listIcon{
                background-position-y: -16px;
              }
            }
          }
          .hoverName5{
            &:hover{
              background: #7265B9;
              color: #fff!important;
              border-left: 3px solid #7265B9 !important;
              .listIcon{
                background-position-y: -16px;
              }
            }
          }
          .hoverName6{
            &:hover{
              background: #927340;
              color: #fff!important;
              border-left: 3px solid #927340 !important;
              .listIcon{
                background-position-y: -16px;
              }
            }
          }
          .hoverName7{
            &:hover{
              background: #c2a775;
              color: #fff!important;
              border-left: 3px solid #c2a775 !important;
              .listIcon{
                background-position-y: -16px;
              }
            }
          }
          li{
            // border-bottom: 1px solid #fff;
            // border-bottom: 1px solid #DFDFDF;
            margin: 0!important;
            padding: 0;
            display: list-item;
            text-align: -webkit-match-parent;
            position: relative;
            // &:first-child{
            //   border-top: none;
            // }
            .listIcon{
              display: inline-block;
              height: 16px;
              width: 16px;
              position: relative;
              top: 3px;
              left: -9px;
              background: url('/static/public/image/list_icon.png') no-repeat;
            }
            a{
              width: 100%;
              display: inline-block;
              height: 48px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              padding-left: 20px;
              line-height: 48px;
              border-left: 3px solid rgb(176, 214, 235);
              color: #666;
              cursor: pointer;
              font-size: 15px;
              font-family: 'STHeiti', "microsoft yahei", '微软雅黑', 'simsun', '宋体', 'arial'!important;
            }
          }
          li::after{
            display: block;
            height: 2px;
            content: "";
            width: 100%;
            background-color: #DFDFDF;
            border-top: 1px solid #FFF;
            position: absolute;
            bottom: 0;
          }
        }
        
      }
      .contentBox{
          width: 780px;
          padding: 15px;
          background: #f8f8f8;
          box-sizing: content-box;
          word-wrap:break-word; 
          word-break:break-all; 
          overflow: hidden;
          // border-top: 1px solid #fff;
          ul{
            width: 760px;
            height: 505px;
            overflow-y: auto;
            li{
              width: 100%;
              p{
                line-height: 35px;
                font-weight: bold;
                // text-indent: 2em;
              }
            }
          }
          .picTitle{
            width: 100%;
            background: none;
            font-size: 18px;
            font-family: 'STHeiti', "microsoft yahei", '微软雅黑', 'simsun', '宋体', 'arial'!important;
            margin-bottom: 20px;
            font-weight: bold;
            color: #78BADC;
            border: none;
            i{
              display: inline-block;
            }
          }
        }
    }
  }
}
  .test1Active{
    background: rgb(104, 176, 216);
    color: #fff!important;
    border-left: 3px solid rgb(104, 176, 216) !important;
    .listIcon{
      background-position-y: -16px!important;
    }
  }
  .betActive{
    background: #18B88F;
    color: #fff!important;
    border-left: 3px solid #18B88F !important;
    .listIcon{
      background-position-y: -16px!important;
    }
  }
  .darkActive{
    background: #63666D;
    color: #fff!important;
    border-left: 3px solid #63666D !important;
    .listIcon{
      background-position-y: -16px!important;
    }
  }
  .redActive{
    background: #C1172E;
    color: #fff!important;
    border-left: 3px solid #C1172E !important;
    .listIcon{
      background-position-y: -16px!important;
    }
  }
  .goldActive{
    background:#927340;
    color: #fff!important;
    border-left: 3px solid  #927340 !important;
    .listIcon{
      background-position-y: -16px!important;
    }
  }
  .purpleActive{
    background: #7265B9;
    color: #fff!important;
    border-left: 3px solid #7265B9 !important;
    .listIcon{
      background-position-y: -16px!important;
    }
  }
  .amhgActive{
    background: #c2a775;
    color: #fff!important;
    border-left: 3px solid #c2a775 !important;
    .listIcon{
      background-position-y: -16px!important;
    }
  }
</style>