<template>
  <div class="bottomCom igs-flex igs-flex4">
     <div class="topLeft">
        <listCommon :topList ="topList1" :bgImg="bgImg1"  :type="1"></listCommon>
    </div>
     <div class="topCenter1">
        <listCommon :topList ="topList2" :bgImg="bgImg2"  :type="2"></listCommon>
    </div>
     <div class="topCenter2">
        <listCommon :topList ="topList3" :bgImg="bgImg3"  :type="3"></listCommon>
    </div>
    <div class="topRight">
        <listCommon :topList ="topList4" :bgImg="bgImg4"  :type="4"></listCommon>
    </div>
  </div>
</template>

<script>
import listCommon from './listCommonB'
export default {
  name: 'bottomCom',
  props: ['cityCode'],
  data () {
    return {
      topList1: [],
      topList2: [],
      topList3: [],
      topList4: [],
      bgImg1: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/1/7.png',
      bgImg2: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/1/8.png',
      bgImg3: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/1/9.png',
      bgImg4: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/1/10.png'
    }
  },
  created () {
  },
  mounted () {
    if (this.cityCode !== '') {
      this.initialize()
    }
  },
  watch: {
    cityCode: {
      handler (newValue, oldValue) {
        this.cityCode = newValue
        console.log(this.cityCode)
        this.initialize()
      },
      deep: true
    }
  },
  methods: {
    initialize () {
      this.basicIncrement()
      this.basicIncrease()
      this.basicReduction()
      this.basicDecline()
    },
    // 接口名称：Post /commoditySalesVolume/basicIncrement 当月基础品类营业额同比增量TOP10
    basicIncrement () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/commoditySalesVolume/basicIncrement', {
        number: this.cityCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data
          var dataList = []
          for (var i = 0; i < data.length; i++) {
            dataList.push({
              name: data[i].name,
              count: data[i].count,
              zengfu: data[i].increment
            })
          }
          this.topList1 = dataList
          // console.log(this.topList1)
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 接口名称：Post /commoditySalesVolume/basicIncrease 当月基础品类营业额同比增幅TOP10
    basicIncrease () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/commoditySalesVolume/basicIncrease', {
        number: this.cityCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data
          // console.log(data)
          var dataList = []
          for (var i = 0; i < data.length; i++) {
            dataList.push({
              name: data[i].name,
              count: data[i].count,
              zengfu: data[i].increment
            })
          }
          // console.log(dataList)
          this.topList2 = dataList
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 接口名称：Post /commoditySalesVolume/basicReduction当月基础品类营业额同比降量TOP10
    basicReduction () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/commoditySalesVolume/basicReduction', {
        number: this.cityCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data
          var dataList = []
          for (var i = 0; i < data.length; i++) {
            dataList.push({
              name: data[i].name,
              count: data[i].count,
              zengfu: data[i].reduction
            })
          }

          this.topList3 = dataList
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 接口名称：Post /commoditySalesVolume/basicDecline  当月基础品类营业额同比降幅TOP10
    basicDecline () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/commoditySalesVolume/basicDecline', {
        number: this.cityCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data
          var dataList = []
          for (var i = 0; i < data.length; i++) {
            dataList.push({
              name: data[i].name,
              count: data[i].count,
              zengfu: data[i].decline
            })
          }

          this.topList4 = dataList
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    }
  },
  components: {
    listCommon
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.bottomCom {
  width:100%
  color: #97a8f7
  .topLeft,.topCenter1,.topCenter2,.topRight{
       height:pxtovh(353);
       width:pxtovw(458);
    }
}
</style>
