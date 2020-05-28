<template>
  <div class="washCarCard">
    <top-header>
      <div class="top_bg_img"></div>
    </top-header>
    <div class="main-content clearfix">
        <topCom v-if="status" ></topCom>
        <div class="select_box" @click="change">
          <img class="select_box_l" src="../../../../static/images/washCarCard/rili_icon.png" alt="">  {{date}} <img :class="{'select_box_r':true, 'roate':showpopup}"  src="../../../../static/images/washCarCard/down.png" alt="">
        </div>
        <bottomCom v-if ="status && showTable" :tablelist="tablelist" ></bottomCom>
    </div>
    <ul v-if="showpopup" class="select_box select_box_ul">
      <li v-for="(item,index) in dateList" :class="{'oli-avt': date == item}" :key="index" @click="select(item)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import topHeader from './components/top-header'
import topCom from './components/topCom'
import bottomCom from './components/bottomCom'
export default {
  name: 'washCarCardIndex',
  data () {
    return {
      // levelpro: false,
      showpopup: false,
      date: '',
      year: '',
      dateList: [],
      status: false,
      showTable: false,
      tablelist: []
    }
  },
  created () {
    window.document.title = '洗车卡 - 站外客户开发情况'
    this.getDeta()
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
    // 表格shu数据
    dataTable  (time, year) {
      let that = this
      this.$dialog.loading.open('加载中')
      that.$http.post('/webapi/bdview/CarWashCardService/duringThe', {
        time: time,
        year: year
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.showTable = true
          var data = res.data
          // 集合名称[ shenZhen 全省 shenZhen 深圳 guangZhou 广州 zhuHai 珠海 shanTou 汕头 shaoGuan 韶关  meiZhou 梅州 dongGuan 东莞 zhongShan 中山 jiangMen 江门 foShan 佛山
          // yangJiang 阳江 zhanJiang 湛江 maoMing 茂名 zhaoQing 肇庆 qingYuan 清远 shanWei 汕尾
          // heYuan 河源 chaoZhou 潮州 jieYang 揭阳 yunFu 云浮 huiZhou 惠州 saveTheCompany 省公司 ]
          // console.log(data.theProvince[0])
          if (data.theProvince.length > 0) {
            var theProvinceObj = Object.assign(data.theProvince[0], data.theProvince[1], data.theProvince[2], data.theProvince[3], data.theProvince[4], data.theProvince[5])
            this.tablelist.push(theProvinceObj)
          }
          if (data.shenZhen.length > 0) {
            var shenZhenObj = Object.assign(data.shenZhen[0], data.shenZhen[1], data.shenZhen[2], data.shenZhen[3], data.shenZhen[4], data.shenZhen[5])
            this.tablelist.push(shenZhenObj)
          }
          if (data.guangZhou.length > 0) {
            var guangZhouObj = Object.assign(data.guangZhou[0], data.guangZhou[1], data.guangZhou[2], data.guangZhou[3], data.guangZhou[4], data.guangZhou[5])
            this.tablelist.push(guangZhouObj)
          }
          if (data.zhuHai.length > 0) {
            var zhuHaiObj = Object.assign(data.zhuHai[0], data.zhuHai[1], data.zhuHai[2], data.zhuHai[3], data.zhuHai[4], data.zhuHai[5])
            this.tablelist.push(zhuHaiObj)
          }
          if (data.shanTou.length > 0) {
            var shanTouObj = Object.assign(data.shanTou[0], data.shanTou[1], data.shanTou[2], data.shanTou[3], data.shanTou[4], data.shanTou[5])
            this.tablelist.push(shanTouObj)
          }
          if (data.shaoGuan.length > 0) {
            var shaoGuanObj = Object.assign(data.shaoGuan[0], data.shaoGuan[1], data.shaoGuan[2], data.shaoGuan[3], data.shaoGuan[4], data.shaoGuan[5])
            this.tablelist.push(shaoGuanObj)
          }
          if (data.meiZhou.length > 0) {
            var meiZhouObj = Object.assign(data.meiZhou[0], data.meiZhou[1], data.meiZhou[2], data.meiZhou[3], data.meiZhou[4], data.meiZhou[5])
            this.tablelist.push(meiZhouObj)
          }
          if (data.dongGuan.length > 0) {
            var dongGuanObj = Object.assign(data.dongGuan[0], data.dongGuan[1], data.dongGuan[2], data.dongGuan[3], data.dongGuan[4], data.dongGuan[5])
            this.tablelist.push(dongGuanObj)
          }
          if (data.zhongShan.length > 0) {
            var zhongShanObj = Object.assign(data.zhongShan[0], data.zhongShan[1], data.zhongShan[2], data.zhongShan[3], data.zhongShan[4], data.zhongShan[5])
            this.tablelist.push(zhongShanObj)
          }
          if (data.jiangMen.length > 0) {
            var jiangMenObj = Object.assign(data.jiangMen[0], data.jiangMen[1], data.jiangMen[2], data.jiangMen[3], data.jiangMen[4], data.jiangMen[5])
            this.tablelist.push(jiangMenObj)
          }
          if (data.foShan.length > 0) {
            var foShanObj = Object.assign(data.foShan[0], data.foShan[1], data.foShan[2], data.foShan[3], data.foShan[4], data.foShan[5])
            this.tablelist.push(foShanObj)
          }
          if (data.yangJiang.length > 0) {
            var yangJiangObj = Object.assign(data.yangJiang[0], data.yangJiang[1], data.yangJiang[2], data.yangJiang[3], data.yangJiang[4], data.yangJiang[5])
            this.tablelist.push(yangJiangObj)
          }
          if (data.zhanJiang.length > 0) {
            var zhanJiangObj = Object.assign(data.zhanJiang[0], data.zhanJiang[1], data.zhanJiang[2], data.zhanJiang[3], data.zhanJiang[4], data.zhanJiang[5])
            this.tablelist.push(zhanJiangObj)
          }
          if (data.maoMing.length > 0) {
            var maoMingObj = Object.assign(data.maoMing[0], data.maoMing[1], data.maoMing[2], data.maoMing[3], data.maoMing[4], data.maoMing[5])
            this.tablelist.push(maoMingObj)
          }
          if (data.zhaoQing.length > 0) {
            var zhaoQingObj = Object.assign(data.zhaoQing[0], data.zhaoQing[1], data.zhaoQing[2], data.zhaoQing[3], data.zhaoQing[4], data.zhaoQing[5])
            this.tablelist.push(zhaoQingObj)
          }
          if (data.qingYuan.length > 0) {
            var qingYuanObj = Object.assign(data.qingYuan[0], data.qingYuan[1], data.qingYuan[2], data.qingYuan[3], data.qingYuan[4], data.qingYuan[5])
            this.tablelist.push(qingYuanObj)
          }
          if (data.shanWei.length > 0) {
            var shanWeiObj = Object.assign(data.shanWei[0], data.shanWei[1], data.shanWei[2], data.shanWei[3], data.shanWei[4], data.shanWei[5])
            this.tablelist.push(shanWeiObj)
          }
          if (data.heYuan.length > 0) {
            var heYuanObj = Object.assign(data.heYuan[0], data.heYuan[1], data.heYuan[2], data.heYuan[3], data.heYuan[4], data.heYuan[5])
            this.tablelist.push(heYuanObj)
          }
          if (data.chaoZhou.length > 0) {
            var chaoZhouObj = Object.assign(data.chaoZhou[0], data.chaoZhou[1], data.chaoZhou[2], data.chaoZhou[3], data.chaoZhou[4], data.chaoZhou[5])
            this.tablelist.push(chaoZhouObj)
          }
          if (data.jieYang.length > 0) {
            var jieYangObj = Object.assign(data.jieYang[0], data.jieYang[1], data.jieYang[2], data.jieYang[3], data.jieYang[4], data.jieYang[5])
            this.tablelist.push(jieYangObj)
          }
          if (data.yunFu.length > 0) {
            var yunFuObj = Object.assign(data.yunFu[0], data.yunFu[1], data.yunFu[2], data.yunFu[3], data.yunFu[4], data.yunFu[5])
            this.tablelist.push(yunFuObj)
          }
          if (data.huiZhou.length > 0) {
            var huiZhouObj = Object.assign(data.huiZhou[0], data.huiZhou[1], data.huiZhou[2], data.huiZhou[3], data.huiZhou[4], data.huiZhou[5])
            this.tablelist.push(huiZhouObj)
          }
          if (data.saveTheCompany.length > 0) {
            var saveTheCompanyObj = Object.assign(data.saveTheCompany[0], data.saveTheCompany[1], data.saveTheCompany[2], data.saveTheCompany[3], data.saveTheCompany[4], data.saveTheCompany[5])
            this.tablelist.push(saveTheCompanyObj)
          }
        } else {
          this.$dialog.alert({ mes: res.msg, timeout: 1800 })
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({ mes: '系统繁忙，请稍后再试', timeout: 1800 })
        console.log(err)
      })
    },
    change () {
      this.showpopup = !this.showpopup
    },
    // 选择日期
    select (item) {
      console.log(item)
      if (item === '全年累计') {
        this.showpopup = false
        this.tablelist = []
        this.dataTable('', this.year)
      } else {
        this.showpopup = false
        this.tablelist = []
        this.date = item
        this.dataTable(this.date, '')
      }
    },
    getDeta () {
      var date = new Date()
      var year = date.getFullYear() // 获取完整的年份(4位)
      this.year = date.getFullYear()
      var month = date.getMonth() + 1 // 获取当前月份(0-11,0代表1月)
      console.log(month)
      var dateList = []
      for (var i = 0; i < month; i++) {
        if (i < 10) {
          var j = '0' + (i + 1)
        } else {
          j = i + 1
        }
        dateList.push(year + '-' + j)
      }
      dateList.unshift('全年累计')
      this.date = dateList[month]
      // console.log(this.date)
      this.dataTable(this.date)
      this.dateList = dateList
      console.log(this.dateList)
    }

  },
  components: {
    topHeader,
    topCom,
    bottomCom
  }
}
</script>

<style scoped lang="stylus">
@import '../../../assets/css/mixin.styl'
.washCarCard{
  max-width pxtovw(1920)
  max-height pxtovh(1080)
  background-color #000530
  margin 0 auto
  height 100%
  overflow hidden
}
  .main-content{
    width 100%
    padding 0 pxtovh(20) pxtovh(20) pxtovh(20)
    .select_box{
      width:vw(157);
      height:vh(30);
      line-height :vh(30);
      border:1px solid rgba(17,32,113,1);
      margin-top:vh(15)
      color:#fff;
      padding-left:30px;
      position:relative;
      .select_box_l{
        width:vw(15)
        height:vh(16)
        position:absolute;
        top:50%;
        margin-top:vh(-8)
        left:vw(5)
      }
      .select_box_r{
        width:vw(15)
        height:vh(16)
        position:absolute;
        top:50%;
        margin-top:vh(-8)
        right:vw(5)
      }
      .roate{
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
      }
    }
  }
  .select_box_ul{
      width:vw(157);
      height:vh(200)
      font-size:vw(12);
      overflow-x: hidden;
      position:absolute;
      background:#000530;
      top:vh(275);
      left:vw(20);
      border:1px solid rgba(17,32,113,1);
    li{
      padding: 0 20px;
      width:100%;
      border-bottom:1px solid rgba(17,32,113,1);
      line-height: vh(30);
      text-align:center;
      font-size:vw(12);
      font-family:PingFangSC-Regular,PingFangSC;
      font-weight:400;
      color:#fff;
      &.oli-avt{
        background:#856CFF;
        color:#fff;
        border:0 none;
      }
    }
  }

</style>
