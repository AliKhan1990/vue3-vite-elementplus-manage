<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
        <!-- 面包屑的最后一项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <span v-else class="redirect" @click="onClickLink(item.path)">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()

// 生成面包屑数据
const breadcrumbData = ref([])
const getBreadCrumbDate = () => {
  breadcrumbData.value = route.matched.filter(item => item.meta && item.meta.title)
  console.log(breadcrumbData.value)
}
const onClickLink = (path) => {
  router.push(path)
}

watch(route, () => {
  getBreadCrumbDate()
}, {
  immediate: true
})

const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;
    &:hover {
      color: v-bind(linkHoverColor);
      cursor: pointer;
    }
  }
  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
