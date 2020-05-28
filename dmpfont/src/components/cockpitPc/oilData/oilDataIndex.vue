<template>
  <div class="oil-data-wrapper">
    <!-- 省市级下拉框 -->
    <!-- <div class="select_box" v-if="isShowCity">
       <el-select  @change="handleChange(value)" v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div> -->
    <top-header>
      <div class="top_bg_img"></div>
    </top-header>
    <div class="main-content" v-if="status">
      <oil-top :cityCode="cityCode"></oil-top>
      <oil-center :cityCode="cityCode"></oil-center>
      <oil-bottom :cityCode="cityCode"></oil-bottom>
    </div>
  </div>
</template>

<script>
import topHeader from '../common/top-header'
import oilTop from './components/oilTop'
import oilCenter from './components/oilCenter'
import oilBottom from './components/oilBottom'
export default {
  name: 'oilDataIndex',
  components: {
    topHeader,
    oilTop,
    oilCenter,
    oilBottom
  },
  data () {
    return {
      status: false,
      cityCode: this.$route.query.cityCode || '',
      options: [],
      isShowCity: false,
      value: ''
    }
  },
  created () {
    window.document.title = '零售数据分析大屏'
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
      this.status = true
      // this.getLevelStatus()
    }
  },
  methods: {
    getLevelStatus () {
      // 读取缓存
      var level = localStorage.getItem('levelStatus')
      console.log(level)
      if (level === '省级') {
        this.isShowCity = true
        this.getAreaListByCityCode()
      } else {
        this.isShowCity = false
      }
    },
    handleChange (value) {
      this.cityCode = value
      console.log(value)
    },
    // 获取地市
    getAreaListByCityCode () {
      let that = this
      that.$http.get('webapi/bdview/acrea/getCityList').then(res => {
        if (res.result) {
          var data = res.data
          var dataList = []
          for (var i = 0; i < data.length; i++) {
            dataList.push({
              value: data[i].cityCode,
              label: data[i].cityName
            })
          }
          this.options = dataList
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    login (UserID, Mac) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.get('/webapi/bdview/ssoLogin', {
        'userId': UserID,
        'mac': Mac
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.$nextTick(function () {
            // 此时已经渲染完成
            this.$util.set('bs_accode_token', res.accode, res.actimes)
            if (res.data) {
              var obj = res.data[0].level
              localStorage.setItem('levelStatus', obj)
              this.getLevelStatus()
              // this.$store.state.stationData.cityCode = res.data[0].oucode.substring(0, 6)
              // if (res.data[0].level === '省级') {
              //   this.isShowCity = true
              //   this.getAreaListByCityCode()
              // } else {
              //   this.isShowCity = false
              // }
            }
            // this.status = true
            this.$router.push({path: '/cockpitPc/home/homeIndex'})
          })
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
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../assets/css/mixin.styl'
  .select_box{
    width:vw(250);
    position: fixed
    top: 0
    margin-top: 0
    left:20%
  }
  /deep/ .el-input__inner{
     border: 1px solid #101F6E!important;
    background-color: rgba(0, 0, 0, 0)
    color:#fff!important;
  }
  .top-header {
    margin-bottom: pxtovh(19)!important
  }
  .oil-data-wrapper {
    height: 100vh
    overflow: hidden
    max-width pxtovw(1920);
    max-height pxtovh(1080)
    background-color: #000530
    margin 0 auto
    padding 0 pxtovw(18) pxtovh(18)
  }
  .top_bg_img {
    height: pxtovh(53)
    width: 100%
    max-width pxtovw(1920)
    // background: url("https://img.gdoil.cn/cockpit/static/images/oilData/top-汽油数据分析大屏.png") no-repeat
    background: url("https://img.gdoil.cn/cockpit/static/images/oilData/top_title_bg.png") no-repeat
    background-size: 100% pxtovh(53)
    overflow hidden
  }
</style>
