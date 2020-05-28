<template>
  <div class="topCom igs-flex igs-flex4">
     <div class="topLeft">
        <listCommon :topList =" topList1" :bgImg="bgImg1"></listCommon>
    </div>
     <div class="topCenter1">
        <listCommon :topList =" topList2" :bgImg="bgImg2"></listCommon>
    </div>
     <div class="topCenter2">
        <listCommon :topList =" topList3" :bgImg="bgImg3"></listCommon>
    </div>
    <div class="topRight">
        <listCommon :topList =" topList4" :bgImg="bgImg4"></listCommon>
    </div>
  </div>
</template>

<script>
import listCommon from './listCommon'
export default {
  name: 'topCom',
  props: ['cityCode'],
  data () {
    return {
      topList1: [],
      topList2: [],
      topList3: [],
      topList4: [],
      bgImg1: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/1/1.png',
      bgImg2: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/1/2.png',
      bgImg3: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/1/3.png',
      bgImg4: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/1/4.png'
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
  created () {
  },
  mounted () {
    console.log(this.cityCode)
    if (this.cityCode !== '') {
      this.initialize()
    }
  },
  methods: {
    initialize () {
      this.basicRanking()
      this.basicRetailRanking()
      this.basicGroupRanking()
      this.caliberGrossProfit()
    },
    // 接口名称 ：Post /commoditySalesVolume/basicRanking 当月基础品类营业额排名
    basicRanking () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/commoditySalesVolume/basicRanking', {
        number: this.cityCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data
          var dataList = []
          for (var i = 0; i < data.length; i++) {
            dataList.push({
              name: data[i].name,
              count: this.$util.fixedamount(data[i].count)
            })
          }

          this.topList1 = dataList
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 接口名称 ：Post /commoditySalesVolume/basicRetailRanking 当月基础品类零售营业额排名
    basicRetailRanking () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/commoditySalesVolume/basicRetailRanking', {
        number: this.cityCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data
          var dataList = []
          for (var i = 0; i < data.length; i++) {
            dataList.push({
              name: data[i].name,
              count: this.$util.fixedamount(data[i].count)
            })
          }

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
    // 接口名称 ：Post  /commoditySalesVolume/basicGroupRanking 当月基础品类团购营业额排名
    basicGroupRanking () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/commoditySalesVolume/basicGroupRanking', {
        number: this.cityCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data
          var dataList = []
          for (var i = 0; i < data.length; i++) {
            dataList.push({
              name: data[i].name,
              count: this.$util.fixedamount(data[i].count)
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
    // 接口名称 ：Post /commoditySalesVolume/caliberGrossProfit  当月全口径毛利排名
    caliberGrossProfit () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/commoditySalesVolume/caliberGrossProfit', {
        number: this.cityCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data
          var dataList = []
          for (var i = 0; i < data.length; i++) {
            dataList.push({
              name: data[i].name,
              count: this.$util.fixedamount(data[i].count)
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
.topCom {
  width:100%
  color: #97a8f7
  .topLeft,.topCenter1,.topCenter2,.topRight{
       height:pxtovh(336);
       width:pxtovw(458);
    //    background red
    }
}
</style>
