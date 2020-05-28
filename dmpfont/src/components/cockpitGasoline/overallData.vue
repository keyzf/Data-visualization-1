<template>
  <div class="big_box">
     <div class="box_top igs-flex igs-flex9 igs-flex10">
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p class="igs-flex igs-flex2 igs-flex3">当月新增汽油会员 <img @click="showMsg(1)" class="wenImg" src="https://img.gdoil.cn/cockpit/static/ipadImg/wenhao.png" alt=""></p>
          <p class="num">{{memberData.tmDevelopmentMember|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p class="igs-flex igs-flex2 igs-flex3">年度有效会员 <img @click="showMsg(2)" class="wenImg" src="https://img.gdoil.cn/cockpit/static/ipadImg/wenhao.png" alt=""></p>
          <p class="num">{{memberData.yearActiveMember|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p class="igs-flex igs-flex2 igs-flex3">当月活跃会员数 <img @click="showMsg(3)" class="wenImg" src="https://img.gdoil.cn/cockpit/static/ipadImg/wenhao.png" alt=""></p>
          <p class="num">{{memberData.tmLivelyMember|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p class="igs-flex igs-flex2 igs-flex3">当月流失汽油会员 <img @click="showMsg(4)" class="wenImg" src="https://img.gdoil.cn/cockpit/static/ipadImg/wenhao.png" alt=""></p>
          <p class="num">{{memberData.tmLostMember|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p class="igs-flex igs-flex2 igs-flex3">最新忠诚会员数 <img @click="showMsg(5)" class="wenImg" src="https://img.gdoil.cn/cockpit/static/ipadImg/wenhao.png" alt=""></p>
          <p class="num">{{memberData.tmLoyalMember|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p class="igs-flex igs-flex2 igs-flex3">汽油会员粘性指数 <img @click="showMsg(6)" class="wenImg" src="https://img.gdoil.cn/cockpit/static/ipadImg/wenhao.png" alt=""></p>
          <p class="num">{{memberData.memberStickinessIndex|formatData0}}</p>
        </div>
      </div>
    </div>
    <div class="structure">
      <p class="title">上月汽油会员客户结构</p>
      <div class="structure_b">
        <div v-if="JSON.stringify(memberList) != '{}'" class="structure_b_t  igs-flex igs-flex2 igs-flex4 igs-flex9">
          <div class="tab">
            <p class="tab_title">普通会员客户</p>
            <div class="igs-flex">
              <div class="tab_l">
                <p>上月数</p>
                <p class="num">{{memberList.ordinaryMember.one|formatData0}}</p>
              </div>
              <div class="tab_l">
                <p>当月</p>
                <p class="num">{{memberList.ordinaryMember.two|formatData0}}</p>
              </div>
            </div>
          </div>
          <div class="tab">
            <p class="tab_title">网约车</p>
            <div class="igs-flex">
              <div class="tab_l">
                <p>上月数</p>
                <p class="num">{{memberList.coachCar.one|formatData0}}</p>
              </div>
              <div class="tab_l">
                <p>去年12月份</p>
                <p class="num">{{memberList.coachCar.two|formatData0}}</p>
              </div>
            </div>
          </div>
           <div class="tab">
            <p class="tab_title">出租车</p>
            <div class="igs-flex">
              <div class="tab_l">
                <p>上月数</p>
                <p class="num">{{memberList.taxi.one|formatData0}}</p>
              </div>
              <div class="tab_l">
                <p>去年12月份</p>
                <p class="num">{{memberList.taxi.two|formatData0}}</p>
              </div>
            </div>
          </div>
          <div class="structure_b_b_tab">
            <p class="tab_title">教练车</p>
            <div class="igs-flex">
              <div class="tab_l">
                <p>上月数</p>
                <p class="num">{{memberList.coachCar.one|formatData0}}</p>
              </div>
              <div class="tab_l">
                <p>去年12月份</p>
                <p class="num">{{memberList.coachCar.two|formatData0}}</p>
              </div>
            </div>
          </div>
          <div class="structure_b_b_tab">
            <p class="tab_title">待定私家车</p>
            <div class="igs-flex">
              <div class="tab_l">
                <p>上月数</p>
                <p class="num">{{memberList.specificPrivateCar.one|formatData0}}</p>
              </div>
              <div class="tab_l">
                <p>去年12月份</p>
                <p class="num">{{memberList.specificPrivateCar.two|formatData0}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 会员数据 -->
     <div class="member_data">
      <!-- <p class="title">会员数据</p> -->
      <div class="member_box igs-flex">
        <div class="member_l">
          <p>近6个月各月汽油活跃会员数</p>
          <p v-if="status1" style="line-height:100px;text-align:center;">暂无数据</p>
           <div v-else id="chartLineLeft" style="width:100%;height: 280px;"> </div>
        </div>
        <div class="member_r">
          <p>近6个月各月汽油忠诚会员数</p>
          <p v-if="status2" style="line-height:100px;text-align:center;">暂无数据</p>
          <div v-else id="chartLineRight" style="width:100%;height: 280px;"> </div>
        </div>
      </div>
    </div>
    <!-- 会员数据 -->
     <div class="member_data">
      <!-- <p class="title">销售数据</p> -->
      <div class="member_box igs-flex">
        <div class="member_l">
           <p>近6个月各月汽油忠诚会员数</p>
           <p v-if="status3" style="line-height:100px;text-align:center;">暂无数据</p>
           <div v-else id="chartBarLeft" style="width:100%;height: 280px;"> </div>
        </div>
        <div class="member_r">
          <p>本站活跃会员分结算方式</p>
          <p v-if="status4" style="line-height:100px;text-align:center;">暂无数据</p>
          <div v-else id="payStyleChart" :style="{width: '100%', height: '280px'}"></div>
        </div>
      </div>
    </div>

    <div class="member_data">
      <!-- <p class="title">销售数据</p> -->
      <div class="member_box igs-flex">
        <div class="member_l">
          <p>近3个月会员加油频次</p>
          <p v-if="status5" style="line-height:100px;text-align:center;">暂无数据</p>
          <div v-else id="chartBar3" style="width:100%;height: 290px;"> </div>
        </div>
        <div class="member_r">
          <p class="table_title">地市排名</p>
           <p v-show="clientInfo.length == 0" style="line-height:100px;text-align:center;"> 暂无地市排名</p>
           <table v-show="clientInfo.length > 0" cellspacing="0" cellpadding="0" class="table">
              <thead>
                <th class="table_th">地市</th>
                <th class="table_th">新增会员排名</th>
                <th class="table_th">活跃会员排名</th>
                <th class="table_th">吨油会员排名</th>
              </thead>
              <tbody>
                  <tr v-for="(obj,idx) in clientInfo" :key="idx">
                    <td class="table_td">{{obj.name}}</td>
                    <td class="table_td">{{obj.addMember}}</td>
                    <td class="table_td">{{obj.activeMember}}</td>
                    <td class="table_td">{{obj.tonsoilMember}}</td>
                  </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
      <yd-popup v-model="showpopup" position="center" width="80%">
        <div style="background-color:#fff;padding:10px;">
          <div class="popup_top">
                <img class="close_img" @click="showpopup=false" src="https://img.gdoil.cn/cockpit/static/ipadImg/btn_close.png" alt="">
          </div>
          <p class="msg_p">{{msg}}</p>
        </div>
    </yd-popup>
  </div>
</template>

<script>
export default {
  name: 'overallData',
  props: {
    oilCode: String // 油站编码
  },
  data () {
    return {
      memberData: '',
      memberList: {},
      totalList: [],
      data93: [],
      data97: [],
      data98: [],
      loyalMemberdata: [],
      loyalMembermonth: [],
      addData: [],
      addMonth: [],
      lostData: [],
      monthList3: [],
      tmLit: [],
      lmList: [],
      llmList: [],
      payStyleList: [],
      times3: ['1次', '2次', '3次', '4次及以上'],
      clientInfo: [],
      chartRightDeta: [],
      chartLineRight1: [],
      chartLineRight2: [],
      dieselBeanProductList: [],
      dieselBeanExchange: [],
      chartdata9: [],
      chartdata10: [],
      chartdata11: [],
      month: [],
      status1: true,
      status2: true,
      status3: true,
      status4: true,
      status5: true,
      showpopup: false,
      msg: ''
    }
  },
  watch: {
    oilCode: {
      handler (newValue, oldValue) {
        this.oilCode = newValue
        console.log(this.oilCode)
        if (this.oilCode !== '') {
          this.initialize()
        }
      },
      deep: true
    }
  },
  mounted () {
    if (this.oilCode !== '') {
      this.initialize()
    }
  },
  methods: {
    initialize () {
      this.overallDetails()
      this.lastMonthMemberStructureDetails()
      this.lastSixMonthDetail()
      this.activeMemberPaymentType()
      this.lastThreeMonthDetail()
      this.cityRank()
    },
    showMsg (type) {
      if (type === 1) {
        this.msg = '当月注册且当月在本油站加汽油的会员'
      }
      if (type === 2) {
        this.msg = '自然年内加满50L汽油的会员人数'
      }
      if (type === 3) {
        this.msg = '当月有消费汽油的会员人数'
      }
      if (type === 4) {
        this.msg = '距离最近一次加汽油超过90天的会员人数'
      }
      if (type === 5) {
        this.msg = '指最近3次在油站加汽油时间间隔不超90天，且最近1次加汽油距离统计时间不超90天的会员人数'
      }
      if (type === 6) {
        this.msg = '（当月加油客户数+连续2个月加油客户数×1.5+连续3个月加油客户数×2+连续4个月加油客户数×2.5+连续5个月加油客户数×3+连续6个月加油客户数×4）÷2019年第四季度月均汽油自营陆上机出量'
      }
      this.showpopup = true
    },
    //     1. 根据油站编码获取整体看板明细
    // GET /overallDetails?oilCode=33250135
    overallDetails () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/gasolineMobile/overallDetails', {
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          console.log(res)
          this.memberData = res.data
          // console.log(this.memberData)
        } else {
          if (res.retcode === '-1') {
            // this.$router.push({
            //   name: 'loginGasoline'
            // })
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
    //     2. 上月汽油会员客户结构
    // GET /lastMonthMemberStructureDetails
    lastMonthMemberStructureDetails () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/gasolineMobile/lastMonthMemberStructureDetails', {
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.memberList = res.data
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    //   3. 近六个月明细（汽油活跃会员数、汽油忠诚会员数、新增及流失汽油会员数）
    // GET /lastSixMonthDetail
    lastSixMonthDetail () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/gasolineMobile/lastSixMonthDetail', {
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.monthList = res.data.activeMember.monthList
          this.totalList = res.data.activeMember.totalList
          this.data93 = res.data.activeMember.ninethreeList
          this.data97 = res.data.activeMember.ninesevenList
          this.data98 = res.data.activeMember.nineeightList
          if (this.monthList.length > 0 && this.totalList.length > 0 && this.data93.length > 0 && this.data97.length > 0 && this.data98.length > 0) {
            this.status1 = false
            this.$nextTick(function () {
              this.drawCharts()
            })
          } else {
            this.status1 = true
          }
          var loyalMemberList = res.data.loyalMemberList
          var loyalMemberdata = []
          var loyalMembermonth = []
          for (var i = 0; i < loyalMemberList.length; i++) {
            loyalMemberdata.push(loyalMemberList[i].count)
            loyalMembermonth.push(loyalMemberList[i].name + '月')
          }
          this.loyalMemberdata = loyalMemberdata
          this.loyalMembermonth = loyalMembermonth
          if (this.loyalMemberdata.length > 0 && this.loyalMembermonth.length > 0) {
            this.status2 = false
            this.$nextTick(function () {
              this.drawCharts12()
            })
          } else {
            this.status2 = true
          }

          var addMemberList = res.data.memberCount.addMemberList
          var lostMemberList = res.data.memberCount.lostMemberList

          var addMonth = []
          var addData = []
          for (var j = 0; j < addMemberList.length; j++) {
            addData.push(addMemberList[j].count)
            addMonth.push(addMemberList[j].month + '月')
          }
          var lostData = []
          for (var k = 0; k < lostMemberList.length; k++) {
            lostData.push(lostMemberList[k].count)
          }
          this.addData = addData
          this.addMonth = addMonth
          this.lostData = lostData
          if (this.addData.length > 0 && this.addMonth.length > 0 && this.lostData.length > 0) {
            this.status3 = false
            this.$nextTick(function () {
              this.drawBar()
            })
          } else {
            this.status3 = true
          }
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        console.log(this)
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },

    //   4. 活跃会员结算方式
    // GET /activeMemberPaymentType
    activeMemberPaymentType () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/gasolineMobile/activeMemberPaymentType', {
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.payStyleList = res.data
          console.log(res.data)
          if (this.payStyleList.length > 0) {
            this.status4 = false
            this.$nextTick(function () {
              this.drawChartPayStyle()
            })
          } else {
            this.status4 = true
          }
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    //     5. 近三个月明细（会员加油频次）
    // GET /lastThreeMonthDetail
    lastThreeMonthDetail () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/gasolineMobile/lastThreeMonthDetail', {
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          console.log(res.data)

          var data = res.data.monthList
          var monthList3 = []
          for (var i = 0; i < data.length; i++) {
            monthList3.push(data[i] + '月')
          }
          this.monthList3 = monthList3.reverse()
          this.tmList = res.data.tmList.reverse()
          this.lmList = res.data.lmList.reverse()
          this.llmList = res.data.llmList.reverse()
          if (this.monthList3.length > 0 && this.tmList.length > 0 && this.lmList.length > 0 && this.llmList.length > 0) {
            this.status5 = false
            this.$nextTick(function () {
              this.drawBar3()
            })
          } else {
            this.status5 = true
          }
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    //      6. 地市排名
    // GET /cityRank
    cityRank () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/gasolineMobile/cityRank', {
        oilCode: this.oilCode
      }).then(res => {
        if (res.result === true) {
          this.$dialog.loading.close()
          console.log(res)
          this.clientInfo = res.rows
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    formattDeta30 (val) {
      var str = ''
      if (val.slice(0, 1) === '0') {
        str = val.slice(1, 2) + '月'
      } else {
        str = val + '月'
      }
      return str
    },
    // 过去6个月卡车之家活跃会员和忠诚会员
    drawCharts () {
      this.chartLine = this.$echarts.init(document.getElementById('chartLineLeft'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: { // 设置区分（哪条线属于什么）
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          data: ['92#', '95#', '98#', '合计']
        },
        color: ['#EB49D1', '#00CF8C', '#FFAB66', '#7838FF'], // 设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: { // 设置x轴
          type: 'category',
          boundaryGap: true, // 坐标轴两边不留白
          data: this.monthList,
          name: '', // X轴 name
          nameTextStyle: { // 坐标轴名称的文字样式
            color: '#4C4948',
            fontSize: 6
          },
          axisLine: { // 坐标轴轴线相关设置。
            lineStyle: {
              color: '#CDCBCB'
            }
          },
          axisLabel: {
            color: '#4C4948'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#F2F2F2',
            width: 1,
            type: 'solid'
          }
        },
        yAxis: {
          name: '',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#9FA0A0'
          },
          axisTick: {
            show: false
          },
          type: 'value'
        },
        grid: {
          left: '15%',
          borderColor: '#19507c',
          x2: 10
        },
        series: [
          {
            name: '92#',
            data: this.data93,
            // 显示数
            label: {
              show: false,
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value
                } else {
                  return ''
                }
              },
              position: 'top',
              textStyle: {
                color: '#4C4948',
                fontSize: 12,
                fontWeight: 600
              }
            },
            itemStyle: {
              color: '#EB49D1'
            },
            type: 'line' // 类型为折线图
          },
          {
            name: '95#',
            data: this.data97,
            // 显示数值
            label: {
              show: false,
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value
                } else {
                  return ''
                }
              },
              position: 'top',
              textStyle: {
                color: '#4C4948',
                fontSize: 12,
                fontWeight: 600
              }
            },
            itemStyle: {
              color: '#00CF8C'
            },
            type: 'line'
          },
          {
            name: '98#',
            data: this.data98,
            // 显示数值
            label: {
              show: false,
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value
                } else {
                  return ''
                }
              },
              position: 'top',
              textStyle: {
                color: '#4C4948',
                fontSize: 12,
                fontWeight: 600
              }
            },
            itemStyle: {
              color: '#FFAB66'
            },
            type: 'line'
          },
          {
            name: '合计',
            data: this.totalList,
            // 显示数值
            label: {
              show: false,
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value
                } else {
                  return ''
                }
              },
              position: 'top',
              textStyle: {
                color: '#4C4948',
                fontSize: 12,
                fontWeight: 600
              }
            },
            itemStyle: {
              color: '#7838FF'
            },
            type: 'line'
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      this.chartLine.setOption(option)
    },
    // 过去6个月卡车之家流失会员
    drawCharts12 () {
      this.chartLine = this.$echarts.init(document.getElementById('chartLineRight'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: { // 设置x轴
          type: 'category',
          boundaryGap: true, // 坐标轴两边不留白
          // data: ['6月', '7月', '8月', '9月', '10月', '11月'],
          data: this.loyalMembermonth,
          name: '', // X轴 name
          nameTextStyle: { // 坐标轴名称的文字样式
            color: '#4C4948',
            fontSize: 8
          },
          axisLine: { // 坐标轴轴线相关设置。
            lineStyle: {
              color: '#CDCBCB'
            }
          },
          axisLabel: {
            color: '#4C4948'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#F2F2F2',
            width: 1,
            type: 'solid'
          }
        },
        yAxis: {
          name: '',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#9FA0A0'
          },
          axisTick: {
            show: false
          },
          type: 'value'
        },
        grid: {
          left: '15%',
          borderColor: '#19507c',
          x2: 10
        },
        series: [
          {
            name: '汽油忠诚会员',
            data: this.loyalMemberdata,
            // data: [55, 61, 67, 33, 33, 17],
            // 显示数值
            label: {
              show: false,
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value
                } else {
                  return ''
                }
              },
              position: 'top',
              textStyle: {
                color: '#53C864',
                fontSize: 12,
                fontWeight: 600
              }
            },
            type: 'bar', // 类型为折线图
            barWidth: '20',
            itemStyle: {
              normal: {
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#31C7FF'
                }, {
                  offset: 1,
                  color: '#1696FF'
                }])
              }
            }
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      this.chartLine.setOption(option)
    },
    // 过去6个月柴油豆产生和兑换线下非油品
    drawBar () {
      this.chartBar = this.$echarts.init(document.getElementById('chartBarLeft'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: { // 设置区分（哪条线属于什么）
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          data: ['新增', '流失']
        },
        color: ['#FAD961', '#E3354F'], // 设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: { // 设置x轴
          type: 'category',
          boundaryGap: true, // 坐标轴两边不留白
          data: this.addMonth,
          // data: ['6月', '7月', '8月', '9月', '10月', '11月'],
          name: '', // X轴 name
          nameTextStyle: { // 坐标轴名称的文字样式
            color: '#4C4948',
            fontSize: 6
          },
          axisLine: { // 坐标轴轴线相关设置。
            lineStyle: {
              color: '#CDCBCB'
            }
          },
          axisLabel: {
            color: '#4C4948'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#F2F2F2',
            width: 1,
            type: 'solid'
          }
        },
        yAxis: {
          name: '',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#9FA0A0'
          },
          axisTick: {
            show: false
          },
          type: 'value'
        },
        grid: {
          left: '15%',
          borderColor: '#19507c',
          x2: 10
        },
        series: [
          {
            name: '新增',
            data: this.addData,
            // data: [4000, 8000, 7000, 6000, 5000, 7000],
            // 显示数
            label: {
              show: false,
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value
                } else {
                  return ''
                }
              },
              position: 'top',
              textStyle: {
                color: '#4C4948',
                fontSize: 12,
                fontWeight: 600
              }
            },
            type: 'bar', // 类型为折线图
            barWidth: '10',
            itemStyle: {
              normal: {
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#FAD961'
                }, {
                  offset: 1,
                  color: '#F7BB1C'
                }])
              }
            }
          },
          {
            name: '流失',
            data: this.lostData,
            // data: [4936, 8390, 7402, 6482, 5000, 7864],
            // 显示数值
            label: {
              show: false,
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value
                } else {
                  return ''
                }
              },
              position: 'top',
              textStyle: {
                color: '#4C4948',
                fontSize: 12,
                fontWeight: 600
              }
            },
            type: 'bar',
            barWidth: '10',
            itemStyle: {
              normal: {
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#FF7C87'
                }, {
                  offset: 1,
                  color: '#E3354F'
                }])
              }
            }
          }
        ]
      }
      this.chartBar.setOption(option)
    },
    drawChartPayStyle () {
      // 图表颜色，从右上角开始
      var color = ['#A4DA73', '#BC89FE', '#FF7979', '#7634FF', '#21A9FF', '#FFB45C']
      var dataList = []
      for (var i = 0; i < this.payStyleList.length; i++) { // 循环处理图表数据
        var x = i
        if (x > color.length - 1) {
          x = color.length - 1
        }
        var data = {
          value: this.payStyleList[i].count,
          name: this.payStyleList[i].name,
          itemStyle: {
            color: color[x]
          }
        }
        dataList.push(data)
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('payStyleChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          show: false
        },
        tooltip: { // 鼠标移到图里面的浮动提示框
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          showContent: true
        },
        legend: {
          show: false,
          bottom: 5,
          left: 'center',
          data: this.payStyleName,
          textStyle: {
            color: '#4C4948',
            fontSize: 12
          },
          icon: 'circle', // 这个字段控制形状类型包括circle,rect,roundRect等
          itemWidth: 8, // 设置宽度
          itemHeight: 8 // 设置高度
        },
        series: [
          {
            left: 'left',
            name: '支付习惯',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'], // 调整上下边距，x和y
            itemStyle: { // 设置饼状图字体颜色
              normal: {
                label: {
                  textStyle: {
                    color: '#4C4948',
                    fontSize: 10
                  }
                }
              }
            },
            labelLine: { // 饼图指示线长度
              normal: {
                length: 2
              }
            },
            label: { // 以百分比显示设置
              normal: {
                show: true,
                formatter: '{b}  \n {d}% \n ', // {c|{c}} \n{hr|}\n {b|{b}}
                textStyle: {
                  color: '#4C4948',
                  fontSize: 10
                }
              }
            },
            data: dataList,
            emphasis: {
              itemStyle: {
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0)'
              }
            }
          }
        ]
      })
    },
    // 近3个月会员加油频次
    drawBar3 () {
      this.chartBar = this.$echarts.init(document.getElementById('chartBar3'))
      // 指定图表的配置项和数据
      var option = {
        title: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: { // 设置区分（哪条线属于什么）
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          data: this.monthList3
        },
        color: ['#A9F09B', '#31C7FF', '#7634FF', '#E335D8'], // 设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: { // 设置x轴
          type: 'category',
          boundaryGap: true, // 坐标轴两边不留白
          data: this.times3,
          name: '', // X轴 name
          nameTextStyle: { // 坐标轴名称的文字样式
            color: '#4C4948',
            fontSize: 6
          },
          axisLabel: {
            inside: false,
            textStyle: {
              color: '#4C4948',
              fontSize: '12'
            },
            interval: 0, // 让文字全部显示
            formatter (value) { // 垂直显示文字
              /* eslint-disable */
              // 每隔4个字符换行
              let str = value.replace(/[^\x00-\xff]/g, '$&\x01').replace(/.{8}\x01?/g, '$&\n').replace(/\x01/g, '')
              /* eslint-enable */
              return str
            }
          },
          axisLine: { // 坐标轴轴线相关设置。
            lineStyle: {
              color: '#CDCBCB'
            }
          }
        },
        splitLine: {
          lineStyle: {
            color: '#F2F2F2',
            width: 1,
            type: 'solid'
          }
        },
        yAxis: {
          name: '',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#9FA0A0'
          },
          axisTick: {
            show: false
          },
          type: 'value'
        },
        grid: {
          left: '15%',
          borderColor: '#19507c',
          x2: 10
        },
        series: [
          {
            name: this.monthList3[0],
            data: this.tmList,
            // data: [192, 193, 323, 298],
            // 显示数
            label: {
              show: false,
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value
                } else {
                  return ''
                }
              },
              position: 'top',
              textStyle: {
                color: '#4C4948',
                fontSize: 12,
                fontWeight: 600
              }
            },
            type: 'bar', // 类型为折线图
            barWidth: '10',
            itemStyle: {
              normal: {
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#A9F09B'
                }, {
                  offset: 1,
                  color: '#7BCE59'
                }])
              }
            }
          },
          {
            name: this.monthList3[1],
            data: this.lmList,
            // data: [208, 182, 401, 208],
            // 显示数值
            label: {
              show: false,
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value
                } else {
                  return ''
                }
              },
              position: 'top',
              textStyle: {
                color: '#4C4948',
                fontSize: 12,
                fontWeight: 600
              }
            },
            type: 'bar',
            barWidth: '10',
            itemStyle: {
              normal: {
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#31C7FF'
                }, {
                  offset: 1,
                  color: '#1696FF'
                }])
              }
            }
          },
          {
            name: this.monthList3[2],
            data: this.llmList,
            // data: [280, 222, 352, 318],
            // 显示数
            label: {
              show: false,
              formatter: function (params) {
                if (params.value > 0) {
                  return params.value
                } else {
                  return ''
                }
              },
              position: 'top',
              textStyle: {
                color: '#4C4948',
                fontSize: 12,
                fontWeight: 600
              }
            },
            type: 'bar', // 类型为折线图
            barWidth: '10',
            itemStyle: {
              normal: {
                // 颜色渐变
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#AB99FF'
                }, {
                  offset: 1,
                  color: '#7634FF'
                }])
              }
            }
          }
        ]
      }
      this.chartBar.setOption(option)
    }
  },
  filters: {
    // 数据返回空时候处理
    formatData  (val) {
      if (val === '' || val === null || val === undefined) {
        var str = '无'
        return str
      } else {
        str = val
        return str
      }
    },
    // 数据返回空时候处理
    formatData0 (val) {
      if (val === '' || val === null || val === undefined) {
        var str = '0'
        return str
      } else {
        str = val
        return str
      }
    }
  }

}
</script>

<style lang="stylus" scoped>
@media screen and (min-width: 415px) {
  .big_box{
    padding:0 20px 20px 20px;
     .popup_top{
      width:100%;
      height:32px;
      position:relative;
      .close_img{
        width:20px;
        height:20px;
        position:absolute;
        top:50%;
        margin-top:-10px;
        right:0px;
      }
    }
    .msg_p{
      line-height:32px;
      fontsize:16px;
      color:#4C4948;
    }
     .box_top{
      width:100%;
      background: #fff;
      height:224px;
      margin-bottom:10px;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(76,73,72,1);
      border-radius:6px;
      .box_top_tab{
        text-align :center;
        width:31%;
        height:86px;
        background:rgba(242,247,249,1);
        border-radius:12px;
        font-size:20px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(76,73,72,1);
        .wenImg{
          width:42px;
        }
        .num{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size:24px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(0,138,255,1);
          line-height:32px;
        }
      }
    }
      .structure{
      border-radius:6px;
      background #fff;
      padding:0 20px 20px 20px;
      margin-bottom: 10px;
      .title{
        line-height 60px;
        font-size:24px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:#7634FF;

        border-bottom:1px solid #CDCBCB;
      }
      .structure_b{
        padding-top:10px;
        .structure_b_t{
          .tab{
            padding:10px 10px;
            text-align :center;
            width:19%;
            background:rgba(242,247,249,1);
            border-radius:6px;
            font-size:9px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(76,73,72,1);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .tab_title{
              font-size:11px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(76,73,72,1);
              line-height:24px;
            }
          }
          .tab_l{
            width:50%;
            p{
              font-size:12px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(149,148,148,1);
              line-height:20px;
            }
            .num{
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              font-size:12px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(118,52,255,1);
              line-height:20px;
            }
          }
          .structure_b_b_tab{
            padding:10px 10px;
            text-align :center;
            width:19%;
            background:rgba(242,247,249,1);
            border-radius:6px;
            font-size:9px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(76,73,72,1);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .tab_title{
              font-size:16px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(76,73,72,1);
              line-height:32px;
            }
          }
        }
      }
    }
    //实时数据
    .real_time_data{
      // height:300px;
      border-radius:6px;
      background #fff;
      padding:0 20px 20px 20px;
      .title{
        line-height 40px;
        font-size:18px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(22,150,255,1);
        border-bottom:1px solid rgba(229,229,229,1);
      }
      .table_box{
        // height:235px;
        .table_box_l,.table_box_r{
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(136,136,136,1);
          p{
            text-align :center;
            line-height :40px;
            font-size:16px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(76,73,72,1);
          }
        }
        .table_box_l{
          border-right:1px solid rgba(229,229,229,1);
          padding-right:20px;
        }
        .table_box_r{
          padding-left:20px;
        }
  //表格样式
  .table{
    width: 100%;
    border-collapse:collapse;
  }
  .table tr td{
    font-size: 12px;
    text-align: center;
  }
  .table tr td:nth-child(1),
  .table tr td:nth-child(2),
  .table tr td:nth-child(3){
    width:25%;
    line-height :30px;
  }
  .table>tbody>tr,.table>thead{
    display: table;
    width: 100%;
    table-layout: fixed; /* 重要  表格固定算法 */
  }
  .table>tbody{
    height: 230px;
    display: block;
    overflow: hidden;
    overflow-y: auto;
  }
   .name{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    }
  // tr:nth-child(2n-1){
  //     height:24px;
  //     text-align: center;
  //     font-size:12px;
  //     font-family:PingFangSC-Regular,PingFang SC;
  //     font-weight:400;
  //     color:rgba(76,73,72,1);
  //     background:rgba(241,246,249,1);
  //   }
      .table_th{
        width:25%;
        height:24px;
        text-align: center;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(136,136,136,1);
        line-height: 16px;
      }
      }
    }
    //会员数据
      .member_data{
        height:350px;
        border-radius:6px;
        background #fff;
        padding:0 20px 20px 20px;
        margin-top:10px;
        .title{
          line-height 40px;
          font-size:18px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(22,150,255,1);
          border-bottom:1px solid rgba(229,229,229,1);
        }
        .member_box{
          height:290px;
          .member_l,.member_r{
            padding:0 10px 0 10px;
            width:50%;
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(136,136,136,1);
            p{
              text-align :left;
              line-height :40px;
              font-size:16px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(76,73,72,1);
            }
          .table{
            width: 100%;
            border-collapse:collapse;
          }
          .table tr td{
            font-size: 12px;
            text-align: center;
          }
          .table tr td:nth-child(1),
          .table tr td:nth-child(2),
          .table tr td:nth-child(3){
            width:25%;
            line-height :30px;
          }
          .table>tbody>tr,.table>thead{
            display: table;
            width: 100%;
            table-layout: fixed; /* 重要  表格固定算法 */
          }
          .table>tbody{
            height:230px;
            display: block;
            overflow: hidden;
            overflow-y: auto;
          }
          .name{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            }
          // tr:nth-child(2n-1){
          //     height:24px;
          //     text-align: center;
          //     font-size:12px;
          //     font-family:PingFangSC-Regular,PingFang SC;
          //     font-weight:400;
          //     color:rgba(76,73,72,1);
          //     background:rgba(241,246,249,1);
          //   }
              .table_th{
                width:25%;
                height:24px;
                text-align: center;
                font-size:12px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(136,136,136,1);
                line-height: 16px;
              }
          }
          .member_l{
            border-right:1px solid rgba(229,229,229,1);
          }
        }

      }
  }
}
@media screen and (max-width: 414px) {
   .big_box{
    padding:0 10px 10px 10px;
    .popup_top{
      width:100%;
      height:24px;
      position:relative;
      .close_img{
        width:16px;
        height:16px;
        position:absolute;
        top:50%;
        margin-top:-8px;
        right:0px;
      }
    }
    .msg_p{
      line-height:24px;
      fontsize:12px;
      color:#4C4948;
    }
    .box_top{
      width:100%;
      background: #fff;
      height:120px;
      margin-bottom:10px;
      font-size:10px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(76,73,72,1);
      border-radius:6px;
      .box_top_tab{
        text-align :center;
        width:31%;
        height:45px;
        background:rgba(242,247,249,1);
        border-radius:6px;
        font-size:9px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(76,73,72,1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .wenImg{
          width:20px;
        }
        .num{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size:12px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(0,138,255,1);
          line-height:24px;
        }
      }
    }
    .structure{
      border-radius:6px;
      background #fff;
      padding:0 20px 20px 20px;
      margin-bottom: 10px;
      .title{
        line-height 40px;
        font-size:18px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:#7634FF;
        line-height 40px;
        border-bottom:1px solid #CDCBCB;
      }
      .structure_b{
        padding-top:10px;
        .structure_b_t{
          .tab{
            padding:10px 10px;
            text-align :center;
            width:31%;
            background:rgba(242,247,249,1);
            border-radius:6px;
            font-size:9px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(76,73,72,1);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .tab_title{
              font-size:11px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(76,73,72,1);
              line-height:24px;
            }
          }
          .tab_l{
            width:50%;
            p{
              font-size:10px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(149,148,148,1);
              line-height:16px;
            }
            .num{
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              font-size:10px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(118,52,255,1);
              line-height:16px;
            }
          }
          .structure_b_b_tab{
            margin-top:10px;
            padding:10px 10px;
            text-align :center;
            width:48%;
            background:rgba(242,247,249,1);
            border-radius:6px;
            font-size:9px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(76,73,72,1);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .tab_title{
              font-size:11px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(76,73,72,1);
              line-height:24px;
            }
          }
        }
      }
    }
    //实时数据
    .real_time_data{
      border-radius:6px;
      background #fff;
      padding:0 20px 20px 20px;
      .title{
        line-height 40px;
        font-size:18px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(22,150,255,1);
        line-height 40px;
        border-bottom:1px solid rgba(229,229,229,1);
      }
      .table_box{
        display:block!important;
        .table_box_l,.table_box_r{
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(136,136,136,1);
          p{
            text-align :left;
            line-height :40px;
            font-size:16px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(76,73,72,1);
          }
        }
  //表格样式
  .table{
    width: 100%;
    border-collapse:collapse;
  }
  .table tr td{
    font-size: 12px;
    text-align: center;
  }
  .table tr td:nth-child(1),
  .table tr td:nth-child(2),
  .table tr td:nth-child(3){
    width:25%;
    line-height :30px;
  }
  .table>tbody>tr,.table>thead{
    display: table;
    width: 100%;
    table-layout: fixed; /* 重要  表格固定算法 */
  }
  .table>tbody{
    height: 180px;
    display: block;
    overflow: hidden;
    overflow-y: auto;
  }
   .name{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    }
  // tr:nth-child(2n-1){
  //     height:24px;
  //     text-align: center;
  //     font-size:12px;
  //     font-family:PingFangSC-Regular,PingFang SC;
  //     font-weight:400;
  //     color:rgba(76,73,72,1);
  //     background:rgba(241,246,249,1);
  //   }
      .table_th{
        width:25%;
        height:24px;
        text-align: center;
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(136,136,136,1);
        line-height: 16px;
      }
      }
    }
    //会员数据
      .member_data{
        border-radius:6px;
        background #fff;
        padding:0 10px 10px 10px;
        margin-top:10px;
        .title{
          line-height 40px;
          font-size:18px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(22,150,255,1);
          line-height 40px;
          border-bottom:1px solid rgba(229,229,229,1);
        }
        .member_box{
          display:block;
          .member_l,.member_r{
            padding:0 10px 0 10px;
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(136,136,136,1);
            p{
              text-align :left;
              line-height :40px;
              font-size:16px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(76,73,72,1);
            }
             .table{
            width: 100%;
            border-collapse:collapse;
          }
          .table tr td{
            font-size: 12px;
            text-align: center;
          }
          .table tr td:nth-child(1),
          .table tr td:nth-child(2),
          .table tr td:nth-child(3){
            width:25%;
            line-height :30px;
          }
          .table>tbody>tr,.table>thead{
            display: table;
            width: 100%;
            table-layout: fixed; /* 重要  表格固定算法 */
          }
          .table>tbody{
            height: 180px;
            display: block;
            overflow: hidden;
            overflow-y: auto;
          }
          .name{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            }
          // tr:nth-child(2n-1){
          //     height:24px;
          //     text-align: center;
          //     font-size:12px;
          //     font-family:PingFangSC-Regular,PingFang SC;
          //     font-weight:400;
          //     color:rgba(76,73,72,1);
          //     background:rgba(241,246,249,1);
          //   }
            .table_th{
              width:25%;
              height:24px;
              text-align: center;
              font-size:12px;
              font-family:PingFangSC-Regular,PingFang SC;
              font-weight:400;
              color:rgba(136,136,136,1);
              line-height: 16px;
            }

          }
        }

      }
  }
}

</style>
