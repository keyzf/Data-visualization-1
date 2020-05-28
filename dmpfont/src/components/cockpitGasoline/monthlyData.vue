<template>
  <div class="todayData_box">
    <div class="data_box">
      <div class="box_title">请选择数据筛选项目</div>
      <div class="box_item">
        <div v-for="(item,index) in monthList" :key="index" :class="curItem==index ? 'active-item':''" @click="clickItem(item,index)"><span v-if="index==0">当月</span><span v-else>{{item}}</span></div>
      </div>
      <div class="box_top igs-flex igs-flex9 igs-flex10">
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>当月发展会员/人</p>
            <p class="num">{{topStationData.developMemberTotal[0] || 0}}</p>
            <p class="name">环比上月 <span :class="topStationData.developMemberTotal[1]>0?'add_color':'cut_color'">{{$util.fixedFunc1(topStationData.developMemberTotal[1]) || 0}}%</span></p>
          </div>
        </div>
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>累计会员/人</p>
            <p class="num">{{topStationData.cumulativeDevelopMemberTotal[0] || 0}}</p>
            <p class="name">环比上月 <span :class="topStationData.cumulativeDevelopMemberTotal[1]>0?'add_color':'cut_color'">{{$util.fixedFunc1(topStationData.cumulativeDevelopMemberTotal[1]) || 0}}%</span></p>
          </div>
        </div>
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>当月消费会员/人</p>
            <p class="num">{{topStationData.consumeMemberTotal[0] || 0}}</p>
            <p class="name">环比上月 <span :class="topStationData.consumeMemberTotal[1]>0?'add_color':'cut_color'">{{$util.fixedFunc1(topStationData.consumeMemberTotal[1]) || 0}}%</span></p>
          </div>
        </div>
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>会员加油升数</p>
            <p class="num">{{$util.fixedFunc1(topStationData.memberRefuelTotal[0]) || 0}}</p>
            <p class="name">环比上月 <span :class="topStationData.memberRefuelTotal[1]>0?'add_color':'cut_color'">{{$util.fixedFunc1(topStationData.memberRefuelTotal[1]) || 0}}%</span></p>
          </div>
        </div>
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>会员加油金额/万元</p>
            <p class="num">{{$util.fixedFunc(topStationData.memberRefuelAmountTotal[0] / 10000) || 0}}</p>
            <p class="name">环比上月 <span :class="topStationData.memberRefuelAmountTotal[1]>0?'add_color':'cut_color'">{{$util.fixedFunc1(topStationData.memberRefuelAmountTotal[1]) || 0}}%</span></p>
          </div>
        </div>
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>产生积分</p>
            <p class="num">{{$util.fixedFunc1(topStationData.produceDieselBeanTotal[0]) || 0}}</p>
            <p class="name">环比上月 <span :class="topStationData.produceDieselBeanTotal[1]>0?'add_color':'cut_color'">{{$util.fixedFunc1(topStationData.produceDieselBeanTotal[1]) || 0}}%</span></p>
          </div>
        </div>
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>兑换积分</p>
            <p class="num">{{$util.fixedFunc1(topStationData.redeemDieselBeanTotal[0]) || 0}}</p>
            <p class="name">环比上月 <span :class="topStationData.redeemDieselBeanTotal[1]>0?'add_color':'cut_color'">{{$util.fixedFunc1(topStationData.redeemDieselBeanTotal[1]) || 0}}%</span></p>
          </div>
        </div>
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>兑换喜好</p>
            <p v-show="topStationData.redeemLike!=''" class="num">{{topStationData.redeemLike}}</p>
            <p v-show="topStationData.redeemLike==''"  class="num">无</p>
          </div>
        </div>
      </div>
    </div>
    <div class="data_box" v-if="false">
      <div v-if="monthDataList.length != 0">
        <div class="box_b" v-for="(item, index) in monthDataList" :key="index">
          <div class="igs-flex igs-flex4 igs-flex2 phone_bg">
            <div class="box_b_t_l">手机号后四位：
              <span class="blue_color">{{item.phoneNum || 0}}</span>
              <img src="static/ipadImg/icon_go.png" alt="">
              <span class="momber_type" :class="[item.type == '新会员' ? 'member_new':'', item.type == '老会员' ? 'member_old':'', item.type == '非会员' ? 'member_none':'', item.type == '非卡车之家会员' ? 'member_nocar':'', item.type == '非App会员' ? 'member_noapp':'']">{{item.type}}</span>
              <span class="novip-tip" :class="[item.type == '非会员' ? 'orange_novip':'', item.type == '非卡车之家会员' ? 'orange_nocar':'', item.type == '非App会员' ? 'orange_noapp':'']">{{item.cue}}</span>
            </div>
            <div class="box_b_t_r">消费次数：{{item.consumption || 0}}</div>
          </div>
          <div class="box_b_b">
            <div class="igs-flex">
              <div class="box_b_l ellipsis">汽油消费金额￥：<span>{{item.dieseConsumptionAmout || 0}}</span></div>
              <div class="box_b_l is-show">消费次数：<span>{{item.consumption || 0}}</span></div>
              <div class="box_b_l ellipsis">积分余额：<span>{{item.dieselBeanBalance || 0}}</span></div>
            </div>
            <div class="igs-flex">
              <div class="box_b_l igs-flex igs-flex2">油非互动券(张)：<span class="blue_color">{{item.couponCount || 0}}</span> <img src="static/ipadImg/icon_go.png" alt=""></div>
              <div class="box_b_l ellipsis">兑换最多产品：<span>{{item.redeemMostProduct || '无'}}</span></div>
              <div class="box_b_l is-show"></div>
            </div>
            <div class="igs-flex">
              <div class="box_b_l ellipsis">绑定卡号：<span>{{item.isBindCardNo || '无'}}</span></div>
              <div class="box_b_l ellipsis">绑定微信：<span>{{item.isbindWechat || '无'}}</span></div>
              <div class="box_b_l is-show"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data" v-else>
        暂无消费记录
      </div>
    </div>
    <!-- <div class="data_box"> -->
      <!-- 引入图表 -->
      <monthly-chart :oilCode="oilCode" :curItemMonth="curItemMonth"></monthly-chart>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'monthlyData',
  data () {
    return {
      monthList: [], // 最近6个月份
      curItem: 0, // 当前点击项
      curItemMonth: '', // 选择月份值
      topStationData: { // 声明油站信息
        produceDieselBeanTotal: [],
        consumeMemberTotal: [],
        redeemDieselBeanTotal: [],
        memberRefuelTotal: [],
        cumulativeDevelopMemberTotal: [],
        developMemberTotal: [],
        memberRefuelAmountTotal: [],
        redeemLike: []
      },
      monthDataList: ['', '', '', '', '']
      // oilCode: '33250135' // 油站编码

    }
  },
  components: {
    MonthlyChart: require('@/components/cockpitGasoline/monthlyChart.vue').default
  },
  props: {
    oilCode: String // 先屏蔽
  },
  created () {
    // 测试模拟切换油站
    // let url = window.location.href
    // this.oilCode = url.substring(url.lastIndexOf('=') + 1, url.length)
    // 获取最近几个月份
    this.getNearMonth()

    var date = new Date()
    if (this.oilCode !== '') {
      this.getDateRange(date, 30, 6, true)
    }
  },
  methods: {
    // 获取最近三个月，dateNow当前时间，intervalDays时间天数,monthNum获取月份个数，bolPastTime过去(true)还是未来月份(false)
    getDateRange (dateNow, intervalDays, monthNum, bolPastTime) {
      let oneDayTime = 24 * 60 * 60 * 1000
      let list = []
      let lastDay

      if (bolPastTime === true) {
        for (var i = 0; i < monthNum; i++) {
          lastDay = new Date(dateNow.getTime() - intervalDays * i * oneDayTime)
          list.push(this.formateDate(lastDay))
        }
      } else {
        for (var j = 0; j < monthNum; j++) {
          lastDay = new Date(dateNow.getTime() + intervalDays * j * oneDayTime)
          list.push(this.formateDate(lastDay))
        }
      }
      this.monthList = list

      this.curItemMonth = this.monthList[0].substring(0, 4) + this.monthList[0].substring(this.monthList[0].length - 2, this.monthList[0].length)
      this.stationInfoByOilCodeAndMonth()
      // 列表影藏
      // this.salesRecordListByOilCodeAndMonth()
      return list
    },
    formateDate (time) {
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()

      if (month < 10) {
        month = '0' + month
      }

      if (day < 10) {
        day = '0' + day
      }
      return year + '/' + month
      // return year + '-' + month + '-' + day + ''
    },
    getNearMonth () {
      this.monthList = this.$util.getNearMonth(6)
      this.curItemMonth = this.monthList[0].substring(0, 4) + this.monthList[0].substring(this.monthList[0].length - 2, this.monthList[0].length)
      this.stationInfoByOilCodeAndMonth()
      // 列表影藏
      // this.salesRecordListByOilCodeAndMonth()
    },
    // 点击月份切换
    clickItem (item, index) {
      this.curItem = index
      this.curItemMonth = item.substring(0, 4) + item.substring(item.length - 2, item.length)
      this.stationInfoByOilCodeAndMonth()
      // 列表影藏
      // this.salesRecordListByOilCodeAndMonth()
    },
    // 获取月度油站相关信息
    stationInfoByOilCodeAndMonth () {
      let that = this
      this.$dialog.loading.open('加载中')
      this.$http.post('/webapi/bdview/gasolineMobile/stationInfoByOilCodeAndMonth', {
        oilCode: that.oilCode,
        month: that.curItemMonth
      }).then(res => {
        that.$dialog.loading.close()
        if (res.result === true) {
          that.topStationData = res.data
        } else {
          that.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 获取月度油站销售记录
    salesRecordListByOilCodeAndMonth () {
      let that = this
      this.$dialog.loading.open('加载中')
      this.$http.post('/webapi/bdview/gasolineMobile/salesRecordListByOilCodeAndMonth', {
        oilCode: that.oilCode,
        month: that.curItemMonth
      }).then(res => {
        if (res.result === true) {
          let json = res.rows
          json.map((a) => {
            if (a.phone !== '' && a.phone !== null) {
              a.phoneNum = a.phone.slice(7, 11)
            } else {
              a.phoneNum = a.phone
            }
            a.dieseConsumptionAmout = this.$util.fixedFunc1(a.dieseConsumptionAmout)
            a.dieselBeanBalance = this.$util.fixedFunc1(a.dieselBeanBalance)
          })
          // 降序处理
          json.sort((a, b) => {
            return b.consumption - a.consumption
          })
          that.monthDataList = json
          that.$dialog.loading.close()
        } else {
          that.monthDataList = []
          that.$dialog.loading.close()
          that.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.loading.close()
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  },
  watch: {
    oilCode (val) {
      var date = new Date()
      if (this.oilCode !== '') {
        this.getDateRange(date, 30, 6, true)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  ::-webkit-scrollbar {
    display: none;
  }
  .ellipsis{
    display:inline-block;white-space:nowrap;
    overflow:hidden;text-overflow: ellipsis;
  }
  @media screen and (min-width: 415px) {
    .todayData_box{
      padding: 0 20px 30px 20px;
      .is-show{
        display: block
      }
      .data_box{
        width: 100%;
        height: auto;
        border-radius: 6px;
        background: #ffffff;
        padding: 20px;
        margin-bottom: 10px;
        .box_title{
          font-size: 18px;
          color: #4C4948;
          line-height: 18px;
          font-weight: 400;
        }
        .box_item{
          width: 100%;
          line-height: 44px;
          padding: 10px 0;
          overflow-x: auto;
          white-space:nowrap;
          div{
            width: 18%;
            height:44px;
            background:rgba(235,235,251,1);
            border-radius:33px;
            font-size: 18px;
            color: #888888;
            text-align: center;
            margin-right: 10px;
            display: inline-block;
          }
          div:hover{
            cursor: pointer;
          }
          .active-item{
            background: #7634FF;
            color: #ffffff;
          }
        }
        .box_top{
          width:100%;
          background: #fff;
          height: auto;
          border-radius: 6px;
          .box_top_tab{
            width: 24%;
            height: auto;
            background:rgba(248,247,255,1);
            border-radius:12px;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(76,73,72,1);
            margin-top: 12px;
            padding: 13px 5px
            p{
              white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
            }
            .num{
              font-size:24px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(118,52,255,1);
              line-height:36px;
            }
            .name{
              color: #888888;
              display: none;
            }
            .add_color{
              color: #FF3939!important
            }
            .cut_color{
              color: #33CC00!important
            }
          }
        }
        .box_b{
          font-size:18px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(136,136,136,1);
          border-bottom:1px solid rgba(229,229,229,1);
          margin-bottom: 15px;
          .box_b_t_l{
            flex: 1
            display: flex
            align-items: center
          }
          .box_b_t_r{
            display: none
          }
          .box_b_t_l, .box_b_t_r{
            font-size: 15px!important
          }
          .box_t_r{
            width: 150px
          }
          img{
            width:34px;
            height:34px;
          }
          .momber_type{
            width: auto;
            line-height: 24px;
            border-radius:12px;
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            text-align :center;
            padding: 0 5px
          }
          .box_b_b{
            line-height 30px;
            padding: 10px 0 15px 0;
            .box_b_l{
              width: 33.3%;
              line-height: 30px
              text-align: left;
              span{
                color: #4C4948;
              }
            }
            .box_b_c{
              width: 36%;
              text-align: left;
            }
            span{
              color: #4C4948
            }
            .bold_font{
              color: #000000
              font-weight: bold
            }
          }
          .member_new{
            background:rgba(225,241,228,1);
            color: #31C42C;
          }
          .member_old{
            background: rgba(255,229,229,1);
            color: #E32F2F;
          }
          .member_none{
            background:rgba(251,231,205,1);
            color: #FF6800;
          }
          .member_nocar{
            background: rgba(213,230,244,1);
            color: #3885E0;
          }
          .member_noapp{
            background: rgba(251,231,205,1);
            color: rgba(255,104,0,1);
          }
          .phone_bg{
            line-height:38px!important;
            background: rgba(248,247,255,1);
            border-radius:1px;
            padding: 0 12px;
            font-size: 15px;
          }
          .blue_color{
            color: #7634FF!important;
          }
          .novip-tip{
            width: 30%
          }
          .orange_novip{
            color: #FF5D1B;
            font-size: 8px!important;
            margin: 0 2px;
          }
          .orange_nocar{
            color: #3885E0;
            font-size: 8px!important;
            margin: 0 2px;
          }
          .orange_noapp{
            color: #FF6800;
            font-size: 8px!important;
            margin: 0 2px;
          }
        }
        .no-data{
          line-height:330px;
          text-align:center;
          color:#4c4948;
          font-size: 17px;
        }
      }
    }
  }
  @media screen and (max-width: 414px) {
    .todayData_box{
      padding: 0 10px 20px 10px;
      .is-show{
        display: none
      }
      .data_box{
        width: 100%;
        height: auto;
        border-radius: 6px;
        background: #ffffff;
        padding: 10px;
        margin-bottom: 10px;
        .box_title{
          font-size: 14px;
          color: #4C4948;
          line-height: 18px;
          font-weight: 400;
        }
        .box_item{
          width: 100%;
          line-height: 24px;
          padding: 10px 0;
          overflow-x: auto;
          white-space:nowrap;
          div{
            width: 18%;
            height: 24px;
            background:rgba(235,235,251,1);
            border-radius: 11px;
            font-size: 10px;
            color: #888888;
            text-align: center;
            margin-right: 8px;
            display: inline-block;
          }
          .active-item{
            background: #7634FF;
            color: #ffffff;
          }
        }
        .box_top{
          width:100%;
          background: #fff;
          height: auto;
          border-radius: 6px;
          .box_top_tab{
            width: 24%;
            height: auto;
            background:rgba(248,247,255,1);
            border-radius: 4px;
            font-size: 9px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(76,73,72,1);
            margin-top: 5px;
            padding: 8px 1px
            p{
              white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
            }
            .num{
              font-size: 10px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(118,52,255,1);
              line-height: 16px;
            }
            .name{
              color: #888888;
              display: none;
            }
            .add_color{
              color: #FF3939!important
            }
            .cut_color{
              color: #33CC00!important
            }
          }
        }
        .box_b{
          font-size: 12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(136,136,136,1);
          border-bottom:1px solid rgba(229,229,229,1);
          margin-bottom:10px;
          .box_b_t_l{
            flex: 1
            img{
              width: 18px;
              height: 18px;
              margin: 5px 0 -5px 0
            }
          }
          .box_b_t_r{
            width: 75px
            text-align: right
            display: block
          }
          .box_b_t_l, .box_b_t_r{
            font-size: 9px!important
          }
          img{
            width: 18px;
            height: 18px;
          }
          .momber_type{
            width: auto;
            line-height: 16px;
            border-radius: 12px;
            font-size: 9px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            text-align :center;
            padding: 0 5px
          }
          .box_b_b{
            line-height 20px;
            padding: 8px 0 12px 0;
            .box_b_l{
              width: 50%;
              text-align: left;
              span{
                color: #4C4948;
              }
            }
            .box_b_c{
              width: 36%;
              text-align: left;
            }
            span{
              color: #4C4948
            }
            .bold_font{
              color: #000000
              font-weight: bold
            }
          }
          .member_new{
            background:rgba(225,241,228,1);
            color: #31C42C;
          }
          .member_old{
            background: rgba(255,229,229,1);
            color: #E32F2F;
          }
          .member_none{
            background:rgba(251,231,205,1);
            color: #FF6800;
          }
          .member_nocar{
            background: rgba(213,230,244,1);
            color: #3885E0;
          }
          .member_noapp{
            background: rgba(251,231,205,1);
            color: rgba(255,104,0,1);
          }
          .phone_bg{
            line-height:22px!important;
            background: rgba(248,247,255,1);
            border-radius:1px;
            padding: 0 7px;
            font-size: 10px;
          }
          .blue_color{
            color: #7634FF!important;
          }
          .novip-tip{
            width: 30%
          }
          .orange_novip{
            color: #FF5D1B;
            font-size: 8px!important;
            margin: 0 2px;
          }
          .orange_nocar{
            color: #3885E0;
            font-size: 8px!important;
            margin: 0 2px;
          }
          .orange_noapp{
            color: #FF6800;
            font-size: 8px!important;
            margin: 0 2px;
          }
        }
        .no-data{
          line-height: 80px;
          text-align:center;
          color:#4c4948;
          font-size: 15px;
        }
      }
    }
  }

</style>
