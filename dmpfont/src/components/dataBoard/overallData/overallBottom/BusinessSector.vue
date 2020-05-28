<template>
  <div class="business-sector-wrapper">
    <common-header>业务板块</common-header>
    <div class="item-wrapper">
      <div class="item"><img src="https://img.gdoil.cn/cockpit/static/images/overallData/addoilcar.png" alt=""></div>
      <div class="item"><img src="https://img.gdoil.cn/cockpit/static/images/overallData/papercenter.png" alt=""></div>
      <div class="item"><img src="https://img.gdoil.cn/cockpit/static/images/overallData/insurance.png" alt=""></div>
      <div class="item"><img src="https://img.gdoil.cn/cockpit/static/images/overallData/electronic-ticket.png" alt=""></div>
      <div class="item"><img src="https://img.gdoil.cn/cockpit/static/images/overallData/car-home.png" alt=""></div>
      <div class="item"><img src="https://img.gdoil.cn/cockpit/static/images/overallData/shopping-mall.png" alt=""></div>
      <div class="item"><img src="https://img.gdoil.cn/cockpit/static/images/overallData/superstar-member.png" alt=""></div>
    </div>
  </div>
</template>

<script>
import CommonHeader from './CommonHeader'
export default {
  name: 'BusinessSector',
  components: {
    CommonHeader
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .business-sector-wrapper {
    height: vh(115)
    margin-bottom vh(10)
    border-radius: 6px;
    background-color: #FFFFFF
    padding-top vh(15)
    padding-left vw(15)
    padding-right vw(15)
    .item-wrapper {
      display flex
      margin-top vh(10)
      justify-content space-between
      .item {
        img {
          width: vw(160)
          height: auto
        }
      }
    }
  }
</style>
