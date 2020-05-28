<template>
  <div class="staff-left">
    <div class="pad-leftright">
      <!-- 服务之星 -->
      <img class="title-img padtop" src="https://img.gdoil.cn/cockpit/static/images/staffRank/star_icons.png">
      <div class="rank-cont-list">
        <ul v-if="serveStarList.length!=0">
          <li class="igs-flex igs-flex4" v-for="(item, index) in serveStarList" :key="index">
            <div class="igs-flex igs-flex2">
              <span class="list-num" :class="'ranknum'+index">{{index+1}}</span>
              <span class="list-name">{{item.staffName}}</span>
              <span class="list-addres">{{item.orgName}} <label v-if="item.stationName">|</label> {{item.stationName}}</span>
            </div>
            <div class="rank-list-r">星数 <span>{{item.total}}</span></div>
          </li>
        </ul>
        <div class="nodata" v-else><img src="https://img.gdoil.cn/cockpit/static/images/staffRank/right_nodata.png"></div>
      </div>
      <!-- 劳动之星 -->
      <img class="title-img martop" src="https://img.gdoil.cn/cockpit/static/images/staffRank/star_icon1s.png">
      <div class="rank-cont-list">
        <ul v-if="labourStarList.length!=0">
          <li class="igs-flex igs-flex4" v-for="(item, index) in labourStarList" :key="index">
            <div class="igs-flex igs-flex2">
              <span class="list-num" :class="'ranknum'+index">{{index+1}}</span>
              <span class="list-name">{{item.staffName}}</span>
              <span class="list-addres">{{item.orgName}} <label v-if="item.stationName">|</label> {{item.stationName}}</span>
            </div>
            <div class="rank-list-r1">加油次数 <span>{{item.total}}</span></div>
          </li>
        </ul>
        <div class="nodata" v-else><img src="https://img.gdoil.cn/cockpit/static/images/staffRank/right_nodata.png"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'staffRight',
  data () {
    return {
      serveStarList: [], // 服务之星
      labourStarList: [] // 劳动之星
    }
  },
  created () {
    this.staffTheMonthRank()
  },
  methods: {
    // 获取年度排名
    staffTheMonthRank () {
      this.$http.get('/webapi/bdview/outstandingStaffBS/staffAnnualRank').then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.serveStarList = res.data.staffStarsList // 服务之星
          this.labourStarList = res.data.staffRefuelTotalList // 劳动之星
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.staffTheMonthRank()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  },
  beforeDestroy () {
    if (this.timer) {
      window.clearTimeout(this.timer)
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../../../assets/css/mixin.styl'
.staff-left {
  text-align center
  width: 100%
  height: 100%
  color: #97a8f7
  background: url("https://img.gdoil.cn/cockpit/static/images/staffRank/bg_right_1.png") no-repeat
  -webkit-background-size: 100% 100%
  background-size: 100% 100%
  .rank-title{
    width: 100%
    line-height: vw(44)
    color: #ffffff
    font-size: vw(18)
    text-align: center
    div{
      width: vw(350)
      line-height: vw(44)
    }
  }
  .pad-leftright{
    padding: 0 vw(20)
  }
  .martop{
    margin-top: vw(30)!important
  }
  .padtop{
    padding-top: vh(66)
  }
  .rank-cont-title{
    height: auto
    font-size: vw(20)
    color: #ffffff
    text-align: center
    margin: 0
    padding: 0
    border: vw(1) solid red
    img{
      width: 100%
      height: auto
      border: vw(1) solid red
    }
  }
  .title-img{
    width: calc(100% - 40px)
    height: auto
    margin: 0 vw(20)
  }
  .rank-cont-list::-webkit-scrollbar {
      display: none;
  }
  .rank-cont-list{
    height: vh(372)
    color: #ffffff
    overflow: auto
    padding: 0
    margin: 0 vw(15)
    ul{
      height: 100%
      li{
        line-height: vh(72)
        color: #8090e0
        list-style: none
        font-size: vw(14)
        padding: 0 vw(10)
        background: #060C44
        .list-num{
          width: vw(24)
          line-height: vw(24)
          text-align: center
          background: #182d83
          border-radius: 100%
          font-size: vw(14)
          color: #ffffff
        }
        .ranknum0{
          width: vw(28)
          line-height: vw(28)
          background: #B69B36
        }
        .ranknum1{
          width: vw(28)
          line-height: vw(28)
          background: #DE5656
        }
        .ranknum2{
          width: vw(28)
          line-height: vw(28)
          background: #7E59F1
        }
        .ranknum3, .ranknum4{
          background: #1A307D
        }
        .list-img{
          width: vw(50)
          height: vw(50)
          overflow: hidden
          margin: 0 vw(15)
          img{
            width: 100%
            height: auto
            border-radius: 100%
          }
        }
        .list-name{
          font-size: vw(19)
          color: #ffffff
          margin: 0 vw(10)
        }
        .list-addres{
          font-size: vw(14)
        }
        .rank-list-r{
          width: vw(110)
          text-align: left
          span{
            font-size: vw(18)
            color: #ffffff
            margin-left: vw(5)
          }
        }
        .rank-list-r1{
          width: vw(140)
          text-align: left
          span{
            font-size: vw(18)
            color: #ffffff
            margin-left: vw(5)
          }
        }
      }
    }
    .nodata{
      height: 100%
      display: flex
      align-items: center
      justify-content: center
      img{
        width: 40%
        height: auto
      }
    }
  }
}
</style>
