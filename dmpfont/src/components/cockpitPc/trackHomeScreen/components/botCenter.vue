<template>
  <div class="wraper igs-flex igs-flex10">
    <div class="wraper-cont bg">
      <div class="rank-cont-list">
        <ul class="list-title">
          <li class="igs-flex igs-flex10 blue-color">
            <div class="list-number flex"><p>排名</p></div>
            <div class="flex1">地市</div>
            <div class="flex2">会员数(万人)</div>
            <div class="flex2">年度目标(万人)</div>
            <div class="flex2">对比年度目标(万人)</div>
            <div class="flex3">超欠幅度</div>
          </li>
        </ul>
        <ul>
          <li class="igs-flex igs-flex10" v-for="(item, index) in activeMemberList.slice(0, 5)" :key="index">
            <div class="list-numbers flex">
             <p class="list-num" :class="'ranknum'+index">{{index + 1}}</p>
            </div>
            <div class="list-name flex1"><span>{{item.city}}</span></div>
            <div class="list-price flex2">
              <p class="textright1">{{$util.fixedFunc1(item.count / 10000, 1)}}</p>
            </div>
            <div class="list-price flex2">
              <p class="textright1">{{$util.fixedFunc1(item.planCount, 1)}}</p>
            </div>
            <div class="list-price flex2">
              <p class="textright2"><span v-if="$util.fixedFunc(item.contrast) > 0">+</span>{{$util.fixedFunc1(item.contrast / 10000, 1)}}</p>
            </div>
            <div class="list-price flex3">
              <p class="textright3"><span v-if="$util.fixedFunc(item.overdue) > 0">+</span>{{$util.fixedFunc1(item.overdue, 1)}}%</p>
            </div>
          </li>
          <div class="list-img"><img src="https://img.gdoil.cn/cockpit/static/images/trackHomeScreen/line1.png"></div>
          <li class="igs-flex igs-flex10" v-for="(item, index) in activeMemberList.slice(activeMemberList.length - 3, activeMemberList.length)" :key="index+'1'">
            <div class="list-numbers flex">
             <p class="list-num red-bg">{{index + activeMemberList.length - 2}}</p>
            </div>
            <div class="list-name flex1"><span>{{item.city}}</span></div>
            <div class="list-price flex2">
              <p class="textright1">{{$util.fixedFunc1(item.count / 10000, 1)}}</p>
            </div>
            <div class="list-price flex2">
              <p class="textright1">{{$util.fixedFunc1(item.planCount, 1)}}</p>
            </div>
            <div class="list-price flex2">
              <p class="textright2"><span v-if="$util.fixedFunc(item.contrast) > 0">+</span>{{$util.fixedFunc1(item.contrast / 10000, 1)}}</p>
            </div>
            <div class="list-price flex3">
              <p class="textright3"><span v-if="$util.fixedFunc(item.overdue) > 0">+</span>{{$util.fixedFunc1(item.overdue, 1)}}%</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'centerBot1',
  data () {
    return {
      activeMemberList: []
    }
  },
  created () {
    this.cityRankDetail()
  },
  methods: {
    // 各地卡车之家有效会员增长情况
    cityRankDetail () {
      this.$http.post('/webapi/bdview/thDataBS/cityRankDetail').then(res => {
        if (res.result === true) {
          let json = res.data.activeMemberList
          // 降序处理
          json.sort((a, b) => {
            return b.overdue - a.overdue
          })
          this.activeMemberList = json
          // 是否启动轮询1
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.cityRankDetail()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
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
<!-- https://img.gdoil.cn/cockpit -->
<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  ::-webkit-scrollbar {
    display: none;
  }
  .ellipsis{
    display:inline-block;white-space:nowrap;
    overflow:hidden;text-overflow: ellipsis;
  }
  .wraper {
    width: 100%
    height: 100%
    color: #D8EFFB
    display: flex
    .wraper-cont{
      height: 100%
      flex: 1
      background-size: 100% 100%
      .rank-cont-list{
        height: auto
        max-height: vh(277)
        overflow: auto
        padding: vh(0) vw(20)
        margin: vh(40) 0 0 0
        .list-title{
          padding: vh(3) 0
          div{
            height: vh(25)
            line-height: vh(25)
            overflow: hidden
            font-size: vw(12)!important
          }
        }
        ul{
          height: auto
          .list-bg{
            background: #060E41
          }
          li{
            height: vh(28)
            color: #D8EFFB
            list-style: none
            font-size: vw(14)
            padding: 0 vw(10) 0 vw(15)
            overflow: hidden
            div{
              text-align: center
            }
            .list-number{
              text-align: left!important
            }
            .list-numbers{
              text-align: left!important
              .list-num{
                margin-left: vw(6)
              }
            }
            .list-num{
              width: vw(20)
              line-height: vw(20)
              background: #1A307D
              color: #ffffff
              text-align: center
            }
            .list-name{
              text-align: center
              padding-left: vw(2)
              height: vh(25)
              line-height: vh(25)
              overflow: hidden
            }
            .list-price{
              height: vh(25)
              line-height: vh(25)
              overflow: hidden
              display: flex
              justify-content: flex-end
            }
            .ranknum0{
              background: #DE5656
            }
            .ranknum1{
              background: #B69B36
            }
            .ranknum2{
              background: #7E59F1
            }
            .red-bg{
              background: #993548
            }
          }
          .list-img{
            line-height: vh(2)!important
            margin-bottom: vh(8)
            img{
              width: 100%!important
              height: vh(2)
            }
          }
        }
      }
    }
    .bg{
      background: url("https://img.gdoil.cn/cockpit/static/images/trackHomeScreen/bot_bg1.png?1") no-repeat
      -webkit-background-size: 100% 100%
    }
    .blue-color{
      color: #5C74D1!important
      font-size: vw(12)!important
    }
    .flex{
      width: 8%
    }
    .flex1{
      width: 12%
    }
    .flex2{
      width: 21%
    }
    .flex3{
      width: 17%
    }
    .textleft{
      text-align: left!important
    }
    .textright1{
      width: auto
      text-align: right!important
      padding-right: vw(35)
    }
    .textright2{
      width: auto
      text-align: right!important
      padding-right: vw(30)
    }
    .textright3{
      width: auto
      text-align: right!important
      padding-right: vw(5)
    }
  }
</style>
