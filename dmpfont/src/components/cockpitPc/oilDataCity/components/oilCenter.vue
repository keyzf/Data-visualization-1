<template>
  <div class="oil-center-wrapper">
    <div class="top">
      <gasoline-trend :cityCode="cityCode"></gasoline-trend>
      <diesel-trend :cityCode="cityCode"></diesel-trend>
    </div>
    <div class="bottom">
      <gasoline-trend-all :cityCode="cityCode"></gasoline-trend-all>
      <diesel-trend-all :cityCode="cityCode"></diesel-trend-all>
    </div>
  </div>
</template>

<script>
import dieselTrend from './dieselTrend'
import gasolineTrend from './gasolineTrend'
import dieselTrendAll from './dieselTrendAll'
import gasolineTrendAll from './gasolineTrendAll'
export default {
  name: 'oilCenter',
  props: {
    cityCode: String
  },
  components: {
    gasolineTrend,
    dieselTrend,
    gasolineTrendAll,
    dieselTrendAll
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .oil-center-wrapper {
    width: 100%;
    height: pxtovh(555)
    .top {
      display flex
      margin-bottom pxtovh(15)
    }
    .bottom {
      display flex
    }
  }
</style>
