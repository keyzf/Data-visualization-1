<template>
  <div class="activeMember">
    <div class="content-wrapper">
      <ul class="table-header">
        <li class="index">排名</li>
        <li class="station-name li-flex">油站名称</li>
        <li class="yesterday li-width">昨日</li>
        <li class="last-year">有效会员</li>
        <li class="zengjianliang li-width">对比去年12月增长人数</li>
        <li class="zengjianfu li-width">金牌会员比例</li>
      </ul>
      <div class="outer-container">
        <div class="inner-container">
          <ul class="table-content">
            <li class="index index-content">1</li>
            <li class="station-name li-flex">广州体育西加油站</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
          <ul class="table-content">
            <li class="index index-content">2</li>
            <li class="station-name li-flex">广州体育西加油站</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
          <ul class="table-content">
            <li class="index index-content">3</li>
            <li class="station-name li-flex">广州体育西加油站</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
          <ul class="table-content">
            <li class="index index-content">4</li>
            <li class="station-name li-flex">广州体育西加油站</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
          <ul class="table-content">
            <li class="index index-content">5</li>
            <li class="station-name li-flex">广州体育西加油站</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
          <ul class="table-content">
            <li class="index index-content">6</li>
            <li class="station-name li-flex">广州体育西加油站</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
          <ul class="table-content">
            <li class="index index-content">7</li>
            <li class="station-name li-flex">广州体育西加油站</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
          <ul class="table-content">
            <li class="index index-content">8</li>
            <li class="station-name li-flex">广州体育西加油站</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
          <ul class="table-content">
            <li class="index index-content">9</li>
            <li class="station-name li-flex">广州体育西加油站</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
          <ul class="table-content">
            <li class="index index-content">10</li>
            <li class="station-name li-flex">广州体育西加油站</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
          <div class="divider"></div>
          <ul class="table-content">
            <li class="index index-content">后3</li>
            <li class="station-name li-flex">广州体育西加油站</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
          <ul class="table-content">
            <li class="index index-content">后2</li>
            <li class="station-name li-flex">广州瑶台加油站</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
          <ul class="table-content">
            <li class="index index-content">后1</li>
            <li class="station-name li-flex">广氮服务区加油站(南)</li>
            <li class="yesterday li-width">223吨</li>
            <li class="last-year">102吨</li>
            <li class="zengjianliang li-width">+28</li>
            <li class="zengjianfu li-width">+78%</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activeMember',
  data () {
    return {
      memberList: [],
      validMemberList: [],
      dataName: []
    }
  },
  created () {
  },
  mounted () {
    // this.memberStructureCountList()
  },
  methods: {
    //     6. 会员结构数列表
    // GET /memberStructureCountList
    memberStructureCountList () {
      this.memberList = []
      this.validMemberList = []
      this.dataName = []
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/thDataBS/memberStructureCountList', {
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          var memberList = res.data.memberList
          for (var i = 0; i < memberList.length; i++) {
            this.memberList.push(memberList[i].count)
            this.dataName.push(memberList[i].name)
          }
          console.log('this.dataName' + this.dataName)
          var validMemberList = res.data.validMemberList
          for (var j = 0; j < validMemberList.length; j++) {
            this.validMemberList.push(validMemberList[j].count)
          }
          // console.log(this.validMemberList)
          this.drawChart()
          this.drawCharts()
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.memberStructureCountList()
            }, this.$store.state.stationData.timeInterval)
          }
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
  beforeDestroy () {
    if (this.timer) {
      window.clearTimeout(this.timer)
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../../../assets/css/mixin.styl'
.activeMember{
  text-align center
  width vw(500)
  height vh(465)
  color #97a8f7
  background url('../../../../../static/images/truckHomeData/3_icon.png') no-repeat
  -webkit-background-size 100% 100%
  background-size 100% 100%
  padding pxtovh(47) pxtovw(15) pxtovh(15) pxtovw(15)
  position relative
  margin-right:vw(15)
 .content-wrapper {
    .outer-container {
      height: vh(420)
      position: relative;
      overflow: hidden;
      .inner-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: scroll;
      }
      .inner-container::-webkit-scrollbar {
        display: none;
      }
      .inner-container { -ms-overflow-style: none; }
    }
    .divider {
      width: 100%
      height: pxtovh(2)
      background: url("https://img.gdoil.cn/cockpit/static/images/netDevelop/img_divider.png") no-repeat
      -webkit-background-size: 100%
      background-size: 100%
      margin pxtovh(8) pxtovw(0) pxtovh(5)
    }
    ul {
      display flex
      margin-bottom vh(5)
      justify-content center
      align-items center
      li {
        text-align center
      }
      .station-name {
        padding-left vw(10)
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align left
      }
      .index {
        width: vw(30)
        height:vh(22)
        line-height: vh(22)
      }
      .index-content {
        background-color: #192F7C;
      }
      .li-flex {
        flex 1
      }
      .li-width {
        width: 15%
      }
      .zengjianliang{
          width: 20%
      }
      .zengjianfu{
          width: 20%
      }
      .last-year {
        width: 20%
      }
    }
    .table-header {
      font-size: vw(15)
      color: #3a5cc0
    }
    .table-content {
      font-size: vw(15)
      color: #ffffff
    }
  }
}
  @media screen and (max-height: 1079px) {
    .daily-sales{
      .content-wrapper {
        .outer-container {
          height: vh(400)
        }
      }
    }
  }
</style>
