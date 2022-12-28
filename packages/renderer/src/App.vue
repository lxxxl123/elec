<script lang="ts" setup>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'


</script>

<template>
  <el-container style="height: auto">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu default-active="1" router>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>Navigator One
            </template>
            <el-menu-item index="/loc-build">
              打包
            </el-menu-item>
            <el-menu-item index="/jenkins-devops">
              自动部署
            </el-menu-item>
            <el-menu-item index="/axios">
              Terminal
            </el-menu-item>
            <el-sub-menu index="1-4">
              <template #title>
                Option4
              </template>
              <el-menu-item index="1-4-1">
                Option 4-1
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Navigator Two
            </template>
            <el-sub-menu index="2-4">
              <template #title>
                Option 4
              </template>
              <el-menu-item index="2-4-1">
                Option 4-1
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
</style>
