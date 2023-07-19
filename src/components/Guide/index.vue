<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script setup>
import steps from './steps.js'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

let driver = null

const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}

onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})
</script>

<style scoped></style>
