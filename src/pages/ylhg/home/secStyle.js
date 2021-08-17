const minxin={
    data(){
      return{
        themes: {
            name: "ylhg", //网站名
            allbgStyle: {
              //背景色和阴影
              background: "#383838",
              boxShadow: "0 1px 4px 0 transparent"
            },
            oneStyle: {
              //一级导航li样式
              background: "transparent",
              color: "#fff"
            },
            oneCheckedStyle: {
              //一级导航li选中样式
              background: "linear-gradient(135deg,#faf762,#c19b38)",
              color: "#ffffff"
            },
            inputStyle: {
              //搜索框样式
              background: "transparent",
              border: "1px solid #4c4b4e",
              color: "#8f8f8f"
            },
            twoStyle: {
              //平台导航样式
              color: "#c5c5c5"
            },
            twoCheckedStyle: {
              //选中平台导航样式
              color: "#c5c5c5"
            },
            borderStyle: "1px dashed #e35050;", //平台导航线条样式
            borderColor: "1px solid #4c4b4e", //游戏类型导航样式
            fourCheckedStyle: {
              //游戏类型导航选中样式
              background: "#ffd100",
              borderRadius: "4px",
              color: "#000"
            },
            fourStyle: {
              //游戏类型导航未选中样式
              background: "transparent",
              color: "#fff"
            },
            liStyle: {
              //展示列中li的样式
              background: "#272727",
              boxShadow: "0 1px 4px 0 transparent"
            },
            btnColor: {
              //开始游戏样式
              background: "#ffd100",
              color: "#000"
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
            clientWidth:'1200',
          },
      } 
    }
}
export default minxin;