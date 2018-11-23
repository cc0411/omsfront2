<template>
  <div class="login-page">
    <div class="layer bg" id="login"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <h3>Welcome to OMS</h3>
      </div>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
            <el-form-item  prop="username">
              <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                <i slot="prepend" class="fa fa-user-circle-o"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="formLogin.password" placeholder="密码" @keyup.enter.native="submit">
                <i slot="prepend" class="fa fa-keyboard-o"></i>
              </el-input>
            </el-form-item>
            <el-button size="default" @click="submit" type="primary" class="button-login">登录</el-button>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
require('particles.js')
import config from './config/default'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      // 表单
      formLogin: {
        username: '',
        password: '',
      },
      // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
            { min:8,message:"密码必须八位以上",trigger:'blur'}
        ],
      }
    }
  },
  mounted () {
    // 初始化例子插件
    particlesJS('login', config)
  },
  beforeDestroy () {
    // 销毁 particlesJS
    // thanks https://github.com/d2-projects/d2-admin/issues/65
    // ref https://github.com/VincentGarreau/particles.js/issues/63
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS()
      pJSDom = []
    }
  },
  methods: {
    ...mapActions('d2admin/account', [
      'login'
    ]),
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick (user) {
      this.formLogin.username = user.username
      this.formLogin.password = user.password
      this.submit()
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login({
            vm: this,
            username: this.formLogin.username,
            password: this.formLogin.password
          })
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
