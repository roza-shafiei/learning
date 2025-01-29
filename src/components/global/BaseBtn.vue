<script setup>
const props = defineProps({
  text: String
})
</script>

<template>
  <button class="base-btn" @click="$emit('click')">
    {{ props.text }}
  </button>
</template>

<style lang="scss">
.base-btn {
  display: inline-block;
  background: var(--color-primary);
  color: var(--color-white-100);
  padding: toRem(12) toRem(24);
  border: none;
  outline: none;
  border-radius: toRem(24);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    box-shadow: inset 0 0 0 2em var(--color-secondary);

  }

}
</style>
