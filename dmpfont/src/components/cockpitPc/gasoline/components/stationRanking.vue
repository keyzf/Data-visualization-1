<template>
  <div class="station-wrapper">
    <div class="content">
      <div class="index">
        <div class="head"></div>
        <div class="title">排名</div>
        <div class="item-list">
          <ul>
            <li v-for="(item, index) of itemList" :key="index" :class="sstt[index]">{{index + 1}}</li>
          </ul>
        </div>
      </div>
      <div class="item">
        <div class="head">新增会员</div>
        <ul class="title-wrapper">
          <li class="title">地市</li>
          <li class="title">数量</li>
        </ul>
        <div class="item-content">
          <div class="list" v-for="(item, index) of stationaddMemberListArr" :key="index">
            <ul>
              <li>{{item.name.substring(0, 2)}}</li>
              <li>{{item.count}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="item item-center">
        <div class="head">活跃会员</div>
        <ul class="title-wrapper">
          <li class="title">地市</li>
          <li class="title">数量</li>
        </ul>
        <div class="item-content">
          <div class="list" v-for="(item, index) of stationactiveMemberListArr" :key="index">
            <ul>
              <li>{{item.name.substring(0, 2)}}</li>
              <li>{{item.count}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="head">吨数会员</div>
        <ul class="title-wrapper">
          <li class="title">地市</li>
          <li class="title">数量</li>
        </ul>
        <div class="item-content">
          <div class="list" v-for="(item, index) of stationtonsoilMemberListArr" :key="index">
            <ul>
              <li>{{item.name.substring(0, 2)}}</li>
              <li>{{item.tonsoilMembermap}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'stationRanking',
  data () {
    return {
      sstt: [
        'index_first',
        'index_second',
        'index_three'
      ],
      itemList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      stationactiveMemberListArr: [], // 活跃会员
      stationaddMemberListArr: [], // 新增会员
      stationtonsoilMemberListArr: [] // 吨数会员
    }
  },
  created () {
    this.cityRankDetail()
  },
  methods: {
    compare (property, desc) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        if (desc === true) {
          // 升序排列
          return value1 - value2
        } else {
          // 降序排列
          return value2 - value1
        }
      }
    },
    cityRankDetail () {
      let that = this
      this.monthObj = {}
      this.yearObj = {}
      this.$http.get('/webapi/bdview/gasolineDataBS/cityRankDetail').then(res => {
        if (res.result) {
          let stationactiveMemberList = res.data.stationactiveMemberList
          let stationaddMemberList = res.data.stationaddMemberList
          let stationtonsoilMemberList = res.data.stationtonsoilMemberList
          // 根据数组对象里面的某个属性值进行从大到小排序并截取前10个
          this.stationactiveMemberListArr = stationactiveMemberList.sort(this.compare('count', false)).slice(0, 10)
          this.stationaddMemberListArr = stationaddMemberList.sort(this.compare('count', false)).slice(0, 10)
          this.stationtonsoilMemberListArr = stationtonsoilMemberList.sort(this.compare('count', false)).slice(0, 10)
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.cityRankDetail()
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
  .station-wrapper {
    height: vh(442)
    flex 1
    background url("https://img.gdoil.cn/cockpit/static/images/gasoline/qie_19.png") no-repeat
    -webkit-background-size: 100% vh(442)
    background-size: 100% vh(442)
    padding vh(52) vw(39) vh(22)
    .content {
      width: 100%
      height: 100%
      display flex
      .index {
        width: vw(112)
        height: 100%
        border 1px solid #0D1A56
        border-right none
        .head {
          height:vh(40)
          width: 100%
          border-bottom 1px solid #0D1A56
        }
        .title {
          text-align center
          height:vh(49)
          line-height vh(49)
          width: 100%
          font-size: vw(12)
          color: #5c74d1
        }
        .item-list {
          li {
            width: vw(20)
            height: vh(20)
            line-height: vh(20)
            margin 0 auto
            text-align center
            margin-bottom vh(7)
            background-color: #1a307d
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
      .item {
        flex 1
        height: 100%
        text-align center
        border 1px solid #0D1A56
        .head {
          text-align center
          height:vh(40)
          line-height vh(40)
          width: 100%
          color: #5c74d1
          border-bottom 1px solid #0D1A56
        }
        .title-wrapper {
          display flex
          color: #5c74d1
          font-size: vw(12)
          .title {
            flex 1
            height:vh(49)
            line-height vh(49)
          }
        }
        .item-content {
          .list {
            font-size: vw(15)
            color:rgba(216,239,251,1);
            ul {
              display flex
              li {
                flex 1
                line-height vh(20)
                margin-bottom vh(7)
              }
            }
          }
        }
      }
      .item-center {
        border-right none
        border-left none
      }
    }
  }
</style>
