<script setup lang="ts" name="loc-build">
import { ref } from 'vue'
import { openFileDialog, runSh } from '#preload'

const frontEndPath = ref('')
const backEndPath = ref('')
const cmd = ref('')
const cmdRes = ref('')

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

const exec = async () => {
  cmdRes.value = ''
  runSh(cmd.value, '.', (res) => {
    cmdRes.value += res
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
  <div>
    <span>执行命令: </span><el-input v-model="cmd" />
    <el-button @click="exec">
      执行
    </el-button>
    <el-input v-model="cmdRes" type="text" />
  </div>
</template>

<style scoped></style>
