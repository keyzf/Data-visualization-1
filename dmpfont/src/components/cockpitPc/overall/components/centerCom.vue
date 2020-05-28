<template>
  <div class="center-wrapper igs-flex igs-flex11 ">
    <focus-info></focus-info>
    <map-detail></map-detail>
    <center-bottom></center-bottom>
  </div>
</template>

<script>
import focusInfo from './focusInfo'
import mapDetail from './mapDetail'
import centerBottom from './centerBottom'
export default {
  name: 'rightCom',
  components: {
    focusInfo,
    mapDetail,
    centerBottom
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .center-wrapper {
    height:100%;
    width:50%
    color: #97a8f7
    margin:0 pxtovw(14)
  }
</style>
