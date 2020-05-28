<template>
  <div class="left-wrapper">
    <today-info></today-info>
    <mem-top></mem-top>
    <iscosity-index></iscosity-index>
  </div>
</template>

<script>
import todayInfo from './todayInfo'
import memTop from './memTop'
import iscosityIndex from './iscosityIndex'
export default {
  name: 'leftCo',
  components: {
    todayInfo,
    memTop,
    iscosityIndex
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.left-wrapper {
  width: pxtovw(460)
  color: #97a8f7
  margin-right pxtovw(15)
}
</style>
