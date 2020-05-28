<template>
  <div class="overall-bottom-wrapper">
    <data-focus></data-focus>
    <business-sector></business-sector>
    <turnover></turnover>
    <integral-exchange></integral-exchange>
    <merchant-ranking></merchant-ranking>
  </div>
</template>

<script>
import BusinessSector from './overallBottom/BusinessSector'
import DataFocus from './overallBottom/DataFocus'
import MerchantRanking from './overallBottom/MerchantRanking'
import Turnover from './overallBottom/Turnover'
import IntegralExchange from './overallBottom/IntegralExchange'
export default {
  name: 'overallBottom',
  components: {
    BusinessSector,
    DataFocus,
    MerchantRanking,
    Turnover,
    IntegralExchange
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../assets/css/mixin.styl'
  .overall-bottom-wrapper {
    color: black
    width: 100%
    margin 0 vw(15)
  }
</style>
