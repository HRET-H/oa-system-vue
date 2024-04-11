<script setup>
//引入路由
import { useRouter } from 'vue-router'
// 导入弹窗js
import { closeFullScreen, openFullScreen } from '@/utils/loading'
// 引入pinia的useUserStore方法
import { useUserStore } from '@/stores'
// 获取userStore方法的实例
const userStore = useUserStore()
// 获取route
const route = useRouter()

// 设置axios的baseURL
axios.defaults.baseURL = baseURL

// 初始化登录信息
const form = ref({
  userAccount: '',
  userPassword: ''
})
// 初始化表单校验规则
const rules = ref({
  userAccount: [
    { required: true, message: '请输入账号😣', trigger: 'blur' },
    { min: 5, max: 11, message: '请正确输入账号或手机号🤐', trigger: 'blur' }
  ],
  userPassword: [{ required: true, message: '请输入密码🤕', trigger: 'blur' }]
})

// 获取登录表单的ref引用
const loginFormRef = ref()

// 获取验证码的ref引用
const captchaButtonRef = ref()

// 用户登录方法
const login = () => {
  // 表单校验
  loginFormRef.value.validate((valid) => {
    if (valid && captchaButtonRef.value.disabled) {
      // 开启加载动画
      const loading = openFullScreen()

      // 发送登录请求
      axios
        .post('/user/login', form.value)
        .then((res) => {
          // 查看是否登录成功
          if (res.data.code === 200) {
            // 调用pinia中的用户存储方法存储用户信息
            userStore.setUser(res.data.data)
            // 关闭加载动画
            closeFullScreen(loading)
            // 弹出提示信息
            ElMessage.success('登录成功😍😍😍')
            // 跳转至首页
            route.push('/home')
          } else {
            ElMessage.error('账号或密码错误😥😥😥')
            // 关闭加载动画
            closeFullScreen(loading)
          }
        })
        .catch(() => {
          ElMessage.error('账号或密码错误😥😥😥')
          // 关闭加载动画
          closeFullScreen(loading)
        })
    } else {
      ElMessage({
        message: '请正确填写信息🫥🫥🫥',
        grouping: true,
        type: 'error'
      })
    }
  })
}

// 宽度记录值
const screenWidth = ref(
  window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
)
</script>

<template>
  <div id="login" v-loading.fullscreen.lock="fullscreenLoading">
    <el-row
      style="
        width: 50%;
        height: 600px;
        border-radius: 10px;
        margin: 0 auto;
        position: relative;
        top: 20%;
      "
      v-if="screenWidth >= 768"
    >
      <el-col
        style="background-color: #fff; border-radius: 10px 0 0 10px"
        :span="12"
      >
        <div style="margin: 60px">
          <div>
            <p style="color: #f56692; font-size: 25px">
              欢迎来到OA数字化办公平台
            </p>
            <p style="color: #909399; margin: 20px 0">
              每一次登录都是与你の邂逅。
            </p>
          </div>
          <div>
            <el-form
              ref="loginFormRef"
              :rules="rules"
              :model="form"
              :hide-required-asterisk="true"
            >
              <el-form-item
                label="账号"
                prop="userAccount"
                style="margin-top: 50px"
              >
                <el-input
                  v-model="form.userAccount"
                  placeholder="请输入账号或手机号"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item
                label="密码"
                prop="userPassword"
                style="margin-top: 50px"
              >
                <el-input
                  v-model="form.userPassword"
                  placeholder="请输入密码"
                  show-password
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" style="margin-top: 50px">
                <el-button
                  ref="captchaButtonRef"
                  id="captcha-button"
                  :type="getCaptchaButton.type"
                  :key="getCaptchaButton.text"
                  link
                  :disabled="getCaptchaDisabled"
                  >{{ getCaptchaButton.text }}</el-button
                >
                <span id="captcha-element"></span>
              </el-form-item>
            </el-form>
            <div style="margin-top: 20px; position: relative; top: 60px">
              <el-button
                type="primary"
                style="
                  width: 100%;
                  text-align: center;
                  font-size: 20px;
                  font-family: qiantu, serif;
                "
                @click="login"
                >登 录</el-button
              >
            </div>
          </div>
        </div>
      </el-col>
      <el-col
        style="
          background-color: #f8eff6;
          width: 50%;
          border-radius: 0 10px 10px 0;
        "
        :span="12"
      >
        <el-image
          style="width: 450px; position: absolute; top: -15%; left: 50%"
          src="https://hret0721.oss-cn-beijing.aliyuncs.com/oa-system/login/login.png"
        />
      </el-col>
    </el-row>
    <el-row
      class="g-glossy"
      style="
        height: 77%;
        border-radius: 10px;
        margin: 0 auto;
        position: relative;
        top: 8%;
      "
      v-else
    >
      <div style="margin: 10% 15%">
        <div>
          <p style="color: #f56692; font-size: 25px; text-align: center">
            <span>欢迎来到</span>
            <br />
            <span>OA数字化办公平台</span>
          </p>
          <p style="color: #909399; margin: 20px 0">
            每一次登录都是与你の邂逅。
          </p>
        </div>
        <div>
          <el-form
            ref="loginFormRef"
            :rules="rules"
            :model="form"
            :hide-required-asterisk="true"
          >
            <el-form-item
              label="账号"
              prop="userAccount"
              style="margin-top: 50px"
            >
              <el-input
                v-model="form.userAccount"
                placeholder="请输入账号或手机号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="userPassword"
              style="margin-top: 50px"
            >
              <el-input
                v-model="form.userPassword"
                placeholder="请输入密码"
                show-password
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="验证码" style="margin-top: 50px">
              <el-button
                ref="captchaButtonRef"
                id="captcha-button"
                :type="getCaptchaButton.type"
                :key="getCaptchaButton.text"
                link
                :disabled="getCaptchaDisabled"
                >{{ getCaptchaButton.text }}</el-button
              >
              <span id="captcha-element"></span>
            </el-form-item>
          </el-form>
          <div style="margin-top: 20px; position: relative; top: 20px">
            <el-button
              type="primary"
              style="
                width: 100%;
                text-align: center;
                font-size: 20px;
                font-family: qiantu, serif;
              "
              @click="login"
              >登 录</el-button
            >
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import { baseURL } from '@/utils/request'

export default {
  props: {},
  data() {
    return {
      captcha: null,
      captchaButton: null,
      // 创建验证码验证变量
      captchaValidate: false,
      // 创建验证码按钮状态
      getCaptchaDisabled: false,
      // 创建验证码按钮
      getCaptchaButton: { type: 'info', text: '获取验证码' }
    }
  },
  mounted() {
    this.captchaButton = document.getElementById('captcha-button')

    window.initAliyunCaptcha({
      SceneId: 'w438806i', // 场景ID。根据步骤二新建验证场景后，您可以在验证码场景列表，获取该场景的场景ID
      prefix: '1kb9ox', // 身份标。开通阿里云验证码2.0后，您可以在控制台概览页面的实例基本信息卡片区域，获取身份标
      mode: 'popup', // 验证码模式。popup表示要集成的验证码模式为弹出式。无需修改
      element: '#captcha-element', // 页面上预留的渲染验证码的元素，与原代码中预留的页面元素保持一致。
      button: '#captcha-button', // 触发验证码弹窗的元素。button表示单击登录按钮后，触发captchaVerifyCallback函数。您可以根据实际使用的元素修改element的值
      captchaVerifyCallback: this.captchaVerifyCallback, // 业务请求(带验证码校验)回调函数，无需修改
      onBizResultCallback: this.onBizResultCallback, // 业务请求结果回调函数，无需修改
      getInstance: this.getInstance, // 绑定验证码实例函数，无需修改
      slideStyle: {
        width: 360,
        height: 40
      }, // 滑块验证码样式，支持自定义宽度和高度，单位为px。其中，width最小值为320 px
      language: 'cn' // 验证码语言类型，支持简体中文（cn）、繁体中文（tw）、英文（en）
    })
  },
  beforeUnmount() {
    this.captchaButton = null

    // 必须删除相关元素，否则再次mount多次调用 initAliyunCaptcha 会导致多次回调 captchaVerifyCallback
    document.getElementById('aliyunCaptcha-mask')?.remove()
    document.getElementById('aliyunCaptcha-window-popup')?.remove()
  },
  methods: {
    getInstance(instance) {
      this.captcha = instance
    },
    async captchaVerifyCallback(captchaVerifyParam) {
      try {
        // 1.向后端发起业务请求，获取验证码验证结果和业务结果
        const formData = new FormData()
        formData.append('captchaVerifyParam', captchaVerifyParam)
        const result = await axios.post(baseURL + '/user/getCaptcha', formData)
        // 2.构造标准返回参数
        return {
          captchaResult: result.data.data, // 验证码验证是否通过，boolean类型，必选
          bizResult: true // 业务验证是否通过，boolean类型，可选；若为无业务验证结果的场景，bizResult可以为空
        }
      } catch (error) {
        // 处理错误
        console.error('Captcha verification failed:', error.message)
        alert('网络连接异常，请稍后重试')
        // 返回错误处理结果
        return {
          captchaResult: false,
          bizResult: false
        }
      }
    },
    // 验证通过后调用
    onBizResultCallback() {
      // 将验证码状态置为通过
      this.captchaValidate = true
      // 将验证码按钮置为不可点击
      this.getCaptchaDisabled = true
      // 更改验证码按钮样式和文字
      this.getCaptchaButton = {
        type: 'success',
        text: '验证通过'
      }
    },
    // 弹出验证框，popupId为组件id，用于支持验证通过后继续触发业务逻辑
    popup(popupId) {
      this.popupId = popupId
      this.captchaButton.click()
    }
  }
}
</script>

<style scoped>
#login {
  height: 100vh;
  display: flex;
  background-image: url(https://hret0721.oss-cn-beijing.aliyuncs.com/oa-system/login/loginBackgroud.png);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
.g-glossy {
  position: relative;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(https://hret0721.oss-cn-beijing.aliyuncs.com/oa-system/login/loginBackgroud.png);
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    filter: blur(10px);
    z-index: -1;
  }
}
@font-face {
  font-family: 'qiantu';
  src: url('https://hret0721.oss-cn-beijing.aliyuncs.com/oa-system/login/login.ttf');
}

:deep(.el-input) {
  width: 100% !important;
  height: 35px;
}

:deep(.el-form-item__label) {
  color: #f56692 !important;
}

:deep(.el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.5);
}

.el-button--primary {
  border: 1px solid #f56692;
  background-color: #f56692 !important;
  height: 40px;
}
</style>
