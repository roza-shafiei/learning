<script setup>
import { ref } from 'vue'

// States
const email = ref('')
const message = ref('')


// Emits
const emits = defineEmits(['submitForm'])

// Methods
function submitHandler() {
  const payload = { email: email.value, message: message.value }
  emits('submitForm', payload)
}
</script>

<template>
  <FormKit
    id="registration-example"
    :actions="false"
    class="form"
    type="form"
    @submit="submitHandler"
  >
    <p>Contact teacher and ask your questions</p>
    <FormKit
      v-model="email"
      label="Email"
      name="email"
      placeholder="vikas@school.edu"
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
      resize="none"
      type="textarea"
      validation="required|length:0,120"
      validation-visibility="dirty"
    />
    <button class="btn base-btn" type="submit">Register</button>
  </FormKit>
</template>

<style lang="scss">
textarea {
  resize: none;
  width: 100%;
  display: block;
}

ul.formkit-messages {
  list-style: none;
  padding: 0;

  .formkit-message {
    color: var(--color-danger);
    font-size: toRem(12);
  }
}

.formkit-inner {
  input, textarea {
    width: 100%;
    padding: toRem(10);
  }
}
</style>

<style lang="scss" scoped>
.formkit-form {
  background-color: var(--color-white-100);
  padding: toRem(16);
  border-radius: toRem(8);
  margin-top: toRem(16);

  p {
    font-weight: bold;
    font-size: toRem(18);
  }

  .btn {
    margin-top: toRem(12) !important;
  }
}


</style>
