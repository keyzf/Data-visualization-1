<template>
  <div class="bottom-wrapper">
    <service-statistics-left></service-statistics-left>
    <service-statistics-right></service-statistics-right>
  </div>
</template>

<script>
import serviceStatisticsLeft from './serviceStatisticsLeft'
import serviceStatisticsRight from './serviceStatisticsRight'
export default {
  name: 'leftCom',
  components: {
    serviceStatisticsLeft,
    serviceStatisticsRight
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.bottom-wrapper {
  color: #97a8f7
  margin-right pxtovw(16)
  display flex
}
</style>
