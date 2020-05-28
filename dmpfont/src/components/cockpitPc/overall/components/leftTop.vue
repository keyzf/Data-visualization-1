<template>
  <div class="leftTop igs-flex">
    <div class="leftTop_lr">
      <div class="leftTop_box igs-flex igs-flex2">
        <img src="static/images/overallImg/icon.png" alt="">
        <div>
            <p>今日发展会员</p>
            <p><count-num :value="addMember" :setType="setType"  v-if="isLoaded"></count-num></p>
        </div>
      </div>
      <div class="leftTop_box igs-flex igs-flex2">
        <img src="static/images/overallImg/icon_12.png" alt="">
        <div>
            <p>今日会员柴油销量</p>
            <p><count-num :value="memberDieselSales" :setType="setType2" v-if="isLoaded"></count-num></p>
        </div>
      </div>
    </div>
     <div class="leftTop_lr">
      <div class="leftTop_box igs-flex igs-flex2">
        <img src="static/images/overallImg/icon_0.png" alt="">
        <div>
            <p>今日产生柴油豆</p>
            <p><count-num :value="produceDieselBeanCount" :setType="setType" v-if="isLoaded"></count-num></p>
        </div>
      </div>
      <div class="leftTop_box igs-flex igs-flex2">
        <img src="static/images/overallImg/icon_90.png" alt="">
        <div>
            <p>今日兑换柴油豆</p>
            <p><count-num :value="produceDieselBeanCount" :setType="setType" v-if="isLoaded"></count-num></p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'leftTop',
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  },
  data () {
    return {
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '个', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      setType2: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '升', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      isLoaded: false,
      todayDetail: '',
      addMember: '',
      memberDieselSales: '',
      produceDieselBeanCount: ''
    }
  },
  created () {
    this.bigScreenDetails()
  },
  mounted () {

  },
  methods: {
    // 1. 数据大屏明细
    // GET /bigScreenDetails
    bigScreenDetails () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thDataBS/bigScreenDetails', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          // console.log(res)
          this.todayDetail = res.data.todayDetail
          this.addMember = res.data.todayDetail.addMember// .toLocaleString()
          this.memberDieselSales = res.data.todayDetail.memberDieselSales// .toLocaleString()
          this.produceDieselBeanCount = res.data.todayDetail.produceDieselBeanCount// .toLocaleString()
          this.isLoaded = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.bigScreenDetails()
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
.leftTop {
  width: 100%
  height:  pxtovh(164)
  border:1px solid rgba(26,50,180,1);
  background:linear-gradient(0deg,rgba(0,5,48,1) 0%,rgba(0,7,65,1) 100%);
  padding:0 pxtovh(50)

  .leftTop_lr{
    height:pxtovh(164)
    width:50%;
    .leftTop_box{
        /deep/ .wrapers{
            height: vh(30)
            margin-top:vh(6)
          .box-item{
            font-size: pxtovh(30)!important
             .number-item{
              width: vw(18)
              i{
                left:50%!important;
                transform :translate(-52%,0)
              }
            }
          }
          .unit-span{
            font-size :pxtovh(12);
            margin-left:pxtovh(5);
          }
      }
      height:pxtovh(82)
      font-size:pxtovh(12);
      font-family:Source Han Sans CN;
      font-weight:bold;
      color:rgba(92,116,209,1);
      img{
        width: pxtovh(40);
        margin-right: pxtovh(12);
      }
      .num{
        font-size:pxtovh(30);
        font-family:LcdD;
        font-weight:bold;
        color:rgba(255,255,255,1);
      }
    }
  }
}
</style>
