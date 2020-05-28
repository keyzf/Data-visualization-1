<template>
  <div>
    <svg  class="svg">
      <defs>
      <linearGradient id="SVGID_1" gradientUnits="userSpaceOnUse"  x1="0" y1="0" x2="0" y2="100%">
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
        default: 'rgba(219,225,255,1)'
      },
      titleColor1: { // 渐变颜色100%
        type: String,
        default: 'rgba(219,225,255,1)'
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
    height: vh(40);
    margin-top: vh(2);
  }
  .box-text {
    fill: url(#SVGID_1);
    font-size: vh(18);
    font-family: MFLiHei;
  }
</style>
