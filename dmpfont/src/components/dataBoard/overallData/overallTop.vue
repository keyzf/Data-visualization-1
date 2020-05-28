<template>
  <div class="overallTop">
    <section class="cont_top igs-flex igs-flex6" >
        <overallTopLeft></overallTopLeft>
        <overallTopCenter></overallTopCenter>
        <overallTopRight></overallTopRight>
    </section>
  </div>
</template>
<script>
export default {
  name: 'overallTop',
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  components: {
    overallTopLeft: require('@/components/dataBoard/overallData/overallTopLeft.vue').default,
    overallTopCenter: require('@/components/dataBoard/overallData/overallTopCenter.vue').default,
    overallTopRight: require('@/components/dataBoard/overallData/overallTopRight.vue').default
  }
}
</script>
<style lang="stylus" scoped>
 @import '../../../assets/css/mixin.styl'
    .overallTop{
        width:100%;
        .cont_top{
            width:100%;
            padding:vh(15) vw(15);
        }
    }
</style>
