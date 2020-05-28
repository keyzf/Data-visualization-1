<template>
  <div class="rightCenter">
    <div class="title">
      <!-- 累计会员数 -->
      </div>
    <div class="rightCenter_b">
      <div class="rightCenter_b_info igs-flex">
        <div class="img_box igs-flex igs-flex2">
          <img src="static/images/overallImg/leiji_icon.png" alt="">
        </div>
        <div class="info_box">
          <p>累计卡车之家会员数</p>
          <p><count-num :value="infoObj.truckHouseMembers" :setType="setType" v-if="isLoaded"></count-num></p>
        </div>
      </div>
       <div class="rightCenter_b_info igs-flex">
        <div class="img_box igs-flex igs-flex2">
          <img src="static/images/overallImg/youxiao_icon.png" alt="">
        </div>
        <div class="info_box">
          <p>有效会员数</p>
          <p><count-num :value="infoObj.activeMembers" :setType="setType" v-if="isLoaded"></count-num></p>
        </div>
      </div>
       <div class="rightCenter_b_info igs-flex" style="margin-bottom:0;">
        <div class="img_box igs-flex igs-flex2">
          <img src="static/images/overallImg/renzhen_icon.png" alt="">
        </div>
        <div class="info_box">
          <p>副卡认证会员数</p>
          <p><count-num :value="infoObj.sccMembers" :setType="setType" v-if="isLoaded"></count-num></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rightCenter',
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
  },
  data () {
    return {
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '人', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      isLoaded: false, // 数据是否请求完
      infoObj: ''
    }
  },
  created () {
  },
  mounted () {
    this.cumulativeMemberCount()
  },
  methods: {
    //     7. 累计会员数
    // GET /cumulativeMemberCount
    cumulativeMemberCount () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thDataBS/cumulativeMemberCount', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.infoObj = res.data
          this.isLoaded = true
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.cumulativeMemberCount()
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

.rightCenter {
  text-align center
  width: 100%
  height:pxtovh(330)
  color: #97a8f7
  background: url("https://img.gdoil.cn/cockpit/static/images/overallImg/6.png") no-repeat
  -webkit-background-size: 100% 100%
  background-size: 100% 100%
  padding:pxtovh(47) pxtovh(20)  pxtovh(20) pxtovh(20);
  position:relative;
  margin-top:pxtovh(14)
  .title{
    width:pxtovh(156);
    height:pxtovh(34);
    line-height: pxtovh(34);
    font-size:20px;
    font-weight:400;
    color:rgba(169,184,255,1);
    position:absolute;
    top:0;
    left:50%;
    margin-left:pxtovh(-78);
  }
  .rightCenter_b{
    .rightCenter_b_info{
      height:pxtovh(75)
      background:#060E41;
      margin-bottom:pxtovh(10)
      padding:pxtovh(10) 0;
      .img_box{
        width:pxtovh(106)
        position:relative;
        border-right:2px solid rgba(0,5,48,1);
        img{
          width:pxtovh(30);
          position:absolute;
          top:50%;
          left:50%;
          transform :translate(-50%,-50%);
        }
      }
      .info_box{
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
        padding-left:pxtovh(40);
        font-size:pxtovh(12);
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(151,168,247,1);
        line-height :pxtovh(24)
        text-align :left;
        .num{
          font-size:pxtovh(30);
          font-family:LcdD;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
      }

    }
  }

}
</style>
