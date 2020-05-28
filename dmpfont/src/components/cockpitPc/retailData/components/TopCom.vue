<template>
  <div class="top-com-wrapper">
    <guns-number></guns-number>
    <average-perday></average-perday>
    <stations-number></stations-number>
  </div>
</template>

<script>
import GunsNumber from './top/GunsNumber'
import AveragePerday from './top/AveragePerday'
import StationsNumber from './top/StationsNumber'
export default {
  name: 'TopCom',
  components: {
    GunsNumber,
    AveragePerday,
    StationsNumber
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.top-com-wrapper {
  width: 100%
  height: vh(201)
  margin-bottom vh(15)
  display flex
}
</style>
