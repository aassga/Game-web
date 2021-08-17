<template>
    <div class="content" v-html="articleData">
    </div>
</template>
<script>
  export default {
    props:{
      title:{
        type:String
      }
    },
     data(){
      return {
        articleData:""
      }
    },
    methods:{

      // 2019.04.25新文章接口
      // 文章
      async getArticle(title){
        let res=await this.$http.post(`${this.$HOST_NAME}/site/newNotice`,{
          type:"article",
          client_type:"PC",
          title
        })
        let articleData="";
        if(res&&res.code==200){
          // 请求成功
          // 存入本地存储，在对应的页面获取数据即可
          if(res.data.data){
            // 存在返回值为空的情况
            this.articleData=res.data.data[0]&&res.data.data[0].description
          }
        }
      },
    },
    mounted(){
    },
    created(){
        this.getArticle(this.title)
    },
    watch:{
      $route(newVal,oldVal){
        if(newVal!=oldVal){
          this.getArticle(this.title)
        }
      }
    }

  }
</script>

<style lang="less" scoped>
  .about {
    .banner {
      width: 100%;
      height: 200px;
      text-align: center;
    //   background: url("/static/yabo/img/thirdparty/gywm.jpg") no-repeat center top;
    }

    // .content {
    //   width: 1200px;
    //   margin: 30px auto;
    //   border: 1px solid #b48c68;
    //   background: #f1f1f1;
    //   padding: 15px;

    //   h2 {
    //     font-size: 20px;
    //     font-family: 微软雅黑;
    //     color: #000;
    //     margin-bottom: 5px;
    //   }

    //   p {
    //     font-family: 微软雅黑;
    //     color: #000;
    //     font-size: 14px;
    //     line-height: 20px;
    //   }
    // }
  }
      /deep/ table {
        border-spacing: 0;
        border-collapse: collapse;
        border: 1px solid grey;

        tbody {
          display: table-row-group;
          vertical-align: middle;
          border-color: inherit;

          td {
            border: 1px solid #000;
            font-size: 14px;
            text-align: center;
            color: #000;
            line-height: 25px;
          }
        }
      }
</style>

