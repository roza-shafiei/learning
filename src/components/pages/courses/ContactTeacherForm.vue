<script setup>
import { ref } from 'vue'
import BaseBtn from '@/components/global/BaseBtn.vue'
import { reset } from '@formkit/core'
import { useToast } from 'vue-toast-notification'

// States
const email = ref('')
const message = ref('')
const loading = ref(false)
const $toast = useToast()
const baseUrl = import.meta.env.VITE_BASE_URL

// Props
const props = defineProps({
  id: String, Number
})

// Emits
const emits = defineEmits(['submitForm'])

async function submitRequest() {
  try {
    loading.value = true
    const payload = {
      email: email.value,
      message: message.value,
      teacherId: props.id
    }
    const res = await fetch(`${baseUrl}/requests.json`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      emits('submitForm')
      reset('contact-form')
      $toast.success('Your message has been submitted successfully!', {
        position: 'top-right'
      })
    }
  } catch (e) {
    console.error('Error in course id view:', e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <FormKit
    id="contact-form"
    :actions="false"
    class="contact-form"
    type="form"
    @submit="submitRequest"
  >
    <p>Contact teacher and ask your questions</p>
    <FormKit
      v-model="email"
      label="Email"
      name="email"
      placeholder="roza_shafiei@yahoo.com"
      type="email"
      validation="required|email"
      validation-visibility="dirty"
    />
    <FormKit
      v-model="message"
      :validation-messages="{
        length: 'Instructions cannot be more than 120 characters.',
      }"
      label="Message"
      name="message"
      placeholder="Write your request here..."
      resize="none"
      type="textarea"
      validation="required|length:0,250"
      validation-visibility="dirty"
    />
    <BaseBtn
      :loading="loading"
      text="Register"
    />
  </FormKit>
</template>

<style lang="scss">
textarea {
  resize: none;
}

.formkit-message {
  font-size: toRem(10);
}

.formkit-inner {
  input, textarea {
    width: 100%;
  }
}

.formkit-wrapper {
  max-width: 100%;
}
</style>

<style lang="scss" scoped>
.formkit-form {
  background-color: var(--color-white-100);
  border-radius: toRem(8);
  display: flex;
  flex-direction: column;
  gap: toRem(8);


  p {
    color: var(--color-black-600);
    font-size: toRem(16);
  }

  .btn {
    align-self: start;
  }
}


</style>
