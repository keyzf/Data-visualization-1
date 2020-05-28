<template>
  <div class="average-perday">
    <div class="content-wrapper">
      <ul class="model-header">
        <li class="priject">项目</li>
        <li class="yesterday">昨天</li>
        <li class="the-day">当日</li>
        <li class="the-month">当月</li>
        <li class="daily-sail li-flex">同期日均销量</li>
        <li class="add-decrease li-flex">昨日同比增减幅</li>
        <li class="ranking">全省排名</li>
      </ul>
      <ul>
        <li class="priject">合计</li>
        <li class="yesterday">3.45吨</li>
        <li class="the-day">3.45吨</li>
        <li class="the-month">3.45吨</li>
        <li class="daily-sail li-flex">3.45吨</li>
        <li class="add-decrease li-flex">3.45吨</li>
        <li class="ranking">3.45吨</li>
      </ul>
      <ul class="gasoil-item">
        <li class="priject gasoil">汽油</li>
        <li class="yesterday">2.43吨</li>
        <li class="the-day">2.43吨</li>
        <li class="the-month">2.43吨</li>
        <li class="daily-sail li-flex">2.43吨</li>
        <li class="add-decrease li-flex">2.43吨</li>
        <li class="ranking">2.43吨</li>
      </ul>
      <ul class="diesel-item">
        <li class="priject dieseloil">柴油</li>
        <li class="yesterday">1.02吨</li>
        <li class="the-day">1.02吨</li>
        <li class="the-month">1.02吨</li>
        <li class="daily-sail li-flex">1.02吨</li>
        <li class="add-decrease li-flex">1.02吨</li>
        <li class="ranking">1.02吨</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AveragePerday'
}
</script>

<style scoped lang="stylus">
  @import '../../../../../assets/css/mixin.styl'
  .average-perday {
    height: vh(201)
    width: vw(780)
    margin-right vw(15)
    background: url("../../../../../../static/images/retail/average-perday.png") no-repeat
    -webkit-background-size: 100% vh(201)
    background-size: 100% vh(201)
    padding vh(40) vw(29) vh(20)
    .content-wrapper {
      ul {
        display flex
        height vh(32)
        li {
          width: 10%
          text-align center
          font-size: vw(16)
          color: #ffffff
        }
        .li-flex {
          flex 1
        }
        .gasoil {
          color: #368a3c
        }
        .dieseloil {
          color: #1872cc
        }
      }
      .model-header {
        li {
          color: #5c74d1
        }
      }
      .gasoil-item {
        margin vh(6) 0
        background:rgba(20,43,44,0.5);
        border-radius:15px;
      }
      .diesel-item {
        background:rgba(10,27,79,0.5);
        border-radius:15px;
      }
    }
  }
</style>
