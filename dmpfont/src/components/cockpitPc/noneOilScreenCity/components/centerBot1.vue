<template>
  <div class="wraper igs-flex igs-flex10">
    <!-- 左 -->
    <div class="wraper-cont bg">
      <div class="rank-cont-list">
        <ul>
          <li class="igs-flex igs-flex10" v-for="(item, index) in saleMiddleList" :key="index" :class="index%2 != 0 ? 'list-bg':''">
            <div class="list-num" :class="'ranknum'+index">
             {{index+1}}
            </div>
            <div class="list-name"><span>{{item.name}}</span></div>
            <div class="list-price">{{item.count}}万元</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 中 -->
    <div class="wraper-cont bg1">
      <div class="rank-cont-list">
        <ul>
          <li class="igs-flex igs-flex10" v-for="(item, index) in saleSmallList" :key="index" :class="index%2 != 0 ? 'list-bg':''">
            <div class="list-num" :class="'ranknum'+index">
             {{index+1}}
            </div>
            <div class="list-name"><span class="">{{item.name}}</span></div>
            <div class="list-price">{{item.count}}万元</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 右 -->
    <div class="wraper-cont bg2">
      <div class="rank-cont-list">
        <ul>
          <li class="igs-flex igs-flex10" v-for="(item, index) in saleSingleList" :key="index" :class="index%2 != 0 ? 'list-bg':''">
            <div class="list-num" :class="'ranknum'+index">
             {{index+1}}
            </div>
            <div class="list-name"><span>{{item.name}}</span></div>
            <div class="list-price">{{item.count}}万元</div>
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
      saleMiddleList: [], // 销售中类
      saleSmallList: [], // 销售小类
      saleSingleList: [] // 销售单品
    }
  },
  props: ['cityCode'],
  watch: {
    cityCode: {
      handler (newValue, oldValue) {
        this.cityCode = newValue
        this.clearTimeout()
        console.log('clearTimeout' + this.cityCode)
        this.monthlySalesMiddleClassRankTop()
        this.monthlySalesSmallClassRankTop()
        this.monthlySalesSingleProductRankTop()
      },
      deep: true
    }
  },
  // watch: {
  //   cityCode (val) {
  //     if (this.cityCode !== '') {
  //       this.clearTimeout()
  //       this.monthlySalesMiddleClassRankTop()
  //       this.monthlySalesSmallClassRankTop()
  //       this.monthlySalesSingleProductRankTop()
  //     }
  //   }
  // },
  created () {
    this.monthlySalesMiddleClassRankTop()
    this.monthlySalesSmallClassRankTop()
    this.monthlySalesSingleProductRankTop()
  },
  methods: {
    // 月销售中类排名top10
    monthlySalesMiddleClassRankTop () {
      this.$http.post('/webapi/bdview/municipalCompany/monthlySalesMiddleClassRankTop', {cityCode: this.cityCode}).then(res => {
        if (res.result === true) {
          let json = res.rows
          // 降序处理
          json.sort((a, b) => {
            return b.count - a.count
          })
          json.map((a) => {
            a.count = this.$util.fixedFunc(a.count) // 金额小数点处理
          })
          this.saleMiddleList = json
          // 是否启动轮询1
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.monthlySalesMiddleClassRankTop()
              this.monthlySalesSmallClassRankTop()
              this.monthlySalesSingleProductRankTop()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 月销售小类排名top10
    monthlySalesSmallClassRankTop () {
      this.$http.post('/webapi/bdview/municipalCompany/monthlySalesSmallClassRankTop', {cityCode: this.cityCode}).then(res => {
        if (res.result === true) {
          let json = res.rows
          // 降序处理
          json.sort((a, b) => {
            return b.count - a.count
          })
          json.map((a) => {
            a.count = this.$util.fixedFunc(a.count) // 金额小数点处理
          })
          this.saleSmallList = json
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 月销售单类排名top10
    monthlySalesSingleProductRankTop () {
      this.$http.post('/webapi/bdview/municipalCompany/monthlySalesSingleProductRankTop', {cityCode: this.cityCode}).then(res => {
        if (res.result === true) {
          let json = res.rows
          // 降序处理
          json.sort((a, b) => {
            return b.count - a.count
          })
          json.map((a) => {
            a.count = this.$util.fixedFunc(a.count) // 金额小数点处理
          })
          this.saleSingleList = json
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    clearTimeout () {
      if (this.timer) {
        window.clearTimeout(this.timer)
        console.log('clearTimeout')
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
        max-height: vh(266)
        overflow: auto
        padding: vh(5) vw(20)
        margin: vh(40) 0 0 0
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
            .list-num{
              width: vw(20)
              line-height: vw(20)
              text-align: center
              background: #1A307D
              color: #ffffff
            }
            .list-name{
              flex: 1
              text-align: center
              padding-left: vw(5)
              height: vh(25)
              line-height: vh(25)
              overflow: hidden
            }
            .list-price{
              flex: 1
              text-align: right
              height: vh(25)
              line-height: vh(25)
              overflow: hidden
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
          }
        }
      }
    }
    .bg{
      background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/bg_center_b1.png") no-repeat
      -webkit-background-size: 100% 100%
    }
    .bg1{
      background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/bg_center_b2.png") no-repeat
      -webkit-background-size: 100% 100%
      margin: 0 15px
    }
    .bg2{
      background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/bg_center_b3.png") no-repeat
      -webkit-background-size: 100% 100%
    }

  }
</style>
