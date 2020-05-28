<template>
  <div class="topCom igs-flex igs-flex4">
     <div class="topLeft">
        <listCommon :topList ="fuelTreasure" :bgImg="bgImg1"></listCommon>
    </div>
     <div class="topCenter">
        <listCommon :topList =" treatmentSolution" :bgImg="bgImg2"></listCommon>
    </div>
     <div class="topRight">
        <listCommon :topList ="zhuMaQuan" :bgImg="bgImg3"></listCommon>
    </div>
  </div>
</template>

<script>
import listCommon from './listCommon'
export default {
  name: 'topCom',
  props: ['fuelTreasure', 'treatmentSolution', 'zhuMaQuan'],
  data () {
    return {
      topList1: [],
      topList2: [],
      topList3: [],
      bgImg1: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/3/1.png',
      bgImg2: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/3/2.png',
      bgImg3: 'https://img.gdoil.cn/cockpit/static/images/nonFuel/3/3.png'
    }
  },
  created () {
  },
  mounted () {
    // this.basicRanking()
    // this.basicRetailRanking()
    // this.basicGroupRanking()
    // this.caliberGrossProfit()
  },
  methods: {
    // 接口名称 ：Post /commoditySalesVolume/basicRanking 当月基础品类营业额排名
    basicRanking () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/commoditySalesVolume/basicRanking', {
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
