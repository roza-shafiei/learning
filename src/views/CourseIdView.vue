<script setup>
import { onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteUpdate((to) => {
  console.log(to)
})

</script>

<template>
  <main>
    {{ courseId }}
  </main>
</template>

<style lang="scss" scoped>

</style>
