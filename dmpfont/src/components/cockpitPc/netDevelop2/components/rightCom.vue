<template>
  <div class="right-wrapper">
    <plot-diagram></plot-diagram>
    <bar-chart></bar-chart>
    <coverage-rate></coverage-rate>
  </div>
</template>

<script>
import plotDiagram from './plotDiagram'
import barChart from './barChart'
import coverageRate from './coverageRate'
export default {
  name: 'rightCom',
  components: {
    plotDiagram,
    barChart,
    coverageRate
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.right-wrapper {
  width: pxtovw(500)
  color: #97a8f7
}
</style>
