<template>
  <!-- 一级 menu 菜单 -->
  <el-menu :unique-opened="true" default-active="2" background-color="#545c64" text-color="#fff"
    active-text-color="#ffd04b">
    <!-- 子集 menu 菜单 -->
    <side-bar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    />
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route-complex'
import SideBarItem from './SideBarItem'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
console.log(JSON.stringify(routes.value))
</script>

<style lang="scss" scoped>
:deep(.el-menu-item), :deep(.el-submenu__title) {
  text-align: left;
}
</style>
