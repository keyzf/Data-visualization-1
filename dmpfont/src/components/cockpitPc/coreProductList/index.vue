<template>
  <div class="turnoverAnalysisIndex">
    <top-header>
      <div class="top_bg_img"></div>
    </top-header>
    <div class="select_box" v-if="levelpro">
       <el-select  @change="handleChange(value)" v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="main-content clearfix">
        <topCom v-if="status" :cityCode='cityCode' ></topCom>
        <centerCom v-if ="status" :cityCode='cityCode'></centerCom>
        <bottomCom v-if ="status" :cityCode='cityCode'></bottomCom>
    </div>
  </div>
</template>

<script>
import topHeader from './components/top-header'
import topCom from './components/topCom'
import centerCom from './components/centerCom'
import bottomCom from './components/bottomCom'
export default {
  name: 'overallIndex',
  data () {
    return {
      levelpro: false,
      options: [],
      value: '',
      cityCode: '',
      status: false
    }
  },
  created () {
    window.document.title = '门店核心商品排行'
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
    }
    // 读取缓存
    var level = localStorage.getItem('levelStatus')
    console.log(level)
    if (level === '省级') {
      this.levelpro = true
      this.getCityList()
    } else {
      this.levelpro = false
    }
  },
  methods: {
    login (UserID, Mac) {
      let that = this
      this.$dialog.loading.open('登陆中')
      that.$http.get('/webapi/bdview/ssoLogin', {
        'userId': UserID,
        'mac': Mac
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.$util.set('bs_accode_token', res.accode, res.actimes)
          // 保存好码到缓存
          // console.log(res.data[0])
          var obj = res.data[0].level
          localStorage.setItem('levelStatus', obj)
          // 读取缓存
          // var phone = localStorage.getItem('nonFriedData');
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
    handleChange (value) {
      console.log(value)
      this.cityCode = value
    },
    // 获取地市的接口
    // webapi/bdview/acrea/getCityList
    getCityList () {
      let that = this
      that.$http.get('webapi/bdview/acrea/getCityList', {

      }).then(res => {
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
          this.value = this.options[0].value
          this.cityCode = this.options[0].value
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  },
  components: {
    topHeader,
    topCom,
    centerCom,
    bottomCom
  }
}
</script>

<style scoped lang="stylus">
@import '../../../assets/css/mixin.styl'
.turnoverAnalysisIndex{
  max-width pxtovw(1920)
  max-height pxtovh(1080)
  background-color #000530
  margin 0 auto
  height 100%
  overflow hidden
}
.select_box{
    width:vw(200);
    height:vh(60)
    position:absolute;
    top:0
    left:30%
  }
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
  .main-content{
    width 100%
    padding 0 pxtovh(20) pxtovh(20) pxtovh(20)
  }

</style>
