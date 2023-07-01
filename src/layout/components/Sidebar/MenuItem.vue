<template>
  <el-icon v-if="icon.includes('el-icon')"><component :is="icon.replace(/el-icon-/g, '')" style="width: 1em; height: 1em; margin-right: 8px" /></el-icon>
  <svg-icon v-else :icon="icon"/>
  <span>{{ title }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
