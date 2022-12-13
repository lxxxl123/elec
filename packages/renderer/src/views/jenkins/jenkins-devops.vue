<script setup lang="ts">
import { runExec, login } from '#preload'
import { ref } from 'vue'

const cmd = ref('')
const path = ref('')

const abc = (e: any):void => {
  runExec(cmd.value, path.value, (data) => console.log(data))
}

const loginDevops = () => {
  login()
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
    <span>cmd: </span><el-input v-model="cmd" />
  </div>
  <div>
    <span>path: </span><el-input v-model="path" />
  </div>
  <el-button @click="abc">
    echo
  </el-button>
</template>

<style scoped></style>
