<template>
  <div id="warpperTest" style="background: #ffffff">
   <!--  <VueDragResize :isActive="true" :w="200" :h="200" v-on:resizing="resize" v-on:dragging="resize"
                   :isResizable="false"
    > -->
    <svg  width="100%" height="50">
      <defs>
      <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse"  x1="0" y1="0" x2="0" y2="100%">
        <stop offset="0" style="stop-color: yellow"/>
        <stop offset="0.5" style="stop-color: #fd8403"/>
        <stop offset="1" style="stop-color: black"/>
      </linearGradient>
      </defs>
      <text text-anchor="middle" x="50%" y="50%" class="box-text" >卡车之家会员数据分析大屏</text>
    </svg>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'
export default {
  name: 'defaultDrag',
  components: {
    VueDragResize
  },
  data () {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  },
  methods: {
    resize (newRect) {
      this.width = newRect.width
      this.height = newRect.height
      this.top = newRect.top
      this.left = newRect.left
    }
  }
}
</script>
<style scoped lang="stylus">
  @import'../assets/css/mixin.styl'
  .title{
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    font-family: LcdD;
    font-weight: bold;
    text-align: center;
    background: linear-gradient(to bottom, red, black);
    -webkit-background-clip: text;
    color: transparent;
    background: url("https://img.gdoil.cn/cockpit/static/images/trackHomeScreen/bot_bg.png") no-repeat
      -webkit-background-size: 100% 100%
  }
  .box-text {
    fill: url(#SVGID_1_);
    font-size: 40px;
  }

</style>
