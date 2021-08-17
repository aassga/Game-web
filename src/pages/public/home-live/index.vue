<template>
  <div class="live">
    <div class="banner-cpyx">
      <div class="wrapper">
      </div>
    </div>
    <div id="main">
      <span id="prev"></span>
      <span id="next"></span>
      <div id="box">
        <ul id="slider">
          <li :key="index" v-for="(item,index) in liveDatas" href="javascript:void(0)" @click="getItemId(item)">
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
    <ul class="home-list-wrap">
      <li :key="index" v-for="(item,index) in liveDatas" href="javascript:void(0)"
          :class="[item.class,'home-list-item']" @click="getItemId(item)">
      </li>
      <li class="more home-list-item"></li>
    </ul>
    <form class="home-list-form" name="agform" ref="formDatas" method="post" target="_blank">
      <input v-model="params" name="params" type="text" value="">
      <input v-model="key" name="key" type="text" value="">
      <input type="submit" value="提交">
    </form>
  </div>
</template>

<script>
  import { _SetGet, _SetPost } from '@/service/public/service.js'
  import mixin from '../games/public.js'

  export default {
    mixins: [mixin],
    data () {
      return {
        params: '',
        key: '',
        liveDatas: [
          {name: 'AG视讯厅', platform: 'live_casino', id: '31', class: 'ag'},
          {name: 'BBIN视讯厅', platform: 'live_casino', id: '32', class: 'bb'},
          {name: 'BG视讯厅', platform: 'live_casino', id: '3180', class: 'bg'},
          {name: 'DG视讯厅', platform: 'live_casino', id: '42', class: 'dg'},
          {name: 'DS视讯厅', platform: 'live_casino', id: '34', class: 'ds'},
          {name: 'OG视讯厅', platform: 'live_casino', id: '48', class: 'og'},
          {name: 'eBET视讯厅', platform: 'live_casino', id: '43', class: 'ebet'},
          {name: 'VR彩票', platform: 'live_casino', id: '30', class: 'vr'},
        ]
      }
    },
    methods: {
      async slider () {
        let ul = document.getElementById('slider')
        let prev = document.getElementById('prev')
        let next = document.getElementById('next')
        let main = document.getElementById('main')
        let n = -150

        function left () {
          let oLi = ul.children[0]
          ul.className = 'active'
          setTimeout(function () {
            ul.removeChild(oLi)
            ul.appendChild(oLi)
            ul.className = ''
          }, 500)
        }

        function right () {
          let last = ul.lastElementChild
          ul.removeChild(last)
          ul.insertBefore(last, ul.childNodes[0])
          ul.style.left = n + 'px'
          ul.className = 'back'
          setTimeout(function () {
            ul.className = ''
            ul.style.left = ''
          }, 500)
        }

        prev.onclick = right
        next.onclick = left
        let timer = null
        timer = setInterval(left, 4000)
        main.onmouseover = function () {
          clearInterval(timer)
        }
        main.onmouseout = function () {
          timer = setInterval(left, 4000)
        }
      }
    },
    created: function () {
    },
    mounted () {
      this.slider()
    },
    watch: {},
    components: {}
  }
</script>

<style lang="less" scoped>

  * {
    margin: 0;
    padding: 0;
  }

  #main {
    margin: 0 auto;
    width: 1000px;
    position: relative;
  }

  #box {
    width: 900px;
    height: 80px;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
  }

  #slider {
    width: 1650px;
    position: absolute;
  }

  #slider li {
    position: relative;
    width: 150px;
    height: 80px;
    color: #fff;
    font-size: 16px;
    line-height: 80px;
    text-align: center;
    background-color: #202020;
    background-position: center top;
    background-repeat: no-repeat;
    float: left;
    list-style: none;
    cursor: pointer;
  }

  #slider li:hover {
    background-image: url("/static/public/image/game/live/tab_h.png");
  }

  #slider li:before {
    content: "";
    position: absolute;
    top: 1px;
    left: 0;
    width: 1px;
    height: 78px;
    background-image: url("/static/public/image/game/live/line.png");
  }

  span {
    position: absolute;
    top: 0;
    z-index: 1;
    display: inline-block;
    width: 27px;
    height: 80px;
    vertical-align: top;
    background-color: #202020;
    cursor: pointer;
  }

  span:hover:before {
    background-position-y: bottom;
  }

  #prev {
    left: 27px;
  }

  #next {
    right: 27px;
  }

  span:before {
    content: "";
    position: absolute;
    top: 30px;
    left: 8px;
    width: 12px;
    height: 20px;
    background-position: center top;
    background-repeat: no-repeat;
  }

  #prev:before {
    background-image: url("/static/public/image/game/live/left.png");
  }

  #next:before {
    background-image: url("/static/public/image/game/live/right.png");
  }

  .active {
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    transform: translate3d(-150px, 0, 0);
  }

  .back {
    transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    transform: translate3d(150px, 0, 0);
  }

  .home-list-wrap {
    text-align: center;
    width: 1050px;
    margin: 0 auto;
    font-size: 0;
    padding-bottom: 15px;

    .home-list-item {
      display: inline-block;
      cursor: pointer;
      width: 317px;
      height: 384px;
      background-position: center top;
      background-repeat: no-repeat;
      margin: 0 -1px;
    }

    li:hover {
      background-position-y: bottom;
    }

    .ag {
      background-image: url(/static/public/image/game/live/ag.jpg);
    }

    .bb {
      background-image: url(/static/public/image/game/live/bb.jpg);
    }

    .bg {
      background-image: url(/static/public/image/game/live/bg.jpg);
    }

    .dg {
      background-image: url(/static/public/image/game/live/dg.jpg);
    }

    .ds {
      background-image: url(/static/public/image/game/live/ds.jpg);
    }

    .lebo {
      background-image: url(/static/public/image/game/live/lebo.jpg);
    }

    .og {
      background-image: url(/static/public/image/game/live/og.jpg);
    }

    .ebet {
      background-image: url(/static/public/image/game/live/ebet.jpg);
    }

    .lmg {
      background-image: url(/static/public/image/game/live/lmg.jpg);
    }

    .ob {
      background-image: url(/static/public/image/game/live/ob.jpg);
    }

    .sa {
      background-image: url(/static/public/image/game/live/sa.jpg);
    }

    .more {
      background-image: url(/static/public/image/game/live/more.jpg);
    }

    .vr{
      background-image: url(/static/public/image/game/live/vr.jpg);
    }
  }

  .home-list-form {
    display: none;
  }

  .banner-cpyx {
    // background: black;
    .wrapper {
      margin: 0 auto;
      width: 960px;
      height: 10px;

      .demolist {
        margin-top: 30px;
      }
    }
  }
</style>
