<template>
  <div class="center-wrapper">
    <focus-info></focus-info>
    <map-detail></map-detail>
  </div>
</template>

<script>
import focusInfo from './focusInfo'
import mapDetail from './mapDetail'
export default {
  name: 'rightCom',
  components: {
    focusInfo,
    mapDetail
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .center-wrapper {
    width: pxtovw(850)
    color: #97a8f7
    margin-right pxtovw(16)
  }
</style>
