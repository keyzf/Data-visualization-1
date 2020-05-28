<template>
  <div class="homeIndex">
      <div class="main-content">
           <div class="homeTop">
                <p class="title">省公司</p>
                <div class="homeTop_cont igs-flex igs-flex9">
                    <div class="tabCont" v-for="(item,index) in  tabListTop" :key="index"  @click="goUrl(item.goUrl)">
                         <img class="tabImg" :src="item.imgSrc" alt="">
                         <p>{{item.name}}</p>
                    </div>
                </div>
            </div>
            <div class="homeBottom">
                <p class="title">市公司</p>
                <div class="homeTop_cont igs-flex igs-flex9">
                    <div class="tabCont" v-for="(item,index) in  tabListBottom" :key="index" @click="goUrl(item.goUrl)">
                         <img class="tabImg" :src="item.imgSrc" alt="">
                         <p>{{item.name}}</p>
                    </div>
                </div>
            </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'homeIndex',
  data () {
    return {
      tabListTop: [
        {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/1_icon.png',
          name: '非油品数据分析大屏',
          goUrl: '/cockpitPc/noneOilScreen/index'
        }, {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/2_icon.png',
          name: '零售数据分析大屏',
          goUrl: '/cockpitPc/oilData/oilDataIndex'
        }, {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/3_icon.png',
          name: '卡车之家会员分析大屏',
          goUrl: '/cockpitPc/trackHomeScreen/index'
        }, {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/4_icon.png',
          name: '汽油会员分析大屏',
          goUrl: '/cockpitPc/carMembers/carMembersIndex'
        }, {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/5_icon.png',
          name: '卡车之家网络发展大屏',
          goUrl: '/cockpitPc/netDevelop/net-index'
        }, {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/6_icon.png',
          name: '卓越员工排名 ',
          goUrl: '/cockpitPc/staffRank/index'
        }, {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/7_icon.png',
          name: '数字化产品客户开发情况',
          goUrl: '/cockpitPc/washCarCard/index'
        }
      ],
      tabListBottom: [
        {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/8_icon.png',
          name: '非油数据分析大屏',
          goUrl: '/cockpitPc/noneOilScreenCity/index'
        }, {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/9_icon.png',
          name: '零售数据分析大屏',
          goUrl: '/cockpitPc/oilDataCity/oilDataIndex'
        },
        //  {
        //   imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/10_icon.png',
        //   name: '卡车之家会员分析大屏',
        //   goUrl: '/cockpitPc/truckHomeData/index'
        // }, {
        //   imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/11_icon.png',
        //   name: '汽油会员分析大屏',
        //   goUrl: '/cockpitPc/gasoline/gasolineIndex'
        // }, {
        //   imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/12_icon.png',
        //   name: '零售分析大屏',
        //   goUrl: '/cockpitPc/retailData/retailDataIndex'
        // },
        {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/13_icon.png',
          name: '非油品营业额分析大屏',
          goUrl: '/cockpitPc/turnoverAnalysis/index'
        }, {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/14_icon.png',
          name: '经营部核心商品排行榜',
          goUrl: '/cockpitPc/businessDepartment/index'
        }, {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/15_icon.png',
          name: '油站核心商品排行榜',
          goUrl: '/cockpitPc/coreProductList/index'
        }, {
          imgSrc: 'https://img.gdoil.cn/cockpit/static/images/homeImg/16_icon.png',
          name: '核心商品动销未零',
          goUrl: '/cockpitPc/coreProduct0/index'
        }
      ]
    }
  },
  created () {
    window.document.title = '驾驶舱首页'
  },
  methods: {
    goUrl (goUrl) {
      this.$router.push({path: goUrl})
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
@import '../../../assets/css/mixin.styl'
.homeIndex{
  max-width vw(1920)
  max-height vh(1080)
  background-color #E6EAEE
  margin 0 auto
  height 100%
  overflow hidden
  position:relative;
}
  .main-content{
    width 100%
    padding:0 vw(20) 0 vw(20)
    position:absolute;
    top:50%;
    transform :translate(0,-50%)
    .homeTop,.homeBottom{
        height:vh(420);
        width:100%;
        border-radius:vh(20) vw(20) vh(20) vw(20);
        background:#fff;
        .title{
            line-height :vh(60);
            font-size:vw(18);
            font-weight:bold;
            padding: 0 vw(20) 0 vw(20);
            border-bottom:vh(1) solid #E6EAEE
        }
        .homeTop_cont,.homeBottom_cont{
            width:100%;
            overflow-x :hidden;
            height:vh(360)
            padding-bottom:vh(20)
            .tabCont{
                padding-top:vh(25)
                width:14%;
                text-align:center;
                height:vh(160)
                .tabImg{
                    width:vw(90);
                    // height:vh(100);
                }
                p{
                    line-height:vh(24);
                    font-size:vw(14)
                }
            }

        }
    }
    .homeTop{
        margin-bottom:vh(20)
    }
  }

</style>
