<template>
  <div class="left-wrapper igs-flex igs-flex4 igs-flex11">
    <left-top></left-top>
    <left-center></left-center>
    <left-bottom></left-bottom>
  </div>
</template>

<script>
import leftTop from './leftTop'
import leftCenter from './leftCenter'
import leftBottom from './leftBottom'
export default {
  name: 'leftCom',
  components: {
    leftTop,
    leftBottom,
    leftCenter
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.left-wrapper {
  height:100%;
  width:25%
  color: #97a8f7
}
</style>
