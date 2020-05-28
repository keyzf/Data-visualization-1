<template>
  <div class="bottom-com-wrapper">
    <daily-sales></daily-sales>
    <gasoline-daily></gasoline-daily>
    <diesel-daily></diesel-daily>
  </div>
</template>

<script>
import DailySales from './bottom/DailySales'
import GasolineDaily from './bottom/GasolineDaily'
import DieselDaily from './bottom/DieselDaily'
export default {
  name: 'BottomCom',
  components: {
    DailySales,
    GasolineDaily,
    DieselDaily
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.bottom-com-wrapper {
  width: 100%
  height: vh(489)
  display flex
}
</style>
