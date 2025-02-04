<script setup>
const props = defineProps({
  text: String
})
</script>

<template>
  <button class="btn base-btn" @click="$emit('click')">
    {{ props.text }}
  </button>
</template>

<style lang="scss">
.btn {
  @include base-btn;
}
</style>
