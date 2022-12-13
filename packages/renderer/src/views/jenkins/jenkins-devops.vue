<script setup lang="ts">
import { Devops, login } from '#preload'
import { ref } from 'vue'

const sessionId = ref('')
const crumb = ref('')

let devops:Devops

const loginDevops = () => {
  login().then((e) => {
    devops = e
    sessionId.value = devops.sessionId
    crumb.value = devops.crumb
  })
}

const buildBranch = () => {
  devops.build('qms-platform-build', 'feature/chargReport-v1.0.0')
}


</script>

<template>
  <div>jenkins-devops</div>
  <div>
    <el-button @click="loginDevops">
      登录
    </el-button>
  </div>

  <div>
    <span>当前sessionId: </span><el-input v-model="sessionId" />
  </div>
  <div>
    <span>当前crumb: </span><el-input v-model="crumb" />
  </div>

  <div>
    <el-button @click="buildBranch">
      构建
    </el-button>
  </div>
</template>

<style scoped></style>
