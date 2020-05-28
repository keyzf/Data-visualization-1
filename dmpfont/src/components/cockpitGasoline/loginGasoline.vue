<template>
  <div class="loginDiesel">
    <div class="login_box">
      <div class="input_box">
        <input class="inputs" v-model="userName" v-on:input="inputUserName"  ref="inputusername" type="text" placeholder="请输入用户名">
      </div>
      <div class="input_box">
        <input class="inputs" v-model="passWord"  v-on:input="inputPwd" ref="inputPwd" type="passWord" placeholder="请输入密码">
      </div>
      <div class="box_btn">
         <button :class="loginStatus ? 'loginBg' : ''" :disabled="!loginStatus" @click="login">登录</button>
      </div>
      <div class="login_bottom"></div>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
export default {
  name: 'loginDiesel',
  data () {
    return {
      userName: '',
      passWord: '',
      loginStatus: false
    }
  },
  mounted () {
    window.document.title = '登录'
  },
  methods: {
    // 输入银行卡号改变按钮可用禁用状态
    inputUserName () {
      let username = this.$refs.inputusername.value
      let passWord = this.$refs.inputPwd.value
      if (username !== '' && passWord !== '') {
        this.loginStatus = true
      } else {
        this.loginStatus = false
      }
    },
    // 输入验证码改变按钮可用禁用状态
    inputPwd () {
      let username = this.$refs.inputusername.value
      let passWord = this.$refs.inputPwd.value
      if (username !== '' && passWord !== '') {
        this.loginStatus = true
      } else {
        this.loginStatus = false
      }
    },
    login () {
      console.log(this.userName, this.passWord)
      var password = md5(this.passWord).toUpperCase()
      this.$dialog.loading.open('登录中')
      this.$http.post('/webapi/bdview/mobile/userLogin', {
        username: this.userName,
        password: password
      }).then(res => {
        this.$dialog.loading.close()
        console.log(res)
        if (res.result === true) {
          this.$util.set('wxaccode', res.accode, res.actimes)
          this.$router.push({
            name: 'cockpitGasolineIndex'
          })
        } else {
          this.$dialog.toast({mes: res.msg, timeout: 1800})
        }
      }).catch((err) => {
        this.$dialog.loading.close()
        this.$dialog.toast({mes: '系统繁忙，请稍后再试', timeout: 1800})
        console.log(err)
      })
    }
  },
  components: {

  }
}
</script>
<style lang="stylus" scoped>
@media screen and (min-width: 415px) {
  .loginDiesel{
    background #fff;
    height:100%;
    position:relative;
    input::placeholder {
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(205,203,203,1);
      text-align :center;
    }
    .login_box{
      width:40%;
      margin:0 auto;
      padding-top:200px;
    .input_box{
        border-radius:25px
        margin-top:15px;
        padding:15px 0;
        background:rgba(245,246,247,1);
      }
      .inputs{
        display:block;
        width:100%;
        line-height 20px;
        font-size:14px;
        color:rgba(76,73,72,1);
        border:0 none;
        background:rgba(245,246,247,1);
        padding:0 15px;
        text-align:center;
      }
      .box_btn{
        padding:0 30px;
        button{
          width:100%;
          margin:0 auto;
          height:45px;
          background:#D1DDE3;
          color:#fff;
          font-size:14px;
          line-height :45px;
          border:0 none;
          border-radius:23px;
          margin-top:27px;
          &.loginBg{
            background:#7634FF;
          }
        }
      }
      .login_bottom{
        width:100%;
        height:75px;
        background: url("https://img.gdoil.cn/cockpit/static/images/login_ipad.png") no-repeat;
        background-size:100% 100%;
        position:absolute;
        left:0;
        bottom:0;
      }

    }
  }
}
 @media screen and (max-width: 414px) {
  .loginDiesel{
    background #fff;
    height:100%;
    input::placeholder {
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(205,203,203,1);
      text-align :center;
    }
    .login_box{
      width:80%;
      margin:0 auto;
      padding-top:200px;
      .input_box{
        border-radius:20px
        margin-top:15px;
        padding:10px 0;
        background:rgba(245,246,247,1);
      }
      .inputs{
        display:block;
        width:100%;
        line-height:20px;
        font-size:14px;
        color:rgba(76,73,72,1);
        border:0 none;
        background:rgba(245,246,247,1);
        border-radius:26px
        padding:0 15px;
        text-align:center;
      }
      .box_btn{
        padding:0 40px;
        button{
          width:100%;
          margin:0 auto;
          height:40px;
          background:#D1DDE3;
          color:#fff;
          font-size:14px;
          line-height :40px;
          border:0 none;
          border-radius:26px;
          margin-top:27px;
          &.loginBg{
            background:#7634FF;
          }
        }
      }
     .login_bottom{
        width:100%;
        height:56px;
        background: url("https://img.gdoil.cn/cockpit/static/images/login_bg.png") no-repeat;
        background-size:100% 100%;
        position:absolute;
        left:0;
        bottom:0;
      }
    }
  }
 }
</style>
