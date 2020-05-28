<template>
  <div class="topCommon">
      <img class="bgImg" :src="bgImg" alt="">
      <ul class="topCommonUl" v-if="type==1  && topList.length>0 ">
          <li  class="igs-flex">
            <div class="xuhao"></div>
            <div class="zengfuName"></div>
            <div class="zengfu">增量（万元）</div>
            <div class="zengfuAmount">销量（万元）</div>
          </li>
          <li class="igs-flex" v-for="(item,index) in topList" :key="index">
                <div class="xuhao bgcolor" :class="[index == 0 ?'first':'',index == 1 ?'second':'',index == 2 ?'third':'',]">{{index+1}}</div>
                <div class="name ellipsis zengfuName">{{item.name}}</div>
                <div class="amount zengfuAmount">{{(item.zengfu/10000).toFixed(0)}}</div>
                <div class="zengfu">{{(item.count/10000).toFixed(0)}}</div>
          </li>
      </ul>
       <ul class="topCommonUl" v-if="type==2  && topList.length>0 ">
          <li  class="igs-flex">
            <div class="xuhao"></div>
            <div class="zengfuName"></div>
            <div class="zengfu">增幅</div>
            <div class="zengfuAmount">销量（万元）</div>
          </li>
          <li class="igs-flex" v-for="(item,index) in topList" :key="index">
                <div class="xuhao bgcolor" :class="[index == 0 ?'first':'',index == 1 ?'second':'',index == 2 ?'third':'',]">{{index+1}}</div>
                <div class="name ellipsis zengfuName">{{item.name}}</div>
                <div class="zengfu">{{item.zengfu}}%</div>
                <div class="amount zengfuAmount">{{(item.count/10000).toFixed(0)}}</div>
          </li>
      </ul>
       <ul class="topCommonUl" v-if="type==3  && topList.length>0 ">
          <li  class="igs-flex">
            <div class="xuhao"></div>
            <div class="zengfuName"></div>
            <div class="zengfu">降量（万元）</div>
            <div class="zengfuAmount">销量（万元）</div>
          </li>
          <li class="igs-flex" v-for="(item,index) in topList" :key="index">
                <div class="xuhao bgcolor" :class="[index == 0 ?'first':'',index == 1 ?'second':'',index == 2 ?'third':'',]">{{index+1}}</div>
                <div class="name ellipsis zengfuName">{{item.name}}</div>
                <div class="zengfu">{{(item.zengfu/10000).toFixed(2)}}</div>
                <div class="amount zengfuAmount">{{(item.count/10000).toFixed(0)}}</div>
          </li>
      </ul>
        <ul class="topCommonUl" v-if="type==4 && topList.length>0 ">
          <li  class="igs-flex">
            <div class="xuhao"></div>
            <div class="zengfuName"></div>
            <div class="zengfu">降幅</div>
            <div class="zengfuAmount">销量（万元）</div>
          </li>
          <li class="igs-flex" v-for="(item,index) in topList" :key="index">
                <div class="xuhao bgcolor" :class="[index == 0 ?'first':'',index == 1 ?'second':'',index == 2 ?'third':'',]">{{index+1}}</div>
                <div class="name ellipsis zengfuName">{{item.name}}</div>
                <div class="zengfu">{{item.zengfu}}%</div>
                <div class="amount zengfuAmount">{{(item.count/10000).toFixed(0)}}</div>
          </li>
      </ul>
      <ul class="topCommonUl" v-if="topList.length==0">
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
        padding:0 pxtovw(60);
        position:absolute;
        top:pxtovh(40);
        left:50%;
        transform:translate(-50%,0);
        overflow:hidden;
        li{
            width:100%;
            line-height pxtovh(20);
            font-size:pxtovw(14);
            margin-bottom:pxtovh(7);
            .xuhao{
                width:vw(20);
                line-height vh(20);
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
                 width:45%!important;
                 padding-left:pxtovw(10);
            }
            .zengfuAmount{
                 width:26%!important;
                 text-align :center;
            }
            .zengfu{
                 width:26%!important;
                 text-align :center;
            }
        }
    }
}
</style>
