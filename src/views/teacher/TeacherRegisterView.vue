<script setup>
import { useCourseStore } from '@/store/course.js'
import { ref } from 'vue'
import BaseBtn from '@/components/global/BaseBtn.vue'
import { reset } from '@formkit/core'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth.js'

// States
const baseURL = import.meta.env.VITE_BASE_URL
const router = useRouter()
const loading = ref(false)
const courseStore = useCourseStore()
const authStore = useAuthStore()
const token = authStore.token

const form = ref({
  name: '',
  lastname: '',
  email: '',
  desc: '',
  areas: []
})

async function submitHandler() {
  try {
    loading.value = true
    const teacherIds = courseStore.instructorId.map((item) => {
      return parseInt(item)
    })
    const id = teacherIds.length > 0 ? Math.max(...teacherIds) + 1 : 1
    const payload = {
      ...form.value,
      id
    }
    const res = await fetch(baseURL + '/teachers.json?auth=' + token, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      reset('register__form')
      await router.push('/teachers')
    }
  } catch (error) {
    console.log('Failed to submit form', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="register max-content">
    <FormKit
      id="register__form"
      :actions="false"
      class="register__form"
      type="form"
      @submit="submitHandler"
    >
      <h2>Register</h2>
      <FormKit
        v-model="form.name"
        label="Name"
        name="name"
        placeholder="Roza"
        type="text"
        validation="required"
        validation-visibility="dirty"

      />
      <FormKit
        v-model="form.lastname"
        label="Last name"
        name="lastname"
        placeholder="Shafiei"
        type="text"
        validation="required"
        validation-visibility="dirty"
      />
      <FormKit
        v-model="form.hourlyRate"
        label="Hourly Rate"
        name="hourlyRate"
        placeholder="10"
        type="text"
        validation="required"
        validation-visibility="dirty"
      />
      <FormKit
        v-model="form.email"
        label="Email"
        name="email"
        placeholder="roza_shafiei@yahoo.com"
        type="email"
        validation="required|email"
        validation-visibility="dirty"
      />
      <FormKit
        v-model="form.desc"
        :validation-messages="{
    length: 'Instructions cannot be more than 120 characters.',
  }"
        label="Description"
        name="message"
        placeholder="I'am a front-end developer..."
        resize="none"
        type="textarea"
        validation="required|length:0,120"
        validation-visibility="dirty"
      />
      <div>
        <div class="checkbox-container">
          <FormKit
            v-model="form.areas"
            :options="courseStore.categories"
            label="Areas"
            type="checkbox"
            validation="required"
          />
        </div>
      </div>
      <BaseBtn :loading="loading" :style="{minWidth: '120px'}" class="btn base-btn" text="Register"
               type="submit" />
    </FormKit>
  </main>
</template>
<style lang="scss">
.formkit-wrapper {
  max-width: unset !important;
}

.formkit-inner {
  background: var(--color-white-100);
}

[data-type=checkbox] .formkit-inner {
  background: transparent;
}
</style>

<style lang="scss" scoped>
.register {
  max-width: 100%;
  margin-top: toRem(70);
  @include mq(md) {
    margin-top: 0;
  }
  margin-right: auto;
  margin-left: auto;

  @include mq(md) {
    max-width: 80%;
  }
  @include mq(lg) {
    max-width: 60%;
  }

  .formkit-form {
    border: 1px solid var(--color-white-400);
    background: var(--color-white-200);
    padding: toRem(16);
    border-radius: toRem(24);
  }

  h2 {
    margin-bottom: toRem(30);
  }
}


</style>
