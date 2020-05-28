<template>
  <div class="top-wrapper">
    <foucus-data></foucus-data>
    <member-dataPie></member-dataPie>
  </div>
</template>

<script>
import foucusData from './foucusData'
import memberDataPie from './memberDataPie'
export default {
  name: 'gasolineTop',
  components: {
    foucusData,
    memberDataPie
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .top-wrapper {
    color: #a9b8ff
    height: vh(200)
    width: 100%
    margin-bottom vh(15)
    display flex
  }
</style>
