<template>

     <div class="page-sidebar">
          <div class="sidemenu-header"></div>
          <div class="sidemenu-body">
            <ul class="sidemenu">
              <li v-for="(t,i) in sideMemuList" :key="i" @click="goLink(t.link)"><a>{{t.name}}</a></li>
            </ul> 
          </div>
           <div class="sidemenu-footer"></div>
        </div>
</template>

<script>

export default {
  data() {
    return {
      sideMemuList:[
        {name:"棋牌游戏",link:'/home/chess?navid=9&id=10042'},
        {name:"捕鱼游戏",link:'/home/fish?navid=9&id=0'},
        {name:"老虎机",link:'/home/slot?navid=9&id=0'},
        {name:"真人视讯",link:'/home/live'},
        {name:"彩票游戏",link:'/plays/hall'},
        {name:'电竞体育',link:'/home/tiyu?id=0'},
      ],
    };
  },
  
  mounted() {},
  methods: {
    goLink(link){
       this.$router.push(link)
    }
  },
  components: {},
  created() {
  }, 
};
</script>

<style lang="less" scoped>

    
    .page-sidebar{
      float: left;
      width: 270px;
      .sidemenu-header{
            width: 206px;
        height: 43px;
        margin: 29px auto 30px;
        background: url(/static/qxcp/img/re/yx.png) 0 0 no-repeat;
      }
      .sidemenu-body{
        
            a{
                  display: block;
                  width: 244px;
                  height: 44px;
                  line-height: 43px;
                  padding: 0 58px 0 100px;
                  background: url(/static/qxcp/img/re/sidebar_icon.png) 50% 0 no-repeat;
                  color: #FFF;
                  font-size: 16px;
                  text-decoration: none;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  cursor: pointer;
                      // outline: none;
            }
        

      }
      .sidemenu-footer{
            width: 185px;
            height: 169px;
            margin: 15px auto 97px;
            background: url(/static/qxcp/img/re/sidebar_img.png)  50% 0 no-repeat;
      }
    }
   
</style>
