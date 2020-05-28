<template>
  <div class="todayData_box">
    <div class="box_top igs-flex igs-flex9 igs-flex10">
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p>今日发展会员/人</p>
          <p class="num">{{todayData.developMemberTotal|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p>累计会员/人</p>
          <p class="num">{{todayData.cumulativeDevelopMemberTotal|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p>今日消费会员/人</p>
          <p class="num">{{todayData.consumeMemberTotal|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p>会员加油升数/0#</p>
          <p class="num">{{todayData.memberRefuelTotal|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p>会员加油金额/元</p>
          <p class="num">{{todayData.memberRefuelAmountTotal|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p>产生积分</p>
          <p class="num">{{todayData.produceDieselBeanTotal|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p>兑换积分</p>
          <p class="num">{{todayData.redeemDieselBeanTotal|formatData0}}</p>
        </div>
      </div>
      <div class="box_top_tab igs-flex igs-flex2">
        <div style="width:100%;text-align:center;">
          <p>兑换喜好</p>
          <p class="num">{{todayData.redeemLike|formatData}}</p>
        </div>
       </div>
    </div>
     <div class="data_box" v-if="tadayList.length>0">
      <div class="box_b" v-for="(item, index) in tadayList" :key="index">
        <div class="igs-flex igs-flex4 igs-flex2 phone_bg">
          <div class="infobox">
            手机号后四位：<span class="blue_color">{{item.phone|formatData}}</span><img class="imgs" src="https://img.gdoil.cn/cockpit/static/ipadImg/icon_go.png" alt="">
            <span class="momber_type member_new" v-if="item.type == '新会员'">{{item.type}}</span>
            <span class="momber_type member_old" v-if="item.type == '老会员'">{{item.type}}</span>
            <span class="momber_type member_app" v-if="item.type == '非App会员'">{{item.type}}</span>
            <span class="momber_type member_car" v-if="item.type == '非卡车之家会员'">{{item.type}}</span>
            <span class="tishi" v-if="item.cue!=''">{{item.cue}}</span>
          </div>
          <div>消费时间：{{item.timeSpent|formatData}}</div>
        </div>
        <div class="box_b_b">
          <div class="igs-flex">
            <div class="box_b_l">汽油消费金额￥：<span>{{item.dieseConsumptionAmout|formatData0}}</span></div>
            <div class="box_b_l">消费次数：<span>{{item.refuelTotal|formatData0}}</span></div>
            <!-- <div class="box_b_l">积分余额：<span>{{item.dieselBeanBalance|formatData0}}</span></div> -->
          </div>
          <div class="igs-flex">
            <div class="box_b_l igs-flex igs-flex2">油非互动券(张)：<span class="blue_color">{{item.couponCount|formatData0}}</span> <img class="imgs_b" src="https://img.gdoil.cn/cockpit/static/ipadImg/icon_go.png" alt=""></div>
            <div class="box_b_l">兑换最多产品：<span>{{item.redeemMostProduct|formatData}}</span></div>
          </div>
          <div class="igs-flex">
            <div class="box_b_l">积分余额：<span>{{item.dieselBeanBalance|formatData0}}</span></div>
            <div class="box_b_l">会员等级：<span>{{item.memberLevel|formatData0}}</span></div>
          </div>
           <div class="igs-flex">
            <div class="box_b_l">绑定卡号：<span>{{item.isBindCardNo|formatData}}</span></div>
            <div class="box_b_l">绑定微信：<span>{{item.isbindWechat|formatData}}</span></div>
          </div>
        </div>
      </div>
    </div>
     <!-- 会员数据 -->
     <div class="member_data">
      <div class="member_box igs-flex">
        <div class="member_l">
           <p>线下兑换商品TOP5</p>
            <p v-if="isHaveGoods" style="line-height:100px;text-align:center;"> 暂无兑换商品</p>
           <div v-else id="onlineChart" :style="{width: '100%', height: '250px'}"></div>
        </div>
        <div class="jiange"></div>
        <div class="member_r">
           <p>支付习惯</p>
          <p v-if="isPayStyle" style="line-height:100px;text-align:center;"> 暂无支付习惯</p>
         <div v-else id="payStyleChart" :style="{width: '100%', height: '250px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeanMake',
  props: {
    oilCode: String // 油站编码
  },
  data () {
    return {
      todayData: '',
      tadayList: [],
      barData: [],
      barNum: [],
      isHaveGoods: true,
      isPayStyle: true

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
    console.log(this.oilCode)
    if (this.oilCode !== '') {
      this.initialize()
    }
  },

  methods: {
    initialize () {
      this.todayStationInfoByOilCode()
      this.todayStationSalesRecordByOilCodeList()
      this.todyRedeemOfflineTopListByOilCode()
      this.todyPaymentHabitsListByOilCode()
    },
    //   7. 根据油站编码获取当天油站相关信息
    // GET /todayStationInfoByOilCode?oilCode=33250135
    todayStationInfoByOilCode () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/gasolineMobile/todayStationInfoByOilCode', {
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.todayData = res.data
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    //    8. 根据油站编码获取当天销售记录
    // GET /todayStationSalesRecordByOilCodeList?oilCode=33250135
    todayStationSalesRecordByOilCodeList () {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/gasolineMobile/todayStationSalesRecordByOilCodeList', {
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          console.log(res)
          this.tadayList = res.rows
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    //   9. 获取线下兑换商品TOP5列表
    // GET /todyRedeemOfflineTopListByOilCode?oilCode=33250135&month=2020022
    todyRedeemOfflineTopListByOilCode () {
      let that = this
      this.$dialog.loading.open('加载中')
      this.$http.post('/webapi/bdview/gasolineMobile/todyRedeemOfflineTopListByOilCode', {
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          console.log(res)
          var dataList = res.rows
          if (dataList.length > 0) {
            var name = []
            var count = []
            for (var i = 0; i < dataList.length; i++) {
              name.push(dataList[i].name)
              count.push(dataList[i].count)
            }
            this.barData = name
            this.barNum = count
            console.log(this.barData)
            this.isHaveGoods = false
            this.$nextTick(function () {
              // 此时已经渲染完成
              this.drawChartOnline()
            })
          } else {
            this.isHaveGoods = true
          }
        } else {
          that.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    drawChartOnline () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('onlineChart'))
      // 绘制图表
      myChart.setOption({
        color: '#81B9FF',
        title: {
          show: false
        },
        tooltip: {},
        grid: {
          left: '1%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.barData,
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
          axisLine: { // 设置x轴
            lineStyle: {
              color: '#CDCBCB',
              width: 1
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#9FA0A0'
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          name: '数量',
          type: 'bar',
          data: this.barNum,
          // data: this.onlineCountList,
          label: { // 柱狀圖數據顯示
            show: false,
            position: 'top',
            textStyle: {
              color: '#4C4948'
            }
          },
          barWidth: '12'
        }]
      })
    },
    // 获取支付习惯
    // GET /todyPaymentHabitsListByOilCode?oilCode=33250135&month=202002
    todyPaymentHabitsListByOilCode () {
      let that = this
      this.$dialog.loading.open('加载中')
      this.$http.post('/webapi/bdview/gasolineMobile/todyPaymentHabitsListByOilCode', {
        oilCode: this.oilCode
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          if (res.rows.length > 0) {
            that.payStyleList = res.rows
            this.isPayStyle = false
            this.$nextTick(function () {
              // 此时已经渲染完成,刷新页面
              that.changePayStyleData(res.rows)
            })
          } else {
            this.isPayStyle = true
          }
        } else {
          that.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 处理数据
    changePayStyleData (json) {
      let nameData = []
      for (var i = 0; i < json.length; i++) {
        nameData.push(json[i].name)
      }
      this.payStyleName = nameData
      this.drawChartPayStyle()
    },
    // 支付习惯图表
    drawChartPayStyle () {
      // 图表颜色，从右上角开始
      var color = ['#A4DA73', '#BC89FE', '#FF7979', '#21A9FF', '#FFB45C']
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
          formatter: '{a} <br/>{b} : {c}笔 ({d}%)',
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
            center: ['50%', '60%'], // 调整上下边距，x和y
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
                length: 15,
                length2: 5
              }
            },
            label: { // 以百分比显示设置
              normal: {
                show: true,
                formatter: ' {d}% \n {b} \n ', // {c|{c}} \n{hr|}\n {b|{b}}
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
  .todayData_box{
    padding:0 20px 20px 20px;
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
        width:166px;
        height:86px;
        background:rgba(242,247,249,1);
        border-radius:12px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(76,73,72,1);
        .num{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size:24px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:#7634FF;
          line-height:32px;
        }
      }
    }
     .data_box{
        width: 100%;
        height: auto;
        border-radius: 6px;
        background: #ffffff;
        padding: 20px;
        margin-bottom: 10px;
     .box_b{
          font-size:18px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(136,136,136,1);
          border-bottom:1px solid rgba(229,229,229,1);
          margin-bottom: 15px;
          .imgs{
            width:34px;
            height:34px;
          }
          .imgs_b{
            width:34px;
            height:34px;
          }
          .momber_type{
            width:auto;
            padding: 0 5px;
            line-height: 24px;
            border-radius:12px;
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            text-align :center;
          }
          .tishi{
            font-size:12px;
            line-height: 24px;
            color:rgba(255,93,27,1);
            margin-right:5px;
          }
          .box_b_b{
            line-height 30px;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
            padding: 5px 0 10px 0;
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
          }
          .member_new{
            background:rgba(225,241,228,1);
            color: #31C42C;
          }
          .member_app{
            background:rgba(225,229,229,1);
            color: #3885E0;
          }
          .member_old{
            background:rgba(225,229,229,1);
            color: #FF6800;
          }
          .member_car{
            background:rgba(225,229,229,1);
            color: #3885E0;
          }
          .member_none{
            background:rgba(251,231,205,1);
            color: #FF5D1B;
          }
          .phone_bg{
            line-height:38px!important;
            background:rgba(242,247,249,1);
            border-radius:1px;
            padding: 0 12px;
            font-size: 15px;
            .infobox{
              -webkit-box-flex: 1;
              -ms-flex: 1;
              flex: 1;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
              flex-wrap: wrap;
            }
          }
          .blue_color{
            color: #7634FF!important;
          }
        }
     }
      //会员数据
      .member_data{
        background #fff;
        padding:0 10px 0 10px;
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
          .jiange{
            width:10px;
            background:#f4f4f4;
          }
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
          }
          .member_l{
            border-right:1px solid rgba(229,229,229,1);
          }
        }

      }
  }
}
@media screen and (max-width: 414px) {
  .todayData_box{
    padding:0 10px 10px 10px;
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
        width:80px;
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
        .num{
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size:12px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:#7634FF;
          line-height:24px;
        }
      }
    }
     .data_box{
        width: 100%;
        height: auto;
        border-radius: 6px;
        background: #ffffff;
        padding: 10px;
        margin-bottom: 10px;
     .box_b{
          font-size:10px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(136,136,136,1);
          border-bottom:1px solid rgba(229,229,229,1);
          margin-bottom: 15px;
          .imgs{
            width:18px;
            height:18px;
            margin:5px 0 -5px 0;
          }
          .imgs_b{
            width:18px;
            height:18px;
          }
          .momber_type{
            width: auto;
            padding: 0 5px;
            line-height: 16px;
            border-radius: 12px;
            font-size: 10px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            text-align: center;
          }
          .tishi{
            font-size:6px;
            line-height: 16px;
            color:rgba(255,93,27,1);
            margin-right:5px;
          }
          .box_b_b{
            line-height 21px;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
            padding: 5px 0 10px 0;
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
          }
          .member_new{
            background:rgba(225,241,228,1);
            color: #31C42C;
          }
          .member_app{
            background:rgba(225,229,229,1);
            color: #FF6800;
          }
          .member_car{
            background:rgba(225,229,229,1);
            color: #3885E0;
          }
          .member_old{
            background:rgba(225,229,229,1);
            color: #E32F2F;
          }
          .member_none{
            background:rgba(251,231,205,1);
            color: #FF5D1B;
          }
          .phone_bg{
            line-height:21px!important;
            background:rgba(242,247,249,1);
            border-radius:1px;
            padding: 0 8px;
            font-size: 10px;
            .infobox{
              -webkit-box-flex: 1;
              -ms-flex: 1;
              flex: 1;
            }
          }
          .blue_color{
            color: #7634FF!important;
          }
        }
     }
     //会员数据
      .member_data{
        border-radius:6px 6px 0 0;
        margin-top:10px;
        .member_box{
          display:block;
          .jiange{
            height:10px;
            background:#f4f4f4;
          }
          .member_l{
            background:red;
            border-radius:6px!important;
          }
          .member_r{
              background:red;
              border-radius: 6px 6px 6px 6px!important;
          }
          .member_l,.member_r{
            background #fff;
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
