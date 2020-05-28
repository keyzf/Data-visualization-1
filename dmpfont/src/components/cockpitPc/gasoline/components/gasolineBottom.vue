<template>
  <div class="bottom-wrapper">
    <region-ranking></region-ranking>
    <station-ranking></station-ranking>
  </div>
</template>

<script>
import regionRanking from './regionRanking'
import stationRanking from './stationRanking'
export default {
  name: 'gasolineBottom',
  components: {
    regionRanking,
    stationRanking
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .bottom-wrapper {
    color: #a9b8ff
    height: vh(442)
    width: 100%
    margin-bottom vh(15)
    display flex
  }
</style>
