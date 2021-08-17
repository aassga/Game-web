const minxin={
    data(){
      return{
        themes: {
            name: "xpj", //网站名
            allbgStyle: {
              //背景色和阴影
              background: "#0b3386",
              boxShadow: "0 1px 4px 0 rgba(0,8,28,0.6)"
            },
            oneStyle: {
              //一级导航li样式
              background: "#0b3386",
              color: "#fff"
            },
            oneCheckedStyle: {
              //一级导航li选中样式
              background: "linear-gradient(#ff5f00,#ffb459)",
              color: "#ffffff"
            },
            inputStyle: {
              //搜索框样式
              background: "rgba(25,41,85,1)",
              border: "1px solid #204ba5",
              color: "#BABABA"
            },
            twoStyle: {
              //平台导航样式
              color: "#c5c5c5"
            },
            twoCheckedStyle: {
              //选中平台导航样式
              color: "#c5c5c5"
            },
            borderStyle: "1px dashed #204ba5;", //平台导航线条样式
            borderColor: "1px solid #204ba5", //游戏类型导航样式
            fourCheckedStyle: {
              //游戏类型导航选中样式
              background: "#ff6301",
              borderRadius: "4px",
              color: "#fff"
            },
            fourStyle: {
              //游戏类型导航未选中样式
              background: "transparent",
              color: "#fff"
            },
            liStyle: {
              //展示列中li的样式
              background: "#0c2966",
              // boxShadow: "0 1px 4px 0 rgba(0,8,28,0.6)"
            },
            btnColor: {
              //开始游戏样式
              background: "#ff6301",
              color: "#fff"
            },
            otherColor: {
              leftColor: "#fff", //展示列中li的左边字颜色
              rightColor: "#FF5F00", //展示列中li的右边字颜色
              lineBgColor: "#008e64" //线数背景
            },
            platColor:{
              background:"#ff8438",
              color:"#fff"
            },
            lineColor:{
              background:"#008e64",
              color:"#fff"
            },
            Souti: {
              color: "#fff"
            },
            clientWidth:'1000',
          },
      } 
    }
}
export default minxin;