<template>
  <div class="wrapper">
    <a href="#" class="show" @click="Bubblings($event)">START</a>
    <ul>
      <!-- 一级列表 -->
      <li v-for="(item,index) of list" :key="index">
        <a href="#" @click="Bubblings($event)">{{ item.name }}</a>
        <!-- 二级列表 -->
     <!--   <ul>
          <li v-for="(child,index) of item.childs" :key="index">
            <a href="#" @click="Bubblings($event)">{{ child.name }}</a>
          </li>
        </ul>-->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'defaultDrag',
  data () {
    return {
      list: [
        {
          name: '哈哈',
          childs: [
            {
              name: 'A-1'
            },
            {
              name: 'A-2'
            },
            {
              name: 'A-3'
            }
          ]
        },
        {
          name: '呵呵',
          childs: [
            {
              name: 'B-1'
            },
            {
              name: 'B-2'
            },
            {
              name: 'B-3'
            }
          ]
        }
      ]
    }
  },
  methods: {
    Bubblings (e) {
      // 获取点击的DOM对象
      let self = e.target
      // 检查点击的是否是选中的圆
      if (self.classList.contains('selected')) {
        // 如果是移除当前选中效果，返回上级菜单
        self.classList.remove('selected')
        // 判断它的父级元素是不是顶级元素
        if (!self.parentNode.classList.contains('wrapper')) {
          // 如果不是顶级元素，展示对应的菜单列表
          self.parentNode.parentNode.parentNode
            .querySelector('a')
            .classList.add('selected')
        } else {
          // 如果是顶级元素，仅显示最顶级元素
          self.classList.add('show')
        }
      } else {
        // 如果点击的不是选中的圆
        self.classList.add('selected')
        // 判断是否点击的是顶级元素
        if (!self.parentNode.classList.contains('wrapper')) {
          // 如果不是顶级元素，展开所点击的菜单列表
          // a(self) -> li(parent) -> ul(parent) -> li(parent) -> a(target)
          self.parentNode.parentNode.parentNode
            .querySelector('a')
            .classList.remove('selected')
        } else {
          // 点击顶级元素展开一级菜单列表
          self.classList.remove('show')
        }
      }
      return false
    }
  }
}
</script>
<style scoped lang="stylus">
  @import'../assets/css/mixin.styl'
  ul {
    list-style: none;
  }
  a {
    width: 120px;
    height: 120px;
    position: absolute;
    background: rgba(255, 255, 255, 0.9);
    text-align: center;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    border-radius: 120px;
    display: none; /*默认所有的a都不显示*/
    text-decoration: none;
    color: #333;
    transition: all 1s ease;
    box-shadow: 0 0 15px #222;
    font-family: "segoe ui";
    font-weight: 200;
    font-size: 16px;
  }
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
  }
  a.show {
    display: flex !important; /*因为开始设置了a标签为none，这里重置display可以让他显示*/
  }
  /*对所有的li标签加动画效果*/
  .wrapper li {
    -webkit-transform: translate3d(0, 0, 0); /*调用GPU提升动画性能*/
    transform: translate3d(0, 0, 0);
    transition: all 1s ease;
    /*下面的方法好像也可以提升性能，具体并没有比较*/
    /* backface-visibility: hidden;
      perspective: 1000; */
  }
  /*设置选中样式*/
  .selected {
    background: rgba(51, 51, 51, 0.9);
    display: flex;
    /*调整中心圆形的位置*/
    top: calc(50% - 50px);
    left: calc(50% - 60px);
    color: #f1f1f1;
    animation: light 1s infinite;
  }
  /*让当前选中的子集列表显示*/
  .selected + ul > li > a {
    /*让当前选中的子选项显示，因为默认是 display:none*/
    display: flex;
  }
  /*设置 li 的位置，rotate是顺/逆时针旋转，translateX是沿x轴平移*/
  .selected + ul > li:nth-child(1) {
    -webkit-transform: rotate(-120deg) translateX(80px);
    transform: rotate(-120deg) translateX(80px);
  }
  /*设置a标签内字体的位置，应为容器旋转后，字体倾斜了，需要调整回来*/
  /*这里有一个小技巧：字体的旋转角度正好和外部容器的旋转角度相反，但是最后一个的位置需要调整*/
  .selected + ul > li:nth-child(1) > a {
    -webkit-transform: rotate(120deg);
    transform: rotate(120deg);
  }

  .selected + ul > li:nth-child(2) {
    -webkit-transform: rotate(-40deg) translateX(80px);
    transform: rotate(-40deg) translateX(80px);
  }
  .selected + ul > li:nth-child(2) > a {
    -webkit-transform: rotate(40deg);
    transform: rotate(40deg);
  }

  .selected + ul > li:nth-child(3) {
    -webkit-transform: rotate(40deg) translateX(80px);
    transform: rotate(40deg) translateX(80px);
  }
  .selected + ul > li:nth-child(3) > a {
    -webkit-transform: rotate(-40deg);
    transform: rotate(-40deg);
  }

  .selected + ul > li:nth-child(4) {
    -webkit-transform: rotate(120deg) translateX(120px);
    transform: rotate(120deg) translateX(120px);
  }
  .selected + ul > li:nth-child(4) > a {
    -webkit-transform: rotate(-120deg);
    transform: rotate(-120deg);
  }
  .selected + ul > li:nth-child(5) {
    -webkit-transform: rotate(180deg) translateX(120px);
    transform: rotate(180deg) translateX(120px);
  }
  .selected + ul > li:nth-child(5) > a {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
</style>
