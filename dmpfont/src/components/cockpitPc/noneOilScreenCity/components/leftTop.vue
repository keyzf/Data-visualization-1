<template>
  <div class="wraper igs-flex igs-flex10">
    <div class="igs-flex igs-flex10 wrap">
      <div class="wrap-left border-r ellipsis count-num">
        <!-- <p><img src="static/images/noneOilScreen/left_top_icon.png"></p>
        <p class="name">今日零售营业额</p>
        <count-num :value="retailTurnover" :setType="setType" v-if="isLoaded"></count-num> -->
        <p class="name">今日基础品类营业额</p>
        <div class="igs-flex igs-flex3 count-num">
          <count-num :value="basicCategoriesTurnover" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
      <div class="wrap-right">
        <!-- <p class="name">今日基础品类营业额</p>
        <div class="igs-flex igs-flex3 count-num">
          <count-num :value="basicCategoriesTurnover" :setType="setType" v-if="isLoaded"></count-num>
        </div> -->
        <p class="name">今日服务类营业额</p>
        <div class="igs-flex igs-flex3 count-num">
          <count-num :value="serviceClassTurnover" :setType="setType" v-if="isLoaded"></count-num>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftTop',
  props: {
    cityCode: String
  },
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  },
  data () {
    return {
      retailTurnover: 0,
      basicCategoriesTurnover: 0,
      serviceClassTurnover: 0,
      isLoaded: false, // 数据是否请求完
      setType: {
        iscenter: 1, // 文字是否居中，1居中，0不居中，默认居中
        unitname: '万元' // 单位
      },
      timer: ''
    }
  },
  watch: {
    cityCode: {
      handler (newValue, oldValue) {
        this.cityCode = newValue
        this.clearTimeout()
        console.log('clearTimeout' + this.cityCode)
        this.bigScreenDetails()
      },
      deep: true
    }
  },
  // watch: {
  //   cityCode (val) {
  //     if (this.cityCode !== '') {
  //       this.clearTimeout()
  //       console.log('left-top' + this.cityCode)
  //       this.bigScreenDetails()
  //     }
  //   }
  // },
  created () {
    console.log('left-top' + this.cityCode)
    this.bigScreenDetails()
  },
  methods: {
    // 获取数据大屏明细
    bigScreenDetails () {
      if (!this.timer) {
        this.$dialog.loading.open('加载中')
      }
      this.$http.post('/webapi/bdview/municipalCompany/bigScreenDetails', {cityCode: this.cityCode}).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          let rs = res.data.todayDetail
          let val = rs.retailTurnover || 0
          this.retailTurnover = this.$util.fixedFunc(val)
          let val1 = rs.basicCategoriesTurnover || 0
          this.basicCategoriesTurnover = this.$util.fixedFunc(val1)
          let val2 = rs.serviceClassTurnover || 0
          this.serviceClassTurnover = this.$util.fixedFunc(val2)

          this.isLoaded = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.bigScreenDetails()
            }, this.$store.state.stationData.timeIntervals)
          }
        } else {
          // if (res.retcode === '-1') {
          //   this.$router.push({
          //     name: 'login'
          //   })
          // } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
          // }
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        this.$dialog.loading.close()
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
  .ellipsis{
    display:inline-block;white-space:nowrap;
    overflow:hidden;text-overflow: ellipsis;
  }
  .wraper {
    width: 100%
    height: 100%
    background: url("https://img.gdoil.cn/cockpit/static/images/noneOilScreen/bg_left_t1.png") no-repeat
    -webkit-background-size: 100% 100%
    background-size: 100% 100%
    color: #5C74D1
    font-size: vw(12)
    div{
      flex: 1
      text-align: center
    }
    .wrap-left,.wrap-right{
      img{
        width: vw(44)
        height: vw(44)
      }
      span{
        font-size: vw(30)
        color: #ffffff
      }
      .name{
        margin: vh(0) 0 vh(8) 0
      }
    }
    .count-num{
      /deep/ .wrapers {
        ul.box-item {
          width: auto
          font-size: vw(30)
          li{
            background:linear-gradient(0deg,rgba(32,60,162,1) 0%,rgba(52,79,245,0.45) 100%)
            margin: 0 3px
          }
          /* 默认逗号设置 */
          .mark-item {
            // width: vw(4)
            width: vw(25)
            font-size: vw(30)
            span{
              margin-left: vw(-5)
            }
          }
          .number-item {
            width: vw(28)
          }
        }
        .unit-span {
          display: flex
          align-items: flex-end
          margin-left: vw(3)
        }
      }
    }
    .border-r{
      border-right: vw(1) solid #1A32B4
    }
  }
</style>
