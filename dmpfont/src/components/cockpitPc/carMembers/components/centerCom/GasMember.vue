<template>
  <div class="gasmember-wrapper">
    <customer-number></customer-number>
    <consumption-figures></consumption-figures>
  </div>
</template>

<script>
import CustomerNumber from './gasMembers/CustomerNumber'
import ConsumptionFigures from './gasMembers/ConsumptionFigures'
export default {
  name: 'GasMember',
  components: {
    CustomerNumber,
    ConsumptionFigures
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../../assets/css/mixin.styl'
  .gasmember-wrapper {
    height: vh(240)
    display flex
  }
</style>
