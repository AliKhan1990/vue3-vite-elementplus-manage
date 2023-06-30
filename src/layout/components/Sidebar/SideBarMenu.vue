<template>
  <!-- 一级 menu 菜单 -->
  <el-menu :unique-opened="true"
    router
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText">
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
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route-complex'
import SideBarItem from './SideBarItem'

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
console.log(JSON.stringify(routes.value))

const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  console.log(path)
  return path
})
</script>

<style lang="scss" scoped>
:deep(.el-menu-item), :deep(.el-submenu__title) {
  text-align: left;
}
</style>
