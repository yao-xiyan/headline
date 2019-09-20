<template>
  <div class="login">
    <!-- 使用card 卡片 -->
    <el-card class="login-card">
      <!-- 匿名插槽 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 使用Form表单 => el-from包裹 -->
      <!-- 使用Form表单的校验组件 -->
      <!-- 数据校验 =>1、 el-form绑定 model,2、el-form绑定数据rules校验规则 3、el-form-item prop属性绑定属性  -->
      <el-form ref="myFrom" :model="loginForm" :rules="loginRules" style="margin-top:20px">
        <!-- form-item  prop属性 绑定 下面表单组件的字段名 -->
        <el-form-item prop="mobile">
          <!-- 手机号 绑定 v-model -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 验证码 -->
          <el-input v-model="loginForm.code" style="width:65%;float:left"  placeholder="请输入验证码"></el-input>
          <!-- 发送验证码 -->
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <!-- 同意选项（复选框） -->
          <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <!-- 登录按钮 -->
          <!-- 注册点击事件 -->
          <el-button @click="login" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      value ? callBack() : callBack(new Error('您必须同意无条件被我们蒙骗'))
    }
    return {
      // 表单数据 是一个对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: true // 是否同意协议
      },
      // 登录规则集合对象
      loginRules: {
        // 决定着校验规则 ley(字段名):value(对象数组) => 一个对象就是一个校验规则
        // required 为 true 就表示该字段必填 如果不填 就会提示消息
        // required 只校验null 和 undefined
        // 手机号校验规则
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        // 验证码校验规则
        code: [{ required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数' }],
        // rule 当前校验规则  当前校验的值
        // value 当前表单项的值
        // callback 回调函数
        agree: [{ validator: validator }]
        // validator (rule, value, callBack) {
        // if (value) {
        //   // 正确 勾选了协议
        //   callBack() // 一切OK
        // } else {
        //   // 错误 取消了协议
        //   callBack(new Error('您必须同意无条件被我们蒙骗'))
        // }
      }
    }
  },
  methods: {
    login () {
      // validate 是一个方法 校验整个表单的规则
      // 传入的是一个函数，两个校验参数(是否校验成功,未校验成功的字段)
      this.$refs.myFrom.validate((isOK) => {
        if (isOK) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.loginForm
          }).then(result => {
            // 将后台返回的token令牌存到储到前端缓存中
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('/home') // 跳转到路径为/home的页面
          }).catch(() => {
            // 提示信息
            this.$message({
              type: 'warning',
              message: '您的手机号或者验证码错误'
            })
          })
        }
      })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
// lang style 标签的属性
// 如果要再组件样式中写less 就要给style一个lang属性 lang="less"
// 如果加了scoped属性
// 解决使用相同选择器 会在login后面加上[data-v-] 只会在当前页面有效
.login {
  // background-image: url('../../assets/img/login_bg.jpg');
  background-image: url("../../assets/img/a02.jpg");
  height: 100vh;
  background-size: cover;
  color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
    .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
