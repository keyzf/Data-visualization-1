<template>
  <div class="float-wrapper">
    <div class="entry-wrapper" v-if="!show">
      <VueDragResize :isActive="true"
                     v-on:resizing="resize"
                     v-on:dragging="resize"
                     :isResizable="false"
                     :parentLimitation="true" :parentW="1900" :parentH="1020"
                     @dragstop="showFloatIcon"
      >
        <div class="entryOut"><div class="icon"></div></div>
      </VueDragResize>
    </div>
    <div class="float-content" v-if="show">
      <div class="floatball" id="floatball"
           @mousedown="down" @touchstart.stop="down"
           @mousemove="move" @touchmove.stop="move"
           @mouseup="end" @touchend.stop="end"
           :style="{top:position.y+'px', left:position.x+'px'}">
        <div class="item-list">
          <div class="item-content" @click="goToPage('oilDataIndex')">
            <span class="icon icon1"></span>
            <span class="text">油品数据分析大屏</span>
          </div>
          <div class="item-content" @click="goToPage('noneOilScreenIndex')">
            <span class="icon icon2"></span>
            <span class="text">非油品数据分析大屏</span>
          </div>
        </div>
        <div class="item-list item-list-center">
          <div class="item-content" @click="goToPage('dataIndex')">
            <span class="icon icon3"></span>
            <span class="text">客户数据分析大屏</span>
          </div>
          <div class="item-content" @click="goToPage('staffRankIndex')">
            <span class="icon icon4"></span>
            <span class="text">卓越员工排名</span>
          </div>
        </div>
        <div class="item-list">
          <div class="item-content" @click="goToPage('overallIndex')">
            <span class="icon icon5"></span>
            <span class="text">卡车之家数据分析大屏</span>
          </div>
          <div class="item-content" @click="goToPage('netIndex2')">
            <span class="icon icon6"></span>
            <span class="text">卡车之家网络发展大屏</span>
          </div>
        </div>
        <div class="item-list item-list-last">
          <div class="item-content" @click="goToPage('gasolineIndex')">
            <span class="icon icon1"></span>
            <span class="text">汽油会员数据大屏</span>
          </div>
          <div class="item-content" @click="goToPage('trackHomeScreenIndex')">
            <span class="icon icon5"></span>
            <span class="text">卡车之家会员数据大屏</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'
// 鼠标位置和div的左上角位置 差值
var dx, dy
var screenWidth = window.screen.width
var screenHeight = window.screen.height
export default {
  name: 'floatIcon',
  components: {
    VueDragResize
  },
  data () {
    return {
      show: false,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      flags: false,
      position: {
        x: 750,
        y: 300
      }
    }
  },
  watch: {// 如果路由有变化，会再次执行该方法
    '$route': 'change' // getOrderInfo为自定义方法
  },
  methods: {
    showFloatBox () {
      this.show = false
    },
    showFloatIcon () {
      this.show = true
    },
    goToPage (val) {
      this.$router.push({
        name: val
      })
    },
    resize (newRect) {
      this.width = newRect.width
      this.height = newRect.height
      this.top = newRect.top
      this.left = newRect.left
    },
    change () {
      this.show = false
    },
    // 实现移动端拖拽
    down (event) {
      this.flags = true
      var touch
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      dx = touch.clientX - event.target.offsetLeft
      dy = touch.clientY - event.target.offsetTop
    },
    move () {
      if (this.flags) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        // 定位滑块的位置
        this.position.x = touch.clientX - dx
        this.position.y = touch.clientY - dy
        // 限制滑块超出页面
        if (this.position.x < 0) {
          this.position.x = 0
        } else if (this.position.x > screenWidth - touch.target.clientWidth) {
          this.position.x = screenWidth - touch.target.clientWidth
        }
        if (this.position.y < 0) {
          this.position.y = 0
        } else if (this.position.y > screenHeight - touch.target.clientHeight) {
          this.position.y = screenHeight - touch.target.clientHeight
        }
        // 阻止页面的滑动默认事件
        document.addEventListener('touchmove', function () {
          event.preventDefault()
        }, false)
      }
    },
    // 鼠标释放时候的函数
    end () {
      this.flags = false
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../assets/css/mixin.styl'
  .entry-wrapper {
    .vdr.active:before {
      display none
    }
  }
  .float-wrapper {
    .float-content {
      position relative
      .floatball {
        width: pxtovw(480)
        height: pxtovh(460)
        background: rgba(17,30,118,1);
        border-radius: pxtovw(30);
        padding pxtovh(20) 0
        color: white;
        z-index: 10000000;
        position: fixed;
        top: 60px;
        right: 320px;
        .item-list-center {
          margin pxtovh(25) 0
        }
        .item-list-last {
          margin-top vh(25)
        }
        .item-list {
          display flex
          .item-content {
            flex 1
            text-align center
            .text {
              font-size: pxtovw(16)
              color: #a9b8ff
            }
            .icon {
              display block
              width: pxtovw(44)
              height: pxtovh(47)
              margin 0 auto
              margin-bottom: pxtovh(10)
            }
            .icon1 {
              background: url("https://img.gdoil.cn/cockpit/static/images/common/oil.png") no-repeat
              -webkit-background-size: 100% pxtovh(47)
              background-size: 100% pxtovh(47)
            }
            .icon2 {
              background: url("https://img.gdoil.cn/cockpit/static/images/common/none-oil.png") no-repeat
              -webkit-background-size: 100% pxtovh(47)
              background-size: 100% pxtovh(47)
            }
            .icon3 {
              background: url("https://img.gdoil.cn/cockpit/static/images/common/customer-little.png") no-repeat
              -webkit-background-size: 100% pxtovh(47)
              background-size: 100% pxtovh(47)
            }
            .icon4 {
              background: url("https://img.gdoil.cn/cockpit/static/images/common/excellence.png") no-repeat
              -webkit-background-size: 100% pxtovh(47)
              background-size: 100% pxtovh(47)
            }
            .icon5 {
              background: url("https://img.gdoil.cn/cockpit/static/images/common/car.png") no-repeat
              -webkit-background-size: 100% pxtovh(47)
              background-size: 100% pxtovh(47)
            }
            .icon6 {
              background: url("https://img.gdoil.cn/cockpit/static/images/common/internet.png") no-repeat
              -webkit-background-size: 100% pxtovh(47)
              background-size: 100% pxtovh(47)
            }
          }
        }
      }
    }
    .entry-wrapper {
      .entryOut {
        position absolute
        right 0
        top: 50%
        transform translateY(-50%)
        width: pxtovh(70)
        height: pxtovh(70)
        border-radius: 50%;
        background:rgba(22,30,103,.8);
        display flex
        align-items center
        box-shadow 0 0 8px #161E67
        .icon {
          width: pxtovh(37)
          height: pxtovh(35)
          margin auto
          background: url("https://img.gdoil.cn/cockpit/static/images/common/customer.png") no-repeat
          -webkit-background-size: 100%
          background-size: 100%
        }
      }
    }
  }
</style>
