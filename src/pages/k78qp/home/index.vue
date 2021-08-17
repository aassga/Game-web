<template>
  <div class="new-index klk-home">
    <div class="content_bg">
        <div class="content">
            <quick-game></quick-game>
            <win-list></win-list>
            <div class="slideTop1 slideTop">
              <game-list></game-list>
            </div>
            
        </div>
    </div>
  </div>
</template>

<script>
  import quickGame from "./index/quickGame";
  import winList from "./index/winList";
  import gameList from "./index/gameList";
  export default {
    data () {
      return {
        
      }
    },
    methods: {
    },
    created(){
      if(localStorage.register){
        this.$router.push('/home/register');
        localStorage.removeItem('register')
      }
    },
    components: {
        quickGame,
        winList,
        gameList
    },
  }
</script>

<style lang="less">

.keyFrames3(@name,@value,@value1){
  @keyframes @name {
    0%{
      top:@value;opacity: 0;
    } 
    50%{
      top:@value;opacity:0;
    }
    100%{
      top:@value1;opacity:1;
    }
  }
}
.animationName(@name,@time){
  animation-delay:2s;
  animation: @name 0.5s @time 1;
  animation-timing-function: ease;
  animation-direction: normal;
  animation-fill-mode:forwards;
}
.content_bg{
  background: url(/static/k78qp/img/index-main-bg-1.jpg) no-repeat top;
  margin-top: -20px;
  background-size: 100% 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}
.slideTop1{
  position: relative;
  top: 2000px;
  &.slideTop{.animationName(slideTop,1s)}
  .keyFrames3(slideTop,2000px,0);
}

  
</style>
