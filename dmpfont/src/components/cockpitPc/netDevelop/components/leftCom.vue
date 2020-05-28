<template>
  <div class="left-wrapper">
    <!--<pie-chart></pie-chart>-->
    <table-chart></table-chart>
  </div>
</template>

<script>
// import pieChart from './pieChart'
import tableChart from './tableChart'
export default {
  name: 'leftCom',
  components: {
    // pieChart,
    tableChart
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.left-wrapper {
  width: pxtovw(500)
  color: #97a8f7
  margin-bottom pxtovh(20)
  margin-right pxtovw(17)
}
</style>
