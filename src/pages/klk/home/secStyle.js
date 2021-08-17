const minxin={
    data(){
      return{
        themes: {
            name: "klk", //网站名
            allbgStyle: {
              //背景色和阴影
              background: "#fff",
              boxShadow: "0 1px 4px 0 rgba(28,26,123,.11)"
            },
            oneStyle: {
              //一级导航li样式
              background: "transparent",
              color: "#000"
            },
            oneCheckedStyle: {
              //一级导航li选中样式
              background: "linear-gradient(#ffb55a,#ff5f00)",
              color: "#ffffff"
            },
            inputStyle: {
              //搜索框样式
              background: "#FFF",
              border: "1px solid #dcdcdc",
              color: "#000"
            },
            twoStyle: {
              //平台导航样式
              color: "#696969"
            },
            twoCheckedStyle: {
              //选中平台导航样式
              color: "#eb410a"
            },
            borderStyle: "1px dashed #eee;", //平台导航线条样式
            borderColor: "1px solid #fdefef", //游戏类型导航样式
            fourCheckedStyle: {
              //游戏类型导航选中样式
              background: "linear-gradient(#ffb55a,#ff5f00)",
              borderRadius: "4px",
              color: "#ffffff"
            },
            fourStyle: {
              //游戏类型导航未选中样式
              background: "transparent",
              color: "#5b6168"
            },
            liStyle: {
              //展示列中li的样式
              background: "#FFF",
              boxShadow: "0 1px 4px 2px hsla(0,0%,93%,.5)"
            },
            btnColor: {
              //开始游戏样式
              background: "#ff0",
              color: "#000000"
            },
            otherColor: {
              leftColor: "#0f1724", //展示列中li的左边字颜色
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
              color: "#ffb359"
            },
            clientWidth:'1200',
          },
      } 
    }
}
export default minxin;