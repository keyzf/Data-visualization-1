<template>
  <div class="right-warpper">
    <using-integral></using-integral>
    <cumulative-membership></cumulative-membership>
    <member-andsales></member-andsales>
    <!-- <loyal-customers></loyal-customers> -->
  </div>
</template>

<script>
import UsingIntegral from './rightCom/UsingIntegral'
import CumulativeMembership from './rightCom/CumulativeMembership'
import MemberAndsales from './rightCom/MemberAndsales'
// import LoyalCustomers from './rightCom/LoyalCustomers'
export default {
  name: 'rightCom',
  components: {
    UsingIntegral,
    CumulativeMembership,
    MemberAndsales
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .right-warpper {
  }
</style>
