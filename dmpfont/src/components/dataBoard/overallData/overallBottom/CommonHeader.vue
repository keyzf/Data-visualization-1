<template>
  <div class="common-header-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CommonHeader'
}
</script>

<style scoped lang="stylus">
@import '../../../../assets/css/mixin.styl'
.common-header-wrapper {
  color: #333333
  font-size: vw(18)
  font-weight: bold
  line-height: vh(27)
}
</style>
