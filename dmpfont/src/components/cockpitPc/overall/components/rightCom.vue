<template>
  <div class="right-wrapper igs-flex igs-flex4 igs-flex11">
    <right-top></right-top>
    <right-center></right-center>
    <right-bottom></right-bottom>
  </div>
</template>

<script>
import rightBottom from './rightBottom'
import rightTop from './rightTop'
import rightCenter from './rightCenter'
export default {
  name: 'rightCom',
  components: {
    rightBottom,
    rightTop,
    rightCenter
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.right-wrapper {
  height:100%;
  width: 25%!important;
  color: #97a8f7
}
</style>
