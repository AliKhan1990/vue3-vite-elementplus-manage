<template>
  <div class="">
    <upload-excel :onSuccess="onSuccess" />
  </div>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'

/**
 * 数据解析成功之后的回调
 */
const onSuccess = excelData => {
  console.log(excelData)
}
</script>、

<style lang="scss" scoped></style>
