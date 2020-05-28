<template>
  <div class="cockpitIpad igs-flex">
    <section class="tab_top" >
      <div class="tab_box">
         <span v-for="(item, index) in tabList" :key="index" @click="choseTab(index,item.status)" ><i :class="cur==index ? 'selected_color':''">{{item.cont}}</i></span>
      </div>
      <div class="oli_box igs-flex igs-flex2">
        <img src="https://img.gdoil.cn/cockpit/static/ipadImg/logo@2x.png" alt=""> <span class="oli_name">{{oliName}}</span>  <button @click="changeOil">切换油站</button>
      </div>
    </section>
    <section class="container" style="flex:1;" >
      <overall-data v-if="status==1" :oilCode="oilCode"></overall-data>
      <today-data v-if="status==2" :oilCode="oilCode"></today-data>
      <monthly-data v-if="status==3" :oilCode="oilCode"> </monthly-data>
      <client-management v-if="status==4" :oilCode="oilCode"> </client-management>
    </section>
     <yd-popup v-model="showpopup" position="center" width="80%">
          <div style="background-color:#fff;padding:20px 0;">
              <div class="popup_top">
                <p>切换油站</p>
                <img class="close_img" @click="closeBtn" src="https://img.gdoil.cn/cockpit/static/ipadImg/btn_close.png" alt="">
              </div>
              <ul class="select_box select_box_ul">
                <li v-for="(item,index) in oliList" :class="{'oli-avt':oliId == item.ouCode}" :key="index" @click="selectoli(item)">{{item.stationName}}</li>
              </ul>
              <div style="padding:0 20px;">
                <button class="select_btn" @click="selectOk">选好了</button>
              </div>
          </div>
      </yd-popup>
  </div>
</template>

<script>
export default {
  name: 'cockpitIpadIndex',

  data () {
    return {
      tabList: [{cont: '整体看板', status: '1'}, {cont: '当日数据', status: '2'}, {cont: '月度数据', status: '3'}], //, {cont: '客户管理', status: '4'}
      cur: 0,
      status: '1',
      showpopup: false,
      oilCode: '',
      oliId: '',
      oliName: '',
      oliList: [],
      selectCode: ''
    }
  },
  created () {
    window.document.title = '汽油移动端' // 设置页面标题
    this.stationListByUserId()
  },
  mounted () {

  },
  methods: {
    //  获取油站信息
    // `GET /stationListByUserId`
    stationListByUserId () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/mobile/getUserOilStationList', {

      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var data = res.data
          // var data = [{account: '18660397153', id: 3356, phone: 18660397153, station: '中山安乐加油站中山安乐加油站中山安乐加油站中山安乐加油站-100039020054', username: '倪阳'}]
          let rs = data[0].station.split('-')
          console.log(rs)
          this.oliName = rs[0]
          this.oilCode = rs[1]
          this.oliId = rs[1]
          for (var i = 0; i < data.length; i++) {
            var stationItem = data[i].station.split('-')
            var obj = {
              ouCode: stationItem[1],
              stationName: stationItem[0]
            }
            this.oliList.push(obj)
          }
        } else {
          if (res.retcode === '-1') {
            this.$router.push({
              name: 'loginGasoline'
            })
          } else {
            this.$dialog.toast({mes: res.msg, timeout: 1800})
          }
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    choseTab (index, status) {
      this.cur = index
      this.status = status
    },
    // 选择油站
    selectoli (item) {
      this.oliId = item.ouCode
      this.oliName = item.stationName
      this.selectCode = item.ouCode
    },
    closeBtn () {
      this.showpopup = false
    },
    selectOk () {
      this.showpopup = false
      this.oilCode = this.selectCode
      console.log(this.oilCode)
    },
    changeOil () {
      this.showpopup = true
    }
  },
  components: {
    overallData: require('@/components/cockpitGasoline/overallData.vue').default,
    todayData: require('@/components/cockpitGasoline/todayData.vue').default,
    monthlyData: require('@/components/cockpitGasoline/monthlyData.vue').default,
    clientManagement: require('@/components/cockpitGasoline/clientManagement.vue').default
  }
}
</script>
<style lang="stylus" scoped>
@media screen and (min-width: 415px) {
.cockpitIpad{
  font-size:18px;
  height:100%;
  flex-direction:column ;
  background:rgba(244,244,244,1);
  .container{
    flex:1;
    overflow-x :hidden;
  }
  .popup_top{
   font-size:18px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(76,73,72,1);
    text-align: center;
    position:relative;
    height:50px;
    line-height:50px;
    border-bottom:1px solid #CDCBCB;
    .close_img{
      width:30px;
      height:25px;
      position:absolute;
      top:50%;
      margin-top:-10px;
      right:30px;
    }
  }
  .select_btn{
        width:100%;
        height:50px;
        border-radius:20px;
        border:0 none;
        line-height: 50px;
        text-align:center;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:#fff;
        margin-top:20px;
        background:#856CFF;
      }
   .select_box{
      padding:0 20px;
      &.select_box_ul{
        height:240px;
        overflow-x: hidden;
      }

      li{
        padding: 0 20px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width:100%;
        height:50px;
        border-radius:25px;
        border:1px solid rgba(159,160,160,1);
        line-height: 50px;
        text-align:center;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(76,73,72,1);
        margin-top:20px;
        &.oli-avt{
          background:#856CFF;
          color:#fff;
          border:0 none;
        }
      }
    }
  .tab_box{
      background #fff;
      font-size:32px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(136,136,136,1);
      line-height :60px;
      .selected_color{
        color:#4C4948;
        border-bottom: 3px solid #7634FF;
      }
      span {
        display:inline-block;
        width:33.3%;
        text-align: center;
        position: relative;
        i {
          font-style:normal;
          padding: 10px;
        }
      }
  }
  .oli_box{
    height:70px;
    border-radius:6px;
    background #fff;
    padding:0 10px;
    margin:10px 20px;
    line-height 70px;
    font-size:30px;
    img{
      width:32px;
      margin-right:10px;
    }
    .oli_name{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      margin-right:10px;
      flex:1;
    }
     button{
      display:inline-block;
      padding:0 10px;
      border:0 none;
      height:34px;
      line-height:34px;
      background:#856CFF;
      border-radius:17px;
      font-size:24px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
  }
}
}
 @media screen and (max-width: 414px) {
  .cockpitIpad{
  font-size:12px;
  height:100%;
  flex-direction:column ;
  background:rgba(244,244,244,1);
  .container{
    flex:1;
    overflow-x :hidden;
  }
  .popup_top{
    font-size:16px;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(76,73,72,1);
    text-align: center;
    position:relative;
    height:40px;
    line-height:40px;
    border-bottom:1px solid #CDCBCB;
    .close_img{
      width:20px;
      height:20px;
      position:absolute;
      top:50%;
      margin-top:-10px;
      right:30px;
    }
  }
  .select_btn{
        width:100%;
        height:40px;
        border-radius:20px;
        border:0 none;
        line-height: 40px;
        text-align:center;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:#fff;
        margin-top:20px;
        background:#856CFF;
      }
   .select_box{
      padding:0 20px;
      &.select_box_ul{
        height:240px;
        overflow-x: hidden;
      }

      li{
        padding: 0 20px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width:100%;
        height:40px;
        border-radius:20px;
        border:1px solid rgba(159,160,160,1);
        line-height: 40px;
        text-align:center;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(76,73,72,1);
        margin-top:20px;
        &.oli-avt{
         background:#856CFF;
          color:#fff;
          border:0 none;
        }
      }
    }
  .tab_box{
      background #fff;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(136,136,136,1);
      line-height :42px;
      .selected_color{
        color:#4C4948;
        border-bottom: 3px solid #7634FF;
      }
      span {
        display:inline-block;
        width:33.3%;
        text-align: center;
        // padding: 0px 10px 0px 10px;
        position: relative;
        i {
          font-style:normal;
          padding: 10px;
        }
      }
  }
  .oli_box{
    height:40px;
    border-radius:6px;
    background #fff;
    padding:0 10px;
    margin:10px;
    line-height 40px;
    font-size:16px;
    img{
      width:26px;
      margin-right:10px;
    }
    .oli_name{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      margin-right:10px;
      flex:1;
    }
    button{
      display:inline-block;
      border:0 none;
      padding:0 10px;
      height:24px;
      background:#856CFF;
      border-radius:14px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
  }
}
 }
</style>
