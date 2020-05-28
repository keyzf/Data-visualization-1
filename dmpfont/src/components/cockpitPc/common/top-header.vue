<template>
  <div class="top-header">
    <slot></slot>
    <div class="day_time">{{currentTime}}</div>
  </div>
</template>

<script>
export default {
  name: 'top-header',
  data () {
    return {
      timer: '',
      currentTime: ''
    }
  },
  created () {
    var _this = this
    this.timer = setInterval(function () {
      _this.currentTime = `${new Date().getFullYear()}-${_this.appendZero((new Date().getMonth() + 1))}-${_this.appendZero(new Date().getDate())} ${_this.appendZero(new Date().getHours())}:${_this.appendZero(new Date().getMinutes())}:${_this.appendZero(new Date().getSeconds())}`
    }, 1000)
  },
  methods: {
    appendZero (obj) {
      if (obj < 10) {
        return '0' + obj
      } else {
        return obj
      }
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../assets/css/mixin.styl'
  .top-header {
    margin-bottom: pxtovh(30)
  }
  .day_time {
    position absolute
    top: pxtovh(45)
    color #5C74D1
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px
  }
</style>
