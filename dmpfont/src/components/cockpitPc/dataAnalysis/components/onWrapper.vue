<template>
  <div class="on-Wrapper">
    <menber-oil></menber-oil>
    <menber-none-oil></menber-none-oil>
  </div>
</template>

<script>
import menberOil from './menberOil'
import menberNoneOil from './menberNoneOil'
export default {
  name: 'onWrapper',
  components: {
    menberOil,
    menberNoneOil
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .on-Wrapper {
    width: 100%
    height: pxtovh(245)
    display flex
  }
</style>
