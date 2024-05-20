<template>
  <div
    class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-2 overflow-hidden"
  >
    <Loading :visible="loading" />
    <div class="login">
      <div class="header">
        <h1>用户登录</h1>
      </div>
      <div class="main">
        <p>
          <input type="text" placeholder="用户名" v-model="username" />
        </p>
        <p>
          <input type="password" placeholder="密码" v-model="password" />
        </p>
        <button @click="clickButton">登 录</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/index.js'
import { showModal } from '../utils/modalManager'
import Loading from '../components/Loading.vue'

const router = useRouter()
const loading = ref(false)
const username = ref(null)
const password = ref(null)

onMounted(() => {
  const token = localStorage.getItem('user-token')
  if (token) {
    router.push({ name: 'Visualization' })
  }
})

const clickButton = async () => {
  if (!username.value || !password.value) {
    showModal('请填写用户/密码')
    return
  }
  const data = {
    name: username.value,
    password: password.value
  }

  try {
    loading.value = true
    const result = await api.login(data)
    console.log(result)
    if (result.status === 400) {
      showModal('用户不合法')
      console.log(123)
    } else {
      if (result.is_admin === 1) {
        console.log(123)
        localStorage.setItem('user-token', result.token)
        showModal('欢迎登录')
        router.push({ name: 'Visualization' }) // 跳转到管理员仪表板页面
      } else {
        showModal('非管理员用户')
      }
    }
  } catch (error) {
    showModal('网络错误')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  width: 30000px;
}
.login {
  width: 400px;
  padding-top: 15px;
  margin: 25vh auto 0 auto;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 25px #f4f4f4;
  backdrop-filter: blur(1px);
}
.header {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 15px;
}
.main {
  text-align: center;
}
.main input,
button {
  width: 300px;
  height: 40px;
  border: none;
  outline: none;
  box-sizing: border-box;
  font-size: 15px;
  padding-left: 8px;
  color: #f4f4f4;
  margin-bottom: 15px;
  background-color: none;
}
.main input {
  background-color: rgba(0, 0, 0, 0.25);
}
.main button {
  padding-left: 0;
  background-color: rgba(22, 119, 255, 0.6);
  letter-spacing: 1px;
  font-weight: bold;
  margin-bottom: 40px;
}
.main button:hover {
  background-color: rgba(22, 119, 255);
}
</style>
