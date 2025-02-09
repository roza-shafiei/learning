<script setup>

import TheFooter from '@/components/layouts/TheFooter.vue'
import TheNavbar from '@/components/layouts/TheNavbar.vue'
import { useAuthStore } from '@/store/auth.js'
import { onMounted } from 'vue'

const authStore = useAuthStore()
onMounted(() => {
  authStore.autoLogin()
})
</script>

<template>
  <div class="main-layout">
    <div>
      <TheNavbar />
      <RouterView />
    </div>
    <TheFooter />
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 100vh;
}
</style>
