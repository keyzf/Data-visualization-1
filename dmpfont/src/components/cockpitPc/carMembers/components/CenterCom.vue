<template>
  <div class="center-warpper">
    <membership-profile></membership-profile>
    <map-derail></map-derail>
    <washcar-times></washcar-times>
    <!-- <gas-member></gas-member> -->
  </div>
</template>

<script>
import MembershipProfile from './centerCom/MembershipProfile'
import MapDerail from './centerCom/MapDerail'
// import GasMember from './centerCom/GasMember'
import WashcarTimes from './centerCom/WashcarTimes'
export default {
  name: 'centerCom',
  components: {
    MembershipProfile,
    MapDerail,
    // GasMember,
    WashcarTimes
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .center-warpper {
    margin-right vw(15)
  }
</style>
