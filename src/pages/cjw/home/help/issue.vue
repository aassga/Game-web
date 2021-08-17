<template>

  <div class="issue">

    <div class="banner"></div>


    <div class="content" v-html="articleData">

    </div>
  </div>
</template>

<script>
  export default {
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
            if(res.data.data){
              this.articleData=res.data.data[0].description
            }
          }

        },
    },
    mounted(){
    },
    created(){
        this.getArticle("常见问题")
    }
  }
</script>

<style lang="less" scoped>
  .issue {
    .banner {
      width: 100%;
      height: 200px;
      background: url("/static/test-6/img/thirdparty/cjwt.jpg") no-repeat center top;
    }

    .content {
      width: 1200px;
      margin: 30px auto;
      border: 1px solid #b48c68;
      background: #f1f1f1;
      padding: 15px;

      h2 {
        font-size: 20px;
        font-family: 微软雅黑;
        color: #000;
        margin-bottom: 5px;
      }

      p {
        font-family: 微软雅黑;
        color: #000;
        font-size: 14px;
        line-height: 20px;

        span {
          color: rgb(255, 0, 0);
          cursor: pointer;
        }
      }
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
  }
</style>
