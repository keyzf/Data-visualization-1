import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/cockpitPc/login'
    },
    {
      path: '/cockpitPc/index',
      name: 'Index',
      component: resolve => require(['@/components/cockpitPc/cockpitIndex/Index'], resolve)
    },
    {
      path: '/cockpitPc/netDevelop/net-index',
      name: 'netIndex',
      component: resolve => require(['@/components/cockpitPc/netDevelop/netIndex'], resolve),
      meta: {
        title: '卡车之家网络发展大屏1'
      }
    },
    {
      path: '/cockpitPc/netDevelop2/net-index',
      name: 'netIndex2',
      component: resolve => require(['@/components/cockpitPc/netDevelop2/netIndex'], resolve),
      meta: {
        title: '卡车之家网络发展大屏2'
      }
    },
    {
      path: '/cockpitPc/oilData/oilDataIndex',
      name: 'oilDataIndex',
      component: resolve => require(['@/components/cockpitPc/oilData/oilDataIndex'], resolve),
      meta: {
        title: '零售数据分析大屏'
      }
    },
    {
      path: '/cockpitPc/gasoline/gasolineIndex',
      name: 'gasolineIndex',
      component: resolve => require(['@/components/cockpitPc/gasoline/gasolineIndex'], resolve),
      meta: {
        title: '汽油会员数据大屏'
      }
    },
    {
      path: '/cockpitPc/carMembers/carMembersIndex',
      name: 'carMembersIndex',
      component: resolve => require(['@/components/cockpitPc/carMembers/carMembersIndex'], resolve),
      meta: {
        title: '汽油会员分析大屏'
      }
    },
    {
      path: '/cockpitPc/dataAnalysis/data-index',
      name: 'dataIndex',
      component: resolve => require(['@/components/cockpitPc/dataAnalysis/dataIndex'], resolve),
      meta: {
        title: '客户数据分析大屏'
      }
    },
    {
      path: '/cockpitPc/overall/index',
      name: 'overallIndex',
      component: resolve => require(['@/components/cockpitPc/overall/index'], resolve),
      meta: {
        title: '卡车之家数据大屏'
      }
    },

    {
      path: '/cockpitPc/staffRank/index',
      name: 'staffRankIndex',
      component: resolve => require(['@/components/cockpitPc/staffRank/index'], resolve),
      meta: {
        title: '卓越员工排名'
      }
    },
    {
      path: '/cockpitPc/noneOilScreen/index',
      name: 'noneOilScreenIndex',
      component: resolve => require(['@/components/cockpitPc/noneOilScreen/index'], resolve),
      meta: {
        title: '非油品数据分析大屏'
      }
    },
    {
      path: '/cockpitPc/login',
      name: 'login',
      component: resolve => require(['@/components/cockpitPc/common/login'], resolve),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/cockpitPc/trackHomeScreen/index',
      name: 'trackHomeScreenIndex',
      component: resolve => require(['@/components/cockpitPc/trackHomeScreen/index'], resolve),
      meta: {
        title: '卡车之家会员数据大屏'
      }
    },
    {
      path: '/cockpitIpad/loginDiesel',
      name: 'loginDiesel',
      component: resolve => require(['@/components/cockpitIpad/loginDiesel'], resolve)
    },
    {
      path: '/cockpitGasoline/loginGasoline',
      name: 'loginGasoline',
      component: resolve => require(['@/components/cockpitGasoline/loginGasoline'], resolve)
    },
    {
      path: '/cockpitIpad/index',
      name: 'cockpitIpadIndex',
      component: resolve => require(['@/components/cockpitIpad/index'], resolve)
    },
    {
      path: '/cockpitGasoline/index',
      name: 'cockpitGasolineIndex',
      component: resolve => require(['@/components/cockpitGasoline/index'], resolve)
    },
    {
      path: '/dataBoard/index',
      name: 'dataBoardIndex',
      component: resolve => require(['@/components/dataBoard/index'], resolve),
      meta: {
        title: '数据看板-整体看板'
      }
    },
    {
      path: '/cockpitPc/turnoverAnalysis/index',
      name: 'turnoverAnalysisIndex',
      component: resolve => require(['@/components/cockpitPc/turnoverAnalysis/index'], resolve),
      meta: {
        title: '非油品营业额分析大屏'
      }
    },
    {
      path: '/cockpitPc/businessDepartment/index',
      name: 'businessDepartmentIndex',
      component: resolve => require(['@/components/cockpitPc/businessDepartment/index'], resolve),
      meta: {
        title: '经营部核心商品排行榜'
      }
    }, {
      path: '/cockpitPc/coreProduct0/index',
      name: 'coreProduct0Index',
      component: resolve => require(['@/components/cockpitPc/coreProduct0/index'], resolve),
      meta: {
        title: '核心商品动销为零门店'
      }
    }, {
      path: '/cockpitPc/coreProductList/index',
      name: 'coreProductListIndex',
      component: resolve => require(['@/components/cockpitPc/coreProductList/index'], resolve),
      meta: {
        title: '门店核心商品排行'
      }
    }, {
      path: '/cockpitPc/washCarCard/index',
      name: 'washCarCardIndex',
      component: resolve => require(['@/components/cockpitPc/washCarCard/index'], resolve),
      meta: {
        title: '数字化产品客户开发情况'
      }
    }, {
      path: '/cockpitPc/retailData/retailDataIndex',
      name: 'retailDataIndex',
      component: resolve => require(['@/components/cockpitPc/retailData/retailDataIndex'], resolve),
      meta: {
        title: '零售数据分析大屏2'
      }
    }, {
      path: '/cockpitPc/truckHomeData/index',
      name: 'truckHomeDataindex',
      component: resolve => require(['@/components/cockpitPc/truckHomeData/index'], resolve),
      meta: {
        title: '卡车之家数据大屏-2'
      }
    }, {
      path: '/cockpitPc/oilDataCity/oilDataIndex',
      name: 'oilDataCityIndex',
      component: resolve => require(['@/components/cockpitPc/oilDataCity/oilDataIndex'], resolve),
      meta: {
        title: '零售数据分析大屏-可切换地市'
      }
    }, {
      path: '/cockpitPc/noneOilScreenCity/index',
      name: 'noneOilScreenCityIndex',
      component: resolve => require(['@/components/cockpitPc/noneOilScreenCity/index'], resolve),
      meta: {
        title: '非油品数据分析大屏-可切换地市'
      }
    }, {
      path: '/cockpitPc/home/homeIndex',
      name: 'homeIndex',
      component: resolve => require(['@/components/cockpitPc/home/homeIndex'], resolve),
      meta: {
        title: '驾驶舱首页'
      }
    }
  ]
})
