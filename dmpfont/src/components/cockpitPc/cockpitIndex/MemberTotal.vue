<template>
  <div >
    <section class="member">
      <div class="member-title">累计会员数<span class="num-total">{{memberTotal.cumulativeMemberCount}}</span><img :src="memberTotal.cmcComparedYesterday>0?topIcon:botIcon"><span class="num-add">{{memberTotal.cmcComparedYesterday}}</span></div>
      <div class="member-cont disflex">
        <div class="member-cont-l">
          <div class="cont-left"><img src="https://img.gdoil.cn/cockpit/static/images/icon_members1.png"></div>
          <div class="cont-right">
            <div>当日会员发展数</div>
            <div class="marbot">{{memberTotal.theDayMemberCount}}</div>
            <div class="disflex"><div>对比月均值</div> <div class="disflex"><img :src="memberTotal.tdmcComparedMonthlyMean>0?topIcon:botIcon">{{memberTotal.tdmcComparedMonthlyMean}}</div></div>
          </div>
        </div>
        <div class="member-cont-r">
          <div class="cont-left"><img src="https://img.gdoil.cn/cockpit/static/images/icon_members2.png"></div>
          <div class="cont-right">
            <div>当月会员发展数</div>
            <div class="marbot">{{memberTotal.theMonthMemberCount}}</div>
            <div class="disflex"><div>环比上月</div> <div class="disflex"><img :src="memberTotal.tmmcMoMlastMonth>0?topIcon:botIcon">{{memberTotal.tmmcMoMlastMonth}}</div></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'MemberTotal',
  data () {
    return {
      topIcon: 'https://img.gdoil.cn/cockpit/static/images/top_icon.png',
      botIcon: 'https://img.gdoil.cn/cockpit/static/images/bot_icon.png'
    }
  },
  props: {
    memberTotal: Object // 会员累计数信息ber
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../assets/css/mixin.styl'
  .member{
    padding: 0 vw(15);
    .member-title{
      line-height: vh(70);
      text-align: center;
      color: #ffffff;
      font-size: vw(20);
      img{
        width: vw(25);
        margin-bottom: vh(-5);
      }
      .num-total{
        font-size: vw(30);
      }
      .num-add{
        font-size: vw(15);
        padding-top: vh(-5);
      }
    }
    .disflex{
      display: flex;
      justify-content: space-between;
      div{
        white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
      }
    }
    .marbot{
      margin-bottom: vh(5);
    }
    .member-cont{
      color: #ffffff;
      .member-cont-l,.member-cont-r{
        flex: 1;
        display: flex;
        .cont-left{
          width: vw(47);
          img{
            width: 100%;
            height: auto;
            border-radius: 100%;
          }
        }
        .cont-right{
          flex: 1;
          font-size: vw(18);
          padding: 0 vw(15) 0 vw(5);
          div{
            line-height: vw(24);
          }
          .disflex{
            font-size: vw(15);
            img{
              width: vw(18);
              height: vw(18);
            }
          }
        }
      }
    }
  }
</style>
