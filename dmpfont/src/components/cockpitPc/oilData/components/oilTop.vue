<template>
  <div class="top-wrapper">
      <num-guns :cityCode="cityCode"></num-guns>
      <sell-retail :cityCode="cityCode"></sell-retail>
      <proportion-stations :cityCode="cityCode"></proportion-stations>
  </div>
</template>

<script>
import numGuns from './numGuns'
import sellRetail from './sellRetail'
import proportionStations from './proportionStations'
export default {
  name: 'oilTop',
  props: {
    cityCode: String
  },
  components: {
    numGuns,
    sellRetail,
    proportionStations
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .top-wrapper {
    width: 100%
    height: pxtovh(200)
    margin-bottom pxtovh(15)
    display flex
  }
</style>
