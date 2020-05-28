<template>
  <div class="wrapers" :class="{'blue-color': setType.colortype, 'flex-start': !setType.iscenter }">
    <ul class="box-item" :class="setType.colortype == 1 ? 'blue-color':'white-color'">
      <li :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
          v-for="(item,index) in valueNew.toString().split('')"
          :key="index">
        <span v-if="!isNaN(item)">
          <i ref="orderNumRef">0123456789</i>
        </span>
        <span v-else>{{item}}</span>
      </li>
    </ul>
    <div class="unit-span">{{setType.unitname}}</div>
  </div>
</template>

<script>
export default {
  name: 'countNum',
  props: {
    value: { // 数值
      // type: String,
      default: '0'
    },
    setType: {
      unitname: { // 单位
        type: String,
        default: '万元'
      },
      colortype: { // 颜色，1蓝色，0白色
        type: Number,
        default: 0
      },
      iscenter: {
        type: Number,
        default: 1 // 文字是否居中，1居中，0不居中，默认居中
      }
    }
  },
  data () {
    return {
      valueNew: String
    }
  },
  mounted () {
    this.valueNew = this.value
    // 首次进来，延迟加载
    setTimeout(() => {
      this.setNumberTransform1(this.valueNew)
    }, 100)
    // this.timer = setInterval(() => { // 测试用
    //   this.valueNew = (Number(this.valueNew) + 0.8).toFixed(1)
    //   this.setNumberTransform1(this.valueNew)
    // }, 3000)
  },
  methods: {
    // 设置文字滚动
    setNumberTransform1 (numVal) {
      if (!numVal || numVal === 0) { return } // 为空或者0返回
      const numberItem1 = this.$refs.orderNumRef // 拿到数字的ref，计算元素数量
      // split将其便变成数组，渲染至滚动数组
      const numberArr = numVal.toString().split('').filter(item => !isNaN(item))
      // 结合CSS 对数字字符进行滚动
      for (let index = 0; index < numberItem1.length; index++) {
        const elem = numberItem1[index]
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
      }
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  watch: {
    value (val) {
      this.valueNew = val
      this.setNumberTransform1(this.valueNew)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../assets/css/mixin.styl'
    .wrapers{
      display: flex
      flex: 1
      height: auto
      line-height: vh(40)
      border: none!important
      padding: 0
      margin: 0
      justify-content: center
      background: rgba(0, 0, 0, 0)
      white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
    }
    .flex-start{
      justify-content: flex-start!important
    }
    /* 数字翻牌样式*/
    .box-item {
      width: auto
      height: vh(40)
      list-style: none
      writing-mode: vertical-lr
      text-orientation: upright
      user-select: none;
      padding: 0 vw(8) 0 0
      font-size: vw(36)
      font-family: LcdD
      font-weight: bold
      margin: vh(0) 0 0 vw(-4)
      color: #ffffff
      /* 默认逗号设置 */
      .mark-item {
        width: vw(8);
        height: vh(40);
        font-size: vw(36);
        position: relative;
        & > span {
          width: 100%;
          bottom: 0;
          writing-mode: vertical-rl;
          margin-right: vw(0);
          margin-left: vw(6)
        }
      }
      .number-item {
        width: vw(22)
        height: vh(40)
        list-style: none
        & > span {
          position: relative;
          display: inline-block;
          margin-right: vw(0);
          width: 100%;
          height: 100%;
          writing-mode: vertical-rl;
          overflow: hidden;
          & > i {
            position: absolute;
            top: 0px;
            left: 33%;
            transform: translate(-50%,0);
            transition: transform 1s ease-in-out;
            letter-spacing: vh(10);
          }
        }
      }
    }
    .white-color{
      color: #ffffff
    }
    .blue-color{
      color: #81D5D9
    }
    .unit-span{
      color: #5C74D1
      font-size: vw(12)!important
      float: left
    }
</style>
