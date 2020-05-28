<template>
  <div class="bottom-wrapper">
    <self-employed :cityCode="cityCode"></self-employed>
    <full-caliber :cityCode="cityCode"></full-caliber>
    <machine-output :cityCode="cityCode"></machine-output>
    <gross-profit :cityCode="cityCode"></gross-profit>
  </div>
</template>

<script>
import machineOutput from './machineOutput'
import fullCaliber from './fullCaliber'
import grossProfit from './grossProfit'
import selfEmployed from './selfEmployed'
export default {
  name: 'oilBottom',
  props: {
    cityCode: String
  },
  components: {
    selfEmployed,
    fullCaliber,
    machineOutput,
    grossProfit
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .bottom-wrapper {
    width: 100%;
    height: pxtovh(205)
    margin pxtovh(13) 0 pxtovh(0)
    display flex
  }
</style>
