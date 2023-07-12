<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :mode="'vertical'"
    :collapse="!isCollapse"
    :unique-opened="true"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText" router>
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
import { useStore } from 'vuex'

import { filterRouters, generateMenus } from '@/utils/route-complex'
import SideBarItem from './SideBarItem.vue'
const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})

const store = useStore()
const isCollapse = computed(() => {
  return store.getters.sidebarOpened
})
console.log(store.getters.sidebarOpened)
</script>

<style lang="scss" scoped>

</style>
