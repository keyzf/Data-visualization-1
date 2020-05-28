<template><!--图表-->
  <div class="table-wrapper">
    <div class="content">
      <div class="table-head">
        <ul>
          <li class="com">排名</li>
          <li class="place1 com flex-li">地市</li>
          <li class="place1 com">建设目标</li>
          <li class="finished flex-li">已建成</li>
          <li class="finishing flex-li">建设中</li>
          <li class="completion-rate">建设完成率</li>
        </ul>
      </div>
      <div class="table-content">
        <ul>
          <li class="index com2" style="opacity: 0"></li>
          <li class="place com flex-li">{{targetArr.orgName}}</li>
          <li class="place com flex-li">{{targetArr.target}}</li>
          <li class="finished com1 flex-li">{{targetArr.built}}</li>
          <li class="finishing com1 flex-li">{{targetArr.inConstruction}}</li>
          <li class="completion-rate flex-li">{{targetArr.constructionCompletionRate}}%</li>
        </ul>
        <ul v-for="(item, index) of cityArr" :key="index">
          <li class="index com2" :class="sstt[index]">{{index + 1}}</li>
          <li class="place com flex-li">{{item.orgName}}</li>
          <li class="place com flex-li">{{item.target}}</li>
          <li class="finished com1 flex-li">{{item.built}}</li>
          <li class="finishing com1 flex-li">{{item.inConstruction}}</li>
          <li class="completion-rate flex-li">{{item.constructionCompletionRate}}%</li>
        </ul>
        <!--<div class="line"></div>-->
        <ul v-for="(item, index) of lastThreeList" :key="index + 19">
          <li class="index index-last com2">{{index + 19}}</li>
          <li class="place com flex-li">{{item.orgName}}</li>
          <li class="place com flex-li">{{item.target}}</li>
          <li class="finished flex-li">{{item.built}}</li>
          <li class="finishing flex-li">{{item.inConstruction}}</li>
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
      cityArr: [],
      topTenList: [],
      lastThreeList: [],
      targetArr: [], // 全省
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
          this.targetArr = res.rows.find((item, index) => {
            if (item.orgName === '全省') {
              res.rows.splice(index, 1)
              return item
            }
          })
          console.log('res.rows', res.rows)
          this.cityArr = res.rows.sort(that.compare('constructionCompletionRate')).slice(0, 18)
          let topTen = this.cityArr.slice(0, 17)
          let lastThree = res.rows.sort(that.compare('constructionCompletionRate')).slice(18, 21)
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
  height: pxtovh(956)
  background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop/bg-table.png") no-repeat
  -webkit-background-size: 100% pxtovh(956)
  background-size: 100% pxtovh(956)
  padding pxtovh(70) pxtovw(15) pxtovh(20)
  .content {
    .table-head {
      font-size: pxtovw(20)
      color: #5c74d1
      margin-bottom pxtovh(15)
      ul {
        display flex
        .flex-li {
          flex 1
        }
      }
    }
    .table-content {
      .completion-rate {
        text-align right
      }
      .line {
        width: 100%
        height: pxtovh(2)
        background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop/img_divider.png") no-repeat
        -webkit-background-size: 100%
        background-size: 100%
        margin pxtovh(15) pxtovw(0) pxtovh(20)
      }
      ul {
        font-size: pxtovw(18)
        display flex
        margin-bottom pxtovh(13)
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
  @media screen and (max-height: 1079px) {
    .table-wrapper {
      .content {
        .table-content {
          ul {
            margin-bottom pxtovh(8)
          }
        }
      }
    }
  }
</style>
