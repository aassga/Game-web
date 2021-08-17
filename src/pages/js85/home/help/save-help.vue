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
    mounted() {},
    created() {
        this.getArticle('存款帮助');
    }
};
</script>

<style type="text/less" lang="less" scoped>
.body {
    width: 100%;
    padding: 30px 20px 20px 20px;
    box-sizing: border-box;
    background-color: #1b1b1b;
    letter-spacing: 0.1rem;

    h2 {
        font-size: 32px;
        color: black;
    }

    .tab {
        margin-top: 10px;
        height: 30px;
        line-height: 30px;
        border-bottom: 2px solid #888888;

        li {
            float: left;
            color: #e5e5e5;
            background-color: black;
            padding: 0 10px;
            margin-right: 10px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            cursor: pointer;

            &:hover,
            &.active {
                background-color: #f13131;
            }
        }
    }

    .content {
        line-height: 24px;
    }
}
</style>
