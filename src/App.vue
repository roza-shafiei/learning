<script setup>

import TheFooter from '@/components/layouts/TheFooter.vue'
import { useAuthStore } from '@/store/auth.js'
import { onMounted } from 'vue'
import TheMobileNavbar from '@/components/layouts/TheMobileNavbar.vue'
import TheNavbar from '@/components/layouts/TheNavbar.vue'
import useWindowResize from '@/composables/useResizeMethod.js'

const { isMdDown } = useWindowResize()
const authStore = useAuthStore()
onMounted(() => {
  authStore.autoLogin()
})
</script>

<template>
  <div class="main-layout">
    <div>
      <TheNavbar v-if="!isMdDown" />
      <TheMobileNavbar v-else />
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
