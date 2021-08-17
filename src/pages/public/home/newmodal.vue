<template>
 
    <div>
     <Modal
      v-model="modeldetail.bool"
      class-name="agent-transfer"
      width="500"
      :scrollable=true 
      :transition-names = transitionNames
    >
      <div slot="header" class="tishi" :style="newmodal.bgcolor">
           <span>{{newmodal.title}}</span>
           <span></span>
      </div>
      <div class="agent-con"  :class="[modeldetail.type=='closeMaret'?'tipMarket-box':'']">
          <span class="iconspan"><i class="iconfont icon-baojing"></i></span>
          <span class="tispan" v-html="modeldetail.title"></span>
      </div>
      <div slot="footer"></div>
      </Modal>
    </div>
</template>
<script>
export default {
    props:{
        newmodal:{
             type: Object,
        }
    },
    data(){
        return {
          transitionNames:['','fade']
        }
    },
    methods:{

    },
    computed: {
      modeldetail(){
        return this.$store.state.alert.newtip
      }
    },
}
</script>
<style lang="less" scoped>
@-webkit-keyframes _scaleEnter {
  0% {
    opacity:0;
    transform: translate(-50%,-50%) scale(.9);
  }
  to {
    opacity:1;
    transform: translate(-50%,-50%) scale(1);
  }
}
@keyframes _scaleEnter {
  0% {
    opacity:0;
    transform: translate(-50%,-50%) scale(.9);
  }
  to {
    opacity:1;
    transform: translate(-50%,-50%) scale(1);
  }
}

@-webkit-keyframes _scaleLeave {
  0% {
    opacity:1;
    transform: translate(-50%,-50%) scale(1);
  }
  to {
    opacity:0;
    transform: translate(-50%,-50%) scale(.9);
  }
}

@keyframes _scaleLeave {
  0% {
    opacity:1;
    transform: translate(-50%,-50%) scale(1);
  }
  to {
    opacity:0;
    transform: translate(-50%,-50%) scale(.9);
  }
}

/deep/.ivu-modal-mask {
  z-index: 2000;
}
/deep/.ivu-modal-wrap {
  z-index: 2000;
}
/deep/.ivu-modal-close {
  right: 0;
}
/deep/.ivu-modal-footer {
  border-top: none;
  display: none;
}
/deep/.ivu-modal {
  position:absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  height: 318px;
  -webkit-animation:_scaleEnter .3s ease;
  animation:_scaleEnter .3s ease;
  &.v-leave-active{
    -webkit-animation:_scaleLeave .3s ease;
    animation:_scaleLeave .3s ease;
  }
}
/deep/.ivu-modal-header {
  border-bottom: none;
  padding: 0;
}
/deep/ .ivu-modal-close .ivu-icon-ios-close-empty{
    color: #fff;
    font-size:37px;
    top: 0;
}

/deep/ .ivu-modal-body{
   padding: 51.5px 0;
}

/deep/.ivu-modal-close{
    top:0;
    right: 20px;

} 
.headerp{
   text-align: center;
   margin-top:20px; 
}
.tishi{
   height: 40px;
   line-height: 40px;
   font-size:18px;
   color:#fff;
//    background: linear-gradient(to right, #65e0f4, #4fade6);
   border-radius:6px 6px 0 0; 
   span{
     margin-left: 30px;
   }
}
.agent-con{
     text-align: center;
     vertical-align:middle;
    span:nth-child(1){
      i{
         font-size: 40px;
         color: #f90;
         margin-right:8px;
           &:before {
              position: relative;
              top: 0px;
            }
      }
    }
    .tispan{
        font-size: 17px;
        color: #1f1f1f;
        position: relative;
        top:-8px;
    }
}
.tipMarket-box{
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      display: block;
    }
    .tispan{
      top:0;
    }
    
}
</style>