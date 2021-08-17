<template>
    <div class="container">
        <div class="body">
            <!-- <h2>关于我们</h2> -->
            <div class="content" v-html="articleData">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articleData: ''
        };
    },
    methods: {
        async getArticle(title) {
            let res = await this.$http.post(`${this.$HOST_NAME}/site/newNotice`, {
                type: 'article',
                client_type: 'PC',
                title
            });
            let articleData = '';
            if (res && res.code == 200) {
                // 请求成功
                // 存入本地存储，在对应的页面获取数据即可
                if (res.data.data) {
                    // 存在返回值为空的情况
                    // articleData=JSON.stringify(res.data.data[0].description);
                    // localStorage.setItem("articleData",articleData);
                    this.articleData = res.data.data[0].description;
                }
            }
        }
    },
    mounted() {
        // this.getArticle()
    },
    created() {
        this.getArticle('关于我们');
    }
};
</script>

<style type="text/less" lang="less" scoped>
.container {
    background: url(/static/hty/img/aboutbg.jpg) no-repeat center center;
    .body {
        width: 100%;
        padding: 10px 20px 20px;
        box-sizing: border-box;
        background-color: #1b1b1b;
        letter-spacing: 0.1rem;

        h2 {
            font-size: 32px;
            color: black;
        }

        .content {
            line-height: 24px;

            strong {
                font-weight: 700;
                line-height: 1.5;
            }
        }
    }
}
</style>
