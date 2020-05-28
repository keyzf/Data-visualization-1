<template>
  <div class="topCommon">
      <img class="bgImg" :src="bgImg" alt="">
      <ul class="topCommonUl" v-if="topList.length>0">
        <li  class="igs-flex">
            <div class="xuhao"></div>
            <div class="zengfuName"></div>
             <div class="zengfu">同比增量</div>
            <div class="zengfuAmount">销量</div>
        </li>
          <li class="igs-flex" v-for="(item,index) in topList" :key="index">
                <div class="xuhao bgcolor" :class="[index == 0 ?'first':'',index == 1 ?'second':'',index == 2 ?'third':'',]">{{index+1}}</div>
                <div class="name ellipsis" >{{item.name}}</div>
                <div class="zengfu">{{$util.fixedamount(item.Increase)}}元</div>
                <div class="amount">{{$util.fixedamount(item.count)}}元</div>
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
  props: ['topList', 'bgImg'],
  created () {
  },
  mounted () {
    console.log(this.bgImg)
  },
  methods: {

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
        height:vh(280);
        padding:0 pxtovw(60);
        position:absolute;
        top:pxtovh(40);
        left:50%;
        transform:translate(-50%,0);
        overflow-x :hidden;
        li{
            width:100%;
            line-height pxtovh(16);
            font-size:pxtovw(12);
            margin-bottom:pxtovh(7);
            .xuhao{
                width:vw(16);
                line-height vh(16);
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
                 width:50%;
                 padding-left:pxtovw(10);
            }
            .amount{
                 width:20%;
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
