<template>
  <div class="bottomCom igs-flex igs-flex4">
     <div class="topLeft">
        <listCommon :topList ="lubricatingOil" :bgImg="bgImg1" :type="7"></listCommon>
    </div>
     <div class="topCenter">
        <listCommon :topList ="chineseWolfberry" :bgImg="bgImg2" :type="8"></listCommon>
    </div>
     <div class="topRight">
        <listCommon :topList ="bathOfGlass" :bgImg="bgImg3" :type="9"></listCommon>
    </div>
  </div>
</template>

<script>
import listCommon from './listCommon'
export default {
  name: 'bottomCom',
  props: ['cityCode'],
  data () {
    return {
      lubricatingOil: [], // 润滑油集合（下）
      chineseWolfberry: [], // 宁夏枸杞集合
      bathOfGlass: [], // 玻璃水集合
      bgImg1: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/2/7.png',
      bgImg2: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/2/8.png',
      bgImg3: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/2/9.png'
    }
  },
  created () {
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
  mounted () {
    console.log(this.cityCode)
    if (this.cityCode !== '') {
      this.initialize()
    }
  },
  methods: {
    initialize () {
      this.lubricatingOilfun(0)
      this.chineseWolfberryfun(0)
      this.bathOfGlassfun(0)
    },
    // 请求地址：post /CoreProductRanking/lubricatingOil 润滑油排行
    lubricatingOilfun (sort) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/CoreProductRanking/lubricatingOil', {
        number: this.cityCode,
        sort: sort
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data.lubricatingOil
          var dataList = []
          for (var i = 0; i < data.length; i++) {
            dataList.push({
              name: data[i].name,
              count: this.$util.fixedamount(data[i].count),
              Increase: data[i].Increase,
              sales: this.$util.fixedamount(data[i].sales)
            })
          }
          console.log(dataList)
          this.lubricatingOil = dataList
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 请求地址： post /CoreProductRanking/chineseWolfberry 宁夏枸杞
    chineseWolfberryfun (sort) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/CoreProductRanking/chineseWolfberry', {
        number: this.cityCode,
        sort: sort
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data.chineseWolfberry
          var dataList = []
          for (var i = 0; i < data.length; i++) {
            dataList.push({
              name: data[i].name,
              count: this.$util.fixedamount(data[i].count),
              Increase: data[i].Increase,
              sales: this.$util.fixedamount(data[i].sales)
            })
          }
          console.log(dataList)
          this.chineseWolfberry = dataList
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 请求地址：post /CoreProductRanking/bathOfGlass 玻璃水
    bathOfGlassfun (sort) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/CoreProductRanking/bathOfGlass', {
        number: this.cityCode,
        sort: sort
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data.bathOfGlass
          var dataList = []
          for (var i = 0; i < data.length; i++) {
            dataList.push({
              name: data[i].name,
              count: this.$util.fixedamount(data[i].count),
              Increase: data[i].Increase,
              sales: this.$util.fixedamount(data[i].sales)
            })
          }
          console.log(dataList)
          this.bathOfGlass = dataList
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
  margin-top:vh(15);
  .topLeft,.topCenter,.topRight{
       height:pxtovh(319);
       width:pxtovw(619);
    }
}
</style>
