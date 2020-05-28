<template>
  <div class="right-wrapper">
    <bar-chart></bar-chart>
    <plot-diagram></plot-diagram>
  </div>
</template>

<script>
import plotDiagram from './plotDiagram'
import barChart from './barChart'
export default {
  name: 'rightCom',
  components: {
    plotDiagram,
    barChart
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
