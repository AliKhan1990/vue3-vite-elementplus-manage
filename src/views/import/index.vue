<template>
  <div class="">
    <upload-excel :onSuccess="onSuccess" />
  </div>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS, formatDate } from './utils.js'
import { userBatchImport } from '@/api/user-manage.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const router = useRouter()

/**
 * 数据解析成功之后的回调
 */
const onSuccess = async ({ results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success'
  })
  router.push('/user/manage')
}

/**
 * 筛选数据
 */
const generateData = results => {
  const arr = []
  results.forEach(item => {
    const userInfo = {}
    Object.keys(item).forEach(key => {
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
      } else {
        userInfo[USER_RELATIONS[key]] = item[key]
      }
    })
    arr.push(userInfo)
  })
  return arr
}

</script>、

<style lang="scss" scoped></style>
