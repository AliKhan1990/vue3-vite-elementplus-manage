<template>
  <div class="login-container">
    <el-form class="login-form"
      ref="loginFromRef"
      :model="loginForm"
      :rules="rules"
      :size="formSize"
      status-icon>
      <!-- 登录页面 -->
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select" effect="light" />
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input :placeholder="$t('msg.login.placehoderName')" name="username" v-model="loginForm.username" type="text" autocomplete="off">
          <template #prefix>
            <el-icon class="el-input__icon"><UserFilled /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <!-- 密码输入 -->
      <el-form-item  prop="password" >
        <el-input :placeholder="$t('msg.login.placehoderPwd')" name="password" :type="secInputType" v-model="loginForm.password" @keyup.enter="handlerLogin" show-password>
          <template #prefix>
            <el-icon class="el-input__icon"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-button type="primary" :loading="loading" @click="handlerLogin">{{ $t('msg.login.loginBtn') }}</el-button>
      <el-button @click="resetForm(loginFromRef)">{{ $t('msg.login.loginResetBtn') }}</el-button>
      <div class="tips" v-html="$t('msg.login.desc')"></div>
  </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import LangSelect from '@/components/LangSelect'

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const i18n = useI18n()
// 登录动作处理
const loading = ref(false)
const loginFromRef = ref<FormInstance>()
const store = useStore()

const formSize = ref('default')

const secInputType = ref('password')

const loginForm = reactive({
  username: '',
  password: ''
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error(i18n.t('msg.login.passwordRule')))
  } else {
    if (loginForm.password !== '') {
      if (!loginFromRef.value) return
      loginFromRef.value.validateField('password', () => null)
    }
    callback()
  }
}

const rules = reactive<FormRules>({
  username: [
    { required: true, message: i18n.t('msg.login.usernameRule'), trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePass, trigger: 'blur' }
  ]
})

const handlerLogin = () => {
  loginFromRef.value.validate(valid => {
    if (!valid) return

    loading.value = true
    store
      .dispatch('user/login', loginForm)
      .then(() => {
        loading.value = false
        // TODO: 登录后操作
        ElMessage({
          message: 'Congrats, this is a success message.',
          type: 'success'
        })
      })
      .catch(err => {
        console.log(err)
        loading.value = false
      })
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .tips {
    font-size: 16px;
    color: #fff;
    line-height: 26px;
    background: rgba(0,0,0,0.5);
    border-radius: 10px;
    margin: 10px 0;
    padding: 10px;
  }
  .lang-select {
    position: absolute;
    top: 0;
    background: rgba(242, 239, 239, 1);
    right: 0;
    border-radius: 10%;
    padding: 3px;
    font-size: 26px;
    color: #fff;
  }
  :deep(.el-input__wrapper) {
    width: 100%;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
