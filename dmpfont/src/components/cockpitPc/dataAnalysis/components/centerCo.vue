<template>
  <div class="center-wrapper">
    <main-focus></main-focus>
    <effective-member></effective-member>
    <year-on></year-on>
    <on-wrapper></on-wrapper>
  </div>
</template>

<script>
import mainFocus from './mainFocus'
import effectiveMember from './effectiveMember'
import yearOn from './yearOn'
import onWrapper from './onWrapper'
export default {
  name: 'rightCo',
  components: {
    mainFocus,
    effectiveMember,
    yearOn,
    onWrapper
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .center-wrapper {
    width: pxtovw(963)
    color: #97a8f7
    margin-right pxtovw(15)
  }
</style>
