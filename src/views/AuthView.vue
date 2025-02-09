<script setup>
import { ref } from 'vue'
import LoginForm from '@/components/pages/auth/LoginForm.vue'
import JoinForm from '@/components/pages/auth/JoinForm.vue'

const active = ref(0)
const components = [LoginForm, JoinForm]

function handleSwitchForm(payload) {
  active.value = payload.value
}
</script>

<template>
  <main class="user-form max-content">
    <section class="user-form__wrapper">
      <component :is="components[active]"
                 @change-to-join="handleSwitchForm"
                 @change-to-login="handleSwitchForm" />
    </section>
  </main>
</template>
<style lang="scss" scoped>
.user-form {
  max-width: 100%;
  margin: toRem(50) auto 0;

  @include mq(md) {
    max-width: 80%;
  }
  @include mq(lg) {
    max-width: 60%;
  }

  &__wrapper {
    width: 100%;
    border: 1px solid var(--color-white-400);
    background: var(--color-white-200);
    padding: toRem(16);
    border-radius: toRem(24);
  }


  .text-link {
    cursor: pointer;
    border: none;
    outline: none;
  }
}
</style>
