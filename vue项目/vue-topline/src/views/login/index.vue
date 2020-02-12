<template>
    <div class="login-container">
      <div class="login-box">
        <div class="box-trans">
          <!--图片logo-->
          <img src="./logo_index.png" alt="" />
          <!--组件中的 属性绑定 和 v-model 必须要有对应的data成员支持配合-->
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
            <el-form-item prop="mobile">
              <el-input v-model="loginForm.mobile" placeholder="请输入手机号码">
                <i slot="prefix" class="iconfont icon-mobile"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input v-model="loginForm.code" placeholder="请输入验证码">
                <i slot="prefix" class="iconfont icon-yanzhengma"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="xieyi">
              <el-checkbox v-model="loginForm.xieyi"></el-checkbox>
              <span>我已阅读并同意用户协议和隐私条款</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-loading="btnLoading" style="width:100%;" @click="login()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
// 引入gt.js文件
import '@/assets/js/gt.js'
// 引入iconfont图标库css文件
import '@/assets/font/iconfont.css'

export default {

  methods: {
    // 管理员登录系统
    login () {
      // this:VueComponent对象，本身有继承Vue对象
      // this可以访问本身组件的成员(data/methods)
      // 对当前el-form表单进行校验
      this.$refs.loginFormRef.validate(valid => {
        // valid：true  校验成功
        // valid: false 校验失败
        if (valid) {
          // 判断之前有生成过窗口，就直接打开
          if (this.catpchaObject) {
            return this.catpchaObject.verify()
          }
          this.btnLoading = true // 按钮等待效果
          // 人机交互验证
          // 1) 获得验证的秘钥信息
          let pro = this.$http.get(`/captchas/${this.loginForm.mobile}`)
          pro
            .then((result) => {
              // console.log(result)
              // 从result中把相关的信息解构出来
              let { data } = result.data
              // 显示人机窗口
              // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
              window.initGeetest({
                // 以下配置参数来自服务端 SDK
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success,
                new_captcha: true,
                product: 'bind' // 隐藏"人机按钮"
              }, captchaObj => {
                // 这里可以调用验证实例 captchaObj 的实例方法
                captchaObj.onReady(() => {
                  // 验证码ready之后才能调用verify方法“显示验证码”
                  captchaObj.verify() // 显示验证码
                  this.btnLoading = false // 按钮正常了
                  // 把生成好的窗口对象赋予给captchaObject成员
                  this.catpchaObject = captchaObj
                }).onSuccess(() => {
                  // 人机验证成功
                  // 验证账号登录系统
                  this.loginAct()
                }).onError(() => {
                  // 人机验证失败
                })
              })
            })
            .catch((err) => {
              return this.$message.error('获得人机验证码失败！' + err)
            })

          // 真正登录动作
          // this.loginAct()
        }
      })
    },

    // 校验账号正确，存储token等信息，登录后台系统
    loginAct () {
      // 利用axios带着当前的账号跑到服务器端做真实性校验
      // axios调用任何方法做请求，返回的结果都是"Promise对象"，这样就可以继续调用then、catch方法了
      var pro = this.$http.post('/authorizations', this.loginForm)
      pro
        .then((result) => {
          // 账号校验成功后，会把当前账号的许多信息给我们返回
          // console.log(result) // id  name  photo  token等
          var { name, token, photo } = result.data.data // 对象解构赋值
          window.sessionStorage.setItem('token', token)

          // 借助vuex实现数据的存储(更新)
          // console.log(this)
          // this.$store.commit(mutations的方法，参数)
          this.$store.commit('upName', name)
          this.$store.commit('upPhoto', photo)
          // window.sessionStorage.setItem('name', name)
          // window.sessionStorage.setItem('photo', photo)
          // // 路由编程导航
          this.$router.push({ name: 'home' })
        })
        .catch((err) => {
          // 错误提示(用户名或密码错误)
          return this.$message.error('用户名或密码错误！' + err)
        })
    }

  },
  data () {
    var checkMobile = function (rule, value, callback) {
      // value:被校验的数据
      // callback：回调函数，无论校验成功与否，该函数都需要调用
      // 通过正则校验手机号码
      // 数字、11位、1开头、第2位是3/5/6/7/8/9
      var reg = /^1[356789]\d{9}$/
      // 校验
      if (!reg.test(value)) {
        // 失败
        return callback(new Error('手机号码格式不正确！'))
      }
      callback()
    }
    var checkXieyi = function (rule, value, callback) {
      if (Number(value) === 0) {
        // 没有勾选协议，就报错
        return callback(new Error('请遵守协议！'))
      }
      callback()
    }
    return {
      // 保存生成好的人机窗口对象
      catpchaObject: null,
      // 登录按钮等待设置
      btnLoading: false,
      // 表单数据对象
      loginForm: {
        mobile: '13844145535',
        code: '246810',
        xieyi: true
      },
      loginFormRules: {
        // 校验名称(来自表单对象的成员名字)
        mobile: [
          // 具体校验规则
          // { required: true必填, message: 校验错误提示, trigger: 校验触发机制blur / change }
          { required: true, message: '手机号码必填', trigger: 'blur' },
          // 制作第2个校验规则，并且是自定义的
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '校验码必填', trigger: 'blur' }
        ],
        xieyi: [
          // 布尔值 需要通过自定义方式实现校验
          { validator: checkXieyi }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  height:100%;
  background-color: gray;
  background-image: url('./login_bg.jpg');
  background-size:cover;
  display:flex;
  justify-content: center;
  align-items: center;
  .login-box{
    width:410px;
    height:345px;
    background-color: #fff;
    display:flex;
    justify-content: center;
    .el-form{
      width:100%;
    }
    .box-trans{
      width:75%;
      text-align:center;
      img{
        width:60%;
        margin:20px 0;
      }
    }
  }
}
</style>
