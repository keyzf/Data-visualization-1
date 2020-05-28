<template>
  <div >
    <section class="member">
      <div class="member-title">当日发展会员客户信息</div>
      <section>
        <table>
          <thead class="thead">
            <tr>
              <th style="width: 14%">会员号</th>
              <th style="width: 14%">消费金额</th>
              <th style="width: 14%">柴油豆余量</th>
              <th style="width: 14%">剩余易捷券</th>
              <th style="width: 19%">兑换商品喜好</th>
              <th style="width: 19%">RFM客户分类</th>
            </tr>
          </thead>

          <tbody class="tbody" >
            <tr v-for="(item, index) in memberList" :key="index">
              <td style="width: 14%">{{item.userId}}</td>
              <td style="width: 14%">{{item.consumAmount}}</td>
              <td style="width: 14%" >{{item.dieselBean}}</td>
              <td style="width: 14%" >{{item.surplusCoupon}}</td>
              <td style="width: 19%">{{item.redeemGoodsLike}}</td>
              <td style="width: 19%">{{item.customerRFMType}}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'InfoNewMember',
  data () {
    return {
      memberList: []
    }
  },
  created () {
    this.getDevelopMemberUserInfo()
  },
  methods: {
    getDevelopMemberUserInfo () {
      this.$http.post('/webapi/cockpit/getDevelopMemberUserInfo', {
        page: 1,
        pageSize: 5
      }).then(res => {
        if (res.result === true) {
          this.memberList = res.rows
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../assets/css/mixin.styl'
  .tbody::-webkit-scrollbar {
    display: none;
  }
  .member{
    height: vh(303);
    padding: 0 vw(10);
    border-left: vw(3) solid #0CEBF8;
    color: #ffffff;
    .member-title{
      font-size: vw(20);
      line-height: vh(60);
      padding-left: vw(15)
    }
    table{
      width: 100%;
      color: #ffffff;
      font-size: vw(16);
      border-collapse: collapse;
      border-spacing: 0;
      .thead{
        background: #8957A1;
        tr{
          display: inline-block;width: 100%;
        }
        th{
          line-height: vh(20);
          padding: vw(6) 0;
          text-align: center;
          display: inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
        }
      }
      .tbody{
        background:rgba(248,248,248,0);
        display: inline-block;width: 100%;max-height: vh(190);overflow: auto;
        tr{
          display: inline-block;width: 100%;
        }
        td{
          line-height: vh(20);
          padding: vh(8) 0;
          text-align: center;
          display: inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
        }
      }
    }
  }
</style>
