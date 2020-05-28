<template>
  <div class="todayData_box">
    <div class="data_box">
      <div class="box_title">累计会员总数<span>{{topMemberData.memberTotal}}</span></div>
      <div class="box_top igs-flex igs-flex9 igs-flex10">
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>活跃会员数/人</p>
            <p class="num">{{topMemberData.activeMemberTotal}}</p>
          </div>
        </div>
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>平均消费次数</p>
            <p class="num">{{topMemberData.averageConsumption}}</p>
          </div>
        </div>
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>产生柴油豆</p>
            <p class="num">{{topMemberData.produceDieselBeanTotal}}</p>
          </div>
        </div>
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>兑换柴油豆</p>
            <p class="num">{{topMemberData.redeemDieselBeanTotal}}</p>
          </div>
        </div>
        <div class="box_top_tab igs-flex igs-flex2">
          <div style="width:100%;text-align:center;">
            <p>兑换喜好TOP1</p>
            <p class="num">{{topMemberData.redeemLikeTop}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="data_box">
      <!-- 引入图表内容 -->
      <manage-chart :oilCode="oilCode"></manage-chart>
    </div>
    <div class="data_box">
      <div class="box_title">筛选数据项目</div>
      <div class="box_item">
        <div v-for="(item,index) in itemList" :key="index" :class="curItem==index ? 'active-item':''" @click="clickItem(index)">{{item}}</div>
      </div>
      <div class="box_b" v-for="(item, index) in dataList" :key="index">
        <div class="igs-flex igs-flex4 igs-flex2 phone_bg">
          <div class="box_b_t_l">手机号后四位：<span class="blue_color">{{item.phone}}</span><img src="https://img.gdoil.cn/cockpit/static/ipadImg/icon_go.png" alt=""><span class="momber_type member_new">{{item.type}}</span></div>
          <div class="box_b_t_r">消费次数：{{item.consumption}}</div>
        </div>
        <div class="box_b_b">
          <div class="igs-flex">
            <div class="box_b_l ellipsis">柴油消费金额￥：<span>{{item.dieseConsumptionAmout}}</span></div>
            <!-- <div class="box_b_c">消费次数：<span>3</span></div> -->
            <div class="box_b_l ellipsis">柴油豆余额：<span>{{item.dieselBeanBalance}}</span></div>
          </div>
          <div class="igs-flex">
            <div class="box_b_l igs-flex igs-flex2">油非互动券(张)：<span class="blue_color">{{item.couponCount}}</span> <img src="https://img.gdoil.cn/cockpit/static/ipadImg/icon_go.png" alt=""></div>
            <div class="box_b_l ellipsis">兑换最多产品：<span>{{item.redeemMostProduct}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'clientManagement',
  components: {
    ManageChart: require('@/components/cockpitIpad/ManageChart.vue').default
  },
  data () {
    return {
      itemList: ['活跃会员', '非活跃会员', '非会员'],
      curItem: 0,
      topMemberData: {}, // 会员信息
      customerType: '0', // 会员类型值
      dataList: ['', '', ''] // 销售记录
      // oilCode: '33250135'
      // memberList0: ['', '', ''], // 活跃会员
      // memberList1: ['', '', '', ''], // 非活跃会员
      // memberList2: ['', '', '', '', '', ''] // 非会员
    }
  },
  props: {
    oilCode: String
  },
  created () {
    this.memberDetailByOilCode()
    this.salesRecordListyOilCodeAndCustomerType()
  },
  methods: {
    // 会员类型点击
    clickItem (index) {
      this.curItem = index
      // if (index === 0) { this.dataList = this.memberList0 }
      // if (index === 1) { this.dataList = this.memberList1 }
      // if (index === 2) { this.dataList = this.memberList2 }
      this.customerType = index
      this.salesRecordListyOilCodeAndCustomerType()
    },
    // 获取会员明细
    memberDetailByOilCode () {
      let that = this
      this.$dialog.loading.open('加载中')
      this.$http.post('/webapi/cockpit/memberDetailByOilCode', {
        oilCode: that.oilCode
      }).then(res => {
        that.$dialog.loading.close()
        if (res.result === true) {
          that.topMemberData = res.data
        } else {
          that.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    // 销售记录
    salesRecordListyOilCodeAndCustomerType () {
      let that = this
      this.$dialog.loading.open('加载中')
      this.$http.post('/webapi/cockpit/salesRecordListyOilCodeAndCustomerType', {
        oilCode: that.oilCode,
        customerType: that.customerType
      }).then(res => {
        that.$dialog.loading.close()
        if (res.result === true) {
          that.dataList = res.rows
        } else {
          that.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  },
  watch: {
    oilCode (val) {
      // 监听油站编码变化刷新请求
      this.memberDetailByOilCode()
      this.salesRecordListyOilCodeAndCustomerType()
    }
  }
}
</script>

<style lang="stylus" scoped>
  ::-webkit-scrollbar {
    display: none;
  }
  .ellipsis{
    display:inline-block;white-space:nowrap;
    overflow:hidden;text-overflow: ellipsis;
  }
  @media screen and (min-width: 415px) {
    .todayData_box{
      padding: 0 20px;
      .data_box{
        width: 100%;
        height: auto;
        border-radius: 6px;
        background: #ffffff;
        padding: 20px;
        margin-bottom: 10px;
        .box_title{
          font-size: 18px;
          color: #4C4948;
          line-height: 18px;
          font-weight: 400;
          span{
            font-size: 30px;
            color: #008AFF;
          }
        }
        .box_item{
          width: 100%;
          line-height: 44px;
          padding: 10px 0;
          overflow-x: auto;
          white-space:nowrap;
          margin-bottom: 5px;
          div{
            width: auto;
            height:44px;
            background:rgba(231,238,241,1);
            border-radius:33px;
            font-size: 18px;
            color: #888888;
            text-align: center;
            margin-right: 24px;
            display: inline-block;
            padding: 0 10px;
          }
          div:hover{
            cursor: pointer;
          }
          .active-item{
            background: #50ACFE;
            color: #ffffff;
          }
        }
        .box_top{
          width:100%;
          background: #fff;
          height: auto;
          border-radius: 6px;
          .box_top_tab{
            width: 19%;
            height: 86px;
            background:rgba(242,247,249,1);
            border-radius:12px;
            font-size:14px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(76,73,72,1);
            margin-top: 10px;
            padding: 0 5px
            p{
              white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
            }
            .num{
              font-size:24px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(0,138,255,1);
              line-height:36px;
            }
            .name{
              color: #888888;
            }
            .add_color{
              color: #FF3939!important
            }
            .cut_color{
              color: #33CC00!important
            }
          }
        }
        .box_b{
          font-size:18px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(136,136,136,1);
          border-bottom:1px solid rgba(229,229,229,1);
          margin-bottom: 15px;
          .box_b_t_l{
            flex: 1
            display: flex
            align-items: center
          }
          .box_t_r{
            width: 150px
          }
          img{
            width:34px;
            height:34px;
          }
          .momber_type{
            width:56px;
            line-height: 24px;
            border-radius:12px;
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            text-align :center;
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
          .member_old{
            background:rgba(225,229,229,1);
            color: #E32F2F;
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
          }
          .blue_color{
            color: #50ACFE!important;
          }
        }
      }
    }
  }
  @media screen and (max-width: 414px) {
    .todayData_box{
      padding: 0 10px;
      .data_box{
        width: 100%;
        height: auto;
        border-radius: 6px;
        background: #ffffff;
        padding: 10px;
        margin-bottom: 10px;
        .box_title{
          font-size: 14px;
          color: #4C4948;
          line-height: 18px;
          font-weight: 400;
          span{
            font-size: 16px;
            color: #008AFF;
          }
        }
        .box_item{
          width: 100%;
          line-height: 24px;
          padding: 8px 0;
          overflow-x: auto;
          white-space:nowrap;
          div{
            width: auto;
            height: 24px;
            background:rgba(231,238,241,1);
            border-radius: 11px;
            font-size: 10px;
            color: #888888;
            text-align: center;
            margin-right: 8px;
            display: inline-block;
            padding: 0 10px;
          }
          .active-item{
            background: #50ACFE;
            color: #ffffff;
          }
        }
        .box_top{
          width:100%;
          background: #fff;
          height: auto;
          border-radius: 6px;
          .box_top_tab{
            width: 19%;
            height: 50px;
            background:rgba(242,247,249,1);
            border-radius: 4px;
            font-size: 9px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(76,73,72,1);
            margin-top: 5px;
            padding: 0 1px
            p{
              white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
            }
            .num{
              font-size: 10px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(0,138,255,1);
              line-height: 16px;
            }
            .name{
              color: #888888;
            }
            .add_color{
              color: #FF3939!important
            }
            .cut_color{
              color: #33CC00!important
            }
          }
        }
        .box_b{
          font-size: 12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(136,136,136,1);
          border-bottom:1px solid rgba(229,229,229,1);
          margin-bottom:10px;
          .box_b_t_l{
            flex: 1
            img{
              width: 18px;
              height: 18px;
              margin: 5px 0 -5px 0
            }
          }
          .box_b_t_r{
            width: 75px
            text-align: right
          }
          img{
            width: 18px;
            height: 18px;
          }
          .momber_type{
            width: 52px;
            line-height: 16px;
            border-radius: 12px;
            font-size: 9px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            text-align :center;
          }
          .box_b_b{
            line-height 20px;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
            padding: 4px 0 8px 0;
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
          .member_old{
            background:rgba(225,229,229,1);
            color: #E32F2F;
          }
          .member_none{
            background:rgba(251,231,205,1);
            color: #FF5D1B;
          }
          .phone_bg{
            line-height:22px!important;
            background:rgba(242,247,249,1);
            border-radius:1px;
            padding: 0 12px;
            font-size: 9px;
          }
          .blue_color{
            color: #50ACFE!important;
          }
        }
      }
    }
  }

</style>
