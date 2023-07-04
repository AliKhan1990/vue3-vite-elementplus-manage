<template>
  <div class="sidebar-container">
    <div :class="['avatar-container', $store.getters.sidebarOpened ? 'scale-up' : 'scale-down']">
      <el-avatar :size="$store.getters.sidebarOpened ? 'default' : 'small'" shape="square" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <p class="username" v-if="$store.getters.sidebarOpened">{{$store.getters.userInfo.username }}</p>
    </div>
    <el-scrollbar>
      <side-bar-menu />
    </el-scrollbar>
  </div>
</template>

<script setup>
import SideBarMenu from './SideBarMenu'
// import variables from '@/styles/variables.module.scss'
const logoHeight = '44px'
</script>

<style lang="scss" scoped>
.username {
  color: white;
}
.avatar-container {
  padding-top: 15px;
}
.logo-container {
  height: v-bind(logoHeight);
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
