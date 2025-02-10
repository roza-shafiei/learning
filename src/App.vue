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
      <RouterView v-slot="{Component}">
        <Transition mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
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

.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
