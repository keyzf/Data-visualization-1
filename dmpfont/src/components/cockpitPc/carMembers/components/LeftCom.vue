<template>
  <div class="left-warpper">
    <station-classification></station-classification>
    <newloyal-customers></newloyal-customers>
    <customerdata-changes></customerdata-changes>
  </div>
</template>

<script>
import StationClassification from './leftCom/StationClassification'
import NewloyalCustomers from './leftCom/NewloyalCustomers'
import CustomerdataChanges from './leftCom/CustomerdataChanges'
export default {
  name: 'leftCom',
  components: {
    StationClassification,
    NewloyalCustomers,
    CustomerdataChanges
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .left-warpper {
    margin-right vw(15)
  }
</style>
