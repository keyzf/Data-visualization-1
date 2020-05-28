<template>
  <div class="topCom igs-flex igs-flex4">
    <div class="igs-flex">
      <img class='tab_img' src="https://img.gdoil.cn/cockpit/static/images/washCarCard/1_icon.png" alt="">
      <div class="tab_cont">
        <div>分配卡数</div>
        <!-- <div>{{dataObj.distribution || 0}}</div> -->
        <count-num :value="dataObj.distribution" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="igs-flex">
      <img class='tab_img' src="https://img.gdoil.cn/cockpit/static/images/washCarCard/2_icon.png" alt="">
      <div class="tab_cont">
        <div>激活卡数</div>
        <!-- <div>{{dataObj.activation || 0}}</div> -->
         <count-num :value="dataObj.activation" :setType="setType" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="igs-flex">
      <img class='tab_img' src="https://img.gdoil.cn/cockpit/static/images/washCarCard/3_icon.png" alt="">
      <div class="tab_cont">
        <div>赠送洗车次数</div>
        <!-- <div>{{dataObj.give || 0}}</div> -->
         <count-num :value="dataObj.give" :setType="setType1" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="igs-flex">
      <img class='tab_img' src="https://img.gdoil.cn/cockpit/static/images/washCarCard/4_icon.png" alt="">
      <div class="tab_cont">
        <div>使用洗车次数</div>
        <!-- <div>{{dataObj.use || 0}}</div> -->
        <count-num :value="dataObj.use" :setType="setType1" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="igs-flex">
      <img class='tab_img' src="https://img.gdoil.cn/cockpit/static/images/washCarCard/5_icon.png" alt="">
      <div class="tab_cont">
        <div>使用率</div>
        <count-num :value="(dataObj.usage)*100" :setType="setType2" v-if="isLoaded"></count-num>
      </div>
    </div>
    <div class="igs-flex">
      <img class='tab_img' src="https://img.gdoil.cn/cockpit/static/images/washCarCard/6_icon.png" alt="">
      <div class="tab_cont">
        <div>有效会员数</div>
        <!-- <div>{{dataObj.drive || 0}}</div> -->
        <count-num :value="dataObj.drive" :setType="setType3" v-if="isLoaded"></count-num>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topCom',
  data () {
    return {
      isLoaded: false,
      setType: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '张', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      setType1: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '次', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      setType2: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '%', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      setType3: {
        iscenter: 0, // 文字是否居中,1居中，0不居中，默认居中
        unitname: '人', // 单位
        colortype: 0 // 文字颜色，1蓝色，0白色，默认白色
      },
      dataObj: {}
    }
  },
  created () {
  },
  mounted () {
    this.entirety()
  },
  methods: {
    // 头部数据
    entirety () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/CarWashCardService/overview', {

      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.dataObj = res.data[0]
          this.isLoaded = true
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
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.topCom {
  width:100%
  height:vh(144)
  background :red;
  padding:vw(40) vw(150) 0 vw(150);
  background :url('https://img.gdoil.cn/cockpit/static/images/washCarCard/topBg_icon.png');
  background-size:100% 100%;
  border-bottom:1px solid #5C74D1;
  /deep/ .wrapers{
          .unit-span{
            font-size :pxtovh(14)!important;
            margin-left:pxtovh(5);
          }
      }
  .tab_img{
    width:vw(65);
    height:vh(65);
    margin-right:vw(20)
  }
  .tab_cont{
    font-size:vw(18);
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(169,184,255,1);
    line-height :vh(32)
  }
}
</style>
