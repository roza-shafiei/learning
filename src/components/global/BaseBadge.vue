<script setup>
const props = defineProps({
  text: String
})
</script>

<template>
  <div class="badge">
    {{ props.text }}
  </div>
</template>

<style lang="scss" scoped>
.badge {
  background: var(--color-black-900);
  text-transform: capitalize;
  opacity: 80%;
  color: var(--color-white-100);
  border-radius: toRem(12);
  padding: toRem(4) toRem(8);
}
</style>
