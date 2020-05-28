<template>
  <div class="dataBoard igs-flex">
    <section class="tab_top" >
      <div class="tab_box">
         <span :class="cur==index ? 'selected_color':''" v-for="(item, index) in tabList" :key="index" @click="choseTab(index,item.status)" >{{item.cont}}<i v-show ="cur==index " ></i></span>
      </div>
    </section>
    <section class="container" style="flex:1;" >
      <overallData v-if="status==1"></overallData>
      <commodityBoard v-if="status==2"></commodityBoard>
      <serviceBoard v-if="status==3"></serviceBoard>
      <activityBoard v-if="status==4"></activityBoard>
      <integralBoard v-if="status==5"></integralBoard>
      <anomalyBoard v-if="status==6"></anomalyBoard>
    </section>
  </div>
</template>

<script>
export default {
  name: 'dataBoardIndex',

  data () {
    return {
      tabList: [{cont: '整体看板', status: '1'}], // {cont: '商品看板', status: '2'}, {cont: '服务类看板', status: '3'}, {cont: '活动看板', status: '4'}, {cont: '积分兑换看板', status: '5'}, {cont: '异常监控看板', status: '6'}
      cur: 0,
      status: '1'
    }
  },
  created () {
    // window.document.title = '汽油移动端' // 设置页面标题
  },
  mounted () {

  },
  methods: {
    //  获取油站信息
    // `GET /stationListByUserId`
    // stationListByUserId () {
    //   let that = this
    //   this.$dialog.loading.open('加载中')
    //   that.$http.get('/webapi/bdview/mobile/getUserOilStationList', {

    //   }).then(res => {
    //     this.$dialog.loading.close()
    //     if (res.result === true) {
    //       var data = res.data
    //       // var data = [{account: '18660397153', id: 3356, phone: 18660397153, station: '中山安乐加油站中山安乐加油站中山安乐加油站中山安乐加油站-100039020054', username: '倪阳'}]
    //       let rs = data[0].station.split('-')
    //       console.log(rs)
    //       this.oliName = rs[0]
    //       this.oilCode = rs[1]
    //       this.oliId = rs[1]
    //       for (var i = 0; i < data.length; i++) {
    //         var stationItem = data[i].station.split('-')
    //         var obj = {
    //           ouCode: stationItem[1],
    //           stationName: stationItem[0]
    //         }
    //         this.oliList.push(obj)
    //       }
    //     } else {
    //       if (res.retcode === '-1') {
    //         this.$router.push({
    //           name: 'loginGasoline'
    //         })
    //       } else {
    //         this.$dialog.toast({mes: res.msg, timeout: 1800})
    //       }
    //     }
    //   }).catch((err) => {
    //     this.$dialog.loading.close()
    //     this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
    //     console.log(err)
    //   })
    // }
    choseTab (index, status) {
      this.cur = index
      this.status = status
    }
  },
  components: {
    overallData: require('@/components/dataBoard/overallData/overallData.vue').default,
    commodityBoard: require('@/components/dataBoard/commodityBoard/commodityBoard.vue').default,
    serviceBoard: require('@/components/dataBoard/serviceBoard/serviceBoard.vue').default,
    activityBoard: require('@/components/dataBoard/activityBoard/activityBoard.vue').default,
    integralBoard: require('@/components/dataBoard/integralBoard/integralBoard.vue').default,
    anomalyBoard: require('@/components/dataBoard/anomalyBoard/anomalyBoard.vue').default

  }
}
</script>
<style lang="stylus" scoped>
.dataBoard{
  font-size:18px;
  height:100%;
  flex-direction:column ;
  background:#EFEFEF;
  .container{
    flex:1;
    overflow-x :hidden;
  }
  .tab_box{
      background:#355ac6;
      font-size:20px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:#a9c5fd;
      line-height :50px;
      padding:10px 0;
      .selected_color{
        color:#fff;
      }
      span {
        padding:0 20px;
        display:inline-block;
        text-align: center;
        position: relative;
        i {
          display:block;
          width:40px;
          height:3px;
          background:#fff;
          position:absolute;
          left:50%;
          margin-left:-20px;
          bottom:0;
        }
      }
  }
}
</style>
