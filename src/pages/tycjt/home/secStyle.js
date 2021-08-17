const minxin={
    data(){
      return{
        themes: {
            name: "tycjt", //网站名
            allbgStyle: {
              //背景色和阴影
              background: "#151010",
              boxShadow: "0 1px 4px 0 rgba(27,5,4,0.7)"
            },
            oneStyle: {
              //一级导航li样式
              background: "transparent",
              color: "#fff"
            },
            oneCheckedStyle: {
              //一级导航li选中样式
              background: "linear-gradient(135deg,#cb9b35,#e9d89c)",
              color: "#fff"
            },
            inputStyle: {
              //搜索框样式
              background: "transparent",
              border: "1px solid #68656580",
              color: "#BABABA"
            },
            twoStyle: {
              //平台导航样式
              color: "#696969"
            },
            twoCheckedStyle: {
              //选中平台导航样式
              color: "#ffda82"
            },
            borderStyle: "1px dashed #e35050;", //平台导航线条样式
            borderColor: "1px solid #2b2b2b", //游戏类型导航样式
            fourCheckedStyle: {
              //游戏类型导航选中样式
              background: "#cb9b35",
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
              background: "#262626",
              boxShadow: "0 1px 4px 2px #68656580"
            },
            btnColor: {
              //开始游戏样式
              background: "#cb9b35",
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
              color: "#ffb359"
            },
            clientWidth:'1200',
          },
      } 
    }
}
export default minxin;