<template>
    <div class="picBox" :style="{height: picBox+'px',background:'url(' + headerImg + ') center top/ cover no-repeat',backgroundColor:BGC}"></div>
</template>
<script>
export default {
    props: {
        headerImg: {
            type: String
        },
        BGC:{
            type: String
        },
        picBox:{
            type: Number,
            default: () => {
                return 300;
            }
        }
    },
    data() {
        return {
            clientwidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        };
    },
    created() {
        if (this.clientwidth > 1920) {
            this.picBox = this.picBox * (this.clientwidth / 1920);
        }
    }
};
</script>
<style lang="less" scoped>
.picBox {
    width: 100%;
    margin: 0 auto;
}
</style>