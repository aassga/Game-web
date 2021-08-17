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
                if (res.data.data) {
                    this.articleData = res.data.data[0].description;
                }
            }
        }
    },
    mounted() {
    },
    created() {
        this.getArticle('联系我们');
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
    }
}
</style>
