/* eslint-disable no-unused-vars */
import Vue from 'vue'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.base.css'
import 'vue-ydui/dist/ydui.px.css'
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell'
import {ScrollTab, ScrollTabPanel} from 'vue-ydui/dist/lib.px/scrolltab'
// 引入模拟商品列表
import {ListTheme, ListItem, ListOther} from 'vue-ydui/dist/lib.px/list'
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.px/dialog'
// 引入网格布局
import {GridsItem, GridsGroup} from 'vue-ydui/dist/lib.px/grids'

import {CitySelect} from 'vue-ydui/dist/lib.px/cityselect'

import {PullRefresh} from 'vue-ydui/dist/lib.px/pullrefresh'

import {Popup} from 'vue-ydui/dist/lib.px/popup'

import {Icons} from 'vue-ydui/dist/lib.px/icons'

import {DateTime} from 'vue-ydui/dist/lib.px/datetime'

Vue.component(PullRefresh.name, PullRefresh)
Vue.component(ScrollTab.name, ScrollTab)
Vue.component(ScrollTabPanel.name, ScrollTabPanel)

// 引入模拟商品列表
Vue.component(ListTheme.name, ListTheme)
Vue.component(ListItem.name, ListItem)
Vue.component(ListOther.name, ListOther)

// 引入网格布局
Vue.component(GridsGroup.name, GridsGroup)
Vue.component(GridsItem.name, GridsItem)

Vue.component(CitySelect.name, CitySelect)
Vue.component(PullRefresh.name, PullRefresh)

Vue.component(Popup.name, Popup)

Vue.component(Icons.name, Icons)

Vue.component(CellGroup.name, CellGroup)
Vue.component(CellItem.name, CellItem)
Vue.component(DateTime.name, DateTime)
Vue.use(YDUI)
