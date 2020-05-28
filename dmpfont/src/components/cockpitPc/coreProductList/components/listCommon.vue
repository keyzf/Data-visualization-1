<template>
  <div class="topCommon">
      <img class="bgImg" :src="bgImg" alt="">
      <ul class="topCommonUl" v-if="topList.length>0">
          <li  class="igs-flex">
            <div class="xuhao"></div>
            <div class="zengfuName"></div>
            <div class="zengfuAmount" @click="salesVolume">增量</div>
            <div class="zengfu" @click="amplification">增幅</div>
            <div class="zengfu">销量</div>
          </li>
          <li class="igs-flex" v-for="(item,index) in topList" :key="index">
                <div class="xuhao bgcolor" :class="[index == 0 ?'first':'',index == 1 ?'second':'',index == 2 ?'third':'',]">{{index+1}}</div>
                <div class="name ellipsis zengfuName">{{item.name}}</div>
                <div class="amount zengfuAmount">{{item.count}}元</div>
                <div class="zengfu">{{item.Increase}}%</div>
                <div class="zengfu">{{item.sales}}元</div>
          </li>
      </ul>
       <ul class="topCommonUl" v-else>
          <p style="text-align:center;margin-top:40px;">暂无数据</p>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'topCommon',
  props: ['topList', 'bgImg', 'type'],
  created () {
  },
  mounted () {
    console.log(this.bgImg)
  },
  methods: {
    salesVolume () {
      if (this.type === 1) {
        this.$parent.fuelTreasurefun(0)
      } else if (this.type === 2) {
        this.$parent.treatmentSolutionfun(0)
      } else if (this.type === 3) {
        this.$parent.zhuMaQuanfun(0)
      } else if (this.type === 4) {
        this.$parent.tianquanChangbaiMountainfun(0)
      } else if (this.type === 5) {
        this.$parent.laimaoWinefun(0)
      } else if (this.type === 6) {
        this.$parent.moonDewfun(0)
      } else if (this.type === 7) {
        this.$parent.lubricatingOilfun(0)
      } else if (this.type === 8) {
        this.$parent.chineseWolfberryfun(0)
      } else if (this.type === 9) {
        this.$parent.bathOfGlassfun(0)
      }
    },
    amplification () {
      if (this.type === 1) {
        this.$parent.fuelTreasurefun(1)
      } else if (this.type === 2) {
        this.$parent.treatmentSolutionfun(1)
      } else if (this.type === 3) {
        this.$parent.zhuMaQuanfun(1)
      } else if (this.type === 4) {
        this.$parent.tianquanChangbaiMountainfun(1)
      } else if (this.type === 5) {
        this.$parent.laimaoWinefun(1)
      } else if (this.type === 6) {
        this.$parent.moonDewfun(1)
      } else if (this.type === 7) {
        this.$parent.lubricatingOilfun(1)
      } else if (this.type === 8) {
        this.$parent.chineseWolfberryfun(1)
      } else if (this.type === 9) {
        this.$parent.bathOfGlassfun(1)
      }
    }
  },
  components: {

  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
.topCommon {
    width:100%;
    height:100%;
    position:relative;
    .bgImg{
        width:100%;
        height:100%;
    }
    .topCommonUl{
        width:100%;
        padding:0 pxtovw(60);
        position:absolute;
        top:pxtovh(40);
        left:50%;
        transform:translate(-50%,0);
        li{
            width:100%;
            line-height vh(20);
            font-size:pxtovw(12);
            margin-bottom:pxtovh(5);
            .xuhao{
                width:vw(20);
                line-height pxtovh(20);
                text-align :center;
            }
            .bgcolor{
                background:rgba(25,47,124,1);
                color #fff
            }
            .first{
               background:rgba(222,86,86,1);
            }
            .second{
                background:rgba(182,155,54,1);
            }
            .third{
               background:rgba(126,89,241,1);
            }
            .name{
                 width:60%;
                 padding-left:pxtovw(10);
            }
            .amount{
                 width:30%;
                 text-align :center;
            }
            .zengfuName{
                 width:50%!important;
                 padding-left:pxtovw(10);
            }
            .zengfuAmount{
                 width:20%!important;
                 text-align :center;
            }
            .zengfu{
                 width:20%!important;
                 text-align :center;
            }
        }
    }
}
</style>
