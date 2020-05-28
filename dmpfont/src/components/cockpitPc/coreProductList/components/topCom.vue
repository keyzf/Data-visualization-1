<template>
  <div class="topCom igs-flex igs-flex4">
     <div class="topLeft">
        <listCommon :topList ="fuelTreasure" :bgImg="bgImg1" :type="1"></listCommon>
    </div>
     <div class="topCenter">
        <listCommon :topList =" treatmentSolution" :bgImg="bgImg2" :type="2"></listCommon>
    </div>
     <div class="topRight">
        <listCommon :topList ="zhuMaQuan" :bgImg="bgImg3" :type="3"></listCommon>
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
      fuelTreasure: [], // 燃油宝集合（上）
      treatmentSolution: [], // 处理液集合
      zhuMaQuan: [], // 卓玛泉集合
      bgImg1: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/2/1.png',
      bgImg2: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/2/2.png',
      bgImg3: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/2/3.png'
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
      this.fuelTreasurefun(0)
      this.treatmentSolutionfun(0)
      this.zhuMaQuanfun(0)
    },
    // 接口名称： Post  /CoreProductRanking/fuelTreasure  燃油宝  0是增量，1是增幅 什么都不传默认按照增量
    fuelTreasurefun (sort) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/CoreProductRanking/fuelTreasure', {
        number: this.cityCode,
        sort: sort
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data.fuelTreasure
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
          this.fuelTreasure = dataList
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 接口名称：Post /CoreProductRanking/treatmentSolution  当月尾气处理液
    treatmentSolutionfun (sort) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/CoreProductRanking/treatmentSolution', {
        number: this.cityCode,
        sort: sort
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data.treatmentSolution
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
          this.treatmentSolution = dataList
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    // 请求地址 Post /CoreProductRanking/zhuMaQuan 卓玛泉排行
    zhuMaQuanfun (sort) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/CoreProductRanking/zhuMaQuan', {
        number: this.cityCode,
        sort: sort
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data.zhuMaQuan
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
          this.zhuMaQuan = dataList
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
  .topLeft,.topCenter,.topRight{
       height:pxtovh(319);
       width:pxtovw(619);
    }
}
</style>
