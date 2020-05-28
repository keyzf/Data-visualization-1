<template>
  <div class="staff-left">
    <section class="igs-flex">
      <!-- 服务之星 -->
      <el-col :span="12">
        <div class="pad-leftright">
          <!-- top3排名 -->
          <div class="igs-flex igs-flex4 rank-cont-top3 padleft">
            <div class="rank-top3" v-for="(item, index) in serveStarList.slice(0, 3)" :key="index" :class="index == 1?'ranktop':''">
              <div class="rank-img" :class="[index == 1?'rankimg1':'','imgbor'+index]"><img src="https://img.gdoil.cn/cockpit/static/images/staffRank/user_img0.png"></div>
              <div class="rank-num" :class="'ranknum'+index">
                <span v-if="index==0">
                  {{index+2}}
                </span>
                <span v-else-if="index==1">
                  {{index}}
                </span>
                <span v-else>
                  {{index+1}}
                </span>
              </div>
              <div class="rank-name">{{item.staffName}}</div>
              <div class="rank-stars">星数<span>{{item.total}}</span></div>
              <div class="rank-addres"><span>{{item.orgName}} <label v-if="item.stationName">|</label> {{item.stationName}}</span></div>
            </div>
          </div>
          <!-- 其余排名 -->
          <div class="rank-cont-list padleft1">
            <ul v-if="serveStarList.length!=0">
              <li class="igs-flex igs-flex4" v-for="(item, index) in serveStarList.slice(3, 11)" :key="index">
                <div class="igs-flex igs-flex2">
                  <span class="list-num">{{index+4}}</span>
                  <div class="list-img"><img src="https://img.gdoil.cn/cockpit/static/images/staffRank/user_img1.png"></div>
                  <span class="list-name">{{item.staffName}}</span>
                  <span class="list-addres">{{item.orgName}} <label v-if="item.stationName">|</label> {{item.stationName}}</span>
                </div>
                <div class="rank-list-r">星数<span>{{item.total}}</span></div>
              </li>
            </ul>
            <div class="nodata" v-else><img src="https://img.gdoil.cn/cockpit/static/images/staffRank/right_nodata.png"></div>
          </div>
        </div>
      </el-col>
      <!-- 劳动之星 -->
      <el-col :span="12">
        <div class="pad-leftright">
          <!-- top3排名 -->
          <div class="igs-flex igs-flex4 rank-cont-top3 padright">
            <div class="rank-top3" v-for="(item, index) in labourStarList.slice(0, 3)" :key="index" :class="index == 1?'ranktop':''">
              <div class="rank-img" :class="[index == 1?'rankimg1':'','imgbor'+index]"><img src="https://img.gdoil.cn/cockpit/static/images/staffRank/user_img0.png"></div>
              <div class="rank-num" :class="'ranknum'+index">
                <span v-if="index==0">
                  {{index+2}}
                </span>
                <span v-else-if="index==1">
                  {{index}}
                </span>
                <span v-else>
                  {{index+1}}
                </span>
              </div>
              <div class="rank-name">{{item.staffName}}</div>
              <div class="rank-stars">加油次数<span>{{item.total}}</span></div>
              <div class="rank-addres"><span>{{item.orgName}} <label v-if="item.stationName">|</label> {{item.stationName}}</span></div>
            </div>
          </div>
          <!-- 其余排名 -->
          <div class="rank-cont-list padright1">
            <ul v-if="labourStarList.length!=0">
              <li class="igs-flex igs-flex4" v-for="(item, index) in labourStarList.slice(3, 11)" :key="index">
                <div class="igs-flex igs-flex2">
                  <span class="list-num">{{index+4}}</span>
                  <div class="list-img"><img src="https://img.gdoil.cn/cockpit/static/images/staffRank/user_img1.png"></div>
                  <span class="list-name">{{item.staffName}}</span>
                  <span class="list-addres">{{item.orgName}} <label v-if="item.stationName">|</label> {{item.stationName}}</span>
                </div>
                <div class="rank-list-r1">加油次数<span>{{item.total}}</span></div>
              </li>
            </ul>
            <div class="nodata" v-else><img src="https://img.gdoil.cn/cockpit/static/images/staffRank/right_nodata.png"></div>
          </div>
        </div>
      </el-col>
    </section>
  </div>
</template>

<script>
export default {
  name: 'staffLeft',
  data () {
    return {
      serveStarList: [], // 服务之星
      labourStarList: [], // 劳动之星
      timer: ''
    }
  },
  created () {
    this.staffAnnualRank()
  },
  methods: {
    // 获取月度排名
    staffAnnualRank () {
      if (!this.timer) {
        this.$dialog.loading.open('加载中')
        console.log(this.timer)
      }
      this.$http.get('/webapi/bdview/outstandingStaffBS/staffTheMonthRank').then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          let starsList = res.data.staffStarsList // 服务之星
          let refuelList = res.data.staffRefuelTotalList // 劳动之星
          let temp = starsList[0]
          starsList[0] = starsList[1]
          starsList[1] = temp
          let temp1 = refuelList[0]
          refuelList[0] = refuelList[1]
          refuelList[1] = temp1
          this.serveStarList = starsList
          this.labourStarList = refuelList
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.staffAnnualRank()
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
  width: 100%
  height: 100%
  color: #97a8f7
  background: url("https://img.gdoil.cn/cockpit/static/images/staffRank/bg_left_1.png") no-repeat
  -webkit-background-size: 100% 100%
  background-size: 100% 100%
  padding-top: vh(135)
  .rank-title{
    width: 100%
    line-height: vh(44)
    color: #ffffff
    font-size: vw(18)
    text-align: center
    div{
      width: vw(350)
      line-height: vh(44)
    }
  }
  .pad-leftright{
    padding: 0
  }
  .rank-cont-title{
    line-height: vh(48)
    font-size: vw(22)
    color: #ffffff
    text-align: center
    margin: vh(26) 0 vh(16) 0
  }
  .rank-cont-top3{
    height: vh(245)
    color: #D8EFFB
    margin-bottom: vh(10)
    padding: 0 vw(15)
    .ranktop{
      height: vh(245)!important
      margin: 0!important
    }
    .rank-top3{
      width: 32%
      height: vh(230)
      text-align: center
      border:1px solid;
      border-image:linear-gradient(0deg, rgba(26,48,125,1), rgba(158,163,255,1)) 10 10
      margin-top: vh(15)
      background:linear-gradient(0deg,rgba(20,7,82,1) 0%,rgba(33,15,122,1) 100%)
      div{
        margin-bottom: vh(9)!important
      }
      .rankimg1{
        width: vh(95)!important
        height: vh(95)!important
      }
      .rank-img{
        width: vh(82)
        height: vh(82)
        margin: vh(15) auto 0 auto
        border-radius: 100%
        img{
          width: 100%
          height: auto
          border-radius: 100%
          padding: 0
        }
      }
      .imgbor0{
        border: vw(2) solid #B69B36
      }
      .imgbor1{
        border: vw(2) solid #DE5656
      }
      .imgbor2{
        border: vw(2) solid #7E59F1
      }
      .ranknum0{
        background: #B69B36
        margin: vh(-30) auto 0 auto
      }
      .ranknum1{
        width: vw(32)!important
        line-height: vw(32)!important
        font-size: vw(16)!important
        background: #DE5656
        margin: vh(-32) auto 0 auto
      }
      .ranknum2{
        background: #7E59F1
        margin: vh(-30) auto 0 auto
      }
      .rank-num{
        width: vw(28)
        line-height: vw(28)
        border-radius: 100%
        position: relative
        font-size: vw(15)
      }
      .rank-name{
        font-size: vw(14)
      }
      .rank-stars{
        font-size: vw(16)
        color: #97A8F7
        span{
          font-size: vw(22)
          color: #D8EFFB
        }
      }
      .rank-addres span{
        width: auto
        padding: vh(6) vw(18)
        border-radius: vw(15)
        font-size: vw(15)
        background: #1C2E73
      }
    }
  }
  .padleft{
    padding-left: vw(52)
    padding-right: vw(25)
  }
  .padright{
    padding-right: vw(52)
    padding-left: vw(25)
  }
  .padleft1{
    padding-left: vw(35)
    padding-right: vw(10)
  }
  .padright1{
    padding-right: vw(35)
    padding-left: vw(10)
  }
  .rank-cont-list ul::-webkit-scrollbar {
      display: none;
  }
  .rank-cont-list{
    height: auto
    ul{
      height: auto
      max-height: vh(533)
      color: #97A8F7
      background: #060E41
      overflow: auto
      padding: vh(10) 0
      li{
        line-height: vh(71)
        color: #8090e0
        list-style: none
        font-size: vw(15)
        padding: 0 vw(20)
        .list-num{
          width: vw(26)
          line-height: vw(26)
          text-align: center
          background: #1A307D
          border-radius: 100%
          font-size: vw(18)
          color: #ffffff
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
          font-size: vw(20)
          color: #ffffff
        }
        .list-addres{
          font-size: vw(15)
          margin-left: vw(25)
        }
        .rank-list-r{
          width: vw(110)
          span{
            font-size: vw(21)
            color: #ffffff
            margin-left: vw(5)
          }
        }
        .rank-list-r1{
          width: vw(150)
          text-align: left
          span{
            font-size: vw(21)
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
  .border{
    border: 1px solid red
  }
}
</style>
