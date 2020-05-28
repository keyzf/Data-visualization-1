<template>
  <div class="centerCom igs-flex">
      <div class="centerComLeft">
        <div class="selectBox">
          <div class="selectName">
             <el-select v-model="value" clearable placeholder="请选择"  @change="handleChange(value,1)">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="chartBox">
           <div id="gasoline" class="gasoline"></div>
        </div>
      </div>
      <div  class="centerComRight">
        <div class="selectBox">
          <div class="selectName">
            <el-select v-model="value1" clearable placeholder="请选择"  @change="handleChange(value1,2)">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="chartBox">
           <div id="gasoline1" class="gasoline"></div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'centerCom',
  props: ['cityCode'],
  data () {
    return {
      basicAmountLastYear: [],
      basicRetailAmount: [],
      basicRetailName: [],

      basicAmountLastYear1: [],
      basicRetailAmount1: [],
      basicRetailName1: [],
      value: '',
      value1: '',
      options: []
    }
  },
  created () {
    if (this.cityCode !== '') {
      console.log(this.cityCode)
      this.initialize()
    }
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
  methods: {
    initialize () {
      this.basicAmountfun()
      this.basicRetailAmountfun()
      this.getAreaListByCityCode()
    },
    handleChange (value, type) {
      console.log(value, type)
      if (type === 1) {
        if (value.length === 6) {
          value = ''
        }
        this.basicAmountfun(value)// 基础品类日营业额
      }
      if (type === 2) {
        if (value.length === 6) {
          value = ''
        }
        this.basicRetailAmountfun(value)// 基础品零售营业额
      }
    },
    // 这个是获取地市下经营部的，需要传地市编码
    // webapi/bdview/acrea/getAreaListByCityCode
    getAreaListByCityCode () {
      let that = this
      that.$http.get('/webapi/bdview/acrea/getAreaListByCityCode', {
        cityCode: this.cityCode
      }).then(res => {
        if (res.result) {
          console.log(res.data)
          var data = res.data
          var newArr = []
          for (let i = 0; i < data.length; i++) {
            newArr.push({
              value: data[i].areanCode,
              label: data[i].areanName
            })
          }
          newArr.unshift(
            {
              value: data[0].cityCode,
              label: data[0].cityName
            }
          )
          this.options = newArr
          console.log(newArr)
          this.value = this.options[0].value// 默认选中第一项
          this.value1 = this.options[0].value// 默认选中第一项
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    //     接口名称：Post /commoditySalesVolume/basicAmount 基础品类日营业额
    // 需求参数：String number 城市编码 不传默认广东 100002   management 经营部的名称 不传默认查市
    basicAmountfun (management) {
      let that = this
      this.basicAmountLastYear = []
      this.basicRetailAmount = []
      this.basicRetailName = []
      that.$http.get('/webapi/bdview/commoditySalesVolume/basicAmount', {
        number: this.cityCode,
        management: management
      }).then(res => {
        if (res.result) {
          // console.log(res)
          var date = this.getMyDate()// 今天日期
          let basicAmountLastYear = res.data.basicAmountLastYear // 去年的基础品零售集合
          let basicRetailAmount = res.data.basicAmount // 今年的基础品零售集合
          basicAmountLastYear.filter(item => {
            that.basicAmountLastYear.push((item.count / 10000).toFixed(1))
          })
          // 今年
          var basicRetaildate = []
          basicRetailAmount.filter(item => {
            that.basicRetailName.push(item.date)
            basicRetaildate.push((item.count / 10000).toFixed(1))
            // that.basicRetailAmount.push((item.count / 10000).toFixe(0))
          })
          that.basicRetailAmount = basicRetaildate.slice(0, date)
          this.drawCharts()
          // // 是否启动轮询
          // if (this.$store.state.stationData.isInterval) {
          //   this.timer = setTimeout(() => {
          //     this.basicRetailAmount()
          //   }, this.$store.state.stationData.timeIntervals)
          // }
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    //     接口名称：Post  /commoditySalesVolume/basicRetailAmount  基础品零售营业额
    // 需求参数：String number 城市编码 不传默认为广州 100002 management 经营部的名称 不传默认查市
    basicRetailAmountfun (management) {
      let that = this
      this.basicAmountLastYear1 = []
      this.basicRetailAmount1 = []
      this.basicRetailName1 = []
      that.$http.get('/webapi/bdview/commoditySalesVolume/basicRetailAmount', {
        number: this.cityCode,
        management: management
      }).then(res => {
        if (res.result) {
          // console.log(res)
          var date = this.getMyDate()// 今天日期
          let basicAmountLastYear1 = res.data.basicAmountLastYear // 去年的基础品零售集合
          let basicRetailAmount1 = res.data.basicRetailAmount // 今年的基础品零售集合
          basicAmountLastYear1.filter(item => {
            that.basicAmountLastYear1.push((item.count / 10000).toFixed(1))
          })
          var basicRetaildate1 = []
          basicRetailAmount1.filter(item => {
            that.basicRetailName1.push(item.date)
            basicRetaildate1.push((item.count / 10000).toFixed(1))
            // that.basicRetailAmount1.push(item.count)
          })
          that.basicRetailAmount1 = basicRetaildate1.slice(0, date)
          // alert(that.basicRetailAmount1.length)
          this.drawCharts1()
          // 是否启动轮询
          // if (this.$store.state.stationData.isInterval) {
          //   this.timer = setTimeout(() => {
          //     this.basicRetailAmount()
          //   }, this.$store.state.stationData.timeIntervals)
          // }
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },

    getMyMonth () {
      var myDate = new Date()
      let a = `今年${myDate.getMonth() + 1}月`
      let b = `去年${myDate.getMonth() + 1}月`
      let arr = []
      arr.push(a)
      arr.push(b)
      return arr// 获取当前日(1-31)
    },
    getMyDate () {
      var myDate = new Date()
      return myDate.getDate()// 获取当前日(1-31)
    },
    getLastMonthDays (year, month) {
      var dayCount
      let now = new Date(year, month, 0)
      dayCount = now.getDate()
      return dayCount
    },
    drawCharts () {
      let myDate = new Date()
      let month = myDate.getMonth() + 1
      console.log(month)
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('gasoline'))
      // 绘制图表
      myChart.setOption({
        title: {
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter (params) {
            var result = params[0].name
            params.forEach(function (item) {
              if (item.data) {
                result += '<br/>' + item.seriesName + ' : ' + item.data
              }
            })
            return result
          }
        },
        legend: {
          data: ['今年' + month + '月', '去年' + month + '月'],
          // data: _this.getMyMonth(),
          icon: 'circle',
          align: 'left',
          right: 50,
          top: 20,
          itemHeight: 5,
          textStyle: {
            color: '#97A8F7',
            fontSize: 12
          }
        },
        grid: {
          left: '6%',
          right: '3%',
          bottom: '6%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.basicRetailName,
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false,
            interval: 0,
            textStyle: {
              color: '#97A8F7'
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: '#5C74D1',
              width: 1
            }
          }
        },
        yAxis: {
          name: '金额(万元)',
          smooth: true, // 平滑曲线显示
          showAllSymbol: true, // 显示所有图形。
          symbol: 'circle', // 标记的图形为实心圆
          symbolSize: 6, // 标记的大小
          type: 'value',
          axisLabel: { // 设置y轴字体
            textStyle: {
              color: '#97A8F7'
            }
          },
          nameTextStyle: { // y轴标题
            color: '#5C74D1',
            fontSize: 14,
            align: 'right'
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: '#5C74D1',
              width: 1
            }
          },
          splitLine: { // 设置网格线
            show: true,
            lineStyle: {
              color: ['rgba(92,116,209,0.25)'],
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          splitNumber: 3
        },
        series: [
          {
            name: '今年' + month + '月',
            type: 'line',
            smooth: true, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: 'circle', // 标记的图形为实心圆
            symbolSize: 6, // 标记的大小
            data: this.basicRetailAmount,
            barGap: 0.2,
            label: { /* 柱子上面的数字 */
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            areaStyle: {
              color: 'rgba(5,140,255, 0.2)'
            }
          },
          {
            color: '#44A881',
            name: '去年' + month + '月',
            type: 'line',
            smooth: true, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: 'circle', // 标记的图形为实心圆
            symbolSize: 6, // 标记的大小
            data: this.basicAmountLastYear,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            areaStyle: {
              color: 'rgba(5,140,255, 0.2)'
            }
          }
        ]
      })
    },
    drawCharts1 () {
      let myDate = new Date()
      let month = myDate.getMonth() + 1
      // let _this = this
      // console.log('_this.theMGasolineName', _this.theMGasolineName)
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('gasoline1'))
      // 绘制图表
      myChart.setOption({
        title: {
          textStyle: {
            color: '#fff',
            fontWeight: 'normal',
            fontSize: '18'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          formatter (params) {
            var result = params[0].name
            params.forEach(function (item) {
              if (item.data) {
                result += '<br/>' + item.seriesName + ' : ' + item.data
              }
            })
            return result
          }
        },
        legend: {
          data: ['今年' + month + '月', '去年' + month + '月'],
          // data: _this.getMyMonth(),
          icon: 'circle',
          align: 'left',
          right: 50,
          top: 20,
          itemHeight: 5,
          textStyle: {
            color: '#97A8F7',
            fontSize: 12
          }
        },
        grid: {
          left: '6%',
          right: '3%',
          bottom: '6%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.basicRetailName1,
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false,
            interval: 0,
            textStyle: {
              color: '#97A8F7'
            }
          },
          axisLine: { // 设置x轴
            lineStyle: {
              color: '#5C74D1',
              width: 1
            }
          }
        },
        yAxis: {
          name: '金额（万元）',
          type: 'value',
          smooth: true, // 平滑曲线显示
          showAllSymbol: true, // 显示所有图形。
          symbol: 'circle', // 标记的图形为实心圆
          symbolSize: 6, // 标记的大小
          axisLabel: { // 设置y轴字体
            textStyle: {
              color: '#97A8F7'
            }
          },
          nameTextStyle: { // y轴标题
            color: '#5C74D1',
            fontSize: 14,
            align: 'right'
          },
          axisLine: { // 设置y轴
            lineStyle: {
              color: '#5C74D1',
              width: 1
            }
          },
          splitLine: { // 设置网格线
            show: true,
            lineStyle: {
              color: ['rgba(92,116,209,0.25)'],
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          splitNumber: 3
        },
        series: [
          {
            name: '今年' + month + '月',
            type: 'line',
            smooth: true, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: 'circle', // 标记的图形为实心圆
            symbolSize: 6, // 标记的大小
            data: this.basicRetailAmount1,
            barGap: 0.2,
            label: { /* 柱子上面的数字 */
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            areaStyle: {
              color: 'rgba(5,140,255, 0.2)'
            }
          },
          {
            color: '#44A881',
            name: '去年' + month + '月',
            type: 'line',
            smooth: true, // 平滑曲线显示
            showAllSymbol: true, // 显示所有图形。
            symbol: 'circle', // 标记的图形为实心圆
            symbolSize: 6, // 标记的大小
            data: this.basicAmountLastYear1,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            areaStyle: {
              color: 'rgba(5,140,255, 0.2)'
            }
          }
        ]
      })
    }
  },
  beforeDestroy () {
    if (this.timer) {
      window.clearTimeout(this.timer)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.centerCom {
    height:pxtovh(270);
    margin:pxtovh(16) 0;
    width:100%;
    .centerComLeft,.centerComRight{
        width:pxtovw(935);
        height:100%;
        .selectBox{
          height:vh(40);
          width:100%;
          position relative;
           /deep/ .el-input__inner{
             border: 1px solid #101F6E!important;
            background:#000530!important;
            color:#fff!important;
            height:24px!important;
            line-height:24px!important;
          }
          /deep/ i{
            line-height:24px!important;
          }
          .selectName{
            height:vh(30);
            color:rgba(216,239,251,1);
            width:vw(250);
            position:absolute;
            right:vw(20);
            top:vh(5);
            img{
              width:vw(24);
              height:vh(24)
              position:absolute;
              top:50%;
              margin-top:vh(-12)
              right:vw(8)
            }
          }
          .select_box_ul{
            width:vw(250);
            height:vh(200);
            overflow-x :hidden;
            position:absolute;
            top:vh(50);
            right:vw(30);
            border:1px solid rgba(16,31,110,1);
            li{
                line-height:vh(30);
                font-size:12px;
                color:rgba(16,31,110,1);
                text-align:center;
                &.oli-avt{
                  color:#fff;
                }
            }
          }
        }
        .chartBox{
          width:100%;
          height:vh(230);
          .gasoline{
            width:100%;
            height:100%;
          }
        }

    }
    .centerComLeft{
        background: url("https://img.gdoil.cn/cockpit/static/images/nonFuel/1/5.png") no-repeat;
        background-size:100% 100%;

    }
    .centerComRight{
        background: url("https://img.gdoil.cn/cockpit/static/images/nonFuel/1/6.png") no-repeat;
        background-size:100% 100%;
        margin-left:pxtovh(16);
    }
}
</style>
