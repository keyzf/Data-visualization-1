<template>
  <div class="current">
    <div class="current_cont igs-flex igs-flex4">
      <div class="cont">
        <p>金牌会员</p>
        <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
      </div>
      <div class="cont">
        <p>银牌会员</p>
         <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
      </div>
      <div class="cont">
        <p>普通会员</p>
         <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
      </div>
      <div class="cont">
        <p>新增金牌会员</p>
         <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
      </div>
      <div class="cont">
        <p>新增有效会员</p>
         <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
      </div>
      <div class="cont">
        <p>本年度潜在有效会员</p>
         <count-num :value="12345" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'current',
  data () {
    return {
      isLoaded: true,
      memberList: [],
      validMemberList: [],
      dataName: [],
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '万人', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      }
    }
  },
  created () {
  },
  mounted () {
    // this.memberStructureCountList()
  },
  methods: {
    //     6. 会员结构数列表
    // GET /memberStructureCountList
    memberStructureCountList () {
      this.memberList = []
      this.validMemberList = []
      this.dataName = []
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thDataBS/memberStructureCountList', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var memberList = res.data.memberList
          for (var i = 0; i < memberList.length; i++) {
            this.memberList.push(memberList[i].count)
            this.dataName.push(memberList[i].name)
          }
          console.log('this.dataName' + this.dataName)
          var validMemberList = res.data.validMemberList
          for (var j = 0; j < validMemberList.length; j++) {
            this.validMemberList.push(validMemberList[j].count)
          }
          // console.log(this.validMemberList)
          this.drawChart()
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.memberStructureCountList()
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
    }

  },
  components: {
    CountNum: require('@/components/cockpitPc/common/countNum.vue').default
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
.current{
  text-align center
  width vw(1360)
  height vh(180)
  color #97a8f7
  background url('../../../../../static/images/truckHomeData/2_icon.png') no-repeat
  -webkit-background-size 100% 100%
  background-size 100% 100%
  padding vh(47) vw(15) vh(15) vw(15)
  position relative
  float right
  .current_cont{
    padding-top:vh(15);
    height:100%;
    .cont{
      height:100%;
      width:vw(200);
      background #060E41
      padding:0 vw(25)
      /deep/ .wrapers{
          .unit-span{
            font-size :pxtovh(14)!important;
            margin-left:pxtovh(5)!important;
            color:#A9B8FF!important;
          }
      }
      p{
        text-align:left
        font-size:16px;
        font-family:Source Han Sans CN;
        font-weight:bold;
        color:rgba(169,184,255,1);
        line-height :vh(40);
      }
    }
  }
}
</style>
