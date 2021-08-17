
const mixin = {
    data: function() {
        return {
             
        };
    },
    created() {
         
    },
    mounted () {
    },
    methods: {
          addWindow (num) { //双副对联模式
            window.addEventListener('scroll', this.scrollFunc(num))
          },
          addWindow1 (num) { //单幅对联模式 
            window.addEventListener('scroll', this.scrollFunc1(num))
          },
          scrollFunc (num) { //双副对联模式
            var nodeitem = document.getElementsByClassName('TplFloatPic_1')[0]
            var nodeitem1 = document.getElementsByClassName('TplFloatPic_1')[1]
            window.onscroll = function(){
              var t = document.documentElement.scrollTop||document.body.scrollTop;
              if(t>0){
                nodeitem.style.top = t +num + 'px'
                nodeitem1.style.top = t + num + 'px'
              }
            }
          },
          scrollFunc1 (num) { //单幅对联模式
            var nodeitem = document.getElementsByClassName('TplFloatPic_1')[0]
            window.onscroll = function(){
              var t = document.documentElement.scrollTop||document.body.scrollTop;
              if(t>0){
                nodeitem.style.top = t +num + 'px'
              }
            }
          },
          openKefu () {
            let service = JSON.parse(localStorage.config).service;
            if (service) {
              let ser = service.find(item => item.status === 'on')
              if (ser) {
                window.open(ser.url);
              }
            }
          },
          // 一键置顶
          goTop () {
            let curr_top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            let time_id = setInterval(()=>{
                    curr_top -= 40;
                    document.documentElement.scrollTop = curr_top;
                    document.body.scrollTop = curr_top;  
                    if(curr_top <= 0){
                        clearInterval(time_id);
                    }
                } , 10);
          }, 
          goUserCen (name,num) {
            //name的类型有 ：  recharge （充值）  personage （个人资料）
            //withdraw （提现）  agency  （代理） message （消息）  discounts （优惠）
            if(!localStorage.token||!localStorage.userinfo){
              this.$store.commit('alert/showTipModel', {
                bool: true,
                title: '您还没有登录,请先登录',
                model: 'warn'
              })
            }else{
              this.$store.commit('showPersonal', {bool: true})
              this.$store.commit('showContent', {parent: name})
              this.$store.commit('showNav', {child: num})
            }
          },
          openWindow(url){
              window.open(url);
          },
          forget() {
            this.$store.commit("alert/showTipModel", {
              bool: true,
              title: "忘记帐号，请联系在线客服人员取回！",
              model: "warn"
            });
          },
          addFavorite(title) {
            var url = "http://" + location.hostname + "/";
            try {
              window.external.addFavorite(url, title);
            } catch (e) {
              try {
                window.sidebar.addPanel(title, url, "");
              } catch (e) {
                this.$store.commit("alert/showTipModel", {
                  bool: true,
                  title:
                    "抱歉，您所使用的浏览器无法完成此操作。\n加入收藏失败，电脑请使用Ctrl+D进行添加",
                  model: "warn"
                });
              }
            }
          },
    },
};

export default mixin;