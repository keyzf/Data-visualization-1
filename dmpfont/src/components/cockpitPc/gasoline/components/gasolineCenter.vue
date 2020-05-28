<template>
  <div class="center-wrapper">
    <membership-changes></membership-changes>
    <membership-gasoline></membership-gasoline>
    <new-members></new-members>
  </div>
</template>

<script>
import membershipChanges from './membershipChanges'
import membershipGasoline from './membershipGasoline'
import newMembers from './newMembers'
export default {
  name: 'gasolineCenter',
  components: {
    membershipChanges,
    membershipGasoline,
    newMembers
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .center-wrapper {
    color: #a9b8ff
    height: vh(315)
    width: 100%
    margin-bottom vh(15)
    display flex
  }
</style>
