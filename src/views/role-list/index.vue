<template>
  <div class="roles-list">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column :label="$t('msg.role.index')" type="index" width="120" />
        <el-table-column :label="$t('msg.role.name')" prop="title" />
        <el-table-column :label="$t('msg.role.desc')" prop="describe" />
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
        >
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onDistributePermissionClick(row)">
              {{ $t('msg.role.assignPermissions') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission v-model="distributePermissionVisible" :roleId="selectRoleId" />
  </div>
</template>

<script setup>
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'
import DistributePermission from './components/DistributePermission.vue'

const allRoles = ref([])
const selectRoleId = ref('')

const distributePermissionVisible = ref(false)

const getRoleList = async () => {
  allRoles.value = await roleList()
}

// 分配权限
const onDistributePermissionClick = row => {
  selectRoleId.value = row.id
  distributePermissionVisible.value = true
}

getRoleList()
watchSwitchLang(getRoleList)
</script>

<style lang="scss" scoped></style>
