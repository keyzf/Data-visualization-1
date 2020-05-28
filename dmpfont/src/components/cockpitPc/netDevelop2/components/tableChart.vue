<template><!--图表-->
  <div class="table-wrapper">
    <div class="content">
      <div class="table-head">
        <ul>
          <li class="com">排名</li>
          <li class="place1 com flex-li">地市</li>
          <li class="finished com1 flex-li">已建成</li>
          <li class="finishing com1 flex-li">建设中</li>
          <li class="completion-rate">建设完成率</li>
        </ul>
      </div>
      <div class="table-content">
        <ul v-for="(item, index) of topTenList" :key="index">
          <li class="index com2" :class="sstt[index]">{{index + 1}}</li>
          <li class="place com flex-li">{{cutFun(item.orgName)}}</li>
          <li class="finished com1 flex-li">{{item.built}}</li>
          <li class="finishing com1 flex-li">{{item.inConstruction}}</li>
          <li class="completion-rate flex-li">{{item.constructionCompletionRate}}%</li>
        </ul>
        <div class="line"></div>
        <ul v-for="(item, index) of lastThreeList" :key="index + 19">
          <li class="index index-last com2">{{index + 19}}</li>
          <li class="place com flex-li">{{cutFun(item.orgName)}}</li>
          <li class="finished com1 flex-li">{{item.built}}</li>
          <li class="finishing com1 flex-li">{{item.inConstruction}}</li>
          <li class="completion-rate flex-li">{{item.constructionCompletionRate}}%</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tableChart',
  data () {
    return {
      topTenList: [],
      lastThreeList: [],
      sstt: [
        'index_first',
        'index_second',
        'index_three'
      ]
    }
  },
  created () {
    this.getOilStationList()
  },
  methods: {
    // 切割字符串
    cutFun (value) {
      let a = value.indexOf('石油')
      return value.substring(0, a)
    },
    // 排序
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
    },
    // 地市建设进度
    getOilStationList () {
      this.topTenList = []
      this.lastThreeList = []
      let that = this
      that.$http.get('/webapi/bdview/thNetWorkDevelopmentBS/orgConstructionProgress').then(res => {
        if (res.result) {
          let cityArr = res.rows.sort(that.compare('constructionCompletionRate'))
          let topTen = cityArr.slice(0, 10)
          let lastThree = cityArr.slice(-3)
          this.topTenList = topTen
          this.lastThreeList = lastThree
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.getOilStationList()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
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
.table-wrapper {
  text-align center
  width: 100%
  height: pxtovh(465)
  background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop2/qietu_15.png") no-repeat
  -webkit-background-size: 100% pxtovh(465)
  background-size: 100% pxtovh(465)
  padding pxtovh(45) pxtovw(25) pxtovh(10)
  .content {
    .table-head {
      font-size: pxtovw(20)
      color: #5c74d1
      margin-bottom pxtovh(5)
      ul {
        display flex
        .flex-li {
          flex 1
        }
      }
    }
    .table-content {
      .line {
        width: 100%
        height: pxtovh(2)
        background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop/img_divider.png") no-repeat
        -webkit-background-size: 100%
        background-size: 100%
        margin pxtovh(8) pxtovw(0)
      }
      ul {
        font-size: pxtovw(18)
        display flex
        margin-bottom pxtovh(4)
        li {
          color: #d8effb
        }
        .flex-li {
          flex 1
        }
        .com2 {
          width: 8%
          background-color: #1A307D
          display flex
          justify-content center
          align-items center
        }
        .index_first {
          background-color: #DE5656
        }
        .index_second {
          background-color: #B69B36
        }
        .index_three {
          background-color: #7e59f1
        }
        .index-last {
          background-color: #993548
        }
      }
    }
  }
}
</style>
