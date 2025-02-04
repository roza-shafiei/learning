<script setup>
import { useCourseStore } from '@/store/course.js'
import { ref } from 'vue'
import BaseBtn from '@/components/global/BaseBtn.vue'

// States
const courseStore = useCourseStore()
const form = ref({
  name: '',
  lastname: '',
  email: '',
  pass: '',
  desc: '',
  areas: []
})

async function submitHandler() {
  const teacherIds = courseStore.instructorId.map((item) => {
    return parseInt(item)
  })
  const id = teacherIds.length > 0 ? Math.max(...teacherIds) + 1 : 1
  const payload = {
    ...form.value,
    id
  }
  const res = await fetch('https://edupress-701b9-default-rtdb.firebaseio.com/teachers.json', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!res.ok) {
    throw new Error('Failed to submit form')
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
        placeholder="Jane Doe"
        type="text"
        validation="required"
        validation-visibility="dirty"

      />
      <FormKit
        v-model="form.lastname"
        label="Last name"
        name="lastname"
        placeholder="Jane Doe"
        type="text"
        validation="required"
        validation-visibility="dirty"

      />
      <FormKit
        v-model="form.email"
        label="Email"
        name="email"
        placeholder="vikas@school.edu"
        type="email"
        validation="required|email"
        validation-visibility="dirty"
      />
      <div class="double">
        <FormKit
          v-model="form.pass"
          :validation-messages="{
          matches: 'Please include at least one symbol',
        }"
          label="Password"
          name="password"
          placeholder="Your password"
          type="password"
          validation="required|length:6|matches:/[^a-zA-Z]/"
        />
        <FormKit
          label="Confirm password"
          name="password_confirm"
          placeholder="Confirm password"
          type="password"
          validation="required|confirm"
        />
      </div>
      <FormKit
        v-model="form.desc"
        :validation-messages="{
    length: 'Instructions cannot be more than 120 characters.',
  }"
        label="Description"
        name="message"
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
            validation="required|min:3"
          />
        </div>
      </div>
      <BaseBtn class="btn base-btn" text="Register" type="submit" />
    </FormKit>
  </main>
</template>
<style lang="scss">
.formkit-wrapper {
  max-width: unset !important;
}
</style>

<style lang="scss" scoped>
.register {
  max-width: 100%;
  margin: toRem(50) auto 0;

  @include mq(md) {
    max-width: 80%;
  }
  @include mq(lg) {
    max-width: 60%;
  }

  .formkit-form {
    border: 1px solid var(--color-white-200);
    padding: toRem(16);
    border-radius: toRem(24);
  }

  h2 {
    margin-bottom: toRem(30);
  }
}


</style>
