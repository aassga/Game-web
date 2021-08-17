const minxin={
  data(){
    return{
      themes: {
          name: "tccp", //网站名
          allbgStyle: {
            //背景色和阴影
            background: "#251C47",
            boxShadow: "0 1px 4px 0 #00081C"
          },
          oneStyle: {
            //一级导航li样式
            background: "transparent",
            color: "#fff"
          },
          oneCheckedStyle: {
            //一级导航li选中样式
            background: "linear-gradient(0deg, #C000BB, #E65BE3)",
            color: "#ffffff"
          },
          inputStyle: {
            //搜索框样式
            background: "#1B152C",
            border: "1px solid #45377a",
            color: "#fff"
          },
          twoStyle: {
            //平台导航样式
            color: "#696969"
          },
          twoCheckedStyle: {
            //选中平台导航样式
            color: "#FFC857"
          },
          borderStyle: "1px dashed #e35050;", //平台导航线条样式
            borderColor: "1px solid #45377a", //游戏类型导航样式
            fourCheckedStyle: {
              //游戏类型导航选中样式
              background: "linear-gradient(0deg, #C000BB, #E65BE3)",
              borderRadius: "4px",
              color: "#ffffff"
            },
            fourStyle: {
              //游戏类型导航未选中样式
              background: "transparent",
              color: "#ffffff"
            },
            liStyle: {
              //展示列中li的样式
              background: "#251C47",
              boxShadow: "0 1px 4px 2px #00081C"
            },
            btnColor: {
              //开始游戏样式
              background: "linear-gradient(0deg, #C000BB, #E65BE3)",
              color: "#ffffff"
            },
            otherColor: {
              leftColor: "#ffffff", //展示列中li的左边字颜色
              rightColor: "#FF5F00", //展示列中li的右边字颜色
              lineBgColor: "#008e64" //线数背景
            },
            platColor:{
              background:"linear-gradient(0deg, #C000BB, #E65BE3)",
              color:"#fff"
            },
            lineColor:{
              background:"#008e64",
              color:"#fff"
            },
            Souti: {
              color: "#fff"
            },
            clientWidth:'1200',
        },
    } 
  }
}
export default minxin;