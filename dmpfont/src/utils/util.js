/**
 * Created by houpintan on 2020/3/17.
 */

var util = {
  // 判断是否为闰月
  isLeapYear (year) {
    if (year % 100 === 0 && year % 400 === 0) {
      return true
    } else if (year % 100 !== 0 && year % 4 === 0) {
      return true
    }
    return false
  },
  // 获取某月多少天
  getDaysOfMonth (isLeapYear, month) {
    let days = 0
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        days = 31
        break
      case 4:
      case 6:
      case 9:
      case 11:
        days = 30
        break
      case 2:
        if (isLeapYear) {
          days = 29
        } else {
          days = 28
        }
    }
    return days
  },
  // 获取当月月份
  getMonth () {
    let date = new Date()
    return date.getMonth() + 1
  },
  // 获取当天是几号
  getDate () {
    let date = new Date()
    return date.getDate()
  },
  // 获取最近几个月份
  getNearMonth (num) {
    let listMonth = []
    for (var i = 0; i < num; i++) {
      let month = this.getMonth() - i
      listMonth.push(this.checkMonth(month))
    }
    return listMonth
  },
  checkMonth (month) {
    let newMonth = 0
    let date = new Date()
    let fullYear = date.getFullYear()
    switch (month) {
      case 12:
        newMonth = fullYear + '/12'
        break
      case 11:
        newMonth = fullYear + '/11'
        break
      case 10:
        newMonth = fullYear + '/10'
        break
      case 9:
        newMonth = fullYear + '/09'
        break
      case 8:
        newMonth = fullYear + '/08'
        break
      case 7:
        newMonth = fullYear + '/07'
        break
      case 6:
        newMonth = fullYear + '/06'
        break
      case 5:
        newMonth = fullYear + '/05'
        break
      case 4:
        newMonth = fullYear + '/04'
        break
      case 3:
        newMonth = fullYear + '/03'
        break
      case 2:
        newMonth = fullYear + '/02'
        break
      case 1:
        newMonth = fullYear + '/01'
        break
      case 0:
        newMonth = fullYear - 1 + '/12'
        break
      case -1:
        newMonth = fullYear - 1 + '/11'
        break
      case -2:
        newMonth = fullYear - 1 + '/10'
        break
      case -3:
        newMonth = fullYear - 1 + '/09'
        break
      case -4:
        newMonth = fullYear - 1 + '/08'
        break
      case -5:
        newMonth = fullYear - 1 + '/07'
        break
    }
    return newMonth
  },
  // 最多就七位数 万以内的就用个位数，十万以内保留两位位小数点，十万到一百万保留一位小数点，百万以上保留整数
  // 处理数据带万
  fixedamount (val) {
    if (val > 0) {
      if (val < 10000) {
        return Math.round(Number(val))
      } else if (val >= 10000 && val < 100000) {
        return Number(val / 10000).toFixed(2) + '万'
      } else if (val >= 100000 && val < 1000000) {
        return Number(val / 10000).toFixed(1) + '万'
      } else if (val >= 1000000) {
        return Number(val / 10000).toFixed(0) + '万'
      }
    } else {
      var num = Math.abs(val)
      if (num < 10000) {
        return Math.round(Number(val))
      } else if (num >= 10000 && num < 100000) {
        return Number(val / 10000).toFixed(2) + '万'
      } else if (num >= 100000 && num < 1000000) {
        return Number(val / 10000).toFixed(1) + '万'
      } else if (num >= 1000000) {
        return Number(val / 10000).toFixed(0) + '万'
      }
    }
  },
  // 处理数字
  funNum (val) {
    if (val > 0) {
      if (val < 10000) {
        return Math.round(Number(val))
      } else if (val >= 10000 && val < 100000) {
        return Number(val / 10000).toFixed(2)
      } else if (val >= 100000 && val < 1000000) {
        return Number(val / 10000).toFixed(1)
      } else if (val >= 1000000) {
        return Number(val / 10000).toFixed(0)
      }
    } else {
      var num = Math.abs(val)
      if (num < 10000) {
        return Math.round(Number(val))
      } else if (num >= 10000 && num < 100000) {
        return Number(val / 10000).toFixed(2)
      } else if (num >= 100000 && num < 1000000) {
        return Number(val / 10000).toFixed(1)
      } else if (num >= 1000000) {
        return Number(val / 10000).toFixed(0)
      }
    }
  },
  // 处理数字正数加“+"号
  funNum1 (val) {
    if (val > 0) {
      if (val < 10000) {
        return '+' + Math.round(Number(val))
      } else if (val >= 10000 && val < 100000) {
        return '+' + Number(val / 10000).toFixed(2)
      } else if (val >= 100000 && val < 1000000) {
        return '+' + Number(val / 10000).toFixed(1)
      } else if (val >= 1000000) {
        return '+' + Number(val / 10000).toFixed(0)
      }
    } else {
      var num = Math.abs(val)
      if (num < 10000) {
        return Math.round(Number(val))
      } else if (num >= 10000 && num < 100000) {
        return Number(val / 10000).toFixed(2)
      } else if (num >= 100000 && num < 1000000) {
        return Number(val / 10000).toFixed(1)
      } else if (num >= 1000000) {
        return Number(val / 10000).toFixed(0)
      }
    }
  },
  // 普通数处理，保留两位小数点如果大于0加加号
  fixedFunc2 (val) {
    if (val > 0) {
      var str = '+' + parseFloat(Number(val).toFixed(2))
    } else {
      str = parseFloat(Number(val).toFixed(2))
    }
    return str
  },
  // 处理单位
  funUnit (val) {
    if (val > 0) {
      if (val < 10000) {
        return ''
      } else if (val >= 10000 && val < 100000) {
        return '万'
      } else if (val >= 100000 && val < 1000000) {
        return '万'
      } else if (val >= 1000000) {
        return '万'
      }
    } else if (Number(val) === 0) {
      return ''
    } else {
      var num = Math.abs(val)
      if (num < 10000) {
        return Math.round(Number(val))
      } else if (num >= 10000 && num < 100000) {
        return '万'
      } else if (num >= 100000 && num < 1000000) {
        return '万'
      } else if (num >= 1000000) {
        return '万'
      }
    }
  },
  // 以万为单位小数点处理，0-10万保留两位小数点，10万-100万保留一位小数点，100万以上取整数
  fixedFunc (val) {
    if (val < 10) {
      return parseFloat(Number(val).toFixed(2))
    } else if (val > 10 && val < 100) {
      return Number(val).toFixed(1)
    } else {
      return Math.round(val) // 四舍五入取整
    }
  },
  // 普通数处理
  fixedFunc1 (val, type) { // type 保留几位小数，默认两位
    if (!type || type === '' || type === null) {
      type = 2
    }
    return parseFloat(Number(val).toFixed(type))
  },
  set: function (name, value, days) {
    // window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
    var d = new Date()
    d.setTime(d.getTime() + 1000 * days)
    window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
  },
  getValue: function (name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return v ? v[2] : false
  },
  delete: function (name) {
    this.set(name, '', -1)
  }
}
export default util
