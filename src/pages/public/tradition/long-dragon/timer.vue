<template>
     <div class="f-time">
        <div class="time" v-if="timer.timerModel=='hours'">
            <span>{{hoursDatas.hou>9?hoursDatas.hou:'0'+hoursDatas.hou}}</span>
            <span style="margin-left: -3px;margin-right: -10px;">：</span>
            <span>{{hoursDatas.min>9?hoursDatas.min:'0'+hoursDatas.min}}</span>
            <span style="margin-left: -3px;margin-right: -10px;">：</span>
            <span>{{hoursDatas.sec>9?hoursDatas.sec:'0'+hoursDatas.sec}}</span>
        </div>
        <div class="time time-days" v-else-if="timer.timerModel=='days'">
            <span>{{daysDatas.day>9?daysDatas.day:'0'+daysDatas.day}}</span>
            <span>天</span>
            <span>{{daysDatas.hou>9?daysDatas.hou:'0'+daysDatas.hou}}</span>
            <span>时</span>
            <span>{{daysDatas.min>9?daysDatas.min:'0'+daysDatas.min}}</span>
            <span>分</span>
        </div>
        <div class="time time-days" v-else-if="timer.timerModel=='minute'">
            <!-- <span>00</span> -->
            <!-- <span style="margin-left: -3px;margin-right: -10px;">：</span> -->
            <span>{{hoursDatas.min>9?hoursDatas.min:'0'+hoursDatas.min}}</span>
            <span style="margin-left: -3px;margin-right: -10px;">：</span>
            <span>{{hoursDatas.sec>9?hoursDatas.sec:'0'+hoursDatas.sec}}</span>
        </div>
        <div class="time time-days" v-else-if="timer.timerModel=='fengpan'">
            <span>已封盘</span>
        </div>
     </div>
</template>
 <script>
 export default {
     props:{
        timerDatas:{
            type:Object
        },
        itemIndex:{
            type:Number
        }
     },
     data () {
        return {
         timer: {
          timerModel: '',
          timeLeave: '',
         },
        hoursDatas: {
          hou: 0,
          min: 0,
          sec: 0
        },
        daysDatas: {
          day: 0,
          hou: 0,
          min: 0,
          sec: 0
        },
        btnTimer: null,
        set:null,
        }
    },
    methods:{
        getTime(){
             this.timer={
                  timerModel: '',
                  timeLeave: this.timerDatas.fengpan,
             }
             if(this.timer.timeLeave >= 86400){
                  this.timer.timerModel = 'days'
                  this.daysCalcu()
             }else if(this.timer.timeLeave ==0){
                  this.timer.timerModel = 'fengpan'
                  return false
             }else{
                 this.hoursCalcu()
             } 
        },
        daysCalcu(){
          let days = Math.floor(this.timer.timeLeave / (24 * 60 * 60))
          // 算算去了天数后还剩多少时间（s）
          let daysLeave = Math.floor(this.timer.timeLeave % (24 * 60 * 60))
          let hours = Math.floor(daysLeave / (60 * 60))
          // 算算去了小时后还剩多少时间(s)
          let hoursLeave = Math.floor(daysLeave % (60 * 60))
          let mins = Math.floor(hoursLeave / 60)
          // 算算去了分钟后还剩多少时间(s)
          let minsLeave = Math.floor(hoursLeave % 60)
          let sec = minsLeave
          this.daysDatas.day = days
          this.daysDatas.hou = hours
          this.daysDatas.min = mins
          this.daysDatas.sec = sec
          clearInterval(this.btnTimer)
          this.btnTimer = setInterval(() => {
          this.daysDatas.sec = this.daysDatas.sec - 1
          if (this.daysDatas.sec < 0 && this.daysDatas.min > 0) {
              this.daysDatas.min = this.daysDatas.min - 1
              this.daysDatas.sec = 59
           }
            if (this.daysDatas.sec < 0 && this.daysDatas.min < 1) {
                clearInterval(this.btnTimer)
                this.daysDatas.sec = 0
                 this.timer.timerModel = 'fengpan'
                this.$emit('child-say', this.itemIndex)
            }
          }, 1000)
        },
        hoursCalcu(){
           this.timeStart(this.timer.timeLeave)
        },
        timeStart(timeParam){
            let days = Math.floor(timeParam / (24 * 60 * 60))
            // 算算去了天数后还剩多少时间（s）
            let daysLeave = Math.floor(timeParam % (24 * 60 * 60))
            let hours = Math.floor(daysLeave / (60 * 60))
            // 算算去了小时后还剩多少时间(s)
            let hoursLeave = Math.floor(daysLeave % (60 * 60))
            let mins = Math.floor(hoursLeave / 60)
            // 算算去了分钟后还剩多少时间(s)
            let minsLeave = Math.floor(hoursLeave % 60)
            let sec = minsLeave
            this.hoursDatas.hou = hours
            this.hoursDatas.min = mins
            this.hoursDatas.sec = sec
            if(this.hoursDatas.hou) this.timer.timerModel = 'hours'
            else this.timer.timerModel = 'minute'
            clearInterval(this.btnTimer)
            this.btnTimer = setInterval(() => { 
            this.hoursDatas.sec = this.hoursDatas.sec - 1
            if (this.hoursDatas.sec < 0 && this.hoursDatas.min > 0) {
            this.hoursDatas.min = this.hoursDatas.min - 1
            this.hoursDatas.sec = 59
            }
            if (this.hoursDatas.sec < 0 && this.hoursDatas.min < 1) {
            clearInterval(this.btnTimer)
            this.hoursDatas.sec = 0
             this.timer.timerModel = 'fengpan'
             this.$emit('child-say', this.itemIndex)
            }
           }, 1000)
        }
    },
    mounted(){
         this.getTime()
    },
    watch: {
     timerDatas: {
        handler (val, oldVal) {
          this.getTime()
        },
        deep: true
      }
    }
 }
 </script>
 