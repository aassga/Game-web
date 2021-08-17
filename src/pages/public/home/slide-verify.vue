<template>
    <div class="slide-verify" id="slideVerify" onselectstart="return false;">
        <canvas :width="w" :height="h" ref="canvas"></canvas>
        <div v-if="show" @click="refresh" class="slide-verify-refresh-icon"></div>
        <canvas :width="110" :height="h" ref="block"  class="slide-verify-block"></canvas>
        <!-- <img :width="110" :height="h" ref="block" :src="imgPath.img2" class="slide-verify-block"/> -->
        <div v-if="imgStatus" class="default">
            <!-- <img src="/static/public/image/paycheck/default.png" alt="" > -->
              <Spin fix style="color:#bbb">
                <!-- <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon> -->
                <img src="/static/public/image/paycheck/loading.gif" width="74px">
                <!-- <div style="color:#666;font-size:26">加载中</div> -->
              </Spin>
        </div>
        <!-- container -->
        <div class="slide-verify-slider" :class="{'container-active': containerActive, 'container-success': containerSuccess, 'container-fail': containerFail}">
            <div class="slide-verify-slider-mask" :style="{width: sliderMaskWidth}">
                <!-- slider -->
                <div @mousedown="sliderDown"
                    @touchstart="touchStartEvent"
                    @touchmove="touchMoveEvent"
                    @touchend="touchEndEvent"
                    class="slide-verify-slider-mask-item"
                    :style="{left: sliderLeft}">
                    <div class="slide-verify-slider-mask-item-icon"></div>
                </div>
            </div>
            <!-- <span class="slide-verify-slider-text">{{sliderText}}</span> -->
        </div>
    </div>
</template>
<script>
    import { postS, getS } from '@/service/public/service.js';
    const PI = Math.PI;

    function sum(x, y) {
        return x + y
    }

    function square(x) {
        return x * x
    }
    export default {
        name: 'SlideVerify',
        props: {
            // block length
            l: {
                type: Number,
                default: 42,
            },
            // block radius
            r: {
                type: Number,
                default: 10,
            },
            // canvas width
            w: {
                type: Number,
                default: 620,
            },
            // canvas height
            h: {
                type: Number,
                default: 310,
            },
            sliderText: {
                type: String,
                default: '向右拖动滑块填充拼图',
            },
            accuracy: {
              type: Number,
              default: 5, // 若为 -1 则不进行机器判断
            },
            show: {
              type: Boolean,
              default: true,
            },
            imgs: {
              type: Array,
              default: () => [],
            },
        },
        data() {
            return {
                containerActive: false, // container active class
                containerSuccess: false, // container success class
                containerFail: false, // container fail class
                canvasCtx: null,
                blockCtx: null,
                block: null,
                block_x: undefined, // container random position
                block_y: undefined,
                L: this.l + this.r * 2 + 3, // block real lenght
                img: undefined,
                originX: undefined,
                originY: undefined,
                isMouseDown: false,
                trail: [],
                sliderLeft: 0, // block right offset
                sliderMaskWidth: 0, // mask width
                imgPath:"",
                blockW:110,
                blockH:110,
                imgStatus:true,
            }
        },
        created() {
        },
        mounted() {
            this.getImg()
            this.init()
        },
        methods: {
            async getImg(){
               let res = await getS(`getTCode`,{userName:this.$store.state.home.safeName});
               if(res.code==200){
                   this.imgStatus=false
                   this.imgPath = res.data
                   this.draw_Img()
               }
            },
            async draw_Img(){
                  await this.initImg("bg")
                  await this.initImg("block")
            },
            init() {
                this.initDom()
                this.bindEvents()
            },
            initDom() {
                this.block = this.$refs.block;
                this.canvasCtx = this.$refs.canvas.getContext('2d')
                this.blockCtx = this.block.getContext('2d')
            },
             initImg(type) {
                const img = this.createImg(() => {
                    if(type=='bg') this.canvasCtx.drawImage(img, 0, 0, this.w, this.h, 0, 0, this.w, this.h)
                    else  this.blockCtx.drawImage(img,0,0,this.blockW, this.h,0,0,this.blockW, this.h)
                },type);
                this.img = img;
            },
            createImg(onload,type) {
                const img = document.createElement('img');
                img.crossOrigin = "Anonymous";
                img.onload = onload;
                img.onerror = () => {
                     this.getImg()
                }
                if(type=='bg')  img.src =  this.imgPath.img1
                else img.src =  this.imgPath.img2
                return img;
            },
            refresh() {
                this.reset()
                this.$emit('refresh')
            },
            sliderDown(event) {
                this.originX = event.clientX;
                this.originY = event.clientY;
                this.isMouseDown = true;
            },
            touchStartEvent(e) {
                this.originX = e.changedTouches[0].pageX;
                this.originY = e.changedTouches[0].pageY;
                this.isMouseDown = true;
            },
            bindEvents() {
                document.addEventListener('mousemove', (e) => {
                    if (!this.isMouseDown) return false;
                    const moveX = e.clientX - this.originX;
                    const moveY = e.clientY - this.originY;
                    if (moveX < 0 || moveX + 125 >= this.w) return false;
                    this.sliderLeft = moveX + 'px';
                    let blockLeft = (this.w - 143) / (this.w - 164) * moveX;
                    this.block.style.left = blockLeft + 'px';
                    this.containerActive = true; // add active
                    this.sliderMaskWidth = moveX+20 + 'px';
                    this.trail.push(moveY);
                });
                document.addEventListener('mouseup', (e) => {
                    if (!this.isMouseDown) return false
                    this.isMouseDown = false
                    if (e.clientX === this.originX) return false;
                    this.containerActive = false; // remove active
                     let spliced = this.verify();
                        if(spliced){
                            let data={
                                tnCode: spliced,
                                userName: this.$store.state.home.safeName
                            }
                            postS(`checkTCode`,data).then(res=>{
                                if (res.code === 200) {
                                    this.containerSuccess = true;
                                     setTimeout(()=>{
                                        this.$store.commit('home/safeStatus', false)
                                        if(this.$store.state.home.isLoginorRegister=='login'){
                                            this.$store.commit('home/safeLogin', 'login')
                                        }else if(this.$store.state.home.isLoginorRegister=='register'){
                                            this.$store.commit('home/safeLogin', 'register')
                                        }
                                    },1000)
                                    this.$emit("success");
                                    return;
                                } else {
                                    this.containerFail = true;
                                    this.$emit("fail");
                                    setTimeout(() => {
                                    this.reset();
                                    }, 1000);
                                }
                            })
                        }
                })
            },
            touchMoveEvent(e) {
                if (!this.isMouseDown) return false;
                const moveX = e.changedTouches[0].pageX - this.originX;
                const moveY = e.changedTouches[0].pageY - this.originY;
                if (moveX < 0 || moveX + 164 >= this.w) return false;
                this.sliderLeft = moveX + 'px';
                let blockLeft = (this.w - 164 - 24) / (this.w - 164) * moveX;
                this.block.style.left = blockLeft + 'px';

                this.containerActive = true;
                this.sliderMaskWidth = moveX+20 + 'px';
                this.trail.push(moveY);
            },
            touchEndEvent(e) {
                if (!this.isMouseDown) return false
                this.isMouseDown = false
                if (e.changedTouches[0].pageX === this.originX) return false;
                this.containerActive = false;
                
                let spliced = this.verify();
                if(spliced){
                    let data={
                        tnCode: spliced,
                        userName: this.$store.state.home.safeName
                    }
                    postS(`checkTCode`,data).then(res=>{
                        if (res.code === 200) {
                            this.containerSuccess = true;
                            this.$store.commit('home/safeStatus', false)
                            this.$emit("success");
                            return;
                        } else {
                            this.containerFail = true;
                            this.$emit("fail");
                            setTimeout(() => {
                            this.reset();
                            }, 1000);
                        }
                    })
                }
            },
            verify() {
                const arr = this.trail // drag y move distance
                const average = arr.reduce(sum) / arr.length // average
                const deviations = arr.map(x => x - average) // deviation array
                const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length) // standard deviation
                const left = parseInt(this.block.style.left)
                return left;
            },
            reset() {
                this.containerActive = false;
                this.containerSuccess = false;
                this.containerFail = false;
                this.sliderLeft = 0;
                this.block.style.left = 0;
                this.sliderMaskWidth = 0;
                let {
                    w,
                    h
                } = this;
                this.canvasCtx.clearRect(0, 0, w, h)
                this.blockCtx.clearRect(0, 0, 110, h)
                // this.block.width = w
                this.imgPath={}
                this.imgStatus=true
                this.getImg()
                // this.img.src = this.getRandomImg();
                this.$emit('fulfilled')
            },
        }
    }
</script>
<style scoped  lang="less">
    /deep/ .ivu-spin-fix{
       background-color: transparent;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .slide-verify {
        position: relative;
        width: 620px;
        left: 31px;
        top: 30px;
    }

    .slide-verify-block {
        position: absolute;
        left: 0;
        top: 0;
    }

    .slide-verify-refresh-icon {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 38px;
        height: 38px;
        cursor: pointer;
        background: url('/static/public/image/paycheck/refresh.png') no-repeat;
        background-size: 38px 38px;
        cursor: pointer;
        z-index: 3000;
    }
    .default{
        width: 620px;
        height: 310px;
        position: absolute;
        left: 0;
        top:0;
        background:url('/static/public/image/paycheck/default.png') no-repeat;
        background-size:100% 100%;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
  

    .slide-verify-slider {
        position: relative;
        text-align: center;
        width: 620px;
        height: 30px;
        line-height: 30px;
        margin-top: 70px;
        background: #E9E9E9;
        color: #45494c;
        border-radius: 15px;
        border: 1px solid #E6E6E6
    }

    .slide-verify-slider-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 164px;
        height: 30px;
        /* border: 0 solid #1991FA; */
        background: #d1e4ff;
        border-radius: 15px;
    }

    .slide-verify-slider-mask-item {
        position: absolute;
        top: -40px;
        left: 0;
        cursor: pointer;
        border-radius: 15px;
        transition: background .2s linear
    }
    .slide-verify-slider-mask-item-icon {
        position: absolute;
        top: 0px;
        left: -18px;
        width: 164px;
        height: 106px;
        background: url("/static/public/image/paycheck/default1.png");
    }
    .container-active .slide-verify-slider-mask-item {
        height: 30px;
        top: -40px;
    }

    .container-active .slide-verify-slider-mask {
        height: 30px;
        border-width: 1px;
    }

    .container-success .slide-verify-slider-mask-item {
        height: 30px;
        top: -40px;
        border-radius: 15px;
        background-color: #55d3b4 !important;
    }
    .container-success .slide-verify-slider-mask {
        height: 30px;
        top: 0px;
        border-radius: 0px;
        border-radius: 15px;
        background-color: #D2F7EF !important;
    }
    .container-success .slide-verify-slider-mask-item-icon {
        background: url("/static/public/image/paycheck/sucess.png") !important;
    }

    .container-fail .slide-verify-slider-mask-item {
        height: 30px;
        top: -40px;
        border-radius: 15px;
        background-color: #000000 !important;
    }
    
    .container-fail .slide-verify-slider-mask {
        height: 30px;
        border-radius: 0px;
        border-radius: 15px;
        background-color: #F7CACA;
     }
    
    .slide-verify-slider-text{
        font-size: 28px;
    }
    .container-fail .slide-verify-slider-mask-item-icon {
         background: url("/static/public/image/paycheck/fail1.png") !important;
    }
    .container-success .slide-verify-slider-text{
        height: 30px;
        background-color: #55d3b4;
    }
    .container-fail .slide-verify-slider-text{
        height: 30px;
        background-color: #ed7676;
    }
</style>
