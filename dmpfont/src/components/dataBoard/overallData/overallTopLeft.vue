<template>
  <div class="overallTopLeft">
    <div class="left_cont">
      <p class="title">销售目标</p>
      <div class="target">
        <p><img class="target_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-Insurancetarget.png" alt=""> 销售额总目标
        <span class="target_num">{{$util.funNum(salesTotalTarget.goalmonerysum) || 0}}</span>{{$util.funUnit(salesTotalTarget.goalmonerysum)}}元</p>
      </div>
      <div class="dash_board igs-flex">
        <div class="nowdatabox">
          <div class="dashBoardChart" id="dashBoardChart1">

          </div>
        </div>
        <div class="dashBoardRight">
            <div class="nowdata">
              <div class="title_box igs-flex">
                <p class="p1 igsflex igs-fliex2"><span class="dot" style="background:#0BC036"></span>当期完成量</p>
                <p class="p2">当期完成率</p>
              </div>
              <div class="nowdata_p">
                <p class="nowdata_span1 shuzi" style="color:#0BC036">{{$util.funNum(salesTotalTarget.currentcompleted) || 0}}<span class="unit_span">{{$util.funUnit(salesTotalTarget.currentcompleted)}}元</span> </p>
                <p class="nowdata_span2 shuzi" style="color:#0BC036">{{$util.fixedFunc1(salesTotalTarget.currentcompletedPercent) || 0}}%</p>
              </div>
            </div>
             <div class="igs-flex dashBoardRight_cont_t dashBoardRight_cont">
                <div style="width:60%;">
                  <p>同比去年</p>
                  <p style="color:rgba(251,36,36,1);"><span class="shuzi" :class="salesTotalTarget.goalmonerysumYoY>0?'classGreen':'classRed'">{{$util.funNum1(salesTotalTarget.goalmonerysumYoY)||0}}</span>{{$util.funUnit(salesTotalTarget.goalmonerysumYoY)}}元</p>
                </div>
                <div style="width:40%;">
                  <p>同比增减幅</p>
                  <p><span class="shuzi" :class="salesTotalTarget.amplificationYoY>0?'classGreen':'classRed'">{{$util.fixedFunc2(salesTotalTarget.amplificationYoY) || 0}}%</span></p>
                </div>
              </div>
            <div class="nowdata">
              <div class="title_box igs-flex">
                <p class="p1"><span class="dot"></span>当期应完成率</p>
                <p class="p2">超欠时间进度</p>
              </div>
              <div class="nowdata_p">
                <p class="nowdata_span1 shuzi" style="color:#0BC036">{{$util.fixedFunc1(salesTotalTarget.shouldfinishPercent) || 0}}%</p>
                <span class="nowdata_span2 shuzi"  :class="salesTotalTarget.overtimeSchedule>0?'classGreen':'classRed'">{{$util.fixedFunc2(salesTotalTarget.overtimeSchedule) || 0}}%</span>
              </div>
            </div>

              <!-- <div class="dashBoardRight_cont_b dashBoardRight_cont">
                <p><span class="dot" style="background:#0BC036"></span>累计应完成量 <span class="shuzi">{{$util.fixedFunc1(salesTotalTarget.shouldfinish) || 0}}</span></p>
              </div> -->
        </div>
      </div>
    </div>
     <div class="left_cont">
      <p class="title">保险销售目标</p>
      <div class="target">
        <p><img class="target_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-Insurancetarget.png" alt=""> 保险销售额目标
        <span class="target_num">{{$util.funNum(insuranceSalesTarget.goalmonerysum) || 0}}</span>{{$util.funUnit(insuranceSalesTarget.goalmonerysum)}}元</p>
      </div>
      <div class="dash_board igs-flex">
        <div class="nowdatabox">
          <div class="dashBoardChart" id="dashBoardChart2">

          </div>
        </div>
        <div class="dashBoardRight">
            <div class="nowdata">
              <div class="title_box igs-flex">
                <p class="p1"><span class="dot" style="background:#0BC036"></span>当期完成量</p>
                <p class="p2">当期完成率</p>
              </div>
              <div class="nowdata_p">
                <p class="nowdata_span1 shuzi" style="color:#0BC036">{{$util.funNum(insuranceSalesTarget.currentcompleted) || 0}}<span class="unit_span">{{$util.funUnit(insuranceSalesTarget.currentcompleted)}}元</span></p>
                <span class="nowdata_span2 shuzi" style="color:#0BC036">{{$util.fixedFunc1(insuranceSalesTarget.currentcompletedPercent) || 0}}%</span>
              </div>
            </div>
              <div class="igs-flex dashBoardRight_cont_t dashBoardRight_cont">
                <div style="width:60%;">
                  <p>同比去年</p>
                  <p style="color:rgba(251,36,36,1);"><span class="shuzi" :class="insuranceSalesTarget.goalmonerysumYoY>0?'classGreen':'classRed'">{{$util.funNum1(insuranceSalesTarget.goalmonerysumYoY) || 0 }}</span>{{$util.funUnit(insuranceSalesTarget.goalmonerysumYoY)}}元</p>
                </div>
                <div style="width:40%;">
                  <p>同比增减幅</p>
                  <p><span class="shuzi" :class="insuranceSalesTarget.amplificationYoY>0?'classGreen':'classRed'">{{$util.fixedFunc2(insuranceSalesTarget.amplificationYoY) || 0}}%</span></p>
                </div>
              </div>
              <div class="nowdata">
               <div class="title_box igs-flex">
                  <p class="p1"><span class="dot"></span>当期应完成率</p>
                  <p class="p2">超欠时间进度</p>
               </div>
              <div class="nowdata_p">
                <p class="nowdata_span1 shuzi" style="color:#0BC036">{{$util.fixedFunc1(insuranceSalesTarget.shouldfinishPercent) || 0}}%</p>
                <span class="nowdata_span2 shuzi" :class="insuranceSalesTarget.overtimeSchedule>0?'classGreen':'classRed'">{{$util.fixedFunc2(insuranceSalesTarget.overtimeSchedule) || 0}}%</span>
              </div>
            </div>
              <!-- <div class="dashBoardRight_cont_b dashBoardRight_cont">
                <p><span class="dot" style="background:#0BC036"></span>累计应完成量 <span class="shuzi">{{$util.fixedFunc1(insuranceSalesTarget.shouldfinish) || 0}}</span></p>
              </div> -->
        </div>
      </div>
    </div>
     <div class="left_cont">
      <p class="title">会员增长目标</p>
      <div class="target">
        <p><img class="target_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-Insurancetarget.png" alt=""> 新会员目标
        <span class="target_num"> {{$util.funNum(addMemberTarget.goalmonerysum) || 0}}</span>{{$util.funUnit(addMemberTarget.goalmonerysum)}}人</p>
      </div>
      <div class="dash_board igs-flex">
        <div class="nowdatabox">
          <div class="dashBoardChart" id="dashBoardChart3">

          </div>
        </div>
        <div class="dashBoardRight">
          <div class="nowdata">
            <div class="title_box igs-flex">
              <p class="p1"><span class="dot" style="background:#0BC036"></span>当期完成量</p>
              <p class="p2">当期完成率</p>
            </div>
              <div class="nowdata_p">
                <p class="nowdata_span1 shuzi" style="color:#0BC036">{{$util.funNum(addMemberTarget.currentcompleted) || 0}}<span class="unit_span">{{$util.funUnit(addMemberTarget.currentcompleted)}}人</span> </p>
                <span class="nowdata_span2 shuzi" style="color:#0BC036">{{$util.fixedFunc1(addMemberTarget.currentcompletedPercent) || 0}}%</span>
              </div>
            </div>
              <div class="igs-flex dashBoardRight_cont_t dashBoardRight_cont">
                <div style="width:60%;">
                  <p>同比去年</p>
                  <p style="color:rgba(251,36,36,1);"><span class="shuzi" :class="addMemberTarget.goalmonerysumYoY>0?'classGreen':'classRed'"> {{$util.funNum1(addMemberTarget.goalmonerysumYoY) || 0 }}</span>{{$util.funUnit(addMemberTarget.goalmonerysumYoY)}}人</p>
                </div>
                <div style="width:40%;">
                  <p>同比增减幅</p>
                  <p><span class="shuzi" :class="addMemberTarget.amplificationYoY>0?'classGreen':'classRed'">{{$util.fixedFunc2(addMemberTarget.amplificationYoY) || 0}}%</span></p>
                </div>
              </div>
               <div class="nowdata">
               <div class="title_box igs-flex">
                  <p  class="p1"><span class="dot"></span>当期应完成率</p>
                  <p class="p2">超欠时间进度</p>
               </div>
              <div class="nowdata_p">
                <p class="nowdata_span1 shuzi"  style="color:#0BC036">{{$util.fixedFunc1(addMemberTarget.shouldfinishPercent) || 0}}%</p>
                <span class="nowdata_span2 shuzi" :class="addMemberTarget.overtimeSchedule>0?'classGreen':'classRed'">{{$util.fixedFunc2(addMemberTarget.overtimeSchedule) || 0}}%</span>
              </div>
            </div>
        </div>
      </div>
    </div>
     <div class="left_cont">
      <p class="title">有效会员目标</p>
      <div class="target">
        <p><img class="target_img" src="https://img.gdoil.cn/cockpit/static/images/dataBoardH/icon-Insurancetarget.png" alt="">有效会员目标
        <span class="target_num"> {{$util.funNum(activeMemberTarget.goalmonerysum) || 0}}</span> {{$util.funUnit(activeMemberTarget.goalmonerysum)}}人</p>
      </div>
      <div class="dash_board igs-flex">
         <div class="nowdatabox">
          <div class="dashBoardChart" id="dashBoardChart4">

          </div>
        </div>
        <div class="dashBoardRight">
           <div class="nowdata">
             <div class="title_box igs-flex">
              <p class="p1"><span class="dot" style="background:#0BC036"></span>当期完成量</p>
              <p class="p2">当期完成率</p>
            </div>
              <div class="nowdata_p">
                <p class="nowdata_span1 shuzi" style="color:#0BC036">{{$util.funNum(activeMemberTarget.currentcompleted) || 0}}<span class="unit_span">{{$util.funUnit(activeMemberTarget.currentcompleted)}}人</span></p>
                <span class="nowdata_span2 shuzi" style="color:#0BC036">{{$util.fixedFunc1(activeMemberTarget.currentcompletedPercent) || 0}}%</span>
              </div>
            </div>
            <div class="nowdata">
             <div class="title_box igs-flex">
                  <p  class="p1"><span class="dot"></span>当期应完成率</p>
                  <p class="p2">超欠时间进度</p>
               </div>
              <div class="nowdata_p">
                <p class="nowdata_span1 shuzi" style="color:#0BC036">{{$util.fixedFunc1(activeMemberTarget.shouldfinishPercent) || 0}}%</p>
                <span class="nowdata_span2 shuzi" :class="activeMemberTarget.overtimeSchedule>0 ?'classGreen':'classRed'">{{$util.fixedFunc2(activeMemberTarget.overtimeSchedule) || 0}}%</span>
              </div>
            </div>
              <!-- <div class="igs-flex dashBoardRight_cont_t dashBoardRight_cont">
                <div style="width:60%;">
                  <p>同比去年</p>
                  <p style="color:rgba(251,36,36,1);"><span class="shuzi"> {{$util.funNum(activeMemberTarget.goalmonerysumYoY) || 0}}</span >{{$util.funUnit(activeMemberTarget.goalmonerysumYoY) || 0}}人</p>
                </div>
                <div style="width:40%;">
                  <p>同比增减幅</p>
                  <p><span class="shuzi">{{$util.fixedFunc1(activeMemberTarget.amplificationYoY) || 0}}%</span></p>
                </div>
              </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'overallTopLeft',
  data () {
    return {
      salesTotalTarget: '', // 销售目标
      addMemberTarget: '', // 会员增长目标
      activeMemberTarget: '', // 有效会员增长目标
      insuranceSalesTarget: '', // 保险目标

      // 销售目标
      salesTotaldata: {},
      insuranceSalesdata: {},
      addMemberdata: {},
      activeMemberdata: {}
    }
  },
  created () {

  },
  mounted () {
    // this.dashBoardChart1()
    // this.dashBoardChart2()
    // this.dashBoardChart3()
    // this.dashBoardChart4()
    this.membershipGrowthGoals()
  },
  methods: {
    //     1. 销售/会员增长目标
    // GET /bdview/appBusiAnalysis/membershipGrowthGoals
    membershipGrowthGoals () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/appBusiAnalysis/membershipGrowthGoals', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.salesTotalTarget = res.data.salesTotalTarget// 销售目标
          this.addMemberTarget = res.data.addMemberTarget// 会员增长目标
          this.activeMemberTarget = res.data.activeMemberTarget// 有效会员增长目标
          this.insuranceSalesTarget = res.data.insuranceSalesTarget// 保险目标
          console.log(this.insuranceSalesTarget)
          // 销售目标
          var currentcompletedPercent = res.data.salesTotalTarget.currentcompletedPercent// 销售目标当前月份百分比
          var shouldfinishPercent = res.data.salesTotalTarget.shouldfinishPercent// 应当完成百分比
          // console.log(this.currentcompletedPercent, this.shouldfinishPercent) addMemberdata
          if (currentcompletedPercent < shouldfinishPercent) {
            this.salesTotaldata.data1 = (currentcompletedPercent / 100).toFixed(2)
            this.salesTotaldata.bgcolor1 = '#0BC036'
            this.salesTotaldata.data2 = (shouldfinishPercent / 100).toFixed(2)
            this.salesTotaldata.bgcolor2 = '#C50000'
          } else {
            this.salesTotaldata.data1 = (shouldfinishPercent / 100).toFixed(2)
            this.salesTotaldata.bgcolor1 = '#C50000'
            this.salesTotaldata.data2 = (currentcompletedPercent / 100).toFixed(2)
            this.salesTotaldata.bgcolor2 = '#0BC036'
          }
          // 保险销售目标insuranceSalesdata
          var currentcompletedPercent2 = res.data.insuranceSalesTarget.currentcompletedPercent// 销售目标当前月份百分比
          var shouldfinishPercent2 = res.data.insuranceSalesTarget.shouldfinishPercent// 应当完成百分比
          if (currentcompletedPercent2 < shouldfinishPercent2) {
            this.insuranceSalesdata.data1 = (currentcompletedPercent2 / 100).toFixed(2)
            this.insuranceSalesdata.bgcolor1 = '#0BC036'
            this.insuranceSalesdata.data2 = (shouldfinishPercent2 / 100).toFixed(2)
            this.insuranceSalesdata.bgcolor2 = '#C50000'
          } else {
            this.insuranceSalesdata.data1 = (shouldfinishPercent2 / 100).toFixed(2)
            this.insuranceSalesdata.bgcolor1 = '#C50000'
            this.insuranceSalesdata.data2 = (currentcompletedPercent2 / 100).toFixed(2)
            this.insuranceSalesdata.bgcolor2 = '#0BC036'
          }
          // 会员增长目标addMemberdata
          var currentcompletedPercent3 = res.data.addMemberTarget.currentcompletedPercent// 销售目标当前月份百分比
          var shouldfinishPercent3 = res.data.addMemberTarget.shouldfinishPercent// 应当完成百分比
          if (currentcompletedPercent3 < shouldfinishPercent3) {
            this.addMemberdata.data1 = (currentcompletedPercent3 / 100).toFixed(2)
            this.addMemberdata.bgcolor1 = '#0BC036'
            this.addMemberdata.data2 = (shouldfinishPercent3 / 100).toFixed(2)
            this.addMemberdata.bgcolor2 = '#C50000'
          } else {
            this.addMemberdata.data1 = (shouldfinishPercent3 / 100).toFixed(2)
            this.addMemberdata.bgcolor1 = '#C50000'
            this.addMemberdata.data2 = (currentcompletedPercent3 / 100).toFixed(2)
            this.addMemberdata.bgcolor2 = '#0BC036'
          }
          // 有效会员增长目标activeMemberdata
          var currentcompletedPercent4 = res.data.activeMemberTarget.currentcompletedPercent// 销售目标当前月份百分比
          var shouldfinishPercent4 = res.data.activeMemberTarget.shouldfinishPercent// 应当完成百分比
          if (currentcompletedPercent4 < shouldfinishPercent4) {
            this.activeMemberdata.data1 = (currentcompletedPercent4 / 100).toFixed(2)
            this.activeMemberdata.bgcolor1 = '#0BC036'
            this.activeMemberdata.data2 = (shouldfinishPercent4 / 100).toFixed(2)
            this.activeMemberdata.bgcolor2 = '#C50000'
          } else {
            this.activeMemberdata.data1 = (shouldfinishPercent4 / 100).toFixed(2)
            this.activeMemberdata.bgcolor1 = '#C50000'
            this.activeMemberdata.data2 = (currentcompletedPercent4 / 100).toFixed(2)
            this.activeMemberdata.bgcolor2 = '#0BC036'
          }
          this.dashBoardChart1()
          this.dashBoardChart2()
          this.dashBoardChart3()
          this.dashBoardChart4()
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    dashBoardChart1 () {
      // 基于准备好的dom，初始化echarts实例
      var that = this
      let myChart = this.$echarts.init(document.getElementById('dashBoardChart1'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          formatter: '{c}%'
        },
        series: [
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              lineStyle: {
                color: [
                  [that.salesTotaldata.data1, that.salesTotaldata.bgcolor1], // 当前
                  [that.salesTotaldata.data2, that.salesTotaldata.bgcolor2], // 应该
                  [1, '#C8C8C8'] // 总数
                ],
                // color: that.colorArr,
                width: 15
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {// 仪表盘指针。
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {// 仪表盘指针样式。
              color: that.salesTotaldata.bgcolor1 // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            data: [{
              value: that.salesTotaldata.data1 * 100
            }]
          },
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              lineStyle: {
                color: [
                  [this.salesTotaldata.data1, this.salesTotaldata.bgcolor1], // 当前
                  [this.salesTotaldata.data2, this.salesTotaldata.bgcolor2], // 应该
                  [1, '#C8C8C8'] // 总数
                ],
                // color: that.colorArr,
                width: 15
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {// 仪表盘指针。
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {// 仪表盘指针样式。
              color: that.salesTotaldata.bgcolor2 // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            data: [{
              value: that.salesTotaldata.data2 * 100
            }]
          }
        ]
      })
    },
    dashBoardChart2 () {
      var that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('dashBoardChart2'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          formatter: '{c}%'
        },
        series: [
          {
            type: 'gauge',
            radius: '100%',
            axisLine: {
              lineStyle: {
                color: [
                  [that.insuranceSalesdata.data1, that.insuranceSalesdata.bgcolor1], // 当前
                  [that.insuranceSalesdata.data2, that.insuranceSalesdata.bgcolor2], // 应该
                  [1, '#C8C8C8'] // 总数
                ],
                width: 15
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {// 仪表盘指针。
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {// 仪表盘指针样式。
              color: that.insuranceSalesdata.bgcolor1 // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            data: [{
              value: that.insuranceSalesdata.data1 * 100
            }]
          },
          {
            type: 'gauge',
            radius: '100%',
            axisLine: {
              lineStyle: {
                color: [
                  [that.insuranceSalesdata.data1, that.insuranceSalesdata.bgcolor1], // 当前
                  [that.insuranceSalesdata.data2, that.insuranceSalesdata.bgcolor2], // 应该
                  [1, '#C8C8C8'] // 总数
                ],
                width: 15
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {// 仪表盘指针。
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {// 仪表盘指针样式。
              color: that.insuranceSalesdata.bgcolor2 // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            data: [{
              value: that.insuranceSalesdata.data2 * 100
            }]
          }
        ]
      })
    },
    dashBoardChart3 () {
      var that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('dashBoardChart3'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          formatter: '{c}%'
        },
        series: [
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              lineStyle: {
                color: [
                  [that.addMemberdata.data1, that.addMemberdata.bgcolor1], // 当前
                  [that.addMemberdata.data2, that.addMemberdata.bgcolor2], // 应该
                  [1, '#C8C8C8'] // 总数
                ],
                width: 15
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {// 仪表盘指针。
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {// 仪表盘指针样式。
              color: that.addMemberdata.bgcolor1 // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            data: [{
              value: that.addMemberdata.data1 * 100
            }]
          },
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              lineStyle: {
                color: [
                  [that.addMemberdata.data1, that.addMemberdata.bgcolor1], // 当前
                  [that.addMemberdata.data2, that.addMemberdata.bgcolor2], // 应该
                  [1, '#C8C8C8'] // 总数
                ],
                width: 15
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {// 仪表盘指针。
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {// 仪表盘指针样式。
              color: that.addMemberdata.bgcolor2 // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            data: [{
              value: that.addMemberdata.data2 * 100
            }]
          }
        ]
      })
    },
    dashBoardChart4 () {
      // 基于准备好的dom，初始化echarts实例
      var that = this
      let myChart = this.$echarts.init(document.getElementById('dashBoardChart4'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          formatter: '{c}%'
        },
        series: [
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              lineStyle: {
                color: [
                  [that.activeMemberdata.data1, that.activeMemberdata.bgcolor1], // 当前
                  [that.activeMemberdata.data2, that.activeMemberdata.bgcolor2], // 应该
                  [1, '#C8C8C8'] // 总数
                ],
                width: 15
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {// 仪表盘指针。
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {// 仪表盘指针样式。
              color: that.activeMemberdata.bgcolor1 // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            data: [{
              value: that.activeMemberdata.data1 * 100
            }]
          },
          {
            type: 'gauge',
            radius: '100%',
            startAngle: 220,
            endAngle: -40,
            axisLine: {
              lineStyle: {
                color: [
                  [that.activeMemberdata.data1, that.activeMemberdata.bgcolor1], // 当前
                  [that.activeMemberdata.data2, that.activeMemberdata.bgcolor2], // 应该
                  [1, '#C8C8C8'] // 总数
                ],
                width: 15
              }
            },
            // 分隔线样式。
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            pointer: {// 仪表盘指针。
              show: 1,
              length: '60%',
              width: 3
            },
            itemStyle: {// 仪表盘指针样式。
              color: that.activeMemberdata.bgcolor2 // 指针颜色，默认(auto)取数值所在的区间的颜色
            },
            // 仪表盘详情，用于显示数据。
            detail: {
              show: false
            },
            data: [{
              value: that.activeMemberdata.data2 * 100
            }]
          }
        ]
      })
    }
  },
  components: {

  }
}
</script>
<style lang="stylus" scoped>
  @import '../../../assets/css/mixin.styl'
    .overallTopLeft{
        background :#fff;
        height:vh(800);
        width:vw(640);
        margin-right:vw(10);
        padding:vh(15) vw(15);
        border-radius:6px;
        .classRed{
          color:rgba(251,36,36,1)!important;
        }
        .classGreen{
         color: #0BC036!important;
        }
        .left_cont{
          width:100%;
          height:25%;
          .title{
            font-size:vw(18);
            font-family:SourceHanSansCN-Medium,SourceHanSansCN;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:vh(27);
          }
          .target{
            font-size:vw(12);
            font-family:SourceHanSansCN-Normal,SourceHanSansCN;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:vh(24);
            padding-left:vw(40);
            position:relative;
            .target_img{
              width:vw(24);
              position:absolute;
              top:50%;
              transform: translate(0,-50%);
              left:vw(10);
            }
            .target_num{
              font-size:vw(20);
              font-family:DINAlternate-Bold,DINAlternate;
              font-weight:bold;
              color:rgba(51,51,51,1);
              line-height:vh(24);
            }
          }
          .dashBoardChart{
            height:100%;
            width:100%;
            background #fff;
            // padding-top:vh(20);
          }
          .nowdatabox{
              width:40%;
              height:vh(130);
              position:relative;
              .nowdata{
                width:100%;
                text-align:center;
                font-size:vw(8);
                position:absolute;
                bottom:vh(-20);
                left:0;
              }
            }
          .dashBoardRight{
            height:vh(100);
            width:60%;
            background #fff;
            font-size:vw(12);
            font-family:SourceHanSansCN-Normal,SourceHanSansCN;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:vh(20);
            padding:vh(10) vw(10);
            .unit_span{
              font-size:vw(12);
            }
            .dot{
              display:inline-block;
              width:6px;
              height:6px;
              border-radius:3px;
              background:#C50000;
              position:absolute;
              top:50%;
              margin-top:-3px;
              left:-10px;
            }
            .nowdata{
              margin-bottom:vh(5)
              .title_box{
                .p1{
                  width:60%
                  position:relative;
                }
                .p2{
                  width:40%
                }
              }
              .nowdata_p{
              display:flex;
              .nowdata_span1{
                display:inline-block;
                width:60%;
                text-align:left;
              }
              .nowdata_span2{
                display:inline-block;
                  width:40%;
                text-align:left;
              }
            }

            }
            .shuzi{
              font-size:vw(16);
              font-family:DINAlternate-Bold,DINAlternate;
              font-weight:bold;
              color:rgba(251,36,36,1);
              line-height:vh(19);
            }
            .dashBoardRight_cont{
              height:vh(40);
            }
            .dashBoardRight_cont_t{
                height:vh(50);
            }
            .dashBoardRight_cont_b{
              padding-top:vh(10);
              height:vh(30);
              line-height:vh(30);
            }
          }
        }
    }
</style>
