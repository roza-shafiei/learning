<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: Object
})

const courses = computed(() => {
  return props.item.courses + ' ' + 'Courses'
})
</script>

<template>
  <div class="icon-card">
    <img :alt="props.item.title" :src="props.item.icon" class="icon-card__img" />
    <p class="icon-card__title">{{ props.item.title }}</p>
    <p class="icon-card__desc">{{ courses }}</p>
  </div>
</template>

<style lang="scss" scoped>
.icon-card {
  border: 1px solid var(--color-white-200);
  border-radius: toRem(24);
  max-width: toRem(210);
  width: 100%;
  height: toRem(210);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: toRem(8);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 6px 6px 8px 0 var(--color-white-300), 6px 6px 8px 0 var(--color-white-300);

    .icon-card__title {
      color: var(--color-primary);
    }
  }

  &__img {
    margin-bottom: toRem(8);
  }

  &__title {
    font-size: toRem(20);
    font-weight: 500;
    transition: all 0.3s ease-in-out;
  }

  &__desc {
    font-size: toRem(18);
  }
}
</style>
