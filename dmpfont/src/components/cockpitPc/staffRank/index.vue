<template>
  <div class="wrapper">
    <top-header>
      <div class="top_bg_img"></div>
    </top-header>
    <div class="staff-tip" v-if="isLoaded">
      <ul id="tip-list" ref="tip-list" :class="{anim:animate==true}">
        <li v-for='(item, index) in broadCastList' :key="index">
          <img src="https://img.gdoil.cn/cockpit/static/images/staffRank/tip_icon.png">
          {{item.broadCont}}
        </li>
      </ul>
    </div>
    <section class="wrap-cont" v-if="isLoaded">
      <el-col :span="17">
        <div class="staff-cont-l">
          <staff-left></staff-left>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="staff-cont-r marleft">
          <staff-right></staff-right>
        </div>
      </el-col>
    </section>
  </div>
</template>

<script>
import topHeader from '../common/top-header'
export default {
  name: 'staffRankIndex',
  components: {
    topHeader,
    StaffLeft: require('@/components/cockpitPc/staffRank/components/staffLeft.vue').default,
    StaffRight: require('@/components/cockpitPc/staffRank/components/staffRight.vue').default
  },
  data () {
    return {
      animate: false,
      broadCastList: [ // 实时播放数据
        // {
        //   broadCont: '广州分公司交投加油站陈强获得了9星评价！'
        // }
      ],
      timer: '',
      timers: '',
      isLoaded: false// 是否渲染页面(页面未带有用户id时，需先单点登录)
    }
  },
  created () {
    window.document.title = '卓越员工排名'
    var accodeToken = this.$util.getValue('bs_accode_token')
    console.log(accodeToken)
    if (!accodeToken) {
      var UserID = this.$route.query.UserID
      var Mac = this.$route.query.mac || this.$route.query.Mac || this.$route.query.MAC
      if (UserID && Mac) {
        this.login(UserID, Mac)
      } else {
        this.$router.push({
          name: 'login'
        })
      }
    } else {
      this.isLoaded = true
    }
  },
  methods: {
    // 单点登录
    login (UserID, Mac) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/ssoLogin', {
        'userId': UserID,
        'mac': Mac
      }).then(res => {
        console.log(res)
        this.$dialog.loading.close()
        if (res.result === true) {
          this.$util.set('bs_accode_token', res.accode, res.actimes)
          // this.status = true
          this.$router.push({path: '/cockpitPc/home/homeIndex'})
        } else {
          this.$router.push({
            name: 'login'
          })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 滚动播放
    tipScroll () {
      this.animate = true // 添加css3过渡动画
      setTimeout(() => {
        this.broadCastList.push(this.broadCastList[0]) // 将数组的第一个元素添加到数组的
        this.broadCastList.shift() // 删除数组的第一个元素
        this.animate = false // margin-top 为0 的时候取消过渡动画，实现无缝滚动
      }, 1000)
    },
    // 获取播放信息
    staffBroadcast () {
      this.broadCastList = []
      if (!this.timer) {
        this.$dialog.loading.open('加载中')
        console.log(this.timer)
      }
      this.$http.post('/webapi/bdview/outstandingStaffBS/staffBroadcast').then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          let rs = res.data
          if (rs.name === 'null' || rs.name === null) {
            rs.name = ''
          }
          let broadCont = rs.orgName + rs.station + rs.name + '获得了' + rs.count + '星好评！'
          this.broadCastList.push(
            {
              broadCont: broadCont
            }
          )
          this.timers = setInterval(this.tipScroll, 2000)
          // 是否启动轮询
          if (this.$store.state.stationData.isInterval) {
            this.timer = setTimeout(() => {
              this.staffBroadcast()
            }, this.$store.state.stationData.timeInterval)
          }
        } else {
          // if (res.retcode === '-1') {
          //   this.$router.push({
          //     name: 'login'
          //   })
          // } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
          // }
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  },
  beforeDestroy () {
    if (this.timers) {
      window.clearInterval(this.timers)
    }
    if (this.timer) {
      window.clearTimeout(this.timer)
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../../assets/css/mixin.styl'
.wrapper {
  width: 100%
  height: 100vh
  overflow: hidden
  padding: 0
  background-color: #000530
  margin: 0 auto
  .top-header {
    margin-bottom: pxtovh(20)!important
  }
  .top_bg_img {
    height: vh(53)
    width: 100%
    background: url("https://img.gdoil.cn/cockpit/static/images/staffRank/top_bg_1.png") no-repeat
    background-size: 100% auto;
    overflow hidden
  }
  .staff-tip{
    width: 100%
    height: vh(30)
    line-height: vh(30)
    overflow: hidden
    color: #ffffff
    font-size: vw(14)
    margin-bottom: vw(12)
    .anim{
      transition: all 1s
      margin-top: vh(-30)
    }
    #tip-list li{
      list-style: none
      display: flex
      align-items: center
      img{
        width: vw(20)
        height: vh(20)
        margin: 0 vw(10) 0 vw(20)
      }
    }
  }
  .wrap-cont{
    width: 100%
    height: vh(965)
    overflow: hidden
    padding: 0 vw(20) vh(20) vw(20)
  }
  .staff-cont-l, .staff-cont-r{
    width: 100%
    height: vh(945)
  }
  .marleft{
    padding-left: vw(20)
  }
}
</style>
