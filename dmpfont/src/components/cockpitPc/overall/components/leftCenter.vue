<template>
  <div class="leftCenter">
    <div class="title"></div>
    <div class="leftCenter_b">
      <div class="table-head">
        <ul>
          <li class="index1">排名</li>
          <li class="place1">地市</li>
          <li class="finished">有效会员</li>
          <li class="completion-rate">有效会员占比</li>
        </ul>
      </div>
      <div class="table-content"
           v-if="dataList.length > 0">
        <ul>
          <li class="index index-first">1</li>
          <li class="place">{{dataList[0].city}}</li>
          <li class="finished">{{dataList[0].activeMembers}}</li>
          <li class="completion-rate">{{dataList[0].activeMembersProportion}}%</li>
        </ul>
        <ul>
          <li class="index index-second">2</li>
          <li class="place">{{dataList[1].city}}</li>
          <li class="finished">{{dataList[1].activeMembers}}</li>
          <li class="completion-rate">{{dataList[1].activeMembersProportion}}%</li>
        </ul>
        <ul>
          <li class="index">3</li>
          <li class="place">{{dataList[2].city}}</li>
          <li class="finished">{{dataList[2].activeMembers}}</li>
          <li class="completion-rate">{{dataList[2].activeMembersProportion}}%</li>
        </ul>
        <ul>
          <li class="index">4</li>
          <li class="place">{{dataList[3].city}}</li>
          <li class="finished">{{dataList[3].activeMembers}}</li>
          <li class="completion-rate">{{dataList[3].activeMembersProportion}}%</li>
        </ul>
        <ul>
          <li class="index">5</li>
          <li class="place">{{dataList[4].city}}</li>
          <li class="finished">{{dataList[4].activeMembers}}</li>
          <li class="completion-rate">{{dataList[4].activeMembersProportion}}%</li>
        </ul>
        <ul>
          <li class="index">6</li>
          <li class="place">{{dataList[5].city}}</li>
          <li class="finished">{{dataList[5].activeMembers}}</li>
          <li class="completion-rate">{{dataList[5].activeMembersProportion}}%</li>
        </ul>
        <ul>
          <li class="index">7</li>
          <li class="place">{{dataList[6].city}}</li>
          <li class="finished">{{dataList[6].activeMembers}}</li>
          <li class="completion-rate">{{dataList[6].activeMembersProportion}}%</li>
        </ul>
        <ul>
          <li class="index">8</li>
          <li class="place">{{dataList[7].city}}</li>
          <li class="finished">{{dataList[7].activeMembers}}</li>
          <li class="completion-rate">{{dataList[7].activeMembersProportion}}%</li>
        </ul>
        <ul>
          <li class="index">9</li>
          <li class="place">{{dataList[8].city}}</li>
          <li class="finished">{{dataList[8].activeMembers}}</li>
          <li class="completion-rate">{{dataList[8].activeMembersProportion}}%</li>
        </ul>
        <ul>
          <li class="index">10</li>
          <li class="place">{{dataList[9].city}}</li>
          <li class="finished">{{dataList[9].activeMembers}}</li>
          <li class="completion-rate">{{dataList[9].activeMembersProportion}}%</li>
        </ul>
        <div class="line"></div>
        <ul>
          <li class="index index-last">19</li>
          <li class="place">{{dataList[18].city}}</li>
          <li class="finished">{{dataList[18].activeMembers}}</li>
          <li class="completion-rate">{{dataList[18].activeMembersProportion}}%</li>
        </ul>
        <ul>
          <li class="index index-last">20</li>
          <li class="place">{{dataList[19].city}}</li>
          <li class="finished">{{dataList[19].activeMembers}}</li>
          <li class="completion-rate">{{dataList[19].activeMembersProportion}}%</li>
        </ul>
        <ul>
          <li class="index index-last">21</li>
          <li class="place">{{dataList[20].city}}</li>
          <li class="finished">{{dataList[20].activeMembers}}</li>
          <li class="completion-rate">{{dataList[20].activeMembersProportion}}%</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftCenter',
  data () {
    return {
      dataList: []
    }
  },
  created () {
    this.cityActiveMemberProportionRank()
  },
  mounted () {

  },
  methods: {
    //    2. 地市活跃会员占比排行榜
    // GET /cityActiveMemberProportionRank
    cityActiveMemberProportionRank () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thDataBS/cityActiveMemberProportionRank', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          // console.log(res)
          this.dataList = res.rows.sort(that.compare('activeMembersProportion'))
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.cityActiveMemberProportionRank()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 排序
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
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
.leftCenter
  text-align center
  width 100%
  height pxtovh(510)
  background url('https://img.gdoil.cn/cockpit/static/images/overallImg/1.png') no-repeat
  -webkit-background-size 100% 100%
  background-size 100% 100%
  padding pxtovh(47) pxtovh(20) pxtovh(20) pxtovh(20)
  position relative
  margin-top pxtovh(14)
  .title
    width pxtovh(356)
    height pxtovh(34)
    line-height pxtovh(34)
    font-size pxtovh(20)
    font-weight 400
    color rgba(169, 184, 255, 1)
    position absolute
    top 0
    left 50%
    margin-left pxtovh(-178)
  .leftCenter_b
    height 100%
    .table-head
      margin-bottom pxtovh(18)
      font-size pxtovh(20)
      color #5c74d1
      ul
        display flex
        justify-content space-between
    .table-content
      height 100%
      .line
        width 100%
        height pxtovh(2)
        background url('https://img.gdoil.cn/cockpit/static/images/netDevelop/img_divider.png') no-repeat
        -webkit-background-size 100%
        background-size 100%
        margin pxtovh(12) pxtovw(0) pxtovh(12)
      ul
        font-size pxtovh(14)
        color #d8effb
        display flex
        justify-content space-between
        li
          text-align center
          line-height pxtovh(20)
          margin-bottom pxtovh(10)
    .index1
      width pxtovw(50)
    .index
      width pxtovw(34)
      background-color #1A307D
      margin-left pxtovw(6)
    .index-first
      background-color #DE5656
    .index-second
      background-color #B69B36
    .index-last
      background-color #993548
    .place1
      width pxtovw(89)
    .place
      width pxtovw(89)
      margin-left pxtovw(4)
    .finished1
      width pxtovw(88.5)
    .finished
      width pxtovw(88.5)
    .completion-rate
      width pxtovw(130)
</style>
