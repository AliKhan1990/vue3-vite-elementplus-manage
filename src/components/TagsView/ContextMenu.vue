<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      {{ $t('msg.tagsView.refresh') }}
    </li>
    <li v-if="props.tagsLength - 1 !== props.index" @click="onCloseRightClick">
      {{ $t('msg.tagsView.closeRight') }}
    </li>
    <li v-if="props.index !== 0" @click="onCloseLeftsClick">
      {{ $t('msg.tagsView.closeLefts') }}
    </li>
    <li v-if="props.tagsLength !== 1" @click="onCloseOtherClick">
      {{ $t('msg.tagsView.closeOther') }}
    </li>
  </ul>
</template>

<script setup>
import { defineProps, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  tagsLength: {
    type: Number,
    required: true
  }
})

watch(props.index, () => {
  console.log(props.index)
}, {
  immediate: true
})

onMounted(() => {
  console.log(props.index, props.tagsLength)
})

const onRefreshClick = () => {
  router.go(0)
}

const onCloseRightClick = () => {
  store.commit('app/removeTagsView', {
    type: 'right',
    index: props.index
  })
}

const onCloseOtherClick = () => {
  store.commit('app/removeTagsView', {
    type: 'other',
    index: props.index
  })
}

const onCloseLeftsClick = () => {
  store.commit('app/removeTagsView', {
    type: 'left',
    index: props.index
  })
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
}
</style>
