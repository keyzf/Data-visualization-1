<template>
  <div class="overallData igs-flex igs-flex9">
    <overallTop></overallTop>
    <overall-bottom></overall-bottom>
  </div>
</template>
<script>
export default {
  name: 'overallData',
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
    overallTop: require('@/components/dataBoard/overallData/overallTop.vue').default,
    overallBottom: require('@/components/dataBoard/overallData/overallBottom.vue').default
  }
}
</script>
<style lang="stylus" scoped>

</style>
