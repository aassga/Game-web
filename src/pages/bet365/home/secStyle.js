const minxin={
    data(){
      return{
        themes: {
            name: "bet365", //网站名
            allbgStyle: {
              //背景色和阴影
              background: "#383838",
              boxShadow: "0 1px 4px 0 rgba(16,16,16,0.5)"
            },
            oneStyle: {
              //一级导航li样式
              background: "#383838",
              color: "#fff"
            },
            oneCheckedStyle: {
              //一级导航li选中样式
              background: "linear-gradient(#24c098,#058a67)",
              color: "#ffffff"
            },
            inputStyle: {
              //搜索框样式
              background: "#5f5f5f",
              border: "1px solid #696969",
              color: "#c1c1c1"
            },
            twoStyle: {
              //平台导航样式
              color: "#696969"
            },
            twoCheckedStyle: {
              //选中平台导航样式
              color: "#fff"
            },
            borderStyle: "1px dashed #484848", //平台导航线条样式
            borderColor: "1px solid #484848", //游戏类型导航样式
            fourCheckedStyle: {
              //游戏类型导航选中样式
              background: "linear-gradient(#24c098,#058a67)",
              borderRadius: "4px",
              color: "#ffffff"
            },
            fourStyle: {
              //游戏类型导航未选中样式
              background: "transparent",
              color: "#999"
            },
            liStyle: {
              //展示列中li的样式
              background: "#383838",
              boxShadow: "rgba(16, 16, 16, 0.5) 0px 1px 4px 2px",
            },
            btnColor: {
              //开始游戏样式
              background: "#00966f",
              color: "#ffffff"
            },
            otherColor: {
              leftColor: "#ffffff", //展示列中li的左边字颜色
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