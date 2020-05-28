<template>
  <div >
    <section class="member">
      <div class="member-title">会员柴油豆当日生产情况</div>
      <section class="disflex">
        <div>
          <img src="https://img.gdoil.cn/cockpit/static/images/icon_cydsl.png">
          <div>生产柴油豆数量</div>
          <div class="bean-num">{{beanMake.dieselBeanProductionCount}}</div>
        </div>
        <div>
          <img src="https://img.gdoil.cn/cockpit/static/images/icon_jybs.png">
          <div>生产柴油豆交易笔数</div>
          <div class="bean-num">{{beanMake.dieselBeanProductionDealCount}}</div>
        </div>
        <div>
           <img src="https://img.gdoil.cn/cockpit/static/images/icon_hdzb.png">
          <div>柴油豆活动占比</div>
          <div class="bean-num">{{beanMake.dieselBeanActivityProportion}}</div>
        </div>
        <div>
           <img src="https://img.gdoil.cn/cockpit/static/images/icon_sjjyss.png">
          <div>涉及加油升数</div>
          <div class="bean-num">{{beanMake.involveRefuelLiter}}</div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BeanMake',
  data () {
    return {
      msg: ''
    }
  },
  props: {
    beanMake: Object
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../../assets/css/mixin.styl'
  .member{
    height: vh(183);
    padding: 0 vw(10);
    border-left: vw(3) solid #0CEBF8;
    color: #ffffff;
    font-size: vw(16);
    .member-title{
      font-size: vw(20);
      padding-top: vh(18);
      line-height: vh(30);
      padding-left: vw(15)
    }
    .disflex{
      height: vh(135)
      display: flex;
      justify-content: flex-around;
      text-align: center;
      align-items: center;
      div{
        flex: 1;
        white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
        img{
          width: vw(48);
          height: vw(48);
          border-radius: 100%;
          margin: 0;
        }
        .bean-num{
          font-size: vw(30);
          margin-top: vh(5)
        }
      }
    }
  }
</style>
