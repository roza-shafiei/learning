<script setup>

import BaseBtn from '@/components/global/BaseBtn.vue'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useAuthStore } from '@/store/auth.js'
import { useRouter } from 'vue-router'

// States
const form = ref({})
const loading = ref(false)
const API_KEY = import.meta.env.VITE_API_KEY
const $toast = useToast()
const authStore = useAuthStore()
const router = useRouter()

// Emits
const emits = defineEmits(['changeToJoin'])

// Methods
const handleIconClick = (node) => { //Password input icon change
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

function changeToJoin() { //Change login form to join form
  emits('changeToJoin', { value: 1 })
}

async function userLogin() {
  try {
    loading.value = true
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}
`, {
      method: 'POST',
      body: JSON.stringify({
        ...form.value,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if (res.ok) {
      await authStore.setUser({ ...data, setInStorage: true })
      $toast.success('You logged in successfully!', {
        position: 'top-right'
      })
      await router.replace('/requests')
    } else {
      throw new Error(data.message || 'Failed to login')
    }
  } catch (error) {
    console.log('error in login', error.message)
    $toast.error(error.message, { position: 'top-right' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <FormKit
    id="login"
    :actions="false"
    class="login"
    type="form"
    @submit="userLogin"
  >
    <h2 class="login__title"> Login </h2>
    <FormKit
      v-model.trim="form.email"
      label="Email"
      name="email"
      placeholder="roza_shafiei@yahoo.com"
      type="text"
      validation="required"
      validation-visibility="dirty"
    />
    <FormKit
      v-model.trim="form.password"
      label="Password"
      name="password"
      prefix-icon="password"
      suffix-icon="eyeClosed"
      suffix-icon-class="hover:text-blue-500"
      type="password"
      validation="required"
      validation-visibility="dirty"
      @suffix-icon-click="handleIconClick"
    />
    <div class="login__actions">
      <BaseBtn :loading="loading" :style="{minWidth: '120px'}" text="Login"
               type="submit" />
      <BaseBtn flat text="Join instead!" @click="changeToJoin" />
    </div>
  </FormKit>
</template>

<style lang="scss">
.formkit-wrapper {
  max-width: unset !important;
}

.formkit-inner {
  background: var(--color-white-100);
}

.login {
  &__title {
    margin-bottom: toRem(30);
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: toRem(8);
  }
}
</style>
