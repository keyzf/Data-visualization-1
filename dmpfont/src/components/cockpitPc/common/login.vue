<template>
  <transition name="fade">
    <div class="wrapers igs-flex igs-flex2 igs-flex8">
      <div class="login">
        <div class="igs-flex igs-flex2 login-wrap">
          <div class="login-wrap-l igs-flex igs-flex3"><img id="user-img" src="static/images/login/username.png"></div>
          <input v-model="userName" type="text" name="" placeholder="请输入账号">
        </div>
        <div class="igs-flex igs-flex2 login-wrap">
          <div class="login-wrap-l igs-flex igs-flex3"><img id="pw-img" src="static/images/login/password.png"></div>
          <input v-model="passWord" type="password" name="" placeholder="请输入密码">
        </div>
        <div class="login-btn" @click="loginCheck">登录</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'login',
  props: {
    value: { // 数值
      // type: String,
      default: '0'
    }
  },
  data () {
    return {
      userName: '',
      passWord: '',
      timestrKey: '' // 时间戳和Key
    }
  },
  created () {
    window.document.title = '登录'
    this.getTimestreKey()
  },
  methods: {
    // 获取RSA公钥
    getTimestreKey () {
      this.$http.post('/webapi/bdview/generateBase64PublicKey').then(res => {
        console.log(res)
        if (res.result === true) {
          this.timestrKey = res.data
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    },
    loginCheck () {
      if (!this.userName) {
        this.$dialog.toast({mes: '请输入账号', timeout: 2000})
      } else if (!this.passWord) {
        this.$dialog.toast({mes: '请输入密码', timeout: 2000})
      } else {
        this.login()
      }
    },
    // 点击登录
    login () {
      this.$dialog.loading.open('登录中')
      this.$http.post('/webapi/bdview/bsUserLogin ', {
        username: this.$getRsaCode(this.timestrKey.key, this.userName),
        password: this.$getRsaCode(this.timestrKey.key, this.passWord),
        timestr: this.timestrKey.timest
      }).then(res => {
        this.$dialog.loading.close()
        if (res.result === true) {
          this.$util.set('bs_accode_token', res.accode, res.actimes)
          // this.$util.getValue('bs_accode_token')// 获取cookie
          this.$store.state.isLogin = true
          this.$router.push({path: '/cockpitPc/home/homeIndex'})
        } else {
          this.$dialog.alert({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
      // 测试模拟
      // setTimeout(() => {
      //   this.$dialog.loading.close()
      //   this.$store.state.isLogin = true
      //   this.$router.go(-1)
      // }, 2000)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../assets/css/mixin.styl'
  .wrapers{
    width: 100%
    height: 100vh
    padding: 0
    margin: 0 auto
    background: url("https://img.gdoil.cn/cockpit/static/images/login/login_bg.png") no-repeat
    background-size: 100% 100%
    overflow hidden
    position: absolute
    top: 0
    z-index: 1999
    .login{
      width: vw(604)
      height: vh(626)
      border-radius: vw(20)
      background: rgba(26, 91, 237, 0.1)
      margin-right: vw(126)
      padding: vh(110) vw(46) 0 vw(46)
      .login-wrap{
        width: 100%
        height: vh(70)
        border-radius: vw(10)
        background: #000530
        margin-bottom: vh(36)
        .login-wrap-l{
          width: vw(92)
          height: vh(60)
          border-right: 1px solid rgba(169, 184, 255, 0.1)
          #user-img{
            width: vw(26)
            height: vw(28)
          }
          #pw-img{
            width: vw(23)
            height: vh(30)
          }
        }
        input{
          flex: 1
          height: vh(50)
          color: #ffffff
          font-size: vw(22)
          font-family: Source Han Sans CN
          font-weight: 400
          border: none
          padding-left: vw(30);
        }
        ::-webkit-input-placeholder {
          padding-left: vw(2)
          color: rgba(169,184,255,1)
        }
      }
      .login-btn{
        width: 100%
        line-height: vh(70)
        border-radius: vw(10)
        background: rgba(18, 59, 187, 1)
        font-size: vw(22)
        font-family: Source Han Sans CN
        font-weight: 400
        color: rgba(169,184,255,1)
        text-align: center
        margin-top: vh(135)
      }
      .login-btn:hover{
        cursor: pointer
      }
    }
  }
  /*fade css*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
