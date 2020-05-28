<template>
  <div>
    <svg  class="svg">
      <defs>
      <linearGradient id="SVGID" gradientUnits="userSpaceOnUse"  x1="0" y1="0" x2="0" y2="100%">
        <!-- <stop offset="0" style="stop-color: rgba(151,168,247,1)"/>
        <stop offset="1" style="stop-color: rgba(229,232,255,1)"/> -->
        <stop offset="0" :style="{stopColor: titleInfo.titleColor}"/>
        <stop offset="1" :style="{stopColor: titleInfo.titleColor1}"/>
      </linearGradient>
      </defs>
      <text text-anchor="middle" x="50%" y="50%" class="box-text" >{{titleInfo.titleName}}</text>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'pageTitle',
  props: {
    titleInfo: {
      titleName: { // 标题
        type: String,
        default: ''
      },
      titleColor: { // 渐变颜色0%
        type: String,
        default: 'rgba(195,210,252,1)'
      },
      titleColor1: { // 渐变颜色100%
        type: String,
        default: 'rgba(101,129,209,1)'
      }
    }
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style scoped lang="stylus">
  @import '../../../assets/css/mixin.styl'
  .svg{
    width: 100%;
    height: vh(53);
    margin-top: vh(10);
  }
  .box-text {
    fill: url(#SVGID);
    font-size: vh(31);
    font-family: MFLiHei;
  }

</style>
