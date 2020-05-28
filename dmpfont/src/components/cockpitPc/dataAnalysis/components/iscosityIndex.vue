<template>
  <div class="iscosity-wrapper">
    <div v-if="show">
      <div class="item-wrapper">
        <div class="title">{{nameArr[0].city}}</div>
        <div class="content content1">
          <el-progress :text-inside="true" :stroke-width="13" :percentage="(nameArr[0].stickinessIndex / total) * 100" :show-text="false"></el-progress>
          <span>{{nameArr[0].stickinessIndex}}</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">{{nameArr[1].city}}</div>
        <div class="content content2">
          <el-progress :text-inside="true" :stroke-width="13" :percentage="(nameArr[1].stickinessIndex / total) * 100" :show-text="false"></el-progress>
          <span>{{nameArr[1].stickinessIndex}}</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">{{nameArr[2].city}}</div>
        <div class="content content3">
          <el-progress :text-inside="true" :stroke-width="13" :percentage="(nameArr[2].stickinessIndex / total) * 100" :show-text="false"></el-progress>
          <span>{{nameArr[2].stickinessIndex}}</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">{{nameArr[3].city}}</div>
        <div class="content content4">
          <el-progress :text-inside="true" :stroke-width="13" :percentage="(nameArr[3].stickinessIndex / total) * 100" :show-text="false"></el-progress>
          <span>{{nameArr[3].stickinessIndex}}</span>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="title">{{nameArr[4].city}}</div>
        <div class="content content1">
          <el-progress :text-inside="true" :stroke-width="13" :percentage="(nameArr[4].stickinessIndex / total) * 100" :show-text="false"></el-progress>
          <span>{{nameArr[4].stickinessIndex}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Progress } from 'element-ui'
Vue.use(Progress)
export default {
  name: 'iscosityIndex',
  data () {
    return {
      nameArr: [],
      show: false,
      total: 0
    }
  },
  created () {
    this.cityMemberStickinessIndexTop()
  },
  methods: {
    // 当月使用效果分析
    cityMemberStickinessIndexTop () {
      this.show = false
      let that = this
      that.nameArr = []
      that.total = 0
      that.$http.get('/webapi/bdview/customerDataAnalysisBS/cityMemberStickinessIndexTop').then(res => {
        if (res.result) {
          that.nameArr = res.rows
          that.total = that.nameArr[0].stickinessIndex * 2
          this.show = true
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch(function (err) {
        that.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../../assets/css/mixin.styl'
  .iscosity-wrapper {
    height: pxtovh(302)
    width: 100%
    background: url("https://img.gdoil.cn/cockpit/static/images/dataIndex/bg_16.png") no-repeat
    -webkit-background-size: 100%  pxtovh(302)
    background-size: 100%  pxtovh(302)
    padding pxtovh(50) pxtovw(57) pxtovh(0)
    .item-wrapper {
      margin-bottom pxtovh(8)
      .title {
        text-align left
        font-size: pxtovw(12)
        color: #ffffff
        margin-bottom pxtovh(7)
      }
      .content {
        display flex
        /deep/ .el-progress {
          flex 1
          margin-right pxtovw(24)
          .el-progress-bar__outer {
            background-color: #0D1A56
          }
        }
        span {
          font-size: pxtovw(15)
          color: #ffffff
          font-weight:400;
        }
      }
      .content1 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(177,227,98,0.19) 0%,rgba(190,161,53,1) 100%)
        }
      }
      .content2 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(135,74,227,0.19) 0%,rgba(74,106,227,1) 100%)
        }
      }
      .content3 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(60,225,227,0.19) 0%,rgba(60,171,226,1) 100%)
        }
      }
      .content4 {
        display flex
        /deep/ .el-progress-bar__inner {
          background: linear-gradient(90deg,rgba(68,168,129,0.19) 0%,rgba(68,168,129,1) 100%)
        }
      }
    }
  }
</style>
