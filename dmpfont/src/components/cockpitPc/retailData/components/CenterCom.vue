<template>
  <div class="center-com-wrapper">
    <total-retail></total-retail>
    <sales-trend></sales-trend>
    <daily-average></daily-average>
  </div>
</template>

<script>
import TotalRetail from './center/TotalRetail'
import SalesTrend from './center/SalesTrend'
import DailyAverage from './center/DailyAverage'
export default {
  name: 'CenterCom',
  components: {
    TotalRetail,
    SalesTrend,
    DailyAverage
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.center-com-wrapper {
  width: 100%
  height: vh(270)
  margin-bottom vh(15)
  display flex
}
</style>
