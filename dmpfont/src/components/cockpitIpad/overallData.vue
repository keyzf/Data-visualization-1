<template>
  <div class="big_box">
     <div class="box_top igs-flex igs-flex9 igs-flex10">
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p class="igs-flex igs-flex2 igs-flex3">年度有效会员数 <img @click="showMsg(1)" class="wenImg" src="https://img.gdoil.cn/cockpit/static/ipadImg/wenhao.png" alt=""> </p>
          <p class="num">{{memberData.yearActiveMember|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2 ">
        <div style="width:100%;text-align:center;">
          <p class="igs-flex igs-flex2 igs-flex3">本月发展会员数 <img  @click="showMsg(2)" class="wenImg" src="https://img.gdoil.cn/cockpit/static/ipadImg/wenhao.png" alt=""> </p>
          <p class="num">{{memberData.tmDevelopmentMember|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p class="igs-flex igs-flex2 igs-flex3">累计发展会员数 <img  @click="showMsg(3)" class="wenImg" src="https://img.gdoil.cn/cockpit/static/ipadImg/wenhao.png" alt=""> </p>
          <p class="num">{{memberData.cumulativeDevelopmentMember|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p class="igs-flex igs-flex2 igs-flex3">本月流失会员数 <img @click="showMsg(4)" class="wenImg" src="https://img.gdoil.cn/cockpit/static/ipadImg/wenhao.png" alt=""> </p>
          <p class="num">{{memberData.tmLostMember|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p class="igs-flex igs-flex2 igs-flex3">本月忠诚会员数 <img  @click="showMsg(5)" class="wenImg" src="https://img.gdoil.cn/cockpit/static/ipadImg/wenhao.png" alt=""> </p>
          <p class="num">{{memberData.tmLoyalMember|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p class="igs-flex igs-flex2 igs-flex3">本月活跃会员数 <img  @click="showMsg(6)" class="wenImg" src="https://img.gdoil.cn/cockpit/static/ipadImg/wenhao.png" alt=""> </p>
          <p class="num">{{memberData.tmLivelyMember|formatData0}}</p>
        </div>
      </div>
    </div>
    <!-- 实时数据 -->
    <div class="real_time_data">
      <p class="title">实时数据</p>
      <div class="table_box igs-flex">
        <div class="table_box_l " >
          <p class="table_title">最新加油客户信息</p>
          <p v-if="clientInfo.length==0"  style="line-height:100px;text-align:center;">暂无信息</p>
          <div style="100%; height:190px; overflow:scroll;"  v-if="clientInfo.length>0">
           <table cellspacing="0" cellpadding="0" class="table">
              <thead>
                <th class="table_th">会员手机号</th>
                <th class="table_th">加油时间</th>
                <th class="table_th">加油升数</th>
                <th class="table_th">客户类型</th>
                <th class="table_th">会员等级</th>
                <th class="table_th">累计加油次数</th>
                <th class="table_th">上次加油时间</th>
              </thead>
              <tbody>
                  <tr v-for="(obj,idx) in clientInfo" :key="idx">
                    <td class="table_td">{{obj.customerPhone|formatData}}</td>
                    <td class="table_td">{{obj.redeemTime|formatData}}</td>
                    <td class="table_td">{{obj.RefuelLiter|formatData0}}</td>
                    <td class="table_td">{{obj.customerType|formatData}}</td>
                    <td class="table_td">{{obj.memberLevel|formatData}}</td>
                    <td class="table_td">{{obj.refuelTotal|formatData0}}</td>
                    <td class="table_td">{{obj.lastTimeRefule|formatData}}</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="table_box_r">
          <p  class="table_title">本日柴油豆兑换信息</p>
          <p v-if="todayDiesel.length==0"  style="line-height:100px;text-align:center;">暂无信息</p>
           <table cellspacing="0" cellpadding="0" class="table" v-if="todayDiesel.length>0">
              <thead>
                <th class="table_th" style="width:20%">会员手机号</th>
                <th class="table_th" style="width:20%">兑换时间</th>
                <th class="table_th" style="width:20%">兑换商品</th>
                <th class="table_th" style="width:20%">柴油豆余额</th>
                <th class="table_th" style="width:20%">兑换喜好</th>
              </thead>
              <tbody>
                  <tr v-for="(item,idx) in todayDiesel" :key="idx">
                    <td class="table_td" style="width:20%">{{item.customerPhone|formatData}}</td>
                    <td class="table_td" style="width:20%">{{item.redeemTime|formatData}}</td>
                    <td class="table_td name" style="width:20%">{{item.redeemProduct|formatData}}</td>
                    <td class="table_td " style="width:20%">{{item.accountBalance|formatData0}}</td>
                    <td class="table_td name" style="width:20%">{{item.redeemLike|formatData}}</td>
                  </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
    <!-- 会员数据 -->
     <div class="member_data">
      <p class="title">会员数据</p>
      <div class="member_box igs-flex">
        <div class="member_l">
           <p>近6个月活跃会员及忠诚会员数</p>
           <p v-if="status1" style="line-height:100px;text-align:center;">暂无数据</p>
           <div v-else id="chartLineLeft" style="width:100%;height: 280px;"> </div>
        </div>
        <div class="member_r">
           <p>过去6个月卡车之家流失新增会员</p>
           <p v-if="status2" style="line-height:100px;text-align:center;">暂无数据</p>
          <div  v-else id="chartLineRight" style="width:100%;height: 290px;"> </div>
        </div>
      </div>
    </div>
    <!-- 会员数据 -->
     <div class="member_data">
      <p class="title">销售数据</p>
      <div class="member_box igs-flex">
        <div class="member_l">
           <p>过去6个月柴油产生兑换线下非油品</p>
            <p v-if="status3" style="line-height:100px;text-align:center;">暂无数据</p>
           <div v-else id="chartBarLeft" style="width:100%;height: 280px;"> </div>
        </div>
        <div class="member_r">
          <p>近3个月会员加油频次</p>
          <p v-if="status4" style="line-height:100px;text-align:center;">暂无数据</p>
          <div v-else id="chartBar12" style="width:100%;height: 290px;"> </div>
        </div>
      </div>
    </div>
    <yd-popup v-model="showpopup" position="center" width="80%">
        <div style="background-color:#fff;padding:20px;">
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
      clientInfo: [
        // {
        //   customerPhone: '1610',
        //   redeemTime: '10:53',
        //   RefuelLiter: '100',
        //   customerType: '普通',
        //   memberLevel: '金',
        //   refuelTotal: '100',
        //   lastTimeRefule: '11:02'
        // }, {
        //   customerPhone: '1610',
        //   redeemTime: '10:53',
        //   RefuelLiter: '100',
        //   customerType: '普通',
        //   memberLevel: '金',
        //   refuelTotal: '100',
        //   lastTimeRefule: '11:02'
        // }
      ],
      todayDiesel: [],
      chartLineDeta: [],
      chartLineDeta12: [],
      chartLineLeftA: [],
      chartLineLeft2: [],
      chartLineLeft3: [],
      chartLineAdd: [],
      chartRightDeta: [],
      chartLineRight1: [],
      chartLineRight2: [],
      dieselBeanProductList: [],
      dieselBeanExchange: [],
      times: ['1次', '2次', '3次', '3次以上'],
      chartdata9: [],
      chartdata10: [],
      chartdata11: [],
      month: [],
      status1: true,
      status2: true,
      status3: true,
      status4: true,
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
      this.newRefuelCustomerInfoByOilCodeList()
      this.todayDieselBeanRedeemInfoByOilCodeList()
      this.memberDataDetail()
      this.salesDataDetail()
    },
    showMsg (type) {
      if (type === 1) {
        this.msg = '自然年内加满50L柴油的会员人数'
      }
      if (type === 2) {
        this.msg = '当月注册且当月在本油站加柴油的会员人数'
      }
      if (type === 3) {
        this.msg = '本油站历史累计发展会员数'
      }
      if (type === 4) {
        this.msg = '距离最近一次加柴油超过90天的会员人数'
      }
      if (type === 5) {
        this.msg = '指最近3次在油站加柴油时间间隔不超90天，且最近1次加柴油距离统计时间不超90天的会员人数'
      }
      if (type === 6) {
        this.msg = '当月有消费柴油的会员人数'
      }
      this.showpopup = true
    },
    //     1. 根据油站编码获取整体看板明细
    // GET /overallDetails?oilCode=33250135
    overallDetails () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thMobile/overallDetails', {
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.memberData = res.data
        } else {
          if (res.retcode === '-1') {
            // this.$router.push({
            //   name: 'loginDiesel'
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
    //    2. 根据油站编码获取最新加油客户信息列表
    // GET /newRefuelCustomerInfoByOilCodeList?page=1&pageSize=5&oilCode=33250135
    newRefuelCustomerInfoByOilCodeList () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thMobile/newRefuelCustomerInfoByOilCodeList', {
        page: 1,
        pageSize: 5,
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          if (res.rows.length > 0) {
            this.clientInfo = res.rows
            console.log(this.clientInfo)
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
    //     3. 根据油站编码获取本日柴油豆兑换信息列表
    // GET /todayDieselBeanRedeemInfoByOilCodeList?page=1&pageSize=5&oilCode=33250135
    todayDieselBeanRedeemInfoByOilCodeList () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thMobile/todayDieselBeanRedeemInfoByOilCodeList', {
        page: 1,
        pageSize: 5,
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          if (res.rows.length > 0) {
            this.todayDiesel = res.rows
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
    //     4. 会员数据明细
    // GET /memberDataDetail?oilCode=33250135
    memberDataDetail () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thMobile/memberDataDetail', {
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var avtiveMemberList = res.data.avtiveMemberList
          var loyalMemberList = res.data.loyalMemberList
          var lostMemberList = res.data.lostMemberList
          var addMemberList = res.data.addMemberList
          var date = []
          var chartLineLeftA = []
          for (var i = 0; i < avtiveMemberList.length; i++) {
            date.push(this.formattDeta30(avtiveMemberList[i].name.slice(-2)))
            chartLineLeftA.push(avtiveMemberList[i].count)
          }
          var chartLineLeft2 = []
          for (var j = 0; j < loyalMemberList.length; j++) {
            chartLineLeft2.push(loyalMemberList[j].count)
          }
          var chartLineLeft3 = []
          var chartLineAdd = []
          var date12 = []
          for (var k = 0; k < lostMemberList.length; k++) {
            chartLineLeft3.push(lostMemberList[k].count)
            date12.push(this.formattDeta30(lostMemberList[k].name.slice(-2)))
          }
          for (var l = 0; l < addMemberList.length; l++) {
            chartLineAdd.push(addMemberList[l].count)
          }
          // drawCharts
          this.chartLineDeta = date
          this.chartLineLeftA = chartLineLeftA
          this.chartLineLeft2 = chartLineLeft2
          if (this.chartLineDeta.length > 0 && this.chartLineLeftA.length > 0 && this.chartLineLeft2.length > 0) {
            this.status1 = false
            this.$nextTick(function () {
              this.drawCharts()
            })
          } else {
            this.status1 = true
          }

          // drawCharts12
          this.chartLineDeta12 = date12
          this.chartLineLeft3 = chartLineLeft3
          this.chartLineAdd = chartLineAdd
          if (this.chartLineDeta12.length > 0 && this.chartLineLeft3.length > 0) {
            this.status2 = false
            this.$nextTick(function () {
              this.drawCharts12()
            })
          } else {
            this.status2 = true
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
    //     5. 销售数据明细
    // GET /salesDataDetail?oilCode=33250135
    salesDataDetail () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thMobile/salesDataDetail', {
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var dieselBeanProductList = res.data.dieselBeanProductList
          var dieselBeanExchange = res.data.dieselBeanExchange
          var date = []
          var chartLineRight1 = []
          for (var i = 0; i < dieselBeanProductList.length; i++) {
            date.push(this.formattDeta30(dieselBeanProductList[i].name.slice(-2)))
            chartLineRight1.push(that.$util.fixedFunc(dieselBeanProductList[i].count / 10000))
          }
          var chartLineRight2 = []
          for (var j = 0; j < dieselBeanExchange.length; j++) {
            chartLineRight2.push(that.$util.fixedFunc(dieselBeanExchange[j].count / 10000))
          }
          this.chartRightDeta = date
          this.chartLineRight1 = chartLineRight1
          this.chartLineRight2 = chartLineRight2
          if (this.chartRightDeta.length > 0 && this.chartLineRight1.length > 0 && this.chartLineRight2.length > 0) {
            this.status3 = false
            this.$nextTick(function () {
              this.drawBar()
            })
          } else {
            this.status3 = true
          }

          var month = res.data.getRefuelFrequency.monthList.reverse()
          for (var k = 0; k < month.length; k++) {
            this.month.push(month[k] + '月')
          }
          this.chartdata9 = res.data.getRefuelFrequency.llmList.reverse()
          this.chartdata10 = res.data.getRefuelFrequency.lmList.reverse()
          this.chartdata11 = res.data.getRefuelFrequency.tmList.reverse()
          if (this.month.length > 0 && this.chartdata9.length > 0 && this.chartdata10.length > 0 && this.chartdata11.length > 0) {
            this.status4 = false
            this.$nextTick(function () {
              this.drawBar12()
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
          data: ['活跃会员', '忠诚会员']
        },
        color: ['#31C7FFF', '#7634FF'], // 设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: { // 设置x轴
          type: 'category',
          boundaryGap: true, // 坐标轴两边不留白
          data: this.chartLineDeta,
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
            name: '活跃会员',
            data: this.chartLineLeftA,
            // data: [195, 240, 160, 269, 102, 260],
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
                  color: '#31C7FF'
                }, {
                  offset: 1,
                  color: '#1696FF'
                }])
              }
            }
          },
          {
            name: '忠诚会员',
            data: this.chartLineLeft2,
            // data: [110, 199, 142, 179, 83, 179],
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
        legend: { // 设置区分（哪条线属于什么）
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          data: ['卡车之家流失会员', '卡车之家新增会员']
        },
        color: ['#FAD961', '#E3354F'],
        xAxis: { // 设置x轴
          type: 'category',
          boundaryGap: true, // 坐标轴两边不留白
          data: this.chartLineDeta12,
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
            name: '卡车之家流失会员',
            data: this.chartLineLeft3,
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
          }, {
            name: '卡车之家新增会员',
            data: this.chartLineAdd,
            type: 'line' // 类型为折线图
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
          orient: 'vertical',
          itemWidth: 6,
          itemHeight: 6,
          data: ['柴油豆产生', '线下兑换非油品柴油豆核销数']
        },
        color: ['#FAD961', '#E3354F'], // 设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: { // 设置x轴
          type: 'category',
          boundaryGap: true, // 坐标轴两边不留白
          data: this.chartRightDeta,
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
          name: '数量(万)',
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
            name: '柴油豆产生',
            data: this.chartLineRight2,
            // data: [6892],
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
            type: 'line' // 类型为折线图
            // barWidth: '10'
            // itemStyle: {
            //   normal: {
            //     // 颜色渐变
            //     color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //       offset: 0,
            //       color: '#FAD961'
            //     }, {
            //       offset: 1,
            //       color: '#F7BB1C'
            //     }])
            //   }
            // }
          },
          {
            name: '线下兑换非油品柴油豆核销数',
            data: this.chartLineRight1,
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
    // 近3个月会员加油频次
    drawBar12 () {
      this.chartBar = this.$echarts.init(document.getElementById('chartBar12'))
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
          data: this.month
        },
        color: ['#A9F09B', '#31C7FF', '#7634FF'], // 设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: { // 设置x轴
          type: 'category',
          boundaryGap: true, // 坐标轴两边不留白
          // data: this.chartLineDeta,
          data: this.times,
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
            name: this.month[0],
            data: this.chartdata9,
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
            name: this.month[1],
            data: this.chartdata10,
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
            name: this.month[2],
            data: this.chartdata11,
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
    formatData0  (val) {
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
      font-size:16px;
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
        width:30%;
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
    //实时数据
    .real_time_data{
      // height:300px;
      border-radius:6px;
      background #fff;
      padding:0 20px 20px 20px;
      .title{
        line-height 60px;
        font-size:24px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(22,150,255,1);
        border-bottom:1px solid rgba(229,229,229,1);
      }
      .table_box{
        // height:235px;
        .table_box_l,.table_box_r{
          width:50%;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(136,136,136,1);
          p{
            text-align :center;
            line-height :40px;
            font-size:20px;
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
          position:relative;
        }
  //表格样式
  .table{
    border-collapse:collapse;
  }
  .table tr td{
    font-size: 12px;
    text-align: center;
  }
  .table tr td:nth-child(1),
  .table tr td:nth-child(2),
  .table tr td:nth-child(3){
    width:80px;
    line-height :30px;
  }
  .table>tbody>tr,.table>thead{
    display: table;
    width: 100%;
    table-layout: fixed; /* 重要  表格固定算法 */
  }
  .table>tbody{
    height: 148px;
    display: block;
    overflow: hidden;
    overflow-y: auto;
  }
   .name{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    }
  tr:nth-child(2n-1){
      height:24px;
      text-align: center;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(76,73,72,1);
      background:rgba(241,246,249,1);
    }
      .table_th{
        width:80px;
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
          line-height 60px;
          font-size:24px;
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
              font-size:20px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(76,73,72,1);
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
        width:30%;
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
    border-collapse:collapse;
  }
  .table tr td{
    font-size: 12px;
    text-align: center;
  }
  .table tr td:nth-child(1),
  .table tr td:nth-child(2),
  .table tr td:nth-child(3){
    width:80px;
    line-height :30px;
  }
  .table>tbody>tr,.table>thead{
    display: table;
    width: 100%;
    table-layout: fixed; /* 重要  表格固定算法 */
  }
  .table>tbody{
    height: 148px;
    display: block;
    overflow: hidden;
    overflow-y: auto;
  }
   .name{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    }
  tr:nth-child(2n-1){
      height:24px;
      text-align: center;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(76,73,72,1);
      background:rgba(241,246,249,1);
    }
      .table_th{
        width:80px;
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
          }
        }

      }
  }
}

</style>
