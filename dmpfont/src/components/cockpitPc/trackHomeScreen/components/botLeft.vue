<template>
  <div class="wraper igs-flex igs-flex10">
    <div class="wraper-cont bg">
      <div class="rank-cont-list">
        <ul class="list-title">
          <li class="igs-flex igs-flex10 blue-color">
            <div class="list-number flex"><p>排名</p></div>
            <div class="flex1">地市</div>
            <div class="flex1">比例</div>
            <div class="flex1">产生(万个)</div>
            <div class="flex2">兑换合计(万个)</div>
            <div class="flex2">兑换非油品(万元)</div>
            <!-- <div class="flex2">兑换加油金(万元)</div> -->
          </li>
        </ul>
        <ul>
          <li class="igs-flex igs-flex10" v-for="(item, index) in beanListTop" :key="index">
            <div class="list-numbers flex">
             <p class="list-num" :class="'ranknum'+index">{{index}}</p>
            </div>
            <div class="list-name flex1"><span>{{item.city}}</span></div>
            <div class="list-price flex1">
              <p class="textright">{{$util.fixedFunc(item.scale)}}%</p>
            </div>
            <div class="list-price flex1">
              <p class="textright3">{{$util.fixedFunc(item.count / 10000)}}</p>
            </div>
            <div class="list-price flex2">
              <p class="textright1">{{$util.fixedFunc(item.exchangeCount / 10000)}}
              </p>
              </div>
            <div class="list-price flex2">
              <p class="textright1">{{$util.fixedFunc(item.exchangeNoOil / 10000)}}</p>
            </div>
            <!-- <div class="list-price flex2">
              <p class="textright2">{{$util.fixedFunc(item.exchangeServer / 10000)}}</p>
            </div> -->
          </li>
          <div class="list-img"><img src="https://img.gdoil.cn/cockpit/static/images/trackHomeScreen/line.png"></div>
          <li class="igs-flex igs-flex10" v-for="(item, index) in beanListBot" :key="index+'1'">
            <div class="list-numbers flex">
             <p class="list-num red-bg">{{index + dieselBeanList - 3}}</p>
            </div>
            <div class="list-name flex1"><span>{{item.city}}</span></div>
            <div class="list-price flex1">
              <p class="textright">{{$util.fixedFunc(item.scale)}}%</p>
            </div>
            <div class="list-price flex1">
              <p class="textright3">{{$util.fixedFunc(item.count / 10000)}}</p>
            </div>
            <div class="list-price flex2">
              <p class="textright1">{{$util.fixedFunc(item.exchangeCount / 10000)}}</p>
            </div>
            <div class="list-price flex2">
              <p class="textright1">{{$util.fixedFunc(item.exchangeNoOil / 10000)}}</p>
            </div>
           <!--  <div class="list-price flex2">
              <p class="textright2">{{$util.fixedFunc(item.exchangeServer / 10000)}}</p>
            </div> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'botLeft',
  data () {
    return {
      dieselBeanList: [], // 总的数据
      beanListTop: [], // 各地市数据top5
      beanListBot: [] // 各地市数据bot3
    }
  },
  created () {
    this.cityRankDetail()
  },
  methods: {
    // 柴油豆兑换比例排名
    cityRankDetail () {
      this.$http.post('/webapi/bdview/thDataBS/cityRankDetail').then(res => {
        if (res.result === true) {
          let json = res.data.dieselBeanList
          if (json.length === 0 || !json) { return }
          // 降序处理
          json.sort((a, b) => {
            return b.scale - a.scale
          })
          // pre上次回调返回值,item当前元素
          const exchangeCountPro = json.reduce((pre, item) => {
            return pre + Number(item.exchangeCount)
          }, 0)
          const exchangeNoOilPro = json.reduce((pre, item) => {
            return pre + Number(item.exchangeNoOil)
          }, 0)
          const exchangeServerPro = json.reduce((pre, item) => {
            return pre + Number(item.exchangeServer)
          }, 0)
          const countPro = json.reduce((pre, item) => {
            return pre + Number(item.count)
          }, 0)
          // 第一条数据（全省）
          const dieselBeanListPro =
          {
            exchangeCount: exchangeCountPro,
            city: '全省',
            count: String(countPro),
            exchangeNoOil: String(exchangeNoOilPro),
            scale: exchangeCountPro / countPro * 100,
            exchangeServer: exchangeServerPro
          }
          this.dieselBeanList = json.unshift(dieselBeanListPro)
          // this.dieselBeanList = json
          this.beanListTop = json.slice(0, 6)
          this.beanListBot = json.slice(json.length - 3, json.length)
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
            height: vh(25)
            color: #D8EFFB
            list-style: none
            font-size: vw(14)
            padding: 0 vw(15)
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
              padding-left: vw(5)
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
              background: #000530
              color: #000530
            }
            .ranknum1{
              background: #DE5656
            }
            .ranknum2{
              background: #B69B36
            }
            .ranknum3{
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
      background: url("https://img.gdoil.cn/cockpit/static/images/trackHomeScreen/bot_bg.png?1") no-repeat
      -webkit-background-size: 100% 100%
    }
    .blue-color{
      color: #5C74D1!important
      font-size: vw(12)!important
    }
    .flex{
      width: 7%
    }
    .flex1{
      width: 12%
    }
    .flex2{
      width: 19%
    }
    .textleft{
      text-align: left!important
    }
    .textright{
      width: auto
      width: auto
      text-align: right!important
      padding-right: vw(20)
    }
    .textright1{
      width: auto
      text-align: right!important
      padding-right: vw(60)
    }
    .textright2{
      width: auto
      text-align: right!important
      padding-right: vw(60)
    }
    .textright3{
      width: auto
      text-align: right!important
      padding-right: vw(30)
    }
  }
</style>
