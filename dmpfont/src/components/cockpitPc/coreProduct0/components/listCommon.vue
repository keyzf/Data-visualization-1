<template>
  <div class="topCommon">
      <img class="bgImg" :src="bgImg" alt="">
      <div class="topCommonUl" v-if="topList.length>0">
          <div class="topCommonLi" v-for="(item,index) in topList" :key="index">
                <div class="xuhao bgcolor" :class="[index == 0 ?'first':'',index == 1 ?'second':'',index == 2 ?'third':'',]">{{index+1}}</div>
                <div class="name ellipsis" :class="item.zengfu? 'zengfuName':''">{{item.name}}</div>
          </div>
      </div>
       <div class="topCommonUl" v-else>
          <p style="text-align:center;margin-top:40px;">暂无数据</p>
      </div>
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
   .topCommonUl::-webkit-scrollbar{
    width: vw(8);
    }
   .topCommonUl::-webkit-scrollbar-track{ /*滑动条背景*/
    background: #000530;
    border-radius: vw(4);
    }
   .topCommonUl::-webkit-scrollbar-thumb{ /*滑动条颜色*/
    background: rgba(0,35,199,0.3);
    border-radius: vw(4);
    }
   .topCommonUl::-webkit-scrollbar-thumb:hover{
    background: rgba(0,35,199,0.5);
    }
   .topCommonUl::-webkit-scrollbar-corner{
    background: rgba(0,35,199,0.5);
    }
    .topCommonUl{
       overflow-x:hidden;
        width:100%;
        height:pxtovh(270);
        padding:0 pxtovw(60);
        position:absolute;
        top:pxtovh(40);
        left:50%;
        transform:translate(-50%,0);
        scrollbar-arrow-color: #000; /*顶部/底部图标颜色*/
        scrollbar-face-color: #333; /*滚动条颜色*/
        scrollbar-shadow-color: #999;/*滚动条阴影颜色*/
        .topCommonLi:nth-child(2n){
            float: right!important;
        }
         .topCommonLi:nth-child(2n-1){
            float: left!important;
        }
        .topCommonLi{
            width:50%;
            font-size:pxtovw(18);
            margin-bottom:pxtovh(7);
            height:vh(40);
            position:relative;
            padding-left:vw(30)
            .xuhao{
                display :inline-block;
                width:vw(20);
                height:vh(20);
                line-height vh(20);
                text-align :center;
                position:absolute;
                top:50%;
                left:0;
                margin-top:vh(-10)
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
                line-height pxtovh(40);
                 width:96%;
                 padding-left:pxtovw(10);
            }
            .amount{
                 width:30%;
                 text-align :center;
            }
        }
    }
}
</style>
