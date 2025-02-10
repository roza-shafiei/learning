<script setup>

import BaseBtn from '@/components/global/BaseBtn.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth.js'
import { useToast } from 'vue-toast-notification'
import { reset } from '@formkit/core'
import { useRouter } from 'vue-router'

// States
const form = ref({})
const loading = ref(false)
const API_KEY = import.meta.env.VITE_API_KEY
const authStore = useAuthStore()
const $toast = useToast()
const router = useRouter()

// Emits
const emits = defineEmits(['changeToLogin'])

// Methods
const handleIconClick = (node) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

function changeToLogin() {
  emits('changeToLogin', { value: 0 })
}

async function userJoin() {
  try {
    loading.value = true
    const payload = {
      ...form.value,
      returnSecureToken: true
    }
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}
`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    if (res.ok) {
      await authStore.setUser({ ...data, setInStorage: true })
      $toast.success('Congratulations, your account has been created successfully!', {
        position: 'top-right'
      })
      router.push('/requests')
    } else {
      throw new Error(data.message || 'Failed to Join')
    }
  } catch (error) {
    console.log('error in fetchData', error.message)
    $toast.error(error.message, { position: 'top-right' })

  } finally {
    loading.value = false
    reset('join')
  }
}
</script>

<template>
  <FormKit
    id="join"
    :actions="false"
    class="join"
    type="form"
    @submit="userJoin"
  >
    <h2 class="join__title">Join</h2>
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
      autocomplete="new-password"
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
    <div class="join__actions">
      <BaseBtn :loading="loading" :style="{minWidth: '120px'}" text="Join" />
      <BaseBtn flat text="Login instead!" @click="changeToLogin" />
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

.join {
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
