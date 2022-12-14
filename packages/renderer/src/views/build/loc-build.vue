<script setup lang="ts" name="loc-build">
import { ref } from 'vue'
import { openFileDialog } from '#preload'

const frontEndPath = ref('')
const backEndPath = ref('')

const openFront = async () => {
  frontEndPath.value = await openFileDialog({
    title: '选择文件'
  })
}

const openBack = async () => {
  backEndPath.value = await openFileDialog({
    title: '选择文件'
  })
}


const build = () => {
}

</script>

<template>
  <div>jenkins-devops</div>
  <div>
    <el-button @click="build">
      打包
    </el-button>
  </div>

  <div>
    <span>前端目录: </span><el-input v-model="frontEndPath" readonly />
    <el-button @click="openFront">
      浏览
    </el-button>
  </div>
  <div>
    <span>后端目录: </span><el-input v-model="backEndPath" readonly />
    <el-button @click="openBack">
      浏览
    </el-button>
  </div>
</template>

<style scoped></style>
