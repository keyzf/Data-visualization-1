<template>
  <div class="data-focus-wrapper">
    <eyes-datas></eyes-datas>
    <member-trend></member-trend>
  </div>
</template>

<script>
import EyesDatas from './DataFocus/EyesDatas'
import MemberTrend from './DataFocus/MemberTrend'
export default {
  name: 'DataFocus',
  components: {
    EyesDatas,
    MemberTrend
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .data-focus-wrapper {
    height: vh(380)
    margin-bottom vh(10)
    border-radius: 6px;
    background-color: #FFFFFF
  }
</style>
