<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      check-strictly
      node-key="id"
      default-expand-all
      :props="defaultProps"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { permissionList } from '@/api/permissionList'
import { watchSwitchLang } from '@/utils/i18n'
import { rolePermission, distributePermission } from '@/api/role'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const i18n = useI18n()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})

// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// tree 节点
const treeRef = ref(null)

const emits = defineEmits(['update:modelValue'])

// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  allPermission.value = await permissionList()
}

/**
  确定按钮点击事件
 */
const onConfirm = async () => {
  closed()
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

// 获取当前用户角色的权限
const getRolePermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}

watch(
  () => props.roleId,
  val => {
    if (val) getRolePermission()
  }
)

getPermissionList()
watchSwitchLang(getPermissionList)
</script>
