<template>
    <div class="body">
        <div class="content" v-html="articleData"></div>
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
    mounted() {},
    created() {
        this.getArticle('取款帮助');
    }
};
</script>

<style type="text/less" lang="less" scoped>
.body {
    width: 100%;
    padding: 25px 20px 20px 20px;
    box-sizing: border-box;
    background-color: #1b1b1b;
    letter-spacing: 0.1rem;

    h2 {
        font-size: 32px;
        color: black;
    }

    .content {
        line-height: 24px;

        table {
            border: 1px solid #696969;

            tr {
                border-bottom: 1px solid #696969;

                &:last-child {
                    border-bottom: none;
                }

                td {
                    border-right: 1px solid #696969;

                    &:last-child {
                        border-right: none;
                    }
                }
            }
        }
    }
}
</style>
