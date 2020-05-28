<template>
  <div class="centerCom igs-flex igs-flex4">
     <div class="topLeft">
        <listCommon :topList ="tianquanChangbaiMountain" :bgImg="bgImg1" :type="4"></listCommon>
    </div>
     <div class="topCenter">
        <listCommon :topList ="laimaoWine" :bgImg="bgImg2" :type="5"></listCommon>
    </div>
     <div class="topRight">
        <listCommon :topList ="moonDew" :bgImg="bgImg3" :type="6"></listCommon>
    </div>
  </div>
</template>

<script>
import listCommon from './listCommon'
export default {
  name: 'centerCom',
  props: ['cityCode'],
  data () {
    return {
      tianquanChangbaiMountain: [], // 长白山天泉集合（中）
      laimaoWine: [], // 赖茅酒集合
      moonDew: [], // 月欧露集合
      bgImg1: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/2/4.png',
      bgImg2: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/2/5.png',
      bgImg3: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/2/6.png'
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
      this.tianquanChangbaiMountainfun(0)
      this.laimaoWinefun(0)
      this.moonDewfun(0)
    },
    // 请求地址  post /CoreProductRanking/tianquanChangbaiMountain 长白山天泉排行
    tianquanChangbaiMountainfun (sort) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/CoreProductRanking/tianquanChangbaiMountain', {
        number: this.cityCode,
        sort: sort
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data.tianquanChangbaiMountain
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
          this.tianquanChangbaiMountain = dataList
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 请求地址：post /CoreProductRanking/laimaoWine 赖茅酒排行
    laimaoWinefun (sort) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/CoreProductRanking/laimaoWine', {
        number: this.cityCode,
        sort: sort
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data.laimaoWine
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
          this.laimaoWine = dataList
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 请求地址：post /CoreProductRanking/moonDew 欧露纸
    moonDewfun (sort) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/CoreProductRanking/moonDew', {
        number: this.cityCode,
        sort: sort
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data.moonDew
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
          this.moonDew = dataList
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
.centerCom {
  width:100%
  color: #97a8f7
  margin-top:vh(15);
  .topLeft,.topCenter,.topRight{
       height:pxtovh(319);
       width:pxtovw(619);
    }
}
</style>
