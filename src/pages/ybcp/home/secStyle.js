const minxin={
    data(){
      return{
        themes: {
            name: "ybcp", //网站名
            allbgStyle: {
              //背景色和阴影
              background: "#fff",
              boxShadow: "0 1px 4px 0 #d0bfbfb3"
            },
            oneStyle: {
              //一级导航li样式
              background: "transparent",
              color: "#000"
            },
            oneCheckedStyle: {
              //一级导航li选中样式
              background: "linear-gradient(23deg,#fd9080,#f71b2c)",
              color: "#fff"
            },
            inputStyle: {
              //搜索框样式
              background: "transparent",
              border: "1px solid rgb(239, 239, 239)",
              color: "#BABABA"
            },
            twoStyle: {
              //平台导航样式
              color: "#696969"
            },
            twoCheckedStyle: {
              //选中平台导航样式
              color: "#000"
            },
            borderStyle: "1px dashed #e35050;", //平台导航线条样式
            borderColor: "1px solid rgb(239, 239, 239)", //游戏类型导航样式
            fourCheckedStyle: {
              //游戏类型导航选中样式
              background: "linear-gradient(23deg,#fd9080,#f71b2c)",
              borderRadius: "4px",
              color: "#ffffff"
            },
            fourStyle: {
              //游戏类型导航未选中样式
              background: "transparent",
              color: "#000"
            },
            liStyle: {
              //展示列中li的样式
              background: "#fff",
              boxShadow: "0 1px 4px 2px rgba(48, 48, 49, 0.11)"
            },
            btnColor: {
              //开始游戏样式
              background: "#f71b2c",
              color: "#ffffff"
            },
            otherColor: {
              leftColor: "#000", //展示列中li的左边字颜色
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
              color: "#000"
            },
            clientWidth:'1200',
          },
      } 
    }
}
export default minxin;