<template>
  <div class="login-container">
    <div class="login-box">
      <h2>房屋租赁后台管理系统</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="login-tip">
        <p>提示：当前为演示版本，任意用户名密码即可登录</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const loginFormRef = ref(null)
    const loginForm = ref({
      username: '',
      password: ''
    })

    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
    }

    const handleLogin = () => {
      loginFormRef.value.validate((valid) => {
        if (valid) {
          // 演示版本：直接登录
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('username', loginForm.value.username)
          ElMessage.success('登录成功')
          router.push('/appointments')
        }
      })
    }

    return {
      loginFormRef,
      loginForm,
      rules,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.login-box h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.login-tip {
  margin-top: 20px;
  padding: 10px;
  background-color: #f0f9ff;
  border-radius: 5px;
}

.login-tip p {
  margin: 0;
  font-size: 12px;
  color: #666;
  text-align: center;
}
</style>