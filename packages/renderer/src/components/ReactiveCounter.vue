<script lang="ts" setup>
import { useCounterStore } from '/@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <button @click="counter.increment()">
    count is: {{ counter.count }}
  </button>
  <br><br>
  <code>packages/renderer/src/components/ReactiveCounter.vue</code>
</template>
