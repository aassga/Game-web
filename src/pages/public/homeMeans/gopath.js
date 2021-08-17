import data from '../games/public.js'

const mixin = {
  data: function () {
    return {
      navChecked:0,
      gameIndex:0,
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    //跳转登录界面
    goto(item) {
        let routerId = item.router.split("/")[3];
        if (localStorage.token) {
          this.$store.dispatch('lottery/getStopLotteryCheck',routerId).then(res=>{
            if(res&&res.length >0 ){
              this.$store.commit('alert/showTipModel', {
                bool: true,
                title: res.replace(/，/g,'</br>'),
                model: 'warn',
                type:'closeMaret',
             });
            }else{
              var newitem = item.router.split("#")[1];
              this.$router.push({
                path: newitem
              });
            }
          })
        } else {
          this.dNotify("请先登录", "error");
       } 
    },
    // 路由跳转
    goTopath(path){
      
      //  if(path === '/plays/tradition/2' || path === '/plays/tradition/4'
      //     || path === '/plays/tradition/5' || path === '/plays/tradition/7' 
      //     || path === '/plays/tradition/9' || path === '/plays/tradition/10'){
      //     this.dNotify("国庆期间暂停销售，预计恢复时间10月8日", "error");
      //     return false;
      //  }

      let pathId = path.path.split("/")[3];

      if (localStorage.token) {
        this.$store.dispatch('lottery/getStopLotteryCheck',pathId).then(res=>{
          if(res&&res.length >0 ){
            this.$store.commit('alert/showTipModel', {
              bool: true,
              title: res.replace(/，/g,'</br>'),
              model: 'warn',
              type:'closeMaret',
           });
          }else{
            window.open(`#${path.path}`)
            return false;
          }
        })
       } else {
          this.dNotify("请先登录", "error");
       }            
    },
    // 彩票id跳转
    goToid(id){
      
      if (localStorage.token) {
        this.$store.dispatch('lottery/getStopLotteryCheck',id).then(res=>{
          if(res&&res.length >0 ){
            this.$store.commit('alert/showTipModel', {
              bool: true,
              title: res.replace(/，/g,'</br>'),
              model: 'warn',
              type:'closeMaret',
           });
          }else{
            window.open(`#/plays/tradition/${id}`);
            return false;
          } 
        })
      } else {
        this.dNotify("请先登录", "error");
      }            
    },
    // 进入第三方游戏和路由跳转
    // 二级导航用这个方法 进行跳转
    goComputer(item){
      if(item.id)   this.getItemId(item)
      if(item.path) this.goTopath(item)
    },
    //一级导航跳转
    toggleNav (link) {
      if (link == 'service') {
        this.openKefu()       
        return false
      }
      if (link == '/plays/hall') {
        window.open('#/plays/hall')
        return false
      }
      if(link == '/home/qipai'){
        this.$router.push({
          path:"/home/qipai",
          query: {
              id: 0
          }
        })
        return false;
      }
      this.$router.push(link)
    },
    //路由跳转 不加token判断
    goPath(path){
        this.$router.push(path)
    },
    goLink(item,i) {
      this.gameIndex = i;
      this.navChecked =i;
      localStorage.setItem("navIndex",i)
      if (item.link) {
        if (item.link == "service") {
          let service = JSON.parse(localStorage.config).service;
          if (service) {
            let ser = service.find(item => item.status === 'on')
            if (ser) {
              window.open(ser.url);
            }
          }
        } else if (item.link == "/plays/hall") {
            window.open("#/plays/hall");
            return false;
        }else if(item.link == '/home/qipai'){
          
          
          this.$router.push({
            path:"/home/qipai",
            query: {
                id: 0
            }
          })
          return false;
        }
        else {
          this.gameIndex = i;
          this.$router.push(item.link);
        }
      } else if (item.gameName) {
        this.trustLogin(item);
      }
    }, 
  },
};

export default mixin;
