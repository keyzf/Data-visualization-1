<template>
  <div class="right-wrapper">
    <mem-structure></mem-structure>
    <cumulative-mem></cumulative-mem>
    <value-model></value-model>
  </div>
</template>

<script>
import memStructure from './memStructure'
import cumulativeMem from './cumulativeMem'
import valueModel from './valueModel'
export default {
  name: 'rightCo',
  components: {
    memStructure,
    cumulativeMem,
    valueModel
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.right-wrapper {
  width: pxtovw(430)
  color: #97a8f7
}
</style>
