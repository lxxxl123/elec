<script lang="ts" setup>
import { useCounterStore } from '/@/stores/counter'

const couner = useCounterStore()
</script>

<template>
  <button @click="couner.increment()">
    count is: {{ couner.count }}
  </button>
  <br><br>
  <code>packages/renderer/src/components/ReactiveCounter.vue</code>
</template>
