<template>
  <div class="bottomCom">
    <table cellspacing="0" cellpadding="0" class="table">
      <!-- rowspan="2" -->
      <!-- colspan ='3' -->
      <tr class="header_tr">
        <th class="td1" rowspan="2">地市</th>
        <th class="td2" rowspan="2">分配卡数（张）</th>
        <th class="td3" rowspan="2">激活卡片（张）</th>
        <th class="td4" rowspan="2">赠送洗车次数（次）</th>
        <th class="td5" rowspan="2">使用洗车次数（次）</th>
        <th class="td6" rowspan="2">使用率</th>
        <th  colspan ='6'>拉新情况</th>
        <th colspan ='3'>唤醒情况</th>
        <th class="td16" rowspan="2">有效会员数</th>
      </tr>
      <tr class="header_tr">
        <th class="td7">带动拉新 会员注册数</th>
        <th class="td8">拉新率</th>
        <th class="td9">带动新注册会员洗车次数</th>
        <th class="td10">带动新注册会员加油次数</th>
        <th class="td11">带动新注册会员加油量（吨）</th>
        <th class="td12">带动新注册会员非油品消费(万元）</th>
        <th class="td13">唤醒沉睡客户数</th>
        <th class="td14">带动沉睡客户油品销量（吨）</th>
        <th class="td15">带动沉睡客户非油品金额(万元)</th>
      </tr>
      <!-- ｛
name   地市    distributionOfCard   分配卡数    activateTheCard 激活卡片
numberOfUse  赠送洗车次数  givingWashTheCar  使用洗车次数    usage 使用率  pullTheRegistration  带动拉新会员注册数   pullTheNewRate   拉新率
driveTheCar  带动拉新注洗车数  numberOfDrivingRefueling  带动新注册会员加油数
drivingCapacity   带动新注册会员加油量 consumption  带动新注册会员非油品消费数
wakeUpSleepy  唤醒沉睡客户数  activateTheRefueling   近期三个月内加油激活都开始加油
driveToSleep 带动沉睡客户非油品小金额    activeMember 有效会员数
｝ -->
      <tr v-for="(item,index) in tablelist" :key="index">
        <td>{{item.name | formatname}}</td>
        <td>{{item.distributionOfCard}}</td>
        <td>{{item.activateTheCard}}</td>
        <td>{{item.numberOfUse}}</td>
        <td>{{item.givingWashTheCar}}</td>
        <td>{{item.usage | formapercent}}%</td>
        <td>{{item.pullTheRegistration}}</td>
        <td>{{item.pullTheNewRate | formapercent}}%</td>
        <td>{{item.driveTheCar}}</td>
        <td>{{item.numberOfDrivingRefueling}}</td>
        <td>{{item.drivingCapacity | formatFixed}}</td>
        <td>{{item.consumption | formartnum}}</td>
        <td>{{item.wakeUpSleepy}}</td>
        <td>{{item.activateTheRefueling | formart0}}</td>
        <td>{{item.driveToSleep| formartnum}}</td>
        <td>{{item. activeMember}}</td>
      </tr>
</table>
  </div>
</template>

<script>
export default {
  name: 'bottomCom',
  props: ['tablelist'],
  data () {
    return {

    }
  },
  created () {
    console.log(this.tablelist)
  },
  mounted () {

  },
  methods: {

  },
  components: {

  },
  filters: {
    formapercent (val) {
      // console.log(val)
      if (val !== undefined && val !== 'undefined' && val !== null && val !== 'null') {
        var valstr = Number(val)
        var str = (valstr * 100).toFixed(0)
      } else {
        str = val
      }
      return str
    },
    // 元转换成万元保留三位小数
    formartnum (val) {
      if (val !== undefined && val !== 'undefined' && val !== null && val !== 'null') {
        var valstr = Number(val)
        if (valstr === 0.0 || valstr === 0.00 || valstr === 0.000) {
          var str = 0
        } else {
          str = (valstr / 10000).toFixed(3)
        }
      } else {
        str = val
      }
      return str
    },
    formart0 (val) {
      if (val !== undefined && val !== 'undefined' && val !== null && val !== 'null') {
        var valstr = Number(val)
        if (valstr === 0.0 || valstr === 0.00 || valstr === 0.000) {
          var str = 0
        }
      }
      return str
    },
    // 取两位小数
    formatFixed (val) {
      if (val !== undefined && val !== 'undefined' && val !== null && val !== 'null') {
        var valstr = Number(val)
        if (valstr === 0.0 || valstr === 0.00 || valstr === 0.000) {
          var str = 0
        } else {
          str = valstr.toFixed(2)
        }
      } else {
        str = val
      }
      return str
    },
    // 数据返回空时候处理
    formatname  (val) {
      if (val !== undefined && val !== 'undefined' && val !== null && val !== 'null') {
        var str = val.slice(-5)
        // console.log(str)
        var name = ''
        if (str === '石油分公司') {
          name = val.slice(0, 2)
        } else {
          name = str
        }
      }
      return name
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.bottomCom {
  width:100%
  color: #97a8f7
  margin-top:vh(15);
  // height:vh(790)
  // background :url('https://img.gdoil.cn/cockpit/static/images/washCarCard/bottom_bg_icon.png');
  // background-size:100% 100%;
  // border-bottom:1px solid #FF5C74D1;
  .table{
    font-size:12px;
    font-family:Source Han Sans CN;
     border-spacing: 0;/*去掉单元格间隙*/
    border-top:1px solid #5C74D1;
    border-left:1px solid #5C74D1;
    tr>th{
      font-size:15px;
      font-family:Source Han Sans CN;
      font-weight:bold;
      color:rgba(92,116,209,1);
      border-bottom:1px solid #5C74D1;
      border-right:1px solid #5C74D1;
    }
    .header_tr{
       height:vh(40)
    }
    tr{
      height:vh(28)
      font-size:vw(14)
    }
    tr>td{
      text-align :center;
      border-bottom:1px solid #5C74D1;
      border-right:1px solid #5C74D1;
    }
    .td1{
      width:vw(72)
    }
    .td2{
      width:vw(92)
    }
    .td3{
      width:vw(90)
    }
    .td4{
      width:vw(126)
    }
    .td5{
      width:vw(124)
    }
    .td6{
      width:vw(90)
    }
     .td7{
      width:vw(106)
    }
     .td8{
      width:vw(77)
    }
     .td9{
      width:vw(137)
    }
     .td10{
      width:vw(146)
    }
     .td11{
      width:vw(134)
    }
     .td12{
      width:vw(143)
    }
     .td13{
      width:vw(109)
    }
     .td14{
      width:vw(164)
    }
     .td15{
      width:vw(154)
    }
     .td16{
      width:vw(121)
    }

  }
}
</style>
